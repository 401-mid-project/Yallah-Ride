'use strict';


// console.log data from request object for each request 
module.exports = function logger(req, res, next) {
  console.log('request path:', req.path, ' method:' , req.method, ' request time:' , req.requestTime);
  next();
};
