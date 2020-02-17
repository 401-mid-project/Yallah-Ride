'use strict';

const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const Model = require('./main-model.js');

let users= {};
const SECRET = 'Shushhhhh';

users.save = async function (data){
  console.log('data ****',data.info.name);
  let scanResult = await Model.get(data.info.name);
  console.log('after scan',scanResult);
  let search;
  if(scanResult[0]){
    search =scanResult[0].info.name ;
  }
  console.log('seeeeeeeeeeeeeeeeearch' ,search);
  
  if(!( search === data.info.name)){
    console.log('users truuue');

    data.info.password = await bcrypt.hash(data.info.password , 5);
    console.log('users after hashing');

    await Model.create(data);
    console.log('users after create');
    return data ;
  }else{
    console.log('elseeeeeeeee works !!');
    return data;
  }
};
  
  
  
users.tokenGenerator = async function(data){
  let token = await jwt.sign(data.info.name , SECRET) ;
  return token ;
};
  
  
users.basicAuth = async function(user , pass){
  
  let fromDB = await Model.get(user);
  console.log('from db',fromDB);
  let check = await bcrypt.compare(pass , fromDB[0].info.password);
  if(check){
    return fromDB[0];
  }else{
    return Promise.reject ;
  }
};
  
  
users.showAll = async function(){
  let result = Model.get() ;
  return result ;
};
  
module.exports = users ;