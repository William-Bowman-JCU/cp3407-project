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
  { id: 1,  name: "Margherita",     price: { small: 12, large: 18 }, image: "/images/Margherita.jpg",     description: "Classic tomato sauce, fresh mozzarella, basil" },
  { id: 2,  name: "Pepperoni",      price: { small: 15, large: 22 }, image: "/images/pepperoni.jpg",      description: "Tomato sauce, mozzarella, spicy pepperoni slices" },
  { id: 3,  name: "BBQ Chicken",    price: { small: 17, large: 24 }, image: "/images/BBQChicken.jpg",     description: "BBQ base, grilled chicken, red onion, cheddar" },
  { id: 4,  name: "Veggie Supreme", price: { small: 14, large: 20 }, image: "/images/VeggieSupreme.jpg",  description: "Tomato sauce, capsicum, mushrooms, olives, onion" },
  { id: 5,  name: "Hawaiian",       price: { small: 16, large: 23 }, image: "/images/Hawaiian.jpg",       description: "Tomato sauce, ham, pineapple, mozzarella" },
  { id: 6,  name: "Meat Lovers",    price: { small: 18, large: 26 }, image: "/images/MeatLovers.jpg",     description: "Pepperoni, sausage, bacon, ground beef, mozzarella" },
  { id: 7,  name: "Cheese Burst",   price: { small: 13, large: 19 }, image: "/images/CheeseBurst.jpg",    description: "Four-cheese blend, garlic butter base, herbs" },
  { id: 8,  name: "Farmhouse",      price: { small: 15, large: 21 }, image: "/images/Farmhouse.jpg",      description: "Tomato sauce, mushrooms, capsicum, fresh onion" },
  { id: 9,  name: "Truffle Royale", price: { small: 22, large: 30 }, image: "/images/TruffleRoyale.jpg",  description: "Truffle oil, mushrooms, parmesan, fresh rocket" },
  { id: 10, name: "Smoky Inferno",  price: { small: 19, large: 27 }, image: "/images/SmokyInferno.jpg",   description: "Chipotle base, jalapeños, smoked beef, mozzarella" },
  { id: 11, name: "Garden Fiesta",  price: { small: 16, large: 22 }, image: "/images/GardenFiesta.jpg",   description: "Pesto base, zucchini, sundried tomato, feta" },
  { id: 12, name: "Buffalo Ranch",  price: { small: 20, large: 28 }, image: "/images/BuffaloRanch.jpg",   description: "Ranch base, buffalo chicken, red onion, celery" },
  { id: 13, name: "Pesto Bliss",    price: { small: 17, large: 24 }, image: "/images/PestoBliss.jpg",     description: "Basil pesto, cherry tomatoes, bocconcini, pine nuts" },
  { id: 14, name: "Double Crunch",  price: { small: 21, large: 29 }, image: "/images/DoubleCrunch.jpg",   description: "Stuffed crust, double cheese, pepperoni, oregano" },
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
        @import url('https://fonts.googleapis.com/css2?family=Playfair+Display:wght@600;700&family=Nunito:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'Nunito', sans-serif; }
        .brand { font-family: 'Playfair Display', serif; }
        .pizza-row { display: grid; grid-template-columns: 1fr 1fr; gap: 0; border-bottom: 1px solid #f3f4f6; }
        .pizza-row:last-child { border-bottom: none; }
        .pizza-card { display: flex; align-items: center; gap: 16px; padding: 20px 24px; cursor: pointer; transition: background 0.15s; text-align: left; border: none; background: none; width: 100%; }
        .pizza-card:hover { background: #fff5f5; }
        .pizza-card:first-child { border-right: 1px solid #f3f4f6; }
        .pizza-img-wrap { position: relative; width: 80px; height: 80px; flex-shrink: 0; }
        .pizza-img-wrap img { border-radius: 50%; object-fit: cover; transition: transform 0.2s; }
        .pizza-card:hover .pizza-img-wrap img { transform: scale(1.07); }
        .pizza-info { flex: 1; min-width: 0; }
        .pizza-name { font-weight: 700; font-size: 14px; color: #1f2937; line-height: 1.3; }
        .pizza-desc { font-size: 12px; color: #9ca3af; margin-top: 4px; line-height: 1.5; display: -webkit-box; -webkit-line-clamp: 2; -webkit-box-orient: vertical; overflow: hidden; }
        .pizza-price { font-size: 13px; font-weight: 700; color: #ef4444; white-space: nowrap; flex-shrink: 0; }
        @media (max-width: 640px) {
          .pizza-row { grid-template-columns: 1fr; }
          .pizza-card:first-child { border-right: none; border-bottom: 1px solid #f3f4f6; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#3a3333", display: "flex", flexDirection: "column" }}>

        {/*  Header  */}
        <div style={{ position: "relative", background: "#2f2929", color: "white", padding: "18px 24px", display: "flex", alignItems: "center", borderBottom: "2px solid #ef4444" }}>
          <h1 className="brand" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: "22px", letterSpacing: "1px" }}>
            Pizza Hut
          </h1>
          <button
            onClick={() => setShowCart(!showCart)}
            style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: "22px", position: "relative", color: "white" }}
          >
            🛒
            <span style={{ position: "absolute", top: "-8px", right: "-10px", background: "#ef4444", color: "white", fontSize: "10px", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontWeight: 700 }}>
              {cartCount}
            </span>
          </button>
        </div>

        {/*  Cart Dropdown  */}
        {showCart && (
          <div style={{ position: "absolute", right: "24px", top: "70px", width: "240px", background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.15)", zIndex: 20 }}>
            <p className="brand" style={{ fontSize: "17px", color: "#1f2937", marginBottom: "8px" }}>Your Cart</p>
            <p style={{ fontSize: "13px", color: "#6b7280" }}>Total Items: <strong style={{ color: "#ef4444" }}>{cartCount}</strong></p>
            <p style={{ fontSize: "11px", color: "#d1d5db", marginTop: "4px" }}>Tap any pizza to add</p>
          </div>
        )}

        {/*  Main  */}
        <div style={{ flex: 1, padding: "24px" }}>
          <div style={{ background: "white", borderRadius: "20px", overflow: "hidden", paddingBottom: "32px" }}>

            {/* ── Section Title ── */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "28px 32px 8px" }}>
              <div style={{ flex: 1, height: "1px", background: "#fecaca" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "20px" }}>🍕</span>
                <span className="brand" style={{ fontSize: "24px", color: "#1f2937" }}>Pizza</span>
              </div>
              <div style={{ flex: 1, height: "1px", background: "#fecaca" }} />
            </div>
            <p style={{ textAlign: "center", fontSize: "13px", color: "#9ca3af", marginTop: "4px", marginBottom: "20px" }}>
              Regular / Large
            </p>

            {/*  Pizza Grid  */}
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

