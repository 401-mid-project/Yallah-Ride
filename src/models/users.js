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

    let dataBase = await Model.create(data);
    console.log('users after create' , dataBase);

    return dataBase ;
  }else{
    console.log('elseeeeeeeee works !!');
    return null;
  }
};
  
  
  
users.tokenGenerator = async function(data){
  let token = await jwt.sign(data.info.name , SECRET) ;
  return token ;
};

users.tokenGeneratorSignUp = async function(data){
  let token = await jwt.sign(data.info.name , SECRET) ;
  let returnedObject = {'token':token , 'id':data._id};
  return returnedObject ;
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


// bearer authorization method that verifies the token
users.tokenValidator= async function(token){

  try {
    console.log('tokenV try' ,typeof token);

    let data = await jwt.verify(token , SECRET);
    console.log('TV data', data);
    let searchResult = await Model.get(data);
    console.log('TV search result ', searchResult);

    if(searchResult[0]){
      console.log('if true');
      return searchResult[0];
    }else{
      console.log('if false');
      return 'ターゲットを見つけることができません';
    }

  }catch(err){
    return Promise.reject(err); 
  }
};


// to check the response from facebook 
users.checkAndSave = async function (data){
  console.log(data);
  // search in the DB for the user .
  let scanResult = await Model.get(data.name);
  console.log(scanResult);

  // DB will return an array
  let search;
  let newData ;
  if(scanResult[0]){
    search =scanResult[0].name ;
  }

  if(!( search === data.name)){
    // hash the password with bcrypt
    data.password = await bcrypt.hash(data.id , 5);

    newData = {info:{name: data.name , password: data.password}}; 
    // adding the user data to the DB
    await Model.create(newData);
    return newData ;
  }else{
    return newData;
  }
};


module.exports = users ;