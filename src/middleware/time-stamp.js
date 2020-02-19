'use strict';

// adding time stamp for each request

module.exports = 
function timeStamp(req, res , next){
  let newTime = new Date();
  let requestTime = newTime.toUTCString();
  req.requestTime = requestTime ;
  next();
};
