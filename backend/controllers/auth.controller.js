import User from "../models/users.schema.js";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";
import trasport from "../config/mailService.js"

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

  const sendMail = await User.findById(userCreated._id)
  if (!sendMail) {
    return res.status(404).send({ error: "User not found" });
  }

  await trasport.sendMail({
    from: "marcheTrekking@axample.com",
    to: sendMail.email,
    subject: "Registrazione avvecenuta con successo",
    text: "Ti sei registrato correttamente al sito",
    html: "<b>Registrato</b>"
  })

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

export const callBackGoogle = (req,res)=>{
  res.redirect(`${process.env.FRONTEND_URL}?token=${req.user.jwtToken}`)
}
