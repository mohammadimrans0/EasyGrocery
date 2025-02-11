'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product } from "@/constants/types";
import { useProductStore } from "@/app/stores/useProductStore";
import { useOrderStore } from "@/app/stores/useOrderStore";
import { useUserStore } from "@/app/stores/useUserStore";
// import axios from "axios";

interface DisplayProductProps {
  selectedCategory: number | null;
}

const DisplayProduct: React.FC<DisplayProductProps> = ({ selectedCategory }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { products, fetchProducts, isLoading, message } = useProductStore();
  const { addToCart } = useOrderStore();
  const {addToWishlist} = useUserStore();

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      await fetchProducts();
    };

    fetchAndFilterProducts();
  }, [fetchProducts]);

  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredProducts(products);
    } else {
      setFilteredProducts(products.filter((product) => product.category === selectedCategory));
    }
  }, [products, selectedCategory]);

  if (isLoading) {
    return <div className="text-center text-gray-600">Loading products...</div>;
  }

  if (message) {
    return <div className="text-center text-red-500">{message}</div>;
  }

  return (
    <div className="p-4">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-lg drop-shadow-lg p-4 flex flex-col items-center bg-white hover:border hover:border-green-500 transition duration-200"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={160}
                height={160}
                className="object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Price:</span> ৳{product.price}
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-medium">Stock:</span> {product.stock}
              </p>
              <button
                onClick={() => addToCart(product)}
                className="px-6 py-3 mb-3 bg-[#77b91e] text-white rounded-full flex items-center gap-2 font-medium"
              >
                <span>Add to Cart</span>
                <FaShoppingCart className="w-5 h-5" />
              </button>
              <button
                onClick={() => addToWishlist(product)}
                className="px-6 py-3 rounded-full flex items-center gap-2 font-medium text-red-400 border"
              >
                <span>Add to Wishlist</span>
                <FaHeart className="w-5 h-5 text-red-500" />
              </button>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available for this category</p>
      )}
      <ToastContainer />
    </div>
  );
};

export default DisplayProduct;
