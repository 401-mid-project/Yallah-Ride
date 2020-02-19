'use strict';


module.exports = (license => {

  return (req , res , next) => {

    try{
      if(!req.userName){
        res.send('User Info Not Exist !!!');
        next();
        console.log('after next ??');
        return;

      }
      let userLicense = req.userName.license ;
        
      if(userLicense){
        
        if(userLicense.includes(license)){
          next();
          console.log('after next ??');
          return;
        }else{
          next('SORRY !! You Are Not Invited !!');
        }
      }else{
        next('userLicense is  not defined , you need to log in first and pass bearer Auth');
        return ;
      }

    }catch(err){
      next(err);
      return;
    }

  };
});
