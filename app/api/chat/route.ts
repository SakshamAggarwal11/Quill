import { NextRequest } from "next/server";

const SYSTEM_PROMPT =
  "You are a highly accurate, private AI assistant running 100% offline. Your purpose is to provide expert-level guidance in daily life management, advanced linguistics, and specialized education.\n\nGuidelines:\n1. **Accuracy First**: Provide only factual, well-verified information. If uncertain, say so.\n2. **Structure**: Use clear formatting with bullet points, numbered lists, and headers when appropriate.\n3. **Conciseness**: Be direct and avoid unnecessary verbosity unless asked for detail.\n4. **Socratic Method**: When tutoring, use guiding questions to help learners discover answers.\n5. **LaTeX Formatting**: Format all mathematical equations using proper LaTeX notation enclosed in $ or $$.\n6. **Offline Mindset**: Acknowledge you have no internet access and work with your training knowledge.\n\nRespond thoughtfully with verified facts and structured, readable formatting.";

const OLLAMA_URL = "http://localhost:11434/api/generate";

export async function POST(req: NextRequest) {
  const body = (await req.json()) as { prompt?: string; model?: string };
  const userPrompt = body.prompt?.trim();

  if (!userPrompt) {
    return new Response("Prompt is required", { status: 400 });
  }

  const ollamaRes = await fetch(OLLAMA_URL, {
    method: "POST",
    headers: {
      "Content-Type": "application/json"
    },
    body: JSON.stringify({
      model: body.model || "llama3.2",
      prompt: userPrompt,
      stream: true,
      system: SYSTEM_PROMPT,
      options: {
        num_predict: 512,
        temperature: 0.5
      }
    })
  });

  if (!ollamaRes.ok || !ollamaRes.body) {
    const details = await ollamaRes.text();
    return new Response(`Ollama request failed: ${details}`, { status: 500 });
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
