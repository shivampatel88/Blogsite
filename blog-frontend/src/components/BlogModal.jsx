import { useState } from "react";

export default function BlogModal({ blog, me, onClose, onToggleLike, onAddComment, onDeleteComment }) {
  const [text, setText] = useState("");

  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-3 sm:p-6">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/90 backdrop-blur-2xl dark:bg-[#0c0f15]/90">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-3 sm:p-4">
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm hover:bg-white/40 dark:hover:bg-white/10"
          >
            ← Back
          </button>

          <button
            onClick={onToggleLike}
            className={`rounded-full px-3 py-1 text-sm ${
              blog.likedByMe ? "bg-rose-500/90 text-white" : "bg-white/60 hover:bg-white dark:bg-white/10"
            }`}
          >
            ♥ {blog.likes}
          </button>
        </div>

        {/* Body (scrollable) */}
        <div className="grid max-h-[calc(92vh-4rem)] grid-cols-1 overflow-y-auto sm:grid-cols-[1fr]">
          <div>
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img src={blog.bannerImage} alt={blog.title} className="h-full w-full object-cover" />
            </div>

            <div className="p-4 sm:p-6">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-sm opacity-70">
                <span>{new Date(blog.createdAt).toLocaleString()}</span>
                <span>•</span>
                <span>By {blog.author.name}</span>
                <span>•</span>
                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs dark:bg-white/10">{blog.category}</span>
              </div>

              <h2 className="mb-2 text-xl font-bold sm:text-2xl">{blog.title}</h2>
              <p className="leading-relaxed opacity-90">{blog.content}</p>

              {/* Comments */}
              <div className="mt-8">
                <h3 className="mb-3 text-lg font-semibold">Comments</h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    onAddComment(text);
                    setText("");
                  }}
                  className="mb-4 flex gap-2"
                >
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment…"
                    className="flex-1 rounded-xl border border-slate-200/60 bg-white/70 px-3 py-2 text-sm outline-none ring-0 placeholder:opacity-50 focus:border-indigo-300 dark:border-white/10 dark:bg-white/10"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
                  >
                    Post
                  </button>
                </form>

                <ul className="space-y-3">
                  {blog.comments.map((c) => (
                    <li key={c.id} className="rounded-xl border border-slate-200/60 bg-white/70 p-3 text-sm dark:border-white/10 dark:bg-white/5">
                      <div className="mb-1 flex items-center justify-between">
                        <span className="font-medium">{c.userName}</span>
                        <span className="opacity-60 text-xs">{new Date(c.createdAt).toLocaleString()}</span>
                      </div>
                      <p className="opacity-90">{c.text}</p>
                      {c.userId === me.id && (
                        <div className="mt-2 text-right">
                          <button
                            onClick={() => onDeleteComment(c.id)}
                            className="rounded-lg px-2 py-1 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                          >
                            Delete
                          </button>
                        </div>
                      )}
                    </li>
                  ))}
                  {blog.comments.length === 0 && (
                    <p className="opacity-60 text-sm">No comments yet. Be the first!</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
