'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mainRoutes = require('../routes/main.js');
const centralRoutes = require('../routes/central.js');
const fetch = require('node-fetch');
const user = require('../models/FB-schema.js');

// application constant 
const app = express() ;


// 3d party middleware 
app.use(express.json());
app.use(express.static('./public'));

// 3d party dependencies 
app.use(cors());
app.use(morgan('dev'));

app.use(mainRoutes);
app.use(centralRoutes);

app.post('/login-with-facebook', async (req, res)=>{
  const { accessToken, userID } = req.body;
  const response = await fetch(`https://graph.facebook.com/v6.0/me?access_token=${accessToken}&method=get&pretty=0&sdk=joey&suppress_http_code=1`);
  const json = await response.json();

  if(json.id === userID){
    const respon = await user.findOne({ facebookID: userID });
    if(respon){
      res.json({ status: 'Success', data: 'I\'am glad to see you again my friend '});
    } else {
      const person = new user({
        name: 'JaCob-Rss',
        facebookID: userID,
        accessToken, 
      });
      await person.save();
      res.json({ status: 'Success', data: 'You now my friend are registerd and logged in to our app'});
    }
  } else {
    res.json({ status: 'Error', data: 'Wrong Access !!!'});
  }
});

module.exports = {
  server : app ,
  start : (port) => {
    let PORT = port || process.env.PORT || 3005;
    app.listen( PORT, () => {
      console.log(`===================>>>>>>> Let's Rock ${PORT}!!! <<<<<<<===================`);
    });
  },
};
