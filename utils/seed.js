const connection = require("./connection"); // Use your existing connection module
const { User, Thought } = require("./models"); // Import your MeowMix models
const { getRandomUsername, getRandomThoughts } = require("./data"); // Adjust data helpers

connection.once("open", async () => {
  console.log("connected");

  // Create empty array to hold users
  const users = [];

  // Seed Users
  for (let i = 0; i < 10; i++) {
    // Seed a smaller number for testing
    const username = getRandomUsername();
    const email = `${username}@email.com`;

    // Generate some random thoughts for each user
    const thoughts = getRandomThoughts(3); // Adjust number of thoughts per user

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
