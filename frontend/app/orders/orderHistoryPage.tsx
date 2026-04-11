"use client";

import React from 'react';
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useState } from 'react';
import { useEffect } from 'react';



function orderCard(){

    return(
        <div className='bg-zinc-800 rounded-2xl transitions-all overflow-hidden duration-300'>

        </div>
    )
}

export default function OrderHistoryPage() {
    const router = useRouter();
    const  [orders, setOrders] = useState([]);
    const [isLoading, setIsLoading] = useState(true);
    const [isError, setIsError] = useState(false);

    useEffect(() => {
        async function fetchOrders(){
        try {
        // Fetch Data
            const orderData = await fetch("http://localhost:8000/api/orders/", {
                credentials: "include",
            });

            if (orderData.status == 400){
                router.push("/login");
                return;
            }

            const data = await orderData.json();
            setOrders(data);

        } catch(err){
            setIsError("Could not fetch orders, please try again");
        } finally {
            setIsLoading(false);
        }
    }

    fetchOrders();

    }, []);

    return (
        <div className='min-h-screen text-white'>
            <main className='max-w-3xl mx-auto px-6 py-10'>
                <h1 className='text-3xl font-bold text-center mb-10 tracking-wise'>
                    Your Order History:   
                    {/* Could/need to replace 'Your' with the users logged in username or name */}
                </h1>

                {isLoading && (
                    <div className='text-center text-zinc-400 py-20'>Loading Orders...</div>
                )}






            </main>
        </div>

        );
    }


