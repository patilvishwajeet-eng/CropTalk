// import React from "react";
// import { Home, MessageCircle, CloudSun, BotMessageSquare, User } from "lucide-react";
// import { Link } from "react-router-dom";
// import SignOutBtn from "./SignOutBtn";
// import { useUser } from "@clerk/clerk-react";

// const NewSidebar = () => {
//   const { isSignedIn, user } = useUser();

//   return (
//     <div className="h-screen w-64 text-white flex flex-col p-4 shadow-lg" style={{ backgroundColor: "#6A89A7" }}>
//       <div className="text-2xl font-bold text-center mb-6 flex flex-col items-center gap-3">
//         <Link to="/userpage" className="flex items-center gap-2">
//           <User className="h-6 w-6 text-white" />
//           <span>Croptalk</span>
//         </Link>
//         {isSignedIn && <span className="text-sm">Welcome, {user.firstName}!</span>}
//       </div>
      
//       <nav className="flex-1 space-y-4">
//         <Link to="/home" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-green-700 transition">
//           <Home className="h-5 w-5" />
//           <span>Home</span>
//         </Link>
//         <Link to="/community" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-green-700 transition">
//           <MessageCircle className="h-5 w-5" />
//           <span>Discussions</span>
//         </Link>
//         <Link to="/weather" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-green-700 transition">
//           <CloudSun className="h-5 w-5" />
//           <span>Weather</span>
//         </Link>
//         <Link to="/ai" className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-green-700 transition">
//           <BotMessageSquare className="h-5 w-5" />
//           <span>AI</span>
//         </Link>
//         <div className="flex items-center gap-3 px-4 py-3 rounded-md hover:bg-blue-700 transition">
//           <SignOutBtn /> 
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default NewSidebar;











// import React, { useState } from "react";
// import {
//   Home,
//   MessageCircle,
//   CloudSun,
//   BotMessageSquare,
//   User,
//   Menu
// } from "lucide-react";
// import { Link } from "react-router-dom";
// import SignOutBtn from "./SignOutBtn";
// import { useUser } from "@clerk/clerk-react";

// const NewSidebar = ({ isOpen, toggleSidebar }) => {
//   const { isSignedIn, user } = useUser();

//   return (
//     <div
//       className={`fixed top-0 left-0 h-full w-64 bg-[#6A89A7] text-white z-50 transform transition-transform duration-300 ${
//         isOpen ? "translate-x-0" : "-translate-x-full"
//       } md:translate-x-0`}
//     >
//       <div className="flex justify-between items-center px-4 py-3">
//         <div className="flex items-center gap-2">
//           <User className="h-5 w-5" />
//           <span className="text-xl font-bold">Croptalk</span>
//         </div>
//         <button
//           onClick={toggleSidebar}
//           className="text-white md:hidden"
//         >
//           <Menu />
//         </button>
//       </div>

//       {isSignedIn && (
//         <p className="text-sm px-4 pb-3">Welcome, {user.firstName}!</p>
//       )}

//       <nav className="space-y-4 mt-4 px-4">
//         <Link to="/home" className="flex items-center gap-3 py-2 hover:bg-green-700 rounded px-2">
//           <Home className="h-5 w-5" />
//           <span>Home</span>
//         </Link>
//         <Link to="/community" className="flex items-center gap-3 py-2 hover:bg-green-700 rounded px-2">
//           <MessageCircle className="h-5 w-5" />
//           <span>Discussions</span>
//         </Link>
//         <Link to="/weather" className="flex items-center gap-3 py-2 hover:bg-green-700 rounded px-2">
//           <CloudSun className="h-5 w-5" />
//           <span>Weather</span>
//         </Link>
//         <Link to="/ai" className="flex items-center gap-3 py-2 hover:bg-green-700 rounded px-2">
//           <BotMessageSquare className="h-5 w-5" />
//           <span>AI</span>
//         </Link>
//         <div className="flex items-center gap-3 py-2 hover:bg-green-700 rounded px-2">
//           <SignOutBtn />
//         </div>
//       </nav>
//     </div>
//   );
// };

// export default NewSidebar;































import React, { useState } from "react";
import {
  Home,
  MessageCircle,
  CloudSun,
  BotMessageSquare,
  User,
  Menu,
  MessageSquareText
} from "lucide-react"; // 👈 Added Chat Icon
import { Link } from "react-router-dom";
import SignOutBtn from "./SignOutBtn";
import { useUser } from "@clerk/clerk-react";

const NewSidebar = ({ isOpen, toggleSidebar }) => {
  const { isSignedIn, user } = useUser();

  return (
    <div
      className={`fixed top-0 left-0 h-full w-64 bg-[#6A89A7] text-white z-50 transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "-translate-x-full"
      } md:translate-x-0`}
    >
      <div className="flex justify-between items-center px-4 py-3">
      <Link to="/userpage" className="flex items-center gap-2 hover:opacity-80">
  <User className="h-5 w-5" />
  <span className="text-xl font-bold">Croptalk</span>
</Link>

        <button onClick={toggleSidebar} className="text-white md:hidden">
          <Menu />
        </button>
      </div>

      {isSignedIn && (
        // <p className="text-sm px-4 pb-3">Welcome, {user.firstName}!</p>
        <p className="text-sm px-4 pb-3">Welcome, {user.username}!</p>
      )}

      <nav className="space-y-4 mt-4 px-4">
        <Link to="/home" className="flex items-center gap-3 py-2 hover:bg-green-700 rounded px-2">
          <Home className="h-5 w-5" />
          <span>Home</span>
        </Link>
        <Link to="/community" className="flex items-center gap-3 py-2 hover:bg-green-700 rounded px-2">
          <MessageCircle className="h-5 w-5" />
          <span>Discussions</span>
        </Link>
        <Link to="/weather" className="flex items-center gap-3 py-2 hover:bg-green-700 rounded px-2">
          <CloudSun className="h-5 w-5" />
          <span>Weather</span>
        </Link>
        <Link to="/ai" className="flex items-center gap-3 py-2 hover:bg-green-700 rounded px-2">
          <BotMessageSquare className="h-5 w-5" />
          <span>Crops</span>
        </Link>

        {/* 💬 Chat Navigation */}
        <Link to="/chat" className="flex items-center gap-3 py-2 hover:bg-green-700 rounded px-2">
          <MessageSquareText className="h-5 w-5" />
          <span>Chat</span>
        </Link>

        {/* ConnectionsPage */}
        <Link to="/connections" className="flex items-center gap-3 py-2 hover:bg-green-700 rounded px-2">
          <MessageSquareText className="h-5 w-5" />
          <span>Connections</span>
        </Link>


        <div className="flex items-center gap-3 py-2 hover:bg-green-700 rounded px-2">
          <SignOutBtn />
        </div>
      </nav>
    </div>
  );
};

export default NewSidebar;
