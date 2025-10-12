// import React, { useState } from "react";
// import Newsidebar from "./Newsidebar";
// import { UserCheck, UserX } from "lucide-react";

// const dummyConnections = [
//   { username: "Rocky", bio: "Farmer from Nashik" },
//   { username: "Asha", bio: "Agro Tech Enthusiast" },
// ];

// const dummyRequests = [
//   { username: "Arya", bio: "Agri Expert" },
// ];

// const UserCard = ({ user, isRequest }) => (
//   <div className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md border">
//     <div>
//       <h3 className="font-semibold text-lg">{user.username}</h3>
//       <p className="text-sm text-gray-500">{user.bio}</p>
//     </div>
//     {isRequest && (
//       <div className="flex space-x-2">
//         <button className="p-2 bg-green-500 hover:bg-green-600 text-white rounded-xl">
//           <UserCheck size={18} />
//         </button>
//         <button className="p-2 bg-red-500 hover:bg-red-600 text-white rounded-xl">
//           <UserX size={18} />
//         </button>
//       </div>
//     )}
//   </div>
// );

// const ConnectionsPage = () => {
//     const [activeTab, setActiveTab] = useState("connections");
  
//     return (
//       <div className="flex min-h-screen bg-gray-100 pt-16">
//         {/* Sidebar */}
//         <div className="w-1/5 bg-transparent">
//           <Newsidebar />
//         </div>
  
//         {/* Main Content */}
//         <div className="w-3/5 p-6">
//           {/* Tabs */}
//           <div className="flex border-b border-gray-300 mb-6">
//             <button
//               onClick={() => setActiveTab("connections")}
//               className={`mr-6 pb-2 text-lg font-semibold ${
//                 activeTab === "connections"
//                   ? "border-b-2 border-blue-600 text-Black"
//                   : "text-White-400"
//               }`}
//             > 
//               Connections
//             </button>
//             <button
//               onClick={() => setActiveTab("requests")}
//               className={`pb-2 text-lg font-semibold ${
//                 activeTab === "requests"
//                   ? "border-b-2 border-blue-600 text-White"
//                   : "text-Black-400"
//               }`}
//             >
//               Requests
//             </button>
//           </div>
  
//           {/* Content */}
//           {activeTab === "connections" ? (
//             <div className="space-y-4">
//               {dummyConnections.map((user, idx) => (
//                 <UserCard key={idx} user={user} isRequest={false} />
//               ))}
//             </div>
//           ) : (
//             <div className="space-y-4">
//               {dummyRequests.map((user, idx) => (
//                 <UserCard key={idx} user={user} isRequest={true} />
//               ))}
//             </div>
//           )}
//         </div>
//       </div>
//     );
//   };
  
//   export default ConnectionsPage;





import React, { useState, useEffect } from "react";
import Newsidebar from "./NewSidebar";
import axios from "axios";
import { useUser } from "@clerk/clerk-react";

const ConnectionsPage = () => {
  const [activeTab, setActiveTab] = useState("connections");
  const [connections, setConnections] = useState([]);
  const [users, setUsers] = useState([]);
  const [requests, setRequests] = useState([]);
  const { user } = useUser();
  const [acceptedConnections, setAcceptedConnections] = useState([]);

  // console.log("User from Clerk:", user);
  // console.log("User id ", user.id);  
  console.log("User request ", requests.username);
  // Fetching all users
  useEffect(() => {
    const fetchUsers = async () => {
      console.log("Fetching users...");
      try {
        const response = await axios.get("http://localhost:3000/api/users/all");
        setUsers(response.data);
      } catch (error) {
        console.error("Error fetching users:", error);
      }
    };
    fetchUsers();
  }, []);
  const userClerkId = user?.id;
  // console.log("User Clerk ID:", userClerkId);



  //fetching all connection requests by username
  // useEffect(() => {
  //   console.log("Fetching connections by username...");
  //   if (!user?.id) {
  //     console.log("User id is not available for fetching connections.");
  //     return;
  //   }
  
  //   const fetchConnections = async () => {
  //     try {
  //       const response = await axios.get(`http://localhost:3000/api/connections/${user.id}`);
  //       setConnections(response.data);
  //       console.log("Fetched connections:", response.data);
  //       setLoading(false);
  //     } catch (err) {
  //       setError('Error fetching connections');
  //       setLoading(false);
  //     }
  //   };
  
  //   fetchConnections();
  // }, [user]);
  


  // Fetching all connection requests by
  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get(`http://localhost:3000/api/connections/fetchrequests/${user.id}`);
        setRequests(response.data);  // Assuming your API returns requests with sender info and timestamp
      } catch (error) {
        console.error("Error fetching requests:", error);
      }
    };
    fetchRequests();
  }, [user]);
    

