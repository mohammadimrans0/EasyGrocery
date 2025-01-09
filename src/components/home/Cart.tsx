'use client';
import { FaTrash } from 'react-icons/fa';

const Cart = ({ cart }: { cart: any[] }) => {
  return (
    <div>
      {cart.length > 0 ? (
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
                  <td className="px-4 py-2">{item.product.name}</td>
                  <td className="px-4 py-2">{item.quantity}</td>
                  <td className="px-4 py-2">${item.product.price}</td>
                  <td className="px-4 py-2">${(item.product.price * item.product.quantity).toFixed(2)}</td>
                  <td className="px-4 py-2">
                    <button
                      onClick={() => console.log('Remove from cart')}
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
