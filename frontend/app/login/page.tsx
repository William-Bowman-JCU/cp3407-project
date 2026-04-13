'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function LoginPage() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const DJANGO_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const response = await fetch(`${DJANGO_URL}/api/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) throw new Error('Login failed');

      const data = await response.json();
      // Store user info so Account Settings page can read it
      if (data.user) {
        localStorage.setItem('feedme_user', JSON.stringify({
          email: data.user.email,
          name: data.user.name,
        }));
      }

      router.push('/');
    } catch (err) {
      setError(err instanceof Error ? err.message : 'An error occurred');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="bg-[#D85A30] rounded-t-2xl px-8 pt-10 pb-8 text-center">
          <h1 className="text-3xl font-medium text-white tracking-tight">FeedMe</h1>
          <p className="text-[#FAECE7] text-sm mt-1">Delivery at your door</p>
        </div>

        {/* Form */}
        <div className="bg-white border border-t-0 border-stone-200 rounded-b-2xl px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-none focus:border-[#D85A30]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-none focus:border-[#D85A30]"
              />
              <div className="text-right mt-1">
                <span className="text-xs text-[#D85A30] cursor-pointer">Forgot password?</span>
              </div>
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#D85A30] text-white rounded-lg text-sm font-medium hover:bg-[#c04f28] transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-stone-200" />
              <span className="text-xs text-stone-400">or</span>
              <div className="flex-1 h-px bg-stone-200" />
            </div>

            <button
              type="button"
              className="w-full py-3 bg-white border border-stone-300 rounded-lg text-sm font-medium text-stone-700 hover:bg-stone-50 transition-colors"
            >
              Continue with Google
            </button>

          </form>

          <p className="text-center text-sm text-stone-400 mt-6">
            Don't have an account?{' '}
            <span 
              className="text-[#D85A30] font-medium cursor-pointer"
              onClick={() => router.push('/register')}
            >
              Sign up
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}