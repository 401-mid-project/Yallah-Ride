'user strict';

const mongoose = require('mongoose');

const mainSchema = mongoose.Schema({
  info: {
    name: { type: String, required: true },
    firstName : { type: String, required: false },
    lastName : { type: String, required: false },
    gender: { type: String, required: false },
    smoker: { type: String, required: false},
    password: { type: String, required: true },
  },
  license:['admin'] ,
  messages:[] ,// in the search page ... { $addToSet: { <field1>: <value1>, ... } }
  rides: [],
  drives: [],
});

module.exports = mongoose.model('mainSchema', mainSchema);