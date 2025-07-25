import express from "express";
import { createPost, getPosts, likePost } from "../../controllers/user-interactions/postController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";
import { upload } from "../../middlewares/upload.js"; // لو حابب تفصل الـ multer
import { body } from "express-validator";
import { validateInput } from "../../middlewares/validateInput.js";

const router = express.Router();

router.get("/", getPosts);

router.post(
  "/",
  authMiddleware,
  upload.array("images", 5),
  body("description").notEmpty().withMessage("الوصف مطلوب"),
  validateInput,
  createPost
);

router.put("/:postId/like", authMiddleware, likePost);

export default router;
