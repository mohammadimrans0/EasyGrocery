'use client'

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { motion, AnimatePresence } from 'framer-motion';
import { ChevronLeft, ChevronRight } from 'lucide-react';

const groceryItems = [
  { id: 1, name: 'Fresh Fruits', image: '/images/banner-carousel/img1.jpg', link: '/' },
  { id: 2, name: 'Vegetables', image: '/images/banner-carousel/img2.jpg', link: '/' },
  { id: 3, name: 'Bakery Items', image: '/images/banner-carousel/img3.jpg', link: '/' },
  { id: 4, name: 'Meat & Poultry', image: '/images/banner-carousel/img4.jpg', link: '/' },
];

export function BannerCarousel() {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setIndex((prev) => (prev + 1) % groceryItems.length);
    }, 4000);
    return () => clearInterval(interval);
  }, []);

  const scrollPrev = () => {
    setIndex((prev) => (prev - 1 + groceryItems.length) % groceryItems.length);
  };

  const scrollNext = () => {
    setIndex((prev) => (prev + 1) % groceryItems.length);
  };

  return (
    <div className="relative w-full h-[30vh] md:h-[50vh] lg:h-[60vh] overflow-hidden mt-[65px]">
      <AnimatePresence>
        {groceryItems.map((item, i) =>
          i === index ? (
            <motion.div
              key={item.id}
              initial={{ opacity: 0, x: 50 }}
              animate={{ opacity: 1, x: 0 }}
              exit={{ opacity: 0, x: -50 }}
              transition={{ duration: 0.5 }}
              className="absolute inset-0 w-full h-full"
            >
              <Link href={item.link} className="block relative w-full h-full">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </Link>
            </motion.div>
          ) : null
        )}
      </AnimatePresence>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full p-2 hidden sm:block"
        onClick={scrollPrev}
      >
        <ChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-primary text-white rounded-full p-2 hidden sm:block"
        onClick={scrollNext}
      >
        <ChevronRight className="w-6 h-6" />
      </button>
    </div>
  );
}
