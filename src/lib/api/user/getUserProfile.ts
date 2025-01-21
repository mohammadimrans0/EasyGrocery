import { useEffect, useState } from 'react';
import axios from 'axios';
import { UserProfile } from '@/constants/types';
import { getUserId } from '@/lib/api/user/getUserId';

// Define the API response structure
interface UserProfileResponse {
    results: UserProfile[];
  }

export const getUserProfile = () => {
  const [profileData, setProfileData] = useState<UserProfile | null>(null);
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const userId = getUserId();

  useEffect(() => {
    if (!userId) {
      setError('You must be logged in to view this data.');
      setIsLoading(false);
      return;
    }

    const fetchProfile = async () => {
      try {
        const response = await axios.get<UserProfileResponse>(
          `https://easygrocery-server.onrender.com/api/user_profile/profile/?user=${userId}`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        setProfileData(response.data.results[0]);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'An error occurred while fetching profile data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchProfile();
  }, [userId]);

  return { profileData, error, isLoading };
};
