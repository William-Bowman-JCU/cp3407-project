"use client";

import { useSearchParams, useRouter } from "next/navigation";
import { Suspense } from "react";

function ConfirmationContent() {
  const searchParams = useSearchParams();
  const router = useRouter();

  const orderId = searchParams.get("orderId") ?? "ORD-UNKNOWN";

  return (
    <div className="min-h-screen bg-zinc-900 flex items-center justify-center px-4">
      <div className="bg-zinc-800 rounded-2xl shadow-2xl p-10 max-w-md w-full text-center flex flex-col items-center gap-6">
        <div className="w-20 h-20 bg-green-500 rounded-full flex items-center justify-center text-4xl shadow-lg">
          ✓
        </div>

        <h1 className="text-white text-3xl font-bold">Payment Successful!</h1>

        <p className="text-zinc-400 text-base">
          Thank you for your order. We&apos;re preparing your food now!
        </p>

        <div className="bg-zinc-700 rounded-xl px-6 py-4 w-full">
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">
            Order ID
          </p>
          <p className="text-red-400 font-mono font-bold text-xl">
            {orderId}
          </p>
        </div>

        <div className="bg-zinc-700 rounded-xl px-6 py-4 w-full">
          <p className="text-zinc-400 text-xs uppercase tracking-widest mb-1">
            Estimated Delivery
          </p>
          <p className="text-white font-semibold text-base">30 – 45 minutes</p>
        </div>

        <div className="flex flex-col gap-3 w-full mt-2">
          <button
            onClick={() => router.push("/")}
            className="w-full bg-red-600 hover:bg-red-700 text-white font-bold py-3 rounded-xl uppercase tracking-widest transition-colors"
          >
            Track My Order
          </button>

          <button
            onClick={() => router.push("/")}
            className="w-full bg-zinc-700 hover:bg-zinc-600 text-zinc-300 font-semibold py-3 rounded-xl transition-colors"
          >
            Back to Home
          </button>
        </div>
      </div>
    </div>
  );
}

export default function ConfirmationPage() {
  return (
    <Suspense
      fallback={
        <div className="min-h-screen bg-zinc-900 flex items-center justify-center text-white">
          Loading...
        </div>
      }
    >
      <ConfirmationContent />
    </Suspense>
  );
}
