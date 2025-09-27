import mongoose from 'mongoose';

const blogSchema = new mongoose.Schema({
  title: String,
  author: String,
  excerpt: String,
  content: String,
  image: String,
  createdAt: { type: Date, default: Date.now }
});

export default mongoose.model('Blog', blogSchema);