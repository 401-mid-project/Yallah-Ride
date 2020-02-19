'use strict';


const users = require('./users.js');



module.exports = (req , res , next)=> {
    
  if(!req.headers.authorization){
    next('NaNi!! Authorization Data Missing!!');
    return ;
  }
  
  console.log('req.he.auth',req.headers.authorization);
  
  let token = req.headers.authorization.split(' ').pop();

  console.log('hhhhhhh', token);

  users.tokenValidator(token)
    .then(data => {
      console.log('after token validator mw',data);
      req.userName = data;
      next();
    }).catch(error => next(error));

};