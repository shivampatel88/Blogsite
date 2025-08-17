import BlogCard from "./BlogCard";

export default function FeaturedBlogs({ onCardClick }) {
  const blogs = [
    { id: 1, title: "The Art of Minimalist Web Design", author: "Alex Johnson", likes: "1.2k", views: "25k", imageUrl: "https://images.unsplash.com/photo-1522199755839-a2bacb67c546?q=80&w=2072&auto=format&fit=crop" },
    { id: 2, title: "A Freelancer's Guide to Productivity", author: "Samantha Bee", likes: "3.4k", views: "42k", imageUrl: "https://images.unsplash.com/photo-1499750310107-5fef28a66643?q=80&w=2070&auto=format&fit=crop" },
    { id: 3, title: "Unlocking the Power of AI in Writing", author: "David Chen", likes: "980", views: "18k", imageUrl: "https://images.unsplash.com/photo-1486312338219-ce68d2c6f44d?q=80&w=2072&auto=format&fit=crop" },
  ];

  return (
    <section id="featured-blogs" className="py-20 sm:py-24 bg-gray-900">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h3 className="text-3xl sm:text-4xl font-bold text-white">Most Popular Reads</h3>
          <p className="text-gray-400 mt-2">Handpicked stories that our community is loving right now.</p>
        </div>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {blogs.map((blog) => (
            <BlogCard key={blog.id} blog={blog} onCardClick={onCardClick} />
          ))}
        </div>
      </div>
    </section>
  );
}
