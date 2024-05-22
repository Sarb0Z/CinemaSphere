import express from 'express';
import {
  getMovieController,
  getAllMoviesController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
} from '../controllers/movieController';

const router = express.Router();

router.get('/:id', getMovieController);
router.get('/', getAllMoviesController);
router.post('/', createMovieController);
router.put('/:id', updateMovieController);
router.delete('/:id', deleteMovieController);

export default router;
