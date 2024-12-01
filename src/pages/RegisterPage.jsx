import React, { useState } from "react";
import axios from "axios";
import { Link } from "react-router-dom";
import { Menu, MenuButton, MenuItem, MenuItems } from "@headlessui/react";
import { ChevronDownIcon } from "@heroicons/react/20/solid";
import { useNavigate } from "react-router-dom";

const RegisterPage = () => {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [passwordRepeat, setPasswordRepeat] = useState("");
  const [role, setRole] = useState("Pilih Role Anda");
  const [phoneNumber, setPhoneNumber] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [successMessage, setSuccessMessage] = useState("");
  const [passwordSame, setPasswordSame] = useState(false);
  const navigate = useNavigate();

  const handleRegister = async (e) => {
    setError("");
    setSuccessMessage("");
    if (password !== passwordRepeat) {
      setPasswordSame(true);
    } else {
      setPasswordSame(false);

      e.preventDefault();
      setLoading(true);
      setError("");

      try {
        const response = await axios.post(
          "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/register",
          {
            name,
            email,
            password,
            passwordRepeat,
            role: role.toLowerCase(),
            phoneNumber,
          },
          {
            headers: {
              apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            },
          }
        );

        setSuccessMessage("Daftar akun berhasil!");
        navigate(`/login`);
      } catch (err) {
        if (err.response && err.response.data) {
          const errorData = err.response.data;

          // Access specific error type, if available
          if (errorData.errors && errorData.errors[0].type === "stringMin") {
            setError("Password Harus lebih panjang dari 6 karakter");
          } else {
            // Handle general error message
            setError(errorData.message || "An error occurred");
          }
        }
      } finally {
        setLoading(false);
      }
    }
  };
  return (
    <div className="absolute bg-[url('/src/assets/login-background.jpg')] bg-cover bg-center w-full h-full">
      <div className="flex flex-col md:flex-row w-full h-full justify-center md:justify-between items-center px-4 md:px-[10%]">
        {/* Branding */}
        <div className="font-extrabold text-[50px] md:text-[120px] text-blue-600 hover:text-blue-800 transition-all duration-300 flex justify-center mb-8 md:mb-0">
          Travel<span className="text-[#FF5733]">Us</span>
        </div>

        {/* Registration Card */}
        <div className="bg-white p-6 md:p-12 rounded shadow-md w-full max-w-[400px] md:max-w-[700px] h-auto md:h-[800px] rounded-2xl">
          <h1 className="text-2xl md:text-3xl font-bold mb-6 text-center md:text-left">
            Daftar Akun
          </h1>
          <form onSubmit={handleRegister}>
            <div className="flex flex-col gap-4">
              <div>
                <label className="block mb-2">Nama:</label>
                <input
                  type="text"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Masukkan nama anda"
                  required
                />
              </div>
              <div>
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
              <div>
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
              <div>
                <label className="block mb-2">Ulang Password:</label>
                <input
                  type="password"
                  value={passwordRepeat}
                  onChange={(e) => setPasswordRepeat(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Ulangi password anda"
                  required
                />
                {passwordSame && (
                  <p className="text-red-500 mt-2">Password Tidak Sama</p>
                )}
              </div>
              <div>
                <label className="block mb-2">Nomor Telpon:</label>
                <input
                  type="number"
                  value={phoneNumber}
                  onChange={(e) => setPhoneNumber(e.target.value)}
                  className="w-full px-4 py-3 border rounded-lg"
                  placeholder="Masukkan nomor telpon anda"
                  required
                />
              </div>
              <div>
                <label className="block mb-2">Pilih Role:</label>
                <Menu as="div" className="relative inline-block text-left">
                  <MenuButton className="inline-flex w-full justify-center gap-x-1.5 rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50">
                    {role}
                    <ChevronDownIcon
                      aria-hidden="true"
                      className="-mr-1 h-5 w-5 text-gray-400"
                    />
                  </MenuButton>
                  <MenuItems className="absolute right-0 z-10 mt-2 w-56 origin-top-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 focus:outline-none">
                    <div className="py-1">
                      <MenuItem>
                        <a
                          onClick={() => setRole("User")}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          User
                        </a>
                      </MenuItem>
                      <MenuItem>
                        <a
                          onClick={() => setRole("Admin")}
                          href="#"
                          className="block px-4 py-2 text-sm text-gray-700 hover:bg-gray-100 hover:text-gray-900"
                        >
                          Admin
                        </a>
                      </MenuItem>
                    </div>
                  </MenuItems>
                </Menu>
              </div>
            </div>

            <button
              type="submit"
              className="w-full bg-blue-500 text-white py-3 rounded-lg hover:bg-blue-600 mt-4"
              disabled={loading}
            >
              {loading ? "Tunggu Sebentar..." : "Daftar Akun"}
            </button>
          </form>

          {error && <p className="text-red-500 mt-4">{error}</p>}
          {successMessage && (
            <p className="text-green-500 mt-4">{successMessage}</p>
          )}

          <div className="flex justify-center pt-6 gap-2">
            <span>Sudah ada akun?</span>
            <Link to="/login">
              <span className="text-blue-500 font-bold cursor-pointer">
                Login aja disini!
              </span>
            </Link>
          </div>
          <div className="flex items-center justify-center gap-2 mt-6">
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

export default RegisterPage;
