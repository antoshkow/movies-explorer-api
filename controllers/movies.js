const Movie = require('../models/movie');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ForbiddenError = require('../errors/ForbiddenError');

module.exports.getMovies = (req, res, next) => {
  Movie.find({})
    .orFail(() => {
      throw new NotFoundError('Фильмы не найдены');
    })
    .then((movies) => {
      res.status(200).send(movies);
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
    .then((movie) => res.status(200).send(movie))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        const error = new BadRequestError('Переданы некорректные данные');
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
    .then((movie) => {
      if (movie.owner.toString() === owner) {
        Movie.deleteOne({ _id })
          .then(() => {
            res.status(200).send({ message: 'Фильм успешно удален!' });
          });
      } else {
        const error = new ForbiddenError('Нельзя удалить чужой фильм!');
        next(error);
      }
    })
    .catch((err) => {
      if (err) {
        const error = new NotFoundError('Фильм с указанным id не найден');
        next(error);
      } else {
        next(err);
      }
    });
};
