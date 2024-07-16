const user = require("../models/user.model");

function addUser(req, rep) {
  const newUser = new user(req.body);
  newUser
    .save()
    .then((newUserResult) => {
      rep.send(newUserResult);
    })
    .catch((err) => {
      rep.status(500).send(err);
    });
}

async function getUsers(req, rep) {
  try {
    const users = await users.find();
    if (users.length === 0) {
      return rep.status(404).send("No user found");
    }
    rep.send(users);
  } catch (error) {
    rep.status(500).send(error);
  }
}

async function updateUser(req, rep) {
  try {
    const updatedUser = await user.findByIdAndUpdate(req.params.id, req.body, {
      new: true,
    });
    if (!updatedUser) {
      return rep.status(404).send("User not found");
    }
    rep.send(updatedUser);
  } catch (error) {
    rep.status(500).send(error);
  }
}

async function getUser(req, rep) {
  try {
    const userResult = await user.findById(req.params.id);
    if (!userResult) {
      return rep.status(404).send("User not found");
    }
    rep.send(userResult);
  } catch (error) {
    rep.status(500).send(error);
  }
}

async function removeUser(req, rep) {
  try {
    const deletedUser = await user.findByIdAndDelete(req.params.id);
    if (!deletedUser) {
      return rep.status(404).send("User not found");
    }
    rep.status(203).send("");
  } catch (error) {
    rep.status(500).send(error);
  }
}

module.exports = { getUser, addUser, getUsers, removeUser, updateUser };
