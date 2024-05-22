import {
  getMovie,
  getAllMovies,
  createMovie,
  updateMovie,
  deleteMovie,
} from '../models/movie';

const getMovieController = async (req, res) => {
  const { id } = req.params;
  const movie = await getMovie(id);
  if (!movie) {
    return res.status(404).send('Movie not found');
  }
  res.send(movie);
};

const getAllMoviesController = async (req, res) => {
  const movies = await getAllMovies();
  res.send(movies);
};

const createMovieController = async (req, res) => {
  const createdMovie = await createMovie(req.body);
  res.send(createdMovie);
};

const updateMovieController = async (req, res) => {
  const { id } = req.params;
  const updatedMovie = await updateMovie(id, req.body);
  res.send(updatedMovie);
};

const deleteMovieController = async (req, res) => {
  const { id } = req.params;
  const deletedMovie = await deleteMovie(id);
  res.send(deletedMovie);
};

export {
  getMovieController,
  getAllMoviesController,
  createMovieController,
  updateMovieController,
  deleteMovieController,
};
