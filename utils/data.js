const getRandomUsername = () => {
  const usernamePrefixes = [
    "FluffyLover123",
    "WhiskersTheWise",
    "MidnightPurr",
    "SirWhiskers",
    "PawsiTiveVibes",
  ];
  const randomIndex = Math.floor(Math.random() * usernamePrefixes.length);
  return `${usernamePrefixes[randomIndex]}${Math.floor(
    Math.random() * 90 + 10
  )}`; 
};

const getRandomThoughts = (numThoughts) => {
  const thoughts = [];
  const thoughtTopics = [
    "Tuna vs. salmon... the eternal debate.",
    "Napping in sunbeams is the ultimate joy.",
    "Anyone else's cat obsessed with boxes?",
    "Chasing laser pointers... the greatest workout?",
    "Cat cuddles are the best medicine.",
    "Purring = happiness",
  ];

  for (let i = 0; i < numThoughts; i++) {
    thoughts.push({
      thoughtText: getRandomArrItem(thoughtTopics),
      username: getRandomUsername(),
    });
  }
  return thoughts;
};

// Helper to get an array of random items from an array
const getRandomArrItem = (arr) => arr[Math.floor(Math.random() * arr.length)];

module.exports = { getRandomUsername, getRandomThoughts };
