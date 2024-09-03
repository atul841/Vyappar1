import dynamic from "next/dynamic";
import { useEffect, useState } from "react";
import { useAuth } from "@/lib/auth";
import Loading from "./Loading";

// Dynamically import Profile component to avoid SSR issues
const Profile = dynamic(() => import("./sellerComponent/Profile"), { ssr: false });

const SellerPanel = () => {
  const { loading, currentUser, logout } = useAuth();
  const [selectedTool, setSelectedTool] = useState("profile");

  useEffect(() => {
    if (loading) return;
    // Other client-side logic if needed
  }, [loading]);

  if (loading) {
    return <Loading />;
  }

  const handleToolClick = (tool) => {
    setSelectedTool(tool);
  };

  const renderContent = () => {
    switch (selectedTool) {
      case "profile":
        return <Profile />;
      case "products":
        return <div>Products Management Content</div>;
      case "orders":
        return <div>Orders Management Content</div>;
      case "analytics":
        return <div>Analytics Content</div>;
      case "settings":
        return <div>Settings Content</div>;
      default:
        return <div>Overview Content</div>;
    }
  };

  return (
    <div className="min-h-screen flex">
      <div className="w-1/4 bg-gray-800 text-white p-4">
        <div className="mb-6">
          <p className="text-lg font-semibold mb-4">
            Hello, {currentUser?.displayName}
          </p>
        </div>
        <ul className="space-y-4">
          <li>
            <button
              className={`w-full text-left p-2 ${
                selectedTool === "profile"
                  ? "bg-gray-700"
                  : "hover:bg-gray-600"
              }`}
              onClick={() => handleToolClick("profile")}
            >
              Profile
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 ${
                selectedTool === "products"
                  ? "bg-gray-700"
                  : "hover:bg-gray-600"
              }`}
              onClick={() => handleToolClick("products")}
            >
              Products
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 ${
                selectedTool === "orders" ? "bg-gray-700" : "hover:bg-gray-600"
              }`}
              onClick={() => handleToolClick("orders")}
            >
              Orders
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 ${
                selectedTool === "analytics"
                  ? "bg-gray-700"
                  : "hover:bg-gray-600"
              }`}
              onClick={() => handleToolClick("analytics")}
            >
              Analytics
            </button>
          </li>
          <li>
            <button
              className={`w-full text-left p-2 ${
                selectedTool === "settings"
                  ? "bg-gray-700"
                  : "hover:bg-gray-600"
              }`}
              onClick={() => handleToolClick("settings")}
            >
              Settings
            </button>
          </li>
          <li>
            <button
              className="w-full text-left p-2 text-white py-2 px-4 hover:bg-gray-600"
              onClick={logout}
            >
              Logout
            </button>
          </li>
        </ul>
      </div>
      <div className="w-3/4 p-6 bg-white flex-1">
        <h1 className="text-3xl font-bold text-gray-800 mb-6">
          Seller Dashboard
        </h1>
        {renderContent()}
      </div>
    </div>
  );
};

export default SellerPanel;
