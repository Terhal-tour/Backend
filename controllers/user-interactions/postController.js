import * as postService from "../../services/user-interactions/postServices.js";

export const createPost = async (req, res) => {
  try {
    const { description } = req.body;
    const images = req.files.map((file) => file.filename);
    const post = await postService.createPost(req.user.id, description, images);
    res.status(201).json(post);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const getPosts = async (req, res) => {
  try {
    const posts = await postService.getAllPosts();
    res.json(posts);
  } catch (err) {
    res.status(500).json({ message: err.message });
  }
};

export const likePost = async (req, res) => {
  try {
    const post = await postService.toggleLike(req.params.postId, req.user.id);
    res.json(post);
  } catch (err) {
    res.status(400).json({ message: err.message });
  }
};
