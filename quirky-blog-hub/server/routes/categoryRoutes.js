import express from 'express';
import { body } from 'express-validator';
import { getAllCategories, createCategory } from '../controllers/categoryController.js';
import { authenticate } from '../middleware/auth.js';

const router = express.Router();

// GET /api/categories - get all categories
router.get('/', getAllCategories);

// POST /api/categories - create a new category (auth)
router.post('/', authenticate, [body('name').notEmpty()], createCategory);

export default router; 