import Users from "../models/users.schema.js";

export const getUsers = async (req, res) => {
  const users = await Users.find({}).sort({ name: 1 });

  res.send(users);
};

export const getUser = async (req, res) => {
  const id = req.params.id;

  try {
    const findUser = await Users.findById(id);
    res.send(findUser);
  } catch (err) {
    res.status(404).send({ error: "User not found" });
  }
};

export const createUser = async (req, res) => {
  const userData = req.body;
  const newUser = new Users(userData);

  try {
    const savedUser = await newUser.save();
    return res.status(201).send(savedUser);
  } catch (err) {
    res.status(400).send({ error: "User not created" });
  }
};

export const updateUser = async (req, res) => {
  const id = req.params.id;
  const userData = req.body;

  try {
    const updateUser = await Users.findByIdAndUpdate(id, userData, {
      new: true,
    });

    if (!updateUser) {
      return res.status(404).send({ error: "User not found" });
    }

    return res.send(updateUser);
  } catch (err) {
    res.status(400).send({ error: "User not updated" });
  }
};

export const deleteUser = async (req, res) => {
  const id = req.params.id;

  try {
    const deleteUser = await Users.findByIdAndDelete(id);

    if (!deleteUser) {
      return res.status(404).send({ error: "User not found" });
    }

    return res.send(deleteUser);
  } catch (err) {
    res.status(400).send({ error: "User not deleted" });
  }
};

export const updateAvatar = async (req, res) => {
  const id = req.params.id;
  const userData = { avatar: req.file.path };

  try {
    const updateUser = await Users.findByIdAndUpdate(id, userData, {
      new: true,
    });

    if (!updateUser) {
      return res.status(404).send({ error: "User not found" });
    }

    return res.send(updateUser);
  } catch (err) {
    res.status(400).send({ error: "User not updated" });
  }
};
