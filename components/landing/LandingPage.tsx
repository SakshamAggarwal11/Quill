"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import HeroSection from "./HeroSection";
import AboutSection from "./AboutSection";
import WorkflowBento from "./WorkflowBento";
import VisualDataSection from "./VisualDataSection";
import FAQRoadmapSection from "./FAQRoadmapSection";
import QuillLogo from "./QuillLogo";
import { clearAuthSession } from "@/components/auth/session";
import { useAuthSession } from "@/components/auth/useAuthSession";

const navItems = [
  { href: "#hero", label: "Home" },
  { href: "#about", label: "About" },
  { href: "#features", label: "Features" },
  { href: "#security", label: "Security" },
  { href: "#upcoming", label: "Upcomming" },
  { href: "#faq", label: "FAQ" }
];

export default function LandingPage() {
  const router = useRouter();
  const session = useAuthSession();

  const handleSignOut = () => {
    clearAuthSession();
    router.push("/");
  };

  return (
    <main className="min-h-screen pb-10">
      <header className="sticky top-0 z-40 border-b border-cyan-300/20 bg-[#050505]/80 backdrop-blur-xl">
        <nav className="mx-auto grid w-full max-w-[1400px] grid-cols-[auto_1fr_auto] items-center gap-3 px-5 py-3 md:px-10">
          <div className="flex items-center gap-3">
            <QuillLogo />
            <p className="text-2xl font-semibold tracking-tight text-white md:text-3xl">Quill</p>
          </div>
          <div className="hidden items-center justify-center gap-1 rounded-full border border-white/10 bg-white/5 p-1 md:flex">
            {navItems.map((item) => (
              <a
                key={item.href}
                href={item.href}
                className="rounded-full px-4 py-2 text-sm text-slate-300 transition hover:bg-white/10 hover:text-white"
              >
                {item.label}
              </a>
            ))}
          </div>
          <div className="flex items-center justify-end">
            {session ? (
              <button
                type="button"
                onClick={handleSignOut}
                className="rounded-full border border-cyan-300/35 bg-black/35 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/10"
              >
                Sign Out
              </button>
            ) : (
              <Link
                href="/login"
                className="rounded-full border border-cyan-300/35 bg-black/35 px-4 py-2 text-sm font-medium text-cyan-100 transition hover:bg-cyan-300/10"
              >
                Sign In
              </Link>
            )}
          </div>
        </nav>
      </header>
      <HeroSection />
      <AboutSection />
      <WorkflowBento />
      <VisualDataSection />
      <FAQRoadmapSection />
    </main>
  );
}
