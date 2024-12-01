import { useState } from "react";
import UserComp from "./UserComp";
import BannerAdminComp from "./BannerAdminComp";

const SideBarComp = () => {
  const [sideBarState, setSideBarState] = useState(false);
  const [index, setIndex] = useState("");
  const adminSidebars = [
    "User",
    "Banner",
    "Promo",
    "Category",
    "Payment Method",
    "Transaction",
  ];

  const sideBarShow = () => {
    setSideBarState(!sideBarState);
  };

  const choosePage = (index) => {
    setIndex(index);
  };

  return (
    <div className="flex">
      {/* Sidebar Menu Button */}
      {!sideBarState && (
        <button
          className="fixed top-4 left-4 z-50 rounded-full bg-blue-600 p-3 text-white shadow-lg hover:bg-blue-700 transition duration-300"
          onClick={sideBarShow}
        >
          <img src="sidebar-menu.png" className="w-6 h-6" alt="Open Sidebar" />
        </button>
      )}

      {/* Sidebar */}
      <div
        className={`fixed top-0 left-0 bg-blue-600 text-white h-full w-72 shadow-lg transform transition-transform duration-300 z-40 ${
          sideBarState ? "translate-x-0" : "-translate-x-full"
        }`}
      >
        <div className="flex flex-col py-6">
          {/* Sidebar Header */}
          <div className="text-center text-2xl font-bold mb-4">Admin Panel</div>

          <button
            className="absolute top-4 right-4 text-white hover:text-blue-300"
            onClick={sideBarShow}
          >
            <img
              src="close-symbol.png"
              alt="Close Sidebar"
              className="w-6 h-6"
            />
          </button>

          {/* Sidebar Items */}
          <div className="space-y-4">
            {adminSidebars.map((item, idx) => (
              <div
                key={idx}
                onClick={() => choosePage(idx)}
                className={`px-6 py-3 rounded-lg cursor-pointer ${
                  index === idx
                    ? "bg-blue-700 font-semibold"
                    : "hover:bg-blue-500"
                } transition-all duration-300`}
              >
                {item}
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Content Area */}
      <div
        className={`flex-1 bg-gray-100 min-h-screen transition-all duration-300 ${
          sideBarState ? "ml-72" : ""
        }`}
      >
        <div className="container mx-auto py-10 px-6">
          {adminSidebars[index] === "User" && <UserComp />}
          {adminSidebars[index] === "Banner" && <BannerAdminComp />}
          {!adminSidebars[index] && (
            <div className="text-center text-2xl text-gray-500">
              Select an option from the sidebar
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default SideBarComp;
