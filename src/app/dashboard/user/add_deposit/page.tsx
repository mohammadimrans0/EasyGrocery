'use client';

import { addDeposit } from '@/lib/api/user/addDeposit';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AddDeposit = () => {
  const [amount, setAmount] = useState<number | ''>(''); // To store the amount entered by the user
  const [isSubmitting, setIsSubmitting] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!amount || amount <= 0) {
      toast.error('Please enter a valid amount.');
      return;
    }

    try {
      setIsSubmitting(true);
      const response = await addDeposit(amount); // Call the deposit function
      toast.success(`Deposit successful! Transaction ID: ${response.id}`);
      setAmount(''); // Clear the input field
    } catch (error) {
      toast.error('Failed to add deposit. Please try again.');
    } finally {
      setIsSubmitting(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-500 to-purple-600 p-4">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="p-6">
          <h2 className="text-2xl font-bold text-center text-gray-800 dark:text-white mb-2">Add Deposit</h2>
          <p className="text-center text-gray-600 dark:text-gray-300 mb-6">Enter the amount you wish to deposit</p>
          <form onSubmit={handleSubmit} className="space-y-4">
            <div className="space-y-2">
              <label htmlFor="amount" className="block text-sm font-medium text-gray-700 dark:text-gray-300">
                Deposit Amount
              </label>
              <input
                type="number"
                id="amount"
                value={amount}
                onChange={(e) => setAmount(Number(e.target.value))}
                placeholder="Enter amount"
                required
                className="w-full px-3 py-2 border border-gray-300 rounded-md shadow-sm focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 dark:bg-gray-700 dark:border-gray-600 dark:text-white"
              />
            </div>
            <button
              type="submit"
              disabled={isSubmitting}
              className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500 transition-all duration-200 ease-in-out transform hover:scale-105 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <FaPlus className="mr-2 h-4 w-4" />
              {isSubmitting ? "Processing..." : "Add Deposit"}
            </button>
          </form>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          Your funds will be available instantly
        </div>
      </div>

      {/* Toast Container for notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
      />
    </div>
  );
};

export default AddDeposit;
