// import { CartItem } from '@/constants/types';
// import React, { useState } from 'react';
// import { FaTrash } from 'react-icons/fa';

// // Define the interface for the props
// interface CartProps {
//   cart: CartItem[];
//   removeFromCart: (id: number) => void;
//   updateQuantity: (id: number, change: number) => void;
// }

// const Cart: React.FC<CartProps> = ({ cart, removeFromCart, updateQuantity }) => {
//   return (
//     <div>
//       {cart.length > 0 ? (
//         <div className="mt-5">
//           <table className="min-w-full bg-white border border-gray-300 rounded-lg">
//             <thead>
//               <tr>
//                 <th className="px-4 py-2 text-left">Product</th>
//                 <th className="px-4 py-2 text-left">Quantity</th>
//                 <th className="px-4 py-2 text-left">Unit Price</th>
//                 <th className="px-4 py-2 text-left">Total Price</th>
//                 <th className="px-4 py-2 text-left">Actions</th>
//               </tr>
//             </thead>
//             <tbody>
//               {cart.map((item) => (
//                 <tr key={item.id} className="border-b border-gray-200">
//                   <td className="px-4 py-2">{item.name}</td>
//                   <td className="px-4 py-2 flex items-center gap-2">
//                     <button
//                       onClick={() => updateQuantity(item.id, -1)}
//                       className="text-gray-600 hover:text-gray-800"
//                     >
//                       -
//                     </button>
//                     {item.stock}
//                     <button
//                       onClick={() => updateQuantity(item.id, 1)}
//                       className="text-gray-600 hover:text-gray-800"
//                     >
//                       +
//                     </button>
//                   </td>
//                   <td className="px-4 py-2">${item.price.toFixed(2)}</td>
//                   <td className="px-4 py-2">${(item.price * item.stock).toFixed(2)}</td>
//                   <td className="px-4 py-2">
//                     <button
//                       onClick={() => removeFromCart(item.id)}
//                       className="text-red-500 hover:text-red-700"
//                     >
//                       <FaTrash />
//                     </button>
//                   </td>
//                 </tr>
//               ))}
//             </tbody>
//           </table>
//         </div>
//       ) : (
//         <div className="mt-5">
//           <p>Your cart is empty.</p>
//         </div>
//       )}
//     </div>
//   );
// };

// const CartContainer = () => {
//   const [cart, setCart] = useState<CartItem[]>([
//     { id: 1, name: 'Apple', price: 1.5, stock: 2 },
//     { id: 2, name: 'Banana', price: 1.0, stock: 3 },
//     { id: 3, name: 'Orange', price: 1.2, stock: 5 },
//   ]);

//   const removeFromCart = (id: number) => {
//     setCart(cart.filter(item => item.id !== id));
//   };

//   const updateQuantity = (id: number, change: number) => {
//     setCart(cart.map(item =>
//       item.id === id
//         ? { ...item, stock: Math.max(0, item.stock + change) }
//         : item
//     ));
//   };

//   return (
//     <Cart cart={cart} removeFromCart={removeFromCart} updateQuantity={updateQuantity} />
//   );
// };

// export default CartContainer;
