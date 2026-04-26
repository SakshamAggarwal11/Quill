"use client";

import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState, type FormEvent } from "react";
import QuillLogo from "@/components/landing/QuillLogo";
import { saveAuthSession } from "./session";

type AuthMode = "login" | "signup";

type AuthPageProps = {
  defaultMode: AuthMode;
};

export default function AuthPage({ defaultMode }: AuthPageProps) {
  const [mode, setMode] = useState<AuthMode>(defaultMode);
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [fullName, setFullName] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [error, setError] = useState<string | null>(null);
  const router = useRouter();

  const handleSubmit = (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);

    if (!email.trim() || !password.trim()) {
      setError("Enter your email and password to continue.");
      return;
    }

    if (mode === "signup") {
      if (!fullName.trim()) {
        setError("Enter your full name to create an account.");
        return;
      }

      if (password !== confirmPassword) {
        setError("Passwords do not match.");
        return;
      }
    }

    saveAuthSession({
      email: email.trim(),
      name: mode === "signup" ? fullName.trim() : undefined
    });
    router.push("/chat");
  };

  return (
    <main className="min-h-screen bg-[radial-gradient(circle_at_12%_18%,rgba(47,243,255,0.16),transparent_34%),radial-gradient(circle_at_88%_82%,rgba(155,92,255,0.18),transparent_30%),linear-gradient(180deg,#071019_0%,#050505_55%,#071019_100%)] px-5 py-10 md:px-10 md:py-14">
      <div className="mx-auto flex min-h-[calc(100vh-80px)] w-full max-w-[1180px] items-center justify-center">
        <section className="w-full max-w-[420px] rounded-3xl border border-white/10 bg-[#07101f]/90 p-6 text-slate-100 shadow-[0_24px_80px_rgba(0,0,0,0.45)] backdrop-blur-xl md:p-8">
          <div className="flex items-center gap-3">
            <QuillLogo />
            <div>
              <p className="text-sm font-semibold tracking-tight text-white">Quill</p>
              <p className="text-xs text-slate-400">Private AI Studio</p>
            </div>
          </div>

          <h1 className="mt-7 text-3xl leading-tight font-semibold text-white">
            {mode === "login" ? "Welcome back" : "Create your Quill account"}
          </h1>
          <p className="mt-2 text-sm text-slate-400">
            {mode === "login"
              ? "Sign in to continue your workspace."
              : "Use one unique email and a secure password."}
          </p>

          <div className="mt-6 grid grid-cols-2 rounded-2xl border border-white/10 bg-black/25 p-1">
            <button
              type="button"
              onClick={() => setMode("login")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                mode === "login" ? "bg-cyan-300 text-slate-950" : "text-slate-300 hover:bg-white/5"
              }`}
            >
              Login
            </button>
            <button
              type="button"
              onClick={() => setMode("signup")}
              className={`rounded-xl px-4 py-2 text-sm font-medium transition ${
                mode === "signup" ? "bg-cyan-300 text-slate-950" : "text-slate-300 hover:bg-white/5"
              }`}
            >
              Sign Up
            </button>
          </div>

          <form className="mt-6 space-y-3" onSubmit={handleSubmit}>
            {mode === "signup" && (
              <div>
                <label className="mb-1 block text-xs text-slate-400">Full Name</label>
                <input
                  type="text"
                  placeholder="Enter your full name"
                  value={fullName}
                  onChange={(event) => setFullName(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#111a2c] text-slate-100 placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-cyan-300/30"
                />
              </div>
            )}

            <div>
              <label className="mb-1 block text-xs text-slate-400">Email</label>
              <input
                type="email"
                placeholder="Enter your email"
                value={email}
                onChange={(event) => setEmail(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#111a2c] text-slate-100 placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-cyan-300/30"
              />
            </div>

            <div>
              <label className="mb-1 block text-xs text-slate-400">Password</label>
              <input
                type="password"
                placeholder="Enter your password"
                value={password}
                onChange={(event) => setPassword(event.target.value)}
                className="w-full rounded-xl border border-white/10 bg-[#111a2c] text-slate-100 placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-cyan-300/30"
              />
            </div>

            {mode === "signup" && (
              <div>
                <label className="mb-1 block text-xs text-slate-400">Confirm Password</label>
                <input
                  type="password"
                  placeholder="Confirm your password"
                  value={confirmPassword}
                  onChange={(event) => setConfirmPassword(event.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-[#111a2c] text-slate-100 placeholder:text-slate-500 focus:border-cyan-300/50 focus:ring-cyan-300/30"
                />
              </div>
            )}

            {mode === "login" && (
              <div className="flex justify-end pt-1">
                <a href="#" className="text-xs text-cyan-200 hover:text-cyan-100">
                  Forgot Password?
                </a>
              </div>
            )}

            {error && <p className="rounded-xl border border-rose-400/30 bg-rose-400/10 px-3 py-2 text-xs text-rose-200">{error}</p>}

            <button
              type="submit"
              className="mt-2 w-full rounded-xl bg-cyan-400 py-2.5 text-sm font-semibold text-slate-950 transition hover:bg-cyan-300"
            >
              {mode === "login" ? "Log In" : "Sign Up"}
            </button>
          </form>

          <div className="mt-5 text-center text-sm text-slate-400">
            {mode === "login" ? (
              <>
                No account yet?{" "}
                <button type="button" onClick={() => setMode("signup")} className="font-semibold text-cyan-200 hover:text-cyan-100">
                  Create one
                </button>
              </>
            ) : (
              <>
                Already registered?{" "}
                <button type="button" onClick={() => setMode("login")} className="font-semibold text-cyan-200 hover:text-cyan-100">
                  Log in
                </button>
              </>
            )}
          </div>

          <div className="mt-5 text-center text-sm text-slate-400">
            <Link href="/" className="text-cyan-200 hover:text-cyan-100">
              Back to Home
            </Link>
          </div>
        </section>
      </div>
    </main>
  );
}
