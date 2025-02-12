'use client'
import { useState } from "react";

import { BannerCarousel } from "@/components/home/BannerCarousel";
import DisplayProduct from "@/components/home/DisplayProduct";
import DisplayCategory from "@/components/home/DisplayCategory";
import ReviewPage from "@/components/home/Review";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSelectCategory = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Category Section */}
      <div>
        <h1 className="text-2xl font-semibold text-center mt-8 mb-6 text-gray-800">
          Filter Your Needs By Category
        </h1>
        <div className="mb-6">
          <DisplayCategory onSelectCategory={handleSelectCategory} />
        </div>
      </div>

      {/* Home Section */}
      <div className="mb-12">
          <DisplayProduct selectedCategory={selectedCategory}/>
      </div>

      {/* Review Section */}
      <div>
        <ReviewPage/>
      </div>
    </div>
  );
}
