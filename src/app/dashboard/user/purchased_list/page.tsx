'use client';

import { getPurchasedList } from '@/lib/api/user/getPurchasedList';
import { useEffect, useState } from 'react';


interface Purchase {
  id: number;
  user: number;
  product: number;
  purchased_at: string;
}

const PurchasedList = () => {
  const [purchasedList, setPurchasedList] = useState<Purchase[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    const fetchPurchasedList = async () => {
      try {
        setIsLoading(true);
        const data = await getPurchasedList();
        setPurchasedList(data);
      } catch (error) {
        console.error('Error fetching purchase list:', error);
      } finally {
        setIsLoading(false);
      }
    };

    fetchPurchasedList();
  }, []);

  return (
    <div className="p-6">
      <h2 className="text-2xl font-bold mb-4">Purchased List</h2>
      {isLoading ? (
        <p>Loading...</p>
      ) : purchasedList.length > 0 ? (
        <ul className="list-disc pl-6">
          {purchasedList.map((purchase) => (
            <li key={purchase.id} className="mb-2">
              Product ID: {purchase.product}, Purchased At:{' '}
              {new Date(purchase.purchased_at).toLocaleString()}
            </li>
          ))}
        </ul>
      ) : (
        <p>No purchases found.</p>
      )}
    </div>
  );
};

export default PurchasedList;
