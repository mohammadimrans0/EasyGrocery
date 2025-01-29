'use client';

import Image from 'next/image';
import { useState } from 'react';
import { useUserProfile } from '@/lib/api/user/getUserProfile';
import { UserProfile } from '@/constants/types';

export default function Profile() {
  const { profileData, error, isLoading, updateProfile } = useUserProfile();
  
  // State to track the editing mode and the updated profile data
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<UserProfile | null>(null);

  // Handle field changes
  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };
  
  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setUpdatedProfile((prev) => ({
          ...prev!,
          image: reader.result as string,
        }));
      };
      reader.readAsDataURL(file);
    }
  };

  // Handle save action
  const handleSave = () => {
    if (updatedProfile) {
      updateProfile(updatedProfile);
      setIsEditing(false); // Exit editing mode
    }
  };

  // Toggle editing mode
  const toggleEditMode = () => {
    setIsEditing(!isEditing);
    setUpdatedProfile(profileData);
  };

  if (isLoading) return <div>Loading profile...</div>;
  if (error) return <div className="text-red-500">{error}</div>;
  if (!profileData) return <div>No profile data available</div>;

  return (
    <div className="px-8 py-12 min-h-screen">
      <div className="w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-700">Profile Information</h1>
          <div className="">
            <button
              onClick={toggleEditMode}
              className="px-4 py-2 bg-slate-500 text-white font-semibold rounded"
            >
              {isEditing ? 'Cancel' : 'Edit Profile'}
            </button>
          </div>
        </div>

        <div className="flex justify-center mt-4">
          <div className="relative">
            <Image
              src={updatedProfile?.image || profileData.image || 'https://easygrocery-server.onrender.com/media/user_profile/upload/images/avatar.jpg'}
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full border-2 border-gray-300"
              priority={true}
            />
            {isEditing && (
              <input
                type="file"
                onChange={handleImageChange}
                className="absolute bottom-0 right-0 bg-gray-800 opacity-50 text-white p-1 rounded-full"
              />
            )}
          </div>
        </div>

        <div className="mt-6">
          <div className="flex justify-between mb-4">
            <p className="font-semibold text-gray-600">Name:</p>
            {isEditing ? (
              <input
                type="text"
                name="name"
                value={updatedProfile?.user?.first_name || ''} 
                onChange={handleChange}
                className="border border-gray-300 rounded p-2"
              />
            ) : (
              <p>{profileData?.user?.first_name} {profileData?.user?.last_name}</p>
            )}
          </div>

          <div className="flex justify-between mb-4">
            <p className="font-semibold text-gray-600">Email:</p>
            {isEditing ? (
              <input
                type="email"
                name="email"
                value={updatedProfile?.user?.email || ''}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2"
              />
            ) : (
              <p>{profileData?.user?.email}</p>
            )}
          </div>

          <div className="flex justify-between mb-4">
            <p className="font-semibold text-gray-600">Balance:</p>
            {isEditing ? (
              <input
                type="number"
                name="balance"
                value={updatedProfile?.balance || ''}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2"
              />
            ) : (
              <p>{profileData?.balance}</p>
            )}
          </div>

          <div className="flex justify-between mb-4">
            <p className="font-semibold text-gray-600">Contact Info:</p>
            {isEditing ? (
              <textarea
                name="contact_info"
                value={updatedProfile?.contact_info || ''}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2"
              />
            ) : (
              <p>{profileData?.contact_info}</p>
            )}
          </div>

          <div className="flex justify-between mb-4">
            <p className="font-semibold text-gray-600">Shopping Preferences:</p>
            {isEditing ? (
              <textarea
                name="shopping_preferences"
                value={updatedProfile?.shopping_preferences || ''}
                onChange={handleChange}
                className="border border-gray-300 rounded p-2"
              />
            ) : (
              <p>{profileData?.shopping_preferences}</p>
            )}
          </div>

          {isEditing && (
            <div className="flex justify-end mt-4">
              <button
                onClick={handleSave}
                className="px-6 py-2 bg-green-500 text-white font-semibold rounded"
              >
                Save Changes
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
