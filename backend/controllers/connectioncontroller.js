import mongoose from "mongoose";
import asyncHandler from "express-async-handler";
import dotenv from "dotenv";
import UserModel from "../models/userModel.js"; // Adjust the path as needed


export const sendConnectionRequest = async (req, res) => {
  const { clerkid } = req.params;  // Sender's Clerk ID
  const { targetClerkId } = req.body;  // Receiver's Clerk ID

  console.log("Received clerkid:", clerkid);
  console.log("Received targetClerkId:", targetClerkId);

  if (clerkid === targetClerkId) {
    return res.status(400).json({ message: "You cannot send a connection request to yourself." });
  }

  if (typeof clerkid !== 'string' || typeof targetClerkId !== 'string') {
    return res.status(400).json({ message: "Invalid user ID(s)." });
  }

  try {
    const user = await UserModel.findOne({ clerkid });
    const targetUser = await UserModel.findOne({ clerkid: targetClerkId });

    console.log("User found:", user);
    console.log("Target user found:", targetUser);

    if (!user || !targetUser) {
      return res.status(404).json({ message: "User or target user not found." });
    }

    // Check if the sender's ID already exists in the target's connectionRequests
    if (targetUser.connectionRequests.includes(clerkid)) {
      return res.status(400).json({ message: "Connection request already sent." });
    }

    // Add the sender's ID to the target user's connectionRequests
    await UserModel.updateOne(
      { clerkid: targetClerkId },
      { $addToSet: { connectionRequests: clerkid } }
    );

    // Optional: Add target ID to sender's outgoingRequests
    await UserModel.updateOne(
      { clerkid },
      { $addToSet: { outgoingRequests: targetClerkId } }
    );

    res.status(200).json({ message: "Connection request sent." });
  } catch (error) {
    console.error("Error sending connection request:", error);
    res.status(500).json({ message: "Error sending connection request.", error: error.message });
  }
};


//send request using username
// export const sendConnectionRequestByUsername = async (req, res) => {
//   const { senderUsername } = req.body;  // The sender's username (this should come from the request body)
//   const { receiverUsername } = req.params;  // The receiver's username (this comes from the URL parameter)
//   console.log("Received senderUsername:", senderUsername);
//   console.log("Received receiverUsername:", receiverUsername); // Debug: check what senderid looks like
//   try {
//     // Find the sender and receiver users in the database
//     // const sender = await UserModel.findOne({ username: senderUsername });
//     // const receiver = await UserModel.findOne({ username: receiverUsername });

//     const sender = await UserModel.findOne({ username: new RegExp(`^${senderUsername}$`, 'i') });
//     const receiver = await UserModel.findOne({ username: new RegExp(`^${receiverUsername}$`, 'i') });

//     // Check if both users exist
//     if (!sender || !receiver) {
//       return res.status(404).json({ message: "User not found" });
//     }

//     // Check if the sender has already sent a request to the receiver
//     if (receiver.connectionRequests.includes(sender.username)) {
//       return res.status(400).json({ message: "Request already sent" });
//     }

//     // Add the sender's username to the receiver's connectionRequests list
//     receiver.connectionRequests.push(sender.username);

//     // Save the receiver's updated data
//     await receiver.save();

//     // Respond with success message
//     return res.status(200).json({ message: "Connection request sent successfully!" });
//   } catch (error) {
//     console.error("Error sending connection request:", error);
//     return res.status(500).json({ message: "Error sending connection request", error: error.message });
//   }
// };



