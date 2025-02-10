'use client';

import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserId } from '@/lib/api/user/getUserId';
import { Product } from '@/constants/types';
import { checkout } from '@/lib/api/user/handleCheckout';
import { toast } from 'react-toastify';

interface CartItemResponse {
  results: any[];
}

export const useCartItem = () => {
  const [cart, setCart] = useState<any[]>([]);
  const [productData, setProductData] = useState<{ [key: number]: Product }>({});
  const [error, setError] = useState<string>('');
  const [isLoading, setIsLoading] = useState<boolean>(true);

  const userId = getUserId();

  useEffect(() => {
    if (!userId) {
      setError('You must be logged in to view this data.');
      setIsLoading(false);
      return;
    }

    const fetchCartItems = async () => {
      try {
        const response = await axios.get<CartItemResponse>(
          `https://easygrocery-server.onrender.com/api/order/cart/?user=${userId}`,
          { headers: { 'Content-Type': 'application/json' } }
        );

        const cartData = response.data.results;
        setCart(cartData);

        const uniqueProductIds = [...new Set(cartData.map((item) => item.product))];
        const productResponses = await Promise.all(
          uniqueProductIds.map((id) =>
            axios.get<Product>(`https://easygrocery-server.onrender.com/api/product/products/${id}`)
          )
        );

        const productMap: { [key: number]: Product } = {};
        productResponses.forEach((response) => {
          const product = response.data;
          productMap[product.id] = product;
        });

        setProductData(productMap);
      } catch (err: any) {
        setError(err.response?.data?.detail || 'An error occurred while fetching cart data.');
      } finally {
        setIsLoading(false);
      }
    };

    fetchCartItems();
  }, [userId]);

  const removeCartItem = async (id: number) => {
    try {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
      await axios.delete(`https://easygrocery-server.onrender.com/api/order/cart/${id}/`);
    } catch (err) {
      console.error('Error removing item from cart:', err);
      toast.error('Failed to remove item from cart.');
    }
  };

  const handleQuantityChange = (id: number, delta: number) => {
    setCart((prevCart) =>
      prevCart.map((item) => {
        if (item.id === id) {
          const newQuantity = Math.max(1, item.quantity + delta);
          return { ...item, quantity: newQuantity };
        }
        return item;
      })
    );
  };

  const totalAmount = () => {
    return cart
      .reduce((acc, item) => {
        const product = productData[item.product];
        return acc + item.quantity * (product ? Number(product.price) : 0);
      }, 0)
      .toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      const total = parseFloat(totalAmount());
      await checkout(total);
      toast.success('Checkout successful!');
    } catch (error) {
      toast.error('Checkout failed. Please try again.');
    }
  };

  return { cart, productData, error, isLoading, removeCartItem, handleQuantityChange, totalAmount, handleCheckout };
};
