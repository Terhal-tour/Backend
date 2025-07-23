import express from "express";
import { createCommentController, deleteCommentController, getCommentsController } from "../../controllers/user-interactions/commentController.js";
import { authMiddleware } from "../../middlewares/authMiddleware.js";

const router = express.Router();

// Add comment
router.post("/", authMiddleware, createCommentController);

router.get("/", getCommentsController);

// Delete comment
router.delete("/:commentId", authMiddleware, deleteCommentController);

export default router;
