import React, { useState } from "react";
import { API_URL } from "../api";

const SignUp = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [message, setMessage] = useState("");

  const handleSignup = async (e) => {
    e.preventDefault();
    try {
      const res = await fetch(`${API_URL}/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();
      if (res.ok) {
        setMessage("Signup successful! Please log in.");
      } else {
        setMessage(data.error || "Signup failed");
      }
    } catch {
      setMessage("Server error");
    }
  };

  return (
    <div className="flex min-h-screen overflow-hidden">
      {/* Left gradient */}
      <div className="hidden md:block w-1/2 bg-gradient-to-br from-cyan-300 via-pink-200 to-orange-300" />
      
      {/* Right form */}
      <div className="w-full md:w-1/2 flex items-center justify-center p-8 bg-white">
        <form onSubmit={handleSignup} className="max-w-md w-full space-y-4">
          <h1 className="text-4xl font-bold">Sign up</h1>

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e)=>setEmail(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-full"
          />

          <input
            type="password"
            placeholder="Password"
            value={password}
            onChange={(e)=>setPassword(e.target.value)}
            className="w-full px-4 py-3 border border-gray-300 rounded-full"
          />

          <button className="w-full bg-black text-white py-3 rounded-full">
            Sign up
          </button>

          {message && <p className="text-center mt-2 text-red-500">{message}</p>}
        </form>
      </div>
    </div>
  );
};

export default SignUp;
