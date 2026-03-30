import Link from "next/link";

export default function HomePage() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center px-6 text-center">
      <h1 className="text-5xl font-extrabold mb-4">
        <span className="text-white">Feed</span>
        <span className="text-red-500">Me</span>
      </h1>

      <p className="text-zinc-400 text-lg mb-10 max-w-md">
        Order food from your favourite restaurants — fast, simple, delicious.
      </p>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full max-w-lg">
        <Link
          href="/browse"
          className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-xl px-6 py-5 text-left transition"
        >
          <div className="text-2xl mb-2">🍕</div>
          <div className="text-white font-semibold">Browse Restaurants</div>
          <div className="text-zinc-400 text-sm">Find food near you</div>
        </Link>

        <Link
          href="/login"
          className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-xl px-6 py-5 text-left transition"
        >
          <div className="text-2xl mb-2">👤</div>
          <div className="text-white font-semibold">Sign In</div>
          <div className="text-zinc-400 text-sm">Access your account</div>
        </Link>

        <Link
          href="/cart"
          className="bg-zinc-800 hover:bg-zinc-700 border border-zinc-600 rounded-xl px-6 py-5 text-left transition"
        >
          <div className="text-2xl mb-2">🛒</div>
          <div className="text-white font-semibold">View Cart</div>
          <div className="text-zinc-400 text-sm">Review your order</div>
        </Link>

        <Link
          href="/checkout"
          className="bg-red-600 hover:bg-red-700 rounded-xl px-6 py-5 text-left transition"
        >
          <div className="text-2xl mb-2">💳</div>
          <div className="text-white font-semibold">Checkout</div>
          <div className="text-red-200 text-sm">Complete your order</div>
        </Link>
      </div>
    </div>
  );
}
