const express = require('express');
const hotelRoutes = require('./routes/hotelRoutes.js');
const reviewRoutes = require('./routes/reviewRoutes.js');


const app = express();
app.use(express.json());


//Routes
app.use('/api/v1/hotels', hotelRoutes);
app.use('/api/v1/reviews', reviewRoutes);

module.exports = app;