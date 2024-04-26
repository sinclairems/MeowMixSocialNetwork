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
      match: [/.+@.+\..+/, "Please enter a valid e-mail address"],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thoughts",
      },
    ],
    // Array of `_id` values referencing the `User` model (self-reference)
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

  //create a virtual call friendCount that retrieves the length of the user's friends array field on query
  userSchema.virtual('friendCount').get(function() {
    return this.friends.length;
  });

const User = model('user', userSchema);

module.exports = User;