'use strict';

const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const mainRoutes = require('../routes/main.js');
const centralRoutes = require('../routes/central.js');
const fbRoute = require('../routes/facebook.js');


// constant middleware apps
const notFound = require('../middleware/404-md.js');
const errorHandler = require('../middleware/500-md.js');
const logger = require('../middleware/logger.js');
const timeStamp = require('../middleware/time-stamp.js');


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
app.use(fbRoute);

//middleware apps
app.use(errorHandler);
app.use(timeStamp);
app.use(logger);





app.get('*' , notFound);

module.exports = {
  server : app ,
  start : (port) => {
    let PORT = port || process.env.PORT || 3000;
    app.listen( PORT, () => {
      console.log(`===================>>>>>>> Let's Rock ${PORT}!!! <<<<<<<===================`);
    });
  },
};
