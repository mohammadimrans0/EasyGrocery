import { useEffect, useState } from 'react';
import axios from 'axios';
import { getUserId } from '@/lib/api/user/getUserId';

interface Purchase {
  id: number;
  user: number;
  product: number;
  purchased_at: string;
}

interface Product {
  id: number;
  name: string;
  price: number;
  description: string;
}

export const usePurchasedList = () => {
  const [purchasedList, setPurchasedList] = useState<Purchase[]>([]);
  const [productData, setProductData] = useState<{ [key: number]: Product }>({});
  const [isLoading, setIsLoading] = useState(false);
  const [isProductLoading, setIsProductLoading] = useState(false);

  useEffect(() => {
    const fetchPurchasedList = async () => {
      try {
        setIsLoading(true);

        // Get the user ID
        const userId = getUserId();
        if (!userId) {
          throw new Error('User ID not found');
        }

        // Fetch the purchased list
        const purchaseResponse = await axios.get(
          `https://easygrocery-server.onrender.com/api/user_profile/purchase-history/?user=${userId}`
        );
        const purchases = purchaseResponse.data.results;
        setPurchasedList(purchases);

        // Fetch product details for each unique product ID
        const uniqueProductIds = [...new Set(purchases.map((item: any) => item.product))];
        const productResponses = await Promise.all(
          uniqueProductIds.map((id) =>
            axios.get(`https://easygrocery-server.onrender.com/api/product/products/${id}`)
          )
        );

        // Map product details
        const productMap: { [key: number]: Product } = {};
        productResponses.forEach((response) => {
          const product = response.data;
          productMap[product.id] = product;
        });

        setProductData(productMap);
      } catch (error) {
        console.error('Error fetching data:', error);
      } finally {
        setIsLoading(false);
        setIsProductLoading(false);
      }
    };

    fetchPurchasedList();
  }, []);

  return { purchasedList, productData, isLoading, isProductLoading };
};
