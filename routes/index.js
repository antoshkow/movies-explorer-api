const router = require('express').Router();
const authRouter = require('./auth');
const usersRouter = require('./users');
const moviesRouter = require('./movies');
const errorRouter = require('./error');
const auth = require('../middlewares/auth');

router.use(authRouter);

router.use('/', auth, usersRouter);
router.use('/', auth, moviesRouter);

router.use(errorRouter);

module.exports = router;
