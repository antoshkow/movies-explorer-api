const mongoose = require('mongoose');
const validator = require('validator');
const bcrypt = require('bcryptjs');
const UnauthorizedError = require('../errors/UnauthorizedError');
const {
  LOGIN_USER_SCHEMA_MSG,
  EMAIL_USER_SCHEMA_MSG,
} = require('../utils/constants');

const userSchema = new mongoose.Schema({
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (email) => validator.isEmail(email),
    },
  },
  password: {
    type: String,
    required: true,
    minLength: 5,
    select: false,
  },
  name: {
    type: String,
    minlength: 2,
    maxlength: 30,
    required: true,
  },
});

userSchema.statics.findUserByCredentials = function (email, password) {
  return this.findOne({ email })
    .select('+password')
    .then((user) => {
      if (!user) {
        throw new UnauthorizedError(LOGIN_USER_SCHEMA_MSG);
      }
      return bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new UnauthorizedError(EMAIL_USER_SCHEMA_MSG);
          }
          return user;
        });
    });
};

module.exports = mongoose.model('user', userSchema);
