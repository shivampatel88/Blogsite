const express = require('express');
const router = express.Router();
const { createBlog, getAllBlogs, getBlogById } = require('../controllers/blogController');
const upload = require('../middleware/multer');
const verifyToken = require('../middleware/authMiddleware');

router.post('/', verifyToken,upload.single('banner'), createBlog);
router.get('/', getAllBlogs);
router.get('/:id', getBlogById);

module.exports = router;
