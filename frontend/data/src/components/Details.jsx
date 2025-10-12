import { Sidebar } from 'lucide-react';
import React from 'react';

function Details({ registrations = [] }) {
  return (
    <>
    <Sidebar/>
    <div className="container mx-auto p-4">
      <h1 className="text-2xl font-bold mb-4">Registration Details</h1>
      <table className="min-w-full bg-white border border-gray-300 shadow-lg rounded-lg">
        <thead className="bg-gray-200">
          <tr>
            <th className="py-3 px-6 border-b text-left">Name</th>
            <th className="py-3 px-6 border-b text-left">Email</th>
            <th className="py-3 px-6 border-b text-left">Password</th>
            <th className="py-3 px-6 border-b text-left">Registration Date</th>
          </tr>
        </thead>
        <tbody>
          {registrations.length > 0 ? (
            registrations.map((reg, index) => (
              <tr key={index}>
                <td className="py-3 px-6 border-b">{reg.name}</td>
                <td className="py-3 px-6 border-b">{reg.email}</td>
                <td className="py-3 px-6 border-b">{reg.password}</td>
                <td className="py-3 px-6 border-b">{reg.registrationDate}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="py-3 px-6 border-b text-center">No registrations found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
    </>
  );
}

export default Details;