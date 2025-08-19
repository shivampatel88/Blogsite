export default function BlogCard({ blog, onOpen, onToggleLike }) {
  return (
    <article
      className="group overflow-hidden rounded-2xl border border-slate-200/60 bg-white/70 shadow-sm backdrop-blur transition hover:-translate-y-0.5 hover:shadow-lg dark:border-white/10 dark:bg-white/5"
    >
      <button onClick={onOpen} className="block w-full text-left">
        <div className="relative aspect-[16/10] overflow-hidden">
          <img
            src={blog.bannerImage}
            alt={blog.title}
            className="h-full w-full object-cover transition duration-300 group-hover:scale-[1.02]"
          />
        </div>
        <div className="p-3">
          <p className="text-xs opacity-60">{new Date(blog.createdAt).toLocaleDateString()}</p>
          <h3 className="mt-1 line-clamp-1 text-base font-semibold">{blog.title}</h3>
          <p className="mt-1 text-sm opacity-80">by {blog.author.name}</p>
        </div>
      </button>

      <div className="flex items-center justify-between border-t border-slate-200/60 px-3 py-2 text-sm dark:border-white/10">
        <span className="rounded-full bg-slate-100 px-2 py-1 text-xs dark:bg-white/10">{blog.category}</span>
        <button
          onClick={onToggleLike}
          className={`rounded-full px-3 py-1 transition ${
            blog.likedByMe
              ? "bg-rose-500/90 text-white"
              : "bg-slate-100 text-slate-700 hover:bg-slate-200 dark:bg-white/10 dark:text-white dark:hover:bg-white/20"
          }`}
        >
          ♥ {blog.likes}
        </button>
      </div>
    </article>
  );
}
