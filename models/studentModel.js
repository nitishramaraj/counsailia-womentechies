const mongoose = require('mongoose');

const usersSchema = new mongoose.Schema({
    email: {
      type: String,
      required: true
    },
    name: {
      type: String,
      required: true
    },
    profilePic: {
        type: String
    },
    course: {
        type: Boolean,
    },
    job: {
        type: Boolean,
    },
    marks: {
        type: Number
    },
  });

  module.exports = mongoose.model('User', usersSchema);


