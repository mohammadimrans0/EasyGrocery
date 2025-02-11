'use client';

import { useUserStore } from "@/app/stores/useUserStore";
import Image from "next/image";
import { useEffect } from "react";

export default function MyWishlist() {
  const { wishlist, fetchWishlist, productData, error, isLoading, removeWishlistItem } = useUserStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  if (isLoading) return <div>Loading wishlist...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (wishlist.length === 0) return <div>No wishlist items available</div>;

  return (
      <div className="w-full h-screen p-8">
        <h1 className="text-2xl font-bold text-gray-700">My Wishlist</h1>
        <div className="mt-6">
          <div className="flex flex-wrap gap-4">
            {Array.isArray(wishlist) && wishlist.length > 0 ? (
              wishlist.map((item) => {
                const product = productData[item.product];
                return (
                  <div
                    key={item.id}
                    className="flex flex-col border p-4 rounded-lg w-full md:w-1/3 lg:w-1/4 bg-white"
                  >
                    {product ? (
                      <>
                        <div className="relative w-full h-48 mb-4">
                          <Image
                            src={product.image}
                            alt={product.name}
                            layout="fill"
                            objectFit="cover"
                            className="rounded-md"
                            priority={true}
                          />
                        </div>
                        <div>
                          <p className="font-bold text-lg">{product.name}</p>
                          <p className="text-gray-700">Price: ${product.price}</p>
                          <p className="text-gray-700">
                            Stock: {product.stock > 0 ? product.stock : 'Out of stock'}
                          </p>
                        </div>
                        <div className="flex justify-between mt-4">
                          <button
                            onClick={() => console.log("View product logic here")}
                            className="text-blue-500 font-medium"
                          >
                            View
                          </button>
                          <button
                            onClick={() => removeWishlistItem(item.id)}
                            className="text-red-500 font-medium"
                          >
                            Remove
                          </button>
                        </div>
                      </>
                    ) : (
                      <div className="text-gray-500">Product details unavailable</div>
                    )}
                  </div>
                );
              })
            ) : (
              <div>No wishlist items available</div>
            )}
          </div>
        </div>
      </div>
  );
}
