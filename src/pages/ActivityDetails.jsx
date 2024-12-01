import NavBar from "../components/Navbar";
import { useEffect, useState } from "react";
import axios from "axios";
import { HomePageProvider } from "../context/HomePageContext";
import { useData } from "../context/HomePageContext";
import { useLocation } from "react-router-dom";

const ActivityDetails = () => {
  const id = useLocation();
  // const [activityId, setActivityId] = useState(0);
  // const { activityId } = useData(); // Access setActivityId here
  const [activities, setActivities] = useState();
  const [isAddedToCart, setIsAddedToCart] = useState(false);
  const [cartMessage, setCartMessage] = useState("");

  useEffect(() => {
    fetchActivitiesDetail(id.state.id);
  }, []);

  const fetchActivitiesDetail = async (id) => {
    try {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activity/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setActivities(response.data.data);
    } catch (error) {}
  };

  const postAddToCart = async (e) => {
    const activityId = {
      activityId: id.state.id, // Ensure `id.state.id` is defined and valid
    };

    e.preventDefault();

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("authToken");

      // If no token is available, throw an error
      if (!token) {
        throw new Error("No token found. Please login first.");
      }

      const res = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/add-cart",
        activityId,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        }
      );

      // Handle the response
      setIsAddedToCart(true);
      setCartMessage(res.data.message);

      // Set isAddedToCart to false after 5 seconds
      setTimeout(() => {
        setIsAddedToCart(false);
      }, 5000);
    } catch (err) {
      // Handle the error
    }
  };

  return (
    <div>
      {isAddedToCart && (
        <div className="fixed top-0 left-0 w-full bg-green-500 text-white text-center py-2 z-50">
          Successfully added to cart!
        </div>
      )}
      <NavBar />
      {/* Background Section */}
      <div
        className={`bg-[url('/src/assets/login-background.jpg')] bg-cover bg-center w-full h-[200px] md:h-[250px] flex items-center justify-center`}
      >
        <div className="flex flex-col items-center justify-center gap-2">
          <p className="text-[20px] md:text-[24px] text-white font-bold">
            Activity Details
          </p>
        </div>
      </div>

      {/* Main Content */}
      <div className="flex flex-col md:flex-row gap-10 justify-center items-center pt-[40px] px-4 sm:px-6 lg:px-10">
        {/* Image Section */}
        <div className="shadow-lg rounded-lg overflow-hidden w-full max-w-[350px] sm:max-w-[400px] md:max-w-[500px]">
          <img
            src={activities?.imageUrls[0]}
            alt="Activity"
            className="w-full h-[250px] sm:h-[300px] md:h-[400px] object-cover rounded-lg"
          />
        </div>

        {/* Description Section */}
        <div className="flex flex-col items-start gap-4 w-full max-w-[500px]">
          <h2 className="text-[24px] md:text-[28px] font-bold text-gray-800">
            {activities?.title || "Activity Title"}
          </h2>
          <p className="text-gray-600 leading-relaxed text-sm sm:text-base">
            {activities?.description ||
              "Experience the wonders of this activity, complete with amazing views, thrilling adventures, and unforgettable memories."}
          </p>
          <p className="text-lg font-semibold text-gray-700">
            Price:{" "}
            <span className="text-green-600">
              {activities?.price ? `Rp${activities?.price}` : "Free"}
            </span>
          </p>
          <p className="text-sm text-gray-500">
            Location: {activities?.city}, {activities?.province}
          </p>
          <div className="flex flex-col sm:flex-row gap-4 w-full">
            <button
              onClick={postAddToCart}
              className="flex-1 px-6 py-2 bg-orange-600 text-white rounded-lg shadow-md hover:bg-orange-700"
            >
              Add to Cart
            </button>
            <button className="flex-1 px-6 py-2 bg-blue-600 text-white rounded-lg shadow-md hover:bg-blue-700">
              Book Now
            </button>
          </div>
        </div>
      </div>

      {/* Map Section */}
      <div className="flex justify-center items-center mt-10 px-4">
        <div className="w-full max-w-[600px]">
          <div
            dangerouslySetInnerHTML={{ __html: activities?.location_maps }}
          />
        </div>
      </div>
    </div>
  );
};

export default ActivityDetails;
