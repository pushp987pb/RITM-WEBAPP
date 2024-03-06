const { User , Users_Data , Donation ,RoomsBooking } = require('../ritmDb')
const bcryptjs = require("bcryptjs");
const jwt = require("jsonwebtoken");

const getUsers = async (req,res)=>{
    const user = await User.find();
    res.send({message:"all temple-users data.......pb.",payload:user})
}

// creating a new user
const createUser = async(req, res) => {
    try {
        let userObj = req.body;
        var userFromDb = await User.findOne({ username: userObj.username });

        // if user already existed
        if(userFromDb && userFromDb !== null) {
            res.status(200).send({ message: "User already existed.....pb." });
        } else {
            // if user is new
            const userDocument = new User(userObj)
            let userData = await userDocument.save()
            res.status(201).send({message:"User Created",payload:userData})
        }
    } catch (error) {
        res.status(500).send({ message: "An error occurred during user creation", error: error.message });
    }
}

const userLogin = async (req, res) => {
    //get user crdentials object from req
    const userCredentials = req.body;
    //check username
    var userFromDb = await User.findOne({ username: userCredentials.username });
    
    //if invalid username
    if (userFromDb === null) {
      return res.status(200).send({ message: "Invalid username" });
    }
    //if username is found, compare passwords
    const result = await bcryptjs.compare(
      userCredentials.password,
      userFromDb.password
    );
    //if pasword not matched
    if (result === false) {
      return res.status(200).send({ message: "Invalid password" });
    }
    //Create jwt token and sign it
    const signedToken = jwt.sign({ username: userFromDb.username },process.env.SECRET_KEY,{ expiresIn: 600 }
    );
    res.status(200).send({ message: "Login successful", token: signedToken, user: userFromDb });
  };

const updateUser = async (req,res)=>{
      try {
        let dataObj = req.body;
        // updating using username
        let updatedUser = await User.findOneAndUpdate(
          {username : dataObj.username},
          {$set : { ...dataObj }},
          {new: true}  // returns the updated document
        )
        res.status(200).send({ message: 'User updated in DB successfully', payload: updatedUser });
      } catch (error) {
        res.status(500).send({ message: 'Error updating user', error: error.message });
      }
}

const roomBooking_n_Donation = async (req, res) => {
  try {
    const dataObj = req.body;
    let FromDb = await Users_Data.findOne({username:dataObj.username});
    
    if(FromDb !== null){ // if info of this user already existed
      let updateObj = {};
      for(let key in dataObj.rooms_n_donation){
        updateObj[`rooms_n_donation.${key}`] = dataObj.rooms_n_donation[key];
      }
       await Users_Data.updateOne({username:dataObj.username}, {$set: updateObj});
      res.send({message:"Data updated successfully"});
    }else{
      let result = await Users_Data.create(dataObj);
      res.send({message:"Data added successfully"});
    }
  } catch (error) {
    res.status(500).send({ message: 'Error in updating data', error: error.message });
  }
};

// get user donation list 
const getDonation = async (req, res) => {
  try {
    let username = req.params.username;
    let fromDb = await Donation.find({"user.username": username});
    
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

const getRoomBooking = async (req,res) => {
  try{
    let username = req.params.username;
    let fromDb = await RoomsBooking.find({"user.username": username});
    // Sort the bookings by checkin date
    fromDb.sort((a, b) => new Date(a.checkin) - new Date(b.checkin));
    // The upcoming booking is the first one in the sorted array
    let upcomingBooking = fromDb.length > 0 ? fromDb[0] :null;

    res.status(201).send({upcomingBooking: upcomingBooking, roomBookingArray: fromDb});
  } 
  catch(error) {
    res.status(500).send({message: "Error in getting room Details", payload: error.message});
  }
}


//exporting ....
module.exports= {getUsers,createUser,userLogin,updateUser,roomBooking_n_Donation , getDonation ,getRoomBooking}