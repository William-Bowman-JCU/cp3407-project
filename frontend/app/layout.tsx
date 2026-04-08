import type { Metadata } from "next";
import { Geist } from "next/font/google";
import "./globals.css";
import Navbar from "./components/Navbar";
import { CartProvider } from "./context/CartContext";

const geist = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

export const metadata: Metadata = {
  title: "FeedMe",
  description: "Food ordering app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en">
      <body className={`${geist.variable} antialiased bg-zinc-900 text-white`}>
        <CartProvider>
          <Navbar />
          {children}
        </CartProvider>
      </body>
    </html>
  );
}
