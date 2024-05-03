const connection = require("../config/connection"); 
const { User, Thought } = require("../models"); 
const { getRandomUsername, getRandomThoughts } = require("./data"); 

connection.once("open", async () => {
  console.log("connected");

  // Create empty array to hold users
  const users = [];

  // Seed Users
  for (let i = 0; i < 10; i++) {
    const username = getRandomUsername();
    const email = `${getRandomUsername()}@email.com`;

    // Generate some random thoughts for each user
    const thoughts = getRandomThoughts(1);

    users.push({
      username,
      email,
      thoughts,
    });
  }

  const userData = await User.collection.insertMany(users);

  // Seed Thoughts (and associate with users)
  const thoughtData = await Thought.collection.insertMany(
    getRandomThoughts(20)
  ); // Seed independent thoughts

  console.info("Seeding complete! 🌱");
  process.exit(0);
});
