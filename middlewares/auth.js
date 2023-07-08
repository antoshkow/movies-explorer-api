const jwt = require('jsonwebtoken');
const UnauthorizedError = require('../errors/UnauthorizedError');
const { JWT_MODE } = require('../utils/config');

module.exports = (req, res, next) => {
  // const { jwt: token } = req.cookies;

  // if (!token) {
  //   throw new UnauthorizedError('Необходима авторизация');
  // }

  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  const bearerToken = authorization.replace('Bearer ', '');

  let payload;

  try {
    // payload = jwt.verify(token, JWT_MODE);
    payload = jwt.verify(bearerToken, JWT_MODE);
  } catch (err) {
    throw new UnauthorizedError('Необходима авторизация');
  }

  req.user = payload;

  next();
};
