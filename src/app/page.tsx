import { BannerCarousel } from "@/components/home/BannerCarousel";
import DisplayProduct from "@/components/home/DisplayProduct";

export default function Home() {
  return (
    <div>
      {/* Banner Carousel */}
      <BannerCarousel />

      {/* Display Product */}
      <div>
        <h1 className="text-2xl font-semibold text-center mt-12 mb-8 text-gray-800">
            Filter Your Needs By Category
        </h1>
        <div className="mb-12">
          <DisplayProduct />
        </div>
      </div>
    </div>
  );
}
