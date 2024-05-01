const express = require("express");
const router = express.Router();
const { Thought, User } = require("../../models");

// POST to create a new thought (and push the created thought's _id to the associated user's thoughts array)
router.post('/', async (req, res) => {
    try {
        const newThought = await Thought.create(req.body);
        const updatedUser = await User.findByIdAndUpdate(
            req.body.userId, 
            { $push: { thoughts: newThought._id } },
            { new: true }
        );
        if (!updatedUser) {
            return res.status(404).json({ message: 'User not found' });
        }
        res.json(newThought); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error creating thought' });
    }
});

// PUT to update a thought by its _id
router.put('/:thoughtId', async (req, res) => {
    try {
        const updatedThought = await Thought.findByIdAndUpdate(
            req.params.thoughtId,
            req.body,
            { new: true, runValidators: true }
        );
        if (!updatedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        res.json(updatedThought);
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error updating thought' });
    }
});

// DELETE to remove a thought by its _id
router.delete('/:thoughtId', async (req, res) => {
    try {
        const deletedThought = await Thought.findByIdAndDelete(req.params.thoughtId);
        if (!deletedThought) {
            return res.status(404).json({ message: 'Thought not found' });
        }
        // Additional Logic: Remove the thought's ID from the associated user's thoughts array.
        res.json({ message: 'Thought deleted' }); 
    } catch (err) {
        console.error(err);
        res.status(500).json({ message: 'Error deleting thought' });
    }
});

// Reactions  

module.exports = router;
