import { useMemo, useState } from "react";
import Navbar from "../components/Navbar";
import Sidebar from "../components/Sidebar";
import BlogCard from "../components/BlogCard";
import BlogModal from "../components/BlogModal";

const CATEGORIES = ["All", "Business & Finance", "Travel", "Food", "Science & Technology"];

// ----- Mocked user & blogs -----
const CURRENT_USER = { id: "u-1", firstName: "Shivam", lastName: "Patel", username: "shivampatel88" };

const MOCK_BLOGS = [
  {
    id: "b-1",
    title: "How FinTech is Reshaping Small Businesses",
    author: { id: "u-2", name: "Aarav Mehta" },
    category: "Business & Finance",
    bannerImage: "https://images.unsplash.com/photo-1556157382-97eda2d62296?q=80&w=1200&auto=format&fit=crop",
    likes: 18,
    likedByMe: false,
    createdAt: "2025-02-01T10:21:00Z",
    content:
      "FinTech tools are changing the way small businesses operate— from cash flow to analytics. In this piece we explore practical tools you can adopt today...",
    comments: [
      { id: "c-11", userId: "u-1", userName: "Shivam P.", text: "Great overview! 🔥", createdAt: "2025-02-05T11:22:00Z" },
      { id: "c-12", userId: "u-3", userName: "Ananya", text: "Loved the tips on invoicing.", createdAt: "2025-02-06T09:10:00Z" },
    ],
  },
  {
    id: "b-2",
    title: "7-Day Japan Rail Itinerary (Tokyo → Kyoto → Osaka)",
    author: { id: "u-3", name: "Ananya Sharma" },
    category: "Travel",
    bannerImage: "https://images.unsplash.com/photo-1558980664-10eaaff21d38?q=80&w=1200&auto=format&fit=crop",
    likes: 42,
    likedByMe: true,
    createdAt: "2025-01-22T08:00:00Z",
    content:
      "JR Pass, pocket Wi-Fi, and the coziest ryokans — here’s a compact plan that hits classics and hidden gems without rushing...",
    comments: [{ id: "c-21", userId: "u-4", userName: "Rahul", text: "Bookmarking this!", createdAt: "2025-01-25T12:05:00Z" }],
  },
  {
    id: "b-3",
    title: "The Science of Perfect Sourdough at Home",
    author: { id: "u-4", name: "Rahul Verma" },
    category: "Food",
    bannerImage: "https://images.unsplash.com/photo-1549931319-a545dcf3bc73?q=80&w=1200&auto=format&fit=crop",
    likes: 9,
    likedByMe: false,
    createdAt: "2025-02-10T15:40:00Z",
    content:
      "Hydration, flour strength, and fermentation windows explained simply. Plus a weekend plan for your first crackling loaf.",
    comments: [],
  },
  {
    id: "b-4",
    title: "Build a Personal AI Assistant with Browser APIs",
    author: { id: "u-5", name: "Neha Gupta" },
    category: "Science & Technology",
    bannerImage: "https://images.unsplash.com/photo-1555255707-c07966088b7b?q=80&w=1200&auto=format&fit=crop",
    likes: 27,
    likedByMe: false,
    createdAt: "2025-02-02T18:10:00Z",
    content:
      "Microphone, Speech Synthesis, and a sprinkle of prompts. A practical, fun introduction with real code and a few UX rules.",
    comments: [],
  },
];

export default function Home() {
  const [dark, setDark] = useState(true); // local-only theme for homepage
  const [search, setSearch] = useState("");
  const [category, setCategory] = useState("All");
  const [blogs, setBlogs] = useState(MOCK_BLOGS);
  const [selected, setSelected] = useState(null); // blog for modal

  const filtered = useMemo(() => {
    const byCat = category === "All" ? blogs : blogs.filter(b => b.category === category);
    if (!search.trim()) return byCat;
    return byCat.filter(b => b.author.name.toLowerCase().includes(search.toLowerCase()));
  }, [blogs, category, search]);

  // ---- Simple interactions (local state only) ----
  const toggleLike = (blogId) => {
    setBlogs(prev =>
      prev.map(b =>
        b.id === blogId
          ? { ...b, likedByMe: !b.likedByMe, likes: b.likedByMe ? b.likes - 1 : b.likes + 1 }
          : b
      )
    );
  };

  const addComment = (blogId, text) => {
    if (!text.trim()) return;
    setBlogs(prev =>
      prev.map(b =>
        b.id === blogId
          ? {
              ...b,
              comments: [
                ...b.comments,
                {
                  id: `c-${Date.now()}`,
                  userId: CURRENT_USER.id,
                  userName: `${CURRENT_USER.firstName} ${CURRENT_USER.lastName[0]}.`,
                  text,
                  createdAt: new Date().toISOString(),
                },
              ],
            }
          : b
      )
    );
  };

  const deleteComment = (blogId, commentId) => {
    setBlogs(prev =>
      prev.map(b =>
        b.id === blogId ? { ...b, comments: b.comments.filter(c => c.id !== commentId) } : b
      )
    );
  };

  return (
    <div className={dark ? "dark" : ""}>
      <div className="min-h-screen bg-slate-50 text-slate-900 transition-colors duration-300 dark:bg-[#0b0e14] dark:text-slate-100">
        {/* Subtle background accents */}
        <div aria-hidden className="pointer-events-none fixed inset-0">
          <div className="absolute -top-40 -left-40 h-96 w-96 rounded-full bg-indigo-400/10 blur-3xl" />
          <div className="absolute -bottom-40 -right-40 h-[28rem] w-[28rem] rounded-full bg-cyan-400/10 blur-3xl" />
        </div>

        <Navbar
          user={CURRENT_USER}
          dark={dark}
          onToggleDark={() => setDark(d => !d)}
          onGo={(path) => {
            // simple stub — wire to router if needed
            if (path === "/logout") alert("Logout clicked (wire up later)");
          }}
        />

        <div className="relative mx-auto grid max-w-7xl grid-cols-1 gap-6 px-4 py-6 md:grid-cols-[260px_1fr] md:gap-8 md:px-6 md:py-10">
          <Sidebar
            categories={CATEGORIES}
            category={category}
            onSelectCategory={setCategory}
            search={search}
            onSearch={setSearch}
          />

          {/* Blog Grid */}
          <section className="relative">
            <div className="mb-4 flex items-center justify-between">
              <h2 className="text-lg font-semibold">
                {category === "All" ? "All" : category} Blogs
              </h2>
              <p className="text-sm opacity-70">{filtered.length} results</p>
            </div>

            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
              {filtered.map(b => (
                <BlogCard
                  key={b.id}
                  blog={b}
                  onOpen={() => setSelected(b)}
                  onToggleLike={() => toggleLike(b.id)}
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
            onToggleLike={() => toggleLike(selected.id)}
            onAddComment={(text) => addComment(selected.id, text)}
            onDeleteComment={(cid) => deleteComment(selected.id, cid)}
          />
        )}
      </div>
    </div>
  );
}
