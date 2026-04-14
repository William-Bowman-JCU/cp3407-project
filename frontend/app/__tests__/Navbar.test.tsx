import React from "react";
import { render, screen } from "@testing-library/react";
import Navbar from "../components/Navbar";

// Mock Next.js Link
jest.mock("next/link", () => {
  return ({ children, href }: { children: React.ReactNode; href: string }) => (
    <a href={href}>{children}</a>
  );
});

// Mock CartContext
jest.mock("../context/CartContext", () => ({
  useCart: () => ({ totalItems: 0, items: [], totalPrice: 0 }),
  CartProvider: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

describe("Navbar", () => {
  it("renders the FeedMe brand name", () => {
    render(<Navbar />);
    expect(screen.getByText("Feed")).toBeInTheDocument();
    expect(screen.getByText("Me")).toBeInTheDocument();
  });

  it("renders navigation links for Browse, Orders, Delivery, Checkout", () => {
    render(<Navbar />);
    expect(screen.getByText("Browse")).toBeInTheDocument();
    expect(screen.getByText("Orders")).toBeInTheDocument();
    expect(screen.getByText("Delivery")).toBeInTheDocument();
    expect(screen.getByText("Checkout")).toBeInTheDocument();
  });

  it("links point to correct routes", () => {
    render(<Navbar />);
    const browseLink = screen.getByText("Browse").closest("a");
    const ordersLink = screen.getByText("Orders").closest("a");
    expect(browseLink).toHaveAttribute("href", "/browse");
    expect(ordersLink).toHaveAttribute("href", "/orders");
  });

  it("does not show cart badge when cart is empty", () => {
    render(<Navbar />);
    // Badge element should not be present with 0 items
    const badge = document.querySelector(".bg-red-600");
    expect(badge).toBeNull();
  });

  it("renders a cart icon link pointing to /cart", () => {
    render(<Navbar />);
    const cartLink = screen.getByText("🛒").closest("a");
    expect(cartLink).toHaveAttribute("href", "/cart");
  });

  it("renders an account icon link pointing to /account", () => {
    render(<Navbar />);
    const accountLink = screen.getByText("👤").closest("a");
    expect(accountLink).toHaveAttribute("href", "/account");
  });
});
