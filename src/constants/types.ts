// Product interface
export interface Product {
    id: number;
    name: string;
    image: string;
    description: string;
    price: number;
    stock: number;
    category: number;
  }
  
// User Profile interface
interface Profile {
  name: string;
  image: string;
  contact_info: string;
  shopping_preferences: string;
}

export interface UserProfile {
  username: string;
  email: string;
  profile: Profile;
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
  