export type RouteInquiryInput = {
  fromCity: string;
  toCity: string;
  travelDate?: string;
  passengers?: number;
};

export function validateRouteInquiryInput(input: Partial<RouteInquiryInput>) {
  const fromCity = String(input.fromCity ?? "").trim();
  const toCity = String(input.toCity ?? "").trim();
  const travelDate = String(input.travelDate ?? "").trim();
  const passengers = Number(input.passengers ?? 1);

  if (fromCity.length < 2 || fromCity.length > 40) {
    return { error: "From city is required." };
  }
  if (toCity.length < 2 || toCity.length > 40) {
    return { error: "To city is required." };
  }
  if (travelDate && !/^\d{4}-\d{2}-\d{2}$/.test(travelDate)) {
    return { error: "Invalid travel date." };
  }
  if (!Number.isFinite(passengers) || passengers < 1 || passengers > 12) {
    return { error: "Passengers must be between 1 and 12." };
  }

  return {
    data: {
      fromCity,
      toCity,
      travelDate: travelDate || undefined,
      passengers,
    },
  };
}
