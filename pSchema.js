const mongoose = require('mongoose');

const pSchema = new mongoose.Schema({
  fname: {
    type: String,
    required: [true, 'Need name']
  },
  lname: {
    type: String,
    required: [true, 'Need name']
  },
  uID: {
    type: String,
    required: [true, 'Need user ID']
  },
  age: {
    type: Number,
    required: [true, 'Need age']
  },
  dob: {
    type: Date,
    required: [true, 'Need date of birth']
  },
  sex: {
    type: String,
    enum: ['female', 'male', 'other'],
    required: [true, 'Need sex']
  },
  gen: {
    type: String,
    enum: ['woman', 'man', 'other'],
    required: [true, 'Need gender']
  },
  edu: {
    type: Number,
    required: [true, 'Need education']
  },
  esl: {
    type: Boolean,
    required: [true, 'Need esl']
  },
  langv: {
    type: Boolean,
    required: [true, 'Need language validity']
  },
  diag: {
    type: String,
    enum: ['sch', 'sche', 'pnos', 'dd', 'md', 'mdwp'],
    required: [true, 'Need diagnosis']
  },
  meds: {
    type: Boolean,
    required: [true, 'Need meds']
  },
  notes: {
    type: String
  }
});
module.exports = mongoose.model('patientCollection', pSchema);