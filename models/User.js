const mongoose = require("mongoose");
const { model } = require("mongoose");
const Schema = mongoose.Schema;

const userSchema = new Schema(
  {
    _id: Schema.Types.ObjectId,
    
    username: {
      type: String,
      unique: true,
      required: true,
      trim: true,
    },
    email: {
      type: String,
      required: true,
      unique: true,
      match: [
        /^\w+([\.-]?\w+)*@\w+([\.-]?\w+)*(\.\w{2,3})+$/,
        "Please fill a valid email address",
      ],
    },
    thoughts: [
      {
        type: Schema.Types.ObjectId,
        ref: "Thought",
      },
    ],
    friends: [
      {
        type: Schema.Types.ObjectId,
        ref: "User",
      },
    ],
  },
  {
    // Include virtuals
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

// Virtual for friendCount
userSchema.virtual("friendCount").get(function () {
  return this.friends.length;
});

const User = model('user', userSchema);

module.exports = User;
