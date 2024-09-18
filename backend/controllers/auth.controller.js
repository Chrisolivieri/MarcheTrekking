import User from "../models/users.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

export const register = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }); // check if user already exists

  if (user) return res.status(400).send({ error: "User already exists" });

  const newUser = new User({
    name: req.body.name,
    surname: req.body.surname,
    email: req.body.email,
    age: req.body.age,
    avatar: req.file ? req.file.path : null,
    password: await bcrypt.hash(req.body.password, 10), // hash password
    verifiedAt: new Date(),
  });

  const userCreated = await newUser.save();
  res.send(userCreated);
};

export const login = async (req, res) => {
  const user = await User.findOne({ email: req.body.email }).select(
    "+password"
  ); // check if user exists

  if (!user) return res.status(401).send({ error: "Wrong credentials" }); // if user doesn't exist return a generic error

  if (!(await bcrypt.compare(req.body.password, user.password))) {
    return res.status(401).send({ error: "Wrong credentials" }); // if password doesn't match return a generic error
  }
  
  // if everything is ok generate a token
  jwt.sign(
    { id: user._id },
    process.env.JWT_SECRET,
    { expiresIn: "1d" },
    (err, jwtToken) => {
      if (err) return res.status(500).send({ error: "Failed to login" });

      return res.send({ token: jwtToken });
    }
  );
};

export const me = (req, res) => {
  return res.send(req.authUser);
};
