"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation"; // Import useRouter from Next.js
import { useAuth } from "@/lib/auth";

const SignupModal = ({ show, onSignupPopupClose, showLoginPopup }) => {
  const { loginWithGoogle } = useAuth();
  const router = useRouter(); // Initialize router
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [username, setUsername] = useState("");
  const [mobile, setMobile] = useState("");
  const [errorMessage, setErrorMessage] = useState("");

  if (!show) {
    return null;
  }

  const handleGoogleSignIn = async () => {
    try {
      await loginWithGoogle();
      onSignupPopupClose();
      router.push("/"); // Redirect to profile page after Google sign-in
    } catch (error) {
      console.error("Error logging in with Google:", error);
      setErrorMessage("There was an error logging in with Google. Please try again.");
    }
  };

  const handleSignupWithEmailAndPassword = async (e) => {
    e.preventDefault();
    setErrorMessage(""); // Clear previous error message

    if (!username || !email || !password || !mobile) {
      setErrorMessage("Please fill in all fields.");
      return;
    }

    // Simple validation for email and mobile number
    const emailPattern = /\S+@\S+\.\S+/;
    if (!emailPattern.test(email)) {
      setErrorMessage("Please enter a valid email address.");
      return;
    }

    if (mobile.length !== 10) { // Adjust this length based on your requirements
      setErrorMessage("Please enter a valid mobile number.");
      return;
    }

    try {
      const response = await fetch("http://localhost:3000/api/signup", { // Updated API endpoint
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ username, email, password, phoneNumber: mobile }),
      });

      const result = await response.json();

      if (response.ok) {
        onSignupPopupClose();
        router.push("/"); // Redirect to profile page after successful signup
      } else {
        setErrorMessage(result.message || "There was an error with your signup. Please try again.");
      }
    } catch (error) {
      console.error("Error signing up with email and password:", error);
      setErrorMessage("There was an error with your signup. Please try again.");
    }
  };

  const handleLoginClick = (e) => {
    e.preventDefault();
    showLoginPopup();
    onSignupPopupClose();
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center z-50 bg-black bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg relative w-full max-w-md mx-4">
        <button
          onClick={onSignupPopupClose}
          className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
        >
          ×
        </button>
        <form className="space-y-4" onSubmit={handleSignupWithEmailAndPassword}>
          <h3 className="text-xl font-bold">Create Account!</h3>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Username
            </label>
            <input
              type="text"
              placeholder="Username"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Email
            </label>
            <input
              type="email"
              placeholder="Email"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
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
              placeholder="Password"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-gray-700">
              Mobile Number
            </label>
            <input
              type="tel"
              placeholder="Mobile Number"
              required
              className="mt-1 block w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 sm:text-sm text-black"
              value={mobile}
              onChange={(e) => setMobile(e.target.value)}
            />
          </div>
          {errorMessage && (
            <p className="text-red-500 text-sm">{errorMessage}</p>
          )}
          <div className="flex justify-center">
            <button
              type="submit"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
            >
              Signup
            </button>
          </div>
          <p className="text-center text-sm mt-2">
            Already have an account?{" "}
            <a
              href="#"
              onClick={handleLoginClick}
              className="text-indigo-600 hover:text-indigo-500"
            >
              Login
            </a>
          </p>
          <div className="flex justify-center">
            <button
              onClick={handleGoogleSignIn}
              type="button"
              className="w-full py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-red-500"
            >
              Sign in with Google
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default SignupModal;
