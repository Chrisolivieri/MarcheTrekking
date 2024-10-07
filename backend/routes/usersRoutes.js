import express from "express";
import * as usersController from "../controllers/users.controller.js";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Get all users
router.get("/", usersController.getUsers); 

// Get one user
router.get("/:id", usersController.getUser); 

// Create a new user
router.post("/", usersController.createUser);

// Update an existing user
router.put("/:id", auth, usersController.updateUser);

// Delete an existing user
router.delete("/:id", auth, usersController.deleteUser);

// Update avatar
router.patch("/:id/avatar", uploadCloudinary.single("avatar"), usersController.updateAvatar);

export default router