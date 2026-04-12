"use client";

import { useState } from "react";
import Image from "next/image";

type Dish = {
  id: number;
  name: string;
  price: { small: number; large: number };
  image: string;
  description: string;
};

const menuData: Dish[] = [
  { id: 1,  name: "Salmon Nigiri",      price: { small: 8,  large: 14 }, image: "/images/SalmonNigiri.jpg",     description: "Fresh Atlantic salmon over hand-pressed sushi rice" },
  { id: 2,  name: "Tuna Roll",          price: { small: 10, large: 16 }, image: "/images/TunaRoll.jpg",         description: "Premium bluefin tuna, cucumber, sesame, soy wrap" },
  { id: 3,  name: "Dragon Roll",        price: { small: 14, large: 22 }, image: "/images/DragonRoll.jpg",       description: "Prawn tempura, avocado top, eel sauce drizzle" },
  { id: 4,  name: "Spicy Tuna",         price: { small: 11, large: 17 }, image: "/images/SpicyTuna.jpg",        description: "Tuna, sriracha mayo, cucumber, toasted sesame" },
  { id: 5,  name: "Rainbow Roll",       price: { small: 15, large: 23 }, image: "/images/RainbowRoll.jpg",      description: "California roll topped with assorted sashimi slices" },
  { id: 6,  name: "Prawn Tempura",      price: { small: 13, large: 20 }, image: "/images/PrawnTempura.jpg",     description: "Crispy tempura prawn, avocado, Japanese mayo" },
  { id: 7,  name: "Avocado Roll",       price: { small: 9,  large: 14 }, image: "/images/AvocadoRoll.jpg",      description: "Creamy avocado, cucumber, toasted sesame seeds" },
  { id: 8,  name: "Soft Shell Crab",    price: { small: 16, large: 25 }, image: "/images/SoftShellCrab.jpg",    description: "Soft shell crab tempura, mango, spicy aioli" },
  { id: 9,  name: "Volcano Roll",       price: { small: 17, large: 26 }, image: "/images/VolcanoRoll.jpg",      description: "Baked scallop, crab mix, spicy mayo on top" },
  { id: 10, name: "Unagi Nigiri",       price: { small: 12, large: 19 }, image: "/images/UnagiNigiri.jpg",      description: "Grilled freshwater eel, sweet tare, sushi rice" },
  { id: 11, name: "Edamame Crunch",     price: { small: 10, large: 16 }, image: "/images/EdamameCrunch.jpg",    description: "Edamame, cream cheese, cucumber, crispy onion" },
  { id: 12, name: "Philadelphia Roll",  price: { small: 12, large: 18 }, image: "/images/PhiladelphiaRoll.jpg", description: "Smoked salmon, cream cheese, cucumber, dill" },
  { id: 13, name: "Mango Tango",        price: { small: 13, large: 20 }, image: "/images/MangoTango.jpg",       description: "Fresh mango, prawn, coconut rice, chilli flakes" },
  { id: 14, name: "Black Tiger Roll",   price: { small: 18, large: 27 }, image: "/images/BlackTigerRoll.jpg",   description: "Black sesame, tiger prawn, spicy tobiko, wasabi mayo" },
];

