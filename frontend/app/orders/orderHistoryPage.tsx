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

    useEffect() => {
        // Fetch Data
        try {
            
        }
    }
}

