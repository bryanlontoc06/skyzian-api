const express = require('express');
const router = express.Router();



// import controllers
const { signup, accountActivation, signin } = require('../controllers/auth');

// import validators from 'validator';
const { userSignupValidator, userSigninValidator } = require('../validators/auth');
const { runValidation } = require('../validators');


router.post('/user/signup', userSignupValidator, runValidation, signup)
router.post('/account-activation', accountActivation)
router.post('/user/signin', userSigninValidator, runValidation, signin)


module.exports = router;