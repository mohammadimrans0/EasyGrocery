"use client"

import Link from "next/link";
import {
  User,
  Heart,
  List,
  PlusCircle,
  Box,
  Key,
} from "lucide-react";
import { useEffect } from "react";
import { useUserStore } from "@/app/stores/useUserStore";

export default function Sidebar() {
  const { profile, fetchProfile } = useUserStore();
  
    useEffect(() => {
      fetchProfile();
    }, [fetchProfile]);

    console.log(profile?.profile.role);


  return (
    <div className="bg-slate-100 md:h-screen p-8 mt-16">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard/user/profile">
               <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:text-white hover:text-white hover:bg-[#77c91c] rounded-lg cursor-pointer">
               <User /> Profile
              </p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/user/wishlist">
              
              <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:text-white hover:bg-[#77c91c] rounded-lg cursor-pointer">
              <Heart /> Wishlist
              </p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/user/purchased_list">
              
              <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:text-white hover:bg-[#77c91c] rounded-lg cursor-pointer">
              <List /> Purchased List
              </p>
            </Link>
          </li>
          {profile?.profile.role === "seller" && (
            <>
              <li>
                <Link href="/dashboard/product/create_category">
                  <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:text-white hover:bg-[#77c91c] rounded-lg cursor-pointer">
                    <PlusCircle /> Add Category
                  </p>
                </Link>
              </li>
              <li>
                <Link href="/dashboard/product/create_product">
                  <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:text-white hover:bg-[#77c91c] rounded-lg cursor-pointer">
                    <Box /> Add Product
                  </p>
                </Link>
              </li>
            </>
          )}
          <li>
            <Link href="/dashboard/user/reset_password">
              
              <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:text-white hover:bg-[#77c91c] rounded-lg cursor-pointer">
              <Key /> Reset Password
              </p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
