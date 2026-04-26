import { motion } from "framer-motion";
import { BookOpenText, PenLine, ShieldCheck } from "lucide-react";

const bentoItems = [
  {
    title: "Offline-first",
    body: "Run models and workflows locally for predictable performance and complete privacy.",
    icon: ShieldCheck,
    className: "md:col-span-2"
  },
  {
    title: "Educational Support",
    body: "Socratic explanations, concept checks, and study scaffolds for deep retention.",
    icon: BookOpenText,
    className: "md:row-span-2"
  },
  {
    title: "Writing Assistant",
    body: "Refine tone, structure, and clarity while keeping all drafts on-device.",
    icon: PenLine,
    className: "md:col-span-1"
  }
];

export default function WorkflowBento() {
  return (
    <section id="features" className="scroll-mt-24 px-5 py-20 md:px-10">
      <div className="mx-auto w-full max-w-[1400px]">
        <div className="mb-10 max-w-3xl">
          <p className="text-xs tracking-[0.2em] text-violet-200 uppercase">Features</p>
          <h2 className="mt-2 text-3xl font-semibold text-white md:text-5xl">Feature System Built for Real Work</h2>
        </div>
        <div className="grid gap-5 md:grid-cols-3 md:grid-rows-2">
          {bentoItems.map((item, index) => {
            const Icon = item.icon;
            return (
              <motion.article
                key={item.title}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true, amount: 0.3 }}
                transition={{ duration: 0.4, delay: index * 0.08 }}
                className={`rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl ${item.className}`}
              >
                <div className="mb-5 inline-flex rounded-2xl border border-white/10 bg-black/30 p-3">
                  <Icon className="h-5 w-5 text-cyan-200" />
                </div>
                <h3 className="text-2xl font-semibold text-slate-100">{item.title}</h3>
                <p className="mt-3 max-w-prose text-base leading-relaxed text-slate-300">{item.body}</p>
              </motion.article>
            );
          })}
        </div>
      </div>
    </section>
  );
}
