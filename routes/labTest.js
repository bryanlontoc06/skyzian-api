const express = require('express');
const router = express.Router();

// import validators from 'validator';
const { labTestValidator } = require('../validators/labTest');
const { runValidation } = require('../validators');


// import controllers
const { getLabTests, addNewLabTest, getLabTestById, deleteLabTestById, updateLabTestById } = require('../controllers/labTest');


router.get('/laboratory-tests', getLabTests);
router.post('/laboratory-test/new', labTestValidator, runValidation, addNewLabTest);
router.get('/laboratory-test/:labTestID', getLabTestById);
router.delete('/laboratory-test/:labTestID', deleteLabTestById);
router.put('/laboratory-test/:labTestID', labTestValidator, runValidation, updateLabTestById);


module.exports = router;