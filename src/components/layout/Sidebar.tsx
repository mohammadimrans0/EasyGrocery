import Link from 'next/link'
import { FaUser, FaHeart, FaListAlt, FaMoneyBillWave, FaPlusCircle, FaBox, FaKey } from 'react-icons/fa';

export default function Sidebar() {
  return (
    <div className='bg-slate-400 h-screen p-8'>
        <div>
            <Link href="/dashboard">
                <h1 className='text-4xl mb-5 text-[#5A6ACF]'>Dashboard</h1>
            </Link>
        </div>

        <nav>
            <ul className="space-y-4">
                <li>
                    <Link href="/dashboard/user/profile">
                    <p className="flex items-center flex items-center px-4 py-2 text-slate-900 border border-2 border-slate-500 rounded-lg cursor-pointer">Profile <FaUser className="ml-2" /></p>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/user/wishlist">
                    <p className="flex items-center px-4 py-2 text-slate-900 border border-2 border-slate-500 rounded-lg cursor-pointer">Wishlist <FaHeart className="ml-2" /></p>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/user/purchased_list">
                    <p className="flex items-center px-4 py-2 text-slate-900 border border-2 border-slate-500 rounded-lg cursor-pointer">Purchased List <FaListAlt className="ml-2" /></p>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/user/add_deposit">
                    <p className="flex items-center px-4 py-2 text-slate-900 border border-2 border-slate-500 rounded-lg cursor-pointer">Deposit <FaMoneyBillWave className="ml-2" /></p>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/product/create_category">
                    <p className="flex items-center px-4 py-2 text-slate-900 border border-2 border-slate-500 rounded-lg cursor-pointer">Add Category <FaPlusCircle className="ml-2" /></p>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/product/create_product">
                    <p className="flex items-center px-4 py-2 text-slate-900 border border-2 border-slate-500 rounded-lg cursor-pointer">Add Product <FaBox className="ml-2" /></p>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/user/reset_password">
                    <p className="flex items-center px-4 py-2 text-slate-900 border border-2 border-slate-500 rounded-lg cursor-pointer">Reset Password <FaKey className="ml-2" /></p>
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

