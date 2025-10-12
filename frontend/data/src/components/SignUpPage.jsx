// import React, { useEffect } from "react";
// import { SignUp, useUser } from "@clerk/clerk-react";
// import axios from "axios";

// const SignUpPage = () => {
//   const { isLoaded, isSignedIn, user } = useUser();

//   useEffect(() => {
//     if (isLoaded && isSignedIn && user) {
//       const syncUser = async () => {
//         try {
//           await axios.post("http://localhost:3000/api/users/insert", {
//             id: user.id,
//             email: user.emailAddresses[0]?.emailAddress,
//             username: user.username || user.id,
//           });
//         } catch (error) {
//           console.error("Error syncing user:", error);
//         }

//         console.log("User data being sent:", {
//           id: user.id,
//           email: user.emailAddresses[0]?.emailAddress,
//           username: user.username || user.id,
//         });
//         console.log("User data sent successfully!");        
//       };

//       syncUser();
//     }
//   }, [isLoaded, isSignedIn, user]);

//   return (
//     <div className="flex justify-center items-center h-screen bg-gray-100">
//       <div className="w-full max-w-md">
//         <SignUp />
//       </div>
//     </div>
//   );
// };

// export default SignUpPage;




import React, { useEffect, useRef } from "react";
import { SignUp, useUser } from "@clerk/clerk-react";
import axios from "axios";

const SignUpPage = () => {
  const { isLoaded, isSignedIn, user } = useUser();
  const hasSyncedRef = useRef(false); // Prevent multiple syncs

  useEffect(() => {
    if (isLoaded && isSignedIn && user && !hasSyncedRef.current) {
      const syncUser = async () => {
        try {
          const userData = {
            id: user.id,
            email: user.emailAddresses[0]?.emailAddress,
            username: user.username || user.id,
          };

          console.log("Sending user data to backend:", userData);

          const response = await axios.post("/api/users/insert", userData);

          console.log("Backend response:", response.data);

          hasSyncedRef.current = true; // Mark as synced
        } catch (error) {
          console.error("Error syncing user:", error);
        }
      };

      syncUser();
    }
  }, [isLoaded, isSignedIn, user]);

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <div className="w-full max-w-md">
        <SignUp path="/sign-up" routing="path" />
      </div>
    </div>
  );
};

export default SignUpPage;
