import Link from 'next/link';
import React from 'react';

const PaymentSuccess = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-green-50">
      <div className="bg-green-100 p-8 rounded-lg shadow-lg w-96 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-green-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M5 13l4 4L19 7" />
        </svg>
        <h2 className="text-2xl font-semibold text-green-700">Payment Successful</h2>
        <p className="mt-2 text-green-600">Your payment was processed successfully. Thank you for your purchase!</p>
        <Link href="/dashboard/user/purchased_list">
        <button className="mt-6 px-6 py-2 bg-green-600 text-white rounded-lg hover:bg-green-500 focus:outline-none focus:ring-2 focus:ring-green-500">Go to Dashboard</button>
        </Link>
      
      </div>
    </div>
  );
};

export default PaymentSuccess;
