// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import socket from "../socket"; // Assuming socket is properly initialized
// import NewSidebar from "./NewSidebar"; // Import your sidebar component

// const ChatBox = ({ receiverId }) => {
//   const { user } = useUser();
//   const senderId = user?.id;

//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);

//   // Register the user and join their private room
//   useEffect(() => {
//     if (senderId) {
//       socket.emit("join", senderId); // Send the user ID to the server
//     }

//     // Listen for messages from the server (incoming chat messages)
//     socket.on("receive_message", (data) => {
//       setChat((prev) => [...prev, { ...data, isOwn: false }]);
//     });

//     // Listen for confirmation that the message was sent (for sender)
//     socket.on("message_sent", (data) => {
//       setChat((prev) => [...prev, { ...data, isOwn: true }]);
//     });

//     return () => {
//       socket.off("receive_message");
//       socket.off("message_sent");
//     };
//   }, [senderId]);

//   // Send message to receiver
//   const sendMessage = () => {
//     if (!message.trim()) return;

//     const msgData = {
//       senderId,
//       receiverId,
//       message,
//     };

//     socket.emit("send_message", msgData); // Send message through WebSocket
//     setMessage(""); // Clear the input field after sending
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="w-1/5 border-r">
//         <NewSidebar />
//       </div>

//       {/* Centered Chat Section */}
//       <div className="flex-1 flex justify-center items-center bg-gray-100">
//         <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg flex flex-col h-[80vh]">
//           <div className="mb-4">
//             <h2 className="text-xl font-semibold text-center">
//               Chat with <span className="text-blue-600">{receiverId}</span>
//             </h2>
//           </div>

//           {/* Chat Messages */}
//           <div className="flex-1 overflow-y-auto space-y-2 p-2 border rounded bg-gray-50 mb-4">
//             {chat.map((msg, idx) => (
//               <div
//                 key={idx}
//                 className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
//               >
//                 <div
//                   className={`px-4 py-2 rounded-lg max-w-xs break-words text-white ${
//                     msg.isOwn ? "bg-blue-600" : "bg-green-600"
//                   }`}
//                 >
//                   {msg.message}
//                 </div>
//               </div>
//             ))}
//           </div>

//           {/* Message Input */}
//           <div className="flex">
//             <input
//               className="flex-grow border rounded p-2"
//               type="text"
//               placeholder="Type your message..."
//               value={message}
//               onChange={(e) => setMessage(e.target.value)}
//               onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//             />
//             <button
//               onClick={sendMessage}
//               className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//             >
//               Send
//             </button>
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default ChatBox;


// src/components/ChatBox.jsx
import { useEffect, useState } from "react";
import { useUser } from "@clerk/clerk-react";
import axios from "axios";
import socket from "../socket"; // Make sure socket.js exports a connected socket instance
import NewSidebar from "./NewSidebar";

