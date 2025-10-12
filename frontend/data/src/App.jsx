// import { useEffect, useState } from 'react';
// import './App.css';
// import { Link, Route, Routes, Router, BrowserRouter } from 'react-router-dom';
// import DataPage from './components/DataPage';
// import Login from './components/Login';
// import Home from './components/Home'; 
// import CommunityPage from './components/CommunityPage';
// import Landing from './components/Landing';
// import UserPage from './components/UserPage';
// import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
// import SignInPage from './components/SigninPage';
// import ProtectedRoute from './components/ProtectedRoute'
// import SignUpPage from './components/SignUpPage';
// import AI from './components/AI'
// import Weather from './components/Weather'

// function App() {
//   const [showData, setShowData] = useState(false);
//   return (
//     <>
//       <BrowserRouter>
//         {/* Main content area */}
//           <Routes>
            
//             <Route path="/" element={<Landing/>}/>
//             <Route path="/login" element={<Login/>}/>
//             <Route path="/data" element={<DataPage/>}/>
//             <Route path="/logout" element={<Landing/>}/>
//             <Route path="/signin" element={<SignInPage />} />
//             <Route path="/signup" element={<SignUpPage />} />
//             <Route path="/ai" element={<AI/>} />
//             <Route path="/weather" element={<Weather/>} />
//             {/*Protected paths */}
//             <Route path="/community" element={<ProtectedRoute component={CommunityPage}/>}/>
//             <Route path="/home" element={<ProtectedRoute component={Home}/>}/>
//             <Route path="/userpage" element={<ProtectedRoute component={UserPage}/>}/> 
//             <Route path="/user/:username" element={<UserPage />} />  
//           </Routes>
//       </BrowserRouter>
//     </>
//   );
// }
// export default App;





import { useEffect, useState } from 'react';
import './App.css';
import { Link, Route, Routes, BrowserRouter, useParams } from 'react-router-dom';
import DataPage from './components/DataPage';
import Login from './components/Login';
import Home from './components/Home'; 
import CommunityPage from './components/CommunityPage';
import Landing from './components/Landing';
import UserPage from './components/UserPage';
import { SignIn, SignedIn, SignedOut } from "@clerk/clerk-react";
import SignInPage from './components/SigninPage';
import ProtectedRoute from './components/ProtectedRoute';
import SignUpPage from './components/SignUpPage';
import AI from './components/AI';
import Weather from './components/Weather';
import ChatBox from './components/ChatBox'; //
import ProfileForm from './components/ProfileForm'; // Import ProfileForm component
import ConnectionsPage from './components/ConnectionsPage'; // Import ConnectionsPage component

// 🟢 Wrapper to extract receiverId from route params
const ChatWrapper = () => {
  const { receiverId } = useParams();
  return <ChatBox receiverId={receiverId} />;
};

function App() {
  const [showData, setShowData] = useState(false);

  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Landing />} />
          <Route path="/login" element={<Login />} />
          <Route path="/data" element={<DataPage />} />
          <Route path="/logout" element={<Landing />} />
          <Route path="/signin" element={<SignInPage />} />
          <Route path="/signup" element={<SignUpPage />} />
          <Route path="/ai" element={<AI />} />
          <Route path="/weather" element={<Weather />} />
          <Route path="/chat" element={<ChatBox />} />
          <Route path="/profile" element={<ProfileForm />} />
          <Route path="/connections" element={<ConnectionsPage />} />
          {/* <Route path="/userpage" element={<UserPage />} /> */}

          {/* 🛡️ Protected routes */}
          <Route path="/community" element={<ProtectedRoute component={CommunityPage} />} />
          <Route path="/home" element={<ProtectedRoute component={Home} />} />
          <Route path="/userpage" element={<ProtectedRoute component={UserPage} />} />
          <Route path="/user/:userId" element={<UserPage />} />

          {/* 🟢 Chat route (Protected) */}
          {/* <Route path="/chat/:receiverId" element={<ProtectedRoute component={ChatWrapper} />} /> */}
        </Routes> 
      </BrowserRouter>
    </>
  );
}

export default App;
