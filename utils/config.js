const {
  PORT = 3000, NODE_ENV, JWT_SECRET, DB,
} = process.env;

const JWT_MODE = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const DB_MODE = NODE_ENV === 'production' ? DB : 'mongodb://localhost:27017/moviesdb';

const LIMIT = {
  windowMs: 15 * 60 * 1000,
  max: 100,
};

const ALLOWED_CORS = process.env.ALLOWED_CORS ? process.env.ALLOWED_CORS.split(',') : [
  'http://localhost:3000',
  'http://localhost:5000',
  'https://api.antoshkow.movies-exp.nomoredomains.monster',
  'http://api.antoshkow.movies-exp.nomoredomains.monster',
  'https://antoshkow.movies-explorer.nomoredomains.monster',
  'http://antoshkow.movies-explorer.nomoredomains.monster',
];

const DEFAULT_ALLOWED_METHODS = 'GET, HEAD, PUT, PATCH, POST, DELETE, OPTIONS';

module.exports = {
  PORT, JWT_MODE, DB_MODE, LIMIT, ALLOWED_CORS, DEFAULT_ALLOWED_METHODS,
};
