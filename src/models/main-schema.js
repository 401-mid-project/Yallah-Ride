'user strict';

const mongoose = require('mongoose');

const mainSchema = mongoose.Schema({
  info: {
    name: { type: String, required: true },
    gender: { type: String, required: false },
    smoker: { type: Boolean, required: false},
    password: { type: String, required: true },
  },
  license:['admin'] ,
    
  rider: {
    time:{type: String, required: false},
    cost: {type: Number, required: false},
    dest: {
      city: {type: String, required: false},
      street: {type: String, required: false},
    },
  },

  driver: {
    time: {type: String, required: false},
    cost: {type: Number, required: false},
    dest: {
      city: {type: String, required: false},
      street: {type: String, required: false},
    },
    car_type: { type: String, required: false},
    seats: { type: Number, required: false},
  },


});

module.exports = mongoose.model('mainSchema', mainSchema);