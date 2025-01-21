'use client';

import { useState, useEffect } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { MdAddCircle } from 'react-icons/md';
import { Category } from '@/constants/types';
import { getUserId } from '@/lib/api/user/getUserId';

const CreateProduct = () => {
  const router = useRouter();
  const userId = getUserId();

  const [categories, setCategories] = useState<Category[]>([]);
  const [formData, setFormData] = useState({
    name: '',
    image: null as File | null,
    description: '',
    price: '',
    stock: '',
    category: '',
    product_owner: userId || null,
  });
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get('https://easygrocery-server.onrender.com/api/category/categories/');
        setCategories(response.data.results);
      } catch (error) {
        console.error('Error fetching categories:', error);
        setMessage('Failed to load categories. Please try again.');
      }
    };
    fetchCategories();
  }, []);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (files && files[0]) {
      setFormData((prevData) => ({ ...prevData, image: files[0] }));
    }
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value instanceof File ? value : String(value));
    });

    try {
      const response = await axios.post('https://easygrocery-server.onrender.com/api/product/products/', data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        setMessage('Product created successfully!');
        setFormData({
          name: '',
          image: null,
          description: '',
          price: '',
          stock: '',
          category: '',
          product_owner: userId,
        });
      } else {
        setMessage('Failed to create product. Please try again.');
      }
    } catch (error) {
      console.error('Error creating product:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  if (!userId) {
    return (
      <div className="flex justify-center items-center">
        <p>User not authenticated. Please {' '}
            <a href="/auth/login" className="text-blue-500">Login</a>
        </p>
      </div>
    );
  }

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="w-full max-w-2xl">
        <div className="bg-white dark:bg-gray-800 shadow-2xl rounded-lg overflow-hidden transform transition-all hover:scale-105 duration-300">
          <div className="bg-gradient-to-r from-purple-600 to-indigo-600 p-6">
            <h2 className="text-3xl font-bold text-white text-center flex items-center justify-center">
              <MdAddCircle className="mr-2" />
              Create Product
            </h2>
          </div>
          <form onSubmit={handleSubmit} className="p-6 space-y-6">
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2">
              <div>
                <label htmlFor="name" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Product Name
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="image" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Image
                </label>
                <input
                  type="file"
                  id="image"
                  name="image"
                  onChange={handleFileChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-purple-50 file:text-purple-700 hover:file:bg-purple-100"
                  accept="image/*"
                />
              </div>
            </div>
            <div>
              <label htmlFor="description" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                Description
              </label>
              <textarea
                id="description"
                name="description"
                value={formData.description}
                onChange={handleInputChange}
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                rows={3}
                required
              ></textarea>
            </div>
            <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
              <div>
                <label htmlFor="price" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Price
                </label>
                <input
                  type="number"
                  id="price"
                  name="price"
                  value={formData.price}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="stock" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Stock
                </label>
                <input
                  type="number"
                  id="stock"
                  name="stock"
                  value={formData.stock}
                  onChange={handleInputChange}
                  className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                  required
                />
              </div>
              <div>
                <label htmlFor="category" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
                  Category
                </label>
                <select
                    id="category"
                    name="category"
                    value={formData.category}
                    onChange={handleInputChange}
                    className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white"
                    required
                    >
                    <option value="">Select a category</option>
                    {Array.isArray(categories) && categories.length > 0 && (
                        categories.map((category) => (
                        <option key={category.id} value={category.id}>
                            {category.name}
                        </option>
                        ))
                    )}
                </select>
              </div>
            </div>
            <button
              type="submit"
              disabled={isLoading}
              className={`w-full flex justify-center items-center py-3 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-green-500 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out ${
                isLoading ? 'opacity-50 cursor-not-allowed' : ''
              }`}
            >
              {isLoading ? (
                <>
                  <svg
                    className="animate-spin -ml-1 mr-3 h-5 w-5 text-white"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 24 24"
                  >
                    <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                    <path
                      className="opacity-75"
                      fill="currentColor"
                      d="M4 12a8 8 0 018-8v8H4z"
                    ></path>
                  </svg>
                  Processing...
                </>
              ) : (
                'Create Product'
              )}
            </button>
          </form>
          {message && (
            <div className="px-6 pb-6">
                <p className="text-sm text-green-600 dark:text-green-400">{message}</p>
            </div>
           )}
        </div>
      </div>
    </div>
  );
};

export default CreateProduct;


