"use client";

import Link from "next/link";
import { useEffect, useMemo, useState } from "react";
import { ArrowRight, FolderKanban, Plus, Sparkles, Target, Trash2 } from "lucide-react";

type ProjectTask = {
  id: string;
  title: string;
  done: boolean;
};

const storageKey = "quill-personal-project";

const defaultTasks: ProjectTask[] = [
  { id: "t1", title: "Define the project goal", done: false },
  { id: "t2", title: "Write the first feature list", done: false },
  { id: "t3", title: "Outline the local workflow", done: false }
];

export default function ProjectsPage() {
  const [projectName, setProjectName] = useState("My personal project");
  const [description, setDescription] = useState("Use this page to plan, track, and refine a project locally.");
  const [taskInput, setTaskInput] = useState("");
  const [tasks, setTasks] = useState<ProjectTask[]>(defaultTasks);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    const saved = window.localStorage.getItem(storageKey);
    if (!saved) {
      return;
    }

    try {
      const parsed = JSON.parse(saved) as {
        projectName?: string;
        description?: string;
        tasks?: ProjectTask[];
      };

      if (parsed.projectName) setProjectName(parsed.projectName);
      if (parsed.description) setDescription(parsed.description);
      if (parsed.tasks?.length) setTasks(parsed.tasks);
    } catch {
      window.localStorage.removeItem(storageKey);
    }
  }, []);

  useEffect(() => {
    if (typeof window === "undefined") {
      return;
    }

    window.localStorage.setItem(
      storageKey,
      JSON.stringify({ projectName, description, tasks })
    );
  }, [projectName, description, tasks]);

  const completedCount = useMemo(() => tasks.filter((task) => task.done).length, [tasks]);

  const addTask = () => {
    const trimmed = taskInput.trim();
    if (!trimmed) {
      return;
    }

    setTasks((prev) => [{ id: crypto.randomUUID(), title: trimmed, done: false }, ...prev]);
    setTaskInput("");
  };

  const toggleTask = (id: string) => {
    setTasks((prev) => prev.map((task) => (task.id === id ? { ...task, done: !task.done } : task)));
  };

  const removeTask = (id: string) => {
    setTasks((prev) => prev.filter((task) => task.id !== id));
  };

  return (
    <main className="min-h-screen bg-[#050505] px-5 py-8 text-slate-100 md:px-10">
      <div className="mx-auto max-w-[1400px]">
        <div className="mb-6 flex items-center justify-between gap-4">
          <div>
            <p className="text-xs tracking-[0.2em] text-cyan-200 uppercase">Projects</p>
            <h1 className="mt-2 text-4xl font-semibold text-white md:text-5xl">Personal project workspace</h1>
            <p className="mt-2 max-w-2xl text-sm text-slate-400">
              Plan your own work locally, keep notes on-device, and track tasks without needing internet access.
            </p>
          </div>

          <Link
            href="/chat"
            className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-4 py-2 text-sm text-cyan-100 transition hover:bg-cyan-300/18"
          >
            Back to chat
          </Link>
        </div>

        <div className="grid gap-6 lg:grid-cols-[1.1fr_0.9fr]">
          <section className="rounded-3xl border border-white/10 bg-[#07101f]/95 p-6 shadow-[0_24px_80px_rgba(0,0,0,0.35)]">
            <div className="flex items-center gap-3">
              <div className="rounded-2xl border border-cyan-300/20 bg-cyan-300/10 p-3 text-cyan-100">
                <FolderKanban className="h-5 w-5" />
              </div>
              <div>
                <p className="text-sm text-slate-400">Current project</p>
                <p className="text-xl font-semibold text-white">{projectName}</p>
              </div>
            </div>

            <div className="mt-6 space-y-4">
              <label className="block">
                <span className="mb-2 block text-xs tracking-[0.2em] text-slate-400 uppercase">Project name</span>
                <input
                  value={projectName}
                  onChange={(event) => setProjectName(event.target.value)}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/40"
                />
              </label>

              <label className="block">
                <span className="mb-2 block text-xs tracking-[0.2em] text-slate-400 uppercase">Description</span>
                <textarea
                  value={description}
                  onChange={(event) => setDescription(event.target.value)}
                  rows={6}
                  className="w-full rounded-2xl border border-white/10 bg-white/5 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/40"
                />
              </label>

              <div className="rounded-2xl border border-white/10 bg-black/20 p-4">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-sm font-medium text-white">Progress</p>
                    <p className="text-xs text-slate-400">{completedCount} of {tasks.length} tasks completed</p>
                  </div>
                  <div className="rounded-full border border-cyan-300/30 bg-cyan-300/10 px-3 py-1 text-xs text-cyan-100">
                    Offline only
                  </div>
                </div>
                <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
                  <div className="flex h-full gap-1">
                    {Array.from({ length: 10 }).map((_, index) => {
                      const filled = tasks.length > 0 && index < Math.round((completedCount / tasks.length) * 10);
                      return (
                        <span
                          key={`progress-${index}`}
                          className={`h-full flex-1 rounded-full ${filled ? "bg-gradient-to-r from-cyan-300 to-violet-300" : "bg-white/10"}`}
                        />
                      );
                    })}
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="rounded-3xl border border-white/10 bg-white/[0.04] p-6 backdrop-blur-xl">
            <div className="flex items-center justify-between gap-4">
              <div>
                <p className="text-xs tracking-[0.2em] text-violet-200 uppercase">Tasks</p>
                <h2 className="mt-2 text-2xl font-semibold text-white">What to work on next</h2>
              </div>
              <Target className="h-6 w-6 text-cyan-200" />
            </div>

            <div className="mt-5 flex gap-2">
              <input
                value={taskInput}
                onChange={(event) => setTaskInput(event.target.value)}
                placeholder="Add a task for your project"
                className="flex-1 rounded-2xl border border-white/10 bg-black/20 px-4 py-3 text-slate-100 outline-none transition focus:border-cyan-300/40"
                onKeyDown={(event) => {
                  if (event.key === "Enter") {
                    event.preventDefault();
                    addTask();
                  }
                }}
              />
              <button
                type="button"
                onClick={addTask}
                className="rounded-2xl border border-cyan-300/30 bg-cyan-300/10 px-4 py-3 text-cyan-100 transition hover:bg-cyan-300/18"
                aria-label="Add task"
                title="Add task"
              >
                <Plus className="h-5 w-5" />
                <span className="sr-only">Add task</span>
              </button>
            </div>

            <div className="mt-4 space-y-3">
              {tasks.map((task) => (
                <div key={task.id} className="flex items-center gap-3 rounded-2xl border border-white/10 bg-black/20 px-4 py-3">
                  <button
                    type="button"
                    onClick={() => toggleTask(task.id)}
                    className={`flex h-5 w-5 shrink-0 items-center justify-center rounded-full border ${task.done ? "border-cyan-300 bg-cyan-300/20" : "border-white/20"}`}
                    aria-label="Toggle task"
                  >
                    {task.done && <span className="h-2 w-2 rounded-full bg-cyan-200" />}
                  </button>
                  <p className={`flex-1 text-sm ${task.done ? "text-slate-500 line-through" : "text-slate-200"}`}>
                    {task.title}
                  </p>
                  <button
                    type="button"
                    onClick={() => removeTask(task.id)}
                    className="rounded-full p-2 text-slate-500 transition hover:bg-white/10 hover:text-rose-200"
                    aria-label="Delete task"
                  >
                    <Trash2 className="h-4 w-4" />
                  </button>
                </div>
              ))}
            </div>

            <div className="mt-6 rounded-2xl border border-white/10 bg-white/[0.03] p-4 text-sm text-slate-400">
              <div className="flex items-center gap-2 text-slate-200">
                <Sparkles className="h-4 w-4 text-cyan-200" />
                Offline project note
              </div>
              <p className="mt-2">
                This page stores your project notes and tasks in the browser only, so you can keep working locally without internet access.
              </p>
              <Link href="/chat" className="mt-3 inline-flex items-center gap-2 text-cyan-200 hover:text-cyan-100">
                Open chat for help <ArrowRight className="h-4 w-4" />
              </Link>
            </div>
          </section>
        </div>
      </div>
    </main>
  );
}