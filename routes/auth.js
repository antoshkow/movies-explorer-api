const router = require('express').Router();
const { signinValidation, signupValidation } = require('../middlewares/validation');

const { login, createUser, logout } = require('../controllers/users');

router.post(
  '/signin',
  signinValidation,
  login,
);

router.post(
  '/signup',
  signupValidation,
  createUser,
);

router.post(
  '/signout',
  logout,
);

module.exports = router;
