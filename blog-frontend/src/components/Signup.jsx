import React, { useState, useMemo } from "react";
import { useNavigate, Link } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";

export default function SignUpPage({ baseUrl = "http://localhost:5000/api" }) {
  const navigate = useNavigate();
  const [firstname, setFirstname] = useState("");
  const [lastname, setLastname] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPwd, setShowPwd] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [ok, setOk] = useState(false);

  // floating particles
  const particles = useMemo(() =>
      new Array(20).fill(0).map((_, i) => ({ id: i, x: Math.random() * 100, y: Math.random() * 100, d: 5 + Math.random() * 10, t: 8 + Math.random() * 10, o: 0.2 + Math.random() * 0.5,})),[]);

  const doSignup = async (e) => {
    e.preventDefault();
    setError("");
    setOk(false);

    if (!firstname || !lastname || !email || !password) {
      setError("Please fill in all fields.");
      return;
    }

    try {
      setLoading(true);
      const res = await fetch(`${baseUrl}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ firstname, lastname, email, password }),
      });

      const data = await res.json().catch(() => ({}));

      if (!res.ok) {
        throw new Error(data?.error || "Signup failed");
      }

      setOk(true);
      setTimeout(() => navigate("/signin"), 1200);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="relative min-h-screen overflow-hidden bg-gray-900 text-white">
      {/* background blobs */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -left-32 h-[25rem] w-[25rem] rounded-full blur-3xl opacity-25 bg-gradient-to-br from-pink-500 via-indigo-500 to-cyan-400 animate-pulse" />
        <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-25 bg-gradient-to-tr from-emerald-400 via-rose-500 to-purple-600 animate-pulse [animation-duration:6s]" />
      </div>

      {/* floating particles */}
      <div aria-hidden="true" className="pointer-events-none absolute inset-0">
        {particles.map((p) => (
          <motion.span
            key={p.id}
            className="absolute rounded-full bg-white/40 shadow-[0_0_20px_rgba(255,255,255,0.25)]"
            style={{ width: p.d, height: p.d, left: `${p.x}%`, top: `${p.y}%`, opacity: p.o }}
            animate={{ y: [0, -10, 0], x: [0, 18, 0] }}
            transition={{ repeat: Infinity, duration: p.t, ease: "easeInOut" }}
          />
        ))}
      </div>

      {/* navbar */}
      <header className="relative z-10 flex items-center justify-between px-6 pt-5 md:px-10">
        <div className="flex items-center gap-3">
          <div className="h-10 w-10 rounded-xl bg-white/10 backdrop-blur ring-1 ring-white/15 shadow-[0_0_20px_rgba(99,102,241,0.6)]" />
          <span className="text-lg font-semibold tracking-wide">BlogSite</span>
        </div>
        <button
          onClick={() => navigate("/signin")}
          className="rounded-full bg-white/10 px-4 py-2 text-sm backdrop-blur ring-1 ring-white/15 hover:bg-white/15 transition"
        >
          Sign in
        </button>
      </header>

      {/* main content */}
      <main className="relative z-10 mx-auto flex max-w-7xl flex-col items-center px-6 md:flex-row md:py-10">
        
        {/* Illustration (left side) */}
        <motion.section
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex items-center justify-center p-6"
        >
          <img
            src="/Gemini_Generated_Image.png"
            alt="Illustration"
            className="hover:shadow-[0_0_50px_-8px_rgba(129,140,248,0.9)] transition"
          />
        </motion.section>

        {/* form card (right side) */}
        <motion.section
          initial={{ opacity: 0, y: 30, scale: 0.96 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ duration: 0.6, delay: 0.1 }}
          className="relative mt-10 w-full md:mt-0 md:w-1/2"
        >
          <div className="pointer-events-none absolute -inset-1 -z-10 rounded-3xl bg-gradient-to-br from-indigo-500/40 via-fuchsia-500/40 to-cyan-400/40 blur-2xl" />
          <div className="rounded-3xl border border-white/10 bg-white/5 p-6 backdrop-blur-xl shadow-[0_8px_50px_-12px_rgba(0,0,0,0.65)]">
            
            <h2 className="mb-1 text-xl font-semibold text-white/90">Create Account</h2>
            <p className="mb-6 text-sm text-white/60">Join us and start sharing your ideas today.</p>

            <form onSubmit={doSignup} className="space-y-4" noValidate>
              
              {/* Firstname */}
              <label className="block text-xs text-white/70">
                First Name
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={18} />
                  <input
                    type="text"
                    value={firstname}
                    onChange={(e) => setFirstname(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-10 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-fuchsia-400/60 focus:bg-white/15"
                    placeholder="Jane"
                    required
                  />
                </div>
              </label>

              {/* Lastname */}
              <label className="block text-xs text-white/70">
                Last Name
                <div className="relative mt-1">
                  <User className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={18} />
                  <input
                    type="text"
                    value={lastname}
                    onChange={(e) => setLastname(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-10 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-fuchsia-400/60 focus:bg-white/15"
                    placeholder="Doe"
                    required
                  />
                </div>
              </label>

              {/* Email */}
              <label className="block text-xs text-white/70">
                Email
                <div className="relative mt-1">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={18} />
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-10 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-fuchsia-400/60 focus:bg-white/15"
                    placeholder="you@example.com"
                    required
                  />
                </div>
              </label>

              {/* Password */}
              <label className="block text-xs text-white/70">
                Password
                <div className="relative mt-1">
                  <Lock className="absolute left-3 top-1/2 -translate-y-1/2 opacity-60" size={18} />
                  <input
                    type={showPwd ? "text" : "password"}
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full rounded-xl border border-white/10 bg-white/10 px-10 py-3 text-sm text-white placeholder-white/40 outline-none focus:border-fuchsia-400/60 focus:bg-white/15"
                    placeholder="••••••••"
                    required
                    minLength={6}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPwd((s) => !s)}
                    className="absolute right-2 top-1/2 -translate-y-1/2 rounded-lg p-2 text-white/70 hover:bg-white/10"
                  >
                    {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                  </button>
                </div>
              </label>

              {/* Submit */}
              <motion.button
                whileHover={{ scale: 1.015 }}
                whileTap={{ scale: 0.98 }}
                type="submit"
                disabled={loading}
                className="group relative flex w-full items-center justify-center gap-2 overflow-hidden rounded-xl bg-gradient-to-r from-pink-500 via-fuchsia-500 to-indigo-400 px-5 py-3 text-sm font-semibold text-white shadow-lg shadow-fuchsia-900/30 focus:outline-none"
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? <Loader2 className="animate-spin" size={16} /> : <ArrowRight size={16} />}
                  {loading ? "Creating…" : "Sign up"}
                </span>
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition group-hover:translate-x-0" />
              </motion.button>

              {/* Error/Success */}
              {error && (
                <div className="flex items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 p-3 text-rose-200">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  <p className="text-xs">{error}</p>
                </div>
              )}
              {ok && (
                <div className="flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 p-3 text-emerald-200">
                  <CheckCircle2 size={16} />
                  <p className="text-xs">Account created! Redirecting…</p>
                </div>
              )}

              {/* Social buttons */}
              <div className="mt-2 grid grid-cols-1 gap-3 sm:grid-cols-2">
                <button type="button" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur hover:bg-white/10">
                  Continue with Google
                </button>
                <button type="button" className="rounded-xl border border-white/10 bg-white/5 px-4 py-2 text-sm text-white/80 backdrop-blur hover:bg-white/10">
                  Continue with GitHub
                </button>
              </div>

              <p className="pt-2 text-center text-xs text-white/60">
                Already have an account?{" "}
                <button type="button" onClick={() => navigate("/signin")} className="text-fuchsia-300 hover:text-white">
                  Sign in here
                </button>
              </p>
            </form>
          </div>
        </motion.section>
      </main>

      {/* subtle grid */}
      <div className="pointer-events-none absolute inset-0 bg-[radial-gradient(transparent_1px,rgba(255,255,255,0.02)_1px)] [background-size:18px_18px]" />
    </div>
  );
}
