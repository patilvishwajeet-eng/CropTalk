// import express from 'express';
// import dotenv from 'dotenv';
// import users from './routes/users.js';
// import dbConnect from './config/dbconnect.js';
// import cors from 'cors';
// import dummy from './dummy.js';
// import postRoutes from './routes/posts.js'
// import posts from './routes/posts.js'

// // import { ClerkExpressWithAuth } from '@clerk/clerk-sdk-node';
// dotenv.config();
// const app = express();
// const port = process.env.PORT || 5000;

// dbConnect();

// // const clerkAuthMiddleware = ClerkExpressWithAuth();
// app.use(cors());
// app.use(express.json());
// app.use('/api/users', users)
// app.use('/api/posts',posts)

// app.get('/api/jokes', (req, res) => {
//     res.send(jokes);
// })

// app.get('/', (req, res) => {
//     res.send("Hello world!!");
// })

// app.get("/api/dummy", (req, res) => {
//     res.json(dummy);
//     console.log(dummy);
// });


// app.listen(port, () => {
//     console.log(`Server is running on port ${port}`);
// })





import express from 'express';
import dotenv from 'dotenv';
import users from './routes/users.js';
import dbConnect from './config/dbconnect.js';
import cors from 'cors';
import dummy from './dummy.js';
import posts from './routes/posts.js';
import connections from './routes/connections.js'; // Adjust this to your actual connection routes
import { createServer } from 'http';
import { Server } from 'socket.io';
import bodyParser from 'body-parser';
import chatdata from './models/chatdata.js'; // Adjust the path if needed

dotenv.config();

const app = express();
const port = process.env.PORT || 5000;

// 🧱 Wrap express app in an HTTP server
const httpServer = createServer(app);

// 🔌 Initialize socket.io
const io = new Server(httpServer, {
  cors: {
    origin: "http://localhost:5173", // your frontend origin
    methods: ["GET", "POST"],
  },
});

// 🌐 Connect to MongoDB
dbConnect();

// 🌐 Middlewares
app.use(cors());
app.use(express.json());
app.use(bodyParser.json());
// 📦 API routes
app.use('/api/users', users);
app.use('/api/posts', posts);
app.use('/api/connections', connections); // Adjust this to your actual connection routes
// 🔹 Sample route
app.get('/api/jokes', (req, res) => {
  res.send(jokes);
});


// 🧠 Socket.IO logic
// io.on("connection", (socket) => {
//   console.log(`🟢 User connected: ${socket.id}`);

//   // Join a private room based on user ID
//   socket.on("join", (userId) => {
//     socket.join(userId);
//     console.log(`${userId} joined their private room`);
//   });

//   // Handle message sending
//   socket.on("send_message", (data) => {
//     const { senderId, receiverId, message } = data;
//     console.log(`📤 Message from ${senderId} to ${receiverId}: ${message}`);

//     // Emit message to the receiver’s room
//     io.to(receiverId).emit("receive_message", {
//       senderId,
//       message,
//       time: new Date().toLocaleTimeString()
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log(`🔴 User disconnected: ${socket.id}`);
//   });
// });

//previoys best 
// io.on("connection", (socket) => {
//   console.log(`🟢 User connected: ${socket.id}`);

//   // Join a private room based on user ID (receiver and sender)
//   socket.on("join", (userId) => {
//     socket.join(userId);
//     console.log(`${userId} joined their private room`);

//     // Optionally, you can emit a confirmation back to the user.
//     socket.emit("joined", `You have joined the room: ${userId}`);
//   });

//   // Handle message sending
//   socket.on("send_message", (data) => {
//     const { senderId, receiverId, message } = data;
//     console.log(`📤 Message from ${senderId} to ${receiverId}: ${message}`);

//     // Emit message to the receiver’s room
//     io.to(receiverId).emit("receive_message", {
//       senderId,
//       message,
//       time: new Date().toLocaleTimeString(),
//     });

//     // Optionally, also send a confirmation back to the sender
//     io.to(senderId).emit("message_sent", {
//       message,
//       time: new Date().toLocaleTimeString(),
//     });
//   });

//   socket.on("disconnect", () => {
//     console.log(`🔴 User disconnected: ${socket.id}`);
//   });
// });



//previoys best
// let onlineUsers = {};  // Keeps track of online users (userId -> socketId)
// let offlineMessages = {};  // Keeps track of offline messages (receiverId -> messages)

// io.on("connection", (socket) => {
//   console.log(`🟢 User connected: ${socket.id}`);

//   // Join a private room based on user ID (receiver and sender)
//   socket.on("join", (userId) => {
//     socket.join(userId);
//     onlineUsers[userId] = socket.id;  // Mark user as online
//     console.log(`${userId} joined their private room with socketId: ${socket.id}`);

