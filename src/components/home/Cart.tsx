'use client';
import { useState } from 'react';
import axios from 'axios';
import { FaTrash } from 'react-icons/fa';

const Cart = ({ cart }: { cart: any[] | undefined }) => {
  const [cartState, setCartState] = useState(cart || []); // Rename state if necessary

  const handleRemoveFromCart = (id: number): void => {
    const removedItem = cartState.find((item) => item.id === id);
    setCartState((prevCart) => prevCart.filter((item) => item.id !== id));

    axios
      .delete(`https://easygrocery-server.onrender.com/api/user_profile/cart/${id}/`)
      .then(() => {
        console.log('Item successfully removed from cart');
      })
      .catch((err) => {
        console.error('Error removing item from cart:', err);
        if (removedItem) {
          setCartState((prevCart) => [...prevCart, removedItem]);
        }
      });
  };

  return (
    <div>
      {cartState && cartState.length > 0 ? (
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
              {cartState.map((item) => (
                <tr key={item.id} className="border-b border-gray-200">
                  <td className="px-4 py-2">{item.product_name}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">$ {Number(item.product_price).toFixed(2)}</td>
                  <td className="px-4 py-2">$ {(Number(item.product_price) * item.quantity).toFixed(2)}</td>
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
