import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserId } from './getUserId';
import { WishlistItem, Product } from '@/constants/types';

interface UserWishlistResponse {
  results: WishlistItem[];
}

export const useUserWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [productData, setProductData] = useState<{ [key: number]: Product }>({});
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const userId = getUserId();

  useEffect(() => {
    if (!userId) {
      setError('You must be logged in to view this data.');
      setIsLoading(false);
      return;
    }

    const fetchWishlist = async () => {
      try {
        // Fetch the wishlist items
        const response = await axios.get<UserWishlistResponse>(
          `https://easygrocery-server.onrender.com/api/user/wishlist/?user=${userId}`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        const wishlistItems = response.data.results;
        setWishlist(wishlistItems);

        // Fetch product details for unique product IDs
        const uniqueProductIds = [...new Set(wishlistItems.map((item) => item.product))];
        const productResponses = await Promise.all(
          uniqueProductIds.map((id) =>
            axios.get<Product>(`https://easygrocery-server.onrender.com/api/product/products/${id}`)
          )
        );

        // Map product details
        const productMap: { [key: number]: Product } = {};
        productResponses.forEach((response) => {
          const product = response.data;
          productMap[product.id] = product;
        });

        setProductData(productMap);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'An error occurred while fetching wishlist data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchWishlist();
  }, [userId]);

  const removeWishlistItem = async (id: number) => {
    try {
      setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));
      await axios.delete(`https://easygrocery-server.onrender.com/api/user/wishlist/${id}/`);
    } catch (err) {
      console.error('Error removing item from wishlist:', err);
      alert('Failed to remove item from wishlist.');
    }
  };

  return { wishlist, productData, error, isLoading, removeWishlistItem };
};
