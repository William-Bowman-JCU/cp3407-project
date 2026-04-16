"use client";

import { useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import CheckoutForm, { type PaymentFormData } from "../components/CheckoutForm";
import OrderSummary from "../components/OrderSummary";
import { useCart } from "../context/CartContext";
import { createAddress, createOrder, ApiError } from "../services/api";

export default function CheckoutPage() {
  const router = useRouter();
  const [isLoading, setIsLoading] = useState(false);
  const [apiError, setApiError] = useState<string | null>(null);
  const [needsLogin, setNeedsLogin] = useState(false);
  const { items, clearCart } = useCart();

  async function handlePayment(formData: PaymentFormData) {
    setIsLoading(true);
    setApiError(null);
    setNeedsLogin(false);

    try {
      const address = await createAddress({
        street: formData.street,
        city: formData.city,
        postcode: formData.postalCode,
      });

      const restaurantId = items.find((i) => i.restaurantId)?.restaurantId ?? 1;

      const order = await createOrder({
        restaurant: restaurantId,
        delivery_address: address.id,
        items: items.map((item) => ({
          menu_item: item.id,
          quantity: item.quantity,
          unit_price: item.price
        })),
      });

      clearCart();
      router.push(`/confirmation?orderId=ORD-${order.id}`);
    } catch (err) {
      if (err instanceof ApiError && err.status === 401) {
        setNeedsLogin(true);
      } else {
        setApiError("Something went wrong. Please try again.");
      }
    } finally {
      setIsLoading(false);
    }
  }
  console.log(items);
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
              className="bg-[#D85A30] hover:bg-red-700 text-white font-bold px-6 py-3 rounded-xl transition"
            >
              Browse Restaurants
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="bg-zinc-800 rounded-2xl p-8 shadow-lg">
              <h2 className="text-zinc-300 text-sm uppercase tracking-widest mb-6">
                Order Details
              </h2>

              {needsLogin && (
                <div className="mb-6 bg-zinc-700 border border-red-500 rounded-xl px-5 py-4 text-sm">
                  <p className="text-red-400 font-semibold mb-1">
                    Login required
                  </p>
                  <p className="text-zinc-300">
                    Please{" "}
                    <Link
                      href="/login"
                      className="text-red-400 underline hover:text-red-300 transition"
                    >
                      log in
                    </Link>{" "}
                    to place your order.
                  </p>
                </div>
              )}

              {apiError && (
                <div className="mb-6 bg-zinc-700 border border-red-500 rounded-xl px-5 py-4 text-sm text-red-400">
                  {apiError}
                </div>
              )}

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
