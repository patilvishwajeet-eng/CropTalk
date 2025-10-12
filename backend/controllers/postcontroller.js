// import asyncHandler from "express-async-handler";
// import postdata from "../models/postdata.js"; // Import Post model

// // Create a post without authentication
// export const createPost = asyncHandler(async (req, res) => {
//   const { username , content , createdAt } = req.body;
//   if(!username){
//     return res.status(400).json({message : "No username"})
//   }
//   if (!content) {
//     return res.status(400).json({ message: "Content is required" });
//   }

//   const post = new postdata({ 
//     username, 
//     content,
//     createdAt : createdAt || newDate(),
//   });
//   try {
//     const createnewpost = await post.save();
//     res.status(201).json(createnewpost);
//   } catch (err) {
//     res.status(400).json({ message: err.message });
//   }
// });

// // Get all posts
// export const getPosts = asyncHandler(async (req, res) => {
//   try {
//     const posts = await postdata.find();
//     res.status(200).json(posts);
//   } catch (error) {
//     res.status(500).json({ message: "Error fetching posts", error });
//   }
// });




import asyncHandler from "express-async-handler";
import postdata from "../models/postdata.js"; // Import Post model

// Create a post without authentication
export const createPost = asyncHandler(async (req, res) => {
  const { username, content, createdAt } = req.body;

  if (!username) {
    return res.status(400).json({ message: "No username" });
  }

  if (!content) {
    return res.status(400).json({ message: "Content is required" });
  }

  const post = new postdata({
    username,
    content,
    createdAt: createdAt || new Date(),
  });

  const createnewpost = await post.save();
  res.status(201).json(createnewpost);
});

// Get all posts
export const getPosts = asyncHandler(async (req, res) => {
  const posts = await postdata.find().sort({ createdAt: -1 });
  res.status(200).json(posts);
});

// Like a post
export const likePost = asyncHandler(async (req, res) => {
  const { postId } = req.params;

  const post = await postdata.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.likes = (post.likes || 0) + 1;
  const updatedPost = await post.save();

  res.status(200).json(updatedPost);
});

// Add a comment to a post
export const addComment = asyncHandler(async (req, res) => {
  const { postId } = req.params;
  const { comment, userId } = req.body;

  if (!comment) {
    return res.status(400).json({ message: "Comment is required" });
  }

  const post = await postdata.findById(postId);
  if (!post) {
    return res.status(404).json({ message: "Post not found" });
  }

  post.comments = post.comments || [];
  post.comments.push({
    userId: userId || null, // optional
    comment,
    createdAt: new Date(),
  });

  const updatedPost = await post.save();
  res.status(200).json(updatedPost);
});

