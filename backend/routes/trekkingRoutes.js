import express from "express";
import * as trekkingRoutesController from "../controllers/trekkingRoutes.controller.js"
import uploadCloudinary from "../middlewares/uploadCloudinary.js";

const router = express.Router();

// Get all trekking Routes
router.get("/", trekkingRoutesController.getTrekkingRoutes);

// Get one trekking Route
router.get("/:id", trekkingRoutesController.getTrekkingRoute);

// Create a new Trekking Route
router.post("/", uploadCloudinary.single("image"), trekkingRoutesController.createTrekkingRoute);

// Update an existing Trekking Route
router.put("/:id", trekkingRoutesController.updateTrekkingRoute);

// Delete an existing Trekking Route
router.delete("/:id", trekkingRoutesController.deleteTrekkingRoute);

// Update image
router.patch("/:id/image", uploadCloudinary.single("image"), trekkingRoutesController.updateImage);

export default router