import Chat from "../models/chatModel.js";  // adjust the path if needed

// Save a new chat
export const saveChat = async (req, res) => {
  try {
    const { senderId, receiverId, message } = req.body;

    if (!senderId || !receiverId || !message) {
      return res.status(400).json({ error: "All fields are required." });
    }

    const newChat = new Chat({
      senderId,
      receiverId,
      message,
    });

    await newChat.save();

    res.status(201).json({ message: "Chat saved successfully.", chat: newChat });
  } catch (error) {
    console.error("Error saving chat:", error);
    res.status(500).json({ error: "Server error while saving chat." });
  }
};

// Get chat between two users
export const getChatsBetweenUsers = async (req, res) => {
  try {
    const { senderId, receiverId } = req.params;

    const chats = await Chat.find({
      $or: [
        { senderId, receiverId },
        { senderId: receiverId, receiverId: senderId }
      ]
    }).sort({ createdAt: 1 }); // sort by time

    res.status(200).json({ chats });
  } catch (error) {
    console.error("Error fetching chats:", error);
    res.status(500).json({ error: "Server error while fetching chats." });
  }
};
