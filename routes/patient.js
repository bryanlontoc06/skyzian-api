const express = require('express');
const router = express.Router();



// import controllers
const { read, addNewPatient } = require('../controllers/patient');



router.get('/patients', read)
router.post('/patient/new', addNewPatient)



module.exports = router;