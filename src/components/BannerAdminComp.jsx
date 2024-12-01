import React, { useState } from "react";
import { useData } from "../context/HomePageContext";

const BannerAdminComp = () => {
  const [newBanner, setNewBanner] = useState({ name: "", imageUrl: "" });
  const { banners, setReqDataBanner, setBannerId } = useData();

  const handleChange = (e) => {
    const { name, value } = e.target;
    setNewBanner({ ...newBanner, [name]: value });
  };

  const onClickCreate = () => {
    setReqDataBanner(newBanner);
  };

  const onDeleteBanner = (index) => {
    setBannerId(banners[index].id);
  };

  return (
    <div className="w-full bg-blue-50 p-4 sm:p-6">
      <div className="max-w-4xl mx-auto bg-white p-4 sm:p-6 rounded-lg shadow-md">
        <h1 className="text-2xl sm:text-3xl font-semibold text-center text-blue-400 mb-4 sm:mb-6">
          Banner Admin Page
        </h1>

        {/* Create a New Banner Section */}
        <div className="mb-6">
          <h2 className="text-xl sm:text-2xl text-blue-500 mb-4">
            Create a New Banner
          </h2>
          <div className="flex flex-col gap-4">
            <input
              type="text"
              name="name"
              placeholder="Banner Name"
              value={newBanner.name}
              onChange={handleChange}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <input
              type="text"
              name="imageUrl"
              placeholder="Image URL"
              value={newBanner.imageUrl}
              onChange={handleChange}
              className="px-3 sm:px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
            <button
              onClick={onClickCreate}
              className="px-4 py-2 bg-blue-400 text-white rounded-lg hover:bg-blue-500 transition-all"
            >
              Add Banner
            </button>
          </div>
        </div>

        {/* Existing Banners Section */}
        <h2 className="text-xl sm:text-2xl text-blue-500 mb-4">
          Existing Banners
        </h2>
        <ul className="space-y-4">
          {banners.map((banner, index) => (
            <li
              key={banner.id}
              className="bg-white p-4 rounded-lg shadow-md flex flex-col sm:flex-row justify-between items-center gap-4"
            >
              <div className="flex items-center gap-4">
                <img
                  src={banner.imageUrl}
                  alt={banner.name}
                  className="w-16 h-16 sm:w-24 sm:h-24 object-cover rounded-lg"
                />
                <div>
                  <h3 className="text-lg sm:text-xl font-semibold text-blue-500">
                    {banner.name}
                  </h3>
                </div>
              </div>
              <div className="flex gap-2">
                <button
                  onClick={() => onDeleteBanner(index)}
                  className="px-3 sm:px-4 py-2 bg-red-400 text-white rounded-lg hover:bg-red-500 transition-all"
                >
                  Delete
                </button>
                <button className="px-3 sm:px-4 py-2 bg-yellow-400 text-white rounded-lg hover:bg-yellow-500 transition-all">
                  Update
                </button>
              </div>
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default BannerAdminComp;
