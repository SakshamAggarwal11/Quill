"use client";

import { useState } from "react";
import { motion } from "framer-motion";
import { ChevronDown } from "lucide-react";

const faqs = [
  {
    q: "Can Quill run without any internet access?",
    a: "Yes. Quill is designed around local inference and local storage workflows by default."
  },
  {
    q: "Is my writing data sent externally?",
    a: "No. The pipeline can stay fully on-device through your local API route and Ollama runtime."
  },
  {
    q: "Can I use this for tutoring and technical writing?",
    a: "Yes. It supports educational scaffolding, Socratic prompts, and structured editing flows."
  }
];

const roadmap = [
  { quarter: "Q2 2026", title: "Local Knowledge Library", body: "Private document indexing with semantic retrieval." },
  { quarter: "Q3 2026", title: "Context Workspaces", body: "Project-scoped memory and persistent thread snapshots." },
  { quarter: "Q4 2026", title: "Voice + Dictation", body: "Offline speech input and polished draft generation." }
];

export default function FAQRoadmapSection() {
  const [open, setOpen] = useState(0);

  return (
    <section id="upcoming" className="scroll-mt-24 px-5 pb-24 md:px-10">
      <div className="mx-auto grid w-full max-w-[1400px] gap-6">
        <motion.div
          id="faq"
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
        >
          <p className="text-xs tracking-[0.2em] text-violet-200 uppercase">Upcoming</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">Roadmap Timeline</h3>
          <ol className="mt-5 space-y-5">
            {roadmap.map((item) => (
              <li key={item.title} className="relative pl-6">
                <span className="absolute left-0 top-1.5 h-2.5 w-2.5 rounded-full bg-cyan-300" />
                <span className="absolute left-[4px] top-4 h-16 w-px bg-gradient-to-b from-cyan-300/60 to-violet-300/10" />
                <p className="text-xs text-violet-200">{item.quarter}</p>
                <h4 className="mt-1 text-sm font-semibold text-slate-100">{item.title}</h4>
                <p className="mt-1 text-sm text-slate-300">{item.body}</p>
              </li>
            ))}
          </ol>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
        >
          <p className="text-xs tracking-[0.2em] text-cyan-200 uppercase">FAQ</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">Common Questions</h3>
          <div className="mt-5 space-y-3">
            {faqs.map((item, idx) => {
              const isOpen = idx === open;
              return (
                <div key={item.q} className="rounded-xl border border-white/10 bg-black/20">
                  <button
                    type="button"
                    onClick={() => setOpen(isOpen ? -1 : idx)}
                    className="flex w-full items-center justify-between px-4 py-3 text-left"
                  >
                    <span className="text-sm text-slate-100">{item.q}</span>
                    <ChevronDown className={`h-4 w-4 text-slate-400 transition ${isOpen ? "rotate-180" : ""}`} />
                  </button>
                  {isOpen && <p className="border-t border-white/10 px-4 py-3 text-sm text-slate-300">{item.a}</p>}
                </div>
              );
            })}
          </div>
        </motion.div>
      </div>
    </section>
  );
}
