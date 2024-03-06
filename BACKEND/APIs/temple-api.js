const express = require('express')
const templeApp = express.Router();

// get express-async-handler to handle async errors
const expressAsyncHandler = require('express-async-handler');

//importing req handlers from controllers
const { createTemple,templeLogin  ,getRoomBooking , makeDonation , getDonation , saveEvent , getEvents
     ,updateTemple ,getTemples,getTempleUsingID, saveRooms } = require('../Controllers/temple-controllers.js')

//user CRUD Operations

// get temple using ID
templeApp.get('/get-temple/:id',expressAsyncHandler(getTempleUsingID))

// create temple
templeApp.post('/create-temple',expressAsyncHandler(createTemple))

// login temple
templeApp.post('/login',expressAsyncHandler(templeLogin))

// updating currentTemple using put request
templeApp.put('/update-temple',expressAsyncHandler(updateTemple))

// fetching data of all temples
templeApp.get('/get-temples',expressAsyncHandler(getTemples))

// updating donation .....
templeApp.post('/make-donation',expressAsyncHandler(makeDonation))

//geting list of donation details of a temple
templeApp.get('/get-donation/:templename',expressAsyncHandler(getDonation))

// saving event info to database 
templeApp.post('/save-event',expressAsyncHandler(saveEvent))

// getting list of event 
templeApp.get('/get-events/:templename',expressAsyncHandler(getEvents))

// saving rooms info to DB
templeApp.post('/save-rooms',expressAsyncHandler(saveRooms))

// getting room booking list 
templeApp.get('/get-room-booking/:templename',expressAsyncHandler(getRoomBooking))

//export
module.exports=templeApp