import Comment from "../../models/Comment.js";
import Post from "../../models/Post.js";

export const createPost = async (userId, description, images) => {
  const post = new Post({ userId, description, images });
  await post.save();
  return post;
};

export const getAllPosts = async () => {
  const posts = await Post.find()
    .populate("userId", "name image")
    .sort({ createdAt: -1 })
    .lean();

  for (const post of posts) {
    post.comments = await Comment.find({ postId: post._id }).populate(
      "userId",
      "name image"
    );
  }
  return posts;
};

export const toggleLike = async (postId, userId) => {
  if (!userId) {
    throw new Error("Unauthorized: userId is required");
  }

  const post = await Post.findById(postId);
  if (!post) {
    throw new Error("Post not found");
  }

  // يمكن لأي مستخدم مسجل الدخول، بما فيهم صاحب البوست، أن يعمل Like/Unlike
  const hasLiked = post.likes.includes(userId);

  if (hasLiked) {
    post.likes.pull(userId);
  } else {
    post.likes.push(userId);
  }

  await post.save();
  return {
    success: true,
    liked: !hasLiked,
    likesCount: post.likes.length,
  };
};

