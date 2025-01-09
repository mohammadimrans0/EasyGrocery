'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';

interface Category {
  id: number;
  name: string;
}

interface DisplayCategoryProps {
  onSelectCategory: (categoryId: number | null) => void;
}

const DisplayCategory: React.FC<DisplayCategoryProps> = ({ onSelectCategory }) => {
  const [categories, setCategories] = useState<Category[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // Fetch categories
  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(
          'https://easygrocery-server.onrender.com/api/category/categories/'
        );
        setCategories(response.data.results);
      } catch (err) {
        setError(err instanceof Error ? err.message : 'Unknown error');
      } finally {
        setLoading(false);
      }
    };

    fetchCategories();
  }, []);

  if (loading) {
    return <div className="text-center text-gray-600">Loading categories...</div>;
  }

  if (error) {
    return <div className="text-center text-red-500">Error: {error}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-4 p-4">
      {Array.isArray(categories) && categories.length > 0 ? (
        categories.map((category) => (
          <div
            key={category.id}
            onClick={() => onSelectCategory(category.id)}
            className="px-4 py-2 bg-gray-100 text-gray-800 rounded-lg shadow-md text-center cursor-pointer hover:bg-gray-200 transition"
          >
            {category.name}
          </div>
        ))
      ) : (
        <div className="text-center text-gray-600">No categories available.</div>
      )}
    </div>
  );
};

export default DisplayCategory;
