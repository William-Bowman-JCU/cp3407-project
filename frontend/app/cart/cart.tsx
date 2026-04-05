"use client";

import React from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import {useState} from 'react';


export type cartItem = { //'cartItem' is the const for each item in the shopping cart
    id: number;
    name: string;
    quantity: number;
    price: number;
}


export default function CartPage() {
    const [isLoading, setIsLoading] = React.useState(false);
    
    const [items, setItemsRaw] = useState<cartItem[]>(() => {
        //state for cart items, initially empty array
        const saved = localStorage.getItem("cart");
        return saved ? JSON.parse(saved) : [];
    });

    if(isLoading){
        return <div className='text-white text-center py-20'>Loading...</div>;
    }

    const setItems = (newItems: cartItem[]) => {
        localStorage.setItem("cart", JSON.stringify(newItems));
        setItemsRaw(newItems);
    };

    

    const updateQuantity = (id: number, quantity: number) => {};

    const removeItem = (id: number) => {};




    
    //Check out Nav
    const router = useRouter();

    const handleCheckout = () => {
    router.push("/checkout"); //checkout page route
    }

  return (
    <div className='min-h-screen text-white py-12'>
        <main className='max-w-6xl mx-auto px-6'>
            <h1 className='text-4xl mb-2 font-bold text-center tracking-wide'>Cart</h1>

            <div className='grid grid-cols-1 lg:grid-cols-3 gap-8'>
                {/* Cart Items */}
                <div className='lg:col-span-2 shadow-lg rounded-2xl p-8 bg-zinc-800'>
                    {items.length === 0 ? (
                         <div className='bg-gray-800 rounded-2xl p-12 text-center'>
                                <p className='text-gray-400 text-lg mb-6'>Your cart is empty</p>
                                <Link
                                    href="/"
                                    className='inline-block bg-red-600 hover:bg-red-700 px-8 py-3 rounded-lg font-semibold transition'
                                >
                                    Continue Shopping
                                </Link>
                            </div>
                    ): (
                            <div className='space-y-4'>
                                {items.map(item => (
                                    <div
                                        key={item.id}
                                        className='bg-gray-800 rounded-xl p-6 flex items-center justify-between gap-4'
                                    >
                                        <div className='flex-1'>
                                            <h3 className='text-white font-semibold text-lg'>{item.name}</h3>
                                            <p className='text-gray-400'>${item.price.toFixed(2)} each</p>
                                        </div>

                                        <div className='flex items-center gap-6'>
                                            {/* Quantity Controls */}
                                            <div className='flex items-center gap-2 bg-gray-700 rounded-lg p-2'>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity - 1)}
                                                    className='w-8 h-8 flex items-center justify-center hover:bg-gray-600 rounded transition text-red-400'
                                                >
                                                    −
                                                </button>
                                                <span className='w-6 text-center font-semibold'>{item.quantity}</span>
                                                <button
                                                    onClick={() => updateQuantity(item.id, item.quantity + 1)}
                                                    className='w-8 h-8 flex items-center justify-center hover:bg-gray-600 rounded transition text-green-400'
                                                >
                                                    +
                                                </button>
                                            </div>

                                            {/* Item Total */}
                                            <div className='w-24 text-right'>
                                                <p className='text-red-400 font-bold'>
                                                    ${(item.price * item.quantity).toFixed(2)}
                                                </p>
                                            </div>

                                            {/* Remove Button */}
                                            <button
                                                onClick={() => removeItem(item.id)}
                                                className='text-gray-400 hover:text-red-500 font-semibold transition'
                                            >
                                                Remove
                                            </button>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                </div>
            </div>
        </main>

        {/* <button onClick={handleCheckout}>Checkout</button> */}
    </div>
  );
}


//room for nav and footer