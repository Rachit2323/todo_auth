const mongoose = require("mongoose");

// Create a User Schema
const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true, // Ensure email is unique
  },
  password: {
    type: String,
    required: true,
  },
});

// Create a User Model based on the schema
const User = mongoose.model("User", userSchema);

module.exports = User;
