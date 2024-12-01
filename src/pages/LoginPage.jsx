import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { useNavigate } from "react-router-dom";

const LoginPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");

    try {
      const response = await axios.post(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/login",
        {
          email,
          password,
        },
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      const token = response.data.token;

      localStorage.setItem("authToken", token);
      document.cookie = `authToken=${token}; path=/; max-age=${
        7 * 24 * 60 * 60
      }`;

      setSuccessMessage("Login berhasil!");
      setTimeout(() => {
        navigate(`/`), 3000;
      });
    } catch (err) {
      if (err.status === 404) {
        setError("Email atau password salah!");
      }
    } finally {
      setLoading(false);
    }
  };
  return (
    <div className="absolute bg-[url('/src/assets/login-background.jpg')] bg-cover bg-center w-full h-full">
      <div className="flex flex-col md:flex-row w-full h-full justify-center md:justify-between items-center px-4 md:px-[10%]">
        {/* Branding */}
        <div className="font-extrabold text-[50px] md:text-[120px] text-blue-600 hover:text-blue-800 transition-all duration-300 flex justify-center mb-8 md:mb-0">
          Travel<span className="text-[#FF5733]">Us</span>
        </div>

        {/* Login Card */}
        <div className="bg-white p-6 md:p-12 rounded shadow-md w-full max-w-[400px] md:max-w-[700px] h-auto md:h-[700px] rounded-2xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
            Login
          </h1>
          <form onSubmit={handleLogin}>
            <div className="mb-6">
              <label className="block mb-2">Email:</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Masukkan email anda"
                required
              />
            </div>
            <div className="mb-6">
              <label className="block mb-2">Password:</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full px-4 py-3 border rounded-lg"
                placeholder="Masukkan password anda"
                required
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600"
              disabled={loading}
            >
              {loading ? "Logging in..." : "Login"}
            </button>
          </form>
          {error && <p className="text-red-500 mt-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mt-4">{successMessage}</p>
          )}
          <div className="flex justify-center pt-8 gap-2">
            <span>Belum ada akun? </span>
            <Link to="/Register">
              <span className="text-blue-500 font-bold cursor-pointer">
                Langsung aja daftar disini!
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 pt-12">
            <div className="font-extrabold text-[12px] text-blue-600 hover:text-blue-800 transition-all duration-300">
              Travel<span className="text-[#FF5733]">Us</span>
            </div>
            <div>All Rights Reserved</div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
