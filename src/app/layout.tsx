import type { Metadata, Viewport } from "next";
import type { ReactNode } from "react";
import { Plus_Jakarta_Sans } from "next/font/google";
import "./globals.css";
import AppProviders from "@/components/AppProviders";
import Navbar from "@/components/Navbar";
import SiteChrome from "@/components/SiteChrome";

const jakarta = Plus_Jakarta_Sans({
  variable: "--font-jakarta",
  subsets: ["latin"],
  weight: ["400", "500", "600", "700", "800"],
  display: "swap",
});

export const viewport: Viewport = {
  width: "device-width",
  initialScale: 1,
  maximumScale: 5,
  viewportFit: "cover",
};

export const metadata: Metadata = {
  metadataBase: new URL(
    (process.env.NEXT_PUBLIC_SITE_URL ?? "https://punecabz.in").replace(/\/$/, "")
  ),
  title: {
    default: "Pune Cabz - Book cabs across Maharashtra",
    template: "%s | Pune Cabz",
  },
  description:
    "Book hatchback to Innova and bus cabs with Pune Cabz. Local, outstation, airport and group travel across Maharashtra and India.",
  icons: {
    icon: [{ url: "/icon.svg", type: "image/svg+xml" }],
    shortcut: "/favicon.svg",
    apple: [{ url: "/apple-icon", sizes: "180x180" }],
  },
  manifest: "/manifest.webmanifest",
  alternates: {
    canonical: "/",
  },
  robots: {
    index: true,
    follow: true,
    googleBot: {
      index: true,
      follow: true,
    },
  },
};

export default function RootLayout({ children }: { children: ReactNode }) {
  return (
    <html lang="en" className={`${jakarta.variable} h-full antialiased`}>
      <body className="flex min-h-full flex-col bg-white font-sans text-navy">
        <AppProviders>
          <Navbar />
          <main className="flex-1">
            <SiteChrome>{children}</SiteChrome>
          </main>
        </AppProviders>
      </body>
    </html>
  );
}
