const mongoose = require('mongoose');
const Schema = mongoose.Schema;

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String
});

// Create the model class and pass in the Schema
const modelClass = mongoose.model('user', userSchema);

// Export the model
module.export = modelClass;