"use client";

import { useEffect, useState } from "react";
import { UserProfile } from "@/constants/types";
import { useUserStore } from "@/app/stores/useUserStore";
import Image from "next/image";

export default function Profile() {
  const { profile, fetchProfile, updateProfile } = useUserStore();

  const [isEditing, setIsEditing] = useState(false);
  const [updatedProfile, setUpdatedProfile] =
    useState<Partial<UserProfile> | null>(null);

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  useEffect(() => {
    if (profile) {
      setUpdatedProfile(profile);
    }
  }, [profile]);

  const handleChange = (
    e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>
  ) => {
    const { name, value } = e.target;
    setUpdatedProfile((prev) => ({
      ...prev!,
      profile: {
        ...prev!.profile!,
        [name]: value,
      },
    }));
  };

  const handleSave = async () => {
    if (updatedProfile) {
      await updateProfile(updatedProfile);
      setIsEditing(false);
    }
  };
  

  if (!profile)
    return <div className="text-center py-12">Loading profile...</div>;

  return (
    <div className="max-w-4xl mx-auto px-6 py-12 md:h-screen mt-16">
      <div className="bg-white p-8 rounded-lg shadow-md">
        <div className="flex justify-between items-center">
          <h1 className="text-2xl font-bold text-gray-700">
            Profile Information
          </h1>
          <button
            onClick={() => setIsEditing(!isEditing)}
            className="px-4 py-2 bg-[#77c91c] text-white font-semibold rounded"
          >
            {isEditing ? "Cancel" : "Edit Profile"}
          </button>
        </div>

        <div className="flex flex-col items-center mt-6">
          <div className="relative w-24 h-24">
            <Image
              src={
                updatedProfile?.profile?.image ||
                profile?.profile?.image ||
                "/images/avatar.png"
              }
              alt="Profile"
              className="rounded-full border-2 border-gray-300 object-cover"
              width={96}
              height={96}
            />
          </div>
        </div>

        <div className="mt-6 space-y-4">
          {(["name", "contact_info", "shopping_preferences"] as const).map(
            (field) => (
              <div key={field} className="flex justify-between">
                <p className="font-semibold text-gray-600 capitalize">
                  {field.replace("_", " ")}:
                </p>
                {isEditing ? (
                  <input
                    type="text"
                    name={field}
                    value={updatedProfile?.profile?.[field] ?? ""}
                    onChange={handleChange}
                    className="border border-gray-300 rounded px-2 py-1 w-64"
                  />
                ) : (
                  <p className="text-gray-700">
                    {profile?.profile?.[field] ?? "N/A"}
                  </p>
                )}
              </div>
            )
          )}

          <div className="flex justify-between">
            <p className="font-semibold text-gray-600">Role:</p>
            {isEditing ? (
              <select
                name="role"
                value={updatedProfile?.profile?.role ?? "buyer"}
                onChange={handleChange}
                className="border border-gray-300 rounded px-2 py-1 w-64"
              >
                <option value="buyer">Buyer</option>
                <option value="seller">Seller</option>
              </select>
            ) : (
              <p className="text-gray-700 capitalize">
                {profile?.profile?.role ?? "buyer"}
              </p>
            )}
          </div>

          <div className="flex justify-between">
            <p className="font-semibold text-gray-600">Email:</p>
            <p className="text-gray-700">{profile?.email ?? "N/A"}</p>
          </div>
        </div>

        {isEditing && (
          <div className="flex justify-end mt-6">
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
  );
}
