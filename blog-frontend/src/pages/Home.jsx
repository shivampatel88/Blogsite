import { useMemo, useState, useEffect, useCallback } from "react";
import { useNavigate } from "react-router-dom";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BlogCard from "../components/BlogCard";
import BlogModal from "../components/BlogModal";
import API_URL from "../api"; // axios instance
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";


const CATEGORIES = [
  { value: "all", label: "All" },
  { value: "business", label: "Business & Finance" },
  { value: "travel", label: "Travel" },
  { value: "food", label: "Food" },
  { value: "technology", label: "Science & Technology" },
];

export default function Home() {
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("all");
  const [blogs, setBlogs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [showMyBlogsOnly, setShowMyBlogsOnly] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });
  const navigate = useNavigate();
  const CURRENT_USER = JSON.parse(localStorage.getItem("user")) || null;
  const ME_ID = CURRENT_USER?._id || null; 

  const normalizeBlog = (b) => ({
    ...b,
    likesCount: Array.isArray(b.likes) ? b.likes.length : 0,
    likedByMe: Array.isArray(b.likes)
      ? b.likes.some((id) => String(id) === String(ME_ID))
      : false,
  });

  const fetchBlogs = useCallback(async () => {
    try {
      setLoading(true);
      const res = await API_URL.get("/blog");
      const serverBlogs = res.data || [];
      setBlogs(serverBlogs.map(normalizeBlog));
    } catch (err) {
      console.error("Error fetching blogs:", err);
      setBlogs([]);
    } finally {
      setLoading(false);
    }
  }, [ME_ID]); 

  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]);

  const handleToggleLike = async (blogId) => {
    try {
      const res = await API_URL.put(`/likes/${blogId}/toggle`);
      const { likesCount, liked } = res.data || {};
      setBlogs((prev) =>
        prev.map((b) =>
          b._id === blogId ? { ...b, likesCount, likedByMe: liked } : b
        )
      );
      if (selected?._id === blogId) {
        setSelected((prev) => ({ ...prev, likesCount, likedByMe: liked }));
      }
    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  const filtered = useMemo(() => {
    let blogsToFilter = blogs;

    if (showMyBlogsOnly) {
      blogsToFilter = blogs.filter(b =>b.author?._id === ME_ID);
    }
    
    const byCat = category === "all" ? blogsToFilter : blogsToFilter.filter((b) => b.category === category);

    if (!search.trim()) return byCat;
    return byCat.filter((b) =>
      `${b.author?.firstname || ""} ${b.author?.lastname || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [blogs, category, search, showMyBlogsOnly, ME_ID]);

  const categoryLabel = CATEGORIES.find(c => c.value === category)?.label;

  const handleBlogDeleteSuccess = () => {
    setSelected(null);
    fetchBlogs(); 
    setToast({ show: true, message: "Your blog was successfully deleted!" }); // Show the toast

    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  return (
    
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0b0e14] dark:text-slate-100">
        <div aria-hidden className="pointer-events-none fixed inset-0">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        {toast.show && (
          <motion.div
            initial={{ opacity: 0, y: 50, scale: 0.8 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, y: 20, scale: 0.9 }}
            className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-emerald-500/90 px-5 py-3 text-white shadow-lg">
            <CheckCircle2 size={20} />
            <span>{toast.message}</span>
          </motion.div>
        )}
        
        <Navbar
          user={CURRENT_USER}
          onShowMyBlogs={() => {
              setShowMyBlogsOnly(true);
              setCategory("all"); 
          }}
          onGo={(path) => navigate(path)} />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[260px_1fr] md:gap-8 md:px-6 md:py-10">
          <Sidebar categories={CATEGORIES} category={category} onSelectCategory={(cat) => {
              setCategory(cat);
              setShowMyBlogsOnly(false);
            }} 
            search={search} 
            onSearch={setSearch}/>

          <section className="relative">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {showMyBlogsOnly ? "My Blogs" : `${categoryLabel} Blogs`}
              </h2>
              <p className="text-sm opacity-70">
                {loading ? "Loading..." : `${filtered.length} results`}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((b) => (
                <BlogCard key={b._id}
                  blog={{...b,authorName: `${b.author?.firstname || ""} ${b.author?.lastname?.[0] || ""}.`,
                  }}
                  onOpen={() => setSelected(b)}
                  onToggleLike={() => handleToggleLike(b._id)} />
              ))}
            </div>
          </section>
        </div>

        {selected && (<BlogModal
            blog={selected}
            me={CURRENT_USER}
            onClose={() => {setSelected(null);
              fetchBlogs();
            }}
            onDeleteSuccess={handleBlogDeleteSuccess}
            onLikeUpdate={(blogId, likesCount, likedByMe) => {
              setBlogs((prev) =>
                prev.map((b) =>
                 b._id === blogId ? { ...b, likesCount, likedByMe } : b
              )
             );
            }}/>
        )}
      </div>
  );
}