const ChatBox = () => {
  const { user } = useUser();
  const senderId = user?.id;

  const [connections, setConnections] = useState([]);
  const [message, setMessage] = useState("");
  const [chat, setChat] = useState([]);
  const [receiverId, setReceiverId] = useState(null);

  // Fetch user's accepted connections
  useEffect(() => {
    if (senderId) {
      axios
        .get(`http://localhost:3000/api/connections/getAcceptedConnections/${senderId}`)
        .then((response) => {
          setConnections(response.data.connections || []);
        })
        .catch((error) => {
          console.error("Error fetching connections:", error);
        });
    }
  }, [senderId]);

  // Register the sender on socket server
  useEffect(() => {
    if (senderId) {
      socket.emit("join", senderId);

      socket.on("joined", (msg) => {
        console.log(msg);
      });
    }
    return () => {
      socket.off("joined");
    };
  }, [senderId]);

  // Listen for incoming messages
  useEffect(() => {
    socket.on("receive_message", (data) => {
      setChat((prev) => [...prev, { ...data, isOwn: false }]);
    });

    socket.on("message_sent", (data) => {
      setChat((prev) => [...prev, { message: data.message, time: data.time, isOwn: true }]);
    });

    return () => {
      socket.off("receive_message");
      socket.off("message_sent");
    };
  }, []);

  const handleChatClick = (id) => {
    setReceiverId(id);
    setChat([]);
  };

  const sendMessage = () => {
    if (!message.trim() || !receiverId) return;

    const msgData = {
      senderId,
      receiverId,
      message,
    };

    socket.emit("send_message", msgData);
    setMessage("");
  };

  return (
    <div className="flex h-screen">
      {/* Sidebar */}
      <div className="w-1/5 border-r">
        <NewSidebar />
      </div>

      {/* Main Chat Section */}
      <div className="flex-1 flex justify-center items-center bg-gray-100">
        <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg flex flex-col h-[80vh]">
          {/* Connection List */}
          <div className="mb-4">
            <h2 className="text-xl font-semibold text-center">Select a User to Chat</h2>
          </div>

          <div className="mb-4 space-y-2 overflow-y-auto h-32">
            {connections.length > 0 ? (
              connections.map((connection) => (
                <div key={connection.id} className="flex justify-between items-center p-2 border rounded">
                  <span>{connection.username}</span>
                  <button
                    onClick={() => handleChatClick(connection.userId)}
                    className="bg-blue-500 text-white px-4 py-2 rounded"
                  >
                    Chat
                  </button>
                </div>
              ))
            ) : (
              <p>No connections found.</p>
            )}
          </div>

          {/* Chat Box */}
          {receiverId && (
            <>
              <div className="mb-2">
                <h2 className="text-lg font-semibold text-center text-blue-600">
                  Chatting with {receiverId}
                </h2>
              </div>

              <div className="flex-1 overflow-y-auto space-y-2 p-2 border rounded bg-gray-50 mb-4">
                {chat.map((msg, idx) => (
                  <div
                    key={idx}
                    className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
                  >
                    <div
                      className={`px-4 py-2 rounded-lg max-w-xs break-words text-white ${
                        msg.isOwn ? "bg-blue-600" : "bg-green-600"
                      }`}
                    >
                      {msg.message}
                    </div>
                  </div>
                ))}
              </div>

              {/* Message Input */}
              <div className="flex">
                <input
                  className="flex-grow border rounded p-2"
                  type="text"
                  placeholder="Type your message..."
                  value={message}
                  onChange={(e) => setMessage(e.target.value)}
                  onKeyDown={(e) => e.key === "Enter" && sendMessage()}
                />
                <button
                  onClick={sendMessage}
                  className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
                >
                  Send
                </button>
              </div>
            </>
          )}
        </div>
      </div>
    </div>
  );
};

// export default ChatBox;




//previous best
// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import axios from "axios";
// import socket from "../socket"; // Make sure socket.js exports a connected socket instance
// import NewSidebar from "./NewSidebar";

// const ChatBox = () => {
//   const { user } = useUser();
//   const senderId = user?.id;

//   const [connections, setConnections] = useState([]);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [receiverId, setReceiverId] = useState(null);
//   const [receiverUsername, setReceiverUsername] = useState(""); 

//   // Fetch user's accepted connections
//   useEffect(() => {
//     if (senderId) {
//       axios
//         .get(`http://localhost:3000/api/connections/getAcceptedConnections/${senderId}`)
//         .then((response) => {
//           setConnections(response.data.connections || []);
//         })
//         .catch((error) => {
//           console.error("Error fetching connections:", error);
//         });
//     }
//   }, [senderId]);

//   // Register the sender on socket server
//   useEffect(() => {
//     if (senderId) {
//       socket.emit("join", senderId);

//       socket.on("joined", (msg) => {
//         console.log(msg);
//       });
//     }
//     return () => {
//       socket.off("joined");
//     };
//   }, [senderId]);

//   // Listen for incoming messages
//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       // Ensure the message is not duplicated before adding
//       setChat((prev) => {
//         if (!prev.some((msg) => msg.message === data.message && msg.senderId === data.senderId)) {
//           return [...prev, { ...data, isOwn: false }];
//         }
//         return prev;
//       });
//     });

//     socket.on("message_sent", (data) => {
//       // Ensure the message is not duplicated before adding
//       setChat((prev) => {
//         if (!prev.some((msg) => msg.message === data.message && msg.senderId === data.senderId)) {
//           return [...prev, { message: data.message, time: data.time, isOwn: true }];
//         }
//         return prev;
//       });
//     });

