'use client';

import React, { useEffect, useState } from 'react';

interface Category {
  id: number;
  name: string;
}

interface Product {
  name: string;
  image: string;
  price: string;
  stock: number;
  category: number;
}

const DisplayProduct: React.FC = () => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [products, setProducts] = useState<Product[]>([]);
  const [filteredProducts, setFilteredProducts] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [selectedCategory, setSelectedCategory] = useState<number | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await fetch(
          'https://easygrocery-server.onrender.com/api/category/categories/'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch categories');
        }
        const data = await response.json();
        setCategories(data);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  // Fetch all products
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const response = await fetch(
          'https://easygrocery-server.onrender.com/api/product/products/'
        );
        if (!response.ok) {
          throw new Error('Failed to fetch products');
        }
        const data: Product[] = await response.json();
        setProducts(data);
        setFilteredProducts(data); // Show all products initially
      } catch (error) {
        setError(error instanceof Error ? error.message : 'Unknown error');
      }
    };

    fetchProducts();
  }, []);

  // Filter products based on the selected category
  useEffect(() => {
    if (selectedCategory === null) {
      setFilteredProducts(products); // Show all products when no category is selected
    } else {
      setFilteredProducts(products.filter((product) => product.category === selectedCategory));
    }
  }, [selectedCategory, products]);

  if (loading) {
    return <div className="text-center text-gray-600">Loading...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div>
      <div className="flex flex-wrap justify-center gap-4 p-4">
        {categories.map((category) => (
          <div
            key={category.id}
            onClick={() => setSelectedCategory(category.id)}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow-md text-center cursor-pointer hover:bg-gray-200 transition"
          >
            {category.name}
          </div>
        ))}
      </div>

      <div className="p-4">
        {filteredProducts.length > 0 ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6">
            {filteredProducts.map((product, index) => (
              <div
                key={index}
                className="border rounded-lg shadow-md p-4 flex flex-col items-center bg-white"
              >
                <img
                  src={product.image}
                  alt={product.name}
                  className="h-40 w-40 object-cover rounded-md mb-4"
                />
                <h2 className="text-lg font-semibold mb-2">{product.name}</h2>
                <p className="text-gray-700 mb-1">
                  <span className="font-medium">Price:</span> ৳{product.price}
                </p>
                <p className="text-gray-700 mb-3">
                  <span className="font-medium">Stock:</span> {product.stock}
                </p>
                <button className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600 transition">
                  Add to Cart
                </button>
              </div>
            ))}
          </div>
        ) : (
          <p>No products available for this category</p>
        )}
      </div>
    </div>
  );
};

export default DisplayProduct;
