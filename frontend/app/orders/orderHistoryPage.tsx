"use client";

import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import Link from "next/link";
import { getOrders, Order, ApiError } from "../services/api";

// Status badge colours
const STATUS_STYLES: Record<string, string> = {
  pending:     "bg-yellow-900 text-yellow-300",
  confirmed:   "bg-blue-900 text-blue-300",
  preparing:   "bg-orange-900 text-orange-300",
  on_the_way:  "bg-purple-900 text-purple-300",
  delivered:   "bg-green-900 text-green-300",
  cancelled:   "bg-red-900 text-red-400",
};

function statusLabel(status: string) {
  return status.replace(/_/g, " ").replace(/\b\w/g, (c) => c.toUpperCase());
}

function formatDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-AU", {
    day: "numeric", month: "short", year: "numeric",
    hour: "2-digit", minute: "2-digit",
  });
}

export default function OrderHistoryPage() {
  const router = useRouter();
  const [orders,    setOrders]    = useState<Order[]>([]);
  const [isLoading, setIsLoading] = useState(true);
  const [errorMsg,  setErrorMsg]  = useState("");

  useEffect(() => {
    getOrders()
      .then(setOrders)
      .catch((err) => {
        if (err instanceof ApiError && err.status === 401) {
          router.push("/login");
        } else {
          setErrorMsg("Could not load your orders. Please try again.");
        }
      })
      .finally(() => setIsLoading(false));
  }, [router]);

  return (
    <div className="min-h-screen text-white">
      <main className="max-w-3xl mx-auto px-6 py-10">

        {/* Header */}
        <div className="mb-8">
          <Link href="/" className="text-zinc-400 hover:text-white text-sm transition">
            ← Back
          </Link>
          <h1 className="text-3xl font-bold mt-4">Order History</h1>
          <p className="text-zinc-400 text-sm mt-1">All your past orders</p>
        </div>

        {/* Loading */}
        {isLoading && (
          <div className="text-center text-zinc-400 py-20">
            Loading your orders…
          </div>
        )}

        {/* Error */}
        {!isLoading && errorMsg && (
          <div className="bg-zinc-800 border border-red-500 rounded-xl px-6 py-4 text-red-400 text-sm">
            {errorMsg}
          </div>
        )}

        {/* Empty state */}
        {!isLoading && !errorMsg && orders.length === 0 && (
          <div className="text-center text-zinc-400 py-20">
            <p className="text-xl mb-4">No orders yet.</p>
            <Link
              href="/browse"
              className="bg-[#D85A30] hover:bg-[#c04f28] text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              Browse Restaurants
            </Link>
          </div>
        )}

        {/* Order list */}
        {!isLoading && !errorMsg && orders.length > 0 && (
          <div className="space-y-4">
            {orders.map((order) => (
              <div
                key={order.id}
                className="bg-zinc-800 rounded-2xl overflow-hidden border border-zinc-700"
              >
                {/* Order header */}
                <div className="px-6 py-4 flex items-center justify-between gap-4 border-b border-zinc-700">
                  <div>
                    <p className="font-semibold text-white">
                      Order #{order.id}
                    </p>
                    <p className="text-zinc-400 text-xs mt-0.5">
                      {formatDate(order.placed_at)}
                    </p>
                  </div>
                  <span
                    className={`text-xs font-semibold px-3 py-1 rounded-full ${
                      STATUS_STYLES[order.status] ?? "bg-zinc-700 text-zinc-300"
                    }`}
                  >
                    {statusLabel(order.status)}
                  </span>
                </div>

                {/* Items */}
                <div className="px-6 py-4 space-y-2">
                  {order.items.map((item) => (
                    <div
                      key={item.id}
                      className="flex justify-between text-sm"
                    >
                      <span className="text-zinc-300">
                        {item.quantity}x {item.menu_item.name}
                      </span>
                      <span className="text-zinc-400">
                        ${parseFloat(item.line_total).toFixed(2)}
                      </span>
                    </div>
                  ))}
                </div>

                {/* Footer */}
                <div className="px-6 py-4 bg-zinc-900 flex items-center justify-between text-sm">
                  <span className="text-zinc-400">
                    Delivery: ${parseFloat(order.delivery_fee).toFixed(2)}
                  </span>
                  <span className="font-bold text-white">
                    Total: ${parseFloat(order.total).toFixed(2)}
                  </span>
                </div>
              </div>
            ))}
          </div>
        )}

      </main>
    </div>
  );
}