//     // Check if there are any offline messages for the user
//     if (offlineMessages[userId]) {
//       console.log(`📥 Sending offline messages to ${userId}`);
//       offlineMessages[userId].forEach((message) => {
//         socket.emit("receive_message", message);  // Send stored messages
//       });
//       // Clear the stored messages once delivered
//       delete offlineMessages[userId];
//     }

//     // Optionally, you can emit a confirmation back to the user.
//     socket.emit("joined", `You have joined the room: ${userId}`);
//   });

//   // Handle message sending
//   socket.on("send_message", (data) => {
//     const { senderId, receiverId, message } = data;
//     console.log(`📤 Message from ${senderId} to ${receiverId}: ${message}`);

//     // Check if the receiver is online
//     if (onlineUsers[receiverId]) {
//       // Receiver is online, send the message immediately
//       io.to(receiverId).emit("receive_message", {
//         senderId,
//         message,
//         time: new Date().toLocaleTimeString(),
//         isOwn: false,
//       });
//       console.log(`📤 Message sent to online user ${receiverId}`);
//     } else {
//       // Receiver is offline, store the message for later delivery
//       if (!offlineMessages[receiverId]) {
//         offlineMessages[receiverId] = [];
//       }
//       offlineMessages[receiverId].push({
//         senderId,
//         message,
//         time: new Date().toLocaleTimeString(),
//         isOwn: false,
//       });
//       console.log(`💾 Stored message for offline user ${receiverId}`);
//     }

//     // Optionally, also send a confirmation back to the sender
//     io.to(senderId).emit("message_sent", {
//       message,
//       time: new Date().toLocaleTimeString(),
//     });
//   });

//   // Handle user disconnection
//   socket.on("disconnect", () => {
//     console.log(`🔴 User disconnected: ${socket.id}`);
//     // Remove user from the online list when they disconnect
//     for (const [userId, socketId] of Object.entries(onlineUsers)) {
//       if (socketId === socket.id) {
//         delete onlineUsers[userId];
//         console.log(`User ${userId} removed from online list`);
//         break;
//       }
//     }
//   });
// });




let onlineUsers = {};  // Keeps track of online users (userId -> socketId)
let offlineMessages = {};  // Keeps track of offline messages (receiverId -> messages)

io.on("connection", (socket) => {
  console.log(`🟢 User connected: ${socket.id}`);

  // Join a private room based on user ID (receiver and sender)
  socket.on("join", (userId) => {
    socket.join(userId);
    onlineUsers[userId] = socket.id;  // Mark user as online
    console.log(`${userId} joined their private room with socketId: ${socket.id}`);

    // Check if there are any offline messages for the user
    if (offlineMessages[userId]) {
      console.log(`📥 Sending offline messages to ${userId}`);
      offlineMessages[userId].forEach((message) => {
        socket.emit("receive_message", message);  // Send stored messages
      });
      delete offlineMessages[userId]; // Clear the stored messages
    }

    socket.emit("joined", `You have joined the room: ${userId}`);
  });

  // Handle message sending
  socket.on("send_message", async (data) => {
    const { senderId, receiverId, message } = data;
    console.log(`📤 Message from ${senderId} to ${receiverId}: ${message}`);

    // ✅ Save the chat to database
    try {
      const newChat = new chatdata({
        senderId,
        receiverId,
        message,
      });
      await newChat.save();
      console.log(`💾 Chat saved between ${senderId} and ${receiverId}`);
    } catch (error) {
      console.error("❌ Error saving chat:", error);
    }

    // ✅ Now send to receiver
    if (onlineUsers[receiverId]) {
      io.to(receiverId).emit("receive_message", {
        senderId,
        message,
        time: new Date().toLocaleTimeString(),
        isOwn: false,
      });
      console.log(`📤 Message sent to online user ${receiverId}`);
    } else {
      if (!offlineMessages[receiverId]) {
        offlineMessages[receiverId] = [];
      }
      offlineMessages[receiverId].push({
        senderId,
        message,
        time: new Date().toLocaleTimeString(),
        isOwn: false,
      });
      console.log(`💾 Stored message for offline user ${receiverId}`);
    }

    // ✅ Confirm back to sender
    io.to(senderId).emit("message_sent", {
      message,
      time: new Date().toLocaleTimeString(),
    });
  });

  // Handle user disconnection
  socket.on("disconnect", () => {
    console.log(`🔴 User disconnected: ${socket.id}`);
    for (const [userId, socketId] of Object.entries(onlineUsers)) {
      if (socketId === socket.id) {
        delete onlineUsers[userId];
        console.log(`User ${userId} removed from online list`);
        break;
      }
    }
  });
});

// 🚀 Start server
httpServer.listen(port, () => {
  console.log(`✅ Server with Socket.IO running on http://localhost:${port}`);
});
