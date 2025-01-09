import { CartItem, Product } from "./types";

// Function to add a product to the cart
export const addToCart = (
    product: CartItem, // changed from Product to CartItem
    cart: CartItem[],
    setCart: React.Dispatch<React.SetStateAction<CartItem[]>>
  ) => {
    setCart((prevCart) => {
      const existingProduct = prevCart.find((item) => item.id === product.id);
  
      if (existingProduct) {
        return prevCart.map((item) =>
          item.id === product.id
            ? { ...item, quantity: item.stock + 1 }
            : item
        );
      }
  
      // Add product to cart with initial quantity 1
      return [...prevCart, product];
    });
  };

// Function to remove a product from the cart
export const removeFromCart = (id: number, cart: CartItem[], setCart: React.Dispatch<React.SetStateAction<CartItem[]>>) => {
  setCart((prevCart) => prevCart.filter((item) => item.id !== id));
};

// Function to update the quantity of a product in the cart
export const updateQuantity = (id: number, change: number, cart: CartItem[], setCart: React.Dispatch<React.SetStateAction<CartItem[]>>) => {
  setCart((prevCart) =>
    prevCart.map((item) =>
      item.id === id
        ? { ...item, quantity: Math.max(1, item.stock + change) }
        : item
    )
  );
};
