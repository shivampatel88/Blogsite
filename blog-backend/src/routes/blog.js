const express = require('express');
const router = express.Router();
const { createBlog, getAllBlogs, getBlogById, updateBlog, deleteBlog} = require('../controllers/blogController');
const upload = require('../middleware/multer');
const verifyToken = require('../middleware/authMiddleware');


router.get('/', getAllBlogs);
router.get('/:id', getBlogById);
router.post("/", verifyToken, upload.single("banner"), createBlog);
router.put('/:id', verifyToken, updateBlog);
router.delete('/:id', verifyToken, deleteBlog);

module.exports = router;
