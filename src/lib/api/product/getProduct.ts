import axios from "axios";
import { Product } from "@/constants/types";

export const getProducts = async (): Promise<Product[]> => {
  try {
    const response = await axios.get(
      "https://easygrocery-server.onrender.com/api/product/products/"
    );
    return response.data.results;
  } catch (error) {
    console.error("Failed to fetch products:", error);
    return [];
  }
};
