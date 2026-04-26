import { motion } from "framer-motion";

export default function VisualDataSection() {
  return (
    <section id="security" className="scroll-mt-24 px-5 pb-20 md:px-10">
      <div className="mx-auto grid w-full max-w-[1400px] gap-6">
        <motion.div
          initial={{ opacity: 0, x: -18 }}
          whileInView={{ opacity: 1, x: 0 }}
          viewport={{ once: true, amount: 0.4 }}
          className="rounded-3xl border border-white/10 bg-white/[0.04] p-8 backdrop-blur-xl"
        >
          <p className="text-xs tracking-[0.2em] text-cyan-200 uppercase">Security Architecture</p>
          <h3 className="mt-2 text-3xl font-semibold text-white">On-device Processing Pipeline</h3>
          <svg viewBox="0 0 540 250" className="mt-5 w-full">
            <defs>
              <linearGradient id="lineGrad" x1="0" x2="1">
                <stop offset="0%" stopColor="#2ff3ff" />
                <stop offset="100%" stopColor="#9b5cff" />
              </linearGradient>
            </defs>
            <rect x="20" y="90" width="145" height="66" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
            <text x="92" y="128" fill="#d1d5db" textAnchor="middle" fontSize="13">User Input</text>
            <rect x="197" y="90" width="145" height="66" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
            <text x="270" y="121" fill="#d1d5db" textAnchor="middle" fontSize="13">Local API</text>
            <text x="270" y="140" fill="#9ca3af" textAnchor="middle" fontSize="11">Encrypted Context</text>
            <rect x="374" y="90" width="145" height="66" rx="14" fill="rgba(255,255,255,0.06)" stroke="rgba(255,255,255,0.2)" />
            <text x="447" y="128" fill="#d1d5db" textAnchor="middle" fontSize="13">Ollama Engine</text>
            <path d="M165 123 H192 M342 123 H368" stroke="url(#lineGrad)" strokeWidth="3" strokeLinecap="round" />
            <circle cx="192" cy="123" r="4" fill="#2ff3ff" />
            <circle cx="342" cy="123" r="4" fill="#9b5cff" />
            <rect x="205" y="182" width="130" height="38" rx="12" fill="rgba(47,243,255,0.08)" stroke="rgba(47,243,255,0.3)" />
            <text x="270" y="205" fill="#a5f3fc" textAnchor="middle" fontSize="12">No External Transit</text>
          </svg>
        </motion.div>

      </div>
    </section>
  );
}
