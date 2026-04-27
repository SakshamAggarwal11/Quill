import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import { oneDark } from "react-syntax-highlighter/dist/esm/styles/prism";
import type { Message } from "./types";

type ChatMessagesProps = {
  messages: Message[];
  isLoading: boolean;
};

export default function ChatMessages({ messages, isLoading }: ChatMessagesProps) {
  return (
    <>
      {messages.map((message) => {
        const isUser = message.role === "user";
        return (
          <div key={message.id} className={`flex ${isUser ? "justify-end" : "justify-start"}`}>
            <article
              className={`max-w-3xl px-4 py-3 md:px-6 ${
                isUser
                  ? "rounded-3xl border border-cyan-300/20 bg-cyan-300/10 text-slate-100"
                  : "rounded-3xl border border-white/10 bg-white/5 text-slate-200"
              }`}
            >
              {!isUser && <p className="mb-2 text-xs tracking-wide text-cyan-200 uppercase">Quill Assistant</p>}
              <ReactMarkdown
                remarkPlugins={[remarkGfm]}
                components={{
                  code(props) {
                    const { children, className } = props;
                    const match = /language-(\w+)/.exec(className || "");
                    const text = String(children).replace(/\n$/, "");

                    if (match) {
                      return (
                        <SyntaxHighlighter
                          language={match[1]}
                          style={oneDark}
                          customStyle={{
                            margin: "10px 0",
                            borderRadius: 10,
                            background: "rgba(3,3,6,0.85)"
                          }}
                        >
                          {text}
                        </SyntaxHighlighter>
                      );
                    }

                    return <code className="rounded bg-white/10 px-1 py-0.5 text-cyan-100">{children}</code>;
                  }
                }}
                className={`prose prose-invert max-w-none text-[15px] leading-7 ${
                  isUser ? "prose-p:text-slate-100" : "prose-headings:text-white prose-p:text-slate-200"
                }`}
              >
                {message.content || (isLoading ? "Thinking..." : "")}
              </ReactMarkdown>
              {Boolean(message.images?.length) && (
                <div className="mt-3 grid grid-cols-2 gap-2 sm:grid-cols-3">
                  {message.images!.map((image) => (
                    <div key={`${message.id}-${image.name}`} className="overflow-hidden rounded-xl border border-white/10">
                      <img src={image.previewUrl} alt={image.name} className="h-24 w-full object-cover" />
                    </div>
                  ))}
                </div>
              )}
            </article>
          </div>
        );
      })}
    </>
  );
}
