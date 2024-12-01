import React, { createContext, useContext, useState, useEffect } from "react";

const HomePageContext = createContext();

export const useData = () => {
  const context = useContext(HomePageContext);
  if (!context) {
    throw new Error("useData must be used within a HomePageProvider");
  }
  return context;
};

export const HomePageProvider = ({
  children,
  activities,
  category,
  setCategory,
  setCategoryIndex,
  allUser,
  role,
  setRole, // Accept setRole from the parent
  roleIndex,
  setRoleIndex,
  banners,
  setReqDataBanner,
  reqDataBanner,
  bannerId,
  setBannerId,
}) => {
  const [activityId, setActivityId] = useState(null);

  useEffect(() => {
 
  }, [role]);

  return (
    <HomePageContext.Provider
      value={{
        activities,
        category,
        setCategoryIndex,
        setCategory,
        activityId,
        setActivityId,
        allUser,
        role,
        setRole, // Providing the role and setRole to the context
        roleIndex,
        setRoleIndex,
        banners,
        setReqDataBanner,
        reqDataBanner,
        bannerId,
        setBannerId,
      }}
    >
      {children}
    </HomePageContext.Provider>
  );
};
