'use client';

import { useOrderStore } from '@/app/stores/useOrderStore';
import { useEffect } from 'react';
import { Trash } from 'lucide-react';

const Cart = () => {
  const { cart, fetchCartItems, productData, isLoading, error, removeCartItem, handleQuantityChange, totalAmount, checkout } = useOrderStore();

  useEffect(() => {
    fetchCartItems();
  }, [fetchCartItems]);

  return (
    <div>
      {isLoading ? (
        <p>Loading cart...</p>
      ) : error ? (
        <p className="text-red-500">{error}</p>
      ) : cart.length > 0 ? (
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
              {cart.map((item : any) => {
                const product = productData[item.product];

                return (
                  <tr key={item.id} className="border-b border-gray-200">
                    <td className="px-4 py-4">{product ? product.name : 'Loading...'}</td>
                    <td className="px-4 py-4 flex items-center space-x-2">
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
                    <td className="px-4 py-4">${product ? Number(product.price).toFixed(2) : '0.00'}</td>
                    <td className="px-4 py-4">${product ? (Number(product.price) * item.quantity).toFixed(2) : '0.00'}</td>
                    <td className="px-4 py-4">
                      <button onClick={() => removeCartItem(item.id)} className="text-red-500 hover:text-red-700">
                        <Trash />
                      </button>
                    </td>
                  </tr>
                );
              })}
            </tbody>
          </table>

          <div className="mt-8">
            <p className="text-lg font-medium">
              Your total amount: <span className="font-bold text-blue-600">${totalAmount()}</span>
            </p>

            <div className="mt-12 flex items-center justify-center w-full">
              <button
                onClick={checkout}
                disabled={cart.length === 0}
                className="w-1/2 py-3 text-white bg-primary rounded-lg shadow-lg text-lg font-semibold "
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
