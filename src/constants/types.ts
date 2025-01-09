// Product interface
export interface Product {
    id: number;
    name: string;
    image: string;
    price: number;
    stock: number;
    category: number;
  }
  
  // User Profile interface
  export interface UserProfile {
    id: number;
    user: {
      id: number;
      username: string;
      email: string;
      first_name: string;
      last_name: string;
    };
    image: string;
    balance: string;
    contact_info: string;
    shopping_preferences: string;
  }  
  