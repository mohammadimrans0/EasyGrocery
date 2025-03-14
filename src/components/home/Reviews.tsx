import { Star } from "lucide-react";
import Image from "next/image";
import { motion } from "framer-motion";

const reviews = [
  {
    name: "Emily Davis",
    role: "Verified Buyer",
    image: "/images/reviewer/reviewer1.jpeg",
    review: "Amazing quality! Fresh produce every time, and the customer service is excellent.",
  },
  {
    name: "Sarah Johnson",
    role: "Verified Buyer",
    image: "/images/reviewer/reviewer2.jpeg",
    review: "Great value for money! Delivery was prompt, and everything was well packaged.",
  },
  {
    name: "Ishan Goyal",
    role: "Verified Buyer",
    image: "/images/reviewer/reviewer3.jpeg",
    review: "Fast delivery and great packaging. I will definitely be shopping again!",
  },
  // Duplicate reviews with new names for variety
  {
    name: "David Lee",
    role: "Verified Buyer",
    image: "/images/reviewer/reviewer1.jpeg",
    review: "Excellent service! The fruits and vegetables are always fresh and delicious.",
  },
  {
    name: "Sophia Martinez",
    role: "Verified Buyer",
    image: "/images/reviewer/reviewer2.jpeg",
    review: "Love the variety! Their selection of organic products is fantastic.",
  },
  {
    name: "Ryan Patel",
    role: "Verified Buyer",
    image: "/images/reviewer/reviewer3.jpeg",
    review: "Very happy with my purchase. Everything arrived in perfect condition.",
  },
];

export default function ReviewCarousel() {
  return (
    <div className="w-full mx-auto text-center overflow-hidden">
      <h2 className="text-3xl font-semibold text-gray-800 mb-12">
        Customer Reviews
      </h2>

      <div className="relative w-full overflow-hidden">
        <motion.div
          className="flex space-x-6"
          animate={{
            x: ["0%", "-100%"],
          }}
          transition={{
            ease: "linear",
            duration: 15, // Adjust speed
            repeat: Infinity,
          }}
        >
          {[...reviews, ...reviews].map((review, index) => (
            <div key={index} className="w-80 shrink-0 p-6 rounded-lg shadow-lg bg-lime-100">
              <div className="flex items-center space-x-4">
                <Image
                  src={review.image}
                  alt={review.name}
                  className="w-16 h-16 rounded-full object-cover"
                  width={64}
                  height={64}
                />
                <div>
                  <h3 className="font-medium text-lg text-gray-800">
                    {review.name}
                  </h3>
                  <p className="text-gray-500">{review.role}</p>
                </div>
              </div>
              <p className="mt-4 text-gray-700 text-start">{review.review}</p>
              <div className="mt-4 flex items-center space-x-1 text-yellow-500">
                {[...Array(5)].map((_, idx) => (
                  <Star key={idx} fill="yellow"/>
                ))}
              </div>
            </div>
          ))}
        </motion.div>
      </div>
    </div>
  );
}
