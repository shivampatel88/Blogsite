const fs = require('fs');
const Blog = require('../models/Blog');
const cloudinary = require('../utils/cloudinary');

// ---- Create Blog ----
exports.createBlog = async (req, res) => {
  try {
    let imageUrl = "https://your-default-banner-url.com/default.jpg";

    if (req.file) {
      const result = await cloudinary.uploader.upload(req.file.path, {
        folder: "blog_banners",
      });
      imageUrl = result.secure_url;
      fs.unlinkSync(req.file.path);
    }

    const newBlog = new Blog({
      title: req.body.title,
      content: req.body.content,
      bannerImage: imageUrl,
      author: req.userId,
      category: req.body.category || "all",
    });

    await newBlog.save();
    res.status(201).json({ message: "Blog created", blog: newBlog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---- Get All Blogs ----
exports.getAllBlogs = async (req, res) => {
  try {
    const blogs = await Blog.find().populate('author', 'firstname lastname');
    res.json(blogs);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---- Get Blog by ID ----
exports.getBlogById = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id).populate('author', 'firstname lastname');
    res.json(blog);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---- Update Blog ----
exports.updateBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    blog.title = req.body.title || blog.title;
    blog.content = req.body.content || blog.content;
    blog.category = req.body.category || blog.category;

    await blog.save();
    res.json({ message: "Blog updated", blog });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};

// ---- Delete Blog ----
exports.deleteBlog = async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.id);
    if (!blog) return res.status(404).json({ message: "Blog not found" });

    if (blog.author.toString() !== req.userId) {
      return res.status(403).json({ message: "Not authorized" });
    }

    await blog.deleteOne();
    res.json({ message: "Blog deleted" });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
};
