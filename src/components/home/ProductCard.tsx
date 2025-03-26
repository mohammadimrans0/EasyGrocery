import Image from "next/image";
import Link from "next/link";
import { ShoppingCart, Heart, ExternalLink } from "lucide-react";
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
      className="relative rounded-lg shadow-sm border p-4 flex flex-col items-center bg-white hover:border-2 hover:border-primary transition duration-200 lg:h-[400px] group"
    >
      {/* Product Image */}
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

        {/* Hover Buttons */}
        <div className="absolute inset-0 flex items-center justify-center gap-x-4 opacity-0 group-hover:opacity-100 transition duration-300">
          
          {/* Add to Cart */}
          <div className="relative group/cart">
            <button
              onClick={() => addToCart(product)}
              className="p-3 bg-primary text-white rounded-full shadow-md peer/cart"
            >
              <ShoppingCart className="w-6 h-6" />
            </button>
            <p className="absolute w-[95px] bottom-14 left-1/2 font-semibold transform -translate-x-1/2 bg-primary text-white text-sm px-2 py-1 rounded opacity-0 peer-hover/cart:opacity-100 transition">
              Add to Cart
            </p>
          </div>

          {/* Add to Wishlist */}
          <div className="relative group/wishlist">
            <button
              onClick={() => addToWishlist(product)}
              className="p-3 bg-white text-red-500 rounded-full shadow-md peer/wishlist"
            >
              <Heart className="w-6 h-6" />
            </button>
            <p className="absolute w-[120px] bottom-14 left-1/2 font-semibold transform -translate-x-1/2 bg-primary text-white text-sm px-2 py-1 rounded opacity-0 peer-hover/wishlist:opacity-100 transition">
              Add to Wishlist
            </p>
          </div>

          {/* View Product */}
          <div className="relative group/view">
            <Link href={`/products/${product.id}`}>
              <button className="p-3 bg-primary text-white rounded-full shadow-md peer/view">
                <ExternalLink className="w-6 h-6" />
              </button>
            </Link>
            <p className="absolute bottom-14 left-1/2 transform -translate-x-1/2 bg-black text-white text-sm px-2 py-1 rounded opacity-0 peer-hover/view:opacity-100 transition">
              View Product
            </p>
          </div>
        </div>
      </div>

      {/* Product Details */}
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
          <p key={idx} className="text-yellow-500 text-xl">⭐</p>
        ))}
      </div>
    </div>
  );
};

export default ProductCard;
