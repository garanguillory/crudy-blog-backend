const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt-nodejs');

const userSchema = new Schema({
	email: {type: String, unique: true, lowercase: true},
	password: String,
  first_name: String,
  last_name: String,
  description: String,
  photo_url: {type: String, default: 'http://placehold.it/400x400'},
  posts: [{
      author: {type: String},
      text: {type: String},
      user_id: {type: String},
      date: { type: Date, default: Date.now }
    }],
});


userSchema.pre('save', function(next) {
  const user = this;

  bcrypt.genSalt(10, function(err, salt) {
    if (err) { return next(err); }
    bcrypt.hash(user.password, salt, null, function(err, hash) {
      if (err) { return next(err); }
      user.password = hash;
      next();
    });
  });
});

userSchema.methods.comparePassword = function(userPassword, callback) {
  bcrypt.compare(userPassword, this.password, function(err, matched) {
    if (err) { return callback(err); }

    callback(null, matched);
  });
}


const User = mongoose.model('user', userSchema);

module.exports = User;