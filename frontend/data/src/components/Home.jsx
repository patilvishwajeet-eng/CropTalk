// import React, { useState } from "react";
// import { Leaf, Cloud, Users } from "lucide-react";
// import Newsidebar from "./Newsidebar";

// const Home = () => {
//     const [isPopupOpen, setIsPopupOpen] = useState(false);

//     const openPopup = () => setIsPopupOpen(true);
//     const closePopup = () => setIsPopupOpen(false);

//     return (
//         <div className="flex min-h-screen bg-gray-100">
//             {/* Sidebar */}
//             <div className="w-64 bg-gray-800 text-white">
//                 <Newsidebar />
//             </div>

//             {/* Main Content */}
//             <div className="flex-1 p-3">
//                 {/* Hero Section */}
//                 <div className="w-full text-white text-center py-16 px-6 border-b-4 border-black-300 rounded" style={{backgroundColor : "#384959"}}>
//                     <h1 className="text-4xl font-bold">Welcome to the Croptalk...!!</h1>
//                     <p className="mt-4 text-lg">The community to grow smarter with expert insights and community support.</p>
//                     <div className="mt-6 space-x-4">
//                         {/* <button className="bg-white text-green-600 hover:bg-gray-200 py-2 px-4 rounded">Services</button> */}
//                         <button 
//                             className="border-2 border-white text-white hover:bg-white hover:text-green-600 py-2 px-4 rounded"
//                             onClick={openPopup}
//                         >
//                             Learn More
//                         </button>
//                     </div>
//                 </div>

//                 {/* Features Section */}
//                 <div className="grid grid-cols-1 md:grid-cols-3 gap-6 my-12">
//                     <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
//                         <Leaf className="h-10 w-10 text-green-600" />
//                         <div className="text-center mt-4">
//                             <h3 className="font-bold">Crop Discussions</h3>
//                             <p className="text-gray-600">Share insights and get advice on best farming practices. Lorem ipsum dolor sit amet consectetur adipisicing elit. Tempore reiciendis totam laborum quo numquam maxime, molestiae autem a, perspiciatis ab nulla assumenda expedita, eveniet quibusdam ea ratione at id illo.</p>
//                         </div>
//                     </div>
//                     <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
//                         <Cloud className="h-10 w-10 text-blue-600" />
//                         <div className="text-center mt-4">
//                             <h3 className="font-bold">Weather & Reports</h3>
//                             <p className="text-gray-600">Stay updated with real-time weather and crop reports. Lorem, ipsum dolor sit amet consectetur adipisicing elit. Nobis culpa doloribus expedita enim in ratione corporis molestiae beatae illo, alias, quo mollitia? Culpa amet asperiores, quasi optio illo non at.</p>
//                         </div>
//                     </div>
//                     <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
//                         <Users className="h-10 w-10 text-yellow-600" />
//                         <div className="text-center mt-4">
//                             <h3 className="font-bold">Expert Guidance</h3>
//                             <p className="text-gray-600">Connect with agricultural experts and fellow farmers. Lorem ipsum dolor sit amet consectetur adipisicing elit. Illum neque in soluta, consequatur quam, aliquam deleniti a dolores iusto similique vero delectus error vel vitae ex eos itaque temporibus modi?</p>
//                         </div>
//                     </div>
//                 </div>

//                 {/* Footer */}
//                 <footer className="w-full bg-gray-900 text-white text-center py-4">
//                     <p>&copy; 2025 Croptalk. All Rights Reserved.</p>
//                 </footer>
//             </div>

//             {/* Popup Component */}
//             {isPopupOpen && (
//                 <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center">
//                     <div className="bg-white p-6 rounded-lg shadow-lg max-w-md">
//                         <h2 className="text-xl font-bold">More About Croptalk</h2>
//                         <p className="mt-4 text-gray-600">
//                         Croptalk is a community-driven platform designed to connect farmers, agricultural experts, and enthusiasts. It serves as a hub for knowledge-sharing, discussions, and problem-solving related to farming practices, crop management, and sustainable agriculture. The platform allows farmers to seek advice, share experiences, and stay updated with the latest advancements in agritech. Croptalk supports multiple languages, enabling accessibility for diverse farming communities
//                         </p>
//                         <button 
//                             className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
//                             onClick={closePopup}
//                         >
//                             Close
//                         </button>
//                     </div>
//                 </div>
//             )}
//         </div>
//     );
// };

