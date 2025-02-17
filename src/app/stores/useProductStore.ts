import { create } from 'zustand';
import axios from 'axios';
import { Category, Product } from '@/constants/types';

const BASE_URL = 'https://easygrocery-server.vercel.app/api';

interface ProductStore {
  categories: Category[];
  products: Product[];
  message: string;
  isLoading: boolean;
  fetchCategories: () => void;
  createProduct: (formData: any) => Promise<void>;
  fetchProducts: () => Promise<void>;
  fetchProductById: (productId: string) => Promise<Product | null>;
}

export const useProductStore = create<ProductStore>((set) => ({
  categories: [],
  products: [],
  message: '',
  isLoading: false,

  fetchCategories: async () => {
    set({ isLoading: true, message: '' });
    try {
      const response = await axios.get(`${BASE_URL}/category/categories/`);
      set({ categories: response.data.results });
    } catch (error) {
      console.error('Error fetching categories:', error);
      set({ message: 'Failed to load categories. Please try again.' });
    } finally {
      set({ isLoading: false });
    }
  },

  createProduct: async (formData) => {
    set({ isLoading: true, message: '' });
    const data = new FormData();
    Object.entries(formData).forEach(([key, value]) => {
      if (value !== null) data.append(key, value instanceof File ? value : String(value));
    });

    try {
      const response = await axios.post(`${BASE_URL}/product/products/`, data, {
        headers: { 'Content-Type': 'multipart/form-data' },
      });

      if (response.status === 201) {
        set({ message: 'Product created successfully!' });
      } else {
        set({ message: 'Failed to create product. Please try again.' });
      }
    } catch (error) {
      console.error('Error creating product:', error);
      set({ message: 'An error occurred. Please try again later.' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProducts: async () => {
    set({ isLoading: true });
    try {
      const response = await axios.get(`${BASE_URL}/product/products/`);
      set({ products: response.data.results });
    } catch (error) {
      console.error('Failed to fetch products:', error);
      set({ message: 'Failed to load products. Please try again.' });
    } finally {
      set({ isLoading: false });
    }
  },

  fetchProductById: async (productId: string) => {
    set({ isLoading: true, message: '' });
    try {
      const response = await axios.get(`${BASE_URL}/product/products/${productId}/`);
      return response.data;
    } catch (error) {
      console.error('Failed to fetch product:', error);
      set({ message: 'Failed to load product details. Please try again.' });
      return null;
    } finally {
      set({ isLoading: false });
    }
  },
}));
