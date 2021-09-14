const router = require('express').Router();
const NotFoundError = require('../errors/NotFoundError');

router.use('*', (req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

module.exports = router;
