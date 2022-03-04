const Patient = require('../models/patient');
const {getAge} = require('../helpers/number_helpers');
const {capitalize} = require('../helpers/letter_helpers');


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
    const {firstname, lastname, contact_no, address, email, facebook_id, date_of_birth, performed_lab_tests} = req.body;
    
    const lowercaseFirstname = firstname.toLowerCase();
    const lowercaseLastname = lastname.toLowerCase();
    const lowercaseAddress = address.toLowerCase();

    const newPatient = new Patient({
        firstname: capitalize(lowercaseFirstname),
        lastname: capitalize(lowercaseLastname),
        contact_no,
        age: getAge(date_of_birth),
        address: capitalize(lowercaseAddress),
        email,
        facebook_id,
        date_of_birth,
        performed_lab_tests
    });
    
    
    Patient.find({$and: [
        {firstname: capitalize(lowercaseFirstname)},
        {lastname: capitalize(lowercaseLastname)},
        {date_of_birth}
    ]}).exec((err, user) => {
        console.log(user);
        if (user.length !== 0) {
            return res.status(400).json({
                error: 'This patient already exists'
            });
        }
        newPatient.save((err, patient) => {
            if (err) {
                console.log(`Error in saving patient: ${err}`);
                return res.status(401).json({
                    success: false,
                    msg: 'Failed to add new patient.'
                });
            } else {
                console.log(`Patient added successfully: ${patient}`);
                res.json({
                    success: true,
                    msg: 'Patient added successfully!'
                });
            }
        });
    });
};

exports.getPatientById = async (req, res) => {
    try {
        console.log(`Getting patient by id: ${req.params.patientID}`);
        const patient = await Patient.findById(req.params.patientID);
        if(!patient) {
            return res.status(404).json({
                error: 'Patient not found!'
            });
        }
        return res.json({
            success: true,
            msg: `Patient data found successfully!`,
            data: patient,
        });
    } catch (err) {
        console.log(`Error getting patient by id`, err);
        res.status(500).json({
            error: err
        });
    }
}

exports.deletePatientById = async (req, res) => {
    try {
        console.log(`Deleting patient by id: ${req.params.patientID}`);
        const patient = await Patient.findByIdAndDelete(req.params.patientID);
        if(!patient) {
            return res.status(404).json({
                error: 'Patient not found!'
            });
        }
        return res.json({
            success: true,
            msg: `Patient data deleted successfully!`,
            data: patient,
        });
    } catch (err) {
        console.log(`Error deleting patient by id`, err);
        res.status(500).json({
            error: err
        });
    }
}

exports.updatePatientById = (req, res) => {
    const {firstname, lastname, contact_no, age, address, email, facebook_id, date_of_birth, performed_lab_tests} = req.body;
    Patient.findById(req.params.patientID).exec((err, patient) => {
        if (err || !patient) {
            console.log(`Error in finding patient by id: ${err}`);
            return res.status(400).json({
                success: false,
                msg: 'Failed to find patient.'
            });
        } 
        if (!firstname || !lastname || !date_of_birth) {
            return res.status(400).json({
                success: false,
                msg: 'Please enter all the fields.'
            });
        } else {
            patient.firstname = firstname;
            patient.lastname = lastname;
            patient.contact_no = contact_no;
            patient.age = getAge(date_of_birth);
            patient.address = address;
            patient.email = email;
            patient.facebook_id = facebook_id;
            patient.date_of_birth = date_of_birth;
            patient.performed_lab_tests = performed_lab_tests;
        }

        patient.save((err, updatedPatient) => {
            if (err) {
                console.log(`Error in updating patient: ${err}`);
                return res.status(400).json({
                    success: false,
                    msg: 'Failed to update patient.'
                });
            } else {
                console.log(`Patient updated successfully: ${updatedPatient}`);
                res.json({
                    success: true,
                    msg: 'Patient updated successfully!',
                    data: updatedPatient
                });
            }
        });

    });
}