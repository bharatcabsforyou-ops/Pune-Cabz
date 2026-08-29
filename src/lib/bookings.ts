export type BookingStatus = "new" | "confirmed" | "cancelled" | "completed";

export type Booking = {
  id: string;
  name: string;
  phone: string;
  email: string;
  fromCity: string;
  toCity: string;
  travelDate: string;
  passengers: number;
  notes: string;
  status: BookingStatus;
  createdAt: string;
};

export type BookingInput = {
  name: string;
  phone: string;
  email?: string;
  fromCity: string;
  toCity: string;
  travelDate: string;
  passengers: number;
  notes?: string;
};

export function validateBookingInput(input: Partial<BookingInput>) {
  const name = String(input.name ?? "").trim();
  const phone = String(input.phone ?? "").trim().replace(/\s+/g, "");
  const email = String(input.email ?? "").trim().toLowerCase();
  const fromCity = String(input.fromCity ?? "").trim();
  const toCity = String(input.toCity ?? "").trim();
  const travelDate = String(input.travelDate ?? "").trim();
  const passengers = Number(input.passengers ?? 1);
  const notes = String(input.notes ?? "").trim();

  if (name.length < 2 || name.length > 80) {
    return { error: "Name must be 2–80 characters." };
  }
  if (!/^[6-9]\d{9}$/.test(phone)) {
    return { error: "Enter a valid 10-digit Indian mobile number." };
  }
  if (email && !/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address." };
  }
  if (fromCity.length < 2 || fromCity.length > 40) {
    return { error: "From city is required." };
  }
  if (toCity.length < 2 || toCity.length > 40) {
    return { error: "To city is required." };
  }
  if (!/^\d{4}-\d{2}-\d{2}$/.test(travelDate)) {
    return { error: "Pick a valid travel date." };
  }
  if (!Number.isFinite(passengers) || passengers < 1 || passengers > 12) {
    return { error: "Passengers must be between 1 and 12." };
  }
  if (notes.length > 500) {
    return { error: "Notes must be under 500 characters." };
  }

  return {
    data: { name, phone, email, fromCity, toCity, travelDate, passengers, notes },
  };
}

export function formatBookingDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}

export function formatTravelDate(date: string) {
  return new Date(`${date}T00:00:00`).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}
