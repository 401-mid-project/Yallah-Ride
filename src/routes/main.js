'use strict';

// 3d party dependencies
const express = require('express');
const router = express.Router();
// const app = express() ;
const user = require('../models/users.js');
const myAuth = require('../models/auth-middleware.js');
const bearerAuth = require('../models/bearer-Auth.js');


// sign up route that takes name and pass then save them at the DB .
router.post('/signup' , signUp);
function signUp(req , res){


  console.log('received', req.body);
  return user.save(req.body)
    .then(data => {
      if(!data) return {};

      console.log('after save **********', data);
      return user.tokenGeneratorSignUp(data);
    })
    .then(data => {
      res.status(200).send(data);
    });
}


// sign in route that takes name and pass and check if exist in DB through middleware myAuth()
// if exist it will generate a token for it and return it with the req object

router.post('/signin' , myAuth, signIn);
function signIn (req , res , next){

  console.log(req.userId, 'woooooooooooooorked');
  // res.redirect(303 ,'/dashboard?userId=' + req.userId);
  let data = {'token':req.token , 'id':req.userId};

  res.send(data);
}


// router to show all the DB objects (users)
router.get('/showall' , showMyUsers);

async function showMyUsers (req , res){
  let all = await user.showAll();
  // console.log('in show router', all);
  res.status(200).json(all);
}


// to get the rides and drives
router.get('/render' , bearerAuth , renderAll);

async function renderAll (req , res){
  let all = await user.showAll();
  // console.log('in show router', all);
  let rides = [] ;
  let drives = [] ;

  all.map(val => {
    val.rides.map(val =>{
      rides.push(val);
    });

    val.drives.map(val => {
      drives.push(val);
    });
  });

  let data = {'rides': rides , 'drives': drives};

  res.status(200).json(data);
}



module.exports= router ;
