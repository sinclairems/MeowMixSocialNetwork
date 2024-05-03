const { User } = require("../models");
const { ObjectId } = require("mongoose").Types;

const getAllUsers = async (req, res) => {
  try {
    const userData = await User.find()
      .select("-__v") // Exclude the version field
      .populate({
        path: "friends",
        select: "-__v",
      })
      .populate({
        path: "thoughts",
        select: "-__v",
      });

    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const getUserById = async (req, res) => {
  try {
    const userData = await User.findOne({ _id: req.params.userId })
      .select("-__v")
      .populate({
        path: "friends",
        select: "-__v",
      })
      .populate({
        path: "thoughts",
        select: "-__v",
      });

    if (!userData) {
      res.status(404).json({ message: "No user found with that ID" });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const createUser = async (req, res) => {
  try {
    const userData = await User.create(req.body);
    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const updateUser = async (req, res) => {
  try {
    const userData = await User.findOneAndUpdate(
      { _id: req.params.userId },
      req.body,
      { new: true, runValidators: true }
    );

    if (!userData) {
      res.status(404).json({ message: "No user found with that ID" });
      return;
    }

    res.status(200).json(userData);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const deleteUser = async (req, res) => {
  try {
    const userData = await User.findOneAndDelete({ _id: req.params.userId });

    if (!userData) {
      res.status(404).json({ message: "No user found with that ID" });
      return;
    }

    res.status(200).json({ message: "User and associated thoughts deleted!" });
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const addFriend = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $addToSet: { friends: req.params.friendId } }, // Use $addToSet to avoid duplicate friends
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "No user found with that ID" });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

const removeFriend = async (req, res) => {
  try {
    const updatedUser = await User.findOneAndUpdate(
      { _id: req.params.userId },
      { $pull: { friends: req.params.friendId } },
      { new: true }
    );

    if (!updatedUser) {
      res.status(404).json({ message: "No user found with that ID" });
      return;
    }

    res.status(200).json(updatedUser);
  } catch (err) {
    console.error(err);
    res.status(500).json(err);
  }
};

module.exports = {
  getAllUsers,
  getUserById,
  createUser,
  updateUser,
  deleteUser,
  addFriend,
  removeFriend,
};
