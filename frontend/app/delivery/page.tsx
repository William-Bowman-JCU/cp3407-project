"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import {
  getAddresses,
  createAddress,
  deleteAddress,
  setDefaultAddress,
  SavedAddress,
  ApiError,
} from "../services/api";

export default function DeliveryLocationPage() {
  const router = useRouter();

  const [addresses, setAddresses]   = useState<SavedAddress[]>([]);
  const [loading,   setLoading]     = useState(true);
  const [saving,    setSaving]      = useState(false);
  const [errorMsg,  setErrorMsg]    = useState("");
  const [showForm,  setShowForm]    = useState(false);

  // New address form state
  const [street,  setStreet]  = useState("");
  const [suburb,  setSuburb]  = useState("");
  const [city,    setCity]    = useState("");
  const [postcode, setPostcode] = useState("");

  // ── Fetch addresses on mount ─────────────────────────────────────────────
  useEffect(() => {
    getAddresses()
      .then(setAddresses)
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.push("/login");
        } else {
          setErrorMsg("Could not load addresses. Please try again.");
        }
      })
      .finally(() => setLoading(false));
  }, [router]);

  // ── Add new address ──────────────────────────────────────────────────────
  async function handleAdd(e: React.FormEvent) {
    e.preventDefault();
    setErrorMsg("");
    setSaving(true);
    try {
      const created = await createAddress({
        street,
        suburb,
        city,
        postcode,
        is_default: addresses.length === 0, // first address becomes default
      });
      setAddresses((prev) => [...prev, created as unknown as SavedAddress]);
      setStreet(""); setSuburb(""); setCity(""); setPostcode("");
      setShowForm(false);
    } catch {
      setErrorMsg("Could not save address. Please try again.");
    } finally {
      setSaving(false);
    }
  }

  // ── Delete address ───────────────────────────────────────────────────────
  async function handleDelete(id: number) {
    try {
      await deleteAddress(id);
      setAddresses((prev) => prev.filter((a) => a.id !== id));
    } catch {
      setErrorMsg("Could not delete address.");
    }
  }

  // ── Set default ──────────────────────────────────────────────────────────
  async function handleSetDefault(addr: SavedAddress) {
    try {
      const updated = await setDefaultAddress(addr.id, addr);
      setAddresses((prev) =>
        prev.map((a) =>
          a.id === updated.id
            ? { ...updated, is_default: true }
            : { ...a, is_default: false }
        )
      );
    } catch {
      setErrorMsg("Could not update default address.");
    }
  }

  // ── Render ───────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen text-white">
      <main className="max-w-xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-zinc-400 hover:text-white text-sm transition">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold mt-4">Delivery Location</h1>
          <p className="text-zinc-400 text-sm mt-1">
            Manage your saved delivery addresses
          </p>
        </div>

        {/* Error */}
        {errorMsg && (
          <div className="mb-4 bg-zinc-800 border border-red-500 rounded-xl px-5 py-3 text-sm text-red-400">
            {errorMsg}
          </div>
        )}

        {/* Loading */}
        {loading && (
          <div className="text-zinc-400 text-center py-20">
            Loading addresses…
          </div>
        )}

        {/* Address list */}
        {!loading && (
          <div className="space-y-3 mb-6">
            {addresses.length === 0 && !showForm && (
              <div className="text-zinc-500 text-center py-10 bg-zinc-800 rounded-2xl">
                No saved addresses yet. Add one below.
              </div>
            )}

            {addresses.map((addr) => (
              <div
                key={addr.id}
                className={`bg-zinc-800 rounded-2xl px-5 py-4 border transition ${
                  addr.is_default
                    ? "border-[#D85A30]"
                    : "border-zinc-700 hover:border-zinc-500"
                }`}
              >
                <div className="flex items-start justify-between gap-4">
                  <div className="flex-1">
                    {addr.is_default && (
                      <span className="text-xs font-semibold text-[#D85A30] uppercase tracking-wide block mb-1">
                        ★ Default
                      </span>
                    )}
                    <p className="text-white font-medium">{addr.street}</p>
                    <p className="text-zinc-400 text-sm">
                      {[addr.suburb, addr.city, addr.postcode]
                        .filter(Boolean)
                        .join(", ")}
                    </p>
                  </div>

                  <div className="flex flex-col gap-2 shrink-0">
                    {!addr.is_default && (
                      <button
                        onClick={() => handleSetDefault(addr)}
                        className="text-xs text-zinc-400 hover:text-white transition"
                      >
                        Set default
                      </button>
                    )}
                    <button
                      onClick={() => handleDelete(addr.id)}
                      className="text-xs text-red-500 hover:text-red-400 transition"
                    >
                      Remove
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {/* Add new address form */}
        {showForm ? (
          <form
            onSubmit={handleAdd}
            className="bg-zinc-800 rounded-2xl p-6 space-y-4 border border-zinc-600"
          >
            <h2 className="text-zinc-300 text-sm uppercase tracking-widest">
              New Address
            </h2>

            {[
              { label: "Street", value: street, set: setStreet, required: true, placeholder: "123 Main St" },
              { label: "Suburb", value: suburb, set: setSuburb, required: false, placeholder: "Southbank" },
              { label: "City",   value: city,   set: setCity,   required: true, placeholder: "Brisbane" },
              { label: "Postcode", value: postcode, set: setPostcode, required: false, placeholder: "4000" },
            ].map(({ label, value, set, required, placeholder }) => (
              <div key={label}>
                <label className="block text-xs font-medium text-zinc-400 mb-1">
                  {label} {required && <span className="text-red-400">*</span>}
                </label>
                <input
                  type="text"
                  value={value}
                  onChange={(e) => set(e.target.value)}
                  required={required}
                  placeholder={placeholder}
                  className="w-full px-4 py-2.5 bg-zinc-700 border border-zinc-600 rounded-lg text-sm text-white placeholder-zinc-500 focus:outline-none focus:border-[#D85A30] transition"
                />
              </div>
            ))}

            <div className="flex gap-3 pt-2">
              <button
                type="submit"
                disabled={saving}
                className="flex-1 py-2.5 bg-[#D85A30] hover:bg-[#c04f28] disabled:opacity-50 text-white font-semibold rounded-xl transition text-sm"
              >
                {saving ? "Saving…" : "Save Address"}
              </button>
              <button
                type="button"
                onClick={() => setShowForm(false)}
                className="px-5 py-2.5 bg-zinc-700 hover:bg-zinc-600 text-zinc-300 rounded-xl transition text-sm"
              >
                Cancel
              </button>
            </div>
          </form>
        ) : (
          !loading && (
            <button
              onClick={() => setShowForm(true)}
              className="w-full py-3 border-2 border-dashed border-zinc-600 hover:border-[#D85A30] text-zinc-400 hover:text-white rounded-2xl transition text-sm font-medium"
            >
              + Add New Address
            </button>
          )
        )}

      </main>
    </div>
  );
}
