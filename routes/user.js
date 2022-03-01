const express = require('express');
const router = express.Router();

// import controllers
const { signup } = require('../controllers/auth');


router.post('/user/signup', signup)



module.exports = router;