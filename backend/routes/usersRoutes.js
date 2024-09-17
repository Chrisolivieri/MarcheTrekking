import express from "express";
import * as usersController from "../controllers/users.controller.js";

const router = express.Router();

// Get all users
router.get("/", usersController.getUsers); 

// Get one user
router.get("/:id", usersController.getUser); 

// Create a new user
router.post("/", usersController.createUser);

// Update an existing user
router.put("/:id", usersController.updateUser);

// Delete an existing user
router.delete("/:id", usersController.deleteUser);

export default router