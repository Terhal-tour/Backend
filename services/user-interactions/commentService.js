import Comment from "../../models/Comment.js";
import Post from "../../models/Post.js";

export const createComment = async ({ postId, userId, text }) => {
  const comment = new Comment({ postId, userId, text });
  await comment.save();
  return comment;
};
export const getComments = async (postId) => {
  const filter = {};
  if (postId) {
    filter.postId = postId;
  }
  const comments = await Comment.find(filter).sort({ createdAt: -1 });
  return comments;
};
export const deleteComment = async ({ commentId, userId }) => {
  const comment = await Comment.findById(commentId);
  if (!comment) throw new Error("Comment not found");

  const post = await Post.findById(comment.postId);
  if (!post) throw new Error("Post not found");

  const isOwner = comment.userId.toString() === userId.toString();
  const isPostOwner = post.userId.toString() === userId.toString();

  if (!isOwner && !isPostOwner) {
    throw new Error("Not authorized to delete this comment");
  }

  await comment.deleteOne();
  return { success: true };
};
