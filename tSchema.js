const mongoose = require('mongoose');

const tSchema = new mongoose.Schema({
  //Multi-factorial memory Questionnaire
  MFM_ans: {
    type: [Number]
    //required: [true, 'Need mem answers']
  },
  //Digit Span test
  start: {
    type: Date
    //required: [true, 'Need start']
  },
  end: {
    type: Date
    //required: [true, 'Need end']
  },
  lastDS: {
    type: Number
    //required: [true, 'Need last digit span']
  },
  longDS: {
    type: Number
    //required: [true, 'Need longest digit span']
  },
  TEST_ans: {
    type: [Boolean]
    //required: [true, 'Need test answers']
  },
  //Metacognition questions (one in middle one at end)
  MC_ans: {
    type: [Number],
    required: [true, 'Need metacog answers']
  },
  //completion status
  complete: {
    type: Boolean,
    required: [true, 'Need completion status']
  }
});
module.exports = mongoose.model('testCollection', tSchema);