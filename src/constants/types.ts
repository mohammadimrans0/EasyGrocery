// Define Product interface
export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    stock: number;
    category: number;
  }
  
  // Define CartItem interface
  export interface CartItem {
    id: number;
    name: string;
    price: number;
    stock: number;
  }
  