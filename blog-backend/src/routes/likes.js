const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const Blog = require('../models/Blog');

const router = express.Router();

// Toggle like/unlike
router.put('/:blogId/toggle', verifyToken, async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const userId = req.userId;

    const alreadyLiked = blog.likes.some(id => id.toString() === userId);
    if (alreadyLiked) {
      blog.likes.pull(userId); // unlike
    } else {
      blog.likes.push(userId); // like
    }

    await blog.save();
    return res.json({
      liked: !alreadyLiked,
      likesCount: blog.likes.length
    });
  } catch (err) {
    return res.status(500).json({ error: err.message });
  }
});

// Get like count (optional)
router.get('/:blogId/count', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId).select('likes');
    if (!blog) return res.status(404).json({ message: 'Blog not found' });
    res.json({ likesCount: blog.likes.length });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

module.exports = router;
