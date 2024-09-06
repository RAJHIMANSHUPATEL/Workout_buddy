const express = require('express');
require('dotenv').config();
const wrokoutRoutes = require('./routes/workouts');
const userRoutes = require('./routes/user');
const mongoose = require('mongoose');
const cors = require('cors');

// express app
const app = express();

// cors
app.use(cors())

//middleware
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/workouts', wrokoutRoutes);
app.use('/api/user', userRoutes);


// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    // listening for request 
    app.listen(process.env.PORT, ()=>{
        console.log("DB connection successful & Listening on port 3000");
    })
})
.catch((error)=>{
    console.log(error)
})  


