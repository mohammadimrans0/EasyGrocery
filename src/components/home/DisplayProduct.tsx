"use client";

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { Product } from "@/constants/types";
import { useProductStore } from "@/app/stores/useProductStore";
import { useOrderStore } from "@/app/stores/useOrderStore";
import { useUserStore } from "@/app/stores/useUserStore";
import Link from "next/link";

interface DisplayProductProps {
  selectedCategory: number | null;
}

const DisplayProduct: React.FC<DisplayProductProps> = ({ selectedCategory }) => {
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const { products, fetchProducts, isLoading, message } = useProductStore();
  const { addToCart } = useOrderStore();
  const { addToWishlist } = useUserStore();

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
      setFilteredProducts(
        products.filter((product) => product.category === selectedCategory)
      );
    }
  }, [products, selectedCategory]);

  if (isLoading) {
    return (
      <div className="p-4 grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {[...Array(8)].map((_, index) => (
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

  return (
    <div className="p-4">
      {filteredProducts.length > 0 ? (



<div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
{filteredProducts.map((product) => (


  <div
    key={product.id}
    className="relative rounded-lg shadow-sm border p-4 flex flex-col items-center bg-white hover:border-2 hover:border-primary transition duration-200 h-[400px] group"
  >
    <div className="relative w-full">
      <Link href={`/products/${product.id}`} className="block">
        <Image
          src={product.image}
          alt={product.name}
          width={100}
          height={120}
          className="object-contain rounded-md mb-4 max-h-[220px] w-full transition duration-300 group-hover:opacity-75 scale-60"
        />
      </Link>
      <div className="absolute inset-0 flex items-center justify-center gap-x-4 opacity-0 group-hover:opacity-100 transition duration-300">
        <button
          onClick={() => addToCart(product)}
          className="p-3 bg-[#77b91e] text-white rounded-full shadow-md"
        >
          <ShoppingCart className="w-6 h-6" />
        </button>
        <button
          onClick={() => addToWishlist(product)}
          className="p-3 bg-white text-red-500 rounded-full shadow-md border"
        >
          <Heart className="w-6 h-6" />
        </button>
      </div>
    </div>
    
    <Link href={`/products/${product.id}`} className="block">
      <h2 className="text-lg font-semibold mb-2 hover:text-2xl hover:text-primary">
        {product.name}
      </h2>
    </Link>

    <p className="text-gray-700 mb-1">
      <span className="font-medium">Price:</span> ৳{product.price}
    </p>

    <p className="text-gray-700 mb-3">
      <span className="font-medium">Stock:</span> {product.stock}
    </p>

    <div className="flex items-center space-x-1 text-yellow-500">
      {[...Array(5)].map((_, idx) => (
        <Star key={idx} fill="yellow"/>
      ))}
    </div>
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
