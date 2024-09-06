const express = require('express');
require('dotenv').config();
const workoutRoutes = require('./routes/workouts');
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
app.use('/api/workouts', workoutRoutes);
app.use('/api/user', userRoutes);

app.get('/', (req,res)=> {
    res.send("Hello")
})

// connect to db
mongoose.connect(process.env.MONGO_URI)
.then(()=>{
    // listening for request 
    app.listen(process.env.PORT, ()=>{
        console.log(`DB connection successful & Listening on port ${process.env.PORT}`);
    })
})
.catch((error)=>{
    console.log(error)
})  


