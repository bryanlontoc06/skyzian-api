const mongoose = require('mongoose');


const labTestSchema = new mongoose.Schema({
    name: {
        type: String,
        required: true
    },
    description: {
        type: String,
        maxlength: 500,
    },
    price: {
        type: Number,
    }
}, {timestamps: true});


module.exports = mongoose.model('LabTest', labTestSchema);