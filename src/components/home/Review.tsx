import { FaLeaf, FaHeadset, FaLock, FaTruck } from "react-icons/fa";
import Image from "next/image";
import { AiFillStar } from "react-icons/ai";

export default function ReviewPage() {
  return (
    <div>
      {/* Hero section */}
      <section>
        <div className="w-full mt-8 md:mt-0 relative">
          <Image
            src="/images/hero-image.webp"
            alt="Fresh Groceries"
            className="w-full h-full rounded-lg shadow-xl"
            width={1200}
            height={600}
          />
          <div className="absolute top-1/2 left-10 right-0 transform -translate-y-1/2 text-center md:text-left px-6">
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
            <button className="bg-green-500 py-3 px-6 text-white rounded-lg shadow-lg transition duration-300">
              Shop now
            </button>
          </div>
        </div>
      </section>

      {/* Review section */}
      <section className="py-20 bg-lime-100">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-semibold text-center text-gray-800 mb-12">
            Customer Reviews
          </h2>
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/reviewer/reviewer1.jpeg"
                  alt="Customer 1"
                  className="w-16 h-16 rounded-full object-cover"
                  width={64}
                  height={64}
                />
                <div>
                  <h3 className="font-medium text-lg text-gray-800">
                    Emily Davis
                  </h3>
                  <p className="text-gray-500">Verified Buyer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                &quot;Amazing quality! Fresh produce every time, and the
                customer service is excellent.&quot;
              </p>
              <div className="mt-4 flex items-center space-x-1 text-yellow-400">
                {/* Star rating */}
                {[...Array(5)].map((_, index) => (
                   <AiFillStar key={index} className="w-5 h-5" />
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/reviewer/reviewer2.jpeg"
                  alt="Customer 2"
                  className="w-16 h-16 rounded-full object-cover"
                  width={64}
                  height={64}
                />
                <div>
                  <h3 className="font-medium text-lg text-gray-800">
                    Sarah Johnson
                  </h3>
                  <p className="text-gray-500">Verified Buyer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                &quot;Great value for money! Delivery was prompt, and
                everything was well packaged.&quot;
              </p>
              <div className="mt-4 flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, index) => (
                  <AiFillStar key={index} className="w-5 h-5" />
                ))}
              </div>
            </div>

            <div className="bg-white p-6 rounded-lg shadow-lg hover:shadow-xl transition-all">
              <div className="flex items-center space-x-4">
                <Image
                  src="/images/reviewer/reviewer3.jpeg"
                  alt="Customer 2"
                  className="w-16 h-16 rounded-full object-cover"
                  width={64}
                  height={64}
                />
                <div>
                  <h3 className="font-medium text-lg text-gray-800">
                    Ishan Goyal
                  </h3>
                  <p className="text-gray-500">Verified Buyer</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700">
                &quot;Fast delivery and great packaging. I will definitely be shopping again !&quot;
              </p>
              <div className="mt-4 flex items-center space-x-1 text-yellow-400">
                {[...Array(5)].map((_, index) => (
                   <AiFillStar key={index} className="w-5 h-5" />
                ))}
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Subscribe section */}

      <section>
        <div className="w-full bg-lime-100 py-12 px-6 md:px-12 rounded-lg shadow-lg">
          <h2 className="text-3xl font-bold text-center mb-6 text-gray-800">
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
              className="w-full md:w-1/2 px-4 py-3 rounded-lg hover:border hover:border-green-500 shadow-sm focus:outline-none focus:ring-2 focus:ring-green-500 focus:border-transparent"
            />
            <button className="w-full md:w-auto bg-green-500 text-white py-3 px-6 rounded-lg shadow-lg hover:bg-green-600 transition duration-300">
              Subscribe
            </button>
          </div>
        </div>
      </section>

      {/* Features section */}

      <section className="py-20 container mx-auto px-4">
        <div className="flex flex-wrap items-center justify-around gap-6  bg-gradient-to-r from-green-200 via-sky-300 to-purple-400 p-8 rounded-lg shadow-xl">
          {/* Quality Products */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="text-green-500 text-4xl">
              <FaLeaf />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-700">
                Quality Products
              </h1>
              <p className="text-gray-500">100% Organic</p>
            </div>
          </div>

          {/* 24/7 Support */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="text-blue-500 text-4xl">
              <FaHeadset />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-700">24/7 Support</h1>
              <p className="text-gray-500">Customer Service</p>
            </div>
          </div>

          {/* Secure Payment */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="text-yellow-500 text-4xl">
              <FaLock />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-700">
                Secure Payment
              </h1>
              <p className="text-gray-500">Safe & Fast</p>
            </div>
          </div>

          {/* Free Shipping */}
          <div className="flex items-center gap-4 bg-white p-6 rounded-lg shadow-md hover:shadow-lg transform hover:scale-105 transition-all duration-300">
            <div className="text-purple-500 text-4xl">
              <FaTruck />
            </div>
            <div>
              <h1 className="text-xl font-bold text-gray-700">Free Shipping</h1>
              <p className="text-gray-500">Worldwide</p>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
