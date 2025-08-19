import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { motion } from "framer-motion";
import API_URL from "../api"; // your axios instance
import { ArrowLeft, CheckCircle2, ImagePlus, Loader2, X } from "lucide-react";

const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "business", label: "Business & Finance" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "technology", label: "Science & Technology" },
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
    <div className="min-h-screen w-full bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      {/* Subtle background elements */}
      <div className="fixed inset-0 -z-10 overflow-hidden">
        <div className="absolute -top-40 -left-40 h-80 w-80 rounded-full bg-indigo-500/10 blur-3xl" />
        <div className="absolute -bottom-40 -right-40 h-80 w-80 rounded-full bg-purple-500/10 blur-3xl" />
      </div>

      <header className="sticky top-0 z-20 border-b border-white/10 bg-gray-900/80 backdrop-blur-md">
        <div className="mx-auto flex max-w-4xl items-center justify-between px-4 py-4">
          <button
            onClick={() => navigate(-1)}
            className="flex items-center gap-2 rounded-lg bg-white/5 px-3 py-2 text-sm transition hover:bg-white/10"
          >
            <ArrowLeft size={16} /> Back
          </button>
          <h1 className="text-xl font-semibold">Create New Blog</h1>
          <div className="w-20" />
        </div>
      </header>

      <main className="mx-auto max-w-4xl px-4 py-8">
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.3 }}
          className="rounded-2xl border border-white/10 bg-gray-800/30 p-6 backdrop-blur-md"
        >
          {/* Banner Upload */}
          <div className="mb-8">
            <label className="mb-3 block text-sm font-medium text-white/80">
              Blog Banner
            </label>
            <div
              className={`relative overflow-hidden rounded-xl border-2 border-dashed border-white/20 transition hover:border-white/30 ${
                bannerPreview ? "border-solid" : ""
              }`}
            >
              {bannerPreview ? (
                <>
                  <img
                    src={bannerPreview}
                    alt="Banner preview"
                    className="h-48 w-full object-cover"
                  />
                  <button
                    onClick={removeBanner}
                    className="absolute right-3 top-3 rounded-full bg-red-500/90 p-1.5 transition hover:bg-red-500"
                  >
                    <X size={16} />
                  </button>
                </>
              ) : (
                <button
                  type="button"
                  onClick={onPickBanner}
                  className="flex h-48 w-full flex-col items-center justify-center gap-3 text-white/60 transition hover:text-white/80"
                >
                  <ImagePlus size={32} />
                  <span className="text-sm">Click to upload banner image</span>
                </button>
              )}
              <input
                ref={fileInputRef}
                type="file"
                accept="image/*"
                className="hidden"
                onChange={onBannerChange}
              />
            </div>
            <p className="mt-2 text-xs text-white/50">
              Recommended size: 1200×600 pixels
            </p>
          </div>

          {/* Title and Category */}
          <div className="mb-6 grid grid-cols-1 gap-6 md:grid-cols-3">
            <div className="md:col-span-2">
              <label className="mb-2 block text-sm font-medium text-white/80">
                Title
              </label>
              <input
                type="text"
                value={title}
                onChange={(e) => setTitle(e.target.value)}
                placeholder="Give your story a compelling title…"
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-indigo-500 focus:bg-white/10"
              />
            </div>

            <div>
              <label className="mb-2 block text-sm font-medium text-white/80">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white outline-none transition focus:border-indigo-500 focus:bg-white/10"
              >
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value} className="bg-gray-900">
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          {/* Description */}
          <div className="mb-8">
            <label className="mb-2 block text-sm font-medium text-white/80">
              Content
            </label>
            <textarea
              value={desc}
              onChange={(e) => setDesc(e.target.value)}
              rows={12}
              placeholder="Write your story here…"
              className="w-full rounded-xl border border-white/10 bg-white/5 px-4 py-3 text-white placeholder-white/40 outline-none transition focus:border-indigo-500 focus:bg-white/10"
            />
          </div>

          {/* Action Buttons and Status */}
          <div className="flex flex-col justify-between gap-4 sm:flex-row sm:items-center">
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="rounded-xl border border-white/10 bg-transparent px-5 py-2.5 text-sm text-white/80 transition hover:bg-white/5"
              >
                Cancel
              </button>

              <button
                onClick={handlePublish}
                disabled={!canPublish}
                className={`flex items-center gap-2 rounded-xl px-6 py-2.5 text-sm font-medium transition ${
                  canPublish
                    ? "bg-gradient-to-r from-indigo-500 to-purple-600 text-white shadow-lg shadow-indigo-500/20 hover:shadow-indigo-500/40"
                    : "bg-gray-700 text-white/40 cursor-not-allowed"
                }`}
              >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Publishing…
                  </>
                ) : (
                  "Publish Now"
                )}
              </button>
            </div>

            {/* Status Messages */}
            <div className="min-h-[28px]">
              {ok && (
                <div className="flex items-center gap-2 rounded-lg bg-emerald-500/10 px-3 py-1.5 text-emerald-300">
                  <CheckCircle2 size={16} />
                  <span className="text-sm">Published successfully!</span>
                </div>
              )}
              {err && (
                <div className="flex items-center gap-2 rounded-lg bg-rose-500/10 px-3 py-1.5 text-rose-300">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  <span className="text-sm">{err}</span>
                </div>
              )}
            </div>
          </div>

          {/* Character count indicator */}
          <div className="mt-4 flex justify-end">
            <p className="text-xs text-white/40">
              {desc.length} characters
            </p>
          </div>
        </motion.div>
      </main>
    </div>
  );
}