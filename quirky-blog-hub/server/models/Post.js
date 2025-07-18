import mongoose from 'mongoose';

const commentSchema = new mongoose.Schema({
  author: { type: String, required: true },
  text: { type: String, required: true },
  createdAt: { type: Date, default: Date.now }
});

const postSchema = new mongoose.Schema({
  title: { type: String, required: true },
  content: { type: String, required: true },
  category: { type: mongoose.Schema.Types.ObjectId, ref: 'Category', required: true },
  image: { type: String },
  author: { type: String, required: true },
  comments: [commentSchema]
}, { timestamps: true });

export default mongoose.model('Post', postSchema); 