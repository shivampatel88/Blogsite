import React, { useRef, useState, useEffect } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { motion } from "framer-motion";
import API_URL from "../api";
import {
  ArrowLeft,
  CheckCircle2,
  ImagePlus,
  Loader2,
  X,
  Sparkles,
  Type,
  BookOpen,
  Zap,
} from "lucide-react";

const CATEGORIES = [
  { value: "all", label: "All", icon: "🌍" },
  { value: "business", label: "Business & Finance", icon: "💼" },
  { value: "travel", label: "Travel", icon: "✈️" },
  { value: "food", label: "Food", icon: "🍕" },
  { value: "technology", label: "Science & Technology", icon: "🔬" },
];

export default function EditBlog({ token }) {
  const { id } = useParams();
  const navigate = useNavigate();

  const [bannerPreview, setBannerPreview] = useState(null);
  const [bannerFile, setBannerFile] = useState(null);

  const [category, setCategory] = useState("all");
  const [title, setTitle] = useState("");
  const [desc, setDesc] = useState("");

  const [loading, setLoading] = useState(false);
  const [ok, setOk] = useState(false);
  const [err, setErr] = useState("");

  const fileInputRef = useRef(null);

  useEffect(() => {
    const fetchBlog = async () => {
      try {
        const res = await API_URL.get(`/blog/${id}`);
        setTitle(res.data.title);
        setDesc(res.data.content);
        setCategory(res.data.category || "all");
        setBannerPreview(res.data.bannerImage); 
      } catch (error) {
        console.error("Error loading blog:", error);
      }
    };
    fetchBlog();
  }, [id]);

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

  const canUpdate =
    title.trim().length > 0 && desc.trim().length > 0 && !loading;

  const handleUpdate = async (e) => {
    e.preventDefault();
    setErr("");
    setOk(false);

    try {
      setLoading(true);

      const fd = new FormData();
      fd.append("title", title);
      fd.append("content", desc);
      fd.append("category", category);
      if (bannerFile) fd.append("banner", bannerFile);

      const res = await API_URL.put(`/blog/${id}`, fd, {
        headers: {
          Authorization: `Bearer ${token}`,
          "Content-Type": "multipart/form-data",
        },
      });

      if (res.status === 200) {
        setOk(true);
        setTimeout(() => navigate("/home"), 1200);
      } else {
        throw new Error(res?.data?.error || "Update failed");
      }
    } catch (e) {
      setErr(e?.response?.data?.error || e.message || "Something went wrong");
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <header className="sticky top-0 z-50 bg-gray-900/20 backdrop-blur-xl border-b border-white/10">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-6 py-5">
          <motion.button
            whileHover={{ x: -5 }}
            whileTap={{ scale: 0.95 }}
            onClick={() => navigate(-1)}
            className="group flex items-center gap-2 rounded-xl bg-white/5 px-4 py-2.5 text-sm border border-white/10">
            <ArrowLeft size={16} />
            <span>Back</span>
          </motion.button>

          <motion.h1
            initial={{ opacity: 0, y: -10 }}
            animate={{ opacity: 1, y: 0 }}
            className="text-xl font-bold bg-clip-text text-transparent bg-gradient-to-r from-purple-400 to-cyan-400">
            <Sparkles size={20} className="text-cyan-400" />
            Edit Blog
            <Sparkles size={20} className="text-purple-400" />
          </motion.h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <div className="mb-8 relative">
          <label className="mb-3 flex items-center gap-2 text-sm font-medium text-white/80">
            <ImagePlus size={18} className="text-cyan-400" />
            Blog Banner
          </label>

          <motion.div
            whileHover={{ scale: 1.01 }}
            className="relative overflow-hidden rounded-2xl border-2 border-dashed border-white/20">
            {bannerPreview ? (
              <>
                <img
                  src={bannerPreview}
                  alt="Banner preview"
                  className="h-60 w-full object-cover"/>
                <button
                  onClick={removeBanner}
                  className="absolute right-4 top-4 rounded-full bg-red-500/90 p-2">
                  <X size={16} />
                </button>
              </>
            ) : (
              <button
                type="button"
                onClick={onPickBanner}
                className="flex h-60 w-full flex-col items-center justify-center gap-3 text-white/60">
                <ImagePlus size={40} />
                <span>Click to upload banner image</span>
              </button>
            )}
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              className="hidden"
              onChange={onBannerChange}/>
          </motion.div>
        </div>

        <div className="mb-8 grid grid-cols-1 gap-6 md:grid-cols-3">
          <div className="md:col-span-2">
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
              <Type size={18} className="text-purple-400" />
              Title
            </label>
            <input
              type="text"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white"/>
          </div>

          <div>
            <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
              <Zap size={18} className="text-amber-400" />
              Category
            </label>
            <select
              value={category}
              onChange={(e) => setCategory(e.target.value)}
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white">
              {CATEGORIES.map((c) => (
                <option key={c.value} value={c.value} className="bg-gray-900">
                  {c.icon} {c.label}
                </option>
              ))}
            </select>
          </div>
        </div>

        <div className="mb-8">
          <label className="mb-2 flex items-center gap-2 text-sm font-medium text-white/80">
            <BookOpen size={18} className="text-cyan-400" />
            Content
          </label>
          <textarea
            value={desc}
            onChange={(e) => setDesc(e.target.value)}
            rows={12}
            className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3.5 text-white"/>
        </div>

        <div className="flex gap-3">
          <motion.button
            whileHover={{ scale: canUpdate ? 1.05 : 1 }}
            whileTap={{ scale: canUpdate ? 0.95 : 1 }}
            onClick={handleUpdate}
            disabled={!canUpdate}
            className={`rounded-xl px-6 py-2.5 text-sm font-medium ${
              canUpdate
                ? "bg-gradient-to-r from-purple-500 via-indigo-500 to-cyan-500 text-white"
                : "bg-gray-700 text-white/40 cursor-not-allowed"
            }`}>
            {loading ? (
              <Loader2 size={16} className="animate-spin inline" />
            ) : (
              "Update Blog"
            )}
          </motion.button>
        </div>

        <div className="mt-4">
          {ok && (
            <div className="flex items-center gap-2 rounded-xl bg-green-500/20 px-4 py-2 text-green-300">
              <CheckCircle2 size={16} />
              Blog updated successfully!
            </div>
          )}
          {err && (
            <div className="flex items-center gap-2 rounded-xl bg-red-500/20 px-4 py-2 text-red-300">
              {err}
            </div>
          )}
        </div>
      </main>
    </div>
  );
}
