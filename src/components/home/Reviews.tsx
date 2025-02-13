import { useState, useEffect } from "react";
import { AiFillStar } from "react-icons/ai";
import Image from "next/image";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Emily Davis",
    role: "Verified Buyer",
    image: "/images/reviewer/reviewer1.jpeg",
    review:
      "Amazing quality! Fresh produce every time, and the customer service is excellent.",
  },
  {
    name: "Sarah Johnson",
    role: "Verified Buyer",
    image: "/images/reviewer/reviewer2.jpeg",
    review:
      "Great value for money! Delivery was prompt, and everything was well packaged.",
  },
  {
    name: "Ishan Goyal",
    role: "Verified Buyer",
    image: "/images/reviewer/reviewer3.jpeg",
    review:
      "Fast delivery and great packaging. I will definitely be shopping again!",
  },
];

export default function ReviewPage() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prevIndex) => (prevIndex + 1) % reviews.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  return (
    
      <div className="container mx-auto px-4 text-center">
        <h2 className="text-3xl font-semibold text-gray-800 mb-12">
          Customer Reviews
        </h2>
        <div className="relative max-w-2xl mx-auto overflow-hidden">
          <motion.div
            key={index}
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.5 }}
            className="bg-white p-6 rounded-lg shadow-lg"
          >
            <div className="flex items-center space-x-4">
              <Image
                src={reviews[index].image}
                alt={reviews[index].name}
                className="w-16 h-16 rounded-full object-cover"
                width={64}
                height={64}
              />
              <div>
                <h3 className="font-medium text-lg text-gray-800">
                  {reviews[index].name}
                </h3>
                <p className="text-gray-500">{reviews[index].role}</p>
              </div>
            </div>
            <p className="mt-4 text-gray-700">{reviews[index].review}</p>
            <div className="mt-4 flex items-center space-x-1 text-yellow-400">
              {[...Array(5)].map((_, idx) => (
                <AiFillStar key={idx} className="w-5 h-5" />
              ))}
            </div>
          </motion.div>
        </div>
      </div>
  );
}
