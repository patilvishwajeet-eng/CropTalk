import React from 'react'
import { useState, useEffect } from 'react';
import Newsidebar from './Newsidebar';
import axios from 'axios';
const DataPage = () => {
  const [dummy, setDummyData] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios
      .get("http://localhost:3000/api/users/userdata")
      .then((response) => {
        console.log("API Response:", response.data); // ✅ Debugging
        setDummyData(response.data);
      })
      .catch((err) => setError("Error fetching data"));
  }, []);

  return (
    <div className="flex">
      <Sidebar2 />
      <div className="flex flex-col items-center justify-center flex-1 p-4">
        {Array.isArray(dummy) && dummy.length > 0 ? (
          <div className="w-full max-w-4xl overflow-x-auto">
            <table className="w-full border-collapse border border-gray-300 shadow-md">
              <thead>
                <tr className="bg-blue-500 text-white">
                  <th className="border border-gray-300 p-3">Username</th>
                  <th className="border border-gray-300 p-3">Email</th>
                  <th className="border border-gray-300 p-3">Password</th>
                </tr>
              </thead>
              <tbody>
                {dummy.map((user, index) => (
                  <tr key={index} className="bg-white hover:bg-gray-100 transition">
                    <td className="border border-gray-300 p-3 text-center">{user.uname}</td>
                    <td className="border border-gray-300 p-3">{user.email}</td>
                    <td className="border border-gray-300 p-3">{user.password}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No data available</p>
        )}
      </div>

    </div>
  );
}

export default DataPage




