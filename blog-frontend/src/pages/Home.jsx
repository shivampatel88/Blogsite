import { useMemo, useState, useEffect, useCallback } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BlogCard from "../components/BlogCard";
import BlogModal from "../components/BlogModal";
import API_URL from "../api"; // axios instance
import { motion } from "framer-motion";
import { CheckCircle2 } from "lucide-react";


const CATEGORIES = ["All", "Business & Finance", "Travel", "Food", "Science & Technology"];

export default function Home() {
  const [dark, setDark] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);
  const [toast, setToast] = useState({ show: false, message: "" });

  const CURRENT_USER = JSON.parse(localStorage.getItem("user")) || null;
  const ME_ID = CURRENT_USER?._id || null; // ✅ ADDED: Current logged-in user id

  // ✅ ADDED: Normalize each blog with likesCount & likedByMe
  const normalizeBlog = (b) => ({
    ...b,
    likesCount: Array.isArray(b.likes) ? b.likes.length : 0,
    likedByMe: Array.isArray(b.likes)
      ? b.likes.some((id) => String(id) === String(ME_ID))
      : false,
  });

 // 2. Define fetchBlogs wrapped in useCallback
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
  }, [ME_ID]); // Dependency array for useCallback

    // 3. Call fetchBlogs on initial component mount
  useEffect(() => {
    fetchBlogs();
  }, [fetchBlogs]); // fetchBlogs is now a stable dependency

  // ✅ ADDED: Toggle like handler (updates grid + modal if open)
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

  // ---- Filter blogs ----
  const filtered = useMemo(() => {
    const byCat = category === "All" ? blogs : blogs.filter((b) => b.category === category);
    if (!search.trim()) return byCat;
    return byCat.filter((b) =>
      `${b.author?.firstname || ""} ${b.author?.lastname || ""}`
        .toLowerCase()
        .includes(search.toLowerCase())
    );
  }, [blogs, category, search]);

  const handleBlogDeleteSuccess = () => {
    setSelected(null); // Close the modal
    fetchBlogs(); // Refresh the blog list to remove the deleted one
    setToast({ show: true, message: "Your blog was successfully deleted!" }); // Show the toast

    // Automatically hide the toast after 3 seconds
    setTimeout(() => {
      setToast({ show: false, message: "" });
    }, 3000);
  };

  return (
    <div className={dark ? "dark" : ""}>
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
            className="fixed bottom-5 right-5 z-50 flex items-center gap-3 rounded-xl bg-emerald-500/90 px-5 py-3 text-white shadow-lg"
          >
            <CheckCircle2 size={20} />
            <span>{toast.message}</span>
          </motion.div>
        )}
        {/* Navbar */}
        <Navbar
          user={CURRENT_USER}
          dark={dark}
          onToggleDark={() => setDark((d) => !d)}
          onGo={(path) => {
            if (path === "/logout") {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.reload();
            }
          }}
        />

        {/* Main Layout */}
        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[260px_1fr] md:gap-8 md:px-6 md:py-10">
          {/* Sidebar */}
          <Sidebar categories={CATEGORIES} category={category} onSelectCategory={setCategory} search={search} onSearch={setSearch}/>

          {/* Blog Grid */}
          <section className="relative">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {category === "All" ? "All" : category} Blogs
              </h2>
              <p className="text-sm opacity-70">
                {loading ? "Loading..." : `${filtered.length} results`}
              </p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map((b) => (
                <BlogCard key={b._id}
                  blog={{
                    ...b,
                    authorName: `${b.author?.firstname || ""} ${b.author?.lastname?.[0] || ""}.`,
                  }}
                  onOpen={() => setSelected(b)}
                  onToggleLike={() => handleToggleLike(b._id)} // ✅ ADDED
                />
              ))}
            </div>
          </section>
        </div>

        {/* Blog Modal */}
        {selected && (
          <BlogModal
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
            }}
          />
        )}
      </div>
    </div>
  );
}
