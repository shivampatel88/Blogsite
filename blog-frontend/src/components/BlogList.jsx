import { useEffect, useState } from "react";
import BlogModal from "./BlogModal";

export default function BlogList() {
  const [blogs, setBlogs] = useState([]);
  const [selectedBlog, setSelectedBlog] = useState(null);

  useEffect(() => {
    fetch("http://localhost:5000/api/blog")
      .then(res => res.json())
      .then(data => setBlogs(data));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 p-6">
      {blogs.map(blog => (
        <div key={blog._id} 
        className="rounded-xl overflow-hidden bg-white/10 backdrop-blur-md shadow-lg cursor-pointer hover:scale-[1.02] transition" 
        onClick={() => setSelectedBlog(blog)}>
          <img src={blog.bannerImage} alt={blog.title} className="h-48 w-full object-cover" />
          <div className="p-4">
            <h2 className="text-lg font-semibold text-white">{blog.title}</h2>
            <p className="text-sm text-gray-300">
              By {blog.author?.username} · {blog.category}
            </p>
            <p className="text-sm text-gray-400">{blog.likes.length} ❤️</p>
          </div>
        </div>
      ))}

      {selectedBlog && (
        <BlogModal blog={selectedBlog} onClose={() => setSelectedBlog(null)} />
      )}
    </div>
  );
}
