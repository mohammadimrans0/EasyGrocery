import Link from 'next/link'
import React from 'react'

export default function Sidebar() {
  return (
    <div className='bg-green-300 h-screen p-8'>
        <div>
            <Link href="/dashboard">
                <h1 className='text-4xl mb-5 text-orange-500'>Dashboard</h1>
            </Link>
        </div>

        <nav>
            <ul className="space-y-4">
                <li>
                    <Link href="/dashboard/user/profile">
                    <p className="px-4 py-2 border border-2 border-orange-400 rounded-lg cursor-pointer">Profile</p>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/user/wishlist">
                    <p className="px-4 py-2 border border-2 border-orange-400 rounded-lg cursor-pointer">My Wishlist</p>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/user/purchased_list">
                    <p className="px-4 py-2 border border-2 border-orange-400 rounded-lg cursor-pointer">My Purchased List</p>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/user/add_deposit">
                    <p className="px-4 py-2 border border-2 border-orange-400 rounded-lg cursor-pointer">Deposit Balance $</p>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/product/create_category">
                    <p className="px-4 py-2 border border-2 border-orange-400 rounded-lg cursor-pointer">Add Category</p>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/product/create_product">
                    <p className="px-4 py-2 border border-2 border-orange-400 rounded-lg cursor-pointer">Add Product</p>
                    </Link>
                </li>
                <li>
                    <Link href="/dashboard/user/reset_password">
                    <p className="px-4 py-2 border border-2 border-orange-400 rounded-lg cursor-pointer">Reset Password</p>
                    </Link>
                </li>
            </ul>
        </nav>
    </div>
  )
}

