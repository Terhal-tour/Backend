import express from "express";
import { createPost, deletePost, getPosts, likePost } from "../../controllers/user-interactions/postController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import {  uploadMemory } from "../../middlewares/upload.js"; // Multer config
import { body } from "express-validator";
import { validateInput } from "../../middlewares/validateInput.js";

const router = express.Router();

router.get("/", getPosts);

router.post(
  "/",
  authMiddleware,
  uploadMemory.array("images", 5), // max 5 images
  body("description").notEmpty().withMessage("Description is required"),
  validateInput,
  createPost
);
// DELETE /posts/:postId
router.delete("/:postId", authMiddleware, deletePost);

router.put("/:postId/like", authMiddleware, likePost);

export default router;
