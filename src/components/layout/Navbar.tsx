'use client';
import { useState, useEffect } from 'react';
import Link from 'next/link';
import axios from 'axios';
import { FaShoppingCart } from 'react-icons/fa';
import Image from 'next/image';
import Cart from '@/components/home/Cart';
import { UserProfile } from '@/constants/types';

const Navbar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [userProfile, setUserProfile] = useState<UserProfile | null>(null);
  const [loading, setLoading] = useState(true);
  const [cart, setCart] = useState([]); // State to store cart data

  const userId = typeof window !== 'undefined' ? localStorage.getItem('user_id') : null;

  const handleToggle = () => setIsToggleOpen(!isToggleOpen);
  const closeMenu = () => setIsToggleOpen(false);

  useEffect(() => {
    const fetchUserProfile = async () => {
      try {
        const response = await axios.get(
          `https://easygrocery-server.onrender.com/api/user_profile/profile/user/${userId}/`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        setUserProfile(response.data);
      } catch (error) {
        console.error('Error fetching user profile:', error);
      } finally {
        setLoading(false);
      }
    };

    const fetchCart = async () => {
      try {
        const response = await axios.get(
          `https://easygrocery-server.onrender.com/api/user_profile/cart/user/${userId}/`,
          { headers: { 'Content-Type': 'application/json' } }
        );
        setCart(response.data);
      } catch (error) {
        console.error('Error fetching cart:', error);
      }
    };

    if (userId) {
      fetchUserProfile();
      fetchCart();
    }
  }, [userId]);

  return (
    <div className="relative z-20 w-full border-b bg-green-300 shadow-3xl lg:backdrop-blur-sm">
      <div className="container mx-auto px-4 lg:max-w-5xl xl:max-w-7xl">
        <nav aria-label="main navigation" className="flex items-center justify-between">
          {/* Brand logo */}
          <Link href="/" className="flex items-center gap-2 text-3xl">
            <span className="font-semibold text-orange-500">EasyGrocery</span>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={`relative h-10 w-10 lg:hidden ${isToggleOpen ? 'open' : ''}`}
            onClick={handleToggle}
            aria-expanded={isToggleOpen}
            aria-label="Toggle navigation"
          >
            <span className="block h-0.5 w-6 bg-slate-900 transition-transform"></span>
            <span className="block h-0.5 w-6 bg-slate-900 transition-transform"></span>
            <span className="block h-0.5 w-6 bg-slate-900 transition-transform"></span>
          </button>

          {/* Navigation Links */}
          <ul
            className={`fixed inset-0 z-10 flex flex-col items-center justify-center gap-6 bg-white p-3 lg:relative lg:flex-row lg:bg-transparent ${
              isToggleOpen ? 'visible' : 'invisible opacity-0'
            } transition-opacity lg:visible lg:opacity-100`}
          >
            <li>
              <Link href="/features" onClick={closeMenu}>
                Add Category
              </Link>
            </li>
            <li>
              <Link href="/pricing" onClick={closeMenu}>
                Add Product
              </Link>
            </li>
            {userProfile ? (
              <li className="flex items-center gap-8">
                <Link href="/user/profile">
                  <div className="relative inline-flex items-center justify-center text-white rounded-full">
                    <Image
                      src={userProfile.image || '/fallback_image_url.jpg'}
                      alt="User Profile"
                      title={`${userProfile.user.first_name} ${userProfile.user.last_name}`}
                      width={48}
                      height={48}
                      className="border-2 border-white rounded-full"
                    />
                  </div>
                </Link>
              </li>
            ) : (
              <>
                <li>
                  <Link href="/user/login" onClick={closeMenu}>
                    <button className="px-6 py-2 text-white bg-blue-600 rounded-full shadow-md bg-blue-500">
                      Login
                    </button>
                  </Link>
                </li>
                <li>
                  <Link href="/user/signup" onClick={closeMenu}>
                    <button className="px-6 py-2 text-white bg-blue-600 rounded-full shadow-md bg-blue-500">
                      Signup
                    </button>
                  </Link>
                </li>
              </>
            )}
            <li className="flex items-center gap-8">
              <button
                onClick={() => setIsCartOpen(true)}
                className="relative text-3xl text-orange-400"
                aria-label="Open Cart"
              >
                <FaShoppingCart />
              </button>
            </li>
          </ul>
        </nav>
      </div>

      {/* Cart Window */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
          <div className="relative w-[550px] h-screen bg-white shadow-lg overflow-auto"> {/* Increased width */}
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-4 right-4 text-lg"
              aria-label="Close Cart"
            >
              ✖
            </button>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
              <Cart cart={cart} />
            </div>
          </div>
        </div>
      )}

    </div>
  );
};

export default Navbar;
