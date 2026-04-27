import { NextRequest } from "next/server";

const SYSTEM_PROMPT =
  "You are a highly accurate, private AI assistant running 100% offline. Your purpose is to provide expert-level guidance in daily life management, advanced linguistics, and specialized education.\n\nGuidelines:\n1. **Accuracy First**: Provide only factual, well-verified information. If uncertain, say so.\n2. **Structure**: Use clear formatting with bullet points, numbered lists, and headers when appropriate.\n3. **Conciseness**: Be direct and avoid unnecessary verbosity unless asked for detail.\n4. **Socratic Method**: When tutoring, use guiding questions to help learners discover answers.\n5. **LaTeX Formatting**: Format all mathematical equations using proper LaTeX notation enclosed in $ or $$.\n6. **Offline Mindset**: Acknowledge you have no internet access and work with your training knowledge.\n\nRespond thoughtfully with verified facts and structured, readable formatting.";

const OLLAMA_URL = "http://localhost:11434/api/generate";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { prompt?: string; model?: string; images?: string[] };
  const userPrompt = body.prompt?.trim();
  const images = Array.isArray(body.images) ? body.images.filter((item) => typeof item === "string" && item.trim().length > 0) : [];

  if (!userPrompt && images.length === 0) {
    return new Response("Prompt is required", { status: 400 });
  }

  const prompt = userPrompt || "Describe this image in detail.";
  const candidates = body.model
    ? [{ model: body.model, withImages: images.length > 0 }]
    : images.length > 0
      ? [
          { model: "llava", withImages: true },
          { model: "llava:latest", withImages: true },
          { model: "llama3.2-vision", withImages: true }
        ]
      : [{ model: "llama3.2", withImages: false }];

  let ollamaRes: Response | null = null;
  let lastDetails = "";

  for (const candidate of candidates) {
    try {
      const attempt = await fetch(OLLAMA_URL, {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          model: candidate.model,
          prompt,
          images: candidate.withImages ? images : undefined,
          stream: true,
          system: SYSTEM_PROMPT,
          options: {
            num_predict: 512,
            temperature: 0.5
          }
        })
      });

      if (attempt.ok && attempt.body) {
        ollamaRes = attempt;
        break;
      }

      lastDetails = await attempt.text();
      const modelUnavailable = /not found|pull|unknown model/i.test(lastDetails);
      const imageUnsupported = /image|vision/i.test(lastDetails) && /not support|unsupported|invalid/i.test(lastDetails);

      if (!(images.length > 0 && !body.model && (modelUnavailable || imageUnsupported))) {
        return new Response(`Ollama request failed: ${lastDetails}`, { status: 500 });
      }
    } catch {
      return new Response(
        "Ollama is unreachable at http://localhost:11434. Start Ollama first, then retry.",
        { status: 500 }
      );
    }
  }

  if (!ollamaRes) {
    return new Response(
      `No vision model is available in Ollama. Install one with: ollama pull llava. ${lastDetails}`,
      { status: 500 }
    );
  }

  const encoder = new TextEncoder();
  const decoder = new TextDecoder();

  const stream = new ReadableStream<Uint8Array>({
    async start(controller) {
      const reader = ollamaRes.body!.getReader();
      let buffer = "";

      try {
        while (true) {
          const { value, done } = await reader.read();
          if (done) {
            break;
          }

          buffer += decoder.decode(value, { stream: true });
          const lines = buffer.split("\n");
          buffer = lines.pop() || "";

          for (const line of lines) {
            if (!line.trim()) {
              continue;
            }

            try {
              const chunk = JSON.parse(line) as { response?: string };
              if (chunk.response) {
                controller.enqueue(encoder.encode(chunk.response));
              }
            } catch {
              // Ignore malformed lines and continue streaming valid payloads.
            }
          }
        }
      } catch (error) {
        controller.error(error);
      } finally {
        controller.close();
      }
    }
  });

  return new Response(stream, {
    headers: {
      "Content-Type": "text/plain; charset=utf-8",
      "Cache-Control": "no-cache"
    }
  });
}
