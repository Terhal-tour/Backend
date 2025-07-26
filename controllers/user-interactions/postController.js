

import * as postService from "../../services/user-interactions/postServices.js";

/**
 * Create a new post
 * Supports optional images (uploaded to Cloudinary)
 */
// export const createPost = async (req, res) => {
//   try {
//     const { description } = req.body;

//     // If there are uploaded files, upload each to Cloudinary
//     let imageUrls = [];
//     if (req.files && req.files.length > 0) {
//       const uploadPromises = req.files.map((file) => {
//         return new Promise((resolve, reject) => {
//           const stream = cloudinary.uploader.upload_stream(
//             { folder: "terhal-posts" },
//             (error, result) => {
//               if (result) resolve(result.secure_url);
//               else reject(error);
//             }
//           );
//           stream.end(file.buffer);
//         });
//       });

//       imageUrls = await Promise.all(uploadPromises);
//     }

//     // Create the post with or without images
//     const post = await postService.createPost(
//       req.user.id,
//       description,
//       imageUrls
//     );

//     res.status(201).json(post);
//   } catch (err) {
//     console.error(err);
//     res.status(500).json({ message: "Failed to create post", error: err.message });
//   }
// };



// Create a new post
export const createPost = async (req, res) => {
  try {
    const { description } = req.body;

    let imagePaths = [];
    if (req.files && req.files.length > 0) {
      imagePaths = req.files.map(file => {
        return `${req.protocol}://${req.get('host')}/uploads/${file.filename}`;
      });
    }

    const post = await postService.createPost(req.user.id, description, imagePaths);
    res.status(201).json({ message: 'Post created successfully', post });
  } catch (err) {
    console.error(err);
    res.status(500).json({ message: 'Internal Server Error', error: err.message });
  }
};
/**
 * Get all posts
 */
export const getPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: "Failed to get posts", error: err.message });
  }
};
export const deletePost = async (req, res) => {
  try {
    const { postId } = req.params;

    const result = await postService.deletePost(postId, req.user.id);
    res.status(200).json(result);
  } catch (err) {
    console.error(err);
    res.status(400).json({ message: "Failed to delete post", error: err.message });
  }
};
/**
 * Like or unlike a post
 */
export const likePost = async (req, res) => {
  try {
    const result = await postService.toggleLike(req.params.postId, req.user.id);
    res.json(result);
  } catch (err) {
    res.status(400).json({ message: "Failed to toggle like", error: err.message });
  }
};
