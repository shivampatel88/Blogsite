import React, { useState } from "react";
import API_URL  from "../api";
import {useNavigate} from "react-router-dom"
import googleLogo from "../assets/icons8-google.svg";


const SignUp = () => {
  const [email, setEmail] = useState("");
  const [firstname,setFirstname] = useState("");
  const [lastname,setLastname] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");
  const navigate = useNavigate()

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password,firstname,lastname }),
      });

      if (!email || !password || !firstname || !lastname) {
      setMessage("Please fill in all fields");
      return;
     }

      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful! Please log in.");
        setTimeout(() => navigate("/SignIn"), 1500);
      } else {
        setMessage(data.error || "Signup failed");
      }
    } catch {
      setMessage("Server error");
    }
  };

  return (
      <div className="min-h-screen bg-gray-900 text-white flex justify-center items-center px-4">
        <div className="max-w-6xl w-full flex flex-col md:flex-row bg-gray-800 rounded-lg overflow-hidden shadow-lg">
  
          <div className="w-full md:w-1/2 p-10">
            <h2 className="text-2xl font-bold mb-2 flex items-center gap-2 ">
              <img src="/logo2.0.png" className="h-23 w-23 justify-center" alt="Logo" />
            </h2>
            <h1 className="text-3xl font-bold mt-4 mb-2">Create your Account</h1>
            <p className="text-gray-400 text-sm mb-6">
              Please Register to get more exclusive content and cool features. Already have an account?{" "}
              <span className="text-green-400 cursor-pointer"
                onClick={() => navigate("/SignIn")}>
                Login here.
              </span>
            </p>
  
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
              <div>
                <label className="text-sm">Your username</label>
                <input type="email" placeholder="name@company.com" value={email}
                onChange={(e) => setEmail(e.target.value)} 
                className="mt-1 w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm">First Name</label>
                <input type="text" placeholder="e.g. Bonnie" value={firstname}
                onChange={(e) => setFirstname(e.target.value)}
                className="mt-1 w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm">Last Name</label>
                <input type="text" placeholder="e.g. Green" value={lastname}
                onChange={(e) => setLastname(e.target.value)}
                className="mt-1 w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
              </div>
              <div>
                <label className="text-sm">Password</label>
                <input type="password" placeholder="••••••••" value={password} 
                onChange={(e) => setPassword(e.target.value)}
                className="mt-1 w-full px-4 py-2 rounded bg-gray-700 border border-gray-600 focus:outline-none"
                />
              </div>
            </div>
  
            <div className="flex items-center gap-4 my-4">
              <hr className="flex-grow border-gray-600" />
              <span className="text-gray-400 text-sm">or</span>
              <hr className="flex-grow border-gray-600" />
            </div>
  
            <div className="flex flex-col gap-3">
              <button className="bg-white text-black flex items-center justify-center gap-2 px-4 py-2 rounded">
                <img src={googleLogo} className="w-5 h-5" alt="Google" />
                Sign up with Google
              </button>
              <button className="bg-white text-black flex items-center justify-center gap-2 px-4 py-2 rounded">
                <img src="https://upload.wikimedia.org/wikipedia/commons/f/fa/Apple_logo_black.svg" className="w-5 h-5" alt="Apple"/>
                Sign up with Apple
              </button>
            </div>
  
            <div className="mt-6 text-sm text-gray-400">
              <label className="flex items-start gap-2 mb-2">
                <input type="checkbox" className="mt-1" />
                <span>
                  By signing up, you are creating a Blogsite account and agree to our{" "}
                  <a href="#" className="text-blue-400 underline">Terms of Use</a>{" "}
                  and{" "}
                  <a href="#" className="text-blue-400 underline">Privacy Policy</a>.
                </span>
              </label>
              <label className="flex items-start gap-2">
                <input type="checkbox" className="mt-1" />
                <span>Email me about New Blog updates and resources.</span>
              </label>
            </div>
  
            <button onClick={handleSignup}
              className="mt-6 bg-green-500 hover:bg-green-600 w-full py-2 rounded text-white font-semibold">
              Create an account </button>
          </div>
          
          <div className="hidden md:flex w-1/2 items-center justify-center bg-gray-900 p-4">
            {/* --- MODIFIED IMAGE TAG --- */}
            <img 
              src="/Gemini_Generated_Image.png" 
              alt="3D person illustration" 
              className="w-3/4 transition-all duration-500 [filter:drop-shadow(0_0_15px_rgba(129,140,248,0.5))] hover:[filter:drop-shadow(0_0_25px_rgba(129,140,248,0.8))]"
            />
          </div>
          {message && <p className="text-center mt-2 text-red-500">{message}</p>}

        </div>
      </div>
    );
};

export default SignUp;
