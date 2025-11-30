import express from 'express';
import { body } from 'express-validator';
import { createReview, getReviewsByItem } from '../controllers/reviewController.js';
import { protect } from '../middleware/authMiddleware.js';

const router = express.Router();

router.post(
  '/',
  protect,
  [
    body('itemId').notEmpty().withMessage('Item ID is required'),
    body('rating').isFloat({ min: 1, max: 5 }).withMessage('Rating must be between 1 and 5')
  ],
  createReview
);

router.get('/:itemId', getReviewsByItem);

export default router;


