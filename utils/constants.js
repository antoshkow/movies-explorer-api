const NOT_FOUND_FILMS_MSG = 'Фильмы не найдены';
const NOT_FOUND_FILM_MSG = 'Фильм с указанным id не найден';
const FORBIDDEN_FILM_MSG = 'Нельзя удалить чужой фильм!';
const SUCCESS_DELETE_FILM_MSG = { message: 'Фильм успешно удален!' };

const NOT_FOUND_USER_MSG = 'Запрашиваемый пользователь не найден';
const CONFLICT_UPDATE_USER_MSG = 'Вы пытаетесь обновить чужой профиль!';
const CONFLICT_CREATE_USER_MSG = 'Пользователь уже существует';

const LOGIN_USER_SCHEMA_MSG = 'Логин или пароль не верны';
const EMAIL_USER_SCHEMA_MSG = 'Неправильная почта или пароль';

const VALIDATOR_INVALID_URL_MSG = 'Невалидный url';

const JOI_INVALID_ID_MSG = 'Невалидный id';
const JOI_NAME_MSG = {
  'string.min': 'Имя должно быть не менее 2 символов',
  'string.max': 'Имя должно быть не более 30 символов',
};
const JOI_REQUIRED_MSG = {
  'any.required': 'Обязательное поле',
};
const JOI_PASSWORD_MSG = {
  'string.min': 'Пароль должен состоять как минимум из 5 символов',
  'any.required': 'Обязательное поле',
};
const JOI_NAME_SIGN_MSG = {
  'string.min': 'Имя должно быть не менее 2 символов',
  'string.max': 'Имя должно быть не более 30 символов',
  'any.required': 'Обязательное поле',
};

const BAD_REQUEST_MSG = 'Переданы некорректные данные';

module.exports = {
  BAD_REQUEST_MSG,
  NOT_FOUND_FILMS_MSG,
  NOT_FOUND_FILM_MSG,
  FORBIDDEN_FILM_MSG,
  SUCCESS_DELETE_FILM_MSG,
  NOT_FOUND_USER_MSG,
  CONFLICT_UPDATE_USER_MSG,
  CONFLICT_CREATE_USER_MSG,
  LOGIN_USER_SCHEMA_MSG,
  EMAIL_USER_SCHEMA_MSG,
  VALIDATOR_INVALID_URL_MSG,
  JOI_INVALID_ID_MSG,
  JOI_NAME_MSG,
  JOI_REQUIRED_MSG,
  JOI_PASSWORD_MSG,
  JOI_NAME_SIGN_MSG,
};
