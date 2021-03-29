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
        enum: ['Fimon Fraser University', 'GcGill University', 'University of Roronto']
    },
    empID: {
        type: Number
    },
    posn: {
        type: String,
        enum: ['Doctor', 'Nurse', 'Student']
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