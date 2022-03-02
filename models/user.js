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
    hashed_password : {
        type : String,
        required : true
    },
    salt : String,
    active: {
        type: Boolean,
        default: true
    },
    role : {
        type : String,
        default : 'staff'
    },
    resetPasswordLink : {
        data : String,
        default : ''
    }
}, {timestamps : true});


// virtual
userSchema.virtual('password')
.set(function(password){
    this._password = password;
    this.salt = this.makeSalt();
    this.hashed_password = this.encryptPassword(password)
})
.get(function() {
    return this._password;
})


// methods
userSchema.methods = {
    authenticate: function(plainText) {
        return this.encryptPassword(plainText) === this.hashed_password;
    },

    encryptPassword: function(password) {
        if(!password) return ''
        try {
            return crypto.createHmac('sha1', this.salt) // sha1 is a hashing algorithm
               .update(password)
               .digest('hex');
        } catch (err) {
            return ''
        }
    },

    makeSalt: function() {
        return Math.round((new Date().valueOf() * Math.random())) + '';
    }
}


module.exports = mongoose.model('User', userSchema);


// --------------------------------------------------
// -------------USER INFORMATION -----------------
// Name
// Email
// Password
// Role
// --------------------------------------------------
// --------------------------------------------------