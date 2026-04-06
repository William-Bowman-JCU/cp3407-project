"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";

export default function Navbar() {
  const { totalItems } = useCart();

  return (
    <nav className="bg-zinc-800 border-b-2 border-red-600 shadow-md">
      <div className="flex items-center justify-between px-8 py-4">
        <Link href="/" className="font-extrabold text-2xl tracking-tight">
          <span className="text-white">Feed</span>
          <span className="text-red-500">Me</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/browse" className="text-zinc-300 hover:text-white text-sm transition">
            Browse
          </Link>
          <Link href="/checkout" className="text-zinc-300 hover:text-white text-sm transition">
            Checkout
          </Link>
          <Link href="/cart" className="relative text-zinc-300 hover:text-white transition">
            🛒
            {totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-red-600 text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href="/login" className="text-zinc-300 hover:text-white transition">
            👤
          </Link>
        </div>
      </div>
    </nav>
  );
}
