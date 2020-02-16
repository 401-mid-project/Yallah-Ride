'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mainRoutes = require('../routes/main.js');
const centralRoutes = require('../routes/central.js');


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




module.exports = {
  server : app ,
  start : (port) => {
    let PORT = port || process.env.PORT || 3000;
    app.listen( PORT, () => {
      console.log(`Lets Rock ${PORT}!!!`);
    });
  },
};