//     return () => {
//       socket.off("receive_message");
//       socket.off("message_sent");
//     };
//   }, []);

//   const handleChatClick = (id) => {
//     setReceiverId(id);
//     setChat([]); // Clear previous chat
//   };

//   const sendMessage = () => {
//     if (!message.trim() || !receiverId) return;

//     const msgData = {
//       senderId,
//       receiverId,
//       message,
//     };

//     socket.emit("send_message", msgData);
//     setMessage("");
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="w-1/5 border-r">
//         <NewSidebar />
//       </div>

//       {/* Main Chat Section */}
//       <div className="flex-1 flex justify-center items-center bg-gray-100">
//         <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg flex flex-col h-[80vh]">
//           {/* Connection List */}
//           <div className="mb-4">
//             <h2 className="text-xl font-semibold text-center">Select a User to Chat</h2>
//           </div>

//           <div className="mb-4 space-y-2 overflow-y-auto h-32">
//             {connections.length > 0 ? (
//               connections.map((connection) => (
//                 <div key={connection.id} className="flex justify-between items-center p-2 border rounded">
//                   <span>{connection.username}</span>
//                   <button
//                     onClick={() => handleChatClick(connection.userId)}
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                   >
//                     Chat
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p>No connections found.</p>
//             )}
//           </div>

//           {/* Chat Box */}
//           {receiverId && (
//             <>
//               <div className="mb-2">
//                 <h2 className="text-lg font-semibold text-center text-blue-600">
//                   Chatting with {receiverId}
//                 </h2>
//               </div>

//               <div className="flex-1 overflow-y-auto space-y-2 p-2 border rounded bg-gray-50 mb-4">
//                 {chat.map((msg, idx) => (
//                   <div
//                     key={idx}
//                     className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
//                   >
//                     <div
//                       className={`px-4 py-2 rounded-lg max-w-xs break-words text-white ${
//                         msg.isOwn ? "bg-blue-600" : "bg-green-600"
//                       }`}
//                     >
//                       {msg.message}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Message Input */}
//               <div className="flex">
//                 <input
//                   className="flex-grow border rounded p-2"
//                   type="text"
//                   placeholder="Type your message..."
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 />
//                 <button
//                   onClick={sendMessage}
//                   className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Send
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };


//previous best
// import { useEffect, useState } from "react";
// import { useUser } from "@clerk/clerk-react";
// import axios from "axios";
// import socket from "../socket"; // Make sure socket.js exports a connected socket instance
// import NewSidebar from "./NewSidebar";

// const ChatBox = () => {
//   const { user } = useUser();
//   const senderId = user?.id;

//   const [connections, setConnections] = useState([]);
//   const [message, setMessage] = useState("");
//   const [chat, setChat] = useState([]);
//   const [receiverId, setReceiverId] = useState(null);
//   const [receiverUsername, setReceiverUsername] = useState(""); // Store the receiver's username

//   // Fetch user's accepted connections and their usernames
//   useEffect(() => {
//     if (senderId) {
//       axios
//         .get(`http://localhost:3000/api/connections/getAcceptedConnections/${senderId}`)
//         .then((response) => {
//           const connectionsData = response.data.connections || [];
//           // Fetch the username for each connection using Clerk's API
//           const fetchUsernames = connectionsData.map(async (connection) => {
//             const userDetails = await axios.get(`https://api.clerk.dev/v1/users/${connection.userId}`, {
//               headers: {
//                 Authorization: `Bearer ${process.env.CLERK_API_KEY}`, // Add Clerk API key here
//               },
//             });
//             return {
//               ...connection,
//               username: userDetails.data.username,
//             };
//           });

//           // Once all usernames are fetched, update the state
//           Promise.all(fetchUsernames).then((connectionsWithUsernames) => {
//             setConnections(connectionsWithUsernames);
//           });
//         })
//         .catch((error) => {
//           console.error("Error fetching connections:", error);
//         });
//     }
//   }, [senderId]);

//   // Register the sender on socket server
//   useEffect(() => {
//     if (senderId) {
//       socket.emit("join", senderId);

