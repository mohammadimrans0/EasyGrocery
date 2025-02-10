'use client'

import * as React from "react"
import Image from "next/image"
import Link from "next/link"
import useEmblaCarousel from "embla-carousel-react"
import { FiChevronLeft, FiChevronRight } from 'react-icons/fi';
import { useEffect } from "react"


const groceryItems = [
  { id: 1, name: "Fresh Fruits", image: "/images/banner-carousel/img1.png", link: "/" },
  { id: 2, name: "Vegetables", image: "/images/banner-carousel/img2.png", link: "/" },
  { id: 3, name: "Bakery Items", image: "/images/banner-carousel/img3.jpeg", link: "/" },
  { id: 4, name: "Meat & Poultry", image: "/images/banner-carousel/img4.png", link: "/" },
]

export function BannerCarousel() {
  const [emblaRef, emblaApi] = useEmblaCarousel({ loop: true })

  useEffect(() => {
    if (emblaApi) {
      const intervalId = setInterval(() => {
        emblaApi.scrollNext()
      }, 4000)

      return () => clearInterval(intervalId)
    }
  }, [emblaApi])

  const scrollPrev = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollPrev()
  }, [emblaApi])

  const scrollNext = React.useCallback(() => {
    if (emblaApi) emblaApi.scrollNext()
  }, [emblaApi])

  return (
    <div className="relative w-full">
      <div className="overflow-hidden" ref={emblaRef}>
        <div className="flex">
          {groceryItems.map((item) => (
            <div key={item.id} className="flex-[0_0_100%]">
              <Link href={item.link} className="block relative w-full h-[50vh] sm:h-[60vh] md:h-[70vh] lg:h-[50vh]">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                  sizes="100vw"
                  priority
                />
              </Link>
            </div>
          ))}
        </div>
      </div>
      <button
        className="absolute left-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hidden sm:block"
        onClick={scrollPrev}
      >
        <FiChevronLeft className="w-6 h-6" />
      </button>
      <button
        className="absolute right-4 top-1/2 -translate-y-1/2 bg-white bg-opacity-50 rounded-full p-2 hidden sm:block"
        onClick={scrollNext}
      >
        <FiChevronRight className="w-6 h-6" />
      </button>
    </div>
  )
}
