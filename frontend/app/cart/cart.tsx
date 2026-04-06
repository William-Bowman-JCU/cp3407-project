"use client";

import React from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useCart } from '../context/CartContext'; //cart data
import OrderSummary from '../components/OrderSummary';



export default function CartPage() {
    const [isLoading, setIsLoading] = React.useState(false);
    const { items, removeItem, updateQuantity } = useCart();

    const updateQuantityFunc = (id: number, quantity: number) => {
        setIsLoading(true);
        updateQuantity(id, quantity); //calling update func from CartContect
        setIsLoading(false);
    }

    const removeItemFunc = (id: number) => {
        removeItem(id); //calling function from CartContext
    };

    //Check out Nav
    const router = useRouter();

    const handleCheckout = () => {
        router.push("/checkout"); //checkout page route
    }

    return (
        <div className='min-h-screen text-white py-12'>
            <main className='max-w-6xl mx-auto px-6 py-8'>
                <h1 className='text-4xl mb-2 font-bold text-center tracking-wide'>
                    Cart
                </h1>

                {/* Cart Check */}
                {items.length === 0 ? (
                    <div className='tex-center py-20'>
                        <p className='text-xl mb-4'>Cart is Empty!</p>
                        <Link href="/"
                            className='inline-block bg-red-600 text-white font-bold px-8 py-2.5 rounded-lg transition'>
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className='grid grid-cols-1 md:grid-cols-2 gap-8'>
                            <div className='bg-slate-700 rounded-2xl p-8'>
                                <h2 className='text-slate-300 text-sm uppercase tracking-widest mb-6'>
                                    Your Cart
                                </h2>
                                <div className='space-y-4'>
                                    {items.map((item) => (
                                        <div className='bg-slate-600 rounded-xl p-4 hover:bg-slate-500 transition'>

                                        </div>
                                    ))}
                                </div>
                            </div>

                            <div className='bg-slate-700 rounded-2xl p-7 top-8 sticky'>
                                <OrderSummary items={items} />
                                <button className='w-full bg-red-600'>
                                    Checkout
                                </button>
                            </div>
                        </div>
                    </>)}
            </main>
        </div>
    );
}


//room for nav and footer