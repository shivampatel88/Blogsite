import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API_URL from "../api"; // your axios instance

import { ArrowLeft, CheckCircle2, ImagePlus, Loader2, X, Sparkles, Type, BookOpen, Zap } from "lucide-react";

const CATEGORIES = [
  { value: "all", label: "All", icon: "🌍", color: "from-blue-500 to-cyan-500" },
  { value: "business", label: "Business & Finance", icon: "💼", color: "from-green-500 to-emerald-500" },
  { value: "travel", label: "Travel", icon: "✈️", color: "from-amber-500 to-orange-500" },
  { value: "food", label: "Food", icon: "🍕", color: "from-red-500 to-rose-500" },
  { value: "technology", label: "Science & Technology", icon: "🔬", color: "from-purple-500 to-indigo-500" },
];

export default function CreateBlog() {
  const navigate = useNavigate();

  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const [category, setCategory] = useState(CATEGORIES[0].value);
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");
  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const fileInputRef = useRef(null);

  const onPickBanner = () => fileInputRef.current?.click();

  const onBannerChange = (e) => {
    const f = e.target.files?.[0];
    if (!f) return;
    setBannerFile(f);
    const url = URL.createObjectURL(f);
    setBannerPreview(url);
  };

  const removeBanner = () => {
    setBannerPreview(null);
    setBannerFile(null);
  };

  const canPublish =
    title.trim().length > 0 && desc.trim().length > 0 && !loading;

  const handlePublish = async (e) => {
    e.preventDefault();
    setErr("");
    setOk(false);

    if (!canPublish) {
      setErr("Please fill Title and Description.");
      return;
    }

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("title", title);
      fd.append("content", desc);
      fd.append("category", category);
      if (bannerFile) fd.append("banner", bannerFile);

      const res = await API_URL.post("/blog", fd, {
        headers: { "Content-Type": "multipart/form-data" },
      });

      if (res.status === 201 || res.status === 200) {
        setOk(true);
        setTimeout(() => navigate("/home"), 1200);
      } else {
        throw new Error(res?.data?.error || "Publish failed");
      }
    } catch (e) {
      setErr(e?.response?.data?.error || e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden relative">
      {/* Animated background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 blur-3xl animate-pulse-slow animation-delay-2000" />
        
        {/* Floating particles */}
        {[...Array(15)].map((_, i) => (
          <motion.div
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-purple-400/10 to-pink-400/10"
            style={{
              width: Math.random() * 20 + 5,
              height: Math.random() * 20 + 5,
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
            }}
            animate={{
              y: [0, -20, 0],
              x: [0, 10, 0],
              rotate: [0, 180, 360],
            }}
            transition={{
              duration: Math.random() * 10 + 10,
              repeat: Infinity,
              ease: "easeInOut",
            }}
          />
        ))}
      </div>

      {/* Glowing orbs */}
      <div className="absolute top-1/4 left-1/4 w-72 h-72 bg-purple-500/10 rounded-full filter blur-3xl animate-float-slow" />
      <div className="absolute bottom-1/4 right-1/4 w-96 h-96 bg-cyan-500/10 rounded-full filter blur-3xl animate-float-slower" />

      <header className="sticky top-0 z-50 bg-gray-900/20 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-indigo-500/10 border border-white/10"
          >
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" /> 
            <span>Back</span>
          </motion.button>
          
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400"
          >
            <Sparkles size={20} className="text-cyan-400" />
            Create New Blog
            <Sparkles size={20} className="text-purple-400" />
          </motion.h1>
          
          <div className="w-20" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 relative">
        {/* Decorative floating elements */}
        <motion.div 
          className="absolute -top-10 -right-10 text-purple-400/30"
          animate={{ rotate: 360 }}
          transition={{ duration: 20, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={80} />
        </motion.div>
        
        <motion.div 
          className="absolute -bottom-5 -left-5 text-cyan-400/30"
          animate={{ rotate: -360 }}
          transition={{ duration: 25, repeat: Infinity, ease: "linear" }}
        >
          <Sparkles size={60} />
        </motion.div>

        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.5 }}
          className="relative rounded-2xl border border-white/10 bg-gray-900/40 p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden"
        >
          {/* Shine effect on hover */}
          <div className="absolute inset-0 -skew-y-12 scale-150 bg-gradient-to-r from-transparent via-white/5 to-transparent opacity-0 transition-opacity duration-1000 hover:opacity-100 pointer-events-none" />
          
          {/* Banner Upload */}
          <div className="mb-8 relative">
            <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
              <ImagePlus size={18} className="text-cyan-400" />
              Blog Banner
            </label>
            
            <motion.div 
              whileHover={{ scale: 1.01 }}
              className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-white/20 transition-all duration-500 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 ${
                bannerPreview ? "border-solid" : "min-h-[200px]"
              }`}
            >
              {bannerPreview ? (
                <>
                  <motion.img
                    initial={{ opacity: 0, scale: 1.1 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ duration: 0.5 }}
                    src={bannerPreview}
                    alt="Banner preview"
                    className="h-60 w-full object-cover"
                  />
                  <motion.button
                    whileHover={{ scale: 1.1 }}
                    whileTap={{ scale: 0.9 }}
                    onClick={removeBanner}
                    className="absolute right-4 top-4 rounded-full bg-red-500/90 p-2 transition-all duration-300 hover:bg-red-500 shadow-lg"
                  >
                    <X size={16} />
                  </motion.button>
                </>
              ) : (
                <motion.button
                  whileHover={{ scale: 1.02 }}
                  whileTap={{ scale: 0.98 }}
                  type="button"
                  onClick={onPickBanner}
                  className="flex h-60 w-full flex-col items-center justify-center gap-3 text-white/60 transition-all duration-500 hover:text-white/80 hover:bg-white/5"
                >
                  <motion.div
                    animate={{ y: [0, -5, 0] }}
                    transition={{ duration: 3, repeat: Infinity }}
                  >
                    <ImagePlus size={40} />
                  </motion.div>
                  <span className="text-sm">Click to upload banner image</span>
                  <span className="text-xs text-white/40">Recommended: 1200×600 pixels</span>
                </motion.button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onBannerChange}
              />
            </motion.div>
          </div>

          {/* Title and Category */}
          <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2 relative">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
                <Type size={18} className="text-purple-400" />
                Title
              </label>
              <motion.div whileHover={{ scale: 1.005 }} className="relative">
                <input
                  type="text"
                  value={title}
                  onChange={(e) => setTitle(e.target.value)}
                  placeholder="Give your story a compelling title…"
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-white/40 outline-none transition-all duration-500 focus:border-purple-500 focus:bg-white/10 focus:shadow-lg focus:shadow-purple-500/10"
                />
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-purple-500/0 via-purple-500/10 to-purple-500/0 opacity-0 transition-opacity duration-500 focus-within:opacity-100 pointer-events-none" />
              </motion.div>
            </div>

            <div className="relative">
              <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
                <Zap size={18} className="text-amber-400" />
                Category
              </label>
              <motion.div whileHover={{ scale: 1.005 }} className="relative">
                <select
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                  className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white outline-none transition-all duration-500 focus:border-amber-500 focus:bg-white/10 focus:shadow-lg focus:shadow-amber-500/10 appearance-none"
                >
                  {CATEGORIES.map((c) => (
                    <option key={c.value} value={c.value} className="bg-gray-900">
                      {c.icon} {c.label}
                    </option>
                  ))}
                </select>
                <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-amber-500/0 via-amber-500/10 to-amber-500/0 opacity-0 transition-opacity duration-500 focus-within:opacity-100 pointer-events-none" />
                <div className="absolute right-3 top-1/2 transform -translate-y-1/2 pointer-events-none">
                  <Zap size={16} className="text-amber-400" />
                </div>
              </motion.div>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8 relative">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
              <BookOpen size={18} className="text-cyan-400" />
              Content
            </label>
            <motion.div whileHover={{ scale: 1.005 }} className="relative">
              <textarea
                value={desc}
                onChange={(e) => setDesc(e.target.value)}
                rows={12}
                placeholder="Write your story here…"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white placeholder-white/40 outline-none transition-all duration-500 focus:border-cyan-500 focus:bg-white/10 focus:shadow-lg focus:shadow-cyan-500/10"
              />
              <div className="absolute inset-0 rounded-xl bg-gradient-to-r from-cyan-500/0 via-cyan-500/10 to-cyan-500/0 opacity-0 transition-opacity duration-500 focus-within:opacity-100 pointer-events-none" />
            </motion.div>
            
            {/* Character counter with progress indicator */}
            <div className="mt-2 flex items-center justify-end">
              <div className="flex items-center gap-2">
                <div className="w-16 h-1 bg-white/10 rounded-full overflow-hidden">
                  <div 
                    className="h-full bg-gradient-to-r from-cyan-400 to-emerald-400 transition-all duration-500"
                    style={{ width: `${Math.min(100, (desc.length / 2000) * 100)}%` }}
                  />
                </div>
                <span className={`text-xs ${desc.length > 1800 ? 'text-amber-400' : 'text-white/50'}`}>
                  {desc.length}/2000
                </span>
              </div>
            </div>
          </div>

          {/* Action Buttons and Status */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex gap-3">
              <motion.button
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
                onClick={() => navigate("/")}
                className="group relative overflow-hidden rounded-xl border border-white/10 bg-transparent px-5 py-2.5 text-sm text-white/80 transition-all duration-500 hover:bg-white/5 hover:text-white hover:shadow-lg hover:shadow-white/5"
              >
                <span className="relative z-10">Cancel</span>
                <div className="absolute inset-0 bg-gradient-to-r from-transparent via-white/5 to-transparent -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000" />
              </motion.button>

              <motion.button
                whileHover={{ scale: canPublish ? 1.05 : 1 }}
                whileTap={{ scale: canPublish ? 0.95 : 1 }}
                onClick={handlePublish}
                disabled={!canPublish}
                className={`group relative flex items-center gap-2 overflow-hidden rounded-xl px-6 py-2.5 text-sm font-medium transition-all duration-500 ${
                  canPublish
                    ? "bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 text-white shadow-lg shadow-indigo-500/30 hover:shadow-indigo-500/50 hover:gap-3"
                    : "bg-gray-700 text-white/40 cursor-not-allowed"
                }`}
              >
                <span className="relative z-10 flex items-center gap-2">
                  {loading ? (
                    <>
                      <motion.div
                        animate={{ rotate: 360 }}
                        transition={{ duration: 1, repeat: Infinity, ease: "linear" }}
                      >
                        <Loader2 size={16} />
                      </motion.div>
                      Publishing…
                    </>
                  ) : (
                    <>
                      <Zap size={16} className="transition-transform group-hover:scale-125" />
                      Publish Now
                    </>
                  )}
                </span>
                
                {canPublish && !loading && (
                  <>
                    <div className="absolute inset-0 bg-gradient-to-r from-cyan-500 via-purple-500 to-indigo-500 opacity-0 transition-opacity duration-500 group-hover:opacity-100" />
                    <div className="absolute inset-0 -skew-x-12 translate-x-[-100%] group-hover:translate-x-[100%] transition-transform duration-1000 bg-gradient-to-r from-transparent via-white/20 to-transparent" />
                  </>
                )}
              </motion.button>
            </div>

            {/* Status Messages */}
            <motion.div 
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              className="min-h-[28px]"
            >
              {ok && (
                <motion.div 
                  initial={{ opacity: 0, scale: 0.8 }}
                  animate={{ opacity: 1, scale: 1 }}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-emerald-500/20 to-green-500/20 px-4 py-2 text-emerald-300 border border-emerald-500/30"
                >
                  <motion.div
                    animate={{ scale: [1, 1.2, 1] }}
                    transition={{ duration: 0.5 }}
                  >
                    <CheckCircle2 size={16} />
                  </motion.div>
                  <span className="text-sm">Published successfully!</span>
                </motion.div>
              )}
              {err && (
                <motion.div 
                  initial={{ opacity: 0, x: 20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className="flex items-center gap-2 rounded-xl bg-gradient-to-r from-rose-500/20 to-red-500/20 px-4 py-2 text-rose-300 border border-rose-500/30"
                >
                  <span className="h-2 w-2 rounded-full bg-rose-400 animate-pulse" />
                  <span className="text-sm">{err}</span>
                </motion.div>
              )}
            </motion.div>
          </div>
        </motion.div>
      </main>

      {/* Add custom animations to global CSS */}
      <style>
        {`
          @keyframes float-slow {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(-20px) rotate(5deg); }
          }
          @keyframes float-slower {
            0%, 100% { transform: translateY(0) rotate(0deg); }
            50% { transform: translateY(10px) rotate(-5deg); }
          }
          @keyframes pulse-slow {
            0%, 100% { opacity: 0.2; }
            50% { opacity: 0.3; }
          }
          .animate-float-slow {
            animation: float-slow 15s ease-in-out infinite;
          }
          .animate-float-slower {
            animation: float-slower 20s ease-in-out infinite;
          }
          .animate-pulse-slow {
            animation: pulse-slow 8s ease-in-out infinite;
          }
          .animation-delay-2000 {
            animation-delay: 2s;
          }
        `}
      </style>
    </div>
  );
}