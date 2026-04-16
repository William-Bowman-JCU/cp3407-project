"use client";

import { useRef, useEffect, useState } from 'react'
import { useRouter } from "next/navigation";
import { get } from 'http';
import { getRestaurants, RestaurantDetail, Cuisine, getCuisines, ApiError } from '../services/api';



export default function browsePage() {

    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)
    const [cuisines, setCuisines] = useState<Cuisine[]>([])
    const [restaurants, setRestaurants] = useState<RestaurantDetail[]>([])
    const [filters, setFilters] = useState({ cuisine: '' })
    const [errorMsg,  setErrorMsg]  = useState("");
    const [restaurantsLoading, setRestaurantsLoading] = useState(true);
    const [cuisinesLoading, setCuisinesLoading] = useState(true);

    // Scroll event handler to toggle arrow visibility
    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
        }
    }

    // Reset filter scroll position on page load
    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = 0
        }
    }, [])
    
    // Filter arrow scroll functionality
    const scroll = (dir: number) => {
        if (scrollRef.current) {
            scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' })
        }
    }
    
    // Fetch cuisines on mount, and restaurants when cuisine filter changes
    useEffect(() => {
        setCuisinesLoading(true);
        getCuisines()
        .then(setCuisines)
        .finally(() => setCuisinesLoading(false));
    }, [])

    useEffect(() => {
        if (!filters.cuisine || filters.cuisine.length === 0) {
            setRestaurants([]);
            setRestaurantsLoading(false);
            return;
        }

        setRestaurantsLoading(true);
        getRestaurants(filters.cuisine)
        .then(setRestaurants)
        .catch(() => {
            setErrorMsg("Could not load restaurants. Please try again.");
        })
        .finally(() => setRestaurantsLoading(false));
    }, [filters]);

    return (
        <div className="flex flex-col items-center gap-8 max-w-screen h-screen py-12 text-neutral-200">
            <div className="bg-zinc-600 text-zinc-300 min-w-md flex py-1 pl-4 rounded-2xl ">Search...</div>
            <div className="flex flex-row items-center gap-6">
                <button className='w-8 h-8 bg-zinc-400 border-0 rounded-full rotate-180 text-zinc-900'  
                    onClick={() => scroll(-1)} style={{ 
                        opacity: canScrollLeft ? 1 : 0, 
                        transition: 'opacity 100ms ease-out', 
                        pointerEvents: canScrollLeft ? 'auto' : 'none' 
                    }}>➜</button>
                <div ref={scrollRef} onScroll={handleScroll} className="flex flex-row gap-6 overflow-x-auto max-w-3xl scrollbar-hide">
                      
                    {cuisinesLoading ? (
                        <div className="flex flex-row gap-6">
                            {Array.from({ length: 6 }).map((_, i) => (
                                <div key={i} className="flex flex-col items-center">
                                    <div className="w-18 h-18 bg-zinc-800 border-0 rounded-full animate-pulse" />
                                    <div className="h-4 bg-zinc-800 rounded w-20 mt-2 animate-pulse" />
                                </div>
                            ))}
                        </div>
                    ) : (
                        cuisines.map(cuisine => (
                            <button
                                key={cuisine.id}
                                onClick={() => setFilters({ ...filters, cuisine: cuisine.name === filters.cuisine ? '' : cuisine.name })}
                                className={`flex flex-col items-center min-w-20 `}
                                >
                                <img className={`w-18 h-18 p-2 border-0 rounded-full ${filters.cuisine === cuisine.name ? 'bg-zinc-400' : 'bg-zinc-600'}`}  src={cuisine.image_url} />
                                {cuisine.name}
                            </button>
                        ))
                    )}
                </div>
                <button className='w-8 h-8 bg-zinc-400 border-0 rounded-full text-zinc-900' 
                    onClick={() => scroll(1)} style={{ 
                        opacity: canScrollRight ? 1 : 0, 
                        transition: 'opacity 100ms  ease-out', 
                        pointerEvents: canScrollRight ? 'auto' : 'none' 
                    }}>➜</button>
            </div>
            
            {!filters.cuisine ? (
                <div className="flex flex-col items-center gap-3 mt-48">
                    <h1 className='font-bold text-zinc-300 text-3xl' >What do you feel like eating?</h1>
                    <h2 className='text-zinc-400 text-xl'>Select a cuisine to find restaurants</h2>
                </div>
                ) : restaurantsLoading ? (
                    <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-y-16 gap-x-4 w-full px-10">
                        {Array.from({ length: 8 }).map((_, i) => (
                        <div key={i} className="flex flex-col gap-4 min-h-54 w-full animate-pulse">
                            <div className="w-full h-46 bg-zinc-800 rounded-2xl" />
                            <div className="flex flex-col gap-2 pl-3">
                                <div className="h-5 bg-zinc-800 rounded w-2/3" />
                                <div className="h-5 bg-zinc-800 rounded w-1/3" />
                            </div>
                        </div>
                        ))}
                    </div>
                ) : restaurants.length === 0 ? (
                    <div className="flex flex-col items-center gap-3 mt-48">
                        <h1 className='font-bold text-zinc-300 text-3xl'>There's nothing here...</h1>
                        <h2 className='text-zinc-400 text-xl'>Try a different cuisine</h2>
                    </div>
                ) : (
                <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-y-16 gap-x-4 w-full px-10">
                    {restaurants.map(restaurant => (
                    <div key={restaurant.id} className="flex flex-col gap-4 min-h-54 w-full" onClick={() => router.push(`/restaurants/${restaurant.id}`)}>
                        <div className="min-w-full h-46"><img className='w-full h-46 object-cover rounded-2xl ' src={restaurant.image_url} alt={restaurant.name} /></div>
                        <div className='flex flex-col justify-between'>
                            <h3 className='pl-3 text-lg font-semibold'>{restaurant.name}</h3>
                            <div className='flex gap-2'>
                                <h3 className='pl-3 text-lg font-semibold'>{restaurant.rating.toFixed(1)} 🟊</h3>
                                <h4 className='text-zinc-500 text-lg'>128+</h4>
                            </div>
                        </div>
                    </div>
                    ))}
                </div>
            )}
        </div>
    )
}