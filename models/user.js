const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { timeStamp } = require('console');

const usersSchema = new Schema({
    firstName: {type: String, required: [true, 'first name is required']},
    lastName: {type: String, required: [true, 'last name is required']},
    email: {type: String, required: [true, 'email address is required'], unique: [true, 'this email address has been used'] },
    password: { type: String, required: [true, 'password is required'] },
},
{ timestamps: true }
);

usersSchema.pre('save', function(next){
  let users = this;
  if (!users.isModified('password'))
      return next();
  bcrypt.hash(users.password, 10)
  .then(hash => {
    users.password = hash;
    next();
  })
  .catch(err => next(err));
});


usersSchema.methods.comparePassword = function(inputPassword) {
  let users = this;
  return bcrypt.compare(inputPassword, users.password);
}

module.exports = mongoose.model('users', usersSchema);