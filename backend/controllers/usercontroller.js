// import asyncHandler from 'express-async-handler';
// import logindata from '../models/logindata.js';

// export const userinfo = asyncHandler(async (req, res) => {
//     try {
//         const users = await logindata.find(); // Fetch all users from MongoDB
//         console.log(users); // ✅ Debugging
//         res.status(200).send(users); // Send data as JSON response
//     } catch (error) {
//         res.status(500).send({ message: "Error fetching user data", error });
//     }
// });

// export const userlogin = asyncHandler(async (req, res) => {     
//     const {uname}=req.params;
//     const user = await logindata.findOne({ uname: uname });
//     if(user){
//         res.send("User found...!"+"You are logged in !");
//     }
//     else{
//         res.send("User not found...!");
//     }
// });

// export const userregister = asyncHandler(async (req,res)=>{
//     const {uname,email,password} = req.body;
//     if(!uname || !email || !password){
//         res.status(400).json({message: 'Please fill all the fields'});
//     }
//     const user = await logindata.create({
//         uname,
//         email,
//         password,
//     }) 

//     try{
//         const crateuser = await user.save();
//         res.status(201).json(crateuser);
//     }
//     catch(err){
//         res.status( 400).json({message: err.message});
//     }
// })


import { users, clerkClient } from "@clerk/clerk-sdk-node"; // Correct named import
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import UserModel from "../models/userModel.js"; // Import your User model
// import clerkClient from "@clerk/clerk-sdk-node";

dotenv.config();




export const getAllUsers = asyncHandler(async (req, res) => {
  try {
    const userList = await UserModel.find();

    res.status(200).json(userList);
  } catch (error) {
    console.error("Error fetching users:", error);
    res.status(500).json({ message: "Error fetching users", error });
  }
});


//Fetch a single user by username
export const finduser = asyncHandler(async (req, res) => {
  // console.log("Received request to find user"); // Log for debugging
  try {
    const { username } = req.params; // ✅ Correct param name
    // console.log("Received username:", username); // Now it will log properly

    const user = await UserModel.findOne({ username: username });

    if (user) {
      res.status(200).json(user);
    } else {
      res.status(404).json({ message: "User not found" });
    }
  } catch (error) {
    console.error("Error fetching user:", error);
    res.status(500).json({ message: "Error fetching user", error });
  }
});



// Fetch all users from Clerk
export const userinfo = asyncHandler(async (req, res) => {
  try {
    const { clerkid } = req.params;

    // Fetch the user by their unique ID
    const user = await UserModel.findOne({ clerkid: clerkid });

    if (!user) {
      return res.status(404).json({ message: 'User not found' });
    }

    res.status(200).json(user);
  } catch (error) {
    console.error('Error fetching user:', error);
    res.status(500).json({ message: 'Error fetching user', error });
  }
});



// Get a single user's details by username
export const userlogin = asyncHandler(async (req, res) => {
  try {
    const { uname } = req.params;
    const userList = await users.getUserList(); // Fetch all users
    const user = userList.find(user => user.username === uname);

    if (user) {
      res.json({
        message: "User found! You are logged in!",
        username: user.username,
        email: user.emailAddresses[0]?.emailAddress || "No email found",
        imageUrl: user.profileImageUrl,
      });
    } else {
      res.status(404).json({ message: "User not found...!" });
    }
  } catch (error) {
    res.status(500).json({ message: "Error logging in", error });
  }
});

// User registration (not needed since Clerk handles this)
export const userregister = asyncHandler(async (req, res) => {
  res.status(400).json({ message: "User registration is managed by Clerk" });
});




//inser user
// export const insertUser = asyncHandler(async (req, res) => {
//   console.log("Received data:", req.body);

//   const { id, email, username, bio } = req.body;

//   if ( !id || !email || !username) {
//     return res.status(400).json({ message: "Missing user information" });
//   }

//   const existingUser = await UserModel.findOne({ id });

//   if (existingUser) {
//     return res.status(200).json({ message: "User already exists" });
//   }

//   const newUser = new UserModel({
//     id,
//     email,
//     username,
//     bio
//   });

//   await newUser.save();

//   res.status(201).json({ message: "User inserted successfully", user: newUser });
// });


export const insertUser = asyncHandler(async (req, res) => {
  const { clerkid, email, username, bio } = req.body;

  console.log("Received data:", req.body);  // Log for debugging

  if (!clerkid || !email || !username) {
    return res.status(400).json({ message: "Missing user information" });
  }

  // Check if user with the same clerkid already exists
  const existingUser = await UserModel.findOne({ clerkid });

  if (existingUser) {
    return res.status(200).json({ message: "User already exists" });
  }

  // Create a new user object
  const newUser = new UserModel({
    clerkid,       // Use clerkid as a unique identifier
    email,
    username,
    bio,
  });

  // Save the new user to the database
  try {
    await newUser.save();
    return res.status(201).json({ message: "User inserted successfully", user: newUser });
  } catch (error) {
    console.error("Error inserting user:", error);
    return res.status(500).json({ message: "Error inserting user", error: error.message });
  }
});


