"use client";

import { useEffect } from "react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { useProductStore } from "@/app/stores/useProductStore";
import ProductCard from "./ProductCard";

const HotDeals = () => {
  const { products, fetchProducts, isLoading, message } = useProductStore();

  useEffect(() => {
    fetchProducts();
  }, [fetchProducts]);

  if (isLoading) {
    return (
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="rounded-lg drop-shadow-lg p-4 flex flex-col items-center bg-white animate-pulse h-[400px]"
          >
            <div className="w-[160px] h-[120px] bg-gray-300 rounded-md mb-4"></div>
            <div className="h-6 w-3/4 bg-gray-300 rounded mb-2"></div>
            <div className="h-4 w-1/2 bg-gray-300 rounded mb-1"></div>
            <div className="h-4 w-1/4 bg-gray-300 rounded mb-3"></div>
            <div className="flex items-center justify-center gap-x-6 mt-2">
              <div className="px-6 py-3 bg-gray-300 rounded-full w-[100px] h-10"></div>
              <div className="px-6 py-3 bg-gray-300 rounded-full w-[100px] h-10"></div>
            </div>
          </div>
        ))}
      </div>
    );
  }

  if (message) {
    return <div className="text-center text-red-500">{message}</div>;
  }

  // Select 4 random products
  const randomProducts =
    products.length > 4
      ? [...products].sort(() => Math.random() - 0.5).slice(0, 4)
      : products;

  return (
    <div className="px-8">
      {randomProducts.length > 0 ? (
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {randomProducts.map((product) => (
            <ProductCard key={product.id} product={product} />
          ))}
        </div>
      ) : (
        <p>No products available for this category</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default HotDeals;
