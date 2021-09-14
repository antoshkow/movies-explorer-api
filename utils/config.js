const {
  PORT = 3000, NODE_ENV, JWT_SECRET, DB,
} = process.env;

const JWT_MODE = NODE_ENV === 'production' ? JWT_SECRET : 'dev-secret';

const DB_MODE = NODE_ENV === 'production' ? DB : 'mongodb://localhost:27017/moviesdb';

const LIMIT = {
  windowMs: 15 * 60 * 1000,
  max: 100,
};

module.exports = {
  PORT, JWT_MODE, DB_MODE, LIMIT,
};
