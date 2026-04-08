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

    // const testItems =[
    //     { id: 1, name: 'Pizza', price: 8.99, quantity: 1},
    //     { id: 2, name: 'Burger', price: 12.99, quantity: 1},
    // ];



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
                {/* TESTING */}
                {items.length === 0 ? (
                    <div className='text-center py-20'>
                        <p className='text-xl mb-4'>Cart is Empty!</p>
                        <Link href="/"
                            className='inline-block bg-red-600 text-white font-bold px-8 py-2.5 rounded-lg transition'>
                            Continue Shopping
                        </Link>
                    </div>
                ) : (
                    <>
                        {/* Cart Items */}
                        <div className='grid grid-cols-1 md:grid-cols-[70%_1fr] gap-8'>
                            <div className='bg-zinc-700 rounded-2xl p-8 '>
                                <h2 className='text-zinc-300 text-sm uppercase tracking-widest mb-6'>
                                    Your Cart
                                </h2>
                                <div className='space-y-4'>
                                    {items.map((item) => (
                                        <div 
                                        key={item.id}
                                        className='bg-zinc-600 rounded-xl p-4 hover:bg-zinc-500 transition'>
                                            <div className='flex-1'>
                                                <h3 className='text-white font-semibold'>{item.name}</h3>
                                                <p className='text-sm'>${item.price.toFixed(2)}</p>
                                            </div>
                                        </div>
                                    ))}
                                </div>
                            </div>

                            {/* Checkout */}
                            <div> 
                            <div className='bg-zinc-700 rounded-2xl p-7 top-8 sticky'>
                                <OrderSummary items={items} />
                                <button onClick={handleCheckout}
                                disabled={items.length === 0 || isLoading} 
                                className='w-full bg-red-600 text-white py-3 transition rounded-lg font-bold mt-4 hover:bg-red-700'>
                                    Checkout
                                </button>
                            </div>
                            </div>
                        </div>
                    </>)}
            </main>
        </div>
    );
}


//room for nav and footer