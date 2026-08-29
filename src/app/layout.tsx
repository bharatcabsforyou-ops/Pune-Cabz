import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Poppins } from "next/font/google";
import "./globals.css";
import Navbar from "@/components/Navbar";
import SiteChrome from "@/components/SiteChrome";

const poppins = Poppins({
  variable: "--font-poppins",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  title: "Pune Cabz - Travel anywhere together. Spend smarter.",
  description:
    "Find a carpool ride or share your own. Pune Cabz connects drivers and passengers travelling the same way for less.",
  icons: {
    icon: [
      { url: "/icon.svg", type: "image/svg+xml" },
      { url: "/favicon.svg", type: "image/svg+xml" },
    ],
    apple: "/apple-icon",
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${poppins.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white text-navy">
        <Navbar />
        <main className="flex-1">
          <SiteChrome>{children}</SiteChrome>
        </main>
      </body>
    </html>
  );
}
