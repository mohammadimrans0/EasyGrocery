import Link from "next/link";
import {
  FaUser,
  FaHeart,
  FaListAlt,
  FaMoneyBillWave,
  FaPlusCircle,
  FaBox,
  FaKey,
} from "react-icons/fa";

export default function Sidebar() {
  return (
    <div className="bg-slate-100 h-screen p-8">
      <nav>
        <ul className="space-y-4">
          <li>
            <Link href="/dashboard/user/profile">
               <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:bg-slate-300 rounded-lg cursor-pointer">
               <FaUser /> Profile
              </p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/user/wishlist">
              
              <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:bg-slate-300 rounded-lg cursor-pointer">
              <FaHeart /> Wishlist
              </p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/user/purchased_list">
              
              <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:bg-slate-300 rounded-lg cursor-pointer">
              <FaListAlt /> Purchased List
              </p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/user/add_deposit">
              
              <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:bg-slate-300 rounded-lg cursor-pointer">
              <FaMoneyBillWave /> Deposit
              </p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/product/create_category">
             
              <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:bg-slate-300 rounded-lg cursor-pointer">
              <FaPlusCircle /> Add Category
              </p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/product/create_product">
             
              <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:bg-slate-300 rounded-lg cursor-pointer">
              <FaBox /> Add Product
              </p>
            </Link>
          </li>
          <li>
            <Link href="/dashboard/user/reset_password">
              
              <p className="flex items-center gap-x-2 px-4 py-2 text-slate-900 hover:bg-slate-300 rounded-lg cursor-pointer">
              <FaKey /> Reset Password
              </p>
            </Link>
          </li>
        </ul>
      </nav>
    </div>
  );
}
