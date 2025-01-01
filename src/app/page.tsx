import { Button } from "@/components/ui/button"
import { BannerCarousel } from "@/components/home/BannerCarousel"

export default function Home() {
  return(
    <div>
      {/* Banner Carousel */}
      <BannerCarousel/>

      <h1 className="font-bold text-3xl flex justify-center items-center">Hello world</h1>
      <Button>Click me</Button>
    </div>
  )
}
