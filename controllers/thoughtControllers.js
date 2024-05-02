const { Thought, User } = require('../models');

const getAllThoughts = async (req, res) => {
  try {
    const thoughtData = await Thought.find()
      .select('-__v')
      .populate({ 
        path: 'reactions',
        select: '-__v' 
      });

    res.status(200).json(thoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const getThoughtById = async (req, res) => {
  try {
    const thoughtData = await Thought.findOne({ _id: req.params.thoughtId })
      .select('-__v')
      .populate({ 
        path: 'reactions',
        select: '-__v' 
      });

    if (!thoughtData) {
      res.status(404).json({ message: 'No thought found with that ID' });
      return;
    }

    res.status(200).json(thoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const createThought = async (req, res) => {
  try {
    const newThought = await Thought.create({
      ...req.body, 
      username: req.body.username // Ensure username is attached directly to the thought
    });

    // Update the User to push the created thought's _id into their thoughts array
    const updatedUser = await User.findOneAndUpdate(
        { _id: req.body.userId },
        { $push: { thoughts: newThought._id } },
        { new: true }
    );

    if (!updatedUser) {
        res.status(404).json({ message: 'No user found with that ID' });
        return;
    }

    res.status(200).json(newThought); 
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const updateThought = async (req, res) => {
  try {
    const thoughtData = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!thoughtData) {
      res.status(404).json({ message: 'No thought found with that ID' });
      return;
    }

    res.status(200).json(thoughtData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const deleteThought = async (req, res) => {
  try {
    const thoughtData = await Thought.findOneAndDelete({ _id: req.params.thoughtId });

    if (!thoughtData) {
      res.status(404).json({ message: 'No thought found with that ID' });
      return;
    }

    // Remove thought from associated user's thoughts array
    const updatedUser = await User.findOneAndUpdate(
        { username: thoughtData.username },
        { $pull: { thoughts: req.params.thoughtId } },
        { new: true }
    );

    if (!updatedUser) {
        res.status(404).json({ message: 'No user found with that ID' });
        return;
    }

    res.status(200).json({ message: 'Thought deleted!' }); 
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const addReaction = async (req, res) => {
    try {
      const updatedThought = await Thought.findOneAndUpdate(
        { _id: req.params.thoughtId },
        { $push: { reactions: req.body } },
        { new: true, runValidators: true }
      );
      if (!updatedThought) {
        res.status(404).json({ message: "No thought found with this id!" });
      } else {
        res.json(updatedThought);
      }
    } catch (err) {
      res.status(500).json(err);
    }
};

const removeReaction = async (req, res) => {
  try {
    const updatedThought = await Thought.findOneAndUpdate(
      { _id: req.params.thoughtId },
      { $pull: { reactions: { reactionId: req.params.reactionId } } },
      { new: true }
    );

    if (!updatedThought) {
      res.status(404).json({ message: 'No thought or reaction found!' });
    } else {
      res.json(updatedThought);
    }
  } catch (err) {
    res.status(500).json(err);
  }
};

module.exports = {
  getAllThoughts,
  getThoughtById,
  createThought,
  updateThought,
  deleteThought,
  addReaction,
  removeReaction,
};