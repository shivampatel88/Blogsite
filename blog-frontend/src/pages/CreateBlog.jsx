import React, { useRef } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import { useBlogForm } from "../hooks/useBlogForm";
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
  const fileInputRef = useRef(null);

  const { formData, banner, status, handleInputChange, handleBannerChange, removeBanner, handleSubmit } = useBlogForm();

  const canPublish = formData.title.trim().length > 0 && formData.content.trim().length > 0 && !status.loading;

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white overflow-hidden relative">
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-gradient-to-r from-indigo-500/20 to-purple-500/20 blur-3xl animate-pulse-slow" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-gradient-to-r from-cyan-500/20 to-emerald-500/20 blur-3xl animate-pulse-slow animation-delay-2000" />
      </div>

      <header className="sticky top-0 z-50 bg-gray-900/20 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm transition-all duration-300 hover:bg-white/10 hover:shadow-lg hover:shadow-indigo-500/10 border border-white/10">
            <ArrowLeft size={16} className="transition-transform group-hover:-translate-x-1" />
            <span>Back</span>
          </motion.button>
          
          <motion.h1 
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="flex items-center gap-2 text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            <Sparkles size={20} className="text-cyan-400" />
            Create New Blog
            <Sparkles size={20} className="text-purple-400" />
          </motion.h1>
          
          <div className="w-20" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8 relative">
        <form onSubmit={handleSubmit}>
            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.5 }}
              className="relative rounded-2xl border border-white/10 bg-gray-900/40 p-8 backdrop-blur-xl shadow-2xl shadow-purple-500/10 overflow-hidden">
              
              <div className="mb-8 relative">
                <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
                  <ImagePlus size={18} className="text-cyan-400" />
                  Blog Banner
                </label>
                
                <motion.div 
                  whileHover={{ scale: 1.01 }}
                  className={`relative overflow-hidden rounded-2xl border-2 border-dashed border-white/20 transition-all duration-500 hover:border-cyan-400/50 hover:shadow-lg hover:shadow-cyan-500/10 ${
                    banner.preview ? "border-solid" : "min-h-[200px]"
                  }`}>
                  {banner.preview ? (
                    <>
                      <motion.img
                        initial={{ opacity: 0, scale: 1.1 }}
                        animate={{ opacity: 1, scale: 1 }}
                        transition={{ duration: 0.5 }}
                        src={banner.preview}
                        alt="Banner preview"
                        className="h-60 w-full object-cover"/>
                      <motion.button
                        type="button"
                        whileHover={{ scale: 1.1 }}
                        whileTap={{ scale: 0.9 }}
                        onClick={removeBanner}
                        className="absolute right-4 top-4 rounded-full bg-red-500/90 p-2 transition-all duration-300 hover:bg-red-500 shadow-lg">
                        <X size={16} />
                      </motion.button>
                    </>
                  ) : (
                    <motion.button
                      whileHover={{ scale: 1.02 }}
                      whileTap={{ scale: 0.98 }}
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="flex h-60 w-full flex-col items-center justify-center gap-3 text-white/60 transition-all duration-500 hover:text-white/80 hover:bg-white/5">
                      <motion.div
                        animate={{ y: [0, -5, 0] }}
                        transition={{ duration: 3, repeat: Infinity }}>
                        <ImagePlus size={40} />
                      </motion.div>
                      <span className="text-sm">Click to upload banner image</span>
                    </motion.button>
                  )}
                  <input ref={fileInputRef} type="file" accept="image/*" className="hidden" onChange={handleBannerChange}/>
                </motion.div>
              </div>

              <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
                <div className="md:col-span-2">
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
                    <Type size={18} className="text-purple-400" /> Title
                  </label>
                  <input name="title" value={formData.title} onChange={handleInputChange} type="text" className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white"/>
                </div>
                <div>
                  <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
                    <Zap size={18} className="text-amber-400" /> Category
                  </label>
                  <select name="category" value={formData.category} onChange={handleInputChange} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white">
                    {CATEGORIES.map((c) => (<option key={c.value} value={c.value} className="bg-gray-900">{c.icon} {c.label}</option>))}
                  </select>
                </div>
              </div>

              <div className="mb-8">
                <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
                  <BookOpen size={18} className="text-cyan-400" /> Content
                </label>
                <textarea name="content" value={formData.content} onChange={handleInputChange} rows={12} className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white"/>
              </div>

              <div className="flex flex-col sm:flex-row justify-between items-center gap-4">
                <motion.button
                  type="submit"
                  whileHover={{ scale: canPublish ? 1.05 : 1 }}
                  whileTap={{ scale: canPublish ? 0.95 : 1 }}
                  disabled={!canPublish}
                  className={`group relative flex items-center gap-2 overflow-hidden rounded-xl px-6 py-2.5 text-sm font-medium ${canPublish ? "bg-gradient-to-r from-purple-500 to-cyan-500" : "bg-gray-700 text-white/40 cursor-not-allowed"}`}>
                  <span className="relative z-10 flex items-center gap-2">
                    {status.loading ? <Loader2 size={16} className="animate-spin" /> : <Zap size={16}/>}
                    {status.loading ? 'Publishing...' : 'Publish Now'}
                  </span>
                </motion.button>
                
                <div className="min-h-[28px]">
                  {status.success && <div className="flex items-center gap-2 text-emerald-300"><CheckCircle2 size={16} />Published successfully!</div>}
                  {status.error && <div className="text-rose-300">{status.error}</div>}
                </div>
              </div>
            </motion.div>
        </form>
      </main>
    </div>
  );
}