const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const NotFoundError = require('../errors/NotFoundError');
const BadRequestError = require('../errors/BadRequestError');
const ConflictError = require('../errors/ConflictError');
const {
  NOT_FOUND_USER_MSG,
  BAD_REQUEST_MSG,
  CONFLICT_UPDATE_USER_MSG,
  CONFLICT_CREATE_USER_MSG,
} = require('../utils/constants');
const { JWT_MODE } = require('../utils/config');

module.exports.getCurrentUser = (req, res, next) => {
  User.findById(req.user._id)
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_USER_MSG);
    })
    .then((user) => {
      res.send(user);
    })
    .catch(next);
};

module.exports.updateUser = (req, res, next) => {
  const { email, name } = req.body;

  User.findByIdAndUpdate(req.user._id, { email, name }, {
    new: true,
    runValidators: true,
  })
    .orFail(() => {
      throw new NotFoundError(NOT_FOUND_USER_MSG);
    })
    .then((user) => {
      res.send(user);
    })
    .catch((err) => {
      if (err.name === 'ValidationError' || err.name === 'CastError') {
        const error = new BadRequestError(BAD_REQUEST_MSG);
        next(error);
      } else if (err.codeName === 'DuplicateKey') {
        const error = new ConflictError(CONFLICT_UPDATE_USER_MSG);
        next(error);
      } else {
        next(err);
      }
    });
};

module.exports.createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;

  User.findOne({ email })
    .then((user) => {
      if (user) {
        const error = new ConflictError(CONFLICT_CREATE_USER_MSG);
        next(error);
      }
      return bcrypt.hash(password, 10);
    })
    .then((hash) => User.create({
      name,
      email,
      password: hash,
    })
      .then((user) => res.send({
        name: user.name,
        email: user.email,
      }))
      .catch((err) => {
        if (err.name === 'ValidationError') {
          const error = new BadRequestError(BAD_REQUEST_MSG);
          next(error);
        } else {
          next(err);
        }
      }))
    .catch(next);
};

module.exports.login = (req, res, next) => {
  const { email, password } = req.body;

  User.findUserByCredentials(email, password)
    .then((user) => {
      const token = jwt.sign(
        { _id: user._id },
        JWT_MODE,
        { expiresIn: '7d' },
      );

      res.cookie('jwt', token, {
        maxAge: 3600000,
        httpOnly: true,
        sameSite: true,
      });

      res.send({ token });
    })
    .catch(next);
};

module.exports.logout = (req, res, next) => {
  res.clearCookie('jwt', {
    maxAge: 3600000,
    httpOnly: true,
    sameSite: true,
  });

  res.status(202).send({ message: 'Куки успешно удалены' })
    .catch(next);
};
