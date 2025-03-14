import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart } from "lucide-react";
import { Product } from "@/constants/types";
import { useOrderStore } from "@/app/stores/useOrderStore";
import { useUserStore } from "@/app/stores/useUserStore";

interface ProductCardProps {
  product: Product;
}

const ProductCard: React.FC<ProductCardProps> = ({ product }) => {
  const { addToCart } = useOrderStore();
  const { addToWishlist } = useUserStore();
  return (
    <div
      key={product.id}
      className="relative rounded-lg shadow-sm border p-4 flex flex-col items-center bg-white hover:border-2 hover:border-primary transition duration-200 h-[400px] group"
    >
      <div className="relative w-full">
        <Link href={`/products/${product.id}`} className="block">
          <Image
            src={product.image}
            alt={product.name}
            width={100}
            height={120}
            className="object-contain rounded-lg mb-4 max-h-[220px] w-full transition duration-300 group-hover:opacity-75"
          />
        </Link>
        <div className="absolute inset-0 flex items-center justify-center gap-x-4 opacity-0 group-hover:opacity-100 transition duration-300">
          <button
            onClick={() => addToCart(product)}
            className="p-3 bg-[#77b91e] text-white rounded-full shadow-md"
          >
            <ShoppingCart className="w-6 h-6" />
          </button>
          <button
            onClick={() => addToWishlist(product)}
            className="p-3 bg-white text-red-500 rounded-full shadow-md border"
          >
            <Heart className="w-6 h-6" />
          </button>
        </div>
      </div>

      <Link href={`/products/${product.id}`} className="block">
        <h2 className="text-lg font-semibold mb-2 hover:text-2xl hover:text-primary">
          {product.name}
        </h2>
      </Link>

      <p className="text-gray-700 mb-1">
        <span className="font-medium">Price:</span> ৳{product.price}
      </p>

      <p className="text-gray-700 mb-3">
        <span className="font-medium">Stock:</span> {product.stock}
      </p>

      <div className="flex items-center space-x-1">
        {[...Array(5)].map((_, idx) => (
          <p key={idx} className="text-yellow-500 text-xl">
            ⭐
          </p>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
