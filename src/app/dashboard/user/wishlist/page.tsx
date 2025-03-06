"use client";

import { useUserStore } from "@/app/stores/useUserStore";
import Image from "next/image";
import Link from "next/link";
import { useEffect } from "react";

export default function MyWishlist() {
  const {
    wishlist,
    fetchWishlist,
    productData,
    error,
    isLoading,
    removeWishlistItem,
  } = useUserStore();

  useEffect(() => {
    fetchWishlist();
  }, [fetchWishlist]);

  if (isLoading) return <div className="flex items-center justify-center h-screen text-2xl">Loading wishlist...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (wishlist.length === 0) return <div className="flex items-center justify-center h-screen text-4xl">No wishlist items available</div>;

  return (
    <div className="w-full p-8">
      <h1 className="text-2xl font-bold text-gray-700">My Wishlist</h1>
      <div className="mt-6 overflow-x-auto">
        <table className="min-w-full bg-white shadow-md rounded-lg">
          <thead className="bg-gray-100">
            <tr>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                Product
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                Price
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                Stock
              </th>
              <th className="py-3 px-6 text-left text-sm font-semibold text-gray-600">
                Actions
              </th>
            </tr>
          </thead>
          <tbody>
            {Array.isArray(wishlist) && wishlist.length > 0 ? (
              wishlist.map((item) => {
                const product = productData[item.product];
                return (
                  <tr key={item.id} className="border-b">
                    <td className="py-4 px-6 flex items-center">
                      {product ? (
                        <div className="flex items-center gap-4">
                          <div className="relative w-16 h-16">
                            <Image
                              src={product.image}
                              alt={product.name}
                              layout="fill"
                              objectFit="cover"
                              className="rounded-md"
                              priority={true}
                            />
                          </div>
                          <span className="text-gray-700">{product.name}</span>
                        </div>
                      ) : (
                        <div className="text-gray-500">
                          Product details unavailable
                        </div>
                      )}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      ${product?.price}
                    </td>
                    <td className="py-4 px-6 text-gray-700">
                      {product?.stock > 0 ? product?.stock : "Out of stock"}
                    </td>
                    <td className="py-4 px-6 text-left">
                      <div className="flex items-center gap-x-4">
                        <Link href={`/products/${product?.id}`}>
                          <button className="text-blue-500 hover:text-blue-700 font-medium">
                            View
                          </button>
                        </Link>
                        <button
                          onClick={() => removeWishlistItem(item.id)}
                          className="text-red-500 hover:text-red-700 font-medium"
                        >
                          Remove
                        </button>
                      </div>
                    </td>
                  </tr>
                );
              })
            ) : (
              <tr>
                <td colSpan={4} className="py-4 px-6 text-center text-gray-500">
                  No wishlist items available
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
}
