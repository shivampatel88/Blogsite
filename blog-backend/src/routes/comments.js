const express = require('express');
const verifyToken = require('../middleware/authMiddleware');
const Blog = require('../models/Blog');

const router = express.Router();

router.post('/:blogId', verifyToken, async (req, res) => {
  try {
    const { text } = req.body;
    if (!text || !text.trim()) {
      return res.status(400).json({ message: 'Comment text is required' });
    }

    const blog = await Blog.findById(req.params.blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    blog.comments.push({ user: req.userId, text: text.trim() });
    await blog.save();

    await blog.populate('comments.user', 'username email');

    res.status(201).json({
      message: 'Comment added',
      comments: blog.comments
    });
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.get('/:blogId', async (req, res) => {
  try {
    const blog = await Blog.findById(req.params.blogId)
      .select('comments')
      .populate('comments.user', 'username email');

    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const comments = [...blog.comments].sort((a, b) => a.createdAt - b.createdAt);

    res.json(comments);
  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});

router.delete('/:blogId/:commentId', verifyToken, async (req, res) => {
  try {
    const { blogId, commentId } = req.params;

    const blog = await Blog.findById(blogId);
    if (!blog) return res.status(404).json({ message: 'Blog not found' });

    const comment = blog.comments.id(commentId);
    if (!comment) return res.status(404).json({ message: 'Comment not found' });

    if (comment.user.toString() !== req.userId) {
      return res.status(403).json({ message: 'Not allowed to delete this comment' });
    }

    blog.comments.pull({ _id: commentId });
    await blog.save();

    await blog.populate('comments.user', 'firstname lastname email');

    res.json({
      message: 'Comment deleted',
      comments: blog.comments
    });

  } catch (err) {
    res.status(500).json({ error: err.message });
  }
});


module.exports = router;
