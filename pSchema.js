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
  dob: {
    type: Date,
    required: [true, 'Need date of birth']
  },
  sex: {
    type: String,
    enum: ['Female', 'Male', 'Other'],
    required: [true, 'Need sex']
  },
  gen: {
    type: String,
    enum: ['Woman', 'Man', 'Other'],
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
    enum: ['Schizophrenia', 'Schizoaffective', 'Psychosis Not Otherwise Specified', 'Delusional Disorder', 'Mood Disorder', 'Mood Disorder with Psychosis'],
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