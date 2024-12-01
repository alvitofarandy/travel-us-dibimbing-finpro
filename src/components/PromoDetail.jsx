import React from "react";

const PromoDetail = ({ closePromo, detailPromo }) => {
  return (
    <div
      className="relative z-10"
      aria-labelledby="modal-title"
      role="dialog"
      aria-modal="true"
    >
      <div
        className="fixed inset-0 bg-gray-600 bg-opacity-80 transition-opacity"
        aria-hidden="true"
      ></div>

      <div className="fixed inset-0 z-10 flex items-center justify-center w-screen p-4 overflow-y-auto">
        <div className="relative w-full max-w-lg transform overflow-hidden rounded-lg bg-white shadow-xl transition-all">
          <div className="bg-white px-6 pt-5 pb-4 sm:pt-8 sm:pb-6">
            <div className="text-center sm:text-left">
              <h3
                className="text-lg font-bold text-gray-900 mb-3"
                id="modal-title"
              >
                {detailPromo.title}
              </h3>
              <img
                src={detailPromo.imageUrl}
                alt={detailPromo.title}
                className="rounded-lg h-52 w-full object-cover mb-4"
              />
              <p className="text-sm text-gray-700 mb-4">
                {detailPromo.description}
              </p>

              <div className="flex justify-between items-start mb-4">
                <div className="text-sm">
                  <div className="font-bold text-red-600">
                    DISKON {detailPromo.terms_condition?.split(" ")[1]}!!!
                  </div>
                  <p className="text-gray-800">
                    Hanya Bayar: RP{" "}
                    {detailPromo.promo_discount_price?.toLocaleString()}
                  </p>
                </div>
                <div className="text-sm text-gray-700">
                  <div className="font-bold">Minimum Claim Price:</div>
                  <p>RP {detailPromo.minimum_claim_price?.toLocaleString()}</p>
                </div>
              </div>

              <div className="bg-yellow-100 text-yellow-800 px-3 py-2 rounded-lg text-center text-sm font-medium">
                Gunakan kode promo: {detailPromo?.promo_code}
              </div>
            </div>
          </div>

          <div className="bg-gray-100 px-6 py-3 sm:flex sm:flex-row-reverse">
            <button
              type="button"
              className="mt-3 sm:mt-0 sm:ml-3 w-full sm:w-auto inline-flex justify-center rounded-md bg-white px-4 py-2 text-sm font-semibold text-gray-700 shadow-sm ring-1 ring-gray-300 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-300 focus:ring-offset-2"
              onClick={closePromo}
            >
              Tutup
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PromoDetail;
