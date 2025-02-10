import Link from 'next/link';
import React from 'react';

const PaymentFail = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-red-50">
      <div className="bg-red-100 p-8 rounded-lg shadow-lg w-96 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-red-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
        </svg>
        <h2 className="text-2xl font-semibold text-red-700">Payment Failed</h2>
        <p className="mt-2 text-red-600">Something went wrong during the payment process. Please try again later.</p>
        <Link href="/">
        <button className="mt-6 px-6 py-2 bg-red-600 text-white rounded-lg hover:bg-red-500 focus:outline-none focus:ring-2 focus:ring-red-500">Retry Payment</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentFail;
