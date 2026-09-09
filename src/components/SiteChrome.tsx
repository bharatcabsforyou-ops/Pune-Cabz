"use client";

import { usePathname } from "next/navigation";
import type { ReactNode } from "react";
import Footer from "@/components/Footer";
import ReviewsSection from "@/components/ReviewsSection";
import ContactFloats from "@/components/ContactFloats";
import { useAdminChrome } from "@/lib/admin-chrome";

export default function SiteChrome({ children }: { children: ReactNode }) {
  const pathname = usePathname();
  const { hideSiteChrome } = useAdminChrome();
  const isAdminDashboard = pathname.startsWith("/admin") && hideSiteChrome;
  const hideReviews = pathname.startsWith("/about/testimonials") || pathname.startsWith("/admin");

  return (
    <>
      {children}
      {!isAdminDashboard ? (
        <>
          {!hideReviews ? <ReviewsSection /> : null}
          <Footer />
          {!pathname.startsWith("/admin") ? <ContactFloats /> : null}
        </>
      ) : null}
    </>
  );
}
