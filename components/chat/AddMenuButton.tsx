import { FolderOpen, Image, Paperclip, Plus } from "lucide-react";
import { useEffect, useRef, useState } from "react";

type AddAction = "upload" | "drive" | "photos";

type AddMenuButtonProps = {
  compact?: boolean;
  onAction?: (action: AddAction) => void;
  onFilesSelected?: (files: FileList) => void;
};

export default function AddMenuButton({
  compact = false,
  onAction,
  onFilesSelected
}: AddMenuButtonProps) {
  const [open, setOpen] = useState(false);
  const [accept, setAccept] = useState<string>("");
  const rootRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);

  useEffect(() => {
    if (!open) {
      return;
    }

    const handleOutsideClick = (event: MouseEvent) => {
      if (!rootRef.current) {
        return;
      }

      const target = event.target;
      if (!(target instanceof Node)) {
        return;
      }

      if (!rootRef.current.contains(target)) {
        setOpen(false);
      }
    };

    document.addEventListener("mousedown", handleOutsideClick);
    return () => {
      document.removeEventListener("mousedown", handleOutsideClick);
    };
  }, [open]);

  const menuItemClass =
    "flex w-full items-center gap-3 rounded-xl px-3 py-2 text-left text-[15px] text-slate-200 transition hover:bg-white/10";

  return (
    <div ref={rootRef} className="relative z-50">
      <button
        type="button"
        onClick={() => setOpen((prev) => !prev)}
        className={
          compact
            ? "flex h-8 w-8 items-center justify-center rounded-lg text-slate-400 transition hover:bg-white/10 hover:text-cyan-100"
            : "rounded-full p-2 text-slate-400 transition hover:bg-white/10 hover:text-cyan-100"
        }
        aria-label="Add attachments"
      >
        <Plus className={compact ? "h-4 w-4" : "h-5 w-5"} />
      </button>

      {open && (
        <div className="absolute bottom-full left-0 mb-3 w-56 rounded-2xl border border-white/10 bg-[#202225] p-2 shadow-[0_24px_70px_rgba(0,0,0,0.45)]">
          <button
            type="button"
            className={menuItemClass}
            onClick={() => {
              setOpen(false);
              setAccept("");
              onAction?.("upload");
              fileInputRef.current?.click();
            }}
          >
            <Paperclip className="h-5 w-5 text-slate-300" />
            <span>Upload files</span>
          </button>

          <button
            type="button"
            className={menuItemClass}
            onClick={() => {
              setOpen(false);
              setAccept("");
              onAction?.("drive");
              fileInputRef.current?.click();
            }}
          >
            <FolderOpen className="h-5 w-5 text-slate-300" />
            <span>Add from Drive</span>
          </button>

          <button
            type="button"
            className={menuItemClass}
            onClick={() => {
              setOpen(false);
              setAccept("image/*");
              onAction?.("photos");
              fileInputRef.current?.click();
            }}
          >
            <Image className="h-5 w-5 text-slate-300" />
            <span>Photos</span>
          </button>
        </div>
      )}

      <input
        ref={fileInputRef}
        type="file"
        aria-label="Upload files"
        accept={accept}
        className="hidden"
        multiple
        onChange={(event) => {
          const files = event.target.files;
          if (files && files.length > 0) {
            onFilesSelected?.(files);
          }
          event.target.value = "";
        }}
      />
    </div>
  );
}
