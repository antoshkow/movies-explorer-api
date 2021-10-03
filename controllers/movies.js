const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');
const {
  NOT_FOUND_FILMS_MSG,
  NOT_FOUND_FILM_MSG,
  FORBIDDEN_FILM_MSG,
  SUCCESS_DELETE_FILM_MSG,
  BAD_REQUEST_MSG,
} = require('../utils/constants');

module.exports.getMovies = (req, res, next) => {
  const owner = req.user._id;
  Movie.find({ owner })
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_FILMS_MSG);
    })
    .then((movies) => {
      res.send(movies);
    })
    .catch(next);
};

module.exports.createMovie = (req, res, next) => {
  const {
    country, director, duration,
    year, description, image,
    trailer, nameRU, nameEN,
    thumbnail, movieId,
  } = req.body;
  const owner = req.user._id;

  Movie.create({
    country,
    director,
    duration,
    year,
    description,
    image,
    trailer,
    nameRU,
    nameEN,
    thumbnail,
    movieId,
    owner,
  })
    .then((movie) => res.send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new BadRequestError(BAD_REQUEST_MSG);
        next(error);
      } else {
        next(err);
      }
    });
};

module.exports.deleteMovie = (req, res, next) => {
  const owner = req.user._id;
  const { _id } = req.params;

  Movie.findById(_id)
    .orFail(new NotFoundError(NOT_FOUND_FILM_MSG))
    .then((movie) => {
      if (movie.owner.toString() === owner) {
        return Movie.deleteOne({ _id })
          .then(() => {
            res.send(SUCCESS_DELETE_FILM_MSG);
          })
          .catch(next);
      }
      throw new ForbiddenError(FORBIDDEN_FILM_MSG);
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        const error = new BadRequestError(BAD_REQUEST_MSG);
        next(error);
      }
      next(err);
    });
};
