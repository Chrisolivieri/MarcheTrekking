import GoogleStrategy from "passport-google-oauth20";
import User from "../models/users.schema.js";
import jwt from "jsonwebtoken";

const googleStrategy = new GoogleStrategy(
  {
    clientID: process.env.GOOGLE_CLIENT_ID,
    clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    callbackURL: `${process.env.HOST}:${process.env.PORT}${process.env.GOOGLE_CALLBACK}`,
  },

  async function (accessToken, refreshToken, profile, passportNext) {

    const {
      given_name: name,
      family_name: surname,
      email,
      sub: googleId,
      picture: avatar,
    } = profile._json;

    let user = await User.findOne({ googleId }); // check user in Db

    // if user doesn't exist in Db create it
    if (!user) {
      const newUser = new User({
        googleId,
        name,
        surname,
        email,
        avatar,
      });

      user = await newUser.save();
    }

    // jwt token
    jwt.sign(
      { id: user._id },
      process.env.JWT_SECRET,
      { expiresIn: "1d" },
      (err, jwtToken) => {
        if (err) return res.status(500).send({ error: "Failed to login" });
        return passportNext(null, { jwtToken });
      }
    );
  }
);

export default googleStrategy;
