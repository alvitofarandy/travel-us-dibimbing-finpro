import React, { useEffect, useState } from "react";
import axios from "axios";
import Popup from "reactjs-popup";
import "reactjs-popup/dist/index.css";

const PromoComponent = ({ openPromo, promos, updateIndexChanger }) => {
  const [error, setError] = useState("");
  const [currentPage, setCurrentPage] = useState(0);

  let indexChanger = 0;

  // Calculate the range of promotions to display based on current page
  const promosPerPage = 3;
  const startIndex = currentPage * promosPerPage;
  const selectedPromos = promos.slice(startIndex, startIndex + promosPerPage);

  // Handle next and previous page clicks
  const handleNext = () => {
    if (startIndex + promosPerPage < promos.length) {
      setCurrentPage(currentPage + 1);

      const newIndexChanger = startIndex + 3;
      updateIndexChanger(newIndexChanger); // Send the updated value to the parent
    }
  };
  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      const newIndexChanger = startIndex - 3;
      updateIndexChanger(newIndexChanger); // Send the updated value to the parent
    }
  };

  return (
    <div className="bg-yellow-300">
      <div className="pt-[40px] pl-32 flex gap-2 items-center">
        <img
          src="./src/assets/gift.png"
          alt="Gift Icon"
          className="w-[25px] h-[25px]"
        />
        <h1 className="text-white font-bold">Ada hadiah buat pengguna baru!</h1>
      </div>

      <div className="flex items-center space-x-4 px-20 pb-10 pt-5">
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="flex items-center justify-center bg-blue-600 rounded-full text-white p-2 hover:bg-blue-500 disabled:opacity-50 disabled:bg-gray-300 shadow-lg transition-all duration-200 ease-in-out"
        >
          <img
            src="./src/assets/left-pointer.png"
            alt="Pointer Left Icon"
            className={`w-[24px] ${
              currentPage !== 0 ? "filter invert" : "opacity-50"
            }`}
          />
        </button>
        <ul className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6 w-full">
          {selectedPromos.map((promo, index) => (
            <div onClick={() => openPromo(index)} key={index}>
              <li
                key={index}
                className="rounded-xl bg-white w-full h-full p-6 shadow-lg hover:scale-105 hover:shadow-xl cursor-pointer"
              >
                <img
                  src={promo.imageUrl}
                  alt={promo.title}
                  className="rounded-t-lg h-48 w-full object-cover mb-4"
                />
                <div className="font-bold text-xl text-gray-800 mb-2">
                  {promo.title}
                </div>
                <div className="text-xs text-gray-500 italic mb-2">
                  Terms: {promo.terms_condition}
                </div>
                <div className="text-sm text-gray-700 font-semibold mb-2">
                  Promo Code:{" "}
                  <span className="text-blue-500">{promo.promo_code}</span>
                </div>
                <div className="flex items-center justify-between text-sm text-gray-600">
                  <div>
                    <span className="font-semibold">Discount:</span> Rp{" "}
                    {promo.promo_discount_price.toLocaleString()}
                  </div>
                  <div>
                    <span className="font-semibold">Minimum Claim:</span> Rp{" "}
                    {promo.minimum_claim_price.toLocaleString()}
                  </div>
                </div>
              </li>
            </div>
          ))}
        </ul>

        <button
          onClick={handleNext}
          disabled={startIndex + promosPerPage >= promos.length}
          className="flex items-center justify-center bg-blue-600 rounded-full text-white p-2 hover:bg-blue-500 disabled:opacity-50 disabled:bg-gray-300 shadow-lg transition-all duration-200 ease-in-out"
        >
          <img
            src=".\src\assets\right-pointer.png"
            alt="Pointer Left Icon"
            className={`w-[24px] ${
              startIndex + promosPerPage < promos.length
                ? "filter invert"
                : "opacity-50"
            }`}
          />
        </button>
      </div>
    </div>
  );
};

export default PromoComponent;
