import { useMemo, useState, useEffect } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BlogCard from "../components/BlogCard";
import BlogModal from "../components/BlogModal";
import API_URL from "../api"; // axios instance

const CATEGORIES = ["All", "Business & Finance", "Travel", "Food", "Science & Technology"];

export default function Home() {
  const [dark, setDark] = useState(true);
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [blogs, setBlogs] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(false);

  const CURRENT_USER = JSON.parse(localStorage.getItem("user")) || null;

  // ---- Fetch blogs from backend ----
  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        setLoading(true);
        const res = await API_URL.get("/blog"); // ✅ correct endpoint
        setBlogs(res.data || []);
      } catch (err) {
        console.error("Error fetching blogs:", err);
        setBlogs([]); // fallback
      } finally {
        setLoading(false);
      }
    };
    fetchBlogs();
  }, []);

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

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0b0e14] dark:text-slate-100">
        {/* Subtle background accents */}
        <div aria-hidden className="pointer-events-none fixed inset-0">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <Navbar user={CURRENT_USER} dark={dark} onToggleDark={() => setDark((d) => !d)} onGo={(path) => {
            if (path === "/logout") {
              localStorage.removeItem("token");
              localStorage.removeItem("user");
              window.location.reload();
            }
          }}/>

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[260px_1fr] md:gap-8 md:px-6 md:py-10">
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
                <BlogCard
                  key={b._id}
                  blog={{
                    ...b,
                    authorName: `${b.author?.firstname || ""} ${b.author?.lastname?.[0] || ""}.`,
                  }}
                  onOpen={() => setSelected(b)}
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
            onClose={() => setSelected(null)}
            onLiked={(updatedBlog) => {
            setBlogs((prev) =>
              prev.map((b) => (b._id === updatedBlog._id ? updatedBlog : b))
            );
            }}
          />
        )}
      </div>
    </div>
  );
}
