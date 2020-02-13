'use strict';


const schema = require('./main-schema.js');
const Mongo = require('./mongo.js');

class Main extends Mongo{
  constructor(){
    super(schema);
  }
}

module.exports = new Main();