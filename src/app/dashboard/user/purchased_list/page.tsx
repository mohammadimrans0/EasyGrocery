'use client';

import { usePurchasedList } from "@/lib/api/user/getPurchasedList";

const PurchasedList = () => {
  const { purchasedList, productData, isLoading, isProductLoading } = usePurchasedList();

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Purchased List</h2>
      {isLoading ? (
        <p>Loading purchases...</p>
      ) : purchasedList.length > 0 ? (
        <table className="min-w-full border-collapse border border-slate-500">
          <thead>
            <tr>
              <th className="border border-slate-500 px-4 py-2">Product ID</th>
              <th className="border border-slate-500 px-4 py-2">Product Name</th>
              <th className="border border-slate-500 px-4 py-2">Product Price</th>
              <th className="border border-slate-500 px-4 py-2">Purchased At</th>
            </tr>
          </thead>
          <tbody>
            {purchasedList.map((purchase: any) => (
              <tr key={purchase.id}>
              <td className="border border-slate-500 px-4 py-2">{purchase.product}</td>
              <td className="border border-slate-500 px-4 py-2">
                {isProductLoading
                  ? 'Loading...'
                  : productData[purchase.product]?.name || 'Unknown Product'}
              </td>
              <td className="border border-slate-500 px-4 py-2">
                {isProductLoading
                  ? 'Loading...'
                  : `$ ${productData[purchase.product]?.price || 'Price Unavailable'}`}
              </td>
              <td className="border border-slate-500 px-4 py-2">
                {new Date(purchase.purchased_at).toLocaleString()}
              </td>
            </tr>
            ))}
          </tbody>
        </table>
      ) : (
        <p>No purchases found.</p>
      )}
    </div>
  );
};

export default PurchasedList;
