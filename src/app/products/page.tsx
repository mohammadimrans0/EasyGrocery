"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import { useProductStore } from "../stores/useProductStore";
import Link from "next/link";
import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowRight, Heart, Search, ShoppingCart, Star } from "lucide-react";
import { useOrderStore } from "../stores/useOrderStore";
import { useUserStore } from "../stores/useUserStore";
import { ToastContainer } from "react-toastify";

const AllProduct: React.FC = () => {
  const { categories, fetchCategories, isLoading } = useProductStore();
  const { products, fetchProducts } = useProductStore();
  const { addToCart } = useOrderStore();
    const { addToWishlist } = useUserStore();

  useEffect(() => {
    const fetchAndFilterProducts = async () => {
      fetchCategories();
      await fetchProducts();
    };
    fetchAndFilterProducts();
  }, [fetchProducts, fetchCategories]);

  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);

  const handleSelectCategory = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setSearchQuery("");
    if (window.innerWidth < 1024) {
      setIsDrawerOpen(false);
    }
  };

  const filteredProducts = products.filter((product) => {
    const matchesCategory =
      selectedCategory === null || product.category === selectedCategory;
    const matchesSearch =
      product.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      categories.find(
        (category) =>
          category.id === product.category &&
          category.name.toLowerCase().includes(searchQuery.toLowerCase())
      );
    return matchesCategory && matchesSearch;
  });

  return (
    <div className="px-4 py-8 lg:p-0 mt-16 grid grid-cols-1 lg:grid-cols-12 gap-6">
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
            <label
              key={category.id}
              className="flex items-center cursor-pointer"
            >
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

      {/* Drawer for Small Screens */}
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
              <label
                key={category.id}
                className="flex items-center cursor-pointer"
              >
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

      {/* Products Section */}
      <div className="col-span-9 lg:p-6 mt-4">
        {/* Search Bar */}
        <div className="flex justify-center max-w-2xl mx-auto">
          <div className="relative w-full">
            <input
              type="text"
              placeholder="Search your desired products..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full p-2 mb-4 border-2 rounded-lg pr-10"
            />
            <button
              className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
            >
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isLoading ? (
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
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
          <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
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
          <p className="text-center text-gray-600 mt-6">
            No products available
          </p>
        )}
        <ToastContainer />
      </div>
    </div>
  );
};

export default AllProduct;
