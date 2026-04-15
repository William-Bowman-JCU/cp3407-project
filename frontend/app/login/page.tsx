'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';
import Link from 'next/link'; //

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
    <div className="min-h-screen flex items-center justify-center">
      <div className="w-full max-w-md">
        {/* Header */}
        <div className="bg-zinc-900 rounded-t-2xl px-8 pt-10 pb-8 text-center">
          <h1>
            {/* Logo */}
            <div className="text-center mb-6">
              <Link href="/" className="font-extrabold text-2xl tracking-tight">
                <span className="text-white">Feed</span>
                <span className="text-[#D85A30]">Me</span>
              </Link>
            </div>
          </h1>
          <p className="text-[#FAECE7] text-sm mt-1">Delivery at your door</p>
        </div>

        {/* Form */}
        <div className="bg-zinc-800 border border-t-0 border-zinc-900 rounded-b-2xl px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#D85A30]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Password</label>
              <input
                type="password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2.5 bg-zinc-900 border border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#D85A30]"
              />
              <div className="text-right mt-1">
                <span className="text-xs text-[#D85A30] cursor-pointer">Forgot password?</span>
              </div>
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#D85A30] text-white rounded-lg text-sm font-medium hover:bg-[#AC4724] transition-colors disabled:opacity-50"
            >
              {loading ? 'Signing in...' : 'Sign in'}
            </button>

            <div className="flex items-center gap-3 my-2">
              <div className="flex-1 h-px bg-zinc-700" />
              <span className="text-xs text-zinc-400">or</span>
              <div className="flex-1 h-px bg-zinc-700" />
            </div>

            <button
              type="button"
              className="w-full py-3 bg-zinc-600 border border-zinc-700 rounded-lg text-sm font-medium text-zinc-200 hover:bg-zinc-900 transition-colors"
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