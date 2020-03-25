'use strict';

const express = require('express');
const router = express.Router() ;
const Model = require('../models/main-model.js');
const bearerAuth = require('../models/bearer-Auth.js');
const acl = require('../models/ACL-middleware.js');

router.get('/dashboard' ,bearerAuth , dashboard) ;

async function dashboard(req ,res ,next){
  // console.log(req.userName._id , '************************');
  // console.log('^^^^^^^^^^^^^^^^^^^^^^^^^^', req.query.userId);
  let scanResult = await Model.getById(req.userName._id);
  console.log('dashboard' ,scanResult[0] ,  typeof scanResult[0]);
  res.status(200).send(scanResult[0]);
}



router.put('/dashboard/update', bearerAuth , updateDashboard) ;

async function updateDashboard(req , res , next){

  let id = req.userName._id;
  let data = req.body ;
  // console.log('dashboard update******************************' ,id , data);
  let updated = await Model.update(id , data);
  res.status(201).send(updated);
}


// add to drive array
router.put('/search/offer', bearerAuth , addOffer) ;

async function addOffer(req , res , next){

  let id = req.userName._id;
  let data = req.body ;
  console.log('*********offer form*********', data);
  let updated = await Model.addOffer(id , data);
  res.status(201).send(updated);
}






router.delete('/dashboard/delete' ,bearerAuth , deleteDashboard) ;

async function deleteDashboard(req , res , next){
  let id = req.userName._id;
  await Model.delete(id);
  res.status(201).send('Deleted !!!');
}


router.get('/pickups' , bearerAuth , getAllPickUps);

async function getAllPickUps(req , res ){
  let data = await Model.get();
  res.status(200).send(data);
}


router.get('/passengers' , bearerAuth , getAllPassengers);

async function getAllPassengers(req , res ){
  let data = await Model.get();
  res.status(200).send(data);
}



//// =========> (ACL) <========== \\\\
router.delete('/pickups/delete' , bearerAuth , acl('admin'), deletePickUps);

async function deletePickUps(req , res ){
  let data = await Model.delete(req._id);
  res.status(200).send(data);
}


router.delete('/passengers/delete' , bearerAuth , acl('admin') , deletePassengers);

async function deletePassengers(req , res ){
  let data = await Model.delete(req._id);
  res.status(200).send(data);
}





module.exports = router ;