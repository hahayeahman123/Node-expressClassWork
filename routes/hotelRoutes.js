const express = require('express');
const hotelcontroller = require('../controllers/hotelController.js');
const reviewRouter = require('./reviewRoutes.js');

const router = express.Router();


//router.param('id', hotelcontroller.checkID)

router // when we do something with all hotels, we use this router
    .route('/')
    .get(hotelcontroller.getAllHotels)
    .post(hotelcontroller.createHotel)

router // routes, that search for an id
    .route('/:id')
    .get(hotelcontroller.getHotel)
    .patch(hotelcontroller.updateHotel)
    .delete(hotelcontroller.deleteHotel)

router.use('/:hotelId/reviews', reviewRouter)
    

module.exports = router;