'use client';

import { useOrderStore } from "@/app/stores/useOrderStore";
import { useEffect } from "react";

const PurchasedList = () => {
  const { purchasedList, fetchPurchasedList, isLoading, productData } = useOrderStore();

  useEffect(() => {
    fetchPurchasedList();
  }, [fetchPurchasedList]);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-6 text-gray-700">Purchased List:</h2>
      {isLoading ? (
        <p>Loading purchases...</p>
      ) : purchasedList.length > 0 ? (
        <div className="overflow-x-auto">
          <table className="min-w-full table-auto bg-white shadow-lg rounded-lg border-collapse">
            <thead className="bg-gray-100">
              <tr>
                <th className="border-b text-left py-3 px-4 text-sm font-semibold text-gray-600">Purchase ID</th>
                <th className="border-b text-left py-3 px-4 text-sm font-semibold text-gray-600">Product ID</th>
                <th className="border-b text-left py-3 px-4 text-sm font-semibold text-gray-600">Product Name</th>
                <th className="border-b text-left py-3 px-4 text-sm font-semibold text-gray-600">Product Price</th>
                <th className="border-b text-left py-3 px-4 text-sm font-semibold text-gray-600">Purchased At</th>
              </tr>
            </thead>
            <tbody>
              {purchasedList.map((purchase: any) => (
                <tr key={purchase.id} className="hover:bg-gray-50">
                  <td className="border-b px-4 py-2 text-sm text-gray-700">{purchase.id}</td>
                  <td className="border-b px-4 py-2 text-sm text-gray-700">{purchase.product}</td>
                  <td className="border-b px-4 py-2 text-sm text-gray-700">
                    {productData[purchase.product]?.name || 'Unknown Product'}
                  </td>
                  <td className="border-b px-4 py-2 text-sm text-gray-700">
                    {`$ ${productData[purchase.product]?.price || 'Price Unavailable'}`}
                  </td>
                  <td className="border-b px-4 py-2 text-sm text-gray-700">
                    {new Date(purchase.purchased_at).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      ) : (
        <p>No purchases found.</p>
      )}
    </div>
  );
};

export default PurchasedList;
