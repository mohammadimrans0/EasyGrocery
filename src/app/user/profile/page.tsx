'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import Image from 'next/image';

interface UserProfile {
  user: {
    first_name: string;
    last_name: string;
    email: string;
  };
  balance: string;
  contact_info: string;
  shopping_preferences: string;
  image: string | null;
}

interface Product {
  name: string;
  image: string;
}

interface WishlistItem {
  id: number;
  product: Product;
}

export default function Profile() {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;

  useEffect(() => {
    if (!userId) {
      setError('You must be logged in to view this data.');
      setIsLoading(false);
      return;
    }

    const fetchProfileAndWishlist = async () => {
      setIsLoading(true);

      try {
        const profileResponse = await axios.get<UserProfile>(
          `https://easygrocery-server.onrender.com/api/user_profile/profile/user/${userId}/`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        setProfileData(profileResponse.data);

        const wishlistResponse = await axios.get<WishlistItem[]>(
          `https://easygrocery-server.onrender.com/api/user_profile/wishlist/user/${userId}/`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        setWishlist(wishlistResponse.data);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'An error occurred while fetching data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfileAndWishlist();
  }, [userId]);

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!profileData) return <div>No profile data available</div>;
  if (!wishlist) return <div>No wishlist data available</div>;

  function handleRemoveFromWishlist(id: number): void {
    // Optimistically update the UI by filtering out the item from the wishlist
    setWishlist((prevWishlist) => prevWishlist.filter((item) => item.id !== id));

    // Make a DELETE request to remove the item from the backend
    axios
      .delete(`https://easygrocery-server.onrender.com/api/user_profile/wishlist/${id}/`)
      .then(() => {
        console.log('Item successfully removed from wishlist');
      })
      .catch((err) => {
        console.error('Error removing item from wishlist:', err);
        // Optionally, rollback UI changes if the request fails
        setWishlist((prevWishlist) => [
          ...prevWishlist,
          wishlist.find((item) => item.id === id)!,
        ]);
      });
  }

  return (
    <div className="bg-gray-50 py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full bg-white p-8 rounded-lg shadow-md">
        <h1 className="text-2xl font-bold text-center text-gray-700">Profile Information</h1>

        <div className="flex justify-center mt-4">
          <Image
            src={
              profileData.image ||
              'https://easygrocery-server.onrender.com/media/user_profile/upload/images/avatar.jpg'
            }
            alt="Profile"
            width={96}
            height={96}
            className="rounded-full border-2 border-gray-300"
          />
        </div>

        <div className="mt-6">
          <div className="flex justify-between mb-4">
            <p className="font-semibold text-gray-600">Name:</p>
            <p>{profileData?.user?.first_name} {profileData?.user?.last_name}</p>
          </div>

          <div className="flex justify-between mb-4">
            <p className="font-semibold text-gray-600">Email:</p>
            <p>{profileData?.user?.email}</p>
          </div>

          <div className="flex justify-between mb-4">
            <p className="font-semibold text-gray-600">Balance:</p>
            <p>{profileData?.balance}</p>
          </div>

          <div className="flex justify-between mb-4">
            <p className="font-semibold text-gray-600">Contact Info:</p>
            <p>{profileData?.contact_info}</p>
          </div>

          <div className="flex justify-between mb-4">
            <p className="font-semibold text-gray-600">Shopping Preferences:</p>
            <p>{profileData?.shopping_preferences}</p>
          </div>
        </div>

        <div className="mt-6">
          <h2 className="text-xl font-semibold mb-4">Wishlist</h2>
          {wishlist.length > 0 ? (
            <div className="flex flex-wrap gap-4">
              {wishlist.map((item) => (
                <div
                  key={item.id}
                  className="flex items-center justify-between border p-4 rounded-lg w-1/4 bg-white"
                >
                  <div className="flex items-center">
                    <Image
                      src={item.product.image || '/default-image.jpg'} // Default image if not available
                      alt={item.product.name}
                      width={50}
                      height={50}
                      className="rounded-md"
                    />
                    <span className="ml-4 font-medium">{item.product.name}</span>
                  </div>
                  <button
                    onClick={() => handleRemoveFromWishlist(item.id)}
                    className="text-red-500 font-medium"
                  >
                    Remove
                  </button>
                </div>
              ))}
            </div>
          ) : (
            <p>Your wishlist is empty!</p>
          )}
        </div>
      </div>
    </div>
  );
}
