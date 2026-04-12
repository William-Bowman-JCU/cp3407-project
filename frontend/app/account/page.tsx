"use client";

import { useState, useEffect } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getAccount, updateAccount, ApiError } from "../services/api";

export default function AccountSettingsPage() {
  const router = useRouter();

  const [name, setName] = useState("");
  const [email, setEmail] = useState("");          // current email (read-only identifier)
  const [newEmail, setNewEmail] = useState("");
  const [newPassword, setNewPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [successMsg, setSuccessMsg] = useState("");
  const [errorMsg, setErrorMsg] = useState("");

  // Load user from localStorage (saved after login)
  useEffect(() => {
    const stored = localStorage.getItem("feedme_user");
    if (!stored) {
      router.push("/login");
      return;
    }

    const { email: storedEmail } = JSON.parse(stored) as { email: string; name: string };

    getAccount(storedEmail)
      .then((profile) => {
        setName(profile.name);
        setEmail(profile.email);
        setNewEmail(profile.email);
      })
      .catch(() => {
        // Fallback to localStorage values if API unavailable
        const { name: storedName } = JSON.parse(stored) as { email: string; name: string };
        setName(storedName ?? "");
        setEmail(storedEmail);
        setNewEmail(storedEmail);
      })
      .finally(() => setLoading(false));
  }, [router]);

  async function handleSave(e: React.FormEvent) {
    e.preventDefault();
    setSuccessMsg("");
    setErrorMsg("");

    if (newPassword && newPassword !== confirmPassword) {
      setErrorMsg("Passwords do not match.");
      return;
    }

    setSaving(true);
    try {
      const payload: Parameters<typeof updateAccount>[0] = { email };
      if (name) payload.name = name;
      if (newEmail && newEmail !== email) payload.new_email = newEmail;
      if (newPassword) payload.new_password = newPassword;

      const result = await updateAccount(payload);

      // Sync updated values back to localStorage
      localStorage.setItem(
        "feedme_user",
        JSON.stringify({ email: result.user.email, name: result.user.name })
      );

      setEmail(result.user.email);
      setNewEmail(result.user.email);
      setName(result.user.name);
      setNewPassword("");
      setConfirmPassword("");
      setSuccessMsg("Account updated successfully!");
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        router.push("/login");
      } else {
        setErrorMsg(err instanceof Error ? err.message : "Something went wrong.");
      }
    } finally {
      setSaving(false);
    }
  }

  function handleLogout() {
    localStorage.removeItem("feedme_user");
    router.push("/login");
  }

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        Loading…
      </div>
    );
  }

  return (
    <div className="min-h-screen text-white">
      <main className="max-w-lg mx-auto px-6 py-10">

        {/* Page header */}
        <div className="mb-8">
          <Link href="/" className="text-zinc-400 hover:text-white text-sm transition">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold mt-4">Account Settings</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Signed in as <span className="text-white">{email}</span>
          </p>
        </div>

        {/* Form card */}
        <div className="bg-zinc-800 rounded-2xl p-8 shadow-lg space-y-6">

          <h2 className="text-zinc-300 text-sm uppercase tracking-widest">
            Profile
          </h2>

          <form onSubmit={handleSave} className="space-y-5">

            {/* Full Name */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Full Name
              </label>
              <input
                type="text"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="Your name"
                className="w-full px-4 py-2.5 bg-zinc-700 border border-zinc-600 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D85A30] transition"
              />
            </div>

            {/* Email */}
            <div>
              <label className="block text-xs font-medium text-zinc-400 mb-1">
                Email Address
              </label>
              <input
                type="email"
                value={newEmail}
                onChange={(e) => setNewEmail(e.target.value)}
                placeholder="your@email.com"
                className="w-full px-4 py-2.5 bg-zinc-700 border border-zinc-600 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D85A30] transition"
              />
            </div>

            {/* Divider */}
            <div className="border-t border-zinc-700 pt-4">
              <p className="text-xs text-zinc-500 mb-4">
                Leave password fields blank to keep your current password.
              </p>

              {/* New Password */}
              <div className="space-y-4">
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    New Password
                  </label>
                  <input
                    type="password"
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    placeholder="Min. 8 characters"
                    className="w-full px-4 py-2.5 bg-zinc-700 border border-zinc-600 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D85A30] transition"
                  />
                </div>

                {/* Confirm Password */}
                <div>
                  <label className="block text-xs font-medium text-zinc-400 mb-1">
                    Confirm New Password
                  </label>
                  <input
                    type="password"
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder="Repeat new password"
                    className="w-full px-4 py-2.5 bg-zinc-700 border border-zinc-600 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D85A30] transition"
                  />
                </div>
              </div>
            </div>

            {/* Feedback messages */}
            {errorMsg && (
              <div className="bg-zinc-700 border border-red-500 rounded-xl px-5 py-3 text-sm text-red-400">
                {errorMsg}
              </div>
            )}
            {successMsg && (
              <div className="bg-zinc-700 border border-green-500 rounded-xl px-5 py-3 text-sm text-green-400">
                {successMsg}
              </div>
            )}

            {/* Save button */}
            <button
              type="submit"
              disabled={saving}
              className="w-full py-3 bg-[#D85A30] hover:bg-[#c04f28] disabled:opacity-50 text-white font-semibold rounded-xl transition"
            >
              {saving ? "Saving…" : "Save Changes"}
            </button>

          </form>
        </div>

        {/* Sign out */}
        <button
          onClick={handleLogout}
          className="mt-4 w-full text-zinc-500 hover:text-red-400 text-sm text-center transition"
        >
          Sign out
        </button>

      </main>
    </div>
  );
}