// export default Home;


import React, { useState } from "react";
import { Leaf, Cloud, Users, Menu } from "lucide-react";
import Newsidebar from "./NewSidebar";

const Home = () => {
  const [isPopupOpen, setIsPopupOpen] = useState(false);
  const [sidebarOpen, setSidebarOpen] = useState(false);

  const toggleSidebar = () => setSidebarOpen(!sidebarOpen);
  const openPopup = () => setIsPopupOpen(true);
  const closePopup = () => setIsPopupOpen(false);

  return (
    <div className="flex min-h-screen bg-gray-100">
      {/* Sidebar */}
      <div
        className={`bg-gray-800 text-white ${
          sidebarOpen ? "w-64" : "w-16"
        } transition-all duration-300 fixed md:static top-0 left-0 h-full z-30 md:z-auto`}
      >
        <div className="p-2 md:hidden flex justify-end">
          <button onClick={toggleSidebar}>
            <Menu className="text-white" />
          </button>
        </div>
        <div className="hidden md:block">
          <Newsidebar />
        </div>
        <div className="block md:hidden text-center">
          {/* Only show icons on small screen */}
          <div className="my-4">
            <Leaf className="mx-auto mb-3" />
            <Cloud className="mx-auto mb-3" />
            <Users className="mx-auto" />
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex-1 ml-16 md:ml-64 p-4">
        {/* Hero Section */}
        <div
          className="w-full text-white text-center py-12 px-4 md:px-6 rounded"
          style={{ backgroundColor: "#384959" }}
        >
          <h1 className="text-3xl md:text-4xl font-bold">
            Croptalk...!!
          </h1>
          <p className="mt-4 text-base md:text-lg">
            The community to grow smarter with expert insights and community support.
          </p>
          <div className="mt-6 space-x-4">
            <button
              className="border-2 border-white text-white hover:bg-white hover:text-green-600 py-2 px-4 rounded"
              onClick={openPopup}
            >
              Learn More
            </button>
          </div>
        </div>

        {/* Features Section */}
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6 my-12">
          <FeatureCard icon={<Leaf className="h-10 w-10 text-green-600" />} title="Crop Discussions" desc="Share insights and get advice on best farming practices." />
          <FeatureCard icon={<Cloud className="h-10 w-10 text-blue-600" />} title="Weather & Reports" desc="Stay updated with real-time weather and crop reports." />
          <FeatureCard icon={<Users className="h-10 w-10 text-yellow-600" />} title="Expert Guidance" desc="Connect with agricultural experts and fellow farmers." />
        </div>

        {/* Footer */}
        <footer className="w-full bg-gray-900 text-white text-center py-4 rounded">
          <p>&copy; 2025 Croptalk. All Rights Reserved.</p>
        </footer>
      </div>

      {/* Popup Component */}
      {isPopupOpen && (
        <div className="fixed inset-0 bg-gray-300 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white p-6 rounded-lg shadow-lg max-w-md mx-4">
            <h2 className="text-xl font-bold">More About Croptalk</h2>
            <p className="mt-4 text-gray-600">
              Croptalk is a community-driven platform designed to connect farmers, agricultural experts, and enthusiasts.
            </p>
            <button
              className="mt-6 bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600"
              onClick={closePopup}
            >
              Close
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

const FeatureCard = ({ icon, title, desc }) => (
  <div className="flex flex-col items-center p-6 bg-white shadow-lg rounded-lg">
    {icon}
    <div className="text-center mt-4">
      <h3 className="font-bold text-lg">{title}</h3>
      <p className="text-gray-600 text-sm">{desc}</p>
    </div>
  </div>
);

export default Home;
