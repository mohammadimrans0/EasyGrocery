'use client'

import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';

const CreateCategory = () => {
  const router = useRouter();
  const [categoryName, setCategoryName] = useState('');
  const [slug, setSlug] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    setCategoryName(e.target.value);
    setSlug(e.target.value.toLowerCase().replace(/\s+/g, '-'));
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setIsLoading(true);
    setMessage('');

    try {
      const response = await axios.post('https://easygrocery-server.onrender.com/api/category/categories/', {
        name: categoryName,
        slug: slug,
      });

      if (response.status === 201) {
        setMessage('Category created successfully!');
        setCategoryName('');
        setSlug('');

        setTimeout(() => {
            router.push('/');
          }, 1500);

      } else {
        setMessage('Failed to create category. Please try again.');
      }
    } catch (error) {
      console.error('Error creating category:', error);
      setMessage('An error occurred. Please try again later.');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gray-100 dark:bg-gray-900 p-4">
    <div className="w-full max-w-md">
      <div className="bg-white dark:bg-gray-800 shadow-lg rounded-lg overflow-hidden transform transition-all hover:scale-105 duration-300">
        <div className="bg-gradient-to-r from-purple-500 to-indigo-600 p-4">
          <h2 className="text-2xl font-bold text-white text-center">Create Category</h2>
        </div>
        <form onSubmit={handleSubmit} className="p-6 space-y-6">
          <div>
            <label htmlFor="categoryName" className="block text-sm font-medium text-gray-700 dark:text-gray-300 mb-2">
              Category Name
            </label>
            <input
              type="text"
              id="categoryName"
              value={categoryName}
              onChange={handleInputChange}
              required
              className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-transparent transition duration-150 ease-in-out dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              placeholder="Enter category name"
            />
          </div>
          <button
            type="submit"
            disabled={isLoading}
            className={`w-full flex justify-center py-2 px-4 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-purple-600 hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-purple-500 transition duration-150 ease-in-out ${
              isLoading ? 'opacity-50 cursor-not-allowed' : ''
            }`}
          >
            {isLoading ? (
              <>
                <svg className="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4"></circle>
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Creating...
              </>
            ) : (
              'Create Category'
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

export default CreateCategory;
