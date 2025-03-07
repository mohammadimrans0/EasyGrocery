"use client";

import { useEffect, useState } from "react";
import { useParams } from "next/navigation";
import Image from "next/image";
import { ShoppingCart, Heart, Star } from "lucide-react";
import { ToastContainer } from "react-toastify";
import { useProductStore } from "@/app/stores/useProductStore";
import { Product } from "@/constants/types";
import { useOrderStore } from "@/app/stores/useOrderStore";
import { useUserStore } from "@/app/stores/useUserStore";

const ProductPage = () => {
  const { id } = useParams();
  const productId = Array.isArray(id) ? id[0] : id;
  const { fetchProductById, isLoading, message } = useProductStore();
  const [product, setProduct] = useState<Product | null>(null);

  useEffect(() => {
    const getProduct = async () => {
      if (productId) {
        const data: Product | null = await fetchProductById(productId);
        setProduct(data);
      }
    };
    getProduct();
  }, [productId, fetchProductById]);

  const { addToCart } = useOrderStore();
  const { addToWishlist } = useUserStore();

  if (isLoading)
    return (
      <div className="container mx-auto p-6 mt-16">
        <ToastContainer />
        <div className="flex flex-col md:flex-row gap-6 lg:gap-16 items-center justify-center">
          {/* Image Skeleton */}
          <div className="w-[400px] h-[300px] bg-gray-200 animate-pulse rounded-lg"></div>

          {/* Text Skeleton */}
          <div className="w-full max-w-md">
            <div className="h-8 bg-gray-200 rounded-md animate-pulse mb-4"></div>
            <div className="h-6 bg-gray-200 rounded-md animate-pulse mb-3 w-32"></div>
            <div className="h-5 bg-gray-200 rounded-md animate-pulse mb-3 w-20"></div>
            <div className="flex gap-1">
              {[...Array(5)].map((_, idx) => (
                <div
                  key={idx}
                  className="w-5 h-5 bg-gray-200 animate-pulse rounded-full"
                ></div>
              ))}
            </div>
            <div className="h-6 bg-gray-200 rounded-md animate-pulse mt-3 w-24"></div>
            <div className="h-12 bg-gray-200 rounded-md animate-pulse mt-4 w-40"></div>
            <div className="h-12 bg-gray-200 rounded-md animate-pulse mt-3 w-40"></div>
          </div>
        </div>

        <div className="mt-16">
          <div className="h-8 bg-gray-200 rounded-md animate-pulse w-36 mb-3"></div>
          <div className="h-24 bg-gray-200 rounded-md animate-pulse"></div>

          <div className="h-8 bg-gray-200 rounded-md animate-pulse w-32 mt-8 mb-3"></div>
          <div className="h-24 bg-gray-200 rounded-md animate-pulse"></div>
        </div>
      </div>
    );

  if (message) return <p className="text-center text-red-500">{message}</p>;
  if (!product)
    return <p className="text-center text-red-500">Product not found.</p>;

  return (
    <div className="container mx-auto p-6 mt-16">
      <ToastContainer />
      <div className="flex flex-col md:flex-row gap-6 lg:gap-16 items-center justify-center">
        <Image
          src={product.image}
          alt={product.name}
          width={400}
          height={300}
        />
        <div className="mt-8">
          <h1 className="text-4xl font-bold px-1">{product.name}</h1>
          <p className="text-lg font-semibold mt-4 text-2xl px-2">
            Price: <span className="text-green-500">৳{product.price}</span>
          </p>
          <div className="mt-4 px-1 flex items-center space-x-1 text-yellow-500">
            {[...Array(5)].map((_, idx) => (
              <Star key={idx} fill="yellow" />
            ))}
          </div>
          <p
            className={`mt-2 px-2 ${
              product.stock > 0 ? "text-green-500" : "text-red-500"
            }`}
          >
            {product.stock > 0 ? "In Stock" : "Out of Stock"}
          </p>
          <button
            onClick={() => addToCart(product)}
            className="mt-4 px-6 py-3 mb-3 bg-[#77b91e] text-white rounded-full flex items-center gap-2 font-medium"
          >
            <span>Add to Cart</span>
            <ShoppingCart className="w-5 h-5" />
          </button>
          <button
            onClick={() => addToWishlist(product)}
            className="mt-4 px-6 py-3 bg-gray-100 rounded-full flex items-center gap-2 font-medium text-red-400 border"
          >
            <span>Add to Wishlist</span>
            <Heart className="w-5 h-5 text-red-500" />
          </button>
        </div>
      </div>

      <div className="mt-16">
        <h1 className="text-xl px-4 py-2 rounded-t-lg bg-primary w-36 text-white">
          Description
        </h1>
        <div className="p-6 border rounded-b-lg rounded-r-lg">
          <p className="">{product.description}</p>
        </div>

        <h1 className="text-2xl mt-8 px-4 py-2 rounded-t-lg bg-gray-500 w-32 text-white">
          Reviews
        </h1>
        <div className="p-6 border rounded-b-lg rounded-r-lg">
          <p className="text-gray-500">No reviews available</p>
        </div>
      </div>
    </div>
  );
};

export default ProductPage;
