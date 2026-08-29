"use client";

import { useEffect, useMemo, useState } from "react";
import AdminTourism from "@/components/admin/AdminTourism";
import AdminPopularRoutes from "@/components/admin/AdminPopularRoutes";
import AdminLogin from "@/components/admin/AdminLogin";
import AdminShell, { type AdminSection } from "@/components/admin/AdminShell";
import AdminHeader from "@/components/admin/AdminHeader";
import AdminReviews from "@/components/admin/AdminReviews";
import AdminDashboard from "@/components/admin/AdminDashboard";
import AdminEnquiries from "@/components/admin/AdminEnquiries";
import AdminBookings from "@/components/admin/AdminBookings";
import type { Review, ReviewStatus } from "@/lib/reviews";
import type { Enquiry, EnquiryStatus } from "@/lib/enquiries";
import type { Booking, BookingStatus } from "@/lib/bookings";
import type { TourismTrip } from "@/lib/tourism";
import type { PopularRoute } from "@/lib/popular-routes";

type ReviewTab = "pending" | "approved" | "rejected";
type EnquiryTab = "new" | "read" | "closed";
type BookingTab = "new" | "confirmed" | "cancelled" | "completed";

export default function AdminPage() {
  const [authed, setAuthed] = useState<boolean | null>(null);
  const [loginError, setLoginError] = useState("");
  const [section, setSection] = useState<AdminSection>("dashboard");
  const [reviews, setReviews] = useState<Review[]>([]);
  const [enquiries, setEnquiries] = useState<Enquiry[]>([]);
  const [bookings, setBookings] = useState<Booking[]>([]);
  const [tourismCount, setTourismCount] = useState(0);
  const [routesCount, setRoutesCount] = useState(0);
  const [reviewTab, setReviewTab] = useState<ReviewTab>("pending");
  const [enquiryTab, setEnquiryTab] = useState<EnquiryTab>("new");
  const [bookingTab, setBookingTab] = useState<BookingTab>("new");
  const [busy, setBusy] = useState<string | null>(null);
  const [loadError, setLoadError] = useState("");
  const [setupNotice, setSetupNotice] = useState("");

  async function checkSession() {
    const res = await fetch("/api/admin/session");
    const data = (await res.json()) as { authed?: boolean };
    if (!data.authed) {
      setAuthed(false);
      return false;
    }
    return true;
  }

  async function loadAll() {
    const [reviewsRes, enquiriesRes, bookingsRes, tourismRes, routesRes] = await Promise.all([
      fetch("/api/admin/reviews"),
      fetch("/api/admin/enquiries"),
      fetch("/api/admin/bookings"),
      fetch("/api/admin/tourism"),
      fetch("/api/admin/popular-routes"),
    ]);

    if ([reviewsRes, enquiriesRes, bookingsRes].some((r) => r.status === 401)) {
      setAuthed(false);
      return;
    }

    const reviewsData = (await reviewsRes.json()) as { reviews?: Review[]; error?: string };
    const enquiriesData = (await enquiriesRes.json()) as {
      enquiries?: Enquiry[];
      error?: string;
      setupRequired?: boolean;
    };
    const bookingsData = (await bookingsRes.json()) as {
      bookings?: Booking[];
      error?: string;
      setupRequired?: boolean;
    };
    const tourismData = (await tourismRes.json()) as { trips?: TourismTrip[] };
    const routesData = (await routesRes.json()) as { routes?: PopularRoute[] };

    setReviews(reviewsData.reviews ?? []);
    setEnquiries(enquiriesData.enquiries ?? []);
    setBookings(bookingsData.bookings ?? []);
    setTourismCount((tourismData.trips ?? []).filter((t) => t.published).length);
    setRoutesCount((routesData.routes ?? []).filter((r) => r.published).length);

    const notices: string[] = [];
    if (enquiriesData.setupRequired) {
      notices.push("Run supabase/enquiries_bookings.sql for Enquiries.");
    }
    if (bookingsData.setupRequired) {
      notices.push("Run supabase/enquiries_bookings.sql for Bookings.");
    }
    setSetupNotice(notices.join(" "));

    setLoadError(!reviewsRes.ok ? reviewsData.error || "Could not load reviews." : "");
    setAuthed(true);
  }

  useEffect(() => {
    checkSession()
      .then((ok) => {
        if (ok) return loadAll();
      })
      .catch(() => setAuthed(false));
  }, []);

  async function login(emailInput: string, passwordInput: string) {
    setLoginError("");
    const res = await fetch("/api/admin/login", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ email: emailInput, password: passwordInput }),
    });
    const data = (await res.json()) as { error?: string };
    if (!res.ok) {
      setLoginError(data.error || "Login failed.");
      return;
    }
    await loadAll();
  }

  async function logout() {
    await fetch("/api/admin/logout", { method: "POST" });
    setAuthed(false);
    setReviews([]);
    setEnquiries([]);
    setBookings([]);
  }

  async function setReviewStatus(id: string, status: ReviewStatus) {
    setBusy(id);
    const res = await fetch("/api/admin/reviews", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBusy(null);
    if (res.ok) {
      setReviews((list) => list.map((item) => (item.id === id ? { ...item, status } : item)));
    }
  }

  async function setEnquiryStatus(id: string, status: EnquiryStatus) {
    setBusy(id);
    const res = await fetch("/api/admin/enquiries", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBusy(null);
    if (res.ok) {
      setEnquiries((list) => list.map((item) => (item.id === id ? { ...item, status } : item)));
    }
  }

  async function setBookingStatus(id: string, status: BookingStatus) {
    setBusy(id);
    const res = await fetch("/api/admin/bookings", {
      method: "PATCH",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ id, status }),
    });
    setBusy(null);
    if (res.ok) {
      setBookings((list) => list.map((item) => (item.id === id ? { ...item, status } : item)));
    }
  }

  const reviewCounts = useMemo(
    () => ({
      pending: reviews.filter((r) => r.status === "pending").length,
      approved: reviews.filter((r) => r.status === "approved").length,
      rejected: reviews.filter((r) => r.status === "rejected").length,
    }),
    [reviews]
  );

  const enquiryCounts = useMemo(
    () => ({
      new: enquiries.filter((e) => e.status === "new").length,
      read: enquiries.filter((e) => e.status === "read").length,
      closed: enquiries.filter((e) => e.status === "closed").length,
    }),
    [enquiries]
  );

  const bookingCounts = useMemo(
    () => ({
      new: bookings.filter((b) => b.status === "new").length,
      confirmed: bookings.filter((b) => b.status === "confirmed").length,
      cancelled: bookings.filter((b) => b.status === "cancelled").length,
      completed: bookings.filter((b) => b.status === "completed").length,
    }),
    [bookings]
  );

  const badges = {
    bookings: bookingCounts.new,
    enquiries: enquiryCounts.new,
    reviews: reviewCounts.pending,
  };

  const headerBadge =
    section === "bookings"
      ? badges.bookings
      : section === "enquiries"
        ? badges.enquiries
        : section === "reviews"
          ? badges.reviews
          : undefined;

  if (authed === null) {
    return (
      <div className="flex min-h-svh items-center justify-center bg-[#f0f2f5]">
        <div className="rounded-xl border border-black/[0.06] bg-white px-8 py-6 shadow-sm">
          <div className="mx-auto mb-3 h-8 w-8 animate-spin rounded-full border-2 border-brand/20 border-t-brand" />
          <p className="text-sm font-medium text-navy/50">Loading dashboard...</p>
        </div>
      </div>
    );
  }

  if (!authed) {
    return <AdminLogin onLogin={login} error={loginError} />;
  }

  return (
    <AdminShell section={section} onSectionChange={setSection} onLogout={logout} badges={badges}>
      {setupNotice ? (
        <p className="mb-4 rounded-xl border border-amber-200 bg-amber-50 px-4 py-3 text-[13px] text-amber-900">
          {setupNotice}
        </p>
      ) : null}

      {section !== "dashboard" ? (
        <AdminHeader section={section} badge={headerBadge} />
      ) : (
        <header className="mb-6 rounded-2xl border border-black/[0.06] bg-white px-5 py-5 shadow-sm sm:px-6">
          <p className="text-[11px] font-semibold uppercase tracking-[0.12em] text-navy/35">Overview</p>
          <h1 className="mt-0.5 text-xl font-bold tracking-tight text-navy sm:text-2xl">Dashboard</h1>
          <p className="mt-1.5 text-[13px] leading-relaxed text-navy/50">
            Welcome back. Here is a quick summary of your site activity.
          </p>
        </header>
      )}

      {section === "dashboard" ? (
        <AdminDashboard
          stats={{
            pendingReviews: reviewCounts.pending,
            newBookings: bookingCounts.new,
            newEnquiries: enquiryCounts.new,
            tourismLive: tourismCount,
            routesLive: routesCount,
          }}
          onNavigate={setSection}
        />
      ) : section === "bookings" ? (
        <AdminBookings
          bookings={bookings}
          tab={bookingTab}
          onTabChange={setBookingTab}
          onSetStatus={setBookingStatus}
          busy={busy}
          loadError={loadError}
          counts={bookingCounts}
        />
      ) : section === "enquiries" ? (
        <AdminEnquiries
          enquiries={enquiries}
          tab={enquiryTab}
          onTabChange={setEnquiryTab}
          onSetStatus={setEnquiryStatus}
          busy={busy}
          loadError={loadError}
          counts={enquiryCounts}
        />
      ) : section === "tourism" ? (
        <AdminTourism onChanged={loadAll} active={section === "tourism"} />
      ) : section === "routes" ? (
        <AdminPopularRoutes mode="list" onChanged={loadAll} active={section === "routes"} />
      ) : section === "routes-add" ? (
        <AdminPopularRoutes
          mode="add"
          onChanged={loadAll}
          onGoBack={() => setSection("routes")}
          active={section === "routes-add"}
        />
      ) : (
        <AdminReviews
          reviews={reviews}
          tab={reviewTab}
          onTabChange={setReviewTab}
          onSetStatus={setReviewStatus}
          busy={busy}
          loadError={loadError}
          counts={reviewCounts}
        />
      )}
    </AdminShell>
  );
}
