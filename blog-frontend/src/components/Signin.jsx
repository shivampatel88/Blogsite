import React, { useMemo, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import logo from "../assets/logo.png"

import { Eye, EyeOff, Mail, Lock, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export default function SignInPage({ baseUrl = "http://localhost:5000/api", onSuccess }) {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  const particles = useMemo(
    () => new Array(28).fill(0).map((_, i) => ({
      id: i,
      x: Math.random() * 100,
      y: Math.random() * 100,
      d: 4 + Math.random() * 10,
      t: 6 + Math.random() * 10,
      o: 0.2 + Math.random() * 0.6,
    })),
    []
  );

  const doSignin = async (e) => {
    e.preventDefault();
    setError("");
    setOk(false);

    if (!email || !password) {
      setError("Please fill in both fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Invalid credentials");
      }

      if (data?.token) {
        localStorage.setItem("token", data.token);
      }
      setOk(true);
      if (typeof onSuccess === "function") onSuccess(data?.user || null);
      setTimeout(() => navigate("/home"), 700);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-950 text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-30 bg-gradient-to-br from-fuchsia-500 via-indigo-500 to-cyan-400 animate-pulse" />
        <div className="absolute -bottom-40 -right-40 h-[30rem] w-[30rem] rounded-full blur-3xl opacity-30 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600 animate-pulse [animation-duration:5s]" />
      </div>
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white/40 shadow-[0_0_24px_0_rgba(255,255,255,0.35)]"
            style={{ width: p.d, height: p.d, left: `${p.x}%`, top: `${p.y}%`, opacity: p.o }}
            animate={{ y: [0, -12, 0], x: [0, 6, 0] }}
            transition={{ repeat: Infinity, duration: p.t, ease: "easeInOut" }}
          />
        ))}
      </div>

      <header className="relative z-10 flex items-center justify-between px-6 py-5 md:px-10">
        <div className="flex items-center gap-3">
          <img src = {logo} alt = "logo" className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur ring-1 ring-white/15 shadow-[0_0_24px_0_rgba(99,102,241,0.6)]" />
          <span className="text-lg font-semibold tracking-wide">BlogSite</span>
        </div>
        <nav className="hidden gap-6 text-sm text-white/80 md:flex">
          <Link to="/" className="hover:text-white/100 transition">Home</Link>
          <Link to="/about" className="hover:text-white/100 transition">About</Link>
          <Link to="/contact" className="hover:text-white/100 transition">Contact</Link>
        </nav>
        <button onClick={() => navigate("/signup")} className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur ring-1 ring-white/15 hover:bg-white/15 transition">
          Create account
        </button>
      </header>

      <main className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 py-10 md:flex-row md:py-20">
        <motion.section
          initial={{ opacity: 0, y: 16 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 pr-0 md:pr-8"
        >
          <h1 className="text-4xl font-bold leading-tight sm:text-5xl">
            Welcome back to
            <span className="relative mx-2 inline-block">
              <span className="relative z-10 bg-gradient-to-r from-indigo-300 via-fuchsia-300 to-amber-200 bg-clip-text text-transparent">
                brilliant blogging
              </span>
              <span className="absolute -inset-1 -z-10 rounded-full bg-indigo-500/20 blur-xl" />
            </span>
          </h1>
          <p className="mt-4 max-w-xl text-base text-white/70">
            Sign in to write, discover and discuss stories that matter. Your ideas deserve a beautiful canvas.
          </p>

          <div className="mt-6 flex flex-wrap gap-3">
            {[
              "Beautiful editor",
              "Instant previews",
              "Categories & tags",
              "Secure auth",
            ].map((t) => (
              <span
                key={t}
                className="rounded-full bg-white/5 px-3 py-1 text-xs text-white/80 ring-1 ring-white/10 backdrop-blur"
              >
                {t}
              </span>
            ))}
          </div>
        </motion.section>

        <motion.section
          initial={{ opacity: 0, y: 28, scale: 0.98 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.5, delay: 0.15 }}
          className="relative mt-10 w-full md:mt-0 md:w-1/2"
        >
          <div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/40 to-cyan-400/40 blur-2xl" />

          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_8px_60px_-12px_rgba(0,0,0,0.65)]">
            <h2 className="mb-1 text-xl font-semibold text-white/90">Sign in</h2>
            <p className="mb-6 text-sm text-white/60">Welcome back! We missed your ideas.</p>

            <form onSubmit={doSignin} className="space-y-4" noValidate>
              {/* Email */}
              <label className="group block">
                <span className="mb-1 block text-xs text-white/70">Email</span>
                <div className="relative">
                  <Mail className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={18} />
                  <input
                    type="email"
                    inputMode="email"
                    autoComplete="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-10 py-3 text-sm text-white placeholder-white/40 outline-none ring-0 transition focus:border-indigo-400/60 focus:bg-white/15"
                    placeholder="you@example.com"
                    aria-label="Email"
                    required
                  />
                </div>
              </label>

              <label className="group block">
                <span className="mb-1 block text-xs text-white/70">Password</span>
                <div className="relative">
                  <Lock className="pointer-events-none absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={18} />
                  <input
                    type={showPwd ? "text" : "password"}
                    autoComplete="current-password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-10 py-3 text-sm text-white placeholder-white/40 outline-none transition focus:border-indigo-400/60 focus:bg-white/15"
                    placeholder="••••••••"
                    aria-label="Password"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-white/70 hover:bg-white/10"
                    aria-label={showPwd ? "Hide password" : "Show password"}
                  >
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              <div className="flex items-center justify-between text-xs text-white/70">
                <label className="inline-flex items-center gap-2">
                  <input type="checkbox" className="h-3.5 w-3.5 rounded border-white/20 bg-white/10" />
                  Remember me
                </label>
                <button type="button" className="text-indigo-300 hover:text-white">Forgot password?</button>
              </div>

              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-fuchsia-500 to-cyan-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 focus:outline-none"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <Loader2 className="animate-spin" size={16} />
                  ) : (
                    <ArrowRight size={16} />
                  )}
                  {loading ? "Signing in..." : "Sign in"}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition group-hover:translate-x-0" />
              </motion.button>

              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-rose-200">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  <p className="text-xs">{error}</p>
                </div>
              )}
              {ok && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-emerald-200">
                  <CheckCircle2 size={16} />
                  <p className="text-xs">Welcome back! Redirecting…</p>
                </div>
              )}

              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button type="button" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur hover:bg-white/10">
                  Continue with Google
                </button>
                <button type="button" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur hover:bg-white/10">
                  Continue with GitHub
                </button>
              </div>

              <p className="pt-2 text-center text-xs text-white/60">
                New here? <button type="button" onClick={() => navigate("/signup")} className="text-indigo-300 hover:text-white">Create an account</button>
              </p>
            </form>
          </div>
        </motion.section>
      </main>

      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.02)_1px)] [background-size:18px_18px]" />
    </div>
  );
}
