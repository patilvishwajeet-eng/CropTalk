// import React, { useState, useEffect } from "react";
// import axios from "axios";
// import Newsidebar from "./Newsidebar";
// import { useUser } from "@clerk/clerk-react";

// const CommunityPage = () => {
//   const { user, isLoaded, isSignedIn } = useUser();
//   const [content, setContent] = useState("");
//   const [posts, setPosts] = useState([]);
//   const [isCreatingPost, setIsCreatingPost] = useState(false);
//   const [showSuccessPopup, setShowSuccessPopup] = useState(false);

//   useEffect(() => {
//     const fetchPosts = async () => {
//       try {
//         const response = await axios.get("http://localhost:3000/api/posts/getdata");
//         console.log(response.data); 
//         setPosts(response.data);
//       } catch (error) {
//         console.error("Error:", error.response ? error.response.data : error.message);
//       }
      
//     };

//     fetchPosts();
//   }, []);

//   const handlePostSubmit = async (e) => {
//     e.preventDefault();
  
//     if (!content.trim() || !user) {
//       console.error("Content is required");
//       return;
//     }
//     const now=new Date();
//     const postData = {
//       username : user.username,
//       content,
//       createdAt: new Date().toISOString(), 
//     };
  
//     try {
//       const response = await axios.post("http://localhost:3000/api/posts/create", postData);
  
//       if (response.status === 201) {
//         const newPost = response.data;
//         setPosts([newPost, ...posts]);
//         setContent("");
//         setIsCreatingPost(false);

//         alert(`Data added succesfully`);
//       } else {
//         console.error("Error creating post:", response.data);
//       }
//     } catch (error) {
//       console.error("Error:", error);
//     }
//   };

//   return (
//     <>
//       <div className="flex min-h-screen bg-gray-100">
//         <div className="w-64 bg-gray-800 text-white">
//           <Newsidebar />
//         </div>

//         <div className="w-3/4 p-6">
//           <div className="max-w-2xl mx-auto">
//             {!isCreatingPost ? (
//               <div className="bg-white p-6 rounded-lg shadow-md mb-12 text-center">
//                 <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
//                 <button
//                   onClick={() => setIsCreatingPost(true)}
//                   className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
//                 >
//                   Start Writing
//                 </button>
//               </div>
//             ) : (
//               <div className="bg-white p-6 rounded-lg shadow-md mb-12">
//                 <h2 className="text-2xl font-bold text-center mb-4">Create a Post</h2>
//                 <form onSubmit={handlePostSubmit}>
//                   <div className="mb-4">
//                     <label
//                       htmlFor="content"
//                       className="block text-sm font-medium text-gray-700"
//                     >
//                       Content
//                     </label>
//                     <textarea
//                       id="content"
//                       value={content}
//                       onChange={(e) => setContent(e.target.value)}
//                       className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
//                       rows="4"
//                       placeholder="Write your post"
//                       required
//                     ></textarea>
//                   </div>
//                   <div className="text-center">
//                     <button
//                       type="submit"
//                       className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
//                     >
//                       Post
//                     </button>
//                     <button
//                       type="button"
//                       onClick={() => setIsCreatingPost(false)}
//                       className="ml-4 text-gray-500 hover:text-gray-700"
//                     >
//                       Cancel
//                     </button>
//                   </div>
//                 </form>
//               </div>
//             )}

//             <div className="space-y-6">
//               <h2 className="text-2xl font-bold mb-4">Community Posts</h2>
//               {posts.length === 0 ? (
//                 <p className="text-gray-500">No posts yet. Be the first to create one!</p>
//               ) : (
//                 posts.map((post, index) => (
//                   <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-4">
//                     <div className="flex items-center space-x-4 mb-4">
//                       <img
//                         src="https://www.w3schools.com/w3images/avatar2.png"
//                         alt="User Avatar"
//                         className="w-12 h-12 rounded-full object-cover"
//                       />
//                       <div>
//                         <h3 className="font-bold text-lg">{post.username}</h3>
//                         <p className="text-sm text-gray-500">{post.createdAt}</p>
//                       </div>
//                     </div>

