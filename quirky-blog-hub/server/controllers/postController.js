import Post from '../models/Post.js';
import Category from '../models/Category.js';

export const getAllPosts = async (req, res, next) => {
  try {
    const posts = await Post.find().populate('category').sort({ createdAt: -1 });
    res.json(posts);
  } catch (err) {
    next(err);
  }
};

export const getPostById = async (req, res, next) => {
  try {
    const post = await Post.findById(req.params.id).populate('category');
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const createPost = async (req, res, next) => {
  try {
    const { title, content, category, author } = req.body;
    const image = req.file ? req.file.filename : undefined;
    const post = new Post({ title, content, category, author, image });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
};

export const updatePost = async (req, res, next) => {
  try {
    const { title, content, category, author } = req.body;
    const update = { title, content, category, author };
    if (req.file) update.image = req.file.filename;
    const post = await Post.findByIdAndUpdate(req.params.id, update, { new: true });
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json(post);
  } catch (err) {
    next(err);
  }
};

export const deletePost = async (req, res, next) => {
  try {
    const post = await Post.findByIdAndDelete(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    res.json({ message: 'Post deleted' });
  } catch (err) {
    next(err);
  }
};

export const addComment = async (req, res, next) => {
  try {
    const { author, text } = req.body;
    const post = await Post.findById(req.params.id);
    if (!post) return res.status(404).json({ error: 'Post not found' });
    post.comments.push({ author, text });
    await post.save();
    res.status(201).json(post);
  } catch (err) {
    next(err);
  }
}; 