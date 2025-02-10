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
  };
  name: string;
  image: string;
  contact_info: string;
  shopping_preferences: string;
} 


export interface Category {
  id: number;
  name: string;
}


export interface WishlistItem {
  id: number;
  product: number;
  user: number;
  added_at: string;
}
  