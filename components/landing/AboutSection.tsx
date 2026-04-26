import { motion } from "framer-motion";

const weeklyOutput = [
  { day: "Mon", value: 14 },
  { day: "Tue", value: 22 },
  { day: "Wed", value: 29 },
  { day: "Thu", value: 37 },
  { day: "Fri", value: 43 },
  { day: "Sat", value: 45 }
];

export default function AboutSection() {
  return (
    <section id="about" className="scroll-mt-24 px-5 py-16 md:px-10 md:py-20">
      <div className="mx-auto grid w-full max-w-[1400px] gap-6">
        <motion.div
          initial={{ opacity: 0, y: 24 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.35 }}
          transition={{ duration: 0.45 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl md:p-12"
        >
          <p className="text-xs tracking-[0.2em] text-cyan-200 uppercase">About</p>
          <h2 className="mt-3 max-w-4xl text-3xl leading-tight font-semibold text-white md:text-5xl">
            Quill is a local-first AI workspace for structured learning, writing, and daily execution.
          </h2>
          <p className="mt-5 max-w-4xl text-base leading-relaxed text-slate-300 md:text-lg">
            Designed for focused builders, Quill runs with an offline pipeline so your prompts, drafts, and context stay in your environment. It combines educational guidance, writing support, and practical workflow assistance in a single professional interface.
          </p>
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
        >
          <p className="text-xs tracking-[0.2em] text-violet-200 uppercase">Productivity Boost</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">Weekly Output Trajectory</h3>
          <div className="mt-5 rounded-2xl border border-white/10 bg-black/20 p-4">
            <svg viewBox="0 0 640 260" className="h-64 w-full">
              <defs>
                <linearGradient id="aboutFillGrad" x1="0" y1="0" x2="0" y2="1">
                  <stop offset="5%" stopColor="#2ff3ff" stopOpacity={0.45} />
                  <stop offset="95%" stopColor="#9b5cff" stopOpacity={0.06} />
                </linearGradient>
                <linearGradient id="aboutLineGrad" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#2ff3ff" />
                  <stop offset="100%" stopColor="#9b5cff" />
                </linearGradient>
              </defs>

              <g stroke="rgba(255,255,255,0.1)" strokeDasharray="4 4">
                <line x1="36" y1="40" x2="604" y2="40" />
                <line x1="36" y1="88" x2="604" y2="88" />
                <line x1="36" y1="136" x2="604" y2="136" />
                <line x1="36" y1="184" x2="604" y2="184" />
              </g>

              <path
                d="M36 188 L140 156 L244 126 L348 92 L452 70 L556 62 L604 54 L604 220 L36 220 Z"
                fill="url(#aboutFillGrad)"
              />
              <path
                d="M36 188 L140 156 L244 126 L348 92 L452 70 L556 62 L604 54"
                fill="none"
                stroke="url(#aboutLineGrad)"
                strokeWidth="3"
                strokeLinecap="round"
                strokeLinejoin="round"
              />

              {weeklyOutput.map((item, index) => {
                const x = 36 + index * 104;
                const y = [188, 156, 126, 92, 70, 62][index];
                return (
                  <g key={item.day}>
                    <circle cx={x} cy={y} r="5" fill="#2ff3ff" />
                    <text x={x} y="244" textAnchor="middle" fill="#9ca3af" fontSize="12">
                      {item.day}
                    </text>
                  </g>
                );
              })}
            </svg>
          </div>
        </motion.div>
      </div>
    </section>
  );
}
