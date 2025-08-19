const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');
const pageRoutes = require('./src/routes/pages');
const likeRoutes = require('./src/routes/likes');
const commentRoutes = require('./src/routes/comments');

const app = express();

app.use(express.json());
app.use(cors({
  origin: "http://localhost:5173",
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/pages', pageRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

app.listen(5000, () => console.log("Server running on port 5000"));
