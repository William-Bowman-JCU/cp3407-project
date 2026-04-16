'use client';

import { useState } from 'react';
import { useRouter } from 'next/navigation';

export default function RegisterPage() {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirm, setConfirm] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const DJANGO_URL = process.env.NEXT_PUBLIC_API_URL;
  
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch(`${DJANGO_URL}/register/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ name, email, password }),
      });

      if (!response.ok) {
        const data = await response.json();
        throw new Error(data.error || 'Registration failed');
      }

      router.push('/login');
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
          <div className="text-center mb-6">
            <span className="font-extrabold text-2xl tracking-tight">
              <span className="text-white">Feed</span>
              <span className="text-[#D85A30]">Me</span>
            </span>
          </div>
          <p className="text-[#FAECE7] text-sm mt-1">Create your account</p>
        </div>

        {/* Form */}
        <div className="bg-zinc-800 border border-t-0 border-zinc-900 rounded-b-2xl px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                required
                className="w-full px-3 py-2.5 bg-zinc-900 border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#D85A30]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="you@email.com"
                required
                className="w-full px-3 py-2.5 bg-zinc-900 border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#D85A30]"
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
                className="w-full px-3 py-2.5 bg-zinc-900 border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#D85A30]"
              />
            </div>

            <div>
              <label className="block text-xs font-medium text-zinc-300 mb-1">Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2.5 bg-zinc-900 border-zinc-700 rounded-lg text-sm text-white focus:outline-none focus:border-[#D85A30]"
              />
            </div>

            {error && <p className="text-red-400 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#D85A30] text-white rounded-lg text-sm font-medium hover:bg-[#AC4724] transition-colors disabled:opacity-50"
            >
              {loading ? 'Creating account...' : 'Create account'}
            </button>

          </form>

          <p className="text-center text-sm text-stone-400 mt-6">
            Already have an account?{' '}
            <span
              className="text-[#D85A30] font-medium cursor-pointer"
              onClick={() => router.push('/login')}
            >
              Sign in
            </span>
          </p>
        </div>

      </div>
    </div>
  );
}