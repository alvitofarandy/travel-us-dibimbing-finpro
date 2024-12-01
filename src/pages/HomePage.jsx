import NavBar from "../components/Navbar";
import PromoComponent from "../components/PromoComp";
import React, { useEffect, useState } from "react";
import axios from "axios";
import PromoDetail from "../components/PromoDetail";
import BannerComponent from "../components/BannerComp";
import BannerDetail from "../components/BannerDetail";
import ActivitiesComp from "../components/ActivitiesComp";
import { HomePageProvider } from "../context/HomePageContext";
import SideBarComp from "../components/SideBarComo";

const HomePage = () => {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isPromoOpen, setIsPromoOpen] = useState(false);
  const [promoId, setPromoId] = useState("");
  const [promos, setPromos] = useState([]);
  const [detailPromo, setDetailPromo] = useState([]);
  const [indexCurrentPage, setIndexCurrentPage] = useState(0);
  const [indexChangerPromo, setIndexChangerPromo] = useState(0);
  const [banners, setBanner] = useState([]);
  const [isBannerOpen, setIsBannerOpen] = useState(false);
  const [bannerId, setBannerId] = useState("");
  const [detailBanner, setDetailBanner] = useState([]);
  const [indexChangerBanner, setIndexChangerBanner] = useState(0);
  const [categories, setCategories] = useState([]);
  const [categoryIndex, setCategoryIndex] = useState([]);
  const [isAdmin, setIsAdmin] = useState(false);
  const [allUser, setAllUsers] = useState([]);
  const [role, setRole] = useState("");
  const [roleIndex, setRoleIndex] = useState(0);
  const [reqDataBanner, setReqDataBanner] = useState({
    name: "",
    imageUrl: "",
  });

  useEffect(() => {
    fetchActivities();
    fetchPromos();
    fetchBanner();
    fetchCategories();
    fetchLoggedUser();
    fetchAllUsers();
  }, []);

  useEffect(() => {
    fetchCategoryDetail();
  }, [categoryIndex]);

  useEffect(() => {
    createBanner(reqDataBanner);
  }, [reqDataBanner]);

  useEffect(() => {
    updateRoleUser(roleIndex);
  }, [role, roleIndex]);

  useEffect(() => {
    deleteBanner(bannerId);
  }, [bannerId]);

  const updateRoleUser = async (index) => {
    let userId = allUser[index].id;
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-user-role/${userId}`,
        { role: role },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchAllUsers();
    } catch (err) {}
  };
  const updateIndexChangerPromo = (newIndexChanger) => {
    setIndexChangerPromo(newIndexChanger);
  };

  const updateIndexChangerBanner = (newIndexChanger) => {
    setIndexChangerBanner(newIndexChanger);
  };

  const fetchPromos = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promos",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setPromos(response.data.data);
    } catch (err) {
      setError("Failed to load promotions.");
    }
  };

  const fetchPromoDetail = async (index) => {
    let realIndex = index + indexChangerPromo;

    const id = promos[realIndex].id; // Use the ID directly from the array

    setPromoId(id); // Optional: still update promoId if it's used elsewhere
    try {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/promo/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setDetailPromo(response.data.data);
    } catch (err) {
      setError("Failed to load promotions.");
    }
  };

  const fetchBanner = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banners",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setBanner(response.data.data);
    } catch (err) {}
  };

  const fetchBannerDetail = async (index) => {
    let realIndex = index + indexChangerBanner;

    const id = banners[realIndex].id; // Use the ID directly from the array
    try {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/banner/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setDetailBanner(response.data.data);
    } catch (err) {
      setError("Failed to load promotions.");
    }
  };

  const createBanner = async (reqData) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-banner",
        reqData,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBanner();
    } catch (err) {}
  };

  const deleteBanner = async (id) => {
    try {
      const token = localStorage.getItem("authToken");
      await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-banner/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      fetchBanner();
    } catch (err) {}
  };

  const fetchActivities = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setActivities(response.data.data);
    } catch (err) {}
  };

  const fetchCategories = async () => {
    try {
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/categories",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setCategories(response.data.data);
      fetchActivities();
    } catch (err) {}
  };

  const fetchCategoryDetail = async (index) => {
    let realIndex = index;
    const id = categories[realIndex]?.id;
    try {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/category/${id}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setCategories([response.data.data]);
      fetchActivitiesDetailCat(response.data.data.id);
    } catch (err) {}
  };

  const fetchActivitiesDetailCat = async (categoryId) => {
    try {
      const response = await axios.get(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/activities-by-category/${categoryId}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setActivities(response.data.data);
    } catch (err) {}
  };

  const logoutUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/logout",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      localStorage.removeItem("authToken");
    } catch (err) {}
  };

  const fetchLoggedUser = async () => {
    try {
      const token = localStorage.getItem("authToken");
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/user",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );
      if (response.data.data.role === "admin") {
        setIsAdmin(true);
      } else {
        setIsAdmin(false);
      }
    } catch (err) {}
  };

  const fetchAllUsers = async () => {
    try {
      const token = localStorage.getItem("authToken");

      // Check if the token exists
      if (!token) {
        return;
      }

      // Make the request
      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/all-user",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      // Log the response data
      setAllUsers(response.data.data);
    } catch (err) {
     
    }
  };
  const togglePromo = (index) => {
    setIsPromoOpen(!isPromoOpen);
    fetchPromoDetail(index);
  };

  const toggleBanner = (index) => {
    setIsBannerOpen(!isBannerOpen);
    fetchBannerDetail(index);
  };

  return (
    <HomePageProvider
      category={categories}
      categoryIndex={categoryIndex}
      setCategoryIndex={fetchCategoryDetail}
      setCategory={fetchCategories}
      allUser={allUser}
      role={role} // Pass the role state here
      setRole={setRole} // Pass the setRole function here
      roleIndex={roleIndex}
      setRoleIndex={setRoleIndex}
      banners={banners}
      reqDataBanner={reqDataBanner}
      setReqDataBanner={setReqDataBanner}
      bannerId={bannerId}
      setBannerId={setBannerId}
    >
      {!isAdmin && (
        <div className="z-100">
          <NavBar logoutUser={logoutUser} />
          <PromoComponent
            openPromo={togglePromo}
            promos={promos}
            updateIndexChanger={updateIndexChangerPromo}
          />
          <div className="flex justify-center">
            <h3 className="text-gray-500">
              TravelUs - Platform travel untuk kemana saja!
            </h3>
          </div>
          {isPromoOpen && (
            <PromoDetail
              isOpen={isPromoOpen}
              closePromo={togglePromo}
              detailPromo={detailPromo}
            />
          )}
          <BannerComponent
            banners={banners}
            openBanner={toggleBanner}
            updateIndexChanger={updateIndexChangerBanner}
          />
          {isBannerOpen && (
            <BannerDetail
              closeBanner={toggleBanner}
              detailBanner={detailBanner}
            />
          )}
          <ActivitiesComp activities={activities} />
        </div>
      )}
      {isAdmin && (
        <div>
          {" "}
          <NavBar logoutUser={logoutUser} isAdmin={isAdmin} />
          <SideBarComp />
        </div>
      )}
    </HomePageProvider>
  );
};

export default HomePage;
