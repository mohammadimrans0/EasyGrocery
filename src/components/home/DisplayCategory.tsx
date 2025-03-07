'use client';

import { useEffect } from 'react';
import { useProductStore } from '@/app/stores/useProductStore';

interface DisplayCategoryProps {
  onSelectCategory: (categoryId: number | null) => void;
}

const DisplayCategory: React.FC<DisplayCategoryProps> = ({ onSelectCategory }) => {
  const { categories, fetchCategories, isLoading, message } = useProductStore();

  useEffect(() => {
    fetchCategories();
  }, [fetchCategories]);

  if (isLoading) {
    return (
      <div className="flex flex-wrap justify-center gap-6 p-4">
        {[...Array(4)].map((_, index) => (
          <div
            key={index}
            className="w-24 h-8 bg-gray-300 animate-pulse rounded-lg"
          ></div>
        ))}
      </div>
    );
  }

  if (message) {
    return <div className="text-center text-red-500">{message}</div>;
  }

  return (
    <div className="flex flex-wrap justify-center gap-6 p-4">
      {categories.length > 0 ? (
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
