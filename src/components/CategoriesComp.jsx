import React from "react";
import { useData } from "../context/HomePageContext";
import { useState } from "react";

const CategoriesComp = () => {
  // Access `categories` from the context using the `useData` hook
  const { category, setCategoryIndex, setCategory } = useData();
  const [isFiltered, setIsFiltered] = useState(false);

  return (
    <div className="flex flex-wrap gap-4 items-center p-4">
      {/* Reset Filter Button */}
      {isFiltered && (
        <button
          onClick={() => {
            setIsFiltered(false);
            setCategory();
          }}
          className="bg-blue-600 text-white px-4 py-2 rounded-lg shadow hover:bg-blue-700 transition-all text-sm sm:text-base"
        >
          Reset Filter
        </button>
      )}

      {/* Category Chips */}
      <div className="flex flex-wrap gap-2">
        {category?.map((category, index) => (
          <button
            key={index}
            className={`rounded-full border border-gray-300 px-3 py-1 sm:px-4 sm:py-2 flex items-center text-xs sm:text-sm font-semibold shadow-sm hover:shadow-md transition-transform transform hover:scale-105 ${
              isFiltered ? "bg-blue-500 text-white" : "bg-white text-gray-700"
            }`}
            onClick={() => {
              setIsFiltered(true);
              setCategoryIndex(index);
            }}
          >
            {category.name}
          </button>
        ))}
      </div>
    </div>
  );
};

export default CategoriesComp;
