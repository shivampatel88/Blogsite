import HeartIcon from "./icons/HeartIcon";
import EyeIcon from "./icons/EyeIcon";

export default function BlogCard({ blog, onCardClick }) {
  return (
    <div
      className="bg-gray-800 rounded-xl overflow-hidden shadow-lg transform hover:-translate-y-2 transition-transform duration-300 cursor-pointer"
      onClick={onCardClick}
    >
      <div className="relative">
        <img src={blog.imageUrl} alt={blog.title} className="w-full h-56 object-cover" />
        <div className="absolute inset-0 bg-gradient-to-t from-black/80 via-black/30 to-transparent"></div>
        <div className="absolute top-4 left-4 text-white font-semibold">
          <p>{blog.author}</p>
        </div>
        <div className="absolute top-4 right-4 flex items-center space-x-2">
          <span className="flex items-center bg-black bg-opacity-50 px-2 py-1 rounded-full text-sm text-white">
            <HeartIcon />
            {blog.likes}
          </span>
          <span className="flex items-center bg-black bg-opacity-50 px-2 py-1 rounded-full text-sm text-white">
            <EyeIcon />
            {blog.views}
          </span>
        </div>
      </div>
      <div className="p-6">
        <h4 className="text-xl font-bold text-white">{blog.title}</h4>
      </div>
    </div>
  );
}
