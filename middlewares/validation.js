const { Joi, celebrate } = require('celebrate');
const validator = require('validator');
const {
  VALIDATOR_INVALID_URL_MSG,
  JOI_INVALID_ID_MSG,
  JOI_NAME_MSG,
  JOI_REQUIRED_MSG,
  JOI_PASSWORD_MSG,
  JOI_NAME_SIGN_MSG,
} = require('../utils/constants');

const urlValidator = (value) => {
  if (validator.isURL(value)) {
    return value;
  }
  throw new Error(VALIDATOR_INVALID_URL_MSG);
};

const paramsValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24)
      .message(JOI_INVALID_ID_MSG),
  }),
});

const moviesValidation = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().custom(urlValidator),
    trailer: Joi.string().required().custom(urlValidator),
    thumbnail: Joi.string().required().custom(urlValidator),
    movieId: Joi.number().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const userValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string().required().min(2).max(30)
      .messages(JOI_NAME_MSG),
    email: Joi.string().required().email()
      .messages(JOI_REQUIRED_MSG),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages(JOI_REQUIRED_MSG),
    password: Joi.string().required().min(5)
      .messages(JOI_PASSWORD_MSG),
    name: Joi.string().required().min(2).max(30)
      .messages(JOI_NAME_SIGN_MSG),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email()
      .messages(JOI_REQUIRED_MSG),
    password: Joi.string().required().min(5)
      .messages(JOI_PASSWORD_MSG),
  }),
});

module.exports = {
  paramsValidation,
  moviesValidation,
  userValidation,
  signupValidation,
  signinValidation,
};
