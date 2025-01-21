'use client';

import { getUserWishlist } from "@/lib/api/user/getUserWishlist";


export default function MyWishlist() {
  const { wishlist, error, isLoading, removeWishlistItem } = getUserWishlist();

  if (isLoading) return <div>Loading wishlist...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (wishlist.length === 0) return <div>No wishlist items available</div>;

  return (
    <div className="py-12 px-4 sm:px-6 lg:px-8 min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-gray-700">My Wishlist</h1>
        <div className="mt-6">
          <div className="flex flex-wrap gap-4">
            {Array.isArray(wishlist) && wishlist.length > 0 ? (
              wishlist.map((item) => (
                <div key={item.id} className="flex items-center justify-between border p-4 rounded-lg w-1/3 bg-white">
                  <div>
                    <p className="font-medium">{item.product_name}</p>
                  </div>
                  <div className="flex flex-row gap-x-8">
                    <button onClick={() => console.log('View product logic here')} className="text-blue-500 font-medium">
                      View
                    </button>
                    <button onClick={() => removeWishlistItem(item.id)} className="text-red-500 font-medium">
                      Remove
                    </button>
                  </div>
                </div>
              ))
            ) : (
              <div>No wishlist items available</div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
}
