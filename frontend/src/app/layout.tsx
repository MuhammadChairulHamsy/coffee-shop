import type { Metadata } from "next";
import { Playfair_Display, Inter } from "next/font/google";
import "./globals.css";
import { cn } from "@/lib/utils";
import ScrollToTop from "@/components/ui/scroll-to-top";
import QueryProvider from "@/providers/query-provider";
import Navbar from "@/components/layouts/navbar";
import Footer from "@/components/layouts/footer";

const playfairDisplay = Playfair_Display({
  variable: "--font-playfair-display",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700"],
  display: "swap",
});

const inter = Inter({
  subsets: ["latin"],
  variable: "--font-inter",
  display: "swap",
});

export const metadata: Metadata = {
  title: "Coffeo",
  description: "Coffee Shop",
  icons: "/coffeo.svg",
  formatDetection: {
    telephone: false,
    date: false,
    email: false,
    address: false,
  },
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={cn(playfairDisplay.variable, inter.variable)}>
      <body
        className="min-h-full flex flex-col justify-between"
        suppressHydrationWarning
      >
        <QueryProvider>
          <header className="sticky top-0 z-50 w-full">
            <Navbar />
          </header>
          <main className="mx-auto w-full flex-1">{children}</main>
          <Footer />
        </QueryProvider>
        <ScrollToTop />
      </body>
    </html>
  );
}
