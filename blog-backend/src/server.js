const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./routes/auth');
const blogRoutes = require('./routes/blog');
const pageRoutes = require('./routes/pages');
const likeRoutes = require('./routes/likes');
const commentRoutes = require('./routes/comments');

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173", // frontend URL
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);

mongoose.connect(process.env.MONGO_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000"));
