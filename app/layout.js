<<<<<<< HEAD
import { Geist, Geist_Mono, Fraunces } from "next/font/google";
=======
import { Geist, Geist_Mono } from "next/font/google";
>>>>>>> origin/main
import "./globals.css";
import Providers from "../components/Providers";
import ClickSpark from "../components/ClickSpark";

<<<<<<< HEAD
=======

>>>>>>> origin/main
const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

<<<<<<< HEAD
const fraunces = Fraunces({
  variable: "--font-fraunces",
  subsets: ["latin"],
  display: "swap",
});

export const metadata = {
  title: "ShopEasy — Modern E-commerce",
  description:
    "ShopEasy is a sleek e-commerce demo built with Next.js and Tailwind CSS. Browse products, manage your cart, and enjoy a smooth checkout with card, UPI, or cash on delivery.",
=======
export const metadata = {
  title: "ShopEasy — Modern E-commerce",
  description: "ShopEasy is a sleek e-commerce demo built with Next.js and Tailwind CSS. Browse products, manage your cart, and enjoy a smooth checkout with card, UPI, or cash on delivery.",
>>>>>>> origin/main
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
<<<<<<< HEAD
      <body
        className={`${geistSans.variable} ${geistMono.variable} ${fraunces.variable} font-sans antialiased`}
      >
        <ClickSpark sparkColor="#1a1713" sparkSize={9} sparkRadius={13}>
=======
      <body className="relative overflow-x-hidden ${geistSans.variable} ${geistMono.variable} antialiased">
        {/* background */}
        <div className="absolute inset-0 -z-10">

        </div>

        <ClickSpark>
>>>>>>> origin/main
          <Providers>{children}</Providers>
        </ClickSpark>
      </body>
    </html>
  );
}
