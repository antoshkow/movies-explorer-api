const { Joi, celebrate } = require('celebrate');
const validator = require('validator');

const emailValidator = (value) => {
  if (validator.isEmail(value)) {
    return value;
  }
  throw new Error('Невалидный email');
};

const urlValidator = (value) => {
  if (validator.isUrl(value)) {
    return value;
  }
  throw new Error('Невалидный url');
};

const paramsValidation = celebrate({
  params: Joi.object().keys({
    _id: Joi.string().required().hex().length(24)
      .message('Невалидный id'),
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
      .messages({
        'string.min': 'Имя должно быть не менее 2 символов',
        'string.max': 'Имя должно быть не более 30 символов',
      }),
    email: Joi.string().required().email().custom(emailValidator),
  }),
});

const signupValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().custom(emailValidator)
      .messages({
        'any.required': 'Обязательное поле',
      }),
    password: Joi.string().required().min(5).messages({
      'string.min': 'Пароль должен состоять как минимум из 5 символов',
      'any.required': 'Обязательное поле',
    }),
    name: Joi.string().required().min(2).max(30)
      .messages({
        'any.required': 'Обязательное поле',
        'string.min': 'Имя должно быть не менее 2 символов',
        'string.max': 'Имя должно быть не более 30 символов',
      }),
  }),
});

const signinValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email().custom(emailValidator)
      .messages({
        'any.required': 'Обязательное поле',
      }),
    password: Joi.string().required().min(5).messages({
      'string.min': 'Пароль должен состоять как минимум из 5 символов',
      'any.required': 'Обязательное поле',
    }),
  }),
});

module.exports = {
  paramsValidation,
  moviesValidation,
  userValidation,
  signupValidation,
  signinValidation,
};
