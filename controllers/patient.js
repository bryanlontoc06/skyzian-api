const Patient = require('../models/patient');

exports.getPatients = async (req, res) => {
    try {
        const patients = await Patient.find();
        res.json(patients);
    } catch (err) {
        console.log(`Error getting patients`, err);
        res.status(500).json({
            error: err
        });
    }
};


exports.addNewPatient = (req, res) => {

    const newPatient = new Patient({
        firstname: req.body.firstname,
        lastname: req.body.lastname,
        contact_no: req.body.contact_no,
        age: req.body.age,
        address: req.body.address,
        email: req.body.email,
        facebook_id: req.body.facebook_id,
        date_of_birth: req.body.date_of_birth,
        performed_tests: req.body.performed_tests
    });

    console.log(newPatient);

    newPatient.save((err, patient) => {
        if (err) {
            console.log(`Error in saving patient: ${err}`);
            return res.status(401).json({
                success: false,
                msg: 'Failed to add new patient'
            });
        } else {
            console.log(`Patient added successfully: ${patient}`);
            res.json({
                success: true,
                msg: 'Patient added successfully'
            });
        }
    });
};