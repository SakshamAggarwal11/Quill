import { ArrowUp } from "lucide-react";
import type { RefObject } from "react";
import AddMenuButton from "./AddMenuButton";
import type { MessageImage } from "./types";

type AddAction = "upload" | "drive" | "photos";

type ChatInputBarProps = {
  input: string;
  canSend: boolean;
  textareaRef: RefObject<HTMLTextAreaElement>;
  onChange: (value: string) => void;
  onSend: () => void;
  onAddAction?: (action: AddAction) => void;
  onFilesSelected?: (files: FileList) => void;
  pendingImages?: MessageImage[];
  onRemovePendingImage?: (name: string) => void;
};

export default function ChatInputBar({
  input,
  canSend,
  textareaRef,
  onChange,
  onSend,
  onAddAction,
  onFilesSelected,
  pendingImages,
  onRemovePendingImage
}: ChatInputBarProps) {
  return (
    <div className="px-4 pb-5 pt-3 md:px-8">
      <div className="mx-auto max-w-4xl rounded-[28px] border border-cyan-300/20 bg-[#07101f]/92 p-2 shadow-[0_0_40px_rgba(47,243,255,0.12)] backdrop-blur-xl">
        {Boolean(pendingImages?.length) && (
          <div className="mb-2 flex flex-wrap gap-2 px-2 pt-1">
            {pendingImages!.map((image) => (
              <div key={image.name} className="group relative overflow-hidden rounded-lg border border-white/10">
                <img src={image.previewUrl} alt={image.name} className="h-14 w-14 object-cover" />
                <button
                  type="button"
                  onClick={() => onRemovePendingImage?.(image.name)}
                  className="absolute right-1 top-1 rounded-full bg-black/65 px-1 text-xs text-white opacity-90 hover:bg-black"
                  aria-label={`Remove ${image.name}`}
                >
                  x
                </button>
              </div>
            ))}
          </div>
        )}
        <div className="flex items-end gap-2">
          <AddMenuButton onAction={onAddAction} onFilesSelected={onFilesSelected} />
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
