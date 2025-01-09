'use client'

import React, { useEffect, useState } from "react";
import axios from "axios";
import Image from "next/image";
import { FaShoppingCart, FaHeart } from "react-icons/fa";
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { Product } from "@/constants/types";

interface DisplayProductProps {
  selectedCategory: number | null;
}

const DisplayProduct: React.FC<DisplayProductProps> = ({ selectedCategory}) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [userId, setUserId] = useState<string | null>(null);

  useEffect(() => {
    const storedUserId = localStorage.getItem("user_id");
    setUserId(storedUserId);
  }, []);

  // Fetch products from API
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await axios.get(
          "https://easygrocery-server.onrender.com/api/product/products/"
        );
        setProducts(response.data.results);
        setFilteredProducts(response.data.results);
      } catch (error) {
        console.error("Failed to fetch products:", error);
      }
    };

    fetchProducts();
  }, []);

  // Filter products by category
  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredProducts(products); // Show all products if no category selected
    } else {
      setFilteredProducts(products.filter((product) => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);


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
          product: product,
          quantity: 1, // Default quantity
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
      const response = await axios.post(
        "https://easygrocery-server.onrender.com/api/user_profile/wishlist/",
        {
          user: userId,
          product: product,
        },
        {
          headers: {
            'Content-Type': 'application/json',
          },
        }
      );
      if (response.status === 201) {
        toast.success(`${product.name} has been added to your wishlist!`);
      }
    } catch (error) {
      console.error("Failed to add product to wishlist:", error);
      toast.error("Failed to add product to wishlist.");
    }
  };

  return (
    <div className="p-4">
      {filteredProducts.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
          {filteredProducts.map((product) => (
            <div
              key={product.id}
              className="border rounded-lg shadow-md p-4 flex flex-col items-center bg-white"
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
                onClick={() => handleAddToCart(product)} // Call the API for "Add to Cart"
                className="px-6 py-3 mb-3 bg-blue-500 text-white rounded-full flex items-center gap-2 font-medium"
              >
                <span>Add to Cart</span>
                <FaShoppingCart className="w-5 h-5" />
              </button>

              <button
                onClick={() => handleAddToWishlist(product)} // Call the API for "Add to Wishlist"
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

      {/* Toast Container for success notifications */}
      <ToastContainer />
    </div>
  );
};

export default DisplayProduct;
