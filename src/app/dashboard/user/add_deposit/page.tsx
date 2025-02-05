'use client';

import { addDeposit } from '@/lib/api/user/addDeposit';
import Image from 'next/image';
import React, { useState } from 'react';
import { FaPlus } from 'react-icons/fa';
import { MdAddCircle } from 'react-icons/md';
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
    <div className="flex items-center justify-center py-12">
      <div className="w-full max-w-md bg-white dark:bg-gray-800 rounded-lg shadow-xl overflow-hidden">
        <div className="w-full bg-[#77b91e] p-6">
          <div className="text-3xl font-bold text-white text-center flex items-center justify-center">
            <MdAddCircle className="mr-2" />
            Add Balance
          </div>
        </div>
        <div className="p-6">
          <div className="mb-8 relative">
            <div className="w-full h-56 bg-slate-400 rounded-xl shadow-lg p-6 flex flex-col justify-between">
              <div className="flex justify-between items-start">
                <div>
                  <p className="text-white text-xl font-medium">Card Number</p>
                  <p className="text-gray-800 text-base font-bold tracking-more-wider">4539 1488 0343 6467</p>
                </div>
                <Image
                  src="/images/card-chip.png"
                  alt="Chip"
                  width={48}
                  height={48}
                  className="w-12"
                />
              </div>
              <div className="flex justify-between items-end">
                <div>
                <p className="text-white font-bold">Jane Smith</p>
                  <p className="text-gray-800 font-medium">Card Holder</p>
                </div>
                <div>
                <p className="text-white font-bold">09/26</p>
                  <p className="text-gray-800 font-medium">Expires</p>
                  
                </div>
                <div>
                <p className="text-white font-bold">842</p>
                  <p className="text-gray-800 font-medium">CVC</p>
                  
                </div>
              </div>
            </div>
            <div className="absolute top-20 left-0 right-0">
              <form onSubmit={handleSubmit} className="bg-white dark:bg-gray-700 rounded-xl shadow-lg p-4 mx-4">
                <div className="flex items-center border-b border-gray-300 dark:border-gray-600">
                  <input
                    type="number"
                    id="amount"
                    value={amount}
                    onChange={(e) => setAmount(Number(e.target.value))}
                    placeholder="Enter deposit amount"
                    required
                    className="appearance-none bg-transparent border-none w-full dark:text-white mr-3 py-1 px-2 leading-tight focus:outline-none"
                  />
                  <span className="flex-shrink-0 text-gray-500 dark:text-gray-400 text-sm font-semibold">USD</span>
                </div>
              </form>
            </div>
          </div>
          <div className="mt-12">
            <button
              type="submit"
              disabled={isSubmitting}
              onClick={handleSubmit}
              className={`w-full flex items-center justify-center px-4 py-2 border border-transparent rounded-md shadow-sm text-sm font-medium text-white bg-[#77b91e] transition-all duration-200 ease-in-out transform hover:scale-105 ${
                isSubmitting ? "opacity-70 cursor-not-allowed" : ""
              }`}
            >
              <FaPlus className="mr-2 h-4 w-4" />
              {isSubmitting ? "Processing..." : "Add Deposit"}
            </button>
          </div>
        </div>
        <div className="px-6 py-4 bg-gray-50 dark:bg-gray-700 text-center text-sm text-gray-500 dark:text-gray-400">
          Your funds will be available instantly
        </div>
      </div>

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
