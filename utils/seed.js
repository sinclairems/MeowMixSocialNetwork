const mongoose = require('mongoose');
const { User, Thought } = require("../models"); 

mongoose
  .connect("mongodb://localhost:27017/meowmixDB")
  .then(() => console.log("Connected to MongoDB!"))
  .catch((err) => console.error(err));

  const userData = [
    {
      _id: 1,
      username: "FluffyLover123",
      email: "fluffy@meowmail.com",
      friends: ["WhiskersTheWise"],
    },
    {
      _id: 2,
      username: "WhiskersTheWise",
      email: "whiskers@meowmail.com",
      friends: ["FluffyLover123", "MidnightPurr"],
    },
    {
      _id: 3,
      username: "MidnightPurr",
      email: "midnight@meowmail.com",
      friends: [
        "FluffyLover123",
        "WhiskersTheWise",
        "SirWhiskers",
        "PawsitiveVibes",
      ],
    },
    {
      _id: 4,
      username: "SirWhiskers",
      email: "sirwhiskers@meowmail.com",
      friends: ["MidnightPurr", "WhiskersTheWise"],
    },
    {
      _id: 5,
      username: "PawsitiveVibes",
      email: "pawsitive@meowmail.com",
      friends: [],
    },
  ];

const seedThoughts = [
  {
    thoughtText: "Napping in sunbeams is the ultimate joy.",
    username: "WhiskersTheWise", // Make sure this username exists in your users collection
  },
  {
    thoughtText: "Anyone else's cat obsessed with boxes?",
    username: "MidnightPurr",
    thoughtId: "60f3f5d5e3e7c3c7d8b6e861",
  },
  {
    thoughtText: "Tuna vs. salmon... the eternal debate.",
    username: "FluffyLover123",
    thoughtId: "60f3f5d5e3e7c3c7d8b6e862",
  },
  {
    thoughtText: "The art of the slow blink is a powerful thing.",
    username: "SirWhiskers",
    thoughtId: "60f3f5d5e3e7c3c7d8b6e863",
  },
  {
    thoughtText: "Must ... resist ... the urge to boop the fluffy belly.",
    username: "PawsitiveVibes",
    thoughtId: "60f3f5d5e3e7c3c7d8b6e864",
  },
];

const seedReactions = [
  {
    reactionBody: "My cat does! He'll sleep in the tiniest boxes.",
    username: "PawsitiveVibes",
    thoughtId: "60f3f5d5e3e7c3c7d8b6e861",
  },
  {
    reactionBody: "My cat prefers salmon, hands down!",
    username: "WhiskersTheWise",
    thoughtId: "60f3f5d5e3e7c3c7d8b6e862",
  },
  {
    reactionBody: "Absolutely! It's like a super-charged purr.",
    username: "MidnightPurr",
    thoughtId: "60f3f5d5e3e7c3c7d8b6e863",
  },
];

const seedDatabase = async () => {
  try {
    await User.insertMany(userData);

    const createdThoughts = await Thought.insertMany(seedThoughts);
    for (const { _id } of createdThoughts) {
      const user = userData.find((user) => user.username === _id.username);
      user.thoughts.push(_id);
      await User
        .findOneAndUpdate(
          { username: user.username },
          { $push: { thoughts: _id } },
          { new: true }
        );
    }

    await Reaction.insertMany(seedReactions);
  } catch (err) {
    console.error(err);
  } finally {
    mongoose.connection.close();
  }
};

seedDatabase();