'use client';

import { useEffect, useState } from "react";
import Image from "next/image";
import { useProductStore } from "../stores/useProductStore";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowRight } from "lucide-react";

const AllProduct: React.FC = () => {
  const { categories, fetchCategories, isLoading } = useProductStore();
  const { products, fetchProducts } = useProductStore();

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      fetchCategories();
      await fetchProducts();
    };
    fetchAndFilterProducts();
  }, [fetchProducts, fetchCategories]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSelectCategory = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    if (window.innerWidth < 1024) {
      setIsDrawerOpen(false); // Close the sheet on small screens
    }
  };

  const filteredProducts = selectedCategory
    ? products.filter((product) => product.category === selectedCategory)
    : products;

  return (
    <div className="px-4 py-8 lg:p-0 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
      {/* Drawer for Mobile View */}
      <Sheet open={isDrawerOpen} onOpenChange={setIsDrawerOpen}>
        <SheetTrigger className="lg:hidden">
          <span className="flex items-center gap-x-2 w-48">
            <h1 className="text-xl">Filter Products </h1>
            <ArrowRight className="text-primary h-6 w-6" />
          </span>
        </SheetTrigger>

        <SheetContent className="p-6">
          <h1 className="text-2xl font-semibold my-4">Filter by Categories</h1>
          <div className="space-y-2">
            <label className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value="null"
                checked={selectedCategory === null}
                onChange={() => handleSelectCategory(null)}
                className="mr-3 text-primary w-5 h-5"
              />
              <span>All Products</span>
            </label>
            {categories.map((category) => (
              <label key={category.id} className="flex items-center cursor-pointer">
                <input
                  type="radio"
                  name="category"
                  value={category.id.toString()}
                  checked={selectedCategory === category.id}
                  onChange={() => handleSelectCategory(category.id)}
                  className="mr-3 text-primary w-5 h-5"
                />
                <span>{category.name}</span>
              </label>
            ))}
          </div>
        </SheetContent>
      </Sheet>

      {/* Sidebar for Larger Screens */}
      <div className="hidden lg:block col-span-3 p-6 bg-gray-100">
        <h1 className="text-xl font-semibold mb-4">Filter by Categories</h1>
        <div className="space-y-4">
          <label className="flex items-center cursor-pointer">
            <input
              type="radio"
              name="category"
              value="null"
              checked={selectedCategory === null}
              onChange={() => handleSelectCategory(null)}
              className="mr-3 text-primary w-5 h-5"
            />
            <span className="text-xl">All Products</span>
          </label>
          {categories.map((category) => (
            <label key={category.id} className="flex items-center cursor-pointer">
              <input
                type="radio"
                name="category"
                value={category.id.toString()}
                checked={selectedCategory === category.id}
                onChange={() => handleSelectCategory(category.id)}
                className="mr-3 text-primary w-5 h-5"
              />
              <span className="text-xl">{category.name}</span>
            </label>
          ))}
        </div>
      </div>

      {/* Products Section */}
      <div className="col-span-9 lg:p-6 mt-2">
        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
          {Array.from({ length: 6 }).map((_, index) => (
            <div
              key={index}
              className="rounded-lg shadow-md p-4 bg-white h-[230px] lg:h-[300px] flex flex-col items-center animate-pulse"
            >
              <div className="w-40 h-[130px] lg:h-[180px] bg-gray-300 rounded-md mb-2"></div>
              <div className="w-3/4 h-4 bg-gray-300 rounded-md mb-2"></div>
              <div className="w-1/2 h-3 bg-gray-300 rounded-md mb-1"></div>
              <div className="w-2/3 h-3 bg-gray-300 rounded-md"></div>
            </div>
          ))}
        </div>
        ) : filteredProducts.length > 0 ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6">
            {filteredProducts.map((product) => (
              <Link key={product.id} href={`/products/${product.id}`}>
                <div className="rounded-lg shadow-md p-4 bg-white hover:border hover:border-green-500 transition duration-200 h-[230px] lg:h-[300px] flex flex-col items-center">
                  <Image
                    src={product.image}
                    alt={product.name}
                    width={160}
                    height={160}
                    className="object-cover rounded-md mb-2 max-h-[130px] lg:max-h-[180px]"
                  />
                  <h2 className="text-lg font-semibold text-center">
                    {product.name}
                  </h2>
                  <p className="text-gray-700 text-sm">
                    <span className="font-medium">Price:</span> ৳{product.price}
                  </p>
                  <p className="text-gray-700 text-sm">
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
