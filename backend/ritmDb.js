const mongoose = require('mongoose');
const bcryptjs = require("bcryptjs");

require('dotenv').config();

const DB_URL = process.env.MONGODB_ATLAS_URL;

// Connect to MongoDB Atlas
mongoose.connect(DB_URL, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
  // Additional options can be added here if needed
})
.then(() => console.log("DB connection successful....."))
.catch(err => console.log("Error in DB connection", err));

// const DB_URL = process.env.LOCAL_DB_URL;
//connection to local MONGO_DB 
// //connecting to DB
// mongoose.connect(DB_URL)
// .then(()=>console.log("DB connection successful....."))
// .catch(err=>console.log("Error in DB connection",err))

// Function to create a user and temple schema and model
function createModel(name, uniqueField, uniqueFieldMessage) {
  const schema = new mongoose.Schema({
    [uniqueField]: { // computed properties..
      type: String,
      minLength: [4, `Minimum length of ${uniqueField} is four`],
      required: [true, `${uniqueFieldMessage}`]
    },
    email: {
      type: String,
      required: [true, 'Email is required']
    },
    password: {
      type: String,
      minLength: [5, 'Minimum length of password is five'],
      required: [true, 'Password is required']
    },
    fullname : String,    // for user and temple
    gender:String,  // for user
    mobileNumber:Number,
    dob:String ,     // for user
    state:String,
    district:String,
    image:String,
    availableRooms:Object, // for temple to keep info of available rooms
    upcomingEvent:Object, // for temple to store upcoming event
    diety : String, // for temple  
    about:String // for temple
  });

  schema.pre('save', async function(next) {
    if (this.isModified('password')) {
      this.password = await bcryptjs.hash(this.password, 5);
    }
    next();
  });

  return mongoose.model(name, schema);
}

// Creating  User and Temple models
const User = createModel('user', 'username', 'Username is required');
const Temple = createModel('temple', 'templename', 'Temple name is required');


// creating donation schema ........
const donationSchema = new mongoose.Schema({
  user:{
    type: Object,
    required: true
  },
  temple: {
    type: Object,
    required: true
  },
  date: Date ,
  donation:{
    type: Object,
    required: true
  }
})
// donation model....
const Donation = mongoose.model('donation',donationSchema)

//creating event schema.......
const eventSchema = new mongoose.Schema({
  templename : {
    type: String,
    required: true
  },
  events:{
    type :Array,
    required: true
  }
})
// event Model
const Events = mongoose.model('event',eventSchema)

// schema for available and booked rooms
const roomsBookingSchema = new mongoose.Schema({
  user:{
    type: Object,
    required: true
  },
  temple: {
    type: Object,
    required: true
  },
  checkin: Date,
  duration:String,
  bookedRooms:{
    type: Object,
    required: true
  }
})
// rooms model
const RoomsBooking = mongoose.model('roombooking',roomsBookingSchema);

//exporting User and Temple Models
module.exports = { User, Temple, Events,RoomsBooking,Donation };

