"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import CheckoutForm, { type PaymentFormData } from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../context/CartContext";

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const { items, clearCart } = useCart();

  async function handlePayment(formData: PaymentFormData) {
    setIsLoading(true);
    await new Promise((resolve) => setTimeout(resolve, 1500));
    const orderId = "ORD-" + Math.random().toString(36).slice(2, 8).toUpperCase();
    clearCart();
    router.push(`/confirmation?orderId=${orderId}`);
  }

  return (
    <div className="min-h-screen text-white">
      <main className="max-w-5xl mx-auto px-6 py-10">
        <h1 className="text-3xl font-bold text-center mb-10 tracking-wide">
          Checkout
        </h1>

        {items.length === 0 ? (
          <div className="text-center text-zinc-400 py-20">
            <p className="text-xl mb-4">Your cart is empty.</p>
            <button
              onClick={() => router.push("/browse")}
              className="bg-red-600 hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition"
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-zinc-300 text-sm uppercase tracking-widest mb-6">
                Payment Details
              </h2>
              <CheckoutForm onSubmit={handlePayment} isLoading={isLoading} />
            </div>

            <div className="shadow-lg">
              <OrderSummary items={items} />
            </div>
          </div>
        )}
      </main>
    </div>
  );
}
