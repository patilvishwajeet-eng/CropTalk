// import React from "react";
// import { Home, FileText, Settings, HelpCircle, LogIn } from "lucide-react";
// import { Link } from "react-router-dom";

// const Sidebar2 = ({ setShowData }) => {
//   const handleDisplay = () => {
//     setShowData(true);
//   };

//   return (
//     <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
//       {/* Sidebar Header */}
//       <div className="px-4 py-4 text-xl font-bold border-b border-gray-700">
//         My App
//       </div>

//       {/* Sidebar Menu */}
//       <nav className="flex-1 px-4 py-2">
//         {/* Home Button */}
//         <Link
//           to="/"
//           className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
//         >
//           <Home className="h-5 w-5" />
//           <span>Home</span>
//         </Link>

//         {/* Documents Button */}
//         <Link
//           to="/"
//           className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
//         >
//           <FileText className="h-5 w-5" />
//           <span>Documents</span>
//         </Link>

//         {/* Settings Button */}
//         <Link
//           to="/"
//           className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
//         >
//           <Settings className="h-5 w-5" />
//           <span>Settings</span>
//         </Link>

//         {/* Help Button */}
//         <Link
//           to="/"
//           className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
//         >
//           <HelpCircle className="h-5 w-5" />
//           <span>Help</span>
//         </Link>

//         {/* Login Button */}
//         <Link
//           to="/login"
//           className="flex items-center gap-3 px-3 py-2 rounded-md hover:bg-gray-700 transition"
//         >
//           <LogIn className="h-5 w-5" />
//           <span>Login</span>
//         </Link>
//       </nav>

//       {/* Centered Button */}
//     </div>
//   );
// };

// export default Sidebar2;
