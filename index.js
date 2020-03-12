'use strict';

const server = require('./src/lib/server.js');
const mongoose = require('mongoose');

const MONGODB_URI = 'mongodb://admin:1994abdo@ds059634.mlab.com:59634/heroku_svj5r4zs' ;

// const MONGODB_URI = 'mongodb://ds059634.mlab.com:59634/heroku_svj5r4zs' ;
// const MONGODB_URI = 'mongodb://localhost:27017/database' ;

const mongooseOption = {
  useNewUrlParser: true ,
  useCreateIndex: true ,
  useUnifiedTopology: true,
  useFindAndModify: true , 
};

mongoose.connect(MONGODB_URI , mongooseOption) ;

server.start();