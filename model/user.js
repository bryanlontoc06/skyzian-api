const mongoose = require('mongoose');
const crypto = require('crypto');


// user Schema
const userSchema = new mongoose.Schema({
    name : {
        type : String,
        required : true,
        trim : true,
        maxlength : 32
    },
    email : {
        type : String,
        required : true,
        trim : true,
        unique : true,
        lowercase : true
    },
})



// --------------------------------------------------
// -------------USER INFORMATION -----------------
// Name
// Email
// Password
// Role
// --------------------------------------------------
// --------------------------------------------------



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