import { User, Mail, Lock, ArrowRight } from "lucide-react";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";
import { useState , useEffect } from "react";
import axios from "axios";

export default function LoginPage() {
    const [uname , setName] = useState("");
    const [email , setEmail] = useState("");
    const [password , setPassword] = useState("");
    const navigate = useNavigate();

  const handleSubmit = (e) => {
    e.preventDefault(); 
    axios.post('http://localhost:3000/api/users/register',{uname,email,password})
    .then((response) => {
      console.log(response);
      alert(`Login successful`);

      setName('');
    setEmail('');
    setPassword('');
    })
    .catch((error) => {
      console.log(error);
    });

    
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-900 p-4">
      <div className="w-full max-w-md bg-gray-800 rounded-lg shadow-2xl p-8">
        <h2 className="text-3xl font-bold text-center mb-6 text-white">Login</h2>

        <form className="space-y-4" onSubmit={handleSubmit}>
          {/* Name Field */}
          <div className="space-y-2">
            <label htmlFor="name" className="block text-gray-300">Name</label>
            <div className="relative">
              <User className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                className="pl-10 w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md py-2"
                id="name"
                placeholder="John Doe"
                type="text"
                value={uname}
                onChange={(e) => setName(e.target.value)}
              />
            </div>
          </div>

          {/* Email Field */}
          <div className="space-y-2">
            <label htmlFor="email" className="block text-gray-300">Email</label>
            <div className="relative">
              <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                className="pl-10 w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md py-2"
                id="email"
                placeholder="you@example.com"
                type="email"
                value={email}
                onChange={(e)=>setEmail(e.target.value)}
              />
            </div>
          </div>

          {/* Password Field */}
          <div className="space-y-2">
            <label htmlFor="password" className="block text-gray-300">Password</label>
            <div className="relative">
              <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={18} />
              <input
                className="pl-10 w-full bg-gray-700 border border-gray-600 text-white placeholder-gray-400 rounded-md py-2"
                id="password"
                placeholder="••••••••"
                type="password"
                value={password}
                onChange={(e)=>setPassword(e.target.value)}
              />
            </div>
          </div>

          {/* Login Button */}
          <button
          type="submit" 
          className="w-full mt-6 bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded-md flex items-center justify-center">
            Login
            <ArrowRight className="ml-2" size={18} />
          </button>
        </form>

        {/* Forgot Password Link */}
        <div className="mt-6 text-center">
          <Link to="/" className="text-sm text-blue-400 hover:underline">
            Forgot password?
          </Link>
        </div>
      </div>
    </div>
  );
}