export const sendConnectionRequestByUsername = async (req, res) => {
  const { senderUsername } = req.body;  // The sender's username (this should come from the request body)
  const { receiverUsername } = req.params;  // The receiver's username (this comes from the URL parameter)

  try {
    // Find the sender and receiver users in the database
    const sender = await UserModel.findOne({ username: new RegExp(`^${senderUsername}$`, 'i') });
    const receiver = await UserModel.findOne({ username: new RegExp(`^${receiverUsername}$`, 'i') });

    // Check if both users exist
    if (!sender || !receiver) {
      return res.status(404).json({ message: "User not found" });
    }

    // Check if the sender has already sent a request to the receiver
    const alreadySentRequest = receiver.connectionRequests.some(request => request.senderId === sender.clerkid);  // Use Clerk ID
    if (alreadySentRequest) {
      return res.status(400).json({ message: "Request already sent" });
    }

    // Create a new connection request object
    const newRequest = {
      senderId: sender.clerkid,  // Use Clerk ID
      senderName: sender.username,
      timestamp: new Date()
    };

    // Add the new request to the receiver's connectionRequests list
    receiver.connectionRequests.push(newRequest);

    // Save the receiver's updated data
    await receiver.save();

    // Respond with success message
    return res.status(200).json({ message: "Connection request sent successfully!" });
  } catch (error) {
    console.error("Error sending connection request:", error);
    return res.status(500).json({ message: "Error sending connection request", error: error.message });
  }
};


//accept request using id
// POST /api/users/:userId/accept-request

// export const acceptConnectionRequest = async (req, res) => {
//   const { clerkid } = req.params; // The current user (accepting the request)
//   const { requesterClerkId } = req.body; // The one who sent the request

//   // Prevent accepting your own request
//   if (clerkid === requesterClerkId) {
//     return res.status(400).json({ message: "You cannot accept your own request." });
//   }

//   try {
//     // Find the user who is accepting the request
//     const user = await UserModel.findOne({ clerkid });
//     // Find the user who sent the connection request
//     const requesterUser = await UserModel.findOne({ clerkid: requesterClerkId });

//     if (!user || !requesterUser) {
//       return res.status(404).json({ message: "User not found." });
//     }

//     // Check if the request actually exists in connectionRequests
//     const request = user.connectionRequests.find(req => req.senderId === requesterClerkId);
//     if (!request) {
//       return res.status(400).json({ message: "No pending connection request from this user." });
//     }

//     // Now you can access the data directly from the request object
//     console.log("Request Data:", request);  // Debugging the request data

//     // Add the sender (requester) to the user's connections
//     user.connections.push({
//       userId: requesterClerkId,
//       status: 'accepted',
//       connectedAt: new Date()
//     });

//     requesterUser.connections.push({
//       userId: clerkid,
//       status: 'accepted',
//       connectedAt: new Date()
//     });

//     // Remove the request from the connectionRequests array
//     user.connectionRequests = user.connectionRequests.filter(req => req.senderId !== requesterClerkId);

//     // Save the updated user and requester user documents
//     await user.save();
//     await requesterUser.save();

//     return res.status(200).json({ message: "Connection request accepted." });
//   } catch (error) {
//     console.error(error);
//     return res.status(500).json({ message: "Error accepting connection request.", error: error.message });
//   }
// };

// export const acceptConnectionRequest = async (req, res) => {
//   try {
//     const { userclerkid } = req.params; // Receiver (the user accepting the request)
//     const { requesterClerkId } = req.body; // Sender (the user sending the request)

//     console.log("Accepting connection request", { userclerkid, requesterClerkId });

//     // Fetch the receiver and sender from the database
//     const receiver = await UserModel.findOne({ clerkid: userclerkid });
//     const sender = await UserModel.findOne({ clerkid: requesterClerkId });

//     if (!receiver || !sender) {
//       return res.status(404).json({ error: "User not found" });
//     }

//     // Check if the request exists
//     const connectionRequest = receiver.connectionRequests.find(
//       (request) => request.senderId === requesterClerkId
//     );

//     if (!connectionRequest) {
//       return res.status(400).json({ message: "No pending request found" });
//     }

//     // Add the sender and receiver to each other's connections if not already connected
//     if (!receiver.connections.includes(requesterClerkId)) {
//       receiver.connections.push(requesterClerkId); // Add sender to receiver's connections
//     }
//     if (!sender.connections.includes(userclerkid)) {
//       sender.connections.push(userclerkid); // Add receiver to sender's connections
//     }

//     // Remove the accepted request from the connectionRequests array
//     receiver.connectionRequests = receiver.connectionRequests.filter(
//       (request) => request.senderId !== requesterClerkId
//     );

