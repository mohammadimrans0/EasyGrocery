import Link from 'next/link';
import React from 'react';

const PaymentCancel = () => {
  return (
    <div className="flex justify-center items-center min-h-screen bg-yellow-50">
      <div className="bg-yellow-100 p-8 rounded-lg shadow-lg w-96 text-center">
        <svg xmlns="http://www.w3.org/2000/svg" className="w-24 h-24 text-yellow-500 mx-auto mb-4" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 19V6l7 7-7 7" />
        </svg>
        <h2 className="text-2xl font-semibold text-yellow-700">Payment Cancelled</h2>
        <p className="mt-2 text-yellow-600">You have cancelled the payment process. No changes were made.</p>
        <Link href="/">
        <button className="mt-6 px-6 py-2 bg-yellow-600 text-white rounded-lg hover:bg-yellow-500 focus:outline-none focus:ring-2 focus:ring-yellow-500">Return to Cart</button>
        </Link>
      </div>
    </div>
  );
};

export default PaymentCancel;
