import { ArrowUp, Paperclip } from "lucide-react";
import type { RefObject } from "react";

type ChatInputBarProps = {
  input: string;
  canSend: boolean;
  textareaRef: RefObject<HTMLTextAreaElement>;
  onChange: (value: string) => void;
  onSend: () => void;
};

export default function ChatInputBar({ input, canSend, textareaRef, onChange, onSend }: ChatInputBarProps) {
  return (
    <div className="px-4 pb-5 pt-3 md:px-8">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-cyan-300/20 bg-[#07101f]/92 p-2 shadow-[0_0_40px_rgba(47,243,255,0.12)] backdrop-blur-xl">
        <div className="flex items-end gap-2">
          <button
            type="button"
            className="rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-cyan-100"
            aria-label="Attach file"
          >
            <Paperclip className="h-5 w-5" />
          </button>
          <textarea
            ref={textareaRef}
            value={input}
            onChange={(event) => onChange(event.target.value)}
            placeholder="Message Quill..."
            rows={1}
            className="max-h-52 min-h-[42px] flex-1 resize-none bg-transparent px-2 py-2 text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
            onKeyDown={(event) => {
              if (event.key === "Enter" && !event.shiftKey) {
                event.preventDefault();
                onSend();
              }
            }}
          />
          <button
            type="button"
            onClick={onSend}
            disabled={!canSend}
            className="rounded-full border border-cyan-300/40 bg-cyan-300/15 p-2.5 text-cyan-100 transition hover:bg-cyan-300/25 disabled:cursor-not-allowed disabled:opacity-40"
            aria-label="Send"
          >
            <ArrowUp className="h-4 w-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
