const express = require('express')
const app = express();
const cors = require('cors')

//configuring environment variables
require('dotenv').config();

// connecting to react app
const path = require('path');
app.use(express.static(path.join( // here static is middleware and
    __dirname , '../FRONTEND/build'))) // join connect backend & frontend

// importing cors to get request from different from servers
app.use(cors({origin:'http://localhost:5000'}))

//adding body parser middleware
app.use(express.json())

//importing APIs
const userApp = require('./APIs/user-api');
const templeApp = require('./APIs/temple-api');

//forward req to APIs when path start with /user-api or /temple-api
app.use('/user-api',userApp);
app.use('/temple-api',templeApp);

app.use('',(req,res,next)=>{
    res.sendFile((path.join(__dirname , '../FRONTEND/build/index.html')))
})

// adding error handlers to deal with synchronous errors
app.use((err,req,res,next)=>{
    res.send({message:"Error Occured",payload:err.message})
})


//assigning port number
const PORT = process.env.PORT || 7000;
app.listen(PORT , ()=>{console.log(`RITM SERVER listening at port ${PORT}`)})