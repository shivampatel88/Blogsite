const fs = require('fs');
const Blog = require('../models/Blog');
const cloudinary = require('../utils/cloudinary');

exports.createBlog = async (req, res) => {
    try {
        let imageUrl = "https://your-default-banner-url.com/default.jpg";

        if (req.file) {
            const result = await cloudinary.uploader.upload(req.file.path, {
                folder: "blog_banners"
            });
            imageUrl = result.secure_url;
            
             fs.unlinkSync(req.file.path);

        }

        const newBlog = new Blog({
            title: req.body.title,
            content: req.body.content,
            bannerImage: imageUrl,
            author: req.userId,
            category: req.body.category || "all"
        });

        await newBlog.save();
        res.status(201).json({ message: "Blog created", blog: newBlog });
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getAllBlogs = async (req, res) => {
    try {
        const blogs = await Blog.find().populate('author', 'username');
        res.json(blogs);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};

exports.getBlogById = async (req, res) => {
    try {
        const blog = await Blog.findById(req.params.id).populate('author', 'username');
        res.json(blog);
    } catch (err) {
        res.status(500).json({ error: err.message });
    }
};