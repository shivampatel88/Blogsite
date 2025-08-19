import React, { useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import API_URL from "../api"; // your axios instance
import { motion } from "framer-motion";
import { ArrowLeft, CheckCircle2, ImagePlus, Loader2 } from "lucide-react";

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
        setTimeout(() => navigate("/"), 1200);
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
    <div className="min-h-screen w-full overflow-x-hidden bg-gradient-to-br from-gray-950 via-gray-900 to-black text-white">
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-40 -left-40 h-[28rem] w-[28rem] rounded-full blur-3xl opacity-25 bg-gradient-to-br from-indigo-500 via-fuchsia-500 to-cyan-400" />
        <div className="absolute -bottom-48 -right-48 h-[30rem] w-[30rem] rounded-full blur-3xl opacity-20 bg-gradient-to-tr from-amber-400 via-rose-500 to-purple-600" />
      </div>

      <header className="relative z-10 mx-auto flex max-w-6xl items-center justify-between px-4 py-5">
        <button
          onClick={() => navigate(-1)}
          className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-2 text-sm backdrop-blur ring-1 ring-white/15 hover:bg-white/15 transition">
          <ArrowLeft size={16} /> Back
        </button>
        <h1 className="text-lg font-semibold tracking-wide">Write your Blog</h1>
        <div className="w-24" />
      </header>

      <main className="relative z-10 mx-auto max-w-6xl px-4 pb-10">
        <motion.div initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ duration: 0.4 }}
          className="rounded-3xl border border-white/10 bg-white/5 p-5 md:p-8 backdrop-blur-xl shadow-[0_8px_60px_-12px_rgba(0,0,0,0.65)]">
          <div className="flex flex-col gap-4 md:flex-row md:items-start md:justify-between">
            <div className="relative w-full overflow-hidden rounded-2xl border border-white/10 bg-white/5">
              <div className="aspect-[16/7] w-full">
                {bannerPreview ? (<img  src={bannerPreview}  alt="Banner preview"  className="h-full w-full object-cover"/>) : (
                  <div className="flex h-full w-full items-center justify-center text-white/50">
                    No banner selected
                  </div>
                )}
              </div>

            {!bannerPreview && (<button type="button" onClick={onPickBanner} 
            className="absolute inset-0 flex items-center justify-center">
            <span className="rounded-full bg-black/40 p-3 ring-1 ring-white/20 backdrop-blur hover:bg-black/50 transition">
                <ImagePlus size={22} />
            </span>
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
          </div>

        <label className="mt-5 block text-l text-white/70">Title</label>
          <div className="mt-2 flex flex-col md:flex-row gap-5">
            <input type="text" value={title} onChange={(e) => setTitle(e.target.value)}
              placeholder="Give your story a compelling title…"
              className="w-170 rounded-xl border border-white/10 bg-white/10 px-4 py-1 text-base text-white placeholder-white/40 outline-none focus:border-indigo-300/60 focus:bg-white/15"/>

            <div className="md:pt-0">
              <label className="mb-2 block text-l text-white/70">
                Category
              </label>
              <select
                value={category}
                onChange={(e) => setCategory(e.target.value)}
                className="w-50 rounded-xl border border-white/10 bg-white/10 px-3 py-2 text-base text-white placeholder-white/40 outline-none focus:border-indigo-300/60 focus:bg-white/15">
                {CATEGORIES.map((c) => (
                  <option key={c.value} value={c.value} className="bg-gray-900">
                    {c.label}
                  </option>
                ))}
              </select>
            </div>
          </div>

          <div className="mt-4">
            <label className="mb-2 block text-l text-white/70">
              Description
            </label>
            <textarea value={desc} onChange={(e) => setDesc(e.target.value)} rows={10} placeholder="Write your story here…"
              className="w-full rounded-xl border border-white/10 bg-white/10 px-4 py-3 text-base text-white placeholder-white/40 outline-none focus:border-indigo-300/60 focus:bg-white/15"/>
          </div>
          
          <div className="mt-6 flex flex-col items-start gap-3 sm:flex-row sm:items-center sm:justify-between">
            <div className="flex gap-3">
              <button
                onClick={() => navigate("/")}
                className="rounded-xl border border-white/10 bg-white/5 px-5 py-2.5 text-sm text-white/80 hover:bg-white/10">
                Cancel
              </button>

              <button
                onClick={handlePublish}
                disabled={!canPublish}
                className="group relative overflow-hidden rounded-xl bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 px-6 py-2.5 text-sm font-semibold text-white shadow-lg shadow-indigo-900/30 transition-transform hover:scale-105 active:scale-95" >
                {loading ? (
                  <>
                    <Loader2 className="animate-spin" size={16} />
                    Publishing…
                  </>
                ) : (
                  "Publish"
                )}
                <span className="absolute inset-0 -translate-x-full bg-white/20 transition group-hover:translate-x-0" />
              </button>
            </div>

            {/* status */}
            <div className="min-h-[28px]">
              {ok && (
                <div className="inline-flex items-center gap-2 rounded-lg border border-emerald-500/40 bg-emerald-500/10 px-3 py-1.5 text-emerald-200">
                  <CheckCircle2 size={16} />
                  <span className="text-sm">Blog successfully published</span>
                </div>
              )}
              {err && (
                <div className="inline-flex items-center gap-2 rounded-lg border border-rose-500/40 bg-rose-500/10 px-3 py-1.5 text-rose-200">
                  <span className="h-2 w-2 rounded-full bg-rose-400" />
                  <span className="text-sm">{err}</span>
                </div>
              )}
            </div>
          </div>
        </motion.div>
      </main>
    </div>
  );
}
