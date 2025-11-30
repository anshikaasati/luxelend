import { validationResult } from 'express-validator';
import Review from '../models/Review.js';

export const createReview = async (req, res, next) => {
  try {
    const errors = validationResult(req);
    if (!errors.isEmpty()) {
      res.status(400);
      return next(new Error(errors.array()[0].msg));
    }

    const { itemId, rating, comment } = req.body;
    const review = await Review.create({
      itemId,
      reviewerId: req.user._id,
      rating,
      comment
    });

    const populated = await review.populate('reviewerId', 'name avatarUrl');
    res.status(201).json(populated);
  } catch (error) {
    next(error);
  }
};

export const getReviewsByItem = async (req, res, next) => {
  try {
    const reviews = await Review.find({ itemId: req.params.itemId }).populate('reviewerId', 'name avatarUrl');
    res.json(reviews);
  } catch (error) {
    next(error);
  }
};


