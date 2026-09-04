"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";
import ContactFloats from "@/components/ContactFloats";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const isAdmin = pathname.startsWith("/admin");
  const hideReviews = pathname.startsWith("/about/testimonials");

  return (
    <>
      {children}
      {!isAdmin ? (
        <>
          {!hideReviews ? <ReviewsSection /> : null}
          <Footer />
          <ContactFloats />
        </>
      ) : null}
    </>
  );
}
