'use strict';

// 3d party dependencies
const express = require('express');
const router = express.Router();
const app = express() ;
const user = require('../models/users.js');
const myAuth = require('../models/auth-middleware.js');


// sign up route that takes name and pass then save them at the DB .
router.post('/signup' , signUp);
function signUp(req , res){

  return user.save(req.body)
    .then(data => {
      console.log('after save **********', data);
      return user.tokenGenerator(data);
    })
    .then(data => {
      res.status(200).send(`Areose Kid !  ${data}`);
    });
}


// sign in route that takes name and pass and check if exist in DB through middleware myAuth()
// if exist it will generate a token for it and return it with the req object

router.post('/signin' , myAuth, signIn);
function signIn (req , res , next){
  app.set('userId', req.userId);
  console.log(req.userId, 'woooooooooooooorked');
  // router.get('/dashboard');
  res.redirect(303 ,'/dashboard?userId=' + req.userId);
  // next(res.redirect('/dashboard'));
}


// router to show all the DB objects (users)
router.get('/showall' , showMyUsers);

async function showMyUsers (req , res){
  let all = await user.showAll();
  console.log('in show router', all);
  res.status(200).json(all);
}


module.exports= router ;
