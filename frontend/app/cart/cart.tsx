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
    const [isLoading, setIsLoading] = React.useState(true);
    const [items, setItems] = useState<cartItem[]>([]); //state for cart items, initially empty array

    //Check out Nav
    const router = useRouter();

    const handleCheckout = () => {
    router.push("/checkout"); //checkout page route
    }

  return (
    <div className=''>


        <button onClick={handleCheckout}>Checkout</button>
    </div>
  );
}


//room for nav and footer