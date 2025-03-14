'use client'
import { useState } from "react";

import { BannerCarousel } from "@/components/home/BannerCarousel";
import DisplayProduct from "@/components/home/DisplayProduct";
import DisplayCategory from "@/components/home/DisplayCategory";
import ExtraInfoPage from "@/components/home/ExtraInfo";

export default function Home() {
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  const handleSelectCategory = (categoryId: number | null) => {
    setSelectedCategory(categoryId);
  };

  return (
    <div>
      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Home Section */}
      <div className="mb-12">
      <h1 className="text-2xl font-semibold text-center my-12 text-gray-800">
          All Your Daily Needs Available Here
        </h1>
          <DisplayProduct selectedCategory={selectedCategory}/>
      </div>

      {/* Review Section */}
      <div>
        <ExtraInfoPage/>
      </div>
    </div>
  );
}