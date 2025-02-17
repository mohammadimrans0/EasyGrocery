import { create } from 'zustand';
import axios from 'axios';
import { permanentRedirect } from 'next/navigation';
import { toast } from 'react-toastify';
import { useUserStore } from '@/app/stores/useUserStore';
import { Product } from '@/constants/types';

const BASE_URL = 'https://easygrocery-server.vercel.app/api';

interface Purchase {
  id: number;
  user: number;
  product: number;
  purchased_at: string;
}

interface OrderStore {
  purchasedList: Purchase[];
  cart: any[];
  productData: { [key: number]: Product };
  isLoading: boolean;
  error: string;

  addToCart: (product: Product) => Promise<void>;
  fetchCartItems: () => Promise<void>;
  removeCartItem: (id: number) => Promise<void>;
  handleQuantityChange: (id: number, delta: number) => void;
  totalAmount: () => string;
  checkout: () => Promise<void>;
  fetchPurchasedList: () => Promise<void>;
}

export const useOrderStore = create<OrderStore>((set, get) => ({
  purchasedList: [],
  cart: [],
  productData: {},
  isLoading: false,
  error: '',

  // Handle add to cart action
  addToCart: async (product: Product) => {
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
        `${BASE_URL}/order/cart/`,
        { user: userId, product: product.id },
        { headers: { 'Content-Type': 'application/json' } }
      );

      if (response.status === 201) {
        toast.success(`${product.name} has been added to your cart!`);
      }
    } catch (error) {
      console.error("Failed to add product to cart:", error);
      toast.error("Failed to add product to cart.");
    }
  },

  // Fetch cart items
  fetchCartItems: async () => {
    try {
      set({ isLoading: true });

      const { userId } = useUserStore.getState();
      if (!userId) throw new Error('User ID not found');

      const response = await axios.get(
        `${BASE_URL}/order/cart/?user=${userId}`,
        { headers: { 'Content-Type': 'application/json' } }
      );

      const cartData = response.data.results;
      set({ cart: cartData });

      const uniqueProductIds = [...new Set(cartData.map((item: any) => item.product))];
      const productResponses = await Promise.all(
        uniqueProductIds.map((id) =>
          axios.get<Product>(`${BASE_URL}/product/products/${id}`)
        )
      );

      const productMap: { [key: number]: Product } = {};
      productResponses.forEach((response) => {
        const product = response.data;
        productMap[product.id] = product;
      });

      set({ productData: productMap });
    } catch (err: any) {
      set({ error: err.response?.data?.detail || 'Error fetching cart data' });
    } finally {
      set({ isLoading: false });
    }
  },

  // Remove item from cart
  removeCartItem: async (id: number) => {
    try {
      set((state) => ({ cart: state.cart.filter((item) => item.id !== id) }));
      await axios.delete(`${BASE_URL}/order/cart/${id}/`);
    } catch (err) {
      console.error('Error removing item from cart:', err);
      toast.error('Failed to remove item from cart.');
    }
  },

  // Change item quantity in cart
  handleQuantityChange: (id: number, delta: number) => {
    set((state) => ({
      cart: state.cart.map((item) =>
        item.id === id ? { ...item, quantity: Math.max(1, item.quantity + delta) } : item
      ),
    }));
  },

  // Calculate total cart amount
  totalAmount: () => {
    const { cart, productData } = get();
    return cart
      .reduce((acc, item) => {
        const product = productData[item.product];
        return acc + item.quantity * (product ? Number(product.price) : 0);
      }, 0)
      .toFixed(2);
  },

  // Handle checkout
  checkout: async () => {
    try {
      const {userId, authToken} = useUserStore.getState();

      console.log(userId)
      console.log(authToken)
  
      if (!userId) throw new Error('User Id not found');
      if (!authToken) throw new Error('Auth token not found');
  
      const total = parseFloat(get().totalAmount());
  
      const response = await axios.post(
        `${BASE_URL}/order/checkout/`,
        { user: userId, total_amount: total },
        {
          headers: {
            'Authorization': `Bearer ${authToken}`,
            'Content-Type': 'application/json',
          },
        }
      );

      setTimeout(() => permanentRedirect(response.data.payment_url), 2000);
  
      toast.success('Checkout successful! Redirecting...');
  
      return response.data;
    } catch (error: any) {
      toast.error(
        error.response?.data?.detail || 'Error during checkout. Please try again.'
      );
      throw error;
    }
  },
  

  // Fetch purchased list
  fetchPurchasedList: async () => {
    try {
      set({ isLoading: true });

      const { userId } = useUserStore.getState();
      if (!userId) throw new Error('User ID not found');

      const response = await axios.get(
        `${BASE_URL}/order/purchase-history/?user=${userId}`
      );

      const purchases = response.data.results;
      set({ purchasedList: purchases });

      const uniqueProductIds = [...new Set(purchases.map((item : any) => item.product))];
      const productResponses = await Promise.all(
        uniqueProductIds.map((id) =>
          axios.get(`${BASE_URL}/product/products/${id}`)
        )
      );

      const productMap: { [key: number]: Product } = {};
      productResponses.forEach((response) => {
        const product = response.data;
        productMap[product.id] = product;
      });

      set({ productData: productMap });
    } catch (error) {
      console.error('Error fetching purchase history:', error);
    } finally {
      set({ isLoading: false });
    }
  },

}));
