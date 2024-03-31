import errorHandler from "../errors/errorHandler.error.js";
import Post from "../models/post.model.js";

export const createPost = async (req, res, next) => {
    if (!req.user.isAdmin) {
      return next(errorHandler(403, "You are not allowed to create posts"));
    }
  if (!req.body.title || !req.body.content) {
    return next(errorHandler(403, "Please provide all the required fields"));
  }
  const slug = req.body.title
    .split(" ")
    .join("-")
    .toLowerCase()
    .replace(/[^a-zA-Z0-9-]/g, " ");
  const newpost = new Post({
    ...req.body,
    slug,
    userId: req.user.id,
  });
  try {
    const savedPost = await newpost.save();
    res.status(200).json(savedPost);
  } catch (error) {
    next(error);
  }
};
