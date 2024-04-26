const { Schema, model, get } = require("mongoose");

// Schema to create Thoughts model
const thoughtsSchema = new Schema(
  {
    thoughtText: {
      type: String,
      required: true,
      max_length: 280,
      min_length: 1,
    },
    createdAt: {
      type: Date,
      required: true,
      default: Date.now,
      get: (createdAtVal) => dateFormat(createdAtVal),
    },
    username: {
      type: String,
      required: true,
    },
    reactions: {
      //array of nested documents created with the reactionSchema
      type: [reactionSchema],
    },
  },
  {
    toJSON: {
      virtuals: true,
    },
    id: false,
  }
);

    //create a virtual called reactionCount that retrieves the length of the thought's reactions array field on query
    reactionSchema.virtual('reactionCount').get(function() {
      return this.reactions.length;
    });

const Thoughts = model("thoughts", thoughtsSchema);

module.exports = Thoughts;