//       socket.on("joined", (msg) => {
//         console.log(msg);
//       });
//     }
//     return () => {
//       socket.off("joined");
//     };
//   }, [senderId]);

//   // Listen for incoming messages
//   useEffect(() => {
//     socket.on("receive_message", (data) => {
//       // Ensure the message is not duplicated before adding
//       setChat((prev) => {
//         if (!prev.some((msg) => msg.message === data.message && msg.senderId === data.senderId)) {
//           return [...prev, { ...data, isOwn: false }];
//         }
//         return prev;
//       });
//     });

//     socket.on("message_sent", (data) => {
//       // Ensure the message is not duplicated before adding
//       setChat((prev) => {
//         if (!prev.some((msg) => msg.message === data.message && msg.senderId === data.senderId)) {
//           return [...prev, { message: data.message, time: data.time, isOwn: true }];
//         }
//         return prev;
//       });
//     });

//     return () => {
//       socket.off("receive_message");
//       socket.off("message_sent");
//     };
//   }, []);

//   const handleChatClick = (id, username) => {
//     setReceiverId(id);
//     setReceiverUsername(username); // Set the receiver's username
//     setChat([]); // Clear previous chat
//   };

//   const sendMessage = () => {
//     if (!message.trim() || !receiverId) return;

//     const msgData = {
//       senderId,
//       receiverId,
//       message,
//     };

//     socket.emit("send_message", msgData);
//     setMessage("");
//   };

//   return (
//     <div className="flex h-screen">
//       {/* Sidebar */}
//       <div className="w-1/5 border-r">
//         <NewSidebar />
//       </div>

//       {/* Main Chat Section */}
//       <div className="flex-1 flex justify-center items-center bg-gray-100">
//         <div className="w-full max-w-lg p-6 bg-white shadow-lg rounded-lg flex flex-col h-[80vh]">
//           {/* Connection List */}
//           <div className="mb-4">
//             <h2 className="text-xl font-semibold text-center">Select a User to Chat</h2>
//           </div>

//           <div className="mb-4 space-y-2 overflow-y-auto h-32">
//             {connections.length > 0 ? (
//               connections.map((connection) => (
//                 <div key={connection.id} className="flex justify-between items-center p-2 border rounded">
//                   <span>{connection.username}</span> {/* Display username */}
//                   <button
//                     onClick={() => handleChatClick(connection.userId, connection.username)} // Pass username as well
//                     className="bg-blue-500 text-white px-4 py-2 rounded"
//                   >
//                     Chat
//                   </button>
//                 </div>
//               ))
//             ) : (
//               <p>No connections found.</p>
//             )}
//           </div>

//           {/* Chat Box */}
//           {receiverId && (
//             <>
//               <div className="mb-2">
//                 <h2 className="text-lg font-semibold text-center text-blue-600">
//                   Chatting with {receiverUsername || receiverId} {/* Display the receiver's username here */}
//                 </h2>
//               </div>

//               <div className="flex-1 overflow-y-auto space-y-2 p-2 border rounded bg-gray-50 mb-4">
//                 {chat.map((msg, idx) => (
//                   <div
//                     key={idx}
//                     className={`flex ${msg.isOwn ? "justify-end" : "justify-start"}`}
//                   >
//                     <div
//                       className={`px-4 py-2 rounded-lg max-w-xs break-words text-white ${
//                         msg.isOwn ? "bg-blue-600" : "bg-green-600"
//                       }`}
//                     >
//                       {msg.message}
//                     </div>
//                   </div>
//                 ))}
//               </div>

//               {/* Message Input */}
//               <div className="flex">
//                 <input
//                   className="flex-grow border rounded p-2"
//                   type="text"
//                   placeholder="Type your message..."
//                   value={message}
//                   onChange={(e) => setMessage(e.target.value)}
//                   onKeyDown={(e) => e.key === "Enter" && sendMessage()}
//                 />
//                 <button
//                   onClick={sendMessage}
//                   className="ml-2 bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded"
//                 >
//                   Send
//                 </button>
//               </div>
//             </>
//           )}
//         </div>
//       </div>
//     </div>
//   );
// };

export default ChatBox;


