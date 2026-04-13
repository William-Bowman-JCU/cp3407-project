"use client";

import Image from "next/image";

type Dish = {
  id: number;
  name: string;
  price: number;
  image: string;
};

type Props = {
  restaurantName: string;
  menu: Dish[];
  cartCount: number;
  showCart: boolean;
  setShowCart: (val: boolean) => void;
  addToCart: () => void;
};

export default function MenuTemplate({
  restaurantName,
  menu,
  cartCount,
  showCart,
  setShowCart,
  addToCart,
}: Props) {
  return (
    <div className="min-h-screen bg-gray-200 flex justify-center items-start p-6">
      <div className="w-full max-w-5xl bg-[#3a3333] rounded-lg shadow-lg overflow-hidden">

        {/* Header */}
        <div className="bg-[#2f2929] text-white px-6 py-4 flex justify-between items-center border-b border-red-500">
          <h1 className="text-xl font-bold">{restaurantName}</h1>
          <button onClick={() => setShowCart(!showCart)} className="relative text-xl">
            🛒
            <span className="absolute -top-2 -right-3 bg-red-500 text-white text-xs w-5 h-5 flex items-center justify-center rounded-full">
              {cartCount}
            </span>
          </button>
        </div>

        {/* Cart */}
        {showCart && (
          <div className="absolute right-10 mt-2 w-60 bg-white p-4 rounded shadow">
            <h3 className="font-semibold">Cart</h3>
            <p>Total Items: {cartCount}</p>
          </div>
        )}

        {/* Content */}
        <div className="p-6">
          <p className="text-white mb-4">What can we get you?</p>

          <div className="bg-gray-300 rounded-lg p-6">
            <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-6">
              {menu.map(dish => (
                <div key={dish.id} className="flex flex-col items-center">
                  <Image
                    onClick={addToCart}
                    src={dish.image}
                    alt={dish.name}
                    width={80}
                    height={80}
                    className="rounded-lg cursor-pointer hover:scale-105 transition"
                  />
                  <p className="mt-2 text-sm text-center font-medium">{dish.name}</p>
                  <p className="text-xs text-gray-700">${dish.price}</p>
                </div>
              ))}
            </div>

            <div className="mt-6 flex justify-center">
              <button
                onClick={() => setShowCart(true)}
                className="bg-green-500 text-white px-6 py-3 rounded-lg flex items-center gap-2"
              >
                🛒 VIEW CART
                <span className="bg-red-500 rounded-full w-5 h-5 text-xs flex items-center justify-center">
                  {cartCount}
                </span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}