import React, { useState } from "react";
import  API_URL  from "../api";

const SignIn = () => {
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignin = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/signin`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, password }),
      });

      const data = await res.json();
      if (res.ok) {
        localStorage.setItem("token", data.token); // save token
        setMessage("Login successful!");
        // navigate to dashboard if using react-router
        // navigate("/dashboard");
      } else {
        setMessage(data.error || "Login failed");
      }
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div className="flex justify-center items-center min-h-screen bg-black">
      <div className="bg-white rounded-3xl shadow-lg flex max-w-4xl w-full">
        
        {/* Left form */}
        <div className="w-1/2 p-8">
          <form onSubmit={handleSignin} className="space-y-4">
            <h1 className="text-5xl font-bold">Welcome</h1>
            
            <input
              type="text"
              placeholder="Username"
              value={username}
              onChange={(e)=>setUsername(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg"
            />
            <input
              type="password"
              placeholder="Password"
              value={password}
              onChange={(e)=>setPassword(e.target.value)}
              className="w-full px-4 py-3 bg-gray-100 rounded-lg"
            />
            
            <button className="w-full bg-black text-white py-3 rounded-lg">
              NEXT
            </button>
            
            {message && <p className="text-red-500 mt-2">{message}</p>}
          </form>
        </div>

        {/* Right image */}
        <div className="w-1/2 bg-orange-500 flex items-center justify-center">
          <img
            src="https://via.placeholder.com/400x600?text=Space+Adventure"
            alt="Space Adventure"
            className="object-cover h-full w-full rounded-r-3xl"
          />
        </div>
      </div>
    </div>
  );
};

export default SignIn;
