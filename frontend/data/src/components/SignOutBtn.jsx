import React from "react";
import { useClerk } from "@clerk/clerk-react";
import { useNavigate } from "react-router-dom";
import {Settings} from "lucide-react"

const SignOutBtn = () => {
  const { signOut } = useClerk();
  const navigate = useNavigate();

  const handleSignOut = () => {
    signOut(); // Sign the user out
    navigate("/"); // Redirect to home after sign out
  };

  return (
    <button
      onClick={handleSignOut}
      className="flex items-center gap-3  py-3 rounded-md hover:bg-blue-700 transition"
    >
      <Settings className="h-5 w-5" />
      Sign Out
    </button>
  );
};

export default SignOutBtn;
