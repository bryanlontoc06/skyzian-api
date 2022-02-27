const Patient = require('../models/patient');

exports.read = (req, res) => {
    const patientId = req.params.patientId;
};

exports.addNewPatient = (req, res) => {

    const newPatient = new Patient({
        name: req.body.name,
        contact_no: req.body.contact_no,
        age: req.body.age,
        address: req.body.address,
        email: req.body.email,
        facebook_id: req.body.facebook_id,
        date_of_birth: req.body.date_of_birth,
        performed_tests: req.body.performed_tests
    });

    console.log(newPatient);

    // newPatient.save((err, patient) => {
    //     if (err) {
    //         res.json({
    //             success: false,
    //             msg: 'Failed to add new patient'
    //         });
    //     } else {
    //         res.json({
    //             success: true,
    //             msg: 'Patient added successfully'
    //         });
    //     }
    // });
    
};