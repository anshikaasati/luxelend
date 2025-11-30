import express from 'express';
import { body } from 'express-validator';
import { protect } from '../middleware/authMiddleware.js';
import {
  checkAvailability,
  createBooking,
  getUserBookings,
  getOwnerBookings,
  cancelBooking
} from '../controllers/bookingController.js';

const router = express.Router();

const bookingValidation = [
  body('itemId').notEmpty().withMessage('Item ID is required'),
  body('startDate').notEmpty().withMessage('Start date is required'),
  body('endDate').notEmpty().withMessage('End date is required')
];

router.post('/check', checkAvailability);
router.post('/', protect, bookingValidation, createBooking);
router.get('/user', protect, getUserBookings);
router.get('/owner', protect, getOwnerBookings);
router.put('/:id/cancel', protect, cancelBooking);

export default router;


