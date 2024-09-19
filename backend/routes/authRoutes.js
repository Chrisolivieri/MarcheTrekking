import express from "express";
import * as authController from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.js";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";
import passport from "passport";

const authRoute = express.Router();

// Register
authRoute.post(
  "/register",
  uploadCloudinary.single("avatar"),
  authController.register
);

// Login
authRoute.post("/login", authController.login);

// Me
authRoute.get("/me", auth, authController.me);

// Login with google
authRoute.get(
  "/login-google",
  passport.authenticate("google", { scope: ["profile", "email"] })
);

authRoute.get(
  "/callback-google",
  passport.authenticate("google", { session: false }),
  authController.callBackGoogle
);

export default authRoute;
