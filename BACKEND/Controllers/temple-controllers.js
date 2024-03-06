const { Temple ,Donation, Events , RoomsBooking } = require('../ritmDb')
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

// get temple using ID
const getTempleUsingID = async (req,res)=>{
  const id = req.params.id;
  let templeFromDb = await Temple.findOne({_id:id})
  res.status(200).send({message:'Temple found',payload:templeFromDb})
}


// creating a new temple account
const createTemple = async(req, res) => {
    try {
        let templeObj = req.body;
        var templeFromDb = await Temple.findOne({ templename: templeObj.templename });

        // if temple already existed
        if(templeFromDb && templeFromDb !== null) {
            res.status(200).send({ message: "Templename already existed" });
        } else {
            // if temple is new
            const templeDocument = new Temple(templeObj)
            let templeData = await templeDocument.save()
            res.status(201).send({message:"Temple Account Created",payload:templeData})
        }
    } catch (error) {
        res.status(500).send({ message: "An error occurred during temple account creation", error: error.message });
    }
}

const templeLogin = async (req, res) => {
  try{
    //get temple credentials object from req
    const templeCredentials = req.body;

    //check email of temple
    var templeFromDb = await Temple.findOne({ templename: templeCredentials.templename });
    
    //if invalid email
    if (templeFromDb === null) {
      return res.status(200).send({ message: "Invalid Templename" });
    }
    //if templename is found, compare passwords
    const result = await bcryptjs.compare(
        templeCredentials.password,
        templeFromDb.password
    );
    //if pasword not matched
    if (result === false) {
      return res.status(200).send({ message: "Invalid password" });
    }
    //Create jwt token and sign it
    const signedToken = jwt.sign({ templename: templeFromDb.templename },process.env.SECRET_KEY,{ expiresIn: 600 }
    );
    res.status(200).send({ message: "Login successful", token: signedToken, temple: templeFromDb });
  }
  catch (error) {
    res.status(500).send({ message: 'Login Failed', error: error.message });
  }
};



  const updateTemple = async (req,res) =>{
    try {
      let dataObj = req.body;
      // updating using username
      let updatedTemple = await Temple.findOneAndUpdate(
        {templename : dataObj.templename},
        {$set : { ...dataObj }},
        {new: true}  // returns the updated document
      )
      res.status(200).send({ message: 'Temple updated in DB successfully', payload: updatedTemple });
    } catch (error) {
      res.status(500).send({ message: 'Error in updating Temple Data', error: error.message });
    }
}

// route to fetch data of all temples..
const getTemples = async (req,res) =>{
  let fromDb = await Temple.find();
  res.status(200).send({message:'All temples Data',payload:fromDb})
}

// updaint donation info
const makeDonation = async (req, res) => {
  try {
  let dataObj = req.body;
  // adding date 
  dataObj.date = new Date().toLocaleDateString('en-GB');
  dataObj.donation.amount = Number(dataObj.donation.amount);
  // saving to database
  await Donation.create(dataObj);
  res.status(201).send({message: "Data added successfully"});
  } catch(error) {
      res.status(500).send({message: "An error occurred while Donation",payload:error.message});
  }
}
// fetching dontion info
const getDonation = async (req, res) => {
  try {
    let templename = req.params.templename;
    let fromDb = await Donation.find({"temple.templename": templename});
    
    // Calculate total donations
    let totalDonation = 0;
    for (let donation of fromDb) {
      totalDonation += donation.donation.amount;
    }
    // Send total donations and list of all donations
    res.status(201).send({totalDonation: totalDonation, donationArr: fromDb});
  } catch(error) {
    res.status(500).send({message: "Error occurred in getting Donation Details", payload: error.message});
  }
}

// saving event info
const saveEvent = async (req, res) => {
  try {
    let dataObj = req.body;
    await Events.findOneAndUpdate(
      { templename: dataObj.templename }, // condition
      { $push: { events: dataObj.event } }, // update
      { new: true, upsert: true } // options
    );
    res.status(201).send({ message: "Successful" });
  } catch (err) {
    console.log("Error in saving event to DB", err.message);
    res.status(500).send({ message: "Error in saving event to DB" });
  }
};

// geting list of events of a particular temple
const getEvents = async (req,res) =>{
    try{
      let templename = req.params.templename;
      let fromDb = await Events.findOne({templename:templename})
      if(fromDb!==null){
        let result = fromDb.events;
        res.status(201).send({message:'List fetched successfully',payload:result})
      }else{
      res.status(500).send({message:'NO Such temple exits'})
      }
    }
    catch(err){
      res.status(500).send({message:'Error in fetching list',payload:err.message})
    }
}

// saving room booking and available rooms in database
const saveRooms = async (req,res) =>{
  try {
    let dataObj = req.body;

    // saving to database
    await RoomsBooking.create(dataObj);
    res.status(201).send({message: "Rooms Booked successfully"});
    } catch(error) {
        res.status(500).send({message: "Room Booking Failded",payload:error.message});
    }
}

const getRoomBooking = async (req,res) => {
  try{
    let templename = req.params.templename;
    let fromDb = await RoomsBooking.find({"temple.templename": templename});
    if(fromDb!==null){
      res.status(201).send({roomBookingArray: fromDb});
    }else{
      res.status(201).send({message:'No such Temple found'});
    }
  } 
  catch(error) {
    res.status(500).send({message: "Error in getting room Details", payload: error.message});
  }
}

//exporting ....
module.exports= {createTemple,templeLogin,
                  makeDonation,updateTemple, getRoomBooking,
                  getTemples,getTempleUsingID,getDonation , saveEvent , getEvents , saveRooms
              }