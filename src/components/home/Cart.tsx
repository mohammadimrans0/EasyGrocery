'use client';
import { useEffect, useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';
import { getUserId } from '@/lib/api/user/getUserId';
import { CartItem } from '@/constants/types';
import { checkout } from '@/lib/api/user/handleCheckout';
import { toast } from 'react-toastify';

const Cart = () => {
  const [cart, setCart] = useState<CartItem[]>([]);

  const userId = getUserId();

  useEffect(() => {
    if (!userId) {
      console.error('User ID is not available');
      return;
    }

    const fetchCart = async () => {
          try {
            const response = await axios.get(
              `https://easygrocery-server.onrender.com/api/user_profile/cart/?user=${userId}`,
              { headers: { 'Content-Type': 'application/json' } }
            );
            setCart(response.data.results);
          } catch (error) {
            console.error('Error fetching cart:', error);
          }
        };
    
        if (userId) {
          fetchCart();
        }
  }, [userId]);

  const handleRemoveFromCart = (id: number): void => {
    const removedItem = cart.find((item) => item.id === id);
    if (removedItem) {
      setCart((prevCart) => prevCart.filter((item) => item.id !== id));
    }
  
    axios
      .delete(`https://easygrocery-server.onrender.com/api/user_profile/cart/${id}/`)
      .then(() => {
        console.log('Item successfully removed from cart');
      })
      .catch((err) => {
        console.error('Error removing item from cart:', err);

        if (removedItem) {
          setCart((prevCart) => [...prevCart, removedItem]);
        }
      });
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
    return cart.reduce((acc, item) => acc + item.quantity * Number(item.product_price), 0).toFixed(2);
  };

  const handleCheckout = async () => {
    try {
      const total = parseFloat(totalAmount());
      const response = await checkout(total);
      console.log(response);
      toast.success('Checkout successful!', { position: 'top-right' });
      console.log('Checkout response:', response);
    } catch (error) {
      toast.error('Checkout failed. Please try again.', { position: 'top-right' });
      console.error('Error during checkout:', error);
    }
  };

  return (
    <div>
      {cart && cart.length > 0 ? (
        <div className="mt-5">
          <table className="min-w-full bg-white border border-gray-300 rounded-lg overflow-x-auto">
            <thead>
              <tr>
                <th className="px-4 py-2 text-left">Product</th>
                <th className="px-4 py-2 text-left">Quantity</th>
                <th className="px-4 py-2 text-left">Unit Price</th>
                <th className="px-4 py-2 text-left">Total Price</th>
                <th className="px-4 py-2 text-left">Actions</th>
              </tr>
            </thead>
            <tbody>
              {cart.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{item.product_name}</td>
                  <td className="px-4 py-2 flex items-center space-x-2">
                    <button
                      onClick={() => handleQuantityChange(item.id, -1)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                      disabled={item.quantity === 1}
                    >
                      -
                    </button>
                    <span>{item.quantity}</span>
                    <button
                      onClick={() => handleQuantityChange(item.id, 1)}
                      className="px-2 py-1 bg-gray-200 hover:bg-gray-300 rounded"
                    >
                      +
                    </button>
                  </td>
                  <td className="px-4 py-2">$ {Number(item.product_price).toFixed(2)}</td>
                  <td className="px-4 py-2">
                    $ {(Number(item.product_price) * item.quantity).toFixed(2)}
                  </td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => handleRemoveFromCart(item.id)}
                      className="text-red-500 hover:text-red-700"
                    >
                      <FaTrash />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>

          <div className="mt-8">
            <p className="text-lg font-medium">
              Your total amount: <span className="font-bold text-blue-600">${totalAmount()}</span>
            </p>

            <div className="mt-12 flex items-center justify-center w-full">
            <button
                onClick={() => handleCheckout()}
                disabled={cart.length === 0}
                className="w-1/2 py-3 text-white bg-green-500 hover:bg-green-600 focus:ring-4 focus:ring-green-300 rounded-lg shadow-lg text-lg font-semibold transition-all duration-200 ease-in-out"
              >
                Checkout
            </button>
            </div>
          </div>
        </div>
      ) : (
        <div className="mt-5">
          <p>Your cart is empty.</p>
        </div>
      )}
    </div>
  );
};

export default Cart;
