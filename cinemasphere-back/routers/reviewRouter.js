import express from 'express';
import {
  getReviewController,
  getAllReviewsController,
  createReviewController,
  updateReviewController,
  deleteReviewController,
} from '../controllers/reviewController';

const router = express.Router();

router.get('/:id', getReviewController);
router.get('/', getAllReviewsController);
router.post('/', createReviewController);
router.put('/:id', updateReviewController);
router.delete('/:id', deleteReviewController);

export default router;
