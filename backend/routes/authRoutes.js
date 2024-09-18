import express from "express";
import * as authController from "../controllers/auth.controller.js";
import auth from "../middlewares/auth.js";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";

const authRoute = express.Router();

// Register
authRoute.post("/register", uploadCloudinary.single("avatar"), authController.register);

// Login
authRoute.post("/login", authController.login);

// Me
authRoute.get("/me", auth, authController.me);

export default authRoute