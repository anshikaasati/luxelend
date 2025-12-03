import express from 'express';
import { protect } from '../middleware/authMiddleware.js';
import {
    onboardLender,
    createOrder,
    verifyPayment,
    createSubscription,
    verifySubscription,
    handleWebhook
} from '../controllers/paymentController.js';

const router = express.Router();

router.post('/onboard-lender', protect, onboardLender);
router.post('/create-order', protect, createOrder);
router.post('/verify-payment', protect, verifyPayment);
router.post('/create-subscription', protect, createSubscription);
router.post('/verify-subscription', protect, verifySubscription);
router.post('/webhook', handleWebhook); // Webhook usually doesn't use 'protect' middleware, verifies signature instead

export default router;
