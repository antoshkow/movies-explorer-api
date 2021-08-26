const rateLimit = require('express-rate-limit');
const { LIMIT } = require('../utils/config');

const limiter = rateLimit(LIMIT);

module.exports = limiter;
