'use client'
import { useState } from 'react';
import axios from 'axios';
import { useRouter } from 'next/navigation';
import { ToastContainer, toast } from 'react-toastify';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const router = useRouter();

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    // Simple validation
    if (!username || !password) {
      toast.error('Please fill in all fields');
      return;
    }

    setIsLoading(true);

    try {
      const response = await axios.post('https://easygrocery-server.onrender.com/api/user/login/', {
        username,
        password,
      });

      if (response.data.token) {
        localStorage.setItem('easygrocery_auth_token', response.data.token);
        localStorage.setItem('easygrocery_user_id', response.data.user_id);

        toast.success('Login successful! Redirecting...');

        setTimeout(() => {
          router.push('/dashboard/user/profile');
        }, 2000);
      }else {
        toast.error(response.data.error || 'Invalid username or password');
      }
    } catch (err) {
      toast.error('Invalid username or password');
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <div className="flex items-center justify-center py-16">
      <div className="w-full max-w-md p-8 space-y-6 bg-white rounded-lg shadow-lg border">
        <h2 className="text-2xl font-semibold text-center text-gray-700">Login to your account</h2>

        <form onSubmit={handleSubmit} className="space-y-6">
          <div className="space-y-4">
            <input
              type="text"
              placeholder="Type your username"
              value={username}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setUsername(e.target.value)}
              required
              className="w-full border p-3 rounded border-green-500"
            />
            <input
              type="password"
              placeholder="Type your password"
              value={password}
              onChange={(e: React.ChangeEvent<HTMLInputElement>) => setPassword(e.target.value)}
              required
              className="w-full border p-3 rounded border-green-500"
            />
          </div>

          <button
            type="submit"
            className="w-full bg-green-500 text-white text-center p-3 rounded"
            disabled={isLoading}
          >
            {isLoading ? 'Logging in...' : 'Login'}
          </button>
        </form>

        <div className="text-center text-gray-600">
          <p>
            Don&apos;t have an account?{' '}
            <a href="/auth/signup" className="text-blue-500">Sign up</a>
          </p>
        </div>
      </div>

      <ToastContainer />
    </div>
  );
}
