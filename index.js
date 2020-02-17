'use strict';

const server = require('./src/lib/server.js');
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://localhost:27017/please' ;
const mongooseOption = {
  useNewUrlParser: true ,
  useCreateIndex: true ,
  useUnifiedTopology: true,
  useFindAndModify: true , 
};

mongoose.connect(MONGODB_URI , mongooseOption) ;

server.start();