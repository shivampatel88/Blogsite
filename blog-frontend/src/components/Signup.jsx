import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { Eye, EyeOff, Mail, Lock, User, ArrowRight, CheckCircle2, Loader2 } from "lucide-react";
import logo from "../assets/logo.png";

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
      if (!res.ok) throw new Error(data?.error || "Signup failed");

      setOk(true);
      setTimeout(() => navigate("/signin"), 1200);
    } catch (err) {
      setError(err.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gray-900 text-white flex flex-col">   
      <header className="flex items-center justify-between px-6 py-4 border-b border-white/10">
        <div className="flex items-center gap-3">
          <img src={logo} alt="Logo" className="h-10 w-10 rounded-lg shadow-md" />
          <span className="text-lg font-semibold">BlogSite</span>
        </div>
        <button
          onClick={() => navigate("/signin")}
          className="rounded-md bg-white/10 px-4 py-2 text-sm hover:bg-white/20 transition"
        >
          Sign in
        </button>
      </header>

      <main className="flex flex-1 flex-col md:flex-row items-center justify-center px-6 py-10 gap-12">

        <motion.div
          initial={{ opacity: 0, x: -20 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 flex justify-center"
        >
          <img
            src="/Gemini_Generated_Image.png"
            alt="Illustration"
            className="w-3/4 rounded-lg shadow-lg hover:shadow-xl transition"
          />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6 }}
          className="w-full md:w-1/2 max-w-md bg-gray-800/70 p-8 rounded-2xl shadow-lg"
        >
          <h2 className="mb-2 text-2xl font-semibold">Create Account</h2>
          <p className="mb-6 text-sm text-gray-400">Join us and start sharing your ideas today.</p>

          <form onSubmit={doSignup} className="space-y-4">
            <div>
              <label className="text-sm">First Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={firstname}
                  onChange={(e) => setFirstname(e.target.value)}
                  className="w-full bg-gray-700 px-10 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Jane"
                />
              </div>
            </div>

            <div>
              <label className="text-sm">Last Name</label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="text"
                  value={lastname}
                  onChange={(e) => setLastname(e.target.value)}
                  className="w-full bg-gray-700 px-10 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="Doe"
                />
              </div>
            </div>

            <div>
              <label className="text-sm">Email</label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full bg-gray-700 px-10 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="you@example.com"
                />
              </div>
            </div>

            <div>
              <label className="text-sm">Password</label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" size={18} />
                <input
                  type={showPwd ? "text" : "password"}
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full bg-gray-700 px-10 py-3 rounded-lg focus:ring-2 focus:ring-indigo-500"
                  placeholder="••••••••"
                />
                <button
                  type="button"
                  onClick={() => setShowPwd(!showPwd)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-400"
                >
                  {showPwd ? <EyeOff size={18} /> : <Eye size={18} />}
                </button>
              </div>
            </div>

            <motion.button
              whileHover={{ scale: 1.02 }}
              whileTap={{ scale: 0.98 }}
              type="submit"
              disabled={loading}
              className="w-full bg-indigo-600 hover:bg-indigo-700 py-3 rounded-lg text-white font-semibold"
            >
              {loading ? <Loader2 className="animate-spin inline" size={18} /> : "Sign up"}
            </motion.button>

            {error && <p className="text-red-400 text-sm">{error}</p>}
            {ok && <p className="text-green-400 text-sm">Account created! Redirecting…</p>}

            <p className="text-center text-sm text-gray-400">
              Already have an account?{" "}
              <button type="button" onClick={() => navigate("/signin")} className="text-indigo-400 hover:underline">
                Sign in here
              </button>
            </p>
          </form>
        </motion.div>
      </main>
    </div>
  );
}
