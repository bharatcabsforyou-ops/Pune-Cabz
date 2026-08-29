"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";
import ContactFloats from "@/components/ContactFloats";
import CarCursor from "@/components/CarCursor";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");

  return (
    <>
      {children}
      {!isAdmin ? (
        <>
          <ReviewsSection />
          <Footer />
          <ContactFloats />
          <CarCursor />
        </>
      ) : null}
    </>
  );
}
