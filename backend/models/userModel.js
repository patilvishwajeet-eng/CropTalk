  import mongoose from "mongoose";

  const userSchema = new mongoose.Schema({
    clerkid: { type: String, required: true , unique: true}, // Clerk user ID
    email: { type: String, required: true },
    username: { type: String, required: true , unique: true}, // Unique username
    bio: { type: String, default: "" },
    connections: [
      {
        userId: { type: String, required: true }, // ID of the connected user
        // username: { type: String, required: true },
        status: { type: String, enum: ['pending', 'accepted'], default: 'pending' }, // Status of connection
        connectedAt: { type: Date, default: Date.now } // Date when the connection was made
      }
    ],
    
    connectionRequests: [
      {
        senderId: { type: String, required: true },   // ID of the person who sent request
        senderName: { type: String, required: true }, // Name of the sender
        timestamp: { type: Date, default: Date.now }  // When request was sent
      }
    ]

  }, { timestamps: true });

  const UserModel = mongoose.model("Users", userSchema);

  export default UserModel; 
  