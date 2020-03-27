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
  pendingMessages:[],
  askMessages:[] ,// in the search page ... { $addToSet: { <field1>: <value1>, ... } }
  offerMessages:[],
  rides: [],
  drives: [],
});

module.exports = mongoose.model('mainSchema', mainSchema);