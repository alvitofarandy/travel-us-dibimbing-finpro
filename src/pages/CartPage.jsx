import { useEffect } from "react";
import NavBar from "../components/Navbar";
import { useState } from "react";
import axios from "axios";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const CartPage = () => {
  const [cartItems, setCartItems] = useState();
  const [totalPrice, setTotalPrice] = useState();
  const [paymentMethods, setPaymentMethods] = useState();
  const [selectedIndex, setSelectedIndex] = useState(null);
  const [chosenPaymentId, setChosenPaymentId] = useState("");

  useEffect(() => {
    fetchCarts();
    fetchPaymentMethods();
  }, []);

  const fetchCarts = async () => {
    const countPrice = (prices) => {
      let totalPrice = 0;
      prices.forEach((item) => {
        totalPrice = totalPrice + item.activity.price_discount * item.quantity;
      });
      setTotalPrice(totalPrice);
    };

    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/carts",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      setCartItems(res.data.data);
      countPrice(res.data.data);
    } catch (error) {}
  };

  const deleteCart = async (index) => {
    let cartId = cartItems[index].id;
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.delete(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/delete-cart/${cartId}`,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchCarts();
    } catch (error) {}
  };

  const fetchPaymentMethods = async () => {
    try {
      const res = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/payment-methods",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
          },
        }
      );
      setPaymentMethods(res.data.data);
    } catch (error) {}
  };

  const handleSelect = (index) => {
    setSelectedIndex(index);
    setChosenPaymentId(paymentMethods[index].id);
  };

  const createTransaction = async (e) => {
    let cartIds = [];
    cartItems.forEach((cartId) => {
      cartIds.push(cartId.id);
    });

    const reqTransaction = {
      cartIds: cartIds,
      paymentMethodId: chosenPaymentId,
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
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/create-transaction",
        reqTransaction,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        }
      );
      fetchCarts();
    } catch (err) {
      // Handle the error
    }
  };

  const updateQuantity = async (plusOrMinus, index) => {
    const reqTransaction = {
      quantity:
        plusOrMinus === "minus"
          ? cartItems[index].quantity - 1
          : cartItems[index].quantity + 1,
    };

    let cartId = cartItems[index].id;

    try {
      // Retrieve the token from localStorage
      const token = localStorage.getItem("authToken");

      // If no token is available, throw an error
      if (!token) {
        throw new Error("No token found. Please login first.");
      }
      const res = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-cart/${cartId}`,
        reqTransaction,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        }
      );
      fetchCarts();
      if (reqTransaction.quantity === 0) {
        deleteCart(index);
      }
    } catch (err) {
      // Handle the error
    }
  };

  return (
    <div>
      <NavBar />
      <div className="px-4 sm:px-10 md:px-20 py-10">
        <h1 className="font-bold text-[24px] sm:text-[30px] text-gray-800 mb-6">
          Cart Anda
        </h1>

        <div className="flex flex-col md:flex-row gap-6">
          {/* Cart List */}
          <div className="w-full md:w-[70%] bg-white shadow-lg rounded-lg">
            {/* Cart Header */}
            <div className="border-b border-gray-300 px-4 sm:px-6 py-4 flex justify-between text-gray-700 font-semibold text-sm sm:text-base">
              <div className="w-[150px] sm:w-[300px]">Aktivitas</div>
              <div className="w-[80px] sm:w-[120px] text-center">Harga</div>
              <div className="w-[80px] sm:w-[120px] text-center">Kuantitas</div>
              <div className="w-[80px] sm:w-[120px] text-center">
                Harga Total
              </div>
            </div>

            {/* Cart Items */}
            {cartItems?.map((items, index) => (
              <div
                key={index}
                className="border-b border-gray-200 px-4 sm:px-6 py-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 sm:gap-0"
              >
                {/* Activity Info */}
                <div className="w-full sm:w-[300px] flex gap-4 items-center">
                  <div
                    className="rounded-full bg-red-200 cursor-pointer hover:bg-red-400"
                    onClick={() => deleteCart(index)}
                  >
                    <img
                      src="/trash-icon.png"
                      alt="Trash Icon"
                      className="p-1 w-[30px]"
                    />
                  </div>
                  <img
                    src={items.activity.imageUrls[0]}
                    alt="Activity"
                    className="w-[60px] sm:w-[80px] h-[60px] sm:h-[80px] object-cover rounded-lg"
                  />
                  <div className="flex flex-col gap-2">
                    <p className="font-semibold text-gray-800 text-sm sm:text-base">
                      {items.activity.title}
                    </p>
                    <p className="text-xs sm:text-sm text-gray-600">
                      {items.activity.description}
                    </p>
                  </div>
                </div>

                {/* Price */}
                <div className="w-full sm:w-[120px] text-center text-sm sm:text-base">
                  <h3 className="line-through text-gray-400 text-xs sm:text-sm">
                    {formatCurrency(items.activity.price)}
                  </h3>
                  <h3 className="text-red-500 font-bold text-base sm:text-lg">
                    {formatCurrency(items.activity.price_discount)}
                  </h3>
                </div>

                {/* Quantity */}
                <div className="w-full sm:w-[120px] flex items-center justify-between border rounded-lg overflow-hidden shadow-sm">
                  <button
                    className="w-[40px] h-[40px] bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                    onClick={() => updateQuantity("minus", index)}
                  >
                    <img
                      src="/minus-3108.png"
                      alt="Decrease Quantity"
                      className="w-[12px] sm:w-[16px]"
                    />
                  </button>
                  <div className="w-[40px] h-[40px] bg-white flex items-center justify-center text-sm sm:text-lg font-semibold">
                    {items.quantity}
                  </div>
                  <button
                    className="w-[40px] h-[40px] bg-gray-200 hover:bg-gray-300 flex items-center justify-center transition"
                    onClick={() => updateQuantity("plus", index)}
                  >
                    <img
                      src="/plus-icon.png"
                      alt="Increase Quantity"
                      className="w-[12px] sm:w-[16px]"
                    />
                  </button>
                </div>

                {/* Total Price */}
                <div className="w-full sm:w-[120px] text-center font-bold text-gray-800 text-sm sm:text-base">
                  {formatCurrency(
                    items.quantity * items.activity.price_discount
                  )}
                </div>
              </div>
            ))}
          </div>

          {/* Cart Summary */}
          <div className="w-full md:w-[30%] bg-white shadow-lg rounded-lg p-4 sm:p-6">
            <h2 className="text-base sm:text-lg font-bold text-gray-800 mb-4">
              Summary
            </h2>
            <div className="flex justify-between text-gray-700 text-sm sm:text-base mb-3">
              <span>Total Kuantitas:</span>
              <span>
                {cartItems?.reduce((acc, item) => acc + item.quantity, 0)} Items
              </span>
            </div>
            <div className="flex justify-between text-gray-700 text-sm sm:text-base mb-6">
              <span>Total Harga:</span>
              <span className="font-bold text-gray-800">
                {formatCurrency(totalPrice)}
              </span>
            </div>
            <div className="flex flex-wrap gap-2 pb-4 justify-center items-center">
              {paymentMethods?.map((image, index) => (
                <div
                  key={index}
                  className={`cursor-pointer border rounded-lg p-2 w-[80px] h-[40px] sm:w-[100px] sm:h-[50px] flex items-center justify-center ${
                    selectedIndex === index
                      ? "bg-blue-500 text-white border-blue-700"
                      : "bg-white"
                  }`}
                  onClick={() => handleSelect(index)}
                >
                  <img
                    src={image.imageUrl}
                    alt="Payment Method"
                    className="w-[60px] sm:w-[80px]"
                  />
                </div>
              ))}
            </div>
            <button
              className="w-full bg-red-500 text-white font-semibold py-3 rounded-lg hover:bg-red-600 transition"
              onClick={createTransaction}
            >
              Checkout
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
export default CartPage;
