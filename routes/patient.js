const express = require('express');
const router = express.Router();



// import controllers
const { getPatients, addNewPatient, getPatientById, deletePatientById, updatePatientById } = require('../controllers/patient');

// import validators from 'validator';
const { patientValidator } = require('../validators/patient');
const { runValidation } = require('../validators');



router.get('/patients', getPatients)
router.post('/patient/new', patientValidator, runValidation, addNewPatient)
router.get('/patient/:patientID', getPatientById)
router.delete('/patient/:patientID', deletePatientById)
router.put('/patient/:patientID', patientValidator, runValidation, updatePatientById)



module.exports = router;