"use client";

import { useEffect, useState } from "react";
import { useParams, useRouter } from "next/navigation";
import Link from "next/link";
import { getRestaurantDetail, RestaurantDetail, MenuItem } from "../../services/api";
import { useCart } from "../../context/CartContext";

// Group menu items by their category field
function groupByCategory(items: MenuItem[]): Record<string, MenuItem[]> {
  return items.reduce<Record<string, MenuItem[]>>((acc, item) => {
    const key = item.category || "Other";
    if (!acc[key]) acc[key] = [];
    acc[key].push(item);
    return acc;
  }, {});
}

export default function RestaurantMenuPage() {
  const params = useParams();
  const router = useRouter();
  const restaurantId = Number(params.id);

  const { addItem, totalItems, totalPrice } = useCart();

  const [restaurant, setRestaurant] = useState<RestaurantDetail | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");
  const [addedId, setAddedId] = useState<number | null>(null);

  useEffect(() => {
    if (!restaurantId) return;
    getRestaurantDetail(restaurantId)
      .then(setRestaurant)
      .catch(() => setError("Could not load menu. Please try again."))
      .finally(() => setLoading(false));
  }, [restaurantId]);

  function handleAddToCart(item: MenuItem) {
    addItem({
      id: item.id,
      name: item.name,
      price: parseFloat(item.price),
      restaurantId,
    });
    // Brief visual feedback
    setAddedId(item.id);
    setTimeout(() => setAddedId(null), 800);
  }

  // ── Loading state ──────────────────────────────────────────────────────────
  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center text-zinc-400">
        Loading menu…
      </div>
    );
  }

  // ── Error state ────────────────────────────────────────────────────────────
  if (error || !restaurant) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center gap-4 text-zinc-400">
        <p>{error || "Restaurant not found."}</p>
        <button
          onClick={() => router.push("/browse")}
          className="text-[#D85A30] hover:underline text-sm"
        >
          ← Back to restaurants
        </button>
      </div>
    );
  }

  const grouped = groupByCategory(
    restaurant.menu_items.filter((i) => i.is_available)
  );
  const categories = Object.keys(grouped);

  // ── Page ───────────────────────────────────────────────────────────────────
  return (
    <div className="min-h-screen text-white pb-28">

      {/* ── Restaurant Hero ─────────────────────────────────────────────── */}
      <div className="bg-zinc-800 border-b border-zinc-700 px-6 py-6">
        <Link href="/browse" className="text-zinc-400 hover:text-white text-sm transition">
          ← All restaurants
        </Link>

        <div className="mt-4 flex items-start justify-between gap-4">
          <div>
            <h1 className="text-3xl font-bold">{restaurant.name}</h1>
            {/* <p className="text-zinc-400 text-sm mt-1">{restaurant.cuisine_type}</p> */}
            <p className="text-zinc-500 text-xs mt-1">{restaurant.address}</p>
          </div>

          <div className="text-right shrink-0">
            <span className="text-yellow-400 font-bold text-lg">
              ★ {restaurant.rating?.toFixed(1) ?? "—"}
            </span>
            <p className="text-zinc-500 text-xs mt-1">
              {restaurant.opening_time?.slice(0, 5)} – {restaurant.closing_time?.slice(0, 5)}
            </p>
          </div>
        </div>
      </div>

      {/* ── Menu ────────────────────────────────────────────────────────── */}
      <main className="max-w-3xl mx-auto px-6 py-8 space-y-10">

        {categories.length === 0 && (
          <p className="text-zinc-500 text-center py-16">
            No items available right now.
          </p>
        )}

        {categories.map((category) => (
          <section key={category}>

            {/* Category heading */}
            <div className="flex items-center gap-3 mb-4">
              <h2 className="font-semibold text-white uppercase tracking-widest text-sm">
                {category}
              </h2>
              <div className="flex-1 h-px bg-zinc-700" />
            </div>

            {/* Items */}
            <div className="space-y-3">
              {grouped[category].map((item) => {
                const justAdded = addedId === item.id;
                return (
                  <div
                    key={item.id}
                    className="bg-zinc-800 rounded-xl px-5 py-4 flex items-center justify-between gap-4 border border-zinc-700 hover:border-zinc-500 transition"
                  >
                    {/* Info */}
                    <div className="flex-1 min-w-0">
                      <p className="font-semibold text-white">{item.name}</p>
                      {item.description && (
                        <p className="text-zinc-400 text-sm mt-0.5 line-clamp-2">
                          {item.description}
                        </p>
                      )}
                      <p className="text-[#D85A30] font-bold mt-1">
                        ${parseFloat(item.price).toFixed(2)}
                      </p>
                    </div>

                    {/* Add button */}
                    <button
                      onClick={() => handleAddToCart(item)}
                      className={`shrink-0 w-9 h-9 rounded-full flex items-center justify-center font-bold text-lg transition
                        ${justAdded
                          ? "bg-green-600 text-white scale-110"
                          : "bg-[#D85A30] hover:bg-[#c04f28] text-white"
                        }`}
                    >
                      {justAdded ? "✓" : "+"}
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        ))}
      </main>

      {/* ── Sticky Cart Bar (only when cart has items) ───────────────────── */}
      {totalItems > 0 && (
        <div className="fixed bottom-0 left-0 right-0 bg-zinc-900 border-t border-zinc-700 px-6 py-4">
          <div className="max-w-3xl mx-auto flex items-center justify-between gap-4">
            <div>
              <p className="text-white font-semibold">
                {totalItems} item{totalItems !== 1 ? "s" : ""} in cart
              </p>
              <p className="text-zinc-400 text-sm">
                ${totalPrice.toFixed(2)} total
              </p>
            </div>
            <Link
              href="/cart"
              className="bg-[#D85A30] hover:bg-[#c04f28] text-white font-semibold px-6 py-3 rounded-xl transition"
            >
              View Cart →
            </Link>
          </div>
        </div>
      )}
    </div>
  );
}
