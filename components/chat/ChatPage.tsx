"use client";

import { useRouter } from "next/navigation";
import { useEffect, useMemo, useRef, useState } from "react";
import {
  ArrowUp,
  Briefcase,
  GraduationCap,
  Sparkles,
  Code2,
  X,
  Compass
} from "lucide-react";
import ChatMessages from "./ChatMessages";
import ChatInputBar from "./ChatInputBar";
import ChatSidebar, { type RecentThread, type SidebarSection } from "./ChatSidebar";
import AddMenuButton from "./AddMenuButton";
import type { Message, MessageImage } from "./types";
import { clearAuthSession } from "@/components/auth/session";
import { useAuthSession } from "@/components/auth/useAuthSession";
import QuillLogo from "@/components/landing/QuillLogo";

const initialMessages: Message[] = [];

const quickActions = [
  { label: "Code", icon: Code2, prompt: "Help me debug and improve my code quality." },
  { label: "Write", icon: Sparkles, prompt: "Draft polished writing for my project update." },
  { label: "Learn", icon: GraduationCap, prompt: "Teach this concept step by step with examples." },
  { label: "Life stuff", icon: Briefcase, prompt: "Help me plan my week with priorities and schedule." },
  { label: "Explore", icon: Compass, prompt: "Give me creative ideas I can build next." }
];

const sectionPrompts: Record<SidebarSection, string> = {
  search: "Search your recents or ask me to find something in your chat history.",
  chats: "Start a fresh conversation or pick a recent thread.",
  projects: "Project mode is active. Organize ideas, tasks, and milestones."
};

const initialRecents: RecentThread[] = [];

function toTopicLabel(prompt: string): string {
  const normalized = prompt.replace(/\s+/g, " ").trim();
  if (!normalized) {
    return "New chat";
  }

  const firstSentence = normalized.split(/[.!?]/)[0]?.trim() || normalized;
  const words = firstSentence.split(" ").filter(Boolean);
  const topic = words.slice(0, 6).join(" ").replace(/[,:;\-]+$/g, "");

  return topic || normalized.slice(0, 36);
}

