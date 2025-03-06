'use client';
import { useState } from 'react';
import { useRouter } from 'next/navigation';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useUserStore } from '@/app/stores/useUserStore';
import Link from 'next/link';
import Image from 'next/image';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();
  const { signup } = useUserStore();

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prevData) => ({ ...prevData, [name]: value }));
  };

  const validateForm = () => {
    if (formData.password !== formData.confirm_password) {
      toast.error('Passwords do not match');
      return false;
    }
    return true;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    if (!validateForm()) return;

    setIsLoading(true);

    try {
      await signup(formData);
      setTimeout(() => { router.push('/auth/login') }, 2000);
    } catch (err: any) {
      console.error('Signup error:', err);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-8 px-6 mt-16">
      <div className="flex bg-white rounded-lg shadow-md border overflow-hidden w-full max-w-4xl">
        {/* Left Image Section */}
        <div className="hidden md:block w-1/2 relative">
          <Image 
            src="/images/signup-image.png"
            alt="Signup Illustration" 
            layout="fill" 
            objectFit="cover" 
          />
        </div>
        {/* Right Form Section */}
        <div className="w-full md:w-1/2 p-8 space-y-8">
          <h1 className="text-2xl font-bold text-center text-gray-700">Create an Account</h1>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <input
                type="text"
                name="username"
                placeholder="Username"
                value={formData.username}
                onChange={handleInputChange}
                required
                className="w-full border p-3 rounded border-green-500"
              />
            </div>
            <div>
              <input
                type="email"
                name="email"
                placeholder="Email Address"
                value={formData.email}
                onChange={handleInputChange}
                required
                className="w-full border p-3 rounded border-green-500"
              />
            </div>
            <div>
              <input
                type="password"
                name="password"
                placeholder="Password"
                value={formData.password}
                onChange={handleInputChange}
                required
                className="w-full border p-3 rounded border-green-500"
              />
            </div>
            <div>
              <input
                type="password"
                name="confirm_password"
                placeholder="Confirm Password"
                value={formData.confirm_password}
                onChange={handleInputChange}
                required
                className="w-full border p-3 rounded border-green-500"
              />
            </div>
            <div>
              <button type="submit" className="w-full bg-green-500 text-white text-center p-3 rounded" disabled={isLoading}>
                {isLoading ? 'Signing Up...' : 'Sign Up'}
              </button>
            </div>
          </form>
          <div className="text-center text-gray-600">
            <p>
              Already have an account?{' '}
              <Link href="/auth/login" className="text-blue-500">Login</Link>
            </p>
          </div>
        </div>
      </div>
      <ToastContainer />
    </div>
  );
}
