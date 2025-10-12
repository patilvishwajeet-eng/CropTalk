import React, { useState, useEffect } from 'react';
import { useUser } from '@clerk/clerk-react';
import Newsidebar from './Newsidebar';
import axios from 'axios';

const ProfileForm = () => {
  const { user, isLoaded, isSignedIn } = useUser();
  // Get the senderId from the user object
  const clerkid = user?.id; // Assuming user.id is the clerk ID
  // console.log("Clerk ID:", clerkid); // Debug: check what clerkid looks like
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    bio: '',
  });

  useEffect(() => {
    if (isLoaded && isSignedIn && user) {
      setFormData({
        username: '',
        email: user.emailAddress || '',
        bio: user.publicMetadata?.bio || '',
      });
    }
  }, [isLoaded, isSignedIn, user]);

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  // const handleSubmit = async (e) => {
  //   e.preventDefault();
  //   console.log({
  //     id: user.id,
  //     email: formData.email,
  //     username: formData.username,
  //     bio: formData.bio,
  //   });

  //   if (!isSignedIn) {
  //     alert('Please sign in to update your profile.');
  //     return;
  //   }

  //   try {
  //     await axios.post('http://localhost:3000/api/users/insert', {
  //       id: user.id,
  //       email: formData.email,
  //       username: formData.username,
  //       bio: formData.bio,
  //     });
  //     alert('Profile saved successfully!');
  //   } catch (error) {
  //     console.error('Error saving profile:', error);
  //     alert('Failed to save profile.');
  //   }
  // };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log({
      clerkid: user.id,  // Clerk ID passed correctly
      email: formData.email,
      username: formData.username,
      bio: formData.bio,
    });
  
    if (!isSignedIn) {
      alert('Please sign in to update your profile.');
      return;
    }
  
    try {
      await axios.post('http://localhost:3000/api/users/insert', {
        clerkid: user.id,   // Pass the correct clerkid here
        email: formData.email,
        username: formData.username,
        bio: formData.bio,
      });
      alert('Profile saved successfully!');
    } catch (error) {
      console.error('Error saving profile:', error);
      alert('Failed to save profile.');
    }
  };
  
  if (!isLoaded || !isSignedIn) {
    return <div>Loading...</div>;
  }

  return (
    <div className="flex">
      {/* Sidebar */}
      <div className="w-1/4">
        <Newsidebar />
      </div>

      {/* Profile Form */}
      <div className="w-3/4 p-6 bg-white shadow-lg rounded-lg">
      <h1>{clerkid}</h1>
        <h2 className="text-3xl font-semibold text-center text-gray-800 mb-6">Create Your Profile</h2>
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label htmlFor="username" className="block text-sm font-medium text-gray-700 mb-2">Username</label>
            <input
              type="text"
              id="username"
              name="username"
              value={formData.username}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-2">Email</label>
            <input
              type="email"
              id="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label htmlFor="bio" className="block text-sm font-medium text-gray-700 mb-2">Bio</label>
            <textarea
              id="bio"
              name="bio"
              value={formData.bio}
              onChange={handleChange}
              required
              className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full px-6 py-3 bg-blue-600 text-white font-semibold rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              Save Profile
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default ProfileForm;
