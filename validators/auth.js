const { body } = require('express-validator');


exports.userSignupValidator = [
    body('name')
        .not()
        .isEmpty()
        .withMessage('Name is required'),
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
];


exports.userSigninValidator = [
    body('email')
        .isEmail()
        .withMessage('Email must be valid'),
    body('password')
        .isLength({min: 6})
        .withMessage('Password must be at least 6 characters long')
];