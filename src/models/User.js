const mongoose = require('mongoose');

// Define the schema for a User
const UserSchema = new mongoose.Schema({
  email: { type: String, required: true, unique: true },
  password: { type: String, required: true }
});

// Create the model for users
const User = mongoose.model('User', UserSchema);

module.exports = User;
