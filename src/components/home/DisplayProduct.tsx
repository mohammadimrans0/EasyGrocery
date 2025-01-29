'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product } from "@/constants/types";
import { getUserId } from "@/lib/api/user/getUserId";
import { getProducts } from "@/lib/api/product/getProduct";
import axios from "axios";

interface DisplayProductProps {
  selectedCategory: number | null;
}

const DisplayProduct: React.FC<DisplayProductProps> = ({ selectedCategory }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const userId = getUserId();

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      const products = await getProducts();
      if (selectedCategory === null) {
        setFilteredProducts(products);
      } else {
        setFilteredProducts(products.filter((product) => product.category === selectedCategory));
      }
    };

    fetchAndFilterProducts();
  }, [selectedCategory]);

  // Add to Cart
  const handleAddToCart = async (product: Product) => {
    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    try {
      const response = await axios.post(
        "https://easygrocery-server.onrender.com/api/user_profile/cart/",
        {
          user: userId,
          product: product.id,
          product_name: product.name,
          product_price: product.price
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        toast.success(`${product.name} has been added to your cart!`);
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  };

  // Add to Wishlist
  const handleAddToWishlist = async (product: Product) => {
    if (!userId) {
      toast.error("User not logged in.");
      return;
    }
  
    try {
      const payload = {
        user: userId,
        product: product.id,
        product_name: product.name
      };
  
      console.log("Payload for wishlist API:", payload);
  
      const response = await axios.post(
        "https://easygrocery-server.onrender.com/api/user_profile/wishlist/",
        payload,
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );

      if (response.status === 201) {
        toast.success(`${product.name} has been added to your wishlist!`);
      }
    } catch (error: any) {
      console.error("Failed to add product to wishlist:", error);
  
      if (error.response) {
        console.error("Response data:", error.response.data);
      }
  
      toast.error("Failed to add product to wishlist.");
    }
  };

  return (
    <div className="p-4">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="rounded-lg shadow-md p-4 flex flex-col items-center bg-white hover:border hover:border-green-500 transition duration-200"
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
                onClick={() => handleAddToCart(product)}
                className="px-6 py-3 mb-3 bg-[#77b91e] text-white rounded-full flex items-center gap-2 font-medium"
              >
                <span>Add to Cart</span>
                <FaShoppingCart className="w-5 h-5" />
              </button>
              <button
                onClick={() => handleAddToWishlist(product)}
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
