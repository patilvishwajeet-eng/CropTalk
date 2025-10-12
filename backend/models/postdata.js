// import mongoose from 'mongoose'

// const postSchema = new mongoose.Schema({
//   userId: { 
//     type: mongoose.Schema.Types.ObjectId, 
//     ref: "User", 
//     required: true 
//   }, // Reference to the User model
//   content: { 
//     type: String, 
//     required: true, 
//     trim: true 
//   }, // Post text
//   createdAt: { 
//     type: Date, 
//     default: Date.now 
//   }, // Timestamp for post creation
//   likes: [
//     { type: mongoose.Schema.Types.ObjectId, ref: "User" }
//   ], // Array of user IDs who liked the post
//   comments: [
//     {
//       userId: { type: mongoose.Schema.Types.ObjectId, ref: "User" }, 
//       comment: { type: String, required: true },
//       createdAt: { type: Date, default: Date.now }
//     }
//   ], // Array of comment objects
//   shares: { 
//     type: Number, 
//     default: 0 
//   } // Share count
// });

// export default mongoose.model("postdata", postSchema);




import mongoose from 'mongoose';
const commentSchema = new mongoose.Schema({
  userId: {
    type: mongoose.Schema.Types.ObjectId,
    ref: 'users', // Assuming you have a users collection
    required: true
  },
  comment: {
    type: String,
    required: true,
    trim: true
  },
  createdAt: {
    type: Date,
    default: Date.now
  } 
});

const postSchema = new mongoose.Schema({
  // authorId: {
  //   type: mongoose.Schema.Types.ObjectId,
  //   ref: 'users', // Reference to user who posted
  //   required: true
  // },
  username: {
    type: String,
    required: true
  },
  content: {
    type: String,
    required: true,
    trim: true
  },
  tags: {
    type: [String],
    default: []
  },
  likes: {
    type: Number,
    default: 0
  },
  comments: {
    type: [commentSchema],
    default: []
  },
  createdAt: {
    type: Date,
    default: Date.now
  }
});
export default mongoose.model('postdata', postSchema);


