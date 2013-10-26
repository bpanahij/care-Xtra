var mongoose = require('mongoose')
  , _ = require('underscore')
  , bcrypt = require('bcrypt'), SALT_WORK_FACTOR = 10;
var userPerms = 'patient, primary, secondary, doctor'.split(', ');
var UserSchema = new mongoose.Schema({
  id: String,
  username: {type: String, required: true, index: { unique: true }},
  password: {type: String, required: true},
  fullName: String,
  email: String,
  token: String,
  userRoles: [
    { type: String, enum: userPerms }
  ]
});
UserSchema.pre('save', function(next) {
  var user = this;
  if (!user.isModified('password')) {
    return next();
  }
  bcrypt.genSalt(SALT_WORK_FACTOR, function(err, salt) {
    if (err) {
      return next(err);
    }
    bcrypt.hash(user.password, salt, function(err, hash) {
      if (err) {
        return next(err);
      }
      user.password = hash;
      next();
    });
  });
});
UserSchema.methods.comparePassword = function(candidatePassword, callback) {
  bcrypt.compare(candidatePassword, this.password, function(err, isMatch) {
    if (err) {
      return callback(err);
    }
    callback(null, isMatch);
  });
};
UserSchema.static('login', function(credentials, callback) {
  return this.findOne({ username: credentials.username }, function(err, user) {
    if (_.isNull(user)) {
      callback({error: 'No User'});
      return;
    }
    user.comparePassword(credentials.password, function(err, isMatch) {
      callback(err, isMatch, isMatch ? user : {});
    });
  });
});
UserSchema.static('authenticate', function(username, token, callback) {
  this.findOne({username: username, token: token}, callback);
});
module.exports = mongoose.model("User", UserSchema);
