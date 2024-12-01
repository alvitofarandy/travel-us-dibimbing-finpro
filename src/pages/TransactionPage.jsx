import { useEffect, useState } from "react";
import NavBar from "../components/Navbar";
import axios from "axios";
import { format } from "date-fns";

const formatCurrency = (amount) => {
  return new Intl.NumberFormat("id-ID", {
    style: "currency",
    currency: "IDR",
    minimumFractionDigits: 0,
  }).format(amount);
};

const TransactionPage = () => {
  const [activities, setActivities] = useState();
  const [formattedDateCreated, setFormattedDateCreated] = useState([]);
  const [formattedDateExpired, setFormattedDateExpired] = useState([]);
  const [updatePayment, setUpdatePayment] = useState(false);
  const [urlData, setUrlData] = useState("");

  useEffect(() => {
    fetchActivities();
  }, []);

  const fetchActivities = async () => {
    let formattedDateAwal = [];
    let formattedDateAkhir = [];

    try {
      const token = localStorage.getItem("authToken");

      const response = await axios.get(
        "https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/my-transactions",
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`, // Add the token in the Authorization header
          },
        }
      );
      setActivities(response.data.data);
      response.data.data.forEach((items) => {
        const formattedTanggalCreated = format(
          new Date(items.createdAt),
          "dd MMM yyyy"
        );
        const formattedTanggalExpired = format(
          new Date(items.expiredDate),
          "dd MMM yyyy"
        );
        formattedDateAwal.push(formattedTanggalCreated);
        formattedDateAkhir.push(formattedTanggalExpired);
      });
      setFormattedDateCreated(formattedDateAwal);
      setFormattedDateExpired(formattedDateAkhir);
    } catch (error) {}
  };

  const deleteActivity = async (index) => {
    let transaction_id = activities[index].id;
    try {
      const token = localStorage.getItem("authToken");

      const res = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/cancel-transaction/${transaction_id}`,
        null,

        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchActivities();
    } catch (error) {}
  };

  const handleCheck = async (index) => {
    if (!urlData) {
      alert("Please provide a valid proof of payment URL.");
      return;
    }

    const transaction_id = activities[index]?.id;

    if (!transaction_id) {
      return;
    }

    const reqData = { proofPaymentUrl: urlData };

    try {
      const token = localStorage.getItem("authToken");
      if (!token) {
        return;
      }

      const res = await axios.post(
        `https://travel-journal-api-bootcamp.do.dibimbing.id/api/v1/update-transaction-proof-payment/${transaction_id}`,
        reqData,
        {
          headers: {
            apiKey: "24405e01-fbc1-45a5-9f5a-be13afcd757c",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      fetchActivities();
    } catch (error) {}
  };
  return (
    <div>
      <NavBar />
      <div className="p-4 sm:p-6 lg:p-10 bg-gray-50 rounded-lg shadow-lg overflow-x-auto">
        <table className="min-w-full table-auto border-collapse border border-gray-300 bg-white">
          <thead>
            <tr className="bg-blue-500 text-white">
              <th className="px-4 sm:px-6 py-3 border border-gray-300 text-sm sm:text-base font-medium">
                Kode Invoice
              </th>
              <th className="px-4 sm:px-6 py-3 border border-gray-300 text-sm sm:text-base font-medium">
                Status Transaksi
              </th>
              <th className="px-4 sm:px-6 py-3 border border-gray-300 text-sm sm:text-base font-medium">
                Jumlah Total
              </th>
              <th className="px-4 sm:px-6 py-3 border border-gray-300 text-sm sm:text-base font-medium">
                Tanggal Pemesanan
              </th>
              <th className="px-4 sm:px-6 py-3 border border-gray-300 text-sm sm:text-base font-medium">
                Tanggal Kadaluwarsa
              </th>
              <th className="px-4 sm:px-6 py-3 border border-gray-300 text-sm sm:text-base font-medium">
                Bukti Pembayaran
              </th>
            </tr>
          </thead>
          <tbody>
            {activities?.map((activity, index) => (
              <tr
                key={index}
                className={`text-xs sm:text-sm ${
                  index % 2 === 0 ? "bg-gray-100" : "bg-white"
                } hover:bg-blue-50`}
              >
                <td className="px-4 sm:px-6 py-3 border border-gray-300 flex items-center gap-3">
                  <div
                    className="rounded-full bg-red-200 cursor-pointer hover:bg-red-400 transition-colors"
                    onClick={() => deleteActivity(index)}
                  >
                    <img
                      src="/trash-icon.png"
                      alt="Trash Icon"
                      className="p-1 w-6 h-6 sm:w-8 sm:h-8"
                    />
                  </div>
                  <div className="truncate">{activity.invoiceId}</div>
                </td>
                <td className="px-4 sm:px-6 py-3 border border-gray-300 capitalize">
                  {activity.status}
                </td>
                <td className="px-4 sm:px-6 py-3 border border-gray-300">
                  {formatCurrency(activity.totalAmount)}
                </td>
                <td className="px-4 sm:px-6 py-3 border border-gray-300">
                  {formattedDateCreated[index]}
                </td>
                <td className="px-4 sm:px-6 py-3 border border-gray-300">
                  {formattedDateExpired[index]}
                </td>
                <td className="px-4 sm:px-6 py-3 border border-gray-300">
                  {activity.proofPaymentUrl ? (
                    <a
                      href={activity.proofPaymentUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-blue-600 underline hover:text-blue-800 transition-colors"
                    >
                      {activity.proofPaymentUrl}
                    </a>
                  ) : (
                    <div>
                      {!updatePayment ? (
                        <div
                          className="underline text-blue-600 cursor-pointer hover:text-blue-800"
                          onClick={() => setUpdatePayment(!updatePayment)}
                        >
                          Masukkan Bukti Pembayaran
                        </div>
                      ) : (
                        <div className="flex flex-col sm:flex-row gap-2">
                          <input
                            type="text"
                            placeholder="Masukkan Bukti Pembayaran"
                            className="border border-gray-300 rounded px-2 py-1 w-full sm:w-[200px] text-black"
                            onChange={(e) => setUrlData(e.target.value)}
                          />
                          <div className="flex gap-2">
                            <button
                              className="p-2 bg-green-500 text-white rounded-full hover:bg-green-600"
                              onClick={() => handleCheck(index)}
                            >
                              ✓
                            </button>
                            <button
                              className="p-2 bg-red-500 text-white rounded-full hover:bg-red-600"
                              onClick={() => setUpdatePayment(false)}
                            >
                              ✕
                            </button>
                          </div>
                        </div>
                      )}
                    </div>
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};
export default TransactionPage;
