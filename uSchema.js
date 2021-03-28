const mongoose = require('mongoose');

const uSchema = new mongoose.Schema({
    fname: {
        type: String    
    },
    lname: {
        type: String    
    },
    instn: {
        type: String,
        enum: ['ffu', 'gg', 'uor']
    },
    empID: {
        type: Number
    },
    posn: {
        type: String,
        enum: ['doc', 'nurse', 'student']
    },
    phn: {
        type: String
    },
    email: {
        type: String,
        required: [true, 'Need email']
    },
    pass: {
        type: String,
        required: [true, 'Need pass']
    }
});
module.exports = mongoose.model('userCollection', uSchema);