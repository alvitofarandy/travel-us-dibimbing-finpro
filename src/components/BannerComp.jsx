import { useState } from "react";
const BannerComponent = ({ banners, openBanner, updateIndexChanger }) => {
  const [currentPage, setCurrentPage] = useState(0);

  // Calculate the range of promotions to display based on current page
  const bannersPerPage = 1;
  const startIndex = currentPage * bannersPerPage;
  const selectedBanner = banners.slice(startIndex, startIndex + bannersPerPage);
  // Handle next and previous page clicks
  const handleNext = () => {
    if (startIndex + bannersPerPage < banners.length) {
      setCurrentPage(currentPage + 1);
      const newIndexChanger = startIndex + 1;
      updateIndexChanger(newIndexChanger); // Send the updated value to the parent
    }
  };

  const handlePrev = () => {
    if (currentPage > 0) {
      setCurrentPage(currentPage - 1);
      const newIndexChanger = startIndex - 1;
      updateIndexChanger(newIndexChanger); // Send the updated value to the parent
    }
  };

  return (
    <div className="bg-blue-500">
      {/* Header */}
      <h3 className="py-4 sm:py-5 px-4 sm:pl-20 text-white font-bold text-center sm:text-left">
        Ada cashback tambahan buatmu! 💰
      </h3>

      {/* Carousel Section */}
      <div className="flex items-center justify-between sm:justify-center px-4 sm:px-0 gap-4">
        {/* Previous Button */}
        <button
          onClick={handlePrev}
          disabled={currentPage === 0}
          className="flex items-center justify-center bg-yellow-500 rounded-full text-white p-2 hover:bg-yellow-600 disabled:opacity-50 disabled:bg-gray-300 shadow-lg transition-all duration-200 ease-in-out"
        >
          <img
            src="./src/assets/left-pointer.png"
            alt="Pointer Left Icon"
            className={`w-[20px] sm:w-[24px] ${
              currentPage !== 0 ? "filter invert" : "opacity-50"
            }`}
          />
        </button>

        {/* Banner Content */}
        <div className="flex overflow-x-auto gap-4 pb-6 scrollbar-thin scrollbar-thumb-gray-300 scrollbar-track-gray-100">
          {selectedBanner.map((banner, index) => (
            <div
              key={index}
              className="hover:scale-105 hover:shadow-xl cursor-pointer min-w-[200px] sm:min-w-[300px] rounded-lg transition-transform duration-300"
            >
              <img
                src={banner.imageUrl}
                alt={banner.name}
                className="rounded-lg h-48 sm:h-96 w-full object-cover"
              />
            </div>
          ))}
        </div>

        {/* Next Button */}
        <button
          onClick={handleNext}
          disabled={startIndex + bannersPerPage >= banners.length}
          className="flex items-center justify-center bg-yellow-500 rounded-full text-white p-2 hover:bg-yellow-600 disabled:opacity-50 disabled:bg-gray-300 shadow-lg transition-all duration-200 ease-in-out"
        >
          <img
            src=".\src\assets\right-pointer.png"
            alt="Pointer Right Icon"
            className={`w-[20px] sm:w-[24px] ${
              startIndex + bannersPerPage < banners.length
                ? "filter invert"
                : "opacity-50"
            }`}
          />
        </button>
      </div>
    </div>
  );
};
export default BannerComponent;
