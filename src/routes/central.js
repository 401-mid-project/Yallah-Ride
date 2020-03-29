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


// add to rides array
router.put('/search/ask', bearerAuth , addAsk) ;

async function addAsk(req , res , next){
  let id = req.userName._id;
  let data = req.body ;
  console.log('*********ask form*********', data);
  let updated = await Model.addAsk(id , data);
  res.status(201).send(updated);
}

// request Offer message
router.put('/search/requestOffer', bearerAuth , requestOffer) ;

async function requestOffer(req , res ){

  let message = req.body;
  let id = message.userId;

  await Model.addPendingMessages(req.userName._id , message);

  message.userId = req.userName._id;
  message.userName = req.userName.info.name;
  console.log('bearer attach' , req.userName);

  await Model.addOfferMessage(id , message);

  res.status(201).send('Done!');
}


// the user response for the ask request
router.put('/offerResponse', bearerAuth , offerResponse) ;

async function offerResponse(req , res){

  let data = req.body ;
  let requestedId = req.userName._id;
  console.log('Offer response route' , data);

  if(data.action === 'accept'){
    await Model.updatePendingMessagesOffer( data.offerId , 'accept');
    await Model.updateOfferBookedState(data.offerId , 'true');
    await Model.updateDrivesBookedState(data.offerId ,'true');
  }else{
    await Model.updatePendingMessagesOffer( data.offerId , 'decline');
    let test = await Model.deleteOfferMessage(requestedId , data.offerId);
    console.log('test', test);
  }

  res.status(201).send('Done!');
}


/////////////////
// request Ask message
router.put('/search/requestAsk', bearerAuth , requestAsk) ;

async function requestAsk(req , res , next){

  let message = req.body;
  let id = message.userId;

  await Model.addPendingMessages(req.userName._id , message);

  message.userId = req.userName._id;
  message.userName = req.userName.info.name;
  console.log('bearer attach' , req.userName);

  await Model.addAskMessage(id , message);

  res.status(201).send('Done!');
}


// the user response for the ask request
router.put('/askResponse', bearerAuth , askResponse) ;

async function askResponse(req , res){

  let data = req.body ;
  let requestedId = req.userName._id;
  console.log('ask response route' , data);

  if(data.action === 'accept'){
    await Model.updatePendingMessages( data.askId , 'accept');
    await Model.updateAskBookedState(data.askId , 'true');
    await Model.updateRidesBookedState(data.askId ,'true');
  }else{
    await Model.updatePendingMessages( data.askId , 'decline');
    let test = await Model.deleteAskMessage(requestedId , data.askId);
    console.log('test', test);
  }

  res.status(201).send('Done!');
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