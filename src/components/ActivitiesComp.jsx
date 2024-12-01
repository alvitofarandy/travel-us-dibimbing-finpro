import { useData } from "../context/HomePageContext";
import CategoriesComp from "./CategoriesComp";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const ActivitiesComp = ({ activities }) => {
  const { setActivityId } = useData(); // Access setActivityId here
  const navigate = useNavigate(); // Get navigate function

  const handleClick = (id) => {
    setActivityId(id);

    // Navigate to another route (e.g., `/component2`)
    navigate("/activity-detail", { state: { id } });
  };

  return (
    <div className="bg-gray-50 min-h-screen">
      {/* Header */}
      <h1 className="font-bold text-xl sm:text-2xl text-gray-800 px-4 sm:pl-20 pt-6 sm:pt-10">
        Cek yang populer di TravelUs! 🏆🤩
      </h1>

      {/* Categories */}
      <div className="pt-4 px-4 sm:pl-20">
        <CategoriesComp />
      </div>

      {/* Activities Section */}
      <div className="flex items-center justify-center px-4 sm:px-10 pb-10">
        <div className="flex pt-5 gap-4 sm:gap-6 overflow-x-auto scrollbar-thin scrollbar-thumb-gray-400 scrollbar-track-gray-200 pb-4">
          {activities?.map((activity, index) => (
            <div
              key={index}
              className="bg-white shadow-lg w-[250px] sm:w-[300px] shrink-0 rounded-lg flex flex-col cursor-pointer hover:shadow-xl hover:-translate-y-2 transition-transform duration-300"
              onClick={() => handleClick(activity.id)}
            >
              {/* Activity Image */}
              <img
                src={activity.imageUrls[0]}
                alt={activity.title}
                className="h-[150px] sm:h-[200px] w-full rounded-t-lg object-cover"
              />

              {/* Activity Details */}
              <div className="flex flex-col p-3 sm:p-4 gap-3 sm:gap-4">
                {/* Title and Location */}
                <div>
                  <h2 className="font-semibold text-sm sm:text-lg text-gray-800">
                    {activity.title}
                  </h2>
                  <h3 className="text-xs sm:text-sm text-gray-500">
                    {activity.province}
                  </h3>
                </div>

                {/* Rating and Reviews */}
                <div className="flex items-center gap-1 sm:gap-2 text-xs sm:text-sm text-gray-600">
                  <div className="flex items-center gap-1">
                    <span className="font-bold text-yellow-500">
                      {activity.rating}
                    </span>
                    <span>/10</span>
                  </div>
                  <span>•</span>
                  <span className="text-gray-500">
                    ({activity.total_reviews.toLocaleString()} Reviews)
                  </span>
                </div>

                {/* Pricing */}
                <div className="flex flex-col">
                  <h3 className="line-through text-gray-400 text-xs sm:text-sm">
                    {formatCurrency(activity.price)}
                  </h3>
                  <h3 className="text-red-500 font-bold text-base sm:text-lg">
                    {formatCurrency(activity.price_discount)}
                  </h3>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ActivitiesComp;
