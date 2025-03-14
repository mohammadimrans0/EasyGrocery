import { Leaf, Headphones, Lock, Truck } from "lucide-react";
import Image from "next/image";
import ReviewPage from "./Reviews";

export default function ExtraInofPage() {
  return (
    <div>
      {/* Hero section */}
      <section className="px-4">
        <div className="w-full mt-8 md:mt-0 relative">
          <Image
            src="/images/hero-image.webp"
            alt="Fresh Groceries"
            className="w-full h-full rounded-lg shadow-sm"
            width={1200}
            height={600}
          />

          {/* text */}
          <div className="hidden md:block absolute top-1/2 left-10 right-0 transform -translate-y-1/2 text-center md:text-left px-6">
            <h1 className="text-4xl font-bold mb-4">Fresh Groceries</h1>
            <h1 className="text-4xl font-bold mb-4 ml-2 md:ml-6 lg:ml-16">
              Delivered to Your Door
            </h1>
            <p className="text-xl">
              <span>
                Experience the best quality fresh produce, all at the comfort of
                your home.
              </span>
            </p>
            <p className="text-xl mb-8">
              <span>Shop for fruits, vegetables, dairy, and more.</span>
            </p>
            <button className="bg-green-500 hover:bg-primary py-3 px-6 text-white rounded-lg shadow-lg transition duration-300">
              Shop now
            </button>
          </div>
        </div>
      </section>

      {/* Review section */}
      <section className="pt-16">
        <ReviewPage />
      </section>

      {/* Subscribe section */}

      <section className="px-4">
        <div className="w-full p-6 md:px-12 md:py-12 rounded-lg mt-12 bg-lime-100">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Subscribe to our emails
          </h2>
          <p className="text-center mb-8">
            Stay updated with the latest news and exclusive offers. Join our
            email list today!
          </p>
          <div className="flex flex-col md:flex-row items-center justify-center gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full md:w-1/2 px-4 py-3 rounded-lg hover:border hover:border-green-500 shadow-sm"
            />
            <button className="w-full md:w-auto bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-primary transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Features section */}

      <section className="py-20 px-4">
        <div className="bg-lime-100 p-8 rounded-lg shadow-sm">
          <h2 className="text-3xl font-semibold text-center mb-6 text-gray-800">
            Our Commitment to You
          </h2>
          <div className="flex flex-wrap items-center justify-around gap-6 ">
            {/* Quality Products */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 w-64">
              <div className="text-green-500 text-4xl">
                <Leaf size={32} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-700">
                  Fresh Products
                </h1>
                <p className="text-gray-500">100% Organic</p>
              </div>
            </div>

            {/* 24/7 Support */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 w-64">
              <div className="text-blue-500 text-4xl">
                <Headphones size={32} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-700">
                  24/7 Support
                </h1>
                <p className="text-gray-500">Customer Service</p>
              </div>
            </div>

            {/* Secure Payment */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 w-64">
              <div className="text-yellow-500 text-4xl">
                <Lock size={32} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-700">
                  Secure Payment
                </h1>
                <p className="text-gray-500">Safe & Fast</p>
              </div>
            </div>

            {/* Free Shipping */}
            <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300 w-64">
              <div className="text-purple-500 text-4xl">
                <Truck size={32} />
              </div>
              <div>
                <h1 className="text-xl font-bold text-gray-700">
                  Free Shipping
                </h1>
                <p className="text-gray-500">Worldwide</p>
              </div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
