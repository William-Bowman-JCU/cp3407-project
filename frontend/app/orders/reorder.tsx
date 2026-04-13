"use client";

import { useState } from "react";

type Order = {
  id: number;
  date: string;
  items: string;
  total: string;
  count: number;
};

const orderData: Order[] = [
  { id: 1, date: "Apr 8, 2026",  items: "Salmon Nigiri x2, Dragon Roll",       total: "$44.00", count: 3 },
  { id: 2, date: "Apr 3, 2026",  items: "Tuna Roll x1, Rainbow Roll",           total: "$38.00", count: 2 },
  { id: 3, date: "Mar 28, 2026", items: "Prawn Tempura, Volcano Roll",           total: "$46.00", count: 2 },
  { id: 4, date: "Mar 21, 2026", items: "Unagi Nigiri x2, Avocado Roll",         total: "$38.00", count: 3 },
  { id: 5, date: "Mar 15, 2026", items: "Philadelphia Roll, Mango Tango",        total: "$33.00", count: 2 },
  { id: 6, date: "Mar 9, 2026",  items: "Black Tiger Roll, Soft Shell Crab",     total: "$43.00", count: 2 },
];

type Toast = { type: "success" | "error"; message: string } | null;

export default function OrderHistory() {
  const [cartCount, setCartCount] = useState(0);
  const [showCart, setShowCart] = useState(false);
  const [toast, setToast] = useState<Toast>(null);

  const reorder = (count: number) => {
    try {
      setCartCount((prev) => prev + count);
      setToast({ type: "success", message: "Items added to your cart successfully!" });
    } catch {
      setToast({ type: "error", message: "Something went wrong. Please try again." });
    }
    setTimeout(() => setToast(null), 3000);
  };

  const rows: Order[][] = [];
  for (let i = 0; i < orderData.length; i += 2) {
    rows.push(orderData.slice(i, i + 2));
  }

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=Noto+Serif+JP:wght@600;700&family=DM+Sans:wght@400;500;600;700&display=swap');
        *, *::before, *::after { box-sizing: border-box; margin: 0; padding: 0; font-family: 'DM Sans', sans-serif; }
        .brand { font-family: 'Noto Serif JP', serif; }
        .order-row { display: grid; grid-template-columns: 1fr 1fr; border-bottom: 1px solid #f3f4f6; }
        .order-row:last-child { border-bottom: none; }
        .order-card { display: flex; flex-direction: column; gap: 6px; padding: 16px 20px; border-right: 1px solid #f3f4f6; }
        .order-card:last-child { border-right: none; }
        @media (max-width: 640px) {
          .order-row { grid-template-columns: 1fr; }
          .order-card { border-right: none; border-bottom: 1px solid #f3f4f6; }
          .order-card:last-child { border-bottom: none; }
        }
      `}</style>

      <div style={{ minHeight: "100vh", background: "#1a1a2e", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{ position: "relative", background: "#16213e", color: "white", padding: "18px 24px", display: "flex", alignItems: "center", borderBottom: "2px solid #d97706" }}>
          <h1 className="brand" style={{ position: "absolute", left: "50%", transform: "translateX(-50%)", fontSize: "22px", letterSpacing: "2px", whiteSpace: "nowrap" }}>
            Wanna Order Again?
          </h1>
          <button onClick={() => setShowCart(!showCart)} style={{ marginLeft: "auto", background: "none", border: "none", cursor: "pointer", fontSize: "22px", position: "relative", color: "white" }}>
            🛒
            <span style={{ position: "absolute", top: "-8px", right: "-10px", background: "#d97706", color: "white", fontSize: "10px", width: "18px", height: "18px", display: "flex", alignItems: "center", justifyContent: "center", borderRadius: "50%", fontWeight: 700 }}>
              {cartCount}
            </span>
          </button>
        </div>

        {/* Cart Dropdown */}
        {showCart && (
          <div style={{ position: "absolute", right: "24px", top: "70px", width: "220px", background: "white", padding: "20px", borderRadius: "12px", boxShadow: "0 8px 24px rgba(0,0,0,0.2)", zIndex: 20 }}>
            <p className="brand" style={{ fontSize: "17px", color: "#1f2937", marginBottom: "8px" }}>Your Cart</p>
            <p style={{ fontSize: "13px", color: "#6b7280" }}>Total items: <strong style={{ color: "#d97706" }}>{cartCount}</strong></p>
            <p style={{ fontSize: "11px", color: "#d1d5db", marginTop: "4px" }}>Tap Reorder to add items</p>
          </div>
        )}

        {/* Main */}
        <div style={{ flex: 1, padding: "24px" }}>
          <div style={{ background: "white", borderRadius: "20px", overflow: "hidden", paddingBottom: "32px" }}>

            {/* Section Title */}
            <div style={{ display: "flex", alignItems: "center", gap: "12px", padding: "28px 32px 8px" }}>
              <div style={{ flex: 1, height: "1px", background: "#fed7aa" }} />
              <div style={{ display: "flex", alignItems: "center", gap: "8px" }}>
                <span style={{ fontSize: "20px" }}>📋</span>
                <span className="brand" style={{ fontSize: "24px", color: "#1f2937" }}>Order History</span>
              </div>
              <div style={{ flex: 1, height: "1px", background: "#fed7aa" }} />
            </div>
            <p style={{ textAlign: "center", fontSize: "13px", color: "#9ca3af", marginTop: "4px", marginBottom: "16px" }}>
              Tap &ldquo;Reorder&rdquo; to add items back to your cart
            </p>

            {/* Toast notification */}
            {toast && (
              <div style={{
                margin: "0 16px 16px",
                padding: "12px 16px",
                borderRadius: "10px",
                fontSize: "13px",
                fontWeight: 600,
                display: "flex",
                alignItems: "center",
                gap: "8px",
                background: toast.type === "success" ? "#d1fae5" : "#fee2e2",
                color: toast.type === "success" ? "#065f46" : "#991b1b",
                border: `1px solid ${toast.type === "success" ? "#a7f3d0" : "#fca5a5"}`,
              }}>
                {toast.type === "success" ? "✓" : "✕"} {toast.message}
              </div>
            )}

            {/* Orders Grid */}
            <div style={{ margin: "0 16px", border: "1px solid #f3f4f6", borderRadius: "16px", overflow: "hidden" }}>
              {rows.map((row, ri) => (
                <div key={ri} className="order-row">
                  {row.map((order) => (
                    <div key={order.id} className="order-card">
                      <span style={{ fontSize: "11px", color: "#9ca3af" }}>{order.date}</span>
                      <span style={{ fontSize: "13px", fontWeight: 700, color: "#1f2937" }}>{order.items}</span>
                      <span style={{ fontSize: "11px", color: "#6b7280" }}>{order.count} item{order.count > 1 ? "s" : ""}</span>
                      <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: "4px" }}>
                        <span style={{ fontSize: "13px", fontWeight: 700, color: "#d97706" }}>{order.total}</span>
                        <button
                          onClick={() => reorder(order.count)}
                          style={{ background: "#d97706", color: "white", border: "none", borderRadius: "20px", padding: "5px 14px", fontSize: "12px", fontWeight: 700, cursor: "pointer" }}
                        >
                          Reorder
                        </button>
                      </div>
                    </div>
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