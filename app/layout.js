import { Geist, Geist_Mono } from "next/font/google";
import "./globals.css";
import Providers from "../components/Providers";
import ClickSpark from "../components/ClickSpark";


const geistSans = Geist({
  variable: "--font-geist-sans",
  subsets: ["latin"],
});

const geistMono = Geist_Mono({
  variable: "--font-geist-mono",
  subsets: ["latin"],
});

export const metadata = {
  title: "ShopEasy — Modern E-commerce",
  description: "ShopEasy is a sleek e-commerce demo built with Next.js and Tailwind CSS. Browse products, manage your cart, and enjoy a smooth checkout with card, UPI, or cash on delivery.",
};

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className="relative overflow-x-hidden ${geistSans.variable} ${geistMono.variable} antialiased">
        {/* background */}
        <div className="absolute inset-0 -z-10">

        </div>

        <ClickSpark>
          <Providers>{children}</Providers>
        </ClickSpark>
      </body>
    </html>
  );
}
