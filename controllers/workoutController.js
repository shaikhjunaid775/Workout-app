const Workout = require("../models/workoutModel")

const mongoose = require('mongoose')

// Get all workouts
const getWorkouts = async (req, res) => {
  const workouts = await Workout.find({}).sort({ createdBy: -1 });

  res.status(200).json(workouts);
};

// Get a single workout
const getWorkout = async (req, res) => {
  const { id } = req.params;

  if(!mongoose.Types.ObjectId.isValid(id)){
    return res.status(404).json({ error : 'No Such Record Found.'})
  }

  const workout = await Workout.findById(id);

  if (!workout) {
    return res.status(404).json({ error: "No such workout found." });
  }

  res.status(200).json(workout);
};

// Create new workout

const createWorkout = async (req, res) => {
  const { title, load, reps } = req.body;

  try {
    const workout = await Workout.create({ title, load, reps });
    res.status(200).json(workout);
  } catch (error) {
    res.status(400).json({ error: error.message });
  }
};

//  Delete a workout
const deleteWorkout = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return res.status(404).json({ error: 'no such workout'})
    }

    const workout = await Workout.findOneAndDelete({_id: id})

    res.status(200).json(workout)
}

// Update a workout
const updateWorkout = async (req,res)=>{
    const {id} = req.params

    if(!mongoose.Types.ObjectId.isValid(id)){
        return req.status(404).json({ error: 'no such workout found.'})
    }

    const workout = await Workout.findByIdAndUpdate({_id: id},{
        ...req.body
    })

    if(!workout){
        return res.status(404).json({ error : 'no such workout found'})
    }

    res.status(202).json(workout)
}

module.exports = {
  getWorkout,
  getWorkouts,
  deleteWorkout,
  updateWorkout,
  createWorkout,
};
