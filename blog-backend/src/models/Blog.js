const mongoose = require('mongoose');

const commentSchema = new mongoose.Schema({
  user: { type: mongoose.Schema.Types.ObjectId, ref: "User", required: true },
  text: { type: String, required: true, trim: true },
  createdAt: { type: Date, default: Date.now }
},
    { _id: true }
);

const blogSchema = new mongoose.Schema({
    title: { type: String, required: true },
    content: { type: String, required: true },
    bannerImage: { type: String, default: "https://your-default-banner-url.com/default.jpg" },
    category: { type: String, enum: ["all", "food", "travel", "fashion", "technology"], default: "all" },
    author: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    createdAt: { type: Date, default: Date.now },
    likes:{type: mongoose.Schema.Types.ObjectId,ref: "User",},
    comments: [commentSchema],
    });

module.exports = mongoose.model('Blog', blogSchema);