//     // Save changes to both receiver and sender
//     await receiver.save();
//     await sender.save();

//     res.status(200).json({ message: "Connection request accepted successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error accepting connection request" });
//   }
// };

export const acceptConnectionRequest = async (req, res) => {
  try {
    const { userclerkid } = req.params; // Receiver (the user accepting the request)
    const { requesterClerkId } = req.body; // Sender (the user sending the request)

    console.log("Accepting connection request", { userclerkid, requesterClerkId });

    // Fetch the receiver and sender from the database
    const receiver = await UserModel.findOne({ clerkid: userclerkid });
    const sender = await UserModel.findOne({ clerkid: requesterClerkId });
    console.log("Receiver User:", receiver); // Debugging the receiver user
    console.log("Sender User:", sender); // Debugging the sender user
    if (!receiver || !sender) {
      return res.status(404).json({ error: "User not found" });
    }

    // Check if the request exists
    const connectionRequest = receiver.connectionRequests.find(
      (request) => request.senderId === requesterClerkId
    );

    if (!connectionRequest) {
      return res.status(400).json({ message: "No pending request found" });
    }

    // Add the sender and receiver to each other's connections if not already connected
    if (!receiver.connections.some(conn => conn.userId === requesterClerkId)) {
      receiver.connections.push({
        userId: requesterClerkId, // Sender ID
        username: sender.username, // Sender's username
        status: 'accepted', // Status of the connection
        connectedAt: new Date() // Timestamp of when the connection was accepted
      });
    }
    
    if (!sender.connections.some(conn => conn.userId === userclerkid)) {
      sender.connections.push({
        userId: userclerkid, // Receiver ID
        username: receiver.username, // Receiver's username
        status: 'accepted', // Status of the connection
        connectedAt: new Date() // Timestamp of when the connection was accepted
      });
    }

    // Remove the accepted request from the connectionRequests array
    receiver.connectionRequests = receiver.connectionRequests.filter(
      (request) => request.senderId !== requesterClerkId
    );

    // Save changes to both receiver and sender
    await receiver.save();
    await sender.save();

    res.status(200).json({ message: "Connection request accepted successfully" });
  } catch (error) {
    console.error(error);
    res.status(500).json({ error: "Error accepting connection request" });
  }
};




//reject request using id
//reject request
export const rejectConnectionRequest = async (req, res) => {
  const { senderid } = req.params; 
  const { receiverClerkId } = req.body; 

  const trimmedSenderId = senderid.trim();

  console.log("Rejecting connection request", { trimmedSenderId, receiverClerkId });

  try {
    const receiverUser = await UserModel.findOne({ clerkid: receiverClerkId });

    if (!receiverUser) {
      return res.status(404).json({ message: "Receiver user not found." });
    }

    console.log("Receiver User's Connection Requests:", receiverUser.connectionRequests);
    console.log("Sender ID to reject:", trimmedSenderId);

    const requestExists = receiverUser.connectionRequests.some(
      (request) => request.senderId === trimmedSenderId
    );

    if (!requestExists) {
      return res.status(400).json({ message: "No pending request found." });
    }

    // 🔥 Here we pull using { senderId: value }
    await UserModel.updateOne(
      { clerkid: receiverClerkId },
      { $pull: { connectionRequests: { senderId: trimmedSenderId } } }
    );

    res.status(200).json({ message: "Connection request rejected successfully." });
  } catch (error) {
    console.error("Error rejecting request:", error);
    res.status(500).json({ error: "Server error" });
  }
};




// export const rejectConnectionRequest = async (req, res) => {
//   try {
//     const { clerkid } = req.user;
//     const { requesterClerkId } = req.body;

//     const receiver = await User.findOne({ clerkid : clerkid });

//     if (!receiver) {
//       return res.status(404).json({ error: "Receiver not found" });
//     }

//     // Filter out the connection request with matching senderId
//     receiver.connectionRequests = receiver.connectionRequests.filter(
//       (request) => request.senderId !== requesterClerkId
//     );

//     await receiver.save();

