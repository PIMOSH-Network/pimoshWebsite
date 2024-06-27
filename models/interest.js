const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const bcrypt = require('bcrypt');
const { timeStamp } = require('console');

const interestSchema = new Schema({
    firstName: {type: String, required: [true, 'first name is required']},
    lastName: {type: String, required: [true, 'last name is required']},
    email: {type: String, required: [true, 'email address is required'], unique: [true, 'this email address has been used'] },
    password: { type: String, required: [true, 'password is required'] },
},
{ timestamps: true }
);

interestSchema.pre('save', function(next){
  let interest = this;
  if (!interest.isModified('password'))
      return next();
  bcrypt.hash(interest.password, 10)
  .then(hash => {
    interest.password = hash;
    next();
  })
  .catch(err => next(err));
});


interestSchema.methods.comparePassword = function(inputPassword) {
  let interest = this;
  return bcrypt.compare(inputPassword, interest.password);
}

module.exports = mongoose.model('interest', interestSchema);