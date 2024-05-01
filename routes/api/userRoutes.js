const express = require("express");
const router = express.Router();
const { User } = require("../../models");

// GET all users
router.get("/", async (req, res) => {
  try {
    const users = await User.find().populate("thoughts friends");
    res.json(users);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching users" });
  }
});

// Get a single user
router.get("/:userId", async (req, res) => {
  try {
    const user = await User.findById(req.params.userId).populate(
      "thoughts friends"
    );
    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }
    res.json(user);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: "Error fetching user" });
  }
});

// POST to create a new user
router.post('/', async (req, res) => {
    try {
        const newUser = await User.create(req.body);
        res.json(newUser); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating user' });
    }
});

// PUT to update a user by its _id
router.put('/:userId', async (req, res) => {
    try {
        const updatedUser = await User.findByIdAndUpdate(
            req.params.userId, 
            req.body, 
            { new: true, runValidators: true } 
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(updatedUser);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating user' });
    }
});

// DELETE to remove a user by its _id
router.delete('/:userId', async (req, res) => {
    try {
        const deletedUser = await User.findByIdAndDelete(req.params.userId);
        if (!deletedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        // Cascading deletes for Thoughts when removing a user.
        res.json({ message: 'User deleted' });
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting user' });
    }
});

// POST to add a new friend to a user's friend list
router.post('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $addToSet: { friends: req.params.friendId } }, // $addToSet ensures no duplicates
            { new: true } 
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error adding friend' });
    }
});

// DELETE to remove a friend from a user's friend list
router.delete('/:userId/friends/:friendId', async (req, res) => {
    try {
        const user = await User.findByIdAndUpdate(
            req.params.userId,
            { $pull: { friends: req.params.friendId } },  // $pull removes from array
            { new: true } 
        );
        if (!user) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(user); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error removing friend' });
    }
});

module.exports = router;