//     res.status(200).json({ message: "Connection request rejected successfully" });
//   } catch (error) {
//     console.error(error);
//     res.status(500).json({ error: "Error rejecting connection request" });
//   }
// };



//fetch requests using id

export const fetchConnectionRequests = async (req, res) => {
  const { clerkid } = req.params; // Clerk ID passed in the URL
  console.log("Received clerkid:", clerkid); // For debugging

  try {
    const user = await UserModel.findOne({ clerkid });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Get all sender IDs from the connectionRequests array
    const senderIds = user.connectionRequests.map(request => request.senderId);

    // Find all users who have sent requests
    const requestSenders = await UserModel.find({
      clerkid: { $in: senderIds }
    });

    // Format the request sender details
    const formattedRequests = requestSenders.map(sender => ({
      senderId: sender.clerkid,
      senderName: sender.username,
      bio: sender.bio,
      timestamp: user.connectionRequests.find(request => request.senderId === sender.clerkid).timestamp // Match senderId to timestamp
    }));

    res.status(200).json(formattedRequests);
  } catch (error) {
    console.error("Error fetching connection requests:", error);
    res.status(500).json({ message: "Internal server error", error: error.message });
  }
};



//fetch all requests using username
export const fetchAllrequestsByUsername = async (req, res) => {
  const { username } = req.params; // username from URL

  try {
    // Find user (case-insensitive)
    const user = await UserModel.findOne({ username: new RegExp(`^${username}$`, 'i') });

    if (!user) {
      return res.status(404).json({ message: "User not found" });
    }

    // Send the list of connection requests
    return res.status(200).json({ connectionRequests: user.connectionRequests });

  } catch (error) {
    console.error("Error fetching connection requests:", error);
    return res.status(500).json({ message: "Error fetching connection requests", error: error.message });
  }
};





//fetch all the connections using id 
// export const fetchAcceptedConnections = async (req, res) => {
//   try {
//     const { userclerkid } = req.params;  // Get the logged-in user's clerkid from the request parameters
//     console.log("Received clerkid:", req.params.userclerkid);  // For debugging, to confirm we're getting the clerkid

//     const trimmedClerkid = userclerkid.trim();
//     // Step 1: Find the user (Rocky) by their clerkid
//     const user = await UserModel.findOne({clerkid : trimmedClerkid });  // Find the user by clerkid
//     console.log("User found:", user);  // For debugging, to see the user object
//     // Step 2: Check if the user (Rocky) exists
//     if (!user) {
//       return res.status(404).json({ message: "User not found." });  // If user doesn't exist, send an error response
//     }

//     // Step 3: Return all connections (no need to filter for accepted)
//     console.log("Connections:", user.connections);  // For debugging, to see all the connections

//     // Step 4: Send all connections in the response
//     res.status(200).json({ connections: user.connections });  // Send all connections as the response
//   } catch (error) {
//     console.error("Error fetching connections:", error);  // Log any errors that occur
//     res.status(500).json({ message: "Server Error" });  // Send a server error response
//   }
// };


export const fetchAcceptedConnections = async (req, res) => {
  try {
    const { userclerkid } = req.params;
    console.log("Received clerkid:", userclerkid);

    const trimmedClerkid = userclerkid.trim();

    // Step 1: Find the current user
    const user = await UserModel.findOne({ clerkid: trimmedClerkid });
    console.log("User found:", user);

    if (!user) {
      return res.status(404).json({ message: "User not found." });
    }

    const connectionsWithUsernames = await Promise.all(
      user.connections.map(async (conn) => {
        try {
          const connectedUser = await UserModel.findOne({ clerkid: conn.userId });  // Fetch connected user's data
          return {
            ...conn.toObject(),  // If conn is a mongoose object, convert to plain object
            username: connectedUser ? connectedUser.username : "Unknown User",  // Attach username
          };
        } catch (err) {
          console.error("Error fetching connected user:", err);
          return {
            ...conn.toObject(),
            username: "Unknown User",
          };
        }
      })
    );

    res.status(200).json({ connections: connectionsWithUsernames });
  } catch (error) {
    console.error("Error fetching connections:", error);
    res.status(500).json({ message: "Server Error" });
  }
};