export default function ChatPage() {
  const router = useRouter();
  const session = useAuthSession();
  const [now, setNow] = useState(() => new Date());
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [activeSection, setActiveSection] = useState<SidebarSection>("chats");
  const [searchQuery, setSearchQuery] = useState("");
  const [profileMenuOpen, setProfileMenuOpen] = useState(false);
  const [sidebarNotice, setSidebarNotice] = useState<string | null>(null);
  const [messages, setMessages] = useState<Message[]>(initialMessages);
  const [input, setInput] = useState("");
  const [pendingImages, setPendingImages] = useState<MessageImage[]>([]);
  const [recents, setRecents] = useState<RecentThread[]>(initialRecents);
  const [isLoading, setIsLoading] = useState(false);
  const textAreaRef = useRef<HTMLTextAreaElement>(null);
  const scrollRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    if (!session) {
      router.replace("/login");
    }
  }, [router, session]);

  useEffect(() => {
    const timer = window.setInterval(() => {
      setNow(new Date());
    }, 60_000);

    return () => {
      window.clearInterval(timer);
    };
  }, []);

  const handleSignOut = () => {
    clearAuthSession();
    router.push("/login");
  };

  const handleSearchChat = () => {
    setActiveSection("search");
    setProfileMenuOpen(false);
    setSidebarNotice("Search chat is active. Filter the recents list on the left.");
  };

  const handleSelectRecent = (id: string) => {
    const recent = recents.find((item) => item.id === id);
    if (!recent) {
      return;
    }

    setActiveSection("chats");
    setProfileMenuOpen(false);
    setInput(recent.preview);
    setSidebarNotice(`Loaded recent: ${recent.title}`);
  };

  const handleAddAction = (action: "upload" | "drive" | "photos") => {
    if (action === "drive") {
      setSidebarNotice("Add from Drive selected. Connect a Drive source to enable import.");
      return;
    }

    if (action === "photos") {
      setSidebarNotice("Photos selected. Local photo library picker can be connected next.");
      return;
    }

    setSidebarNotice("Upload files selected.");
  };

  const handleFilesSelected = async (files: FileList) => {
    const list = Array.from(files);
    if (list.length === 0) {
      return;
    }

    const imageFiles = list.filter((file) => file.type.startsWith("image/"));
    if (imageFiles.length === 0) {
      setSidebarNotice("No image files selected. Please choose PNG, JPG, WEBP, or GIF.");
      return;
    }

    const readImage = (file: File) =>
      new Promise<MessageImage>((resolve, reject) => {
        const reader = new FileReader();
        reader.onload = () => {
          const result = typeof reader.result === "string" ? reader.result : "";
          const base64 = result.includes(",") ? result.split(",")[1] : "";
          resolve({
            name: file.name,
            mimeType: file.type || "image/png",
            base64,
            previewUrl: result
          });
        };
        reader.onerror = () => reject(new Error(`Failed to read ${file.name}`));
        reader.readAsDataURL(file);
      });

    try {
      const images = await Promise.all(imageFiles.map((file) => readImage(file)));
      setPendingImages((prev) => [...prev, ...images].slice(0, 6));

      const names = images.slice(0, 2).map((file) => file.name).join(", ");
      const suffix = images.length > 2 ? ` +${images.length - 2} more` : "";
      setSidebarNotice(`Attached ${images.length} image${images.length === 1 ? "" : "s"}: ${names}${suffix}`);
    } catch {
      setSidebarNotice("Failed to read selected image files. Please try again.");
    }
  };

  const filteredRecents = recents.slice(0, 10).filter((item) => {
    const matchesSearch = item.title.toLowerCase().includes(searchQuery.toLowerCase());

    return matchesSearch;
  });

  useEffect(() => {
    if (!textAreaRef.current) {
      return;
    }
    textAreaRef.current.style.height = "auto";
    textAreaRef.current.style.height = `${Math.min(textAreaRef.current.scrollHeight, 220)}px`;
  }, [input]);

  useEffect(() => {
    if (!scrollRef.current) {
      return;
    }
    scrollRef.current.scrollTop = scrollRef.current.scrollHeight;
  }, [messages]);

  const canSend = useMemo(
    () => (input.trim().length > 0 || pendingImages.length > 0) && !isLoading,
    [input, isLoading, pendingImages.length]
  );
  const isEmptyState = messages.length === 0;
  const displayName = useMemo(() => {
    if (session?.name?.trim()) {
      return session.name.trim();
    }

    if (session?.email) {
      return session.email.split("@")[0];
    }

    return "there";
  }, [session?.email, session?.name]);

  const dayGreeting = useMemo(() => {
    const hour = now.getHours();

    if (hour < 12) {
      return "Morning";
    }

    if (hour < 17) {
      return "Afternoon";
    }

    return "Evening";
  }, [now]);

  const handleNewThread = () => {
    setMessages(initialMessages);
    setInput("");
    setPendingImages([]);
    setActiveSection("chats");
    setSidebarNotice("Started a new chat thread.");
  };

  const removePendingImage = (name: string) => {
    setPendingImages((prev) => prev.filter((image) => image.name !== name));
  };

  const handleSend = async () => {
    const trimmed = input.trim();
    if ((!trimmed && pendingImages.length === 0) || isLoading) {
      return;
    }

    const prompt = trimmed || "Describe this image in detail.";
    const imagesForMessage = [...pendingImages];

    const userMessage: Message = {
      id: crypto.randomUUID(),
      role: "user",
      content: prompt,
      images: imagesForMessage
    };

    const assistantId = crypto.randomUUID();
    setInput("");
    setPendingImages([]);
    setMessages((prev) => [...prev, userMessage, { id: assistantId, role: "assistant", content: "" }]);
    setRecents((prev) => {
      const topic = toTopicLabel(prompt);
      const nextRecent: RecentThread = {
        id: crypto.randomUUID(),
        title: topic,
        preview: prompt
      };

      const nextList = [nextRecent, ...prev.filter((item) => item.preview !== prompt)].slice(0, 10);
      return nextList;
    });
    setIsLoading(true);

    try {
      const response = await fetch("/api/chat", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          prompt,
          images: imagesForMessage.map((image) => image.base64)
        })
      });

      if (!response.ok) {
        const details = await response.text();
        throw new Error(details || "Failed to reach local Ollama bridge");
      }

      if (!response.body) {
        throw new Error("Empty response from local Ollama bridge");
      }

      const reader = response.body.getReader();
      const decoder = new TextDecoder();
      let done = false;

      while (!done) {
        const { value, done: readDone } = await reader.read();
        done = readDone;
        const chunk = decoder.decode(value || new Uint8Array(), { stream: !readDone });

        if (chunk) {
          setMessages((prev) =>
            prev.map((msg) =>
              msg.id === assistantId ? { ...msg, content: `${msg.content}${chunk}` } : msg
            )
          );
        }
      }
    } catch (error) {
      const fallbackMessage =
        "Unable to stream from local Ollama. Make sure Ollama is running on http://localhost:11434 and a model is available.";
      const errorMessage = error instanceof Error && error.message ? error.message : fallbackMessage;

      setMessages((prev) =>
        prev.map((msg) =>
          msg.id === assistantId
            ? {
                ...msg,
                content: errorMessage
              }
            : msg
        )
      );
      console.error(error);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="relative min-h-screen overflow-hidden bg-[#050505] text-slate-100">
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(circle_at_20%_10%,rgba(47,243,255,0.12),transparent_28%),radial-gradient(circle_at_82%_78%,rgba(155,92,255,0.12),transparent_30%),linear-gradient(180deg,#050505_0%,#071019_58%,#050505_100%)]" />

      <section className="relative flex min-h-screen flex-col md:pl-2">
        <div className="fixed left-0 top-0 z-20 h-screen">
          <ChatSidebar
            open={sidebarOpen}
            section={activeSection}
            recents={recents}
            filteredRecents={filteredRecents}
            searchQuery={searchQuery}
            profileMenuOpen={profileMenuOpen}
            userLabel={session?.name || "saksham"}
            userEmail={session?.email}
            onToggle={() => setSidebarOpen((prev) => !prev)}
            onNewThread={handleNewThread}
            onSearchChat={handleSearchChat}
            onSearchQueryChange={setSearchQuery}
            onSelectRecent={handleSelectRecent}
            onToggleProfileMenu={() => setProfileMenuOpen((prev) => !prev)}
            onSignOut={handleSignOut}
          />
        </div>

      <section className={`relative flex min-h-screen flex-col px-6 py-6 md:px-12 ${sidebarOpen ? "ml-[320px]" : "ml-[78px]"}`}>
        <header className="flex items-center justify-between gap-3 border-b border-white/10 pb-3">
          <p className="flex items-center gap-2 text-sm text-slate-200">
            <Sparkles className="h-4 w-4 text-cyan-200" />
            Quill Workspace
          </p>
        </header>

        {sidebarNotice && (
          <div className="mt-4 rounded-2xl border border-cyan-300/20 bg-cyan-300/10 px-4 py-3 text-sm text-cyan-100">
            {sidebarNotice}
          </div>
        )}

        {isEmptyState ? (
          <div className="mx-auto flex w-full max-w-[920px] flex-1 flex-col items-center justify-center pb-16">
            <div className="flex items-center gap-4 md:gap-5">
              <QuillLogo />
              <h1 className="text-center text-4xl leading-tight font-serif text-[#e7f8ff] md:text-6xl">
                {dayGreeting}, {displayName}
              </h1>
            </div>
            <p className="mt-4 text-center text-sm text-slate-400 md:text-base">
              {activeSection === "projects" ? "Personal project workspace is ready." : activeSection === "search" ? "Search your recent chats quickly." : "Start a fresh conversation in Quill."}
            </p>

            <div className="mt-10 w-full rounded-[22px] border border-white/10 bg-[#07101f]/95 p-5 shadow-[0_22px_56px_rgba(0,0,0,0.45)] md:p-6">
              {pendingImages.length > 0 && (
                <div className="mb-4 flex flex-wrap gap-2">
                  {pendingImages.map((image) => (
                    <div key={image.name} className="relative overflow-hidden rounded-xl border border-white/10">
                      <img src={image.previewUrl} alt={image.name} className="h-16 w-16 object-cover" />
                      <button
                        type="button"
                        onClick={() => removePendingImage(image.name)}
                        className="absolute right-1 top-1 rounded-full bg-black/60 p-0.5 text-white hover:bg-black/80"
                        aria-label={`Remove ${image.name}`}
                      >
                        <X className="h-3 w-3" />
                      </button>
                    </div>
                  ))}
                </div>
              )}
              <textarea
                ref={textAreaRef}
                value={input}
                onChange={(event) => setInput(event.target.value)}
                placeholder={sectionPrompts[activeSection]}
                rows={1}
                className="max-h-52 min-h-[42px] w-full resize-none bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
                onKeyDown={(event) => {
                  if (event.key === "Enter" && !event.shiftKey) {
                    event.preventDefault();
                    void handleSend();
                  }
                }}
              />

              <div className="mt-5 flex items-center justify-between">
                <AddMenuButton compact onAction={handleAddAction} onFilesSelected={handleFilesSelected} />

                <div className="flex items-center gap-2">
                  <div className="flex items-center gap-2 text-sm text-slate-400">
                    <span>{activeSection === "search" ? "Search your recents" : activeSection === "projects" ? "Project workspace" : "Quill Local"}</span>
                    <svg viewBox="0 0 16 16" className="h-3 w-3 fill-current text-slate-500" aria-hidden="true">
                      <path d="M4 6l4 4 4-4" />
                    </svg>
                  </div>
                  <button
                    type="button"
                    onClick={() => void handleSend()}
                    disabled={!canSend}
                    className="rounded-full border border-cyan-300/30 bg-cyan-300/10 p-2 text-cyan-100 transition hover:bg-cyan-300/18 disabled:cursor-not-allowed disabled:opacity-40"
                    aria-label="Send"
                  >
                    <ArrowUp className="h-4 w-4" />
                  </button>
                </div>
              </div>
            </div>

            <div className="mt-5 flex flex-wrap items-center justify-center gap-2">
              {quickActions.map(({ label, icon: Icon, prompt }) => (
                <button
                  key={label}
                  type="button"
                  onClick={() => setInput(prompt)}
                  className="inline-flex items-center gap-2 rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-slate-300 transition hover:border-cyan-300/40 hover:text-cyan-100"
                >
                  <Icon className="h-4 w-4" />
                  {label}
                </button>
              ))}
            </div>
          </div>
        ) : (
          <>
            <div ref={scrollRef} className="mx-auto w-full max-w-5xl flex-1 space-y-8 overflow-y-auto px-5 py-8 md:px-10">
              <ChatMessages messages={messages} isLoading={isLoading} />
              <div className="h-6" />
            </div>

            <ChatInputBar
              input={input}
              canSend={canSend}
              textareaRef={textAreaRef}
              onChange={setInput}
              onSend={() => void handleSend()}
              onAddAction={handleAddAction}
              onFilesSelected={handleFilesSelected}
              pendingImages={pendingImages}
              onRemovePendingImage={removePendingImage}
            />
          </>
        )}
      </section>
      </section>
    </main>
  );
}
