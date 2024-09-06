const Workout = require('../models/workoutModel');
const mongoose = require('mongoose');

//Get all workout
const getWorkouts = async (req, res)=>{
    const user_id = req.user._id;

    const workouts = await Workout.find({user_id}).sort({createdAt: -1})
    
    res.status(200).json(workouts)
}

// get a single workout 
const getSingleWorkout = async (req, res)=>{
    try {
        const _id = req.params.id
        const singleWorkout = await Workout.findById(_id)

    } catch (error) {
        res.status(400).json({error: error.message})
    }
    
}


// create new workout
const createWorkout = async (req, res)=>{
    const {title, load, reps} = req.body

    let emptyFields = []

    if(!title) {
        emptyFields.push('title')
    }
    if(!load){
        emptyFields.push('load')
    }
    if(!reps){
        emptyFields.push('reps')
    }
    if(emptyFields.length> 0){
        return res.status(400).json({error: 'Please fill in all the fields', emptyFields})
    }
    
    // add doc to db
    try {
        const user_id = req.user._id;
        const workout = await Workout.create({title, load, reps, user_id})
        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

// delete a workout
const deleteWorkout = async (req,res)=>{
    const _id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(_id)) {
        return res.status(404).json({error: "No such workout"})
    }
    try {
        const workout = await Workout.findByIdAndDelete(_id)

        res.status(200).json(workout) 
    } catch (error) {
        res.status(400).json({error: error.message}) 
    }
}

// update a workout
const updateWorkout = async (req, res)=>{
    const _id = req.params.id

    if(!mongoose.Types.ObjectId.isValid(_id)){
        res.status(404).json({error: "No such workout"})
    }
    try {
        const workout = await Workout.findOneAndUpdate({_id}, {
            ...req.body
        })

        res.status(200).json(workout)
    } catch (error) {
        res.status(400).json({error: error.message})
    }
}

module.exports = {
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
}