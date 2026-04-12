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

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    if (password !== confirm) {
      setError('Passwords do not match');
      return;
    }

    setLoading(true);

    try {
      const response = await fetch('http://127.0.0.1:8000/api/register/', {
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
    <div className="min-h-screen flex items-center justify-center bg-stone-100">
      <div className="w-full max-w-md">

        {/* Header */}
        <div className="bg-[#D85A30] rounded-t-2xl px-8 pt-10 pb-8 text-center">
          <h1 className="text-3xl font-medium text-white tracking-tight">MyFood</h1>
          <p className="text-[#FAECE7] text-sm mt-1">Create your account</p>
        </div>

        {/* Form */}
        <div className="bg-white border border-t-0 border-stone-200 rounded-b-2xl px-8 py-8">
          <form onSubmit={handleSubmit} className="space-y-4">

            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Full name</label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="John Smith"
                required
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-none focus:border-[#D85A30]"
              />
            </div>

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
            </div>

            <div>
              <label className="block text-xs font-medium text-stone-500 mb-1">Confirm password</label>
              <input
                type="password"
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
                placeholder="••••••••"
                required
                className="w-full px-3 py-2.5 bg-stone-50 border border-stone-200 rounded-lg text-sm text-stone-800 focus:outline-none focus:border-[#D85A30]"
              />
            </div>

            {error && <p className="text-red-500 text-sm">{error}</p>}

            <button
              type="submit"
              disabled={loading}
              className="w-full py-3 bg-[#D85A30] text-white rounded-lg text-sm font-medium hover:bg-[#c04f28] transition-colors disabled:opacity-50"
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