const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

// Define our model
const userSchema = new Schema({
  email: { type: String, unique: true, lowercase: true },
  password: String,
});

// On Save Hook, encrypt password
// Before saving a model, run this function
userSchema.pre('save', function(next) {
  // Get access to user model
  const user = this;

  // Generate a salt, then run callback
  bcrypt.genSalt(10, (err, salt) => {
    if (err) { return next(err); }

    // Hash our password using the salt
    bcrypt.hash(user.password, salt, null, (err, hash) => {
      if (err) { return next(err); }
      // Overwrite plain text password with encrypted password
      user.password = hash;
      next();
    });
  })
});

// Create comparePassword method for instances of User Model
userSchema.methods.comparePassword = function(candidatePassport, callback){
  bcrypt.compare(candidatePassword, this.password, (err, isMatch)=> {
    if (err) return callback(err);

    callback(null, isMatch);
  });
}

// Create the model class and pass in the Schema
const modelClass = mongoose.model('user', userSchema);

// Export the model
module.exports = modelClass;