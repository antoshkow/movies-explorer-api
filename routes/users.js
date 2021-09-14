const router = require('express').Router();
const { userValidation } = require('../middlewares/validation');

const {
  getCurrentUser, updateUser,
} = require('../controllers/users');

router.get('/users/me', getCurrentUser);

router.patch(
  '/users/me',
  userValidation,
  updateUser,
);

module.exports = router;
