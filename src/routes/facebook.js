'use strict';

const express = require('express');
const fetch = require('node-fetch');
const router = express.Router();
const users = require('../models/users.js');

router.post('/login-with-facebook', async (req, res)=>{

  const {accessToken} = req.body;
  const response = await fetch(`https://graph.facebook.com/v6.0/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
  const fbResponse = await response.json();
  console.log('facebook response ',fbResponse);
  const checkRes = await users.checkAndSave(fbResponse);
  console.log('checkRes' , checkRes);
  const token = await users.tokenGenerator(checkRes);
  console.log('token' , token);

  req.token = token ;
  res.send(token);
});


  
module.exports = router ;