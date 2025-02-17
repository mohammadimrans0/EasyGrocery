import { create } from 'zustand';
import axios from 'axios';
import { permanentRedirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { UserProfile, WishlistItem, Product } from '@/constants/types';

const baseURL = 'https://easygrocery-server.vercel.app/api'; // Base URL for all API calls

interface User {
  id: number;
  username: string;
  email: string;
}

type UserStore = {
  userId: string | null;
  authToken: string | null;
  user: User | null;
  profile: UserProfile | null;
  wishlist: WishlistItem[];
  productData: { [key: number]: Product };
  error: string;
  isLoading: boolean;
  signup: (data: { username: string; email: string; password: string; confirm_password: string }) => Promise<void>;
  login: (data: { username: string; password: string }) => Promise<void>;
  logout: () => Promise<void>;
  fetchUser: () => Promise<void>;
  fetchProfile: () => Promise<void>;
  updateProfile: (data: Partial<UserProfile>) => Promise<void>;
  addToWishlist: (product: Product) => Promise<void>;
  fetchWishlist: () => Promise<void>;
  removeWishlistItem: (id: number) => Promise<void>;
};

export const useUserStore = create<UserStore>((set, get) => ({
  userId: typeof window !== 'undefined' ? localStorage.getItem('easygrocery_user_id') || null : null,
  authToken: typeof window !== 'undefined' ? localStorage.getItem('easygrocery_auth_token') || null : null,
  user: null,
  profile: null,
  wishlist: [],
  productData: {},
  error: '',
  isLoading: false,

  signup: async (data) => {
    try {
      await axios.post(`${baseURL}/user/signup/`, data);
      toast.success('Account created successfully! Redirecting to login.');
      setTimeout(() => permanentRedirect('/auth/login'), 2000);
    } catch (error: any) {
      console.error('Signup error:', error.response?.data || error.message);
      toast.error(error.response?.data?.detail || 'Signup failed. Please try again.');
    }
  },

  login: async (data) => {
    try {
      const response = await axios.post(`${baseURL}/user/login/`, data);
      const userId = response.data?.user_id;
      const token = response.data?.token;
      if (userId) {
        localStorage.setItem('easygrocery_user_id', userId);
        localStorage.setItem('easygrocery_auth_token', token);
        toast.success('Login successful! Redirecting...');
        setTimeout(() => permanentRedirect('/'), 2000);
        set({ userId });
        get().fetchWishlist(); // Fetch wishlist after login
      } else {
        throw new Error('User ID not found in the response.');
      }
    } catch (error: any) {
      toast.error('Login error:', error.response?.data || error.message);
    }
  },

  logout: async () => {
    try {
      await axios.post(`${baseURL}/user/logout/`);
      localStorage.removeItem('easygrocery_user_id');
      localStorage.removeItem('easygrocery_auth_token');
      set({ userId: null, profile: null, wishlist: [], productData: {} });
      toast.success('Logged out successfully.');
      setTimeout(() => permanentRedirect('/auth/login'), 2000);
    } catch (error: any) {
      console.error('Logout error:', error.response?.data || error.message);
      toast.error(error.response?.data?.detail || `Logout failed. Status: ${error.response?.status}`);
    }
  },

  fetchUser: async () => {
    const userId = get().userId;
    if (!userId) return;

    try {
      const response = await axios.get(`${baseURL}/user/users/${userId}`);
      set({ user: response.data });
    } catch (error: any) {
      console.error('Error fetching profile:', error.response?.data || error.message);
    }
  },

  fetchProfile: async () => {
    const userId = get().userId;
    if (!userId){
      console.error('User not found')
      return;
    } 

    try {
      const response = await axios.get(`${baseURL}/user/profiles/?user=${userId}`);
      set({ profile: response.data.results[0] });
    } catch (error: any) {
      console.error('Error fetching profile:', error.response?.data || error.message);
    }
  },

  updateProfile: async (data) => {
    const userId = get().userId;
    if (!userId) return;

    try {
      const response = await axios.put(`${baseURL}/user/profiles/${userId}/`, data);
      set({ profile: response.data });
      toast.success('Profile updated successfully.');
    } catch (error: any) {
      console.error('Error updating profile:', error.response?.data || error.message);
      toast.error(error.response?.data?.detail || 'Failed to update profile.');
    }
  },

  addToWishlist: async (product: Product) => {
    const { userId } = useUserStore.getState();
    if (!userId) {
      toast.error("User not logged in.");
      return;
    }

    if (!product.id) {
      toast.error("Product ID is missing.");
      return;
    }

    try {
      const response = await axios.post(
        `${baseURL}/user/wishlist/`,
        { user: userId, product: product.id },
        { headers: { 'Content-Type': 'application/json' } }
      );
      if (response.status === 201) {
        toast.success(`${product.name} has been added to your wishlist!`);
      }
    } catch (error) {
      console.error("Failed to add product to wishlist:", error);
      toast.error("Failed to add product to wishlist.");
    }
  },

  fetchWishlist: async () => {
    const userId = get().userId;
    if (!userId) {
      set({ error: 'You must be logged in to view this data.', isLoading: false });
      return;
    }

    set({ isLoading: true });

    try {
      const response = await axios.get<{ results: WishlistItem[] }>(
        `${baseURL}/user/wishlist/?user=${userId}`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const wishlistItems = response.data.results;
      set({ wishlist: wishlistItems });

      // Fetch product details for unique product IDs
      const uniqueProductIds = [...new Set(wishlistItems.map((item) => item.product))];
      const productResponses = await Promise.all(
        uniqueProductIds.map((id) =>
          axios.get<Product>(`${baseURL}/product/products/${id}`)
        )
      );

      const productMap: { [key: number]: Product } = {};
      productResponses.forEach((response) => {
        const product = response.data;
        productMap[product.id] = product;
      });

      set({ productData: productMap, error: '', isLoading: false });
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'An error occurred while fetching wishlist data.', isLoading: false });
    }
  },

  removeWishlistItem: async (id: number) => {
    try {
      set((state) => ({ wishlist: state.wishlist.filter((item) => item.id !== id) }));
      await axios.delete(`${baseURL}/user/wishlist/${id}/`);
    } catch (err) {
      console.error('Error removing item from wishlist:', err);
      alert('Failed to remove item from wishlist.');
    }
  },
}));


/***
 * 
 * {
"username": "rahims0",
"password": "rahi1234"
}
 */
