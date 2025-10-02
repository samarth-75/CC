import mongoose from "mongoose";

const BlogSchema = new mongoose.Schema({
  title: { type: String, required: true },
  excerpt: { type: String, required: true },
  author: { type: String, required: true },
  image: { type: String },
  content: { type: String, required: true }   // ✅ new field
}, { timestamps: true });

export default mongoose.model("Blog", BlogSchema);
