/**
 * Checkout Page  — /checkout
 *
 * User Story #7: Payment & Confirmation
 *
 * Layout (based on Miro design):
 * ┌──────────────────────────────────────────────────┐
 * │              🛒  Checkout             👤          │
 * ├──────────────────────┬───────────────────────────┤
 * │   Payment Form       │   Order Summary           │
 * │   Card Name          │   Item 1        $x.xx     │
 * │   Card Number        │   Item 2        $x.xx     │
 * │   Month  |  Year     │   ─────────────────────   │
 * │   [ ] Notifications  │   Total         $x.xx     │
 * │   [PAY]              │                           │
 * └──────────────────────┴───────────────────────────┘
 *
 * Iteration 2: Mock cart data, frontend-only payment simulation.
 * Future:      Connect to Django backend to read real cart + save order.
 */

"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm, { type PaymentFormData } from "../components/CheckoutForm";
import OrderSummary, { type CartItem } from "../components/OrderSummary";

// ---------------------------------------------------------------------------
// Mock cart data
// TODO (Future): Replace with real cart from API or global state (e.g. Context)
// ---------------------------------------------------------------------------
const MOCK_CART_ITEMS: CartItem[] = [
  { id: 1, name: "Margherita Pizza",   quantity: 1, price: 12.99 },
  { id: 2, name: "Garlic Bread",       quantity: 2, price:  3.49 },
  { id: 3, name: "Cola (500ml)",       quantity: 2, price:  2.99 },
];

// ---------------------------------------------------------------------------
// Page Component
// ---------------------------------------------------------------------------

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  /**
   * Called when the user clicks PAY and the form passes validation.
   * Simulates a payment delay, then navigates to the confirmation page.
   *
   * Future: Send formData + cart items to Django API here.
   */
  async function handlePayment(formData: PaymentFormData) {
    setIsLoading(true);

    // Simulate a network request (e.g. 1.5 seconds)
    // Future: replace with a real fetch() to Django backend
    await new Promise((resolve) => setTimeout(resolve, 1500));

    // Build a simple mock order ID
    const orderId = "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();

    // Navigate to confirmation page, passing the order ID via query param
    router.push(`/confirmation?orderId=${orderId}`);
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">

      {/* ── Top Navigation Bar ─────────────────────────────────────── */}
      <nav className="bg-zinc-800 shadow-md border-b-2 border-red-600">
        <div className="flex items-center justify-between px-8 py-4">
          {/* App Name / Logo — "Feed" white, "Me" red */}
          <span className="font-extrabold text-2xl tracking-tight">
            <span className="text-white">Feed</span>
            <span className="text-red-500">Me</span>
          </span>

          {/* Right icons */}
          <div className="flex items-center gap-4">
            {/* Cart icon */}
            <button aria-label="Cart" className="text-zinc-300 hover:text-white transition">
              🛒
            </button>
            {/* User icon */}
            <button aria-label="Profile" className="text-zinc-300 hover:text-white transition">
              👤
            </button>
          </div>
        </div>
      </nav>

      {/* ── Main Content ───────────────────────────────────────────── */}
      <main className="max-w-5xl mx-auto px-6 py-10">

        {/* Page Title */}
        <h1 className="text-3xl font-bold text-center mb-10 tracking-wide">
          Checkout
        </h1>

        {/* Two-Column Layout: Form | Summary */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">

          {/* Left: Payment Form */}
          <div className="bg-zinc-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-zinc-300 text-sm uppercase tracking-widest mb-6">
              Payment Details
            </h2>
            <CheckoutForm onSubmit={handlePayment} isLoading={isLoading} />
          </div>

          {/* Right: Order Summary */}
          <div className="shadow-lg">
            <OrderSummary items={MOCK_CART_ITEMS} />
          </div>

        </div>
      </main>
    </div>
  );
}
