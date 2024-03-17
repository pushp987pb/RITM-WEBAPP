const express = require('express')
const userApp = express.Router();

// get express-async-handler to handle async errors
const expressAsyncHandler = require('express-async-handler');

//importing req handlers from controllers
const { getUser , createUser,userLogin ,updateUser,getDonation,getRoomBooking} = require('../Controllers/user-controllers')

//user CRUD Operations
// get users
userApp.get('/get-user/:username',expressAsyncHandler(getUser))

// create user
userApp.post('/create-user',expressAsyncHandler(createUser))

// login user
userApp.post('/login',expressAsyncHandler(userLogin))

// update user
userApp.put('/update-user',expressAsyncHandler(updateUser))

// getting donation details 
userApp.get('/get-donation/:username',expressAsyncHandler(getDonation))

//getting roombooking list 
userApp.get('/get-room-booking/:username',expressAsyncHandler(getRoomBooking))

//export
module.exports=userApp