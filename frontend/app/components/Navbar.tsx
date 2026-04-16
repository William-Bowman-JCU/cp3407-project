"use client";

import Link from "next/link";
import { useCart } from "../context/CartContext";
import { useState, useEffect } from "react";

export default function Navbar() {
  const { totalItems } = useCart();
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  return (
    <nav className="bg-zinc-800 border-b-2 border-[#D85A30] shadow-md">
      <div className="flex items-center justify-between px-8 py-4">
        <Link href="/" className="font-extrabold text-2xl tracking-tight">
          <span className="text-white">Feed</span>
          <span className="text-[#D85A30]">Me</span>
        </Link>

        <div className="flex items-center gap-6">
          <Link href="/browse" className="text-zinc-300 hover:text-white text-sm transition">
            Browse
          </Link>
          <Link href="/orders" className="text-zinc-300 hover:text-white text-sm transition">
            Orders
          </Link>
          <Link href="/delivery" className="text-zinc-300 hover:text-white text-sm transition">
            Delivery
          </Link>
          <Link href="/checkout" className="text-zinc-300 hover:text-white text-sm transition">
            Checkout
          </Link>
          <Link href="/cart" className="relative text-zinc-300 hover:text-white transition">
            🛒
            {mounted && totalItems > 0 && (
              <span className="absolute -top-2 -right-2 bg-[#D85A30] text-white text-xs font-bold rounded-full w-4 h-4 flex items-center justify-center">
                {totalItems}
              </span>
            )}
          </Link>
          <Link href="/account" className="text-zinc-300 hover:text-white transition">
            👤
          </Link>
        </div>
      </div>
    </nav>
  );
}
