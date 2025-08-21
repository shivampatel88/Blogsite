import { useState, useEffect } from "react";
import API_URL from "../api"; // your axios/fetch base URL
import { useNavigate } from "react-router-dom";

export default function BlogModal({ blog, me, onClose,  onLikeUpdate, onDeleteSuccess}) {   // ✅ CHANGED: added onToggleLike prop
  const [currentBlog, setCurrentBlog] = useState(blog);
  const [text, setText] = useState("");
  const [loadingComments, setLoadingComments] = useState(false);
  const navigate = useNavigate();
  const token = localStorage.getItem("token");


  
  // Fetch comments when modal opens
  useEffect(() => {
    const fetchComments = async () => {
      try {
        setLoadingComments(true);
        const res = await API_URL.get(`/comments/${currentBlog._id}`);
        setCurrentBlog((prev) => ({ ...prev, comments: res.data || [] }));
      } catch (err) {
        console.error("Error fetching comments:", err);
      } finally {
        setLoadingComments(false);
      }
    };
    fetchComments();
  }, [currentBlog._id]);

  // ---- Toggle Like ----
  const handleToggleLike = async () => {
    try {
      const res = await API_URL.put(
        `/likes/${currentBlog._id}/toggle`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentBlog((prev) => ({
        ...prev,
        likesCount: res.data.likesCount,
        likedByMe: res.data.liked,
      }));

      if (onLikeUpdate) { 
        onLikeUpdate(currentBlog._id, res.data.likesCount, res.data.liked);
      }

    } catch (err) {
      console.error("Error toggling like:", err);
    }
  };

  // ---- Add Comment ----
  const handleAddComment = async () => {
    if (!text.trim()) return;
    try {
      const res = await API_URL.post(
        `/comments/${currentBlog._id}`,
        { text },
        { headers: { Authorization: `Bearer ${token}` } }
      );
      setCurrentBlog((prev) => ({ ...prev, comments: res.data.comments }));
      setText("");
    } catch (err) {
      console.error(err);
    }
  };

  // ---- Delete Comment ----
  const handleDeleteComment = async (commentId) => {
    try {
      const res = await API_URL.delete(`/comments/${currentBlog._id}/${commentId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      if (res.status === 200) {   // ✅ CHANGED: use res.status instead of res.ok
        setCurrentBlog((prev) => ({
          ...prev,
          comments: prev.comments.filter((c) => c._id !== commentId),
        }));
      }
    } catch (err) {
      console.error("Error deleting comment:", err);
    }
  };

  const handleDeleteBlog = async () => {
  try {
    const res = await API_URL.delete(`/blog/${currentBlog._id}`, {
      headers: { Authorization: `Bearer ${token}` },
    });
    if (res.status === 200) {
      if (onDeleteSuccess) {
          onDeleteSuccess();
        }   // ✅ Go back to home
    }
  } catch (err) {
    console.error("Error deleting blog:", err);
  }
};


  return (
    <div className="fixed inset-0 z-50 grid place-items-center bg-black/50 p-3 sm:p-6">
      <div className="max-h-[92vh] w-full max-w-4xl overflow-hidden rounded-3xl border border-white/10 bg-white/90 backdrop-blur-2xl dark:bg-[#0c0f15]/90 transition-all duration-300">
        {/* Header */}
        <div className="flex items-center justify-between border-b border-white/10 p-3 sm:p-4">
          <button
            onClick={onClose}
            className="rounded-lg px-3 py-2 text-sm hover:bg-white/40 dark:hover:bg-white/10"
          >
            ← Back
          </button>

          {me?._id === currentBlog.author?._id && (
          <div className="flex gap-2">
            <button onClick={() => navigate(`/edit/${currentBlog._id}`)}
            className="rounded-lg px-3 py-1 text-sm bg-blue-500 text-white">
            Edit
            </button>
            <button onClick={handleDeleteBlog}
            className="rounded-lg px-3 py-1 text-sm bg-red-500 text-white">
            Delete
            </button>
          </div>
          )}

          <button
            onClick={handleToggleLike}
            className={`rounded-full px-3 py-1 text-sm transition ${
              currentBlog.likedByMe
                ? "bg-rose-500/90 text-white"
                : "bg-white/60 hover:bg-white dark:bg-white/10"
            }`}
          >
            ♥ {currentBlog.likesCount ?? (Array.isArray(currentBlog.likes) ? currentBlog.likes.length : 0)}
          </button>
        </div>

        {/* Body */}
        <div className="grid max-h-[calc(92vh-4rem)] overflow-y-auto">
          <div>
            <div className="relative aspect-[16/9] w-full overflow-hidden">
              <img
                src={currentBlog.bannerImage}
                alt={currentBlog.title}
                className="h-full w-full object-cover"
              />
            </div>

            <div className="p-4 sm:p-6">
              <div className="mb-2 flex flex-wrap items-center gap-2 text-sm opacity-70">
                <span>{new Date(currentBlog.createdAt).toLocaleString()}</span>
                <span>•</span>
                <span>
                  By {currentBlog.author?.firstname} {currentBlog.author?.lastname}
                </span>
                <span>•</span>
                <span className="rounded-full bg-slate-200 px-2 py-0.5 text-xs dark:bg-white/10">
                  {currentBlog.category}
                </span>
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
                      <li
                        key={c._id}
                        className="rounded-xl border border-slate-200/60 bg-white/70 p-3 text-sm dark:border-white/10 dark:bg-white/5"
                      >
                        <div className="mb-1 flex items-center justify-between">
                          <span className="font-medium">{c.user?.username}</span>
                          <span className="opacity-60 text-xs">
                            {new Date(c.createdAt).toLocaleString()}
                          </span>
                        </div>
                        <p className="opacity-90">{c.text}</p>
                        {c.user?._id && me?._id && c.user._id === me._id && (
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
