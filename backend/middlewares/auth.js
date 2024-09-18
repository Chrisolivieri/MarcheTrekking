import jwt from "jsonwebtoken";
import User from "../models/users.schema.js";

export default (req, res, next) => {
  if (!req.headers.authorization)
    return res.status(401).send({ error: "Unauthorized" });
  const parts = req.headers.authorization.split(" "); // Bearer <token>

  if (parts.length != 2) {
   
    return res.status(401).send({ error: "Unauthorized2" }); //invalid format
  }

  if (parts[0] != "Bearer")
    return res.status(401).send({ error: "Unauthorized3" }); // if the first part of format is not Bearer res status 401

  const jwtToken = parts[1];
  // verify token
  jwt.verify(jwtToken, process.env.JWT_SECRET, async (err, payload) => {
    if (err) return res.status(401).send({ error: "Unauthorized4" });
    const user = await User.findById(payload.id);
    if (!user) return res.status(401).send({ error: "Unauthorized5" });

    req.authUser = user; // store the user in the request
    next();
  });
};
