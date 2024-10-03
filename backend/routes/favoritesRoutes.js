import express from "express";
import * as favoritesController from "../controllers/favorites.controller.js";
import auth from "../middlewares/auth.js";

const router = express.Router();

// Get all favorites
router.get("/:userId", auth, favoritesController.getFavorites);

// Add a favorite
router.post("/", favoritesController.addFavorite);

// Delete a favorite
router.delete("/:userId", favoritesController.deleteFavorite);

export default router;
