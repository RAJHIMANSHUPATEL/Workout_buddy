const express = require('express');
const Workout = require('../models/workoutModel')
const { 
    createWorkout,
    getWorkouts,
    getSingleWorkout,
    deleteWorkout,
    updateWorkout
} = require('../controllers/workoutController');
const requireAuth = require('../middleware/requireAuth');

const router = express.Router();

// require auth for all workout routes
router.use(requireAuth)

// Get all workouts
router.get('/', getWorkouts)

// Get a single workout
router.get('/:id', getSingleWorkout)

// Post a workout
router.post('/', createWorkout)

// Delete a workout
router.delete('/:id', deleteWorkout)

// Update a workout
router.patch('/:id', updateWorkout)

module.exports = router;