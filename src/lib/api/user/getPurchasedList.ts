import axios from 'axios';
import { getUserId } from '@/lib/api/user/getUserId';

export const getPurchasedList = async () => {
  try {
    const userId = getUserId();
    if (!userId) {
      throw new Error('User ID not found');
    }

    const response = await axios.get(
      `https://easygrocery-server.onrender.com/api/user_profile/purchase-history/?user=${userId}`
    );
    return response.data.results;
  } catch (error) {
    console.error('Error fetching purchased list:', error);
    return [];
  }
};
