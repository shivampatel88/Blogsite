import { useState, useEffect } from "react";
import API_URL from "../api"; // your axios instance

export default function BlogModal({ blog, me, onClose }) {
  const [currentBlog, setCurrentBlog] = useState(blog);
  const [text, setText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const [isEditing, setIsEditing] = useState(false);
  const [editForm, setEditForm] = useState({title: blog.title,content: blog.content,category: blog.category});

  const token = localStorage.getItem("token");

  // Fetch comments when modal opens
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const res = await fetch(`${API_URL}/comments/${currentBlog._id}`);
        const data = await res.json();
        setCurrentBlog((prev) => ({ ...prev, comments: data }));
      } catch (err) {
        console.error(err);
      } finally {
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, [currentBlog._id]);

  // ---- Toggle Like ----
  const handleToggleLike = async () => {
    try {
      const res = await fetch(`http://localhost:5000/api/likes/${currentBlog._id}/toggle`, {
        method: "PUT",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setCurrentBlog((prev) => ({
        ...prev,
        likes: data.likesCount,
        likedByMe: data.liked
      }));
    } catch (err) {
      console.error(err);
    }
  };

  // ---- Add Comment ----
  const handleAddComment = async () => {
    if (!text.trim()) return;
    try {
      const res = await fetch(`http://localhost:5000/api/comments/${currentBlog._id}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${token}`
        },
        body: JSON.stringify({ text })
      });
      const data = await res.json();
      setCurrentBlog((prev) => ({ ...prev, comments: data.comments }));
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  // ---- Delete Comment ----
  const handleDeleteComment = async (commentId) => {
    try {
      const res = await fetch(`${API_URL}/comments/${currentBlog._id}/${commentId}`, {
        method: "DELETE",
        headers: { Authorization: `Bearer ${token}` }
      });
      const data = await res.json();
      setCurrentBlog(prev => ({ ...prev, comments: data.comments }));
    } catch (err) {
      console.error(err);
    }
  };

  const handleUpdateBlog = async () => {
  try {
    const res = await fetch(`${API_URL}/blogs/${currentBlog._id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token}`
      },
      body: JSON.stringify(editForm)
    });
    const data = await res.json();
    setCurrentBlog(data.blog);
    setIsEditing(false);
  } catch (err) {
    console.error(err);
  }
};


  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-3 sm:p-6">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/90 backdrop-blur-2xl dark:bg-[#0c0f15]/90">
        
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-3 sm:p-4">
          <button onClick={onClose} className="rounded-lg px-3 py-2 text-sm hover:bg-white/40 dark:hover:bg-white/10">
            ← Back
          </button>

          <button
            onClick={handleToggleLike}
            className={`rounded-full px-3 py-1 text-sm ${
              currentBlog.likedByMe ? "bg-rose-500/90 text-white" : "bg-white/60 hover:bg-white dark:bg-white/10"
            }`}
          >
            ♥ {currentBlog.likes || 0}
          </button>
        </div>

        {currentBlog.author?._id === me.id && (
        <button onClick={() => setIsEditing((p) => !p)}
          className="ml-2 rounded-lg px-3 py-1 text-sm bg-amber-500/80 text-white hover:bg-amber-600 transition">
          {isEditing ? "Cancel" : "Modify"}
        </button>
      )}


        {/* Body */}
        <div className="grid max-h-[calc(92vh-4rem)] overflow-y-auto">

          {isEditing ? (
          <div className="space-y-3">
            <input value={editForm.title} onChange={(e) => setEditForm({ ...editForm, title: e.target.value })} 
            className="w-full rounded-lg border px-3 py-2"/>
            <textarea value={editForm.content} onChange={(e) => setEditForm({ ...editForm, content: e.target.value })} 
            className="w-full rounded-lg border px-3 py-2"/>
            <select value={editForm.category} onChange={(e) => setEditForm({ ...editForm, category: e.target.value })}
            className="w-full rounded-lg border px-3 py-2">
            <option value="all">All</option>
            <option value="food">Food</option>
            <option value="travel">Travel</option>
            <option value="business">Business</option>
            <option value="technology">Technology</option>
            </select>
            <button onClick={handleUpdateBlog}
            className="rounded-lg bg-green-500 px-4 py-2 text-white hover:bg-green-600">
              Save Changes
            </button>
          </div>
            ) : (
              <>
                <h2 className="mb-2 text-xl font-bold sm:text-2xl">{currentBlog.title}</h2>
                <p className="leading-relaxed opacity-90">{currentBlog.content}</p>
              </>
            )}

          <div>
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img src={currentBlog.bannerImage} alt={currentBlog.title} className="h-full w-full object-cover" />
            </div>

            <div className="p-4 sm:p-6">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-sm opacity-70">
                <span>{new Date(currentBlog.createdAt).toLocaleString()}</span>
                <span>•</span>
                <span>By {currentBlog.author?.username}</span>
                <span>•</span>
                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs dark:bg-white/10">{currentBlog.category}</span>
              </div>

              <h2 className="mb-2 text-xl font-bold sm:text-2xl">{currentBlog.title}</h2>
              <p className="leading-relaxed opacity-90">{currentBlog.content}</p>

              {/* Comments */}
              <div className="mt-8">
                <h3 className="mb-3 text-lg font-semibold">Comments</h3>

                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    handleAddComment();
                  }}
                  className="mb-4 flex gap-2"
                >
                  <input
                    value={text}
                    onChange={(e) => setText(e.target.value)}
                    placeholder="Write a comment…"
                    className="flex-1 rounded-xl border border-slate-200/60 bg-white/70 px-3 py-2 text-sm outline-none placeholder:opacity-50 focus:border-indigo-300 dark:border-white/10 dark:bg-white/10"
                  />
                  <button
                    type="submit"
                    className="rounded-xl bg-indigo-500 px-4 py-2 text-sm font-semibold text-white hover:bg-indigo-600"
                  >
                    Post
                  </button>
                </form>

                {loadingComments ? (
                  <p className="text-sm opacity-60">Loading comments...</p>
                ) : (
                  <ul className="space-y-3">
                    {currentBlog.comments?.map((c) => (
                      <li key={c._id} className="rounded-xl border border-slate-200/60 bg-white/70 p-3 text-sm dark:border-white/10 dark:bg-white/5">
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-medium">{c.user?.username}</span>
                          <span className="opacity-60 text-xs">{new Date(c.createdAt).toLocaleString()}</span>
                        </div>
                        <p className="opacity-90">{c.text}</p>
                        {c.user?._id === me.id && (
                          <div className="mt-2 text-right">
                            <button
                              onClick={() => handleDeleteComment(c._id)}
                              className="rounded-lg px-2 py-1 text-xs text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-500/10"
                            >
                              Delete
                            </button>
                          </div>
                        )}
                      </li>
                    ))}
                    {currentBlog.comments?.length === 0 && (
                      <p className="opacity-60 text-sm">No comments yet. Be the first!</p>
                    )}
                  </ul>
                )}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
