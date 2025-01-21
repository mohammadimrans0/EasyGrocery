'use client';

import Image from 'next/image';
import { useUserProfile } from '@/lib/api/user/getUserProfile';

export default function Profile() {
  const { profileData, error, isLoading } = useUserProfile();

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!profileData) return <div>No profile data available</div>;

  return (
    <div className="px-8 py-12 min-h-screen bg-gradient-to-br from-indigo-500 to-purple-600">
      <div className="w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-700">Profile Information</h1>
          <div className="">
            <button
              // onClick={handleResetPassword}
              className="px-4 py-2 bg-green-500 text-white font-semibold rounded hover:bg-blue-600"
            >
              Edit Profile
            </button>
          </div>
        </div>

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
      </div>
    </div>
  );
}
