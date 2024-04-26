const { Schema, model } = require('mongoose');
const thougthsSchema = require('./Thoughts');

// Schema to create User model
const userSchema = new Schema(
  {
    username: {
      type: String,
      required: true,
      max_length: 50,
      min_length: 4,
      trimmed: true,
    },
    email: {
      type: String,
      required: true,
      max_length: 50,
      min_length: 4,
      unique: true,
      match: [/.+@.+\..+/, 'Please enter a valid e-mail address'],
    },
    thoughts: {
      type: [thougthsSchema],
      default: [],
      //array of _id values referencing the Thoughts model
    },
    friends: {
      type: [Schema.Types.ObjectId],
      ref: 'User',
  },
  //create a virtual call friendCount that retrieves the length of the user's friends array field on query
  friendCount: {
    type: Number,
    default: 0,
  },
  },
  {
    toJSON: {
      getters: true,
    },
  }
);

const User = model('user', userSchema);

module.exports = User;