// Fetching all connection requests using username
// useEffect(() => {
//   if (!user?.id) {
//     console.log("User id is not available yet.");
//     return;
//   } else {
//     console.log("✅ User object:", user);
//     console.log("✅ User id:", user?.id);
//   }

//   const fetchRequests = async () => {
//     try {
//       console.log(`Fetching requests for user with id: ${user.id}`);
//       const response = await axios.get(`http://localhost:3000/api/connections/fetchrequests/${user.id}`);
//       console.log("Fetched requests:", response.data);
//       setRequests(response.data);
//     } catch (error) {
//       console.error("Error fetching requests:", error);
//     }
//   };

//   fetchRequests();
// }, [user]);


//Fetch all the connection for the logged in user
useEffect(() => {
  console.log("Fetching accepted connections...");
  if (!user?.id) {
    console.log("User ID is not available yet.");
    return;
  }

  const fetchAcceptedConnections = async () => {
    try {
      const response = await axios.get(`http://localhost:3000/api/connections/getAcceptedConnections/${user.id}`);
      setAcceptedConnections(response.data.connections); // Update the state
      console.log("Fetched accepted connections:", response.data.connections);
      console.log("State after update:", acceptedConnections);
    } catch (error) {
      console.error("Error fetching accepted connections:", error);
    }
  };

  fetchAcceptedConnections();
}, [user]); 


  // Send connection request
  const handleSendRequest = async (targetClerkId) => {
    try {
      const senderClerkId = user.id;

      await axios.post(`http://localhost:3000/api/connections/sendrequest/${senderClerkId}`, {
        targetClerkId,
      });

      // Remove user from the list after sending request
      setUsers((prevUsers) =>
        prevUsers.filter((u) => u.clerkid !== targetClerkId)
      );
    } catch (error) {
      console.error("Error sending request:", error);
    }
  };


  // Render the connections tab (show accepted connections)
  // const renderConnectionsTab = () => (
  //   console.log("Rendering connections tab"), // Debugging line
  //   <div className="space-y-4">
  //     {connections.length > 0 ? (
  //       connections.map((conn, index) => (
  //         console.log("Connection:", conn), // Debugging line
  //         <div key={conn.userId || index} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md border">
  //           <div>
  //             <h3 className="font-semibold text-lg">{conn.userId}</h3>
  //             <p className="text-sm text-gray-500">
  //               {conn.connectedAt ? `Connected at: ${new Date(conn.connectedAt).toLocaleString()}` : "No connection time"}
  //             </p>  
  //           </div>
  //           <div>
  //             <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-xl text-sm">
  //               {conn.status}
  //             </span>
  //           </div>
  //         </div>
  //       ))
  //     ) : (
  //       <p>No connections yet</p>
  //     )}
  //   </div>
  // );
  
  const renderConnectionsTab = () => {
    console.log("Rendering connections tab"); // Debugging line
    console.log("Lenght of accepted connections", acceptedConnections.length); // Debugging line
    return (
      <div className="space-y-4">
        {acceptedConnections.length > 0 ? (
          acceptedConnections.map((conn, index) => (
            console.log("Connection:", conn), // Debugging line
            <div key={conn.userId || index} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md border">
              <div>
                <h3 className="font-semibold text-lg">{conn.username}</h3>
                <p className="text-sm text-gray-500">
                  {conn.connectedAt ? `Connected at: ${new Date(conn.connectedAt).toLocaleString()}` : "No connection time"}
                </p>  
              </div>
              <div>
                <span className="px-3 py-1 bg-blue-100 text-blue-800 rounded-xl text-sm">
                  {conn.status}
                </span>
              </div>
            </div>
          ))
        ) : (
          <p>No connections yet</p>
        )}
      </div>
    );
  };
    


  // Render the requests tab (show incoming connection requests)
  const renderRequestsTab = () => (
    console.log("Rendering requests tab"), // Debugging line
    <div className="space-y-4">
      {requests.length > 0 ? (
        requests.map((req, index) => (
          console.log("Request:", req), // Debugging line
          <div key={req.senderId || index} className="flex items-center justify-between p-4 bg-white rounded-2xl shadow-md border">
            <div>
              <h3 className="font-semibold text-lg">{req.senderName}</h3>
              <p className="text-sm text-gray-500">
                {req.timestamp ? `Sent at: ${new Date(req.timestamp).toLocaleString()}` : "No timestamp"}
              </p>  
            </div>
            <div className="space-x-2">
              <button
                onClick={() => handleAcceptRequest(req.senderId)}
                className="px-4 py-2 bg-green-500 text-white rounded-xl hover:bg-green-600"
              >
                Accept
              </button>
              <button
                onClick={() => handleRejectRequest(req.senderId)}
                className="px-4 py-2 bg-red-500 text-white rounded-xl hover:bg-red-600"
              >
                Reject
              </button>
            </div>
          </div>
        ))
      ) : (
        <p>No requests yet</p>
      )}
    </div>
  );
  

  // Handle accept request
  // const handleAcceptRequest = async (senderClerkId) => {
  //   try {
  //     await axios.post(`http://localhost:3000/api/connections/acceptrequest/${senderClerkId}`);
  //     setRequests((prevRequests) =>
  //       prevRequests.filter((req) => req.senderId !== senderClerkId)
  //     );
  //   } catch (error) {
  //     console.error("Error accepting request:", error);
  //   }
  // };

  // const handleAcceptRequest = async (requesterClerkId) => {
  //   try {
  //     const userClerkId = user.id; // the logged-in user's Clerk ID (who received the request)
  
  //     const response = await axios.post(
  //       `http://localhost:3000/api/connections/acceptrequest/${userClerkId}`, // user (receiver) ID in URL params
  //       { requesterClerkId } // requester (sender) ID in the body
  //     );
  
  //     if (response.status === 200) {
  //       // Successfully accepted the request
  //       setRequests((prevRequests) =>
  //         prevRequests.filter((req) => req.senderId !== requesterClerkId)
  //       );
  //     }
  //   } catch (error) {
  //     console.error("Error accepting request:", error);
  //   }
  // };

  const handleAcceptRequest = async (requesterClerkId) => {
    try {
      const userClerkId = user.id; // the logged-in user's Clerk ID (who received the request)
  
      const response = await axios.post(
        `http://localhost:3000/api/connections/acceptrequest/${userClerkId}`, 
        { requesterClerkId }
      );
  
      if (response.status === 200) {
        // Successfully accepted the request
        setRequests((prevRequests) =>
          prevRequests.filter((req) => req.sender.clerkId !== requesterClerkId)
        );
      }
    } catch (error) {
      console.error("Error accepting request:", error);
    }
  };
  
  
  

  // Handle reject request
  const handleRejectRequest = async (senderClerkId) => {
    try {
      const receiverClerkId = user.id; // Get the logged-in user's Clerk ID
      
      // Make API call to reject the connection request
      const response = await axios.post(
        `http://localhost:3000/api/connections/rejectrequest/${senderClerkId}`,
        { receiverClerkId } // Pass receiverClerkId in the request body
      );
      
      if (response.status === 200) {
        // Update the UI state by removing the rejected request from the list
        setRequests((prevRequests) =>
          prevRequests.filter((req) => req.senderId !== senderClerkId)
        );
      }
    } catch (error) {
      console.error("Error rejecting request:", error);
    }
  };
  

  return (
    <div className="flex min-h-screen bg-gray-100 pt-16">
      <div className="w-1/5 bg-transparent">
        <Newsidebar />
      </div>

      <div className="w-3/5 p-6">
        <h2 className="text-xl font-bold mb-4">Connections</h2>

        <div className="mb-4 flex space-x-4">
          <button
            onClick={() => setActiveTab("connections")}
            className={`px-4 py-2 rounded-md ${activeTab === "connections" ? "bg-blue-500 text-white" : "bg-white border"}`}
          >
            Connections
          </button>
          <button
            onClick={() => setActiveTab("requests")}
            className={`px-4 py-2 rounded-md ${activeTab === "requests" ? "bg-blue-500 text-white" : "bg-white border"}`}
          >
            Requests
          </button>
        </div>

        {activeTab === "connections" ? renderConnectionsTab() : renderRequestsTab()}
      </div>
    </div>
  );
};

export default ConnectionsPage;
