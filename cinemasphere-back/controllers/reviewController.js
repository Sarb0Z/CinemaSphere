import {
  getReview,
  getAllReviews,
  createReview,
  updateReview,
  deleteReview,
} from '../models/review';

const getReviewController = async (req, res) => {
  const { id } = req.params;
  const review = await getReview(id);
  if (!review) {
    return res.status(404).send('Review not found');
  }
  res.send(review);
};

const getAllReviewsController = async (req, res) => {
  const reviews = await getAllReviews();
  res.send(reviews);
};

const createReviewController = async (req, res) => {
  const createdReview = await createReview(req.body);
  res.send(createdReview);
};

const updateReviewController = async (req, res) => {
  const { id } = req.params;
  const updatedReview = await updateReview(id, req.body);
  res.send(updatedReview);
};

const deleteReviewController = async (req, res) => {
  const { id } = req.params;
  const deletedReview = await deleteReview(id);
  res.send(deletedReview);
};

export {
  getReviewController,
  getAllReviewsController,
  createReviewController,
  updateReviewController,
  deleteReviewController,
};
