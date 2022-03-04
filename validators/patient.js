const { body } = require('express-validator');


exports.patientValidator = [
    body('firstname')
        .not()
        .isEmpty()
        .withMessage('Firstname is required'),
    body('lastname')
        .not()
        .isEmpty()
        .withMessage('Lastname is required'),
    body('date_of_birth')
        .not()
        .isEmpty()
        .withMessage('Date of birth is required')
];