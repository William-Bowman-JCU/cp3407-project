"use client";

export type CartItem = {
  id: number;
  name: string;
  quantity: number;
  price: number;
};

type OrderSummaryProps = {
  items: CartItem[];
};

export default function OrderSummary({ items }: OrderSummaryProps) {
  const total = items.reduce(
    (sum, item) => sum + item.price * item.quantity,
    0
  );

  return (
    <div className="bg-zinc-700 rounded-xl p-6 h-full flex flex-col gap-4">
      <h2 className="text-white text-lg font-semibold uppercase tracking-wide">
        Total Items &amp; Price
      </h2>

      <div className="border-t border-zinc-500" />

      <ul className="flex flex-col gap-3 flex-1">
        {items.length === 0 ? (
          <li className="text-zinc-400 text-sm">Your cart is empty.</li>
        ) : (
          items.map((item) => (
            <li key={item.id} className="flex justify-between text-sm text-zinc-200">
              <span>
                {item.name}{" "}
                <span className="text-zinc-400">x{item.quantity}</span>
              </span>
              <span>${(item.price * item.quantity).toFixed(2)}</span>
            </li>
          ))
        )}
      </ul>

      <div className="border-t border-zinc-500" />

      <div className="flex justify-between items-center">
        <span className="text-white font-semibold text-base">Total</span>
        <span className="text-red-400 font-bold text-xl">
          ${total.toFixed(2)}
        </span>
      </div>
    </div>
  );
}
