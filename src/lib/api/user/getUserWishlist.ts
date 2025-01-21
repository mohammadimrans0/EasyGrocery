import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserId } from './getUserId';
import { WishlistItem } from '@/constants/types';

interface UserWishlistResponse {
    results: WishlistItem[];
  }

export const getUserWishlist = () => {
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
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
        const response = await axios.get<UserWishlistResponse>(
          `https://easygrocery-server.onrender.com/api/user_profile/wishlist/?user=${userId}`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        setWishlist(response.data.results);
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
      await axios.delete(`https://easygrocery-server.onrender.com/api/user_profile/wishlist/${id}/`);
    } catch (err) {
      console.error('Error removing item from wishlist:', err);
      alert('Failed to remove item from wishlist.');
    }
  };

  return { wishlist, error, isLoading, removeWishlistItem };
};
