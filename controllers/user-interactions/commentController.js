// import { createComment, deleteComment, getComments } from "../../services/user-interactions/commentService.js";

// export const createCommentController = async (req, res) => {
//   try {
//     const { postId, text } = req.body;

//     if (!postId || !text) {
//       return res.status(400).json({ message: "postId and text are required" });
//     }

//     const comment = await createComment({
//       postId,
//       userId: req.user.id,
//       text,
//     });

//     res.status(201).json(comment);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message || "Server error" });
//   }
// };

// export const getCommentsController = async (req, res) => {
//   try {
//     const { postId } = req.query; // optional: filter by post
//     const comments = await getComments(postId);
//     res.json(comments);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: err.message || "Server error" });
//   }
// };

// export const deleteCommentController = async (req, res) => {
//   try {
//     const { commentId } = req.params;

//     await deleteComment({
//       commentId,
//       userId: req.user.id,
//     });

//     res.json({ message: "Comment deleted successfully" });
//   } catch (err) {
//     console.error(err);
//     res.status(403).json({ message: err.message || "Forbidden" });
//   }
// };
import { createComment, deleteComment, getComments } from "../../services/user-interactions/commentService.js";
import Comment from "../../models/Comment.js"; // Make sure this path is correct

export const createCommentController = async (req, res) => {
  try {
    const { postId, text } = req.body;

    if (!postId || !text) {
      return res.status(400).json({ message: "postId and text are required" });
    }

    const newComment = await createComment({
      postId,
      userId: req.user.id,
      text,
    });

    // Populate user name from Comment model
    const populatedComment = await Comment.findById(newComment._id)
      .populate("userId", "name");

    res.status(201).json(populatedComment);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const getCommentsController = async (req, res) => {
  try {
    const { postId } = req.query;
    const comments = await getComments(postId);

    // Optional: populate user name for all comments
    const populated = await Comment.find({ postId })
      .populate("userId", "name")
      .sort({ createdAt: -1 });

    res.json(populated);
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: err.message || "Server error" });
  }
};

export const deleteCommentController = async (req, res) => {
  try {
    const { commentId } = req.params;

    await deleteComment({
      commentId,
      userId: req.user.id,
    });

    res.json({ message: "Comment deleted successfully" });
  } catch (err) {
    console.error(err);
    res.status(403).json({ message: err.message || "Forbidden" });
  }
};
