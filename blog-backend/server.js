const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

require('dotenv').config();

const authRoutes = require('./src/routes/auth');
const blogRoutes = require('./src/routes/blog');
const likeRoutes = require('./src/routes/likes');
const commentRoutes = require('./src/routes/comments');

const app = express();

app.use(express.json());

const allowedOrigins = [
  'http://localhost:5173', 
  'http://blogsite-frontend-tau.vercel.app'
];

app.use(cors({
  origin: function (origin, callback) {

    if (!origin) return callback(null, true);
    if (allowedOrigins.indexOf(origin) === -1) {
      const msg = 'The CORS policy for this site does not allow access from the specified Origin.';
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
  credentials: true
}));

app.use('/api/auth', authRoutes);
app.use('/api/blog', blogRoutes);
app.use('/api/likes', likeRoutes);
app.use('/api/comments', commentRoutes);

mongoose.connect(process.env.MONGODB_URI)
  .then(() => console.log("MongoDB Connected"))
  .catch(err => console.error(err));

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server running on port ${PORT}`));