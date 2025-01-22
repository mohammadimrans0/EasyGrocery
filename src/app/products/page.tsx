'use client';

import React, { useEffect, useState } from "react";
import Image from "next/image";
import { Product } from "@/constants/types";
import { getProducts } from "@/lib/api/product/getProduct";

const AllProduct: React.FC = () => {
  const [products, setProducts] = useState<Product[]>([]);

  useEffect(() => {
    const fetchProducts = async () => {
      const fetchedProducts = await getProducts();
      setProducts(fetchedProducts);
    };

    fetchProducts();
  }, []);

  return (
    <div className="p-8 my-16">
      {products.length > 0 ? (
        <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-6">
          {products.map((product) => (
            <div
              key={product.id}
              className="rounded-lg shadow-md p-4 flex flex-col items-center bg-white hover:border hover:border-green-500 transition duration-200"
            >
              <Image
                src={product.image}
                alt={product.name}
                width={160}
                height={160}
                className="object-cover rounded-md mb-4"
              />
              <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
              <p className="text-gray-700 mb-1">
                <span className="font-medium">Price:</span> ৳{product.price}
              </p>
              <p className="text-gray-700 mb-3">
                <span className="font-medium">Stock:</span> {product.stock}
              </p>
            </div>
          ))}
        </div>
      ) : (
        <p>No products available</p>
      )}
    </div>
  );
};

export default AllProduct;
