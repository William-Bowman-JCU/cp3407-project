"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm, { type PaymentFormData } from "../components/CheckoutForm";
import OrderSummary, { type CartItem } from "../components/OrderSummary";

const MOCK_CART_ITEMS: CartItem[] = [
  { id: 1, name: "Margherita Pizza", quantity: 1, price: 12.99 },
  { id: 2, name: "Garlic Bread",     quantity: 2, price:  3.49 },
  { id: 3, name: "Cola (500ml)",     quantity: 2, price:  2.99 },
];

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);

  async function handlePayment(formData: PaymentFormData) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const orderId = "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    router.push(`/confirmation?orderId=${orderId}`);
  }

  return (
    <div className="min-h-screen bg-zinc-900 text-white">
      <nav className="bg-zinc-800 shadow-md border-b-2 border-red-600">
        <div className="flex items-center justify-between px-8 py-4">
          <span className="font-extrabold text-2xl tracking-tight">
            <span className="text-white">Feed</span>
            <span className="text-red-500">Me</span>
          </span>
          <div className="flex items-center gap-4">
            <button aria-label="Cart" className="text-zinc-300 hover:text-white transition">
              🛒
            </button>
            <button aria-label="Profile" className="text-zinc-300 hover:text-white transition">
              👤
            </button>
          </div>
        </div>
      </nav>

      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-center mb-10 tracking-wide">
          Checkout
        </h1>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="bg-zinc-800 rounded-2xl p-8 shadow-lg">
            <h2 className="text-zinc-300 text-sm uppercase tracking-widest mb-6">
              Payment Details
            </h2>
            <CheckoutForm onSubmit={handlePayment} isLoading={isLoading} />
          </div>

          <div className="shadow-lg">
            <OrderSummary items={MOCK_CART_ITEMS} />
          </div>
        </div>
      </main>
    </div>
  );
}
