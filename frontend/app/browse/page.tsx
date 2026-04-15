"use client";

import { useRef, useEffect, useState } from 'react'
import { useRouter } from "next/navigation";




export default function browsePage() {

    const router = useRouter();
    const scrollRef = useRef<HTMLDivElement | null>(null);
    const [canScrollLeft, setCanScrollLeft] = useState(false)
    const [canScrollRight, setCanScrollRight] = useState(true)

    const handleScroll = () => {
        if (scrollRef.current) {
            const { scrollLeft, scrollWidth, clientWidth } = scrollRef.current
            setCanScrollLeft(scrollLeft > 0)
            setCanScrollRight(scrollLeft + clientWidth < scrollWidth)
        }
    }

    useEffect(() => {
        if (scrollRef.current) {
            scrollRef.current.scrollLeft = 0
        }
    }, [])
    
    const scroll = (dir: number) => {
    if (scrollRef.current) {
        scrollRef.current.scrollBy({ left: dir * 200, behavior: 'smooth' })
    }
    }

    return (
        <div className="flex flex-col items-center gap-8 max-w-screen py-12 text-neutral-200">
            <div className="bg-zinc-600 text-zinc-300 min-w-md flex py-1 pl-4 rounded-2xl ">Search...</div>
            <div className="flex flex-row items-center gap-6">
                <button className='w-8 h-8 bg-zinc-400 border-0 rounded-full rotate-180 text-zinc-900'  
                    onClick={() => scroll(-1)} style={{ 
                        opacity: canScrollLeft ? 1 : 0, 
                        transition: 'opacity 100ms ease-out', 
                        pointerEvents: canScrollLeft ? 'auto' : 'none' 
                    }}>➜</button>
                <div ref={scrollRef} onScroll={handleScroll} className="flex flex-row gap-6 overflow-x-auto w-md scrollbar-hide">
                    <div className="flex flex-col items-center"><div className="min-w-15 min-h-15 bg-zinc-600 border-0 rounded-full"></div><div>Pizza</div></div>
                    <div className="flex flex-col items-center"><div className="min-w-15 min-h-15 bg-zinc-600 border-0 rounded-full"></div><div>Chinese</div></div>
                    <div className="flex flex-col items-center"><div className="min-w-15 min-h-15 bg-zinc-600 border-0 rounded-full"></div><div>Mexican</div></div>
                    <div className="flex flex-col items-center"><div className="min-w-15 min-h-15 bg-zinc-600 border-0 rounded-full"></div><div>Greek</div></div>
                    <div className="flex flex-col items-center"><div className="min-w-15 min-h-15 bg-zinc-600 border-0 rounded-full"></div><div>Italian</div></div>
                    <div className="flex flex-col items-center"><div className="min-w-15 min-h-15 bg-zinc-600 border-0 rounded-full"></div><div>Japanese</div></div>
                    <div className="flex flex-col items-center"><div className="min-w-15 min-h-15 bg-zinc-600 border-0 rounded-full"></div><div>Thai</div></div>
                </div>
                <button className='w-8 h-8 bg-zinc-400 border-0 rounded-full text-zinc-900' 
                    onClick={() => scroll(1)} style={{ 
                        opacity: canScrollRight ? 1 : 0, 
                        transition: 'opacity 100ms  ease-out', 
                        pointerEvents: canScrollRight ? 'auto' : 'none' 
                    }}>➜</button>
            </div>
            
            <div className="grid grid-cols-[repeat(auto-fill,minmax(360px,1fr))] gap-y-16 gap-x-4 w-full px-10">
                <div className="flex flex-col gap-4 min-h-54 w-full">
                    <div className="min-w-full rounded-xl min-h-46 bg-gray-50">image</div>
                    <div className='flex flex-col justify-between'>
                        <h3 className='pl-3 text-lg font-semibold'>Restaurant 1</h3>
                        <div className='flex '>
                            <h3 className='pl-3 pr-2 text-lg font-semibold'>4.5 🟊</h3>
                            <h4 className='text-zinc-500 text-lg'>128+</h4>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 min-h-54 min-w-0">
                    <div className="min-w-full rounded-xl min-h-46 bg-gray-50">image</div>
                    <div className='flex flex-col justify-between'>
                        <h3 className='pl-3 text-lg font-semibold'>Restaurant 2</h3>
                        <div className='flex '>
                            <h3 className='pl-3 pr-2 text-lg font-semibold'>4.5 🟊</h3>
                            <h4 className='text-zinc-500 text-lg'>128+</h4>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 min-h-54 min-w-0">
                    <div className="min-w-full rounded-xl min-h-46 bg-gray-50">image</div>
                    <div className='flex flex-col justify-between'>
                        <h3 className='pl-3 text-lg font-semibold'>Restaurant 3</h3>
                        <div className='flex '>
                            <h3 className='pl-3 pr-2 text-lg font-semibold'>4.5 🟊</h3>
                            <h4 className='text-zinc-500 text-lg'>128+</h4>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 min-h-54 min-w-0">
                    <div className="min-w-full rounded-xl min-h-46 bg-gray-50">image</div>
                    <div className='flex flex-col justify-between'>
                        <h3 className='pl-3 text-lg font-semibold'>Restaurant 4</h3>
                        <div className='flex '>
                            <h3 className='pl-3 pr-2 text-lg font-semibold'>4.5 🟊</h3>
                            <h4 className='text-zinc-500 text-lg'>128+</h4>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 min-h-54 min-w-0">
                    <div className="min-w-full rounded-xl min-h-46 bg-gray-50">image</div>
                    <div className='flex flex-col justify-between'>
                        <h3 className='pl-3 text-lg font-semibold'>Restaurant 5</h3>
                        <div className='flex '>
                            <h3 className='pl-3 pr-2 text-lg font-semibold'>4.5 🟊</h3>
                            <h4 className='text-zinc-500 text-lg'>128+</h4>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 min-h-54 min-w-0">
                    <div className="min-w-full rounded-xl min-h-46 bg-gray-50">image</div>
                    <div className='flex flex-col justify-between'>
                        <h3 className='pl-3 text-lg font-semibold'>Restaurant 6</h3>
                        <div className='flex '>
                            <h3 className='pl-3 pr-2 text-lg font-semibold'>4.5 🟊</h3>
                            <h4 className='text-zinc-500 text-lg'>128+</h4>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 min-h-54 min-w-0">
                    <div className="min-w-full rounded-xl min-h-46 bg-gray-50">image</div>
                    <div className='flex flex-col justify-between'>
                        <h3 className='pl-3 text-lg font-semibold'>Restaurant 7</h3>
                        <div className='flex '>
                            <h3 className='pl-3 pr-2 text-lg font-semibold'>4.5 🟊</h3>
                            <h4 className='text-zinc-500 text-lg'>128+</h4>
                        </div>
                    </div>
                </div>
                <div className="flex flex-col gap-4 min-h-54 min-w-0">
                    <div className="min-w-full rounded-xl min-h-46 bg-gray-50">image</div>
                    <div className='flex flex-col justify-between'>
                        <h3 className='pl-3 text-lg font-semibold'>Restaurant 8</h3>
                        <div className='flex '>
                            <h3 className='pl-3 pr-2 text-lg font-semibold'>4.5 🟊</h3>
                            <h4 className='text-zinc-500 text-lg'>128+</h4>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    )
}