import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight } from "lucide-react";

export default function HeroSection() {
  return (
    <section id="hero" className="relative scroll-mt-28 overflow-hidden">
      <div className="absolute inset-0 bg-[radial-gradient(circle_at_18%_30%,rgba(47,243,255,0.17),transparent_35%),radial-gradient(circle_at_78%_18%,rgba(155,92,255,0.14),transparent_32%),linear-gradient(180deg,#071019_0%,#050505_42%,#17070b_100%)]" />
      <div className="absolute right-[12%] top-24 hidden h-96 w-96 rounded-full border border-cyan-300/25 bg-cyan-300/10 blur-3xl lg:block" />
      <div className="absolute left-[4%] top-[52%] hidden h-72 w-72 rounded-full border border-violet-300/20 bg-violet-300/10 blur-3xl lg:block" />
      <motion.div
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.5 }}
        className="relative mx-auto flex min-h-[calc(100vh-78px)] w-full max-w-[1400px] items-center px-5 py-20 md:px-10"
      >
        <div className="grid w-full gap-12 lg:grid-cols-[1.2fr_0.8fr] lg:items-center">
          <div className="space-y-7">
            <div className="space-y-4">
              <h1 className="max-w-4xl text-5xl leading-[0.96] font-semibold tracking-tight text-white sm:text-6xl md:text-7xl">
                Build, Learn, and Write with Local Intelligence.
              </h1>
              <p className="max-w-2xl text-lg text-slate-300 md:text-xl">
                Quill gives you a private, high-focus AI workspace for writing, tutoring, and engineering workflows without cloud dependence.
              </p>
            </div>
            <div className="flex flex-wrap items-center gap-3 pt-1">
              <Link
                href="/login"
                className="rounded-2xl bg-gradient-to-r from-cyan-300/35 to-cyan-300/20 px-6 py-3 text-sm font-medium text-white transition hover:from-cyan-300/45 hover:to-cyan-300/30"
              >
                Join the Workspace
              </Link>
            </div>
          </div>

          <div className="relative hidden min-h-[440px] lg:block">
            <div className="absolute left-1/2 top-10 h-24 w-24 -translate-x-1/2 rounded-full border border-cyan-300/35 bg-black/50" />
            <div className="absolute left-1/2 top-28 h-[360px] w-[250px] -translate-x-1/2 bg-[conic-gradient(from_180deg_at_50%_0%,rgba(255,255,255,0.42),rgba(255,255,255,0.1),rgba(255,255,255,0.4))] opacity-70 [clip-path:polygon(50%_0,85%_100,15%_100)]" />
            <div className="absolute bottom-8 left-1/2 h-24 w-80 -translate-x-1/2 rounded-[100%] bg-cyan-200/10 blur-sm" />
            <div className="absolute bottom-0 right-0 h-64 w-80 rounded-tl-[120px] border border-white/10 bg-black/30" />
          </div>
          <div className="absolute bottom-6 left-5 md:left-10">
            <a
              href="#about"
              className="inline-flex items-center gap-2 rounded-full border border-white/15 bg-black/35 px-4 py-2 text-sm text-slate-200"
            >
              Scroll for details
              <ArrowRight className="h-4 w-4" />
            </a>
          </div>
        </div>
      </motion.div>
    </section>
  );
}
