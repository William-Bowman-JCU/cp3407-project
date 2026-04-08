import React from "react";
import { renderHook, act } from "@testing-library/react";
import { CartProvider, useCart } from "../context/CartContext";

const wrapper = ({ children }: { children: React.ReactNode }) => (
  <CartProvider>{children}</CartProvider>
);

const burger = { id: 1, name: "Burger", price: 9.99 };
const fries = { id: 2, name: "Fries", price: 3.99 };
const shake = { id: 3, name: "Milkshake", price: 5.5, restaurantId: 1 };

beforeEach(() => {
  localStorage.clear();
});

// ---------------------------------------------------------------------------
// Initial state
// ---------------------------------------------------------------------------

describe("CartContext – initial state", () => {
  it("starts with an empty cart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toEqual([]);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });

  it("throws when used outside CartProvider", () => {
    const spy = jest.spyOn(console, "error").mockImplementation(() => {});
    expect(() => renderHook(() => useCart())).toThrow(
      "useCart must be used inside CartProvider"
    );
    spy.mockRestore();
  });
});

// ---------------------------------------------------------------------------
// addItem
// ---------------------------------------------------------------------------

describe("CartContext – addItem", () => {
  it("adds a new item with quantity 1", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(burger);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0]).toMatchObject({ ...burger, quantity: 1 });
  });

  it("increments quantity when the same item is added again (US-05)", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(burger);
      result.current.addItem(burger);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(2);
  });

  it("keeps separate entries for different items", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(burger);
      result.current.addItem(fries);
    });

    expect(result.current.items).toHaveLength(2);
    expect(result.current.items.map((i) => i.id)).toContain(1);
    expect(result.current.items.map((i) => i.id)).toContain(2);
  });

  it("preserves restaurantId on the added item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(shake);
    });

    expect(result.current.items[0].restaurantId).toBe(1);
  });
});

// ---------------------------------------------------------------------------
// removeItem
// ---------------------------------------------------------------------------

describe("CartContext – removeItem", () => {
  it("removes the correct item by id", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(burger);
      result.current.addItem(fries);
      result.current.removeItem(burger.id);
    });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].id).toBe(fries.id);
  });

  it("does nothing when removing a non-existent id", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(burger);
      result.current.removeItem(999);
    });

    expect(result.current.items).toHaveLength(1);
  });
});

// ---------------------------------------------------------------------------
// updateQuantity
// ---------------------------------------------------------------------------

describe("CartContext – updateQuantity", () => {
  it("updates the quantity of an existing item", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(burger);
      result.current.updateQuantity(burger.id, 4);
    });

    expect(result.current.items[0].quantity).toBe(4);
  });

  it("removes the item when quantity is set to zero", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(burger);
      result.current.updateQuantity(burger.id, 0);
    });

    expect(result.current.items).toHaveLength(0);
  });

  it("removes the item when quantity is set to a negative number", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(burger);
      result.current.updateQuantity(burger.id, -1);
    });

    expect(result.current.items).toHaveLength(0);
  });
});

// ---------------------------------------------------------------------------
// clearCart
// ---------------------------------------------------------------------------

describe("CartContext – clearCart", () => {
  it("removes all items from the cart (US-05)", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(burger);
      result.current.addItem(fries);
      result.current.clearCart();
    });

    expect(result.current.items).toHaveLength(0);
    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// Derived totals
// ---------------------------------------------------------------------------

describe("CartContext – totals (US-05)", () => {
  it("calculates totalItems correctly across multiple quantities", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(burger); // qty 1
      result.current.addItem(burger); // qty 2
      result.current.addItem(fries);  // qty 1
    });

    expect(result.current.totalItems).toBe(3);
  });

  it("calculates totalPrice correctly", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(burger); // 9.99
      result.current.addItem(fries);  // 3.99
    });

    expect(result.current.totalPrice).toBeCloseTo(13.98, 2);
  });

  it("totalPrice accounts for item quantity", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(burger); // 9.99
      result.current.addItem(burger); // 9.99 × 2 = 19.98
    });

    expect(result.current.totalPrice).toBeCloseTo(19.98, 2);
  });

  it("totals return to zero after clearCart", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(burger);
      result.current.clearCart();
    });

    expect(result.current.totalItems).toBe(0);
    expect(result.current.totalPrice).toBe(0);
  });
});

// ---------------------------------------------------------------------------
// localStorage persistence
// ---------------------------------------------------------------------------

describe("CartContext – localStorage persistence", () => {
  it("saves cart to localStorage when items change", () => {
    const { result } = renderHook(() => useCart(), { wrapper });

    act(() => {
      result.current.addItem(burger);
    });

    const stored = JSON.parse(localStorage.getItem("feedme_cart") ?? "[]");
    expect(stored).toHaveLength(1);
    expect(stored[0].id).toBe(burger.id);
  });

  it("loads cart from localStorage on mount", () => {
    localStorage.setItem(
      "feedme_cart",
      JSON.stringify([{ ...burger, quantity: 3 }])
    );

    const { result } = renderHook(() => useCart(), { wrapper });

    expect(result.current.items).toHaveLength(1);
    expect(result.current.items[0].quantity).toBe(3);
  });
});
