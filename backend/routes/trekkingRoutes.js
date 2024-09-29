import express from "express";
import * as trekkingRoutesController from "../controllers/trekkingRoutes.controller.js";
import uploadCloudinary from "../middlewares/uploadCloudinary.js";
import auth from "../middlewares/auth.js";
import * as commentController from "../controllers/comment.controller.js";

const router = express.Router();

// Get all trekking Routes
router.get("/", trekkingRoutesController.getTrekkingRoutes);

// Get one trekking Route
router.get("/:id", trekkingRoutesController.getTrekkingRoute);

// Create a new Trekking Route
router.post(
  "/",
  uploadCloudinary.array("images"),
  trekkingRoutesController.createTrekkingRoute
);

// Update an existing Trekking Route
router.put("/:id", auth, trekkingRoutesController.updateTrekkingRoute);

// Delete an existing Trekking Route
router.delete("/:id", auth, trekkingRoutesController.deleteTrekkingRoute);

// Update image
// router.patch(
//   "/:id/image",
//   auth,
//   uploadCloudinary.single("image"),
//   trekkingRoutesController.updateImage
// );

// Get all trekking route's comments
router.get("/:id/comments/", commentController.readAllComments);

// Get One comment
router.get("/:id/comments/:id", commentController.readOneComment);

// Create e new comment in a trekking route
router.post("/:id/comments", auth, commentController.createComment);

// Edit a comment
router.put("/:id/comments/:id", auth, commentController.editComment);

// Delete a comment
router.delete("/:id/comments/:id", auth, commentController.deleteComment);

export default router;
