import Comment from "../../models/Comment.js";
import Post from "../../models/Post.js";

/**
 * Create a new post
 */
export const createPost = async (userId, description, images = []) => {
  const post = new Post({ userId, description, images });
  await post.save();
  // Re-fetch with populated userId
  const populatedPost = await Post.findById(post._id)
    .populate("userId", "name image")
    .lean();

  return populatedPost;
};

/**
 * Get all posts with user info and comments populated
 */
export const getAllPosts = async () => {
  const posts = await Post.find()
    .populate("userId", "name image")
    .sort({ createdAt: -1 })
    .lean();

  for (const post of posts) {
    post.comments = await Comment.find({ postId: post._id })
      .populate("userId", "name image")
      .lean();
  }

  return posts;
};

export const deletePost = async (postId, userId) => {
  const post = await Post.findById(postId);

  if (!post) {
    throw new Error("Post not found");
  }

  // Check if the user is the owner
  if (post.userId.toString() !== userId) {
    throw new Error("Unauthorized: You can delete only your own posts");
  }

  await post.deleteOne();
  return { success: true, message: "Post deleted successfully" };
};

/**
 * Toggle like/unlike for a post by user
 */
export const toggleLike = async (postId, userId) => {
  if (!userId) {
    throw new Error("Unauthorized: userId is required");
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  const hasLiked = post.likes.includes(userId);

  if (hasLiked) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();
  // ✅ Return the updated post with populated userId
  const updatedPost = await Post.findById(post._id)
    .populate("userId", "name image")
    .lean();


  return {
    success: true,
    liked: !hasLiked,
    likesCount: post.likes.length,
    post: updatedPost,
  };
};
