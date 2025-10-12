import React, { useState, useEffect } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Newsidebar from "./Newsidebar";
import { useUser } from "@clerk/clerk-react"; // Ensure correct import

const UserPage = () => {
  
  const { username } = useParams();
  const { user } = useUser(); // Destructure the user object
  const [userData, setUserData] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchUserData = async () => {
      if (!user) {
        setError("User is not authenticated.");
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:3000/api/users/userdata/${user.id}`);
        setUserData(response.data);
      } catch (error) {
        console.error("Error fetching user profile:", error);
        setError("Failed to load user data. Please try again later.");
      } finally {
        setLoading(false);
      }
    };

    fetchUserData();
  }, [user, username]);

  if (loading) return <div className="flex justify-center mt-10 text-lg">Loading...</div>;
  if (error) return <div className="flex justify-center mt-10 text-red-500">{error}</div>;
  if (!userData) return <div className="flex justify-center mt-10">User not found</div>;

  return (
    <div className="flex min-h-screen bg-gray-100">
      <div className="w-1/4 min-h-screen bg-white shadow-lg">
        <Newsidebar />
      </div>
      
      <div className="flex-1 flex justify-center p-6">
        <div className="w-full max-w-md bg-white shadow-lg rounded-2xl p-6 h-fit">
          <div className="flex items-center space-x-4">
            <img
              src={userData.imageUrl || "https://via.placeholder.com/100"}
              alt="Profile"
              className="w-16 h-16 rounded-full border-2 border-green-500"
            />
            <div>
              <h2 className="text-xl font-semibold">{userData.username || "Unknown User"}</h2>
              <p className="text-gray-500 text-sm">{userData.email || "No email provided"}</p>
            </div>
          </div>
          <div className="mt-4">
            <h3 className="text-lg font-semibold">About Me</h3>
            <p className="w-full mt-2 p-2 border rounded-lg text-sm bg-gray-50">
              {userData.bio || "No bio available."}
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default UserPage;