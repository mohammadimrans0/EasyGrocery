'use client';
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

export default function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    first_name: '',
    last_name: '',
    email: '',
    password: '',
    confirm_password: '',
  });

  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

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
      const response = await axios.post('https://easygrocery-server.onrender.com/api/user/register/', formData);

      if (response.status === 200) {
        toast.success('Signup successful! Redirecting to login...');
        setTimeout(() => {
          router.push('/user/login');
        }, 2000); // Delay for user to read the success message
      }
    } catch (err: any) {
      if (err.response && err.response.data) {
        toast.error(err.response.data.message || 'Something went wrong');
      } else {
        toast.error('An error occurred. Please try again later.');
      }
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center py-6 px-4 sm:px-6 lg:px-8">
      <div className="w-full max-w-lg space-y-8 bg-white p-8 rounded-lg shadow-md">
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
          <div className="flex space-x-4">
            <div className="w-1/2">
              <input
                type="text"
                name="first_name"
                placeholder="First Name"
                value={formData.first_name}
                onChange={handleInputChange}
                required
                className="w-full border p-3 rounded border-green-500"
              />
            </div>
            <div className="w-1/2">
              <input
                type="text"
                name="last_name"
                placeholder="Last Name"
                value={formData.last_name}
                onChange={handleInputChange}
                required
                className="w-full border p-3 rounded border-green-500"
              />
            </div>
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
            <a href="/auth/login" className="text-blue-500">Login</a>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
