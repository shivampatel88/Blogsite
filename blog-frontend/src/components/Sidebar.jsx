import { Link } from "react-router-dom";

export default function Sidebar({ categories, category, onSelectCategory, search, onSearch }) {
  return (
    <aside className="sticky top-4 h-fit rounded-2xl border border-slate-200/60 bg-white/70 p-4 backdrop-blur-lg dark:border-white/10 dark:bg-white/5">
      <div>
        <label className="mb-2 block text-sm font-medium opacity-80">Search by author</label>
        <input
          value={search}
          onChange={(e) => onSearch(e.target.value)}
          placeholder="e.g. Ananya Sharma"
          className="w-full rounded-xl border border-slate-200/60 bg-white/80 px-3 py-2 text-sm outline-none ring-0 placeholder:opacity-60 focus:border-indigo-300 dark:border-white/10 dark:bg-white/10"
        />
      </div>

      <div className="mt-5">
        <p className="mb-2 text-sm font-medium opacity-80">Categories</p>
        <div className="space-y-2">
          {categories.map((c) => {
            const active = c === category;
            return (
              <button
                key={c}
                onClick={() => onSelectCategory(c)}
                className={`w-full rounded-lg px-3 py-2 text-left text-sm transition
                ${active
                    ? "bg-indigo-500/10 text-indigo-600 ring-1 ring-indigo-300 dark:text-indigo-300 dark:ring-indigo-700/40"
                    : "hover:bg-slate-100/70 dark:hover:bg-white/10"
                  }`}
              >
                {c}
              </button>
            );
          })}
        </div>
        <button className="mt-4 w-full rounded-xl bg-indigo-600/90 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600 transition">
        <Link to="/create">Write your Blog</Link>
        </button>
      </div>
    </aside>
  );
}