export default function Home() {
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);

  const addToCart = () => setCartCount((prev) => prev + 1);

  const rows: Dish[][] = [];
  for (let i = 0; i < menuData.length; i += 2) {
    rows.push(menuData.slice(i, i + 2));
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; }
        .brand { font-family: 'Noto Serif JP', serif; }
        .pizza-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid #f3f4f6; }
        .pizza-row:last-child { border-bottom: none; }
        .pizza-card { display: flex; align-items: center; gap: 16px; padding: 20px 24px; cursor: pointer; transition: background 0.15s; text-align: left; border: none; background: none; width: 100%; }
        .pizza-card:hover { background: #fff8f0; }
        .pizza-card:first-child { border-right: 1px solid #f3f4f6; }
        .pizza-img-wrap { position: relative; width: 80px; height: 80px; flex-shrink: 0; }
        .pizza-img-wrap img { border-radius: 50%; object-fit: cover; transition: transform 0.2s; }
        .pizza-card:hover .pizza-img-wrap img { transform: scale(1.07); }
        .pizza-info { flex: 1; min-width: 0; }
        .pizza-name { font-weight: 700; font-size: 14px; color: #1f2937; line-height: 1.3; }
        .pizza-desc { font-size: 12px; color: #9ca3af; margin-top: 4px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .pizza-price { font-size: 13px; font-weight: 700; color: #d97706; white-space: nowrap; flex-shrink: 0; }
        @media (max-width: 640px) {
          .pizza-row { grid-template-columns: 1fr; }
          .pizza-card:first-child { border-right: none; border-bottom: 1px solid #f3f4f6; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#1a1a2e", display: "flex", flexDirection: "column" }}>

        {/* ── Header ── */}
        <div style={{ position: "relative", background: "#16213e", color: "white", padding: "18px 24px", display: "flex", alignItems: "center", borderBottom: "2px solid #d97706" }}>
          <h1 className="brand" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: "22px", letterSpacing: "2px", whiteSpace: "nowrap" }}>
            🍣 Sakura Sushi
          </h1>
          <button
            onClick={() => setShowCart(!showCart)}
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: "22px", position: "relative", color: "white" }}
          >
            🛒
            <span style={{ position: "absolute", top: "-8px", right: "-10px", background: "#d97706", color: "white", fontSize: "10px", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontWeight: 700 }}>
              {cartCount}
            </span>
          </button>
        </div>

        {/* ── Cart Dropdown ── */}
        {showCart && (
          <div style={{ position: "absolute", right: "24px", top: "70px", width: "240px", background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: 20 }}>
            <p className="brand" style={{ fontSize: "17px", color: "#1f2937", marginBottom: "8px" }}>Your Cart</p>
            <p style={{ fontSize: "13px", color: "#6b7280" }}>Total Items: <strong style={{ color: "#d97706" }}>{cartCount}</strong></p>
            <p style={{ fontSize: "11px", color: "#d1d5db", marginTop: "4px" }}>Tap any item to add</p>
          </div>
        )}

        {/* ── Main ── */}
        <div style={{ flex: 1, padding: "24px" }}>
          <div style={{ background: "white", borderRadius: "20px", overflow: "hidden", paddingBottom: "32px" }}>

            {/* ── Section Title ── */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "28px 32px 8px" }}>
              <div style={{ flex: 1, height: "1px", background: "#fed7aa" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "20px" }}>🍱</span>
                <span className="brand" style={{ fontSize: "24px", color: "#1f2937" }}>Sushi Menu</span>
              </div>
              <div style={{ flex: 1, height: "1px", background: "#fed7aa" }} />
            </div>
            <p style={{ textAlign: "center", fontSize: "13px", color: "#9ca3af", marginTop: "4px", marginBottom: "20px" }}>
              4 Pieces / 8 Pieces
            </p>

            {/* ── Sushi Grid ── */}
            <div style={{ margin: "0 16px", border: "1px solid #f3f4f6", borderRadius: "16px", overflow: "hidden" }}>
              {rows.map((row, ri) => (
                <div key={ri} className="pizza-row">
                  {row.map((dish) => (
                    <button key={dish.id} className="pizza-card" onClick={addToCart}>
                      <div className="pizza-img-wrap">
                        <Image src={dish.image} alt={dish.name} fill sizes="80px" />
                      </div>
                      <div className="pizza-info">
                        <p className="pizza-name">{dish.name}</p>
                        <p className="pizza-desc">{dish.description}</p>
                      </div>
                      <p className="pizza-price">${dish.price.small} / ${dish.price.large}</p>
                    </button>
                  ))}
                  {row.length === 1 && <div />}
                </div>
              ))}
            </div>

          </div>
        </div>
      </div>
    </>
  );
}