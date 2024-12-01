import { useRoutes } from "react-router-dom";
import HomePage from "../pages/HomePage";
import LoginPage from "../pages/LoginPage";
import RegisterPage from "../pages/RegisterPage";
import ActivityDetails from "../pages/ActivityDetails";
import CartPage from "../pages/CartPage";
import TransactionPage from "../pages/TransactionPage";
import ProtectedRoute from "./ProtectedRoute";
const AppRoutes = () => {
  const isAuthenticated = Boolean(localStorage.getItem("authToken"));

  const routes = [
    { path: "/", element: <HomePage /> },
    { path: "/login", element: <LoginPage /> },
    { path: "/register", element: <RegisterPage /> },
    {
      path: "/activity-detail",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <ActivityDetails />
        </ProtectedRoute>
      ),
    },
    {
      path: "/cart",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <CartPage />
        </ProtectedRoute>
      ),
    },
    {
      path: "/transaction",
      element: (
        <ProtectedRoute isAuthenticated={isAuthenticated}>
          <TransactionPage />
        </ProtectedRoute>
      ),
    },
  ];

  return useRoutes(routes);
};

export default AppRoutes;
