const mongoose = require('mongoose');


const patientSchema = new mongoose.Schema({
    firstname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        lowercase: true
    },
    lastname: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32,
        lowercase: true
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
    performed_tests: [{
        type: mongoose.Schema.Types.ObjectId,
        ref: 'Test',
        date: {
            type: Date,
            default: Date.now
        }
    }],
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