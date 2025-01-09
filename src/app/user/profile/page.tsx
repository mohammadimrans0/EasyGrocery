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

interface WishlistItem {
  id: number;
  name: string;
}

export default function Profile() {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [wishlist, setWishlist] = useState<WishlistItem[]>([]);

  // Fetch profile on component mount
  useEffect(() => {
    const fetchProfile = async () => {
      const userId = localStorage.getItem('user_id');

      if (!userId) {
        setError('User not logged in.');
        setIsLoading(false);
        return;
      }

      try {
        const response = await axios.get<UserProfile>(
          `https://easygrocery-server.onrender.com/api/user_profile/profile/user/${userId}/`,
          {
            headers: {
              'Content-Type': 'application/json',
            },
          }
        );

        if (response.status === 200 && response.data) {
          setProfileData(response.data);
        } else {
          setError('Profile not found.');
        }
      } catch (err: any) {
        setError(
          err.response?.data?.detail || 'An error occurred while fetching the profile.'
        );
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, []);  

  // Load wishlist from localStorage
  useEffect(() => {
    const storedWishlist = localStorage.getItem('wishlist');
    if (storedWishlist) {
      try {
        setWishlist(JSON.parse(storedWishlist));
      } catch (err) {
        console.error('Error parsing wishlist:', err);
      }
    }
  }, []);

  // Handle wishlist item removal
  const handleRemoveFromWishlist = (productId: number) => {
    const updatedWishlist = wishlist.filter((item) => item.id !== productId);
    setWishlist(updatedWishlist);

    // Update localStorage after removal
    localStorage.setItem('wishlist', JSON.stringify(updatedWishlist));
  };

  // Loading and error states
  if (isLoading) {
    return <div>Loading profile...</div>;
  }

  if (error) {
    return <div className="text-red-500 font-medium">{error}</div>;
  }

  if (!profileData) {
    return <div>No profile data available</div>;
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
                  className="flex items-center justify-between border p-4 rounded-md w-1/4 bg-white"
                >
                  <span className="font-medium">{item.name}</span>
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
