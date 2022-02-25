const mongoose = require('mongoose');


const patientSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true,
        trim: true,
        maxlength: 32
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true,
        lowercase: true
    },
    contact_number: {
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
        trim: true,
        required: true
    }
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