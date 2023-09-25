require("dotenv").config();

const express = require("express");

const mongoose = require("mongoose");

const workoutRoutes = require("./routes/workouts");

const app = express();

//middleware
app.use(express.json());
app.use((req, res, next) => {
  console.log(req.path, req.method);
  next();
});

// Routes

app.use("/api/workouts", workoutRoutes);

// Connect to DB

mongoose
  .connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, (req, res) => {
      console.log("Database is successfully connected and it listning from port", process.env.PORT);
    });
  })
  .catch((error) => {
    console.log(error);
  });
