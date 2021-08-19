const router = require('express').Router();
const { paramsValidation, moviesValidation } = require('../middlewares/validation');

const {
  getMovies, createMovie, deleteMovie,
} = require('../controllers/movies');

router.get('/movies', getMovies);

router.post(
  '/movies',
  moviesValidation,
  createMovie,
);

router.delete(
  '/movies/:_id',
  paramsValidation,
  deleteMovie,
);

module.exports = router;
