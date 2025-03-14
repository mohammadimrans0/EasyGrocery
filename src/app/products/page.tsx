"use client";

import { useEffect, useState } from "react";

import { useProductStore } from "../stores/useProductStore";

import { Sheet, SheetContent, SheetTrigger } from "@/components/ui/sheet";
import { ArrowRight, Search } from "lucide-react";
import { ToastContainer } from "react-toastify";
import ProductCard from "@/components/home/ProductCard";
// import { Button } from "@/components/ui/button";

const ITEMS_PER_PAGE = 6;

const AllProduct = () => {
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
  const [searchQuery, setSearchQuery] = useState("");
  const [isDrawerOpen, setIsDrawerOpen] = useState(false);
  const [currentPage, setCurrentPage] = useState(1);

  const handleSelectCategory = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
    setSearchQuery("");
    setCurrentPage(1);
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

  // Pagination logic
  const totalPages = Math.ceil(filteredProducts.length / ITEMS_PER_PAGE);
  const paginatedProducts = filteredProducts.slice(
    (currentPage - 1) * ITEMS_PER_PAGE,
    currentPage * ITEMS_PER_PAGE
  );

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
            <button className="absolute right-3 top-5 transform -translate-y-1/2 text-gray-500 hover:text-gray-700">
              <Search className="w-5 h-5" />
            </button>
          </div>
        </div>

        {isLoading ? (
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
        ) : paginatedProducts.length > 0 ? (
          <>
            <div className="grid grid-cols-2 md:grid-cols-3 gap-6 mt-8">
              {paginatedProducts.map((product) => (
                <ProductCard key={product.id} product={product} />
              ))}
            </div>

            {/* Pagination Controls */}
            <div className="flex justify-center mt-6 space-x-3 items-center">
              <button
                className={`px-4 py-2 rounded-lg shadow-md font-medium transition ${
                  currentPage === 1
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/80"
                }`}
                disabled={currentPage === 1}
                onClick={() => setCurrentPage(currentPage - 1)}
              >
                ← Previous
              </button>

              <span className="px-4 py-2 border rounded-lg text-lg font-semibold bg-gray-100 shadow">
                {currentPage} / {totalPages}
              </span>

              <button
                className={`px-4 py-2 rounded-lg shadow-md font-medium transition ${
                  currentPage === totalPages
                    ? "bg-gray-300 text-gray-500 cursor-not-allowed"
                    : "bg-primary text-white hover:bg-primary/80"
                }`}
                disabled={currentPage === totalPages}
                onClick={() => setCurrentPage(currentPage + 1)}
              >
                Next →
              </button>
            </div>
          </>
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
