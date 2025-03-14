'use client'

import { BannerCarousel } from "@/components/home/BannerCarousel";
import DisplayProduct from "@/components/home/DisplayProduct";
import ExtraInfoPage from "@/components/home/ExtraInfo";
import HotDeals from "@/components/home/HotDeals";

export default function Home() {

  return (
    <div>
      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Product */}
      <div className="mb-12">
      <h1 className="text-2xl font-semibold text-center my-12 text-gray-800">
          All Your Daily Needs Available Here
        </h1>
          <DisplayProduct/>
      </div>

      {/* Hot Deails */}
      <div className="mb-12">
      <h1 className="text-2xl font-semibold px-8 my-12 text-gray-800">
          Hot Deals 🔥
        </h1>
          <HotDeals/>
      </div>

      {/* Review Section */}
      <div>
        <ExtraInfoPage/>
      </div>
    </div>
  );
}