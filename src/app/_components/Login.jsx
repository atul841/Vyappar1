"use client";
import React, { useState } from "react";
import { useAuth } from "@/lib/auth";
import SignupModal from "./SignupModal";

const Login = () => {
  const { loginWithEmail, loginWithGoogle } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [errorMessage, setErrorMessage] = useState("");
  const [isSignupModalVisible, setSignupModalVisible] = useState(false);

  const toggleSignupModal = () => {
    setSignupModalVisible(!isSignupModalVisible);
  };

  const handleLoginWithEmail = async (e) => {
    e.preventDefault();
    setErrorMessage("");
  
    try {
      const response = await fetch("http://localhost:3000/api/login", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ email, password }),
      });
  
      const data = await response.json();
  
      if (!response.ok) {
        throw new Error(data.message || "Login failed");
      }
  
      console.log("Logged in successfully:", data);
  
      // Redirect to the HomePage page after successful login
      window.location.href = "/HomePage";
    } catch (error) {
      console.error("Error logging in with email:", error);
      setErrorMessage(error.message);
    }
  };
  

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      console.log("Logged in with Google successfully");
    } catch (error) {
      console.error("Error logging in with Google:", error);
      setErrorMessage("There was an error with Google login. Please try again.");
    }
  };

  return (
    <div className="w-full max-w-md">
      <h2 className="text-3xl font-bold text-center mb-4 text-blue-600">
        Welcome :)
      </h2>
      <p className="text-center text-gray-600 mb-6">
        Sign in to your account to continue Selling
      </p>
      <form onSubmit={handleLoginWithEmail} className="space-y-6">
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Email Address
          </label>
          <input
            type="email"
            placeholder="you@example.com"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>
        <div>
          <label className="block text-sm font-medium text-gray-700">
            Password
          </label>
          <input
            type="password"
            placeholder="••••••••"
            required
            className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-blue-500 focus:border-blue-500 sm:text-sm text-black"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>
        {errorMessage && (
          <p className="text-red-500 text-sm">{errorMessage}</p>
        )}
        <button
          type="submit"
          className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-blue-500"
        >
          Sign In
        </button>
      </form>
      <div className="flex justify-center mt-4">
        <button
          type="button"
          onClick={handleGoogleSignIn}
          className="w-full py-2 px-4 border border-transparent rounded-lg shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
        >
          Sign in with Google
        </button>
        
      </div>
      <p className="text-center text-sm mt-4 text-gray-600">
          Don't have an account?{" "}
          <button
            onClick={toggleSignupModal}
            className="text-indigo-600 hover:text-indigo-500"
          >
            Sign up
          </button>
        </p>
      <SignupModal
        show={isSignupModalVisible}
        onSignupPopupClose={toggleSignupModal}
        showLoginPopup={() => console.log("Show Login Popup")}
      />
    </div>
  );
};

export default Login;
