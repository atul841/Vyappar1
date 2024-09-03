"use client";
import { useAuth } from "@/lib/auth";
import React from "react";
import Loading from "./Loading";
import Login from "./Login";
import SellerPanel from "./SellerPanel"; // Import SellerPanel component

const HomePage = () => {
  const { loading, currentUser } = useAuth(); // Correct reference to currentUser

  if (loading) {
    return (
     <Loading/>
    );
  }

  return currentUser ? (
    <SellerPanel /> // Render SellerPanel if the user is a seller
  ) : (
    <>
      <h1 className="text-6xl font-bold text-center">Vyappar app!</h1>
      <div className="min-h-screen flex bg-white">
        {/* Left side: Login Component */}
        <div className="w-1/2 flex items-center justify-center p-6 my-3">
          <div className="max-w-sm w-full">
            <Login />
          </div>
        </div>

        {/* Right side: Business Awareness Section */}
        <div className="w-1/2 flex flex-col justify-center p-8">
          <h1 className="text-3xl font-bold text-indigo-700 mb-4">
            Aapki dukan, Aapki Pocket m!
          </h1>
          {/* Additional Graphic/Image */}
          <div className="mt-8">
            <img
              src="https://img.freepik.com/free-vector/flat-design-delivery-concept_23-2149158700.jpg?ga=GA1.2.1075107906.1721390152"
              alt="Business Graphic"
              className="w-full"
            />
          </div>
        </div>
      </div>
    </>
  );
};

export default HomePage;
