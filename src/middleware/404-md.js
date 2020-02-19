'use strict';


// middleware 404 error function
module.exports = function notFoundHandler(req , res , next){
  res.status(404);
  res.statusMessage = 'Page requested Not Found (404)';
  res.json({error : 'Page NOT FOUND !!!'});
};
  