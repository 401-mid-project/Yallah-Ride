'use strict';


// middleware 500 error function
module.exports = function errorHandler(err , req , res , next){
  res.status(500);
  res.statusMessage = 'OBJECT DESTROYED ! (500)';
  res.json({error : err});
};
  