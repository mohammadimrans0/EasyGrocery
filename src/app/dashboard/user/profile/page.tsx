'use client';

import Image from 'next/image';
import { useEffect, useState } from 'react';
import { UserProfile } from '@/constants/types';
import { useUserStore } from '@/app/stores/useUserStore';

export default function Profile() {
  const { profile, fetchProfile, updateProfile } = useUserStore();

  // State to track the editing mode and updated profile data
  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] = useState<Partial<UserProfile> | null>(null);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setUpdatedProfile(profile);
    }
  }, [profile]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev!,
      [name]: value,
    }));
  };

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

  const handleSave = async () => {
    if (updatedProfile) {
      await updateProfile(updatedProfile);
      setIsEditing(false);
    }
  };

  const toggleEditMode = () => {
    setIsEditing(!isEditing);
  };

  if (!profile) return <div>Loading profile...</div>;

  return (
    <div className="px-8 py-12 md:h-screen mt-16">
      <div className="w-full bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between">
          <h1 className="text-2xl font-bold text-gray-700">Profile Information</h1>
          <button
            onClick={toggleEditMode}
            className="px-4 py-2 bg-[#77c91c] text-white font-semibold rounded"
          >
            {isEditing ? 'Cancel' : 'Edit Profile'}
          </button>
        </div>

        <div className="flex justify-center mt-4">
          <div className="relative">
            <Image
              src={updatedProfile?.image || profile.image || '/images/avatar.png'}
              alt="Profile"
              width={96}
              height={96}
              className="rounded-full border-2 border-gray-300"
              priority
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
        {(['name', 'email', 'contact_info', 'shopping_preferences'] as const).map((field) => (
  <div key={field} className="flex justify-between mb-4">
    <p className="font-semibold text-gray-600 capitalize">{field.replace('_', ' ')}:</p>
    {isEditing ? (
      <input
        type="text"
        name={field}
        value={
          field === 'email'
            ? updatedProfile?.user?.email ?? ''
            : updatedProfile?.[field] ?? ''
        }
        onChange={handleChange}
        className="border border-gray-300 rounded p-2"
      />
    ) : (
      <p>
        {field === 'email'
          ? profile?.user?.email ?? 'N/A'
          : profile?.[field] ?? 'N/A'}
      </p>
    )}
  </div>
))}



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
