const mongoose = require('mongoose');


const performed_lab_test = new mongoose.Schema({
    lab_test_name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        lowercase: true
    },
    lab_test_description: {
        type: String,
        maxlength: 500,
    },
    lab_test_result: {
        type: String,
    },
    lab_test_date: {
        type: Date,
    },
    lab_test_comment: {
        type: String,
        trim: true,
        maxlength: 500,
    },
    lab_test_price: {
        type: Number,
        trim: true,
        maxlength: 4
    }
});

const patientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        // lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        // lowercase: true
    },
    contact_no: {
        type: String,
        trim: true
    },
    age: {
        type: Number,
        trim: true,
        minlength: 2
    },
    address: {
        type: String,
        trim: true
    },
    email : {
        type : String,
        trim : true,
        lowercase : true
    },
    facebook_id : {
        type : String,
        trim : true
    },
    date_of_birth : {
        type : Date,
        required : true,
        trim : true
    },
    performed_lab_tests: [performed_lab_test],
}, {timestamps: true});


module.exports = mongoose.model('Patient', patientSchema);
// --------------------------------------------------
// -------------PATIENT INFORMATION -----------------
// Date
// Name
// Contact no
// Age
// Address
// Email
// Facebook
// Date of Birth
// Physician
// --------------------------------------------------
// --------------------------------------------------