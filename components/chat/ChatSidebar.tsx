"use client";

import {
  ArrowRight,
  CircleHelp,
  Globe,
  HelpCircle,
  LogOut,
  MessageSquarePlus,
  PanelLeftClose,
  Search,
  Settings,
  ChevronLeft,
  ChevronRight
} from "lucide-react";

export type SidebarSection = "search" | "chats";

export type RecentThread = {
  id: string;
  title: string;
  preview: string;
};

type ChatSidebarProps = {
  open: boolean;
  section: SidebarSection;
  recents: RecentThread[];
  filteredRecents: RecentThread[];
  searchQuery: string;
  profileMenuOpen: boolean;
  userLabel: string;
  userEmail?: string;
  onToggle: () => void;
  onNewThread: () => void;
  onSearchChat: () => void;
  onSearchQueryChange: (value: string) => void;
  onSelectRecent: (id: string) => void;
  onToggleProfileMenu: () => void;
  onSignOut: () => void;
}

const sectionButtons: Array<{ key: SidebarSection; label: string; icon: React.ComponentType<{ className?: string }> }> = [
  { key: "chats", label: "New chat", icon: MessageSquarePlus },
  { key: "search", label: "Search chat", icon: Search },
];

export default function ChatSidebar({
  open,
  section,
  recents,
  filteredRecents,
  searchQuery,
  profileMenuOpen,
  userLabel,
  userEmail,
  onToggle,
  onNewThread,
  onSearchChat,
  onSearchQueryChange,
  onSelectRecent,
  onToggleProfileMenu,
  onSignOut
}: ChatSidebarProps) {
  return (
    <aside className={`glass-card relative h-full border-r border-white/10 transition-all duration-300 ${open ? "w-[320px]" : "w-[78px]"}`}>
      <div className="flex h-full flex-col p-3">
        <div className="mb-4 flex items-center justify-between gap-2">
          {open ? <p className="font-serif text-3xl tracking-tight text-white">Quill</p> : <span />}
          <button
            type="button"
            onClick={onToggle}
            className="rounded-xl border border-cyan-300/20 bg-cyan-300/10 p-2 text-cyan-100 transition hover:bg-cyan-300/20"
            aria-label={open ? "Close sidebar" : "Open sidebar"}
          >
            {open ? <ChevronLeft className="h-4 w-4" /> : <ChevronRight className="h-4 w-4" />}
          </button>
        </div>

        <button
          type="button"
          onClick={onNewThread}
          className="mb-4 flex items-center justify-center gap-2 rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-3 py-3 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/18"
        >
          <MessageSquarePlus className="h-4 w-4" />
          {open ? "New chat" : ""}
        </button>

        <div className="space-y-1">
          {sectionButtons.map(({ key, label, icon: Icon }) => {
            const active = section === key;
            return (
              <button
                key={key}
                type="button"
                onClick={() => {
                  if (key === "chats") {
                    onNewThread();
                    return;
                  }

                  onSearchChat();
                }}
                className={`flex w-full items-center gap-3 rounded-2xl px-3 py-3 text-left transition ${
                  active ? "bg-white/15 text-[#e7f8ff]" : "text-[#d5e7f3] hover:bg-white/5 hover:text-[#f4fbff]"
                }`}
              >
                <Icon className="h-5 w-5 shrink-0" />
                {open && <span className="text-base font-medium text-current">{label}</span>}
              </button>
            );
          })}
        </div>

        {open && section === "search" && (
          <div className="mt-4 rounded-2xl border border-white/10 bg-white/5 p-3">
            <label className="block text-xs tracking-[0.2em] text-slate-400 uppercase">Search recents</label>
            <div className="mt-2 flex items-center gap-2 rounded-xl border border-white/10 bg-black/20 px-3 py-2">
              <Search className="h-4 w-4 text-slate-400" />
              <input
                value={searchQuery}
                onChange={(event) => onSearchQueryChange(event.target.value)}
                placeholder="Type to filter"
                className="w-full bg-transparent text-sm text-slate-100 placeholder:text-slate-500 focus:outline-none"
              />
            </div>
          </div>
        )}

        {open && (
          <div className="mt-4 flex items-center justify-between rounded-2xl border border-white/10 bg-black/20 px-3 py-2 text-xs text-slate-400">
            <span>Recents</span>
            <span>{filteredRecents.length}/{recents.length}</span>
          </div>
        )}

        {open && (
          <div className="min-h-0 flex-1 space-y-2 overflow-y-auto pr-1 pt-3">
            {filteredRecents.length === 0 ? (
              <div className="rounded-2xl border border-white/10 bg-white/5 p-4 text-sm text-slate-400">
                No recent chats yet.
              </div>
            ) : (
              filteredRecents.map((item) => (
                <button
                  key={item.id}
                  type="button"
                  onClick={() => onSelectRecent(item.id)}
                  className="w-full rounded-2xl border border-white/10 bg-black/20 px-3 py-3 text-left transition hover:border-cyan-300/30 hover:bg-white/5"
                >
                  <div className="flex items-center justify-between gap-2">
                    <span className="truncate text-sm text-slate-100">{item.title}</span>
                    <ArrowRight className="h-4 w-4 shrink-0 text-slate-500" />
                  </div>
                </button>
              ))
            )}
          </div>
        )}

        <button
          type="button"
          onClick={onToggleProfileMenu}
          className="mt-auto flex items-center justify-between rounded-2xl border border-white/10 bg-white/5 p-3 transition hover:bg-white/10"
        >
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full border border-white/20 bg-[#d8d6cc] text-[#262626]">
              <span className="text-sm font-semibold">{userLabel.slice(0, 1).toUpperCase()}</span>
            </div>
            {open && (
              <div className="text-left">
                <p className="text-sm font-medium text-slate-100">{userLabel}</p>
                <p className="text-xs text-slate-400">{userEmail || "Local plan"}</p>
              </div>
            )}
          </div>
          {open && <PanelLeftClose className="h-4 w-4 text-slate-500" />}
        </button>

        {profileMenuOpen && (
          <div className={`absolute bottom-20 ${open ? "left-[18px] w-[280px]" : "left-[86px] w-[280px]"} rounded-3xl border border-white/10 bg-[#1f1f1f] p-4 shadow-[0_30px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl`}>
            <div className="mb-4 border-b border-white/10 pb-3">
              <p className="text-sm font-medium text-slate-100">{userEmail || "Signed in locally"}</p>
              <p className="text-xs text-slate-400">All activity stays on this device.</p>
            </div>
            <div className="space-y-1">
              {[
                { label: "Settings", icon: Settings },
                { label: "Language", icon: Globe },
                { label: "Get help", icon: CircleHelp },
                { label: "Learn more", icon: HelpCircle }
              ].map(({ label, icon: Icon }) => (
                <button
                  key={label}
                  type="button"
                  className="flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-sm text-slate-200 transition hover:bg-white/10"
                >
                  <Icon className="h-4 w-4 text-slate-400" />
                  <span>{label}</span>
                </button>
              ))}
              <button
                type="button"
                onClick={onSignOut}
                className="mt-2 flex w-full items-center gap-3 rounded-2xl px-3 py-2 text-left text-sm text-rose-200 transition hover:bg-rose-400/10"
              >
                <LogOut className="h-4 w-4 text-rose-200" />
                <span>Log out</span>
              </button>
            </div>
          </div>
        )}
      </div>
    </aside>
  );
}
