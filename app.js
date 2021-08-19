require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');
const helmet = require('helmet');
const { errors } = require('celebrate');
const rateLimit = require('express-rate-limit');
const cookieParser = require('cookie-parser');

const { createUser, login, logout } = require('./controllers/users');
const router = require('./routes/router');
const auth = require('./middlewares/auth');
const errorHandler = require('./middlewares/errorHandler');
const { signinValidation, signupValidation } = require('./middlewares/validation');
const { requestLogger, errorLogger } = require('./middlewares/logger');
const NotFoundError = require('./errors/NotFoundError');

const app = express();

const { PORT = 3000 } = process.env;

const limiter = rateLimit({
  windowMs: 15 * 60 * 1000,
  max: 100,
});

mongoose.connect('mongodb://localhost:27017/bitfilmsdb', {
  useNewUrlParser: true,
  useCreateIndex: true,
  useFindAndModify: false,
  useUnifiedTopology: true,
});

app.use(helmet());
app.use(limiter);
app.use(cookieParser());
app.use(express.urlencoded({ extended: true }));
app.use(express.json());

app.use(requestLogger);

app.use(cors());

// Роуты, не требующие авторизации
app.post(
  '/signin',
  signinValidation,
  login,
);

app.post(
  '/signup',
  signupValidation,
  createUser,
);

app.post(
  '/signout',
  logout,
);

// Роуты, требующие авторизации
app.use('/', auth, router);

app.use((req, res, next) => {
  next(new NotFoundError('Страницы не существует'));
});

// Обработка ошибок
app.use(errorLogger);

app.use(errors());

app.use(errorHandler);

app.listen(PORT, () => {
  console.log(`App listening on port ${PORT}`);
});
