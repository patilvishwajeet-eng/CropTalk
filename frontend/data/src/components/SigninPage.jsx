import React, { useEffect } from "react";
import { SignIn } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import { useUser } from "@clerk/clerk-react";

const SignInPage = () => {
  const { user } = useUser();
  const navigate = useNavigate();

  useEffect(() => {
    if (user) {
      navigate("/home");
    }
  }, [user, navigate]);

  return (
    <div className="flex justify-center items-center min-h-screen bg-gradient-to-br from-green-50 to-green-200 px-4">
      <SignIn
        appearance={{
          elements: {
            formButtonPrimary: "bg-green-600 hover:bg-green-700 text-white rounded-lg text-sm",
          },
        }}
        routing="path"
        path="/signin"
      />
    </div>
  );
};

export default SignInPage;
