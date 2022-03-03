const {body} = require('express-validator');

exports.labTestValidator = [
    body('name').isString().isLength({min: 3}).withMessage('Name must be at least 3 characters long')
];