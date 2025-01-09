'use client'

import { BannerCarousel } from "@/components/home/BannerCarousel";
import DisplayProduct from "@/components/home/DisplayProduct";
import DisplayCategory from "@/components/home/DisplayCategory";
import { useState } from "react";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSelectCategory = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Display Category and Product */}
      <div>
        <h1 className="text-2xl font-semibold text-center mt-12 mb-8 text-gray-800">
          Filter Your Needs By Category
        </h1>
        <div className="mb-12">
          <DisplayCategory onSelectCategory={handleSelectCategory} />
        </div>
        <div className="mb-12">
          <DisplayProduct selectedCategory={selectedCategory}/>
        </div>
      </div>
    </div>
  );
}
