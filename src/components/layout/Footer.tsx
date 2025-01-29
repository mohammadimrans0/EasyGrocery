'use client'

import Link from "next/link"
import Image from "next/image";

export default function Footer() {
  return (
    <>
      <footer className="text-slate-500">
        {/* <!-- Main footer --> */}
        <div className="text-sm border-t border-slate-200 bg-slate-100 p-8">
          <div className="container px-6 mx-auto">
            <div className="grid grid-cols-4 gap-6 md:grid-cols-8 lg:grid-cols-12">
              <div
                className="col-span-4 md:col-span-8 lg:col-span-4"
                aria-labelledby="footer-header"
              >
                
                <Link
                  className="flex items-center gap-2 mb-6 font-medium leading-6 whitespace-nowrap focus:outline-none"
                  href="/"
                >
                  <div className="flex items-center justify-center">
              <Image
                src="/images/easygrocery-logo.png"
                alt="Login"
                width={48}
                height={48}
              />
              <span className="text-3xl font-semibold text-[#77b91e]">EasyGrocery</span>
            </div>
                </Link>
                
                <p className="text-black">
                Your one-stop destination for fresh produce, quality essentials, and everyday needs. Enjoy affordable prices, top-notch service, and a wide selection of products for your family !
                </p>
              </div>
              <nav
                className="col-span-2 md:col-span-4 lg:col-span-3"
                aria-labelledby="footer-product-5-logo"
              >
                <h3
                  className="mb-6 text-xl font-medium text-slate-700"
                  id="footer-product-5-logo"
                >
                  Product
                </h3>
                <ul>
                  <li className="mb-2 leading-6">
                    <Link
                      href="#"
                      className="transition-colors duration-300 text-black hover:text-emerald-500 focus:text-emerald-600"
                    >
                      {" "}
                      Features{" "}
                    </Link>
                  </li>
                  <li className="mb-2 leading-6">
                    <Link
                      href="#"
                      className="transition-colors duration-300 text-black hover:text-emerald-500 focus:text-emerald-600"
                    >
                      {" "}
                      Customers{" "}
                    </Link>
                  </li>
                  <li className="mb-2 leading-6">
                    <Link
                      href="#"
                      className="transition-colors duration-300 text-black hover:text-emerald-500 focus:text-emerald-600"
                    >
                      {" "}
                      Why us?{" "}
                    </Link>
                  </li>
                  <li className="mb-2 leading-6">
                    <Link
                      href="#"
                      className="transition-colors duration-300 text-black hover:text-emerald-500 focus:text-emerald-600"
                    >
                      {" "}
                      Pricing{" "}
                    </Link>
                  </li>
                </ul>
              </nav>
              
              <nav
                className="col-span-2 md:col-span-4 lg:col-span-3"
                aria-labelledby="footer-about-5-logo"
              >
                <h3
                  className="mb-6 text-xl font-medium text-slate-700"
                  id="footer-about-5-logo"
                >
                  About us
                </h3>
                <ul>
                  <li className="mb-2 leading-6">
                    <Link
                      href="#"
                      className="transition-colors duration-300 text-black hover:text-emerald-500 focus:text-emerald-600"
                    >
                      {" "}
                      About us{" "}
                    </Link>
                  </li>
                  <li className="mb-2 leading-6">
                    <Link
                      href="#"
                      className="transition-colors duration-300 text-black hover:text-emerald-500 focus:text-emerald-600"
                    >
                      {" "}
                      Careers{" "}
                    </Link>
                  </li>
                  <li className="mb-2 leading-6">
                    <Link
                      href="#"
                      className="transition-colors duration-300 text-black hover:text-emerald-500 focus:text-emerald-600"
                    >
                      {" "}
                      Leadership{" "}
                    </Link>
                  </li>
                  <li className="mb-2 leading-6">
                    <Link
                      href="#"
                      className="transition-colors duration-300 text-black hover:text-emerald-500 focus:text-emerald-600"
                    >
                      {" "}
                      Blog
                    </Link>
                  </li>
                  <li className="mb-2 leading-6">
                    <Link
                      href="#"
                      className="transition-colors duration-300 text-black hover:text-emerald-500 focus:text-emerald-600"
                    >
                      {" "}
                      Events{" "}
                    </Link>
                  </li>
                </ul>
              </nav>
              
              <nav
                className="col-span-2 md:col-span-4 lg:col-span-2"
                aria-labelledby="footer-resources-5-logo"
              >
                <h3
                  className="mb-6 text-xl font-medium text-slate-700"
                  id="footer-resources-5-logo"
                >
                  Resources
                </h3>
                <ul>
                  <li className="mb-2 leading-6">
                    <Link
                      href="#"
                      className="transition-colors duration-300 text-black hover:text-emerald-500 focus:text-emerald-600"
                    >
                      {" "}
                      Support{" "}
                    </Link>
                  </li>
                  <li className="mb-2 leading-6">
                    <Link
                      href="#"
                      className="transition-colors duration-300 text-black hover:text-emerald-500 focus:text-emerald-600"
                    >
                      {" "}
                      Contact us{" "}
                    </Link>
                  </li>
                  <li className="mb-2 leading-6">
                    <Link
                      href="#"
                      className="transition-colors duration-300 text-black hover:text-emerald-500 focus:text-emerald-600"
                    >
                      {" "}
                      FAQ{" "}
                    </Link>
                  </li>
                  <li className="mb-2 leading-6">
                    <Link
                      href="#"
                      className="transition-colors duration-300 text-black hover:text-emerald-500 focus:text-emerald-600"
                    >
                      {" "}
                      Privacy{" "}
                    </Link>
                  </li>
                </ul>
              </nav>
            </div>
          </div>
        </div>
      </footer>
    </>
  )
}
