const NOT_FOUND_FILMS_MSG = 'Фильмы не найдены';
const NOT_FOUND_FILM_MSG = 'Фильм с указанным id не найден';
const FORBIDDEN_FILM_MSG = 'Нельзя удалить чужой фильм!';
const SUCCESS_DELETE_FILM_MSG = { message: 'Фильм успешно удален!' };

const NOT_FOUND_USER_MSG = 'Запрашиваемый пользователь не найден';
const CONFLICT_UPDATE_USER_MSG = 'Вы пытаетесь обновить чужой профиль!';
const CONFLICT_CREATE_USER_MSG = 'Пользователь уже существует';

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
};
