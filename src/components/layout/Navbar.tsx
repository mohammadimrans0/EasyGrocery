"use client";
import { useEffect, useState } from "react";
import Link from "next/link";
import { ShoppingCart, Menu, X } from "lucide-react";
import Image from "next/image";
import Cart from "@/components/home/Cart";
import { useUserStore } from '@/app/stores/useUserStore';

const Navbar = () => {
  const [isToggleOpen, setIsToggleOpen] = useState(false);
  const [isCartOpen, setIsCartOpen] = useState(false);
  const [isProfileOpen, setIsProfileOpen] = useState(false);

  const { profile, fetchProfile, logout } = useUserStore();

  useEffect(() => {
    fetchProfile();
  }, [fetchProfile]);

  return (
    <div className="fixed top-0 left-0 w-full bg-white shadow-sm z-50">
      <div className="container mx-auto px-4 lg:max-w-5xl xl:max-w-7xl">
        <nav className="flex items-center justify-between py-4">
          {/* Brand logo */}
          <Link href="/">
            <div className="flex items-center justify-center">
              <Image
                src="/images/easygrocery-logo.png"
                alt="EasyGrocery"
                width={36}
                height={36}
              />
              <span className="text-2xl font-semibold text-primary">EasyGrocery</span>
            </div>
          </Link>

          {/* Mobile Menu Toggle */}
          <button
            className="lg:hidden"
            onClick={() => setIsToggleOpen(!isToggleOpen)}
          >
            {isToggleOpen ? <X size={28} /> : <Menu size={28} />}
          </button>

          {/* Navigation Links */}
          <ul
            className={`fixed top-16 left-0 w-full h-full flex flex-col items-center justify-center gap-6 bg-white transition-transform transform lg:static lg:flex-row lg:bg-transparent lg:h-auto lg:w-auto ${isToggleOpen ? "translate-x-0" : "-translate-x-full"} lg:translate-x-0`}
          >
            <li>
              <Link href="/" onClick={() => setIsToggleOpen(false)}>Home</Link>
            </li>
            <li>
              <Link href="/products" onClick={() => setIsToggleOpen(false)}>Products</Link>
            </li>
            <li>
              <Link href="/about" onClick={() => setIsToggleOpen(false)}>About</Link>
            </li>
            <li>
              <Link href="/contact" onClick={() => setIsToggleOpen(false)}>Contact</Link>
            </li>
            {profile ? (
              <>
                <li className="flex items-center gap-8">
                  <button onClick={() => setIsProfileOpen(!isProfileOpen)}>
                    <Image
                      src={profile.profile.image || "/images/avatar.png"}
                      alt="User Profile"
                      title={profile.username}
                      width={36}
                      height={36}
                      className="border-2 border-slate-500 rounded-full"
                    />
                  </button>
                </li>
                <li className="flex items-center gap-8">
                  <button onClick={() => setIsCartOpen(true)} className="text-3xl text-primary">
                    <ShoppingCart />
                  </button>
                </li>
              </>
            ) : (
              <li>
                <Link href="/auth/login" onClick={() => setIsToggleOpen(false)}>
                  <button className="px-6 py-2 text-white bg-primary rounded-full shadow-md">
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
          <div className="relative w-[580px] h-screen bg-white shadow-lg overflow-auto">
            <button onClick={() => setIsCartOpen(false)} className="absolute top-4 right-4 text-lg">✖</button>
            <div className="p-4">
              <h2 className="text-xl font-semibold mb-4">Your Cart</h2>
              <Cart />
            </div>
          </div>
        </div>
      )}

      {/* Profile Window */}
      {isProfileOpen && (
        <div className="fixed inset-0 z-40 top-16 right-24 flex justify-end">
          <div className="relative w-[156px] h-32 bg-white shadow-lg overflow-auto rounded-b-lg">
            <nav className="p-4">
              <ul className="space-y-4">
                <li>
                  <Link href="/dashboard/user/profile" onClick={() => setIsProfileOpen(false)}>
                    <button className="px-4 py-1 text-gray-900 text-xl">Dashboard</button>
                  </Link>
                </li>
                <li>
                  <button
                    onClick={async () => {
                      try {
                        await logout();
                        setIsProfileOpen(false);
                      } catch (error) {
                        console.error("Logout error:", error);
                      }
                    }}
                    className="text-center px-4 py-1 text-xl text-red-500"
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
