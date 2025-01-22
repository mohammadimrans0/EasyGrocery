import axios from 'axios';
import { getUserId } from '@/lib/api/user/getUserId';
import { toast } from 'react-toastify';
import { useRouter } from 'next/router';
import 'react-toastify/dist/ReactToastify.css';

export const checkout = async (totalAmount: number) => {
  try {
    const userId = getUserId();
    if (!userId) {
      toast.error('User ID not found');
      throw new Error('User ID not found');
    }

    const response = await axios.post(
      'https://easygrocery-server.onrender.com/api/user_profile/checkout/',
      {
        user: userId,
        total_amount: totalAmount,
      }
    );

    // Show success toast
    toast.success('Checkout successful! Redirecting...');

    // Redirect to purchased list after a short delay
    setTimeout(() => {
      const router = useRouter();
      router.push('/dashboard/user/purchased_list');
    }, 2000);
    console.log(response.data);
    return response.data;
  } catch (error: any) {
    toast.error(
      error.response?.data?.detail || 'Error during checkout. Please try again.'
    );
    console.error('Error during checkout:', error);
    throw error;
  }
};
