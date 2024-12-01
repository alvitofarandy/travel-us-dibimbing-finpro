import { useEffect } from "react";
import { Link } from "react-router-dom";
import { useState } from "react";

const NavBar = ({ logoutUser, isAdmin }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    const authToken = localStorage.getItem("authToken");
    setIsLoggedIn(!!authToken);
  }, []);

  const navbarWidgets = [
    "Beranda",
    "Transaksi",
    "Keranjang",
    isLoggedIn ? "Logout" : "Login",
    !isLoggedIn && "Daftar Akun",
  ];

  const navbarWidgetsAdmin = [isLoggedIn && "Logout"];

  const widgetsToShow = isAdmin ? navbarWidgetsAdmin : navbarWidgets;
  return (
    <div className="flex justify-between items-center px-8 py-4 bg-white shadow-md">
      <div className="font-extrabold text-[36px] text-blue-600 hover:text-blue-800 transition-all duration-300">
        Travel<span className="text-[#FF5733]">Us</span>
      </div>

      <div className="flex gap-6 pr-12 font-semibold items-center">
        {widgetsToShow.map((widget) => (
          <div
            className={`${
              widget === "Sign up"
                ? "border-2 border-black py-2 px-4 rounded-md hover:bg-gray-200 transition-all cursor-pointer"
                : widget === "Master Admin"
                ? ""
                : "relative inline-block pb-1 before:absolute before:left-0 before:bottom-0 before:w-0 before:h-[2px] before:bg-current before:transition-all hover:before:w-full cursor-pointer"
            }`}
          >
            <Link
              to={
                widget === "Daftar Akun"
                  ? "/register"
                  : widget === "Login" || widget === "Logout"
                  ? "/login"
                  : widget === "Keranjang"
                  ? "/cart"
                  : widget === "Beranda"
                  ? "/"
                  : widget === "Transaksi"
                  ? "/transaction"
                  : ""
              }
            >
              {widget === "Logout" && <div onClick={logoutUser}>{widget}</div>}
              {widget !== "Logout" && <div>{widget}</div>}
            </Link>
          </div>
        ))}
      </div>
    </div>
  );
};

export default NavBar;
