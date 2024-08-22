const express = require('express');
require('dotenv').config();
const wrokoutRoutes = require('./routes/workouts');
const mongoose = require('mongoose');

// express app
const app = express();

//middleware
app.use(express.json());
app.use((req,res,next)=>{
    console.log(req.path, req.method);
    next();
})

// routes
app.use('/api/workouts', wrokoutRoutes);

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