//                     <p className="text-gray-700 mb-4">{post.content}</p>

//                     <div className="flex items-center space-x-4 text-gray-500">
//                       <button className="flex items-center space-x-1 hover:text-blue-600">
//                         <span>👍</span>
//                         <span>Like</span>
//                       </button>
//                       <button className="flex items-center space-x-1 hover:text-green-600">
//                         <span>💬</span>
//                         <span>Comment</span>
//                       </button>
//                       <button className="flex items-center space-x-1 hover:text-yellow-600">
//                         <span>🔗</span>
//                         <span>Share</span>
//                       </button>
//                     </div>  
//                   </div>
//                 ))
//               )}
//             </div>
//           </div>
//         </div>
//       </div>

//       {showSuccessPopup && (
//         <div className="fixed top-0 left-0 right-0 p-4 bg-green-600 text-white text-center z-50">
//           <p>Post created successfully!</p>
//         </div>
//       )}
//     </>
//   );
// };

// export default CommunityPage;





import React, { useState, useEffect } from "react";
import axios from "axios";
import Newsidebar from "./Newsidebar";
import { useUser } from "@clerk/clerk-react";

const CommunityPage = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  const [content, setContent] = useState("");
  const [posts, setPosts] = useState([]);
  const [isCreatingPost, setIsCreatingPost] = useState(false);
  const [showSuccessPopup, setShowSuccessPopup] = useState(false);

  const [searchQuery, setSearchQuery] = useState("");
  const [searchResult, setSearchResult] = useState(null);
  const [searching, setSearching] = useState(false);

  useEffect(() => {
    const fetchPosts = async () => {
      try {
        const response = await axios.get("http://localhost:3000/api/posts/getdata");
        setPosts(response.data);
      } catch (error) {
        console.error("Error:", error.response ? error.response.data : error.message);
      }
    };

    fetchPosts();
  }, []);

  const handlePostSubmit = async (e) => {
    e.preventDefault();

    if (!content.trim() || !user) {
      console.error("Content is required");
      return;
    }

    const postData = {
      username: user.username,
      content,
      createdAt: new Date().toISOString(),
    };

    try {
      const response = await axios.post("http://localhost:3000/api/posts/create", postData);

      if (response.status === 201) {
        const newPost = response.data;
        setPosts([newPost, ...posts]);
        setContent("");
        setIsCreatingPost(false);
        alert("Data added successfully");
      } else {
        console.error("Error creating post:", response.data);
      }
    } catch (error) {
      console.error("Error:", error);
    }
  };


  //find user with name and send request
  const handleSearch = async () => {
    if (!searchQuery.trim()) {
      return;
    }
    setSearching(true);
    try {
      const response = await axios.get(`http://localhost:3000/api/users/finduser/${searchQuery}`);
      console.log("User data:", response.data);  // Log the user data from the API
      setSearchResult(response.data);
    } catch (error) {
      console.error("Search error:", error.response ? error.response.data : error.message);
      setSearchResult(null);
    }
    setSearching(false);
  };
  

  const handleSendRequest = async () => {
    alert("Sending connection request...");
    if (!searchResult) return;
    try {
      console.log("Sending request to:", searchResult.username);  // Log the username to whom the request is being sent
      console.log("Logged-in user:", user.username);  // Log the logged-in user's username
      const response = await axios.post(`http://localhost:3000/api/connections/sendname/${searchResult.username}`, {
        senderUsername: user.username,   // logged-in user's username in body
      });
  
      console.log(response.data.message); 
      alert("Connection request sent successfully!");
    } catch (error) {
      console.error("Error sending connection request:", error.response ? error.response.data : error.message);
      alert(error.response?.data?.message || "Failed to send request");
    }
  };  
  

  return (
    <>
      <div className="flex min-h-screen bg-gray-100">
        <div className="w-64 bg-gray-800 text-white">
          <Newsidebar />
        </div>

        <div className="w-3/4 p-6">
          <div className="max-w-2xl mx-auto">

            {/* Search Bar */}
            <div className="bg-white p-6 rounded-lg shadow-md mb-6">
              <h2 className="text-2xl font-bold mb-4 text-center">Search User</h2>
              <div className="flex">
                <input
                  type="text"
                  value={searchQuery}
                  onChange={(e) => setSearchQuery(e.target.value)}
                  placeholder="Enter username"
                  className="flex-1 border border-gray-300 px-4 py-2 rounded-l-md"
                />
                <button
                  onClick={handleSearch}
                  className="bg-blue-600 text-white px-4 py-2 rounded-r-md hover:bg-blue-700"
                >
                  {searching ? "Searching..." : "Search"}
                </button>
              </div>

              {/* Display Search Result */}
              {searchResult && (
                <div className="mt-6 p-4 border rounded-lg bg-gray-50">
                  <h3 className="text-xl font-bold mb-2">User Profile</h3>
                  <p><strong>Username:</strong> {searchResult.username}</p>
                  <p><strong>Email:</strong> {searchResult.email}</p>
                  {/* You can show more fields if available in response */}
                  <button
                    onClick={handleSendRequest}
                    className="mt-4 bg-green-600 text-white py-2 px-6 rounded-lg hover:bg-green-700"
                  >
                    Send Request
                  </button>
                </div>
              )}
            </div>

            {/* Create Post Section */}
            {!isCreatingPost ? (
              <div className="bg-white p-6 rounded-lg shadow-md mb-12 text-center">
                <h2 className="text-2xl font-bold mb-4">Create a Post</h2>
                <button
                  onClick={() => setIsCreatingPost(true)}
                  className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
                >
                  Start Writing
                </button>
              </div>
            ) : (
              <div className="bg-white p-6 rounded-lg shadow-md mb-12">
                <h2 className="text-2xl font-bold text-center mb-4">Create a Post</h2>
                <form onSubmit={handlePostSubmit}>
                  <div className="mb-4">
                    <label
                      htmlFor="content"
                      className="block text-sm font-medium text-gray-700"
                    >
                      Content
                    </label>
                    <textarea
                      id="content"
                      value={content}
                      onChange={(e) => setContent(e.target.value)}
                      className="mt-1 block w-full px-4 py-2 border border-gray-300 rounded-md"
                      rows="4"
                      placeholder="Write your post"
                      required
                    ></textarea>
                  </div>
                  <div className="text-center">
                    <button
                      type="submit"
                      className="bg-blue-600 text-white py-2 px-6 rounded-lg hover:bg-blue-700"
                    >
                      Post
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsCreatingPost(false)}
                      className="ml-4 text-gray-500 hover:text-gray-700"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              </div>
            )}

            {/* Posts Section */}
            <div className="space-y-6">
              <h2 className="text-2xl font-bold mb-4">Community Posts</h2>
              {posts.length === 0 ? (
                <p className="text-gray-500">No posts yet. Be the first to create one!</p>
              ) : (
                posts.map((post, index) => (
                  <div key={index} className="bg-white p-6 rounded-lg shadow-md mb-4">
                    <div className="flex items-center space-x-4 mb-4">
                      <img
                        src="https://www.w3schools.com/w3images/avatar2.png"
                        alt="User Avatar"
                        className="w-12 h-12 rounded-full object-cover"
                      />
                      <div>
                        <h3 className="font-bold text-lg">{post.username}</h3>
                        <p className="text-sm text-gray-500">{post.createdAt}</p>
                      </div>
                    </div>
                    <p className="text-gray-700 mb-4">{post.content}</p>
                    <div className="flex items-center space-x-4 text-gray-500">
                      <button className="flex items-center space-x-1 hover:text-blue-600">
                        <span>👍</span>
                        <span>Like</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-green-600">
                        <span>💬</span>
                        <span>Comment</span>
                      </button>
                      <button className="flex items-center space-x-1 hover:text-yellow-600">
                        <span>🔗</span>
                        <span>Share</span>
                      </button>
                    </div>  
                  </div>
                ))
              )}
            </div>

          </div>
        </div>
      </div>

      {showSuccessPopup && (
        <div className="fixed top-0 left-0 right-0 p-4 bg-green-600 text-white text-center z-50">
          <p>Post created successfully!</p>
        </div>
      )}
    </>
  );
};

export default CommunityPage;
