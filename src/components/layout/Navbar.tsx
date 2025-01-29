"use client";
import { useState } from "react";
import Link from "next/link";
import { FaShoppingCart } from "react-icons/fa";
import Image from "next/image";
import Cart from "@/components/home/Cart";
import { useUserProfile } from "@/lib/api/user/getUserProfile";
import { logout } from "@/lib/api/auth/handleLogout";

const Navbar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { profileData, error, isLoading } = useUserProfile();

  const handleToggle = () => setIsToggleOpen(!isToggleOpen);
  const closeMenu = () => setIsToggleOpen(false);

  const toggleProfileWindow = () => {
    setIsProfileOpen((prev) => !prev);
  };

  return (
    <div className="relative z-20 w-full border-b shadow-2xl ">
      <div className="container mx-auto px-4 lg:max-w-5xl xl:max-w-7xl">
        <nav
          aria-label="main navigation"
          className="flex items-center justify-between"
        >
          {/* Brand logo */}
          <Link href="/">
            <div className="flex items-center justify-center">
              <Image
                src="/images/easygrocery-logo.png"
                alt="Login"
                width={36}
                height={36}
              />
              <span className="text-2xl font-semibold text-[#77b91e]">EasyGrocery</span>
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className={`relative h-10 w-10 lg:hidden ${
              isToggleOpen ? "open" : ""
            }`}
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
              isToggleOpen ? "visible" : "invisible opacity-0"
            } transition-opacity lg:visible lg:opacity-100`}
          >
            <li>
              <Link href="/" onClick={closeMenu}>
                Home
              </Link>
            </li>
            <li>
              <Link href="/products" onClick={closeMenu}>
                Products
              </Link>
            </li>
            <li>
              <Link href="/about" onClick={closeMenu}>
                About
              </Link>
            </li>
            <li>
              <Link href="/contact" onClick={closeMenu}>
                Contact
              </Link>
            </li>
            {profileData ? (
              <>
                <li className="flex items-center gap-8">
                  <button
                    onClick={toggleProfileWindow}
                    className="relative"
                    aria-label={
                      isProfileOpen ? "Close Profile" : "Open Profile"
                    }
                  >
                    <div className="relative inline-flex items-center justify-center text-white rounded-full">
                      <Image
                        src={profileData.image || "/fallback_image_url.jpg"}
                        alt="User Profile"
                        title={`${profileData.user.first_name} ${profileData.user.last_name}`}
                        width={36}
                        height={36}
                        className="border-2 border-slate-500 rounded-full"
                      />
                    </div>
                  </button>
                </li>
                <li className="flex items-center gap-8">
                  <button
                    onClick={() => setIsCartOpen(true)}
                    className="relative text-2xl text-slate-900"
                    aria-label="Open Cart"
                  >
                    <FaShoppingCart />
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/auth/login" onClick={closeMenu}>
                  <button className="px-6 py-2 text-white bg-[#77b91e] rounded-full shadow-md">
                    Login
                  </button>
                </Link>
              </li>
            )}
          </ul>
        </nav>
      </div>

      {/* Cart Window */}
      {isCartOpen && (
        <div className="fixed inset-0 z-50 flex justify-end bg-black bg-opacity-50">
          <div className="relative w-[550px] h-screen bg-white shadow-lg overflow-auto">
            <button
              onClick={() => setIsCartOpen(false)}
              className="absolute top-4 right-4 text-lg"
              aria-label="Close Cart"
            >
              ✖
            </button>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
              <Cart />
            </div>
          </div>
        </div>
      )}

      {/* Profile Window */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-40 top-16 right-8 flex justify-end">
          <div className="relative w-[220px] h-40 bg-white shadow-lg overflow-auto">
            <nav className="p-4">
              <ul className="space-y-4">
                <li>
                  <Link
                    href="/dashboard/user/profile"
                    onClick={toggleProfileWindow}
                  >
                    <button className="w-48 px-6 py-2 text-gray-900 text-xl cursor-pointer">
                      Dashboard
                    </button>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={async () => {
                      try {
                        await logout();
                      } catch (error) {
                        console.error("Logout error:", error);
                      }
                    }}
                    className="w-48 text-center px-4 py-2 text-xl text-red-500 cursor-pointer"
                  >
                    Logout
                  </button>
                </li>
              </ul>
            </nav>
          </div>
        </div>
      )}
    </div>
  );
};

export default Navbar;
