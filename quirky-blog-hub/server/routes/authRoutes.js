import express from 'express';
import { body } from 'express-validator';
import { register, login } from '../controllers/authController.js';

const router = express.Router();

// POST /api/auth/register - register a new user
router.post('/register', [
  body('username').notEmpty(),
  body('email').isEmail(),
  body('password').isLength({ min: 6 })
], register);

// POST /api/auth/login - login a user
router.post('/login', [
  body('email').isEmail(),
  body('password').notEmpty()
], login);

export default router; 