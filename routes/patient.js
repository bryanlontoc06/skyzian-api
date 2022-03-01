const express = require('express');
const router = express.Router();



// import controllers
const { getPatients, addNewPatient } = require('../controllers/patient');



router.get('/patients', getPatients)
router.post('/patient/new', addNewPatient)



module.exports = router;