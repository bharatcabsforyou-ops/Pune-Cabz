export type ReviewStatus = "pending" | "approved" | "rejected";

export type Review = {
  id: string;
  name: string;
  city: string;
  rating: number;
  route: string;
  text: string;
  date: string;
  status?: ReviewStatus;
};

export function formatReviewDate(iso: string) {
  const date = new Date(`${iso.slice(0, 10)}T12:00:00`);
  if (Number.isNaN(date.getTime())) return iso;
  return date.toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
  });
}

export function initials(name: string) {
  return name
    .split(" ")
    .filter(Boolean)
    .slice(0, 2)
    .map((part) => part[0]?.toUpperCase() ?? "")
    .join("");
}

export function mergeHeroReviews(seed: Review[], approved: Review[], limit = 3) {
  const seen = new Set<string>();
  const merged: Review[] = [];

  for (const review of [...approved, ...seed]) {
    const key = review.id || `${review.name}-${review.date}`;
    if (seen.has(key)) continue;
    seen.add(key);
    merged.push(review);
  }

  return merged
    .sort((a, b) => (a.date < b.date ? 1 : a.date > b.date ? -1 : 0))
    .slice(0, limit);
}
