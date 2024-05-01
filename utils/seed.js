const mongoose = require("mongoose");
const { User, Thought } = require("../models"); 

mongoose
  .connect("mongodb://localhost:27017/meowmixDB")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error(err));

// Seed data for Thoughts
const thoughtData = [
  {
    thoughtText: "Tuna vs. salmon... the eternal debate.",
    username: "FluffyLover123",
  },
  {
    thoughtText: "Napping in sunbeams is the ultimate joy.",
    username: "WhiskersTheWise",
  },
  {
    thoughtText: "Anyone else's cat obsessed with boxes?",
    username: "MidnightPurr",
  },
  {
    thoughtText: "The art of the slow blink is a powerful thing.",
    username: "SirWhiskers",
  },
  {
    thoughtText: "Must ... resist ... the urge to boop the fluffy belly.",
    username: "PawsitiveVibes",
  },
];

// Seed data for Reactions
const reactionData = [
  {
    reactionBody: "My cat prefers salmon, hands down!",
    username: "WhiskersTheWise",
    // Associate with a valid Thought ID
  },
  {
    reactionBody: "My cat does! He'll sleep in the tiniest boxes.",
    username: "PawsitiveVibes",
    // Associate with a valid Thought ID
  },
  {
    reactionBody: "Absolutely! It's like a super-charged purr.",
    username: "MidnightPurr",
    // Associate with a valid Thought ID
  },
];

// Function to format an array of documents for MongoDB
function formatDataForCompass(data) {
  return data.map((item) => JSON.stringify(item, null, 2)).join(",\n");
}

// Print the formatted data for THOUGHTS
console.log('Seed data for "thoughts" collection:');
console.log(formatDataForCompass(thoughtData));

// Print the formatted data for REACTIONS
console.log('\nSeed data for "reactions" collection:');
console.log(formatDataForCompass(reactionData));
