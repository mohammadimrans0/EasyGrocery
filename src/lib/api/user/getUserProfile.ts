import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserProfile } from '@/constants/types';
import { getUserId } from '@/lib/api/user/getUserId';


export const useUserProfile = () => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [isUpdating, setIsUpdating] = useState<boolean>(false);
  const userId = getUserId();

  useEffect(() => {
    if (!userId) {
      setError('You must be logged in to view this data.');
      setIsLoading(false);
      console.log("userid", userId)
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get<UserProfile>(
          `https://easygrocery-server.onrender.com/api/user/profiles/${userId}`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        
        if(response){
          setProfileData(response.data);
        }
        
      } catch (err: any) {
        setError(err.response?.data?.detail || 'An error occurred while fetching profile data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  // Update profile data function
  const updateProfile = async (updatedProfile: UserProfile) => {
    setIsUpdating(true);
    try {
      const response = await axios.put(
        `https://easygrocery-server.onrender.com/api/user/profiles/${userId}/`,
        updatedProfile,
        { headers: { 'Content-Type': 'application/json' } }
      );
      setProfileData(response.data); // Update state with the new profile data
    } catch (err: any) {
      setError(err.response?.data?.detail || 'An error occurred while updating profile data.');
    } finally {
      setIsUpdating(false);
    }
  };

  return { profileData, error, isLoading, isUpdating, updateProfile };
};
