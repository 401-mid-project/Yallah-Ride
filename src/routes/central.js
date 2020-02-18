'use strict';

const express = require('express');
const router = express.Router() ;
const Model = require('../models/main-model.js');


router.get('/dashboard' , dashboard) ;

async function dashboard(req ,res ,next){
    
  console.log(req.query.userId , '*********');

  let scanResult = await Model.getById(req.query.userId);
  console.log(scanResult , 'dashboard');
  res.status(200).send(`${scanResult} *************************************************` );
}


router.get('/pickups' , getAllPickUps);

async function getAllPickUps(req , res ){
  let data = await Model.get();
  res.status(200).send(data);
}


router.get('/passengers' , getAllPassengers);

async function getAllPassengers(req , res ){
  let data = await Model.get();
  res.status(200).send(data);
}


// router.get('/testpage', (req, res) =>{
//   res.redirect('/testPage.html');
// });


module.exports = router ;