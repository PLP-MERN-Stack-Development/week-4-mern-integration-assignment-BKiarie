import express from 'express';
import { body, param } from 'express-validator';
import { getAllPosts, getPostById, createPost, updatePost, deletePost, addComment } from '../controllers/postController.js';
import { upload } from '../middleware/upload.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET /api/posts - get all posts
router.get('/', getAllPosts);

// GET /api/posts/:id - get a specific post
router.get('/:id', [param('id').isMongoId()], getPostById);

// POST /api/posts - create a new post (auth, image upload)
router.post('/', authenticate, upload.single('image'), [
  body('title').notEmpty(),
  body('content').notEmpty(),
  body('category').isMongoId(),
  body('author').notEmpty()
], createPost);

// PUT /api/posts/:id - update a post (auth, image upload)
router.put('/:id', authenticate, upload.single('image'), [
  param('id').isMongoId(),
  body('title').optional().notEmpty(),
  body('content').optional().notEmpty(),
  body('category').optional().isMongoId(),
  body('author').optional().notEmpty()
], updatePost);

// DELETE /api/posts/:id - delete a post (auth)
router.delete('/:id', authenticate, [param('id').isMongoId()], deletePost);

// POST /api/posts/:id/comments - add a comment
router.post('/:id/comments', [param('id').isMongoId(), body('author').notEmpty(), body('text').notEmpty()], addComment);

export default router; 