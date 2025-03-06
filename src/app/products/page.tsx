'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useProductStore } from "../stores/useProductStore";
import Link from "next/link";

const AllProduct: React.FC = () => {
  const { categories, fetchCategories, isLoading, message } = useProductStore();
  const { products, fetchProducts } = useProductStore();
  
  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      fetchCategories();
      await fetchProducts();
    };
  
    fetchAndFilterProducts();
  }, [fetchProducts, fetchCategories]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Handle category selection
  const handleSelectCategory = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  // Filter products based on selected category
  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="px-8 grid grid-cols-4 md:grid-cols-8 lg:grid-cols-12 gap-6">
      
      {/* Sidebar - Category Filters */}
      <div className="col-span-4 lg:col-span-3 my-8 p-6 bg-gray-100 rounded-md">
        <h1 className="text-center text-2xl font-semibold my-6">Filter by Categories</h1>
        <div className="space-y-3">
          {/* All Categories Option */}
          <div 
            onClick={() => handleSelectCategory(null)} 
            className={`border rounded-lg shadow-md text-center cursor-pointer py-3 transition ${
              selectedCategory === null ? "bg-[#77b91e] text-white" : "hover:bg-gray-200"
            }`}
          >
            All Products
          </div>

          {/* Category List */}
          {categories.length > 0 ? (
            categories.map((category) => (
              <div
                key={category.id}
                onClick={() => handleSelectCategory(category.id)}
                className={`border rounded-lg shadow-md text-center cursor-pointer py-3 transition ${
                  selectedCategory === category.id ? "bg-[#77b91e] text-white" : "hover:bg-gray-200"
                }`}
              >
                {category.name}
              </div>
            ))
          ) : (
            <div className="text-center text-gray-600">No categories available.</div>
          )}
        </div>
      </div>

      {/* Products Section */}
      <div className="col-span-4 lg:col-span-9 p-8 mb-12">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
              <div
                key={product.id}
                className="rounded-lg shadow-md p-4 flex flex-col items-center bg-white hover:border hover:border-green-500 transition duration-200 h-[370px]"
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
              </div>
              </Link>
            ))}
          </div>
        ) : (
          <p className="text-center text-gray-600">No products available</p>
        )}
      </div>

    </div>
  );
};

export default AllProduct;
