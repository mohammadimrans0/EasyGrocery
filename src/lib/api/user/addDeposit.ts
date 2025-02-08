import axios from 'axios';
import { getUserId } from '@/lib/api/user/getUserId';

export const addDeposit = async (amount: number) => {
  try {
    const userId = getUserId();
    if (!userId) {
      throw new Error('User ID not found');
    }

    const response = await axios.post('https://easygrocery-server.onrender.com/api/user/deposit/', {
      user: userId,
      amount,
    });

    return response.data;
  } catch (error) {
    console.error('Error adding deposit:', error);
    throw error;
  }
};
