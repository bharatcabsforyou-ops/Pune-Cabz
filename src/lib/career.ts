export type CareerOpening = {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  experience: string;
  salary: string;
  imageUrl: string;
  published: boolean;
  sortOrder: number;
  createdAt?: string;
  isSeed?: boolean;
};

export type CareerOpeningInput = {
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
  responsibilities: string;
  requirements: string;
  benefits: string;
  experience: string;
  salary: string;
  imageUrl: string;
  published: boolean;
  sortOrder: number;
};

const UUID_RE =
  /^[0-9a-f]{8}-[0-9a-f]{4}-[1-5][0-9a-f]{3}-[89ab][0-9a-f]{3}-[0-9a-f]{12}$/i;

export function isPersistedCareerId(id: string) {
  return UUID_RE.test(id);
}

export function careerTypeLabel(opening: Pick<CareerOpening, "type" | "location">) {
  return `${opening.type} · ${opening.location}`;
}

export function splitCareerLines(value: string) {
  return value
    .split("\n")
    .map((line) => line.replace(/^[-•*]\s*/, "").trim())
    .filter(Boolean);
}

export function careerApplyWhatsAppHref(
  whatsappDigits: string,
  opening: Pick<CareerOpening, "title" | "department" | "location" | "type">
) {
  const digits = whatsappDigits.replace(/\D/g, "") || "919595933899";
  const text = [
    `Hi Pune Cabz, I want to apply for: ${opening.title}`,
    `Department: ${opening.department}`,
    `Type: ${opening.type}`,
    `Location: ${opening.location}`,
    "",
    "Please share next steps. My details:",
    "Name:",
    "Phone:",
    "City:",
    "Experience:",
  ].join("\n");
  return `https://wa.me/${digits}?text=${encodeURIComponent(text)}`;
}

export function sortCareerOpenings(openings: CareerOpening[]) {
  return [...openings].sort((a, b) => {
    if (a.sortOrder !== b.sortOrder) return a.sortOrder - b.sortOrder;
    return (b.createdAt ?? "").localeCompare(a.createdAt ?? "");
  });
}

export function mergeCareerOpenings(fromDb: CareerOpening[], seeds: CareerOpening[]) {
  const byTitle = new Set(fromDb.map((o) => o.title.toLowerCase().trim()));
  const extras = seeds.filter((s) => !byTitle.has(s.title.toLowerCase().trim()));
  return sortCareerOpenings([...fromDb, ...extras]);
}

export function validateCareerOpeningInput(input: Partial<CareerOpeningInput>) {
  const title = String(input.title ?? "").trim();
  const type = String(input.type ?? "").trim() || "Full-time";
  const location = String(input.location ?? "").trim() || "Pune";
  const department = String(input.department ?? "").trim() || "Operations";
  const description = String(input.description ?? "").trim();
  const responsibilities = String(input.responsibilities ?? "").trim();
  const requirements = String(input.requirements ?? "").trim();
  const benefits = String(input.benefits ?? "").trim();
  const experience = String(input.experience ?? "").trim();
  const salary = String(input.salary ?? "").trim();
  const imageUrl = String(input.imageUrl ?? "").trim() || "/image1.jpeg";
  const sortOrder = Number(input.sortOrder ?? 0);
  const published = Boolean(input.published);

  if (title.length < 3 || title.length > 100) {
    return { error: "Title must be 3–100 characters." };
  }
  if (type.length < 2 || type.length > 40) {
    return { error: "Employment type must be 2–40 characters." };
  }
  if (location.length < 2 || location.length > 60) {
    return { error: "Location must be 2–60 characters." };
  }
  if (department.length < 2 || department.length > 60) {
    return { error: "Department must be 2–60 characters." };
  }
  if (description.length < 20 || description.length > 4000) {
    return { error: "About the role must be 20–4000 characters." };
  }
  if (responsibilities.length > 6000) {
    return { error: "Responsibilities must be under 6000 characters." };
  }
  if (requirements.length > 4000) {
    return { error: "Requirements must be under 4000 characters." };
  }
  if (benefits.length > 4000) {
    return { error: "Benefits must be under 4000 characters." };
  }
  if (experience.length > 80) {
    return { error: "Experience must be under 80 characters." };
  }
  if (salary.length > 80) {
    return { error: "Salary must be under 80 characters." };
  }
  if (imageUrl.length < 4 || imageUrl.length > 500) {
    return { error: "Role image is required." };
  }
  if (!Number.isFinite(sortOrder) || sortOrder < 0 || sortOrder > 999) {
    return { error: "Sort order must be between 0 and 999." };
  }

  return {
    data: {
      title,
      type,
      location,
      department,
      description,
      responsibilities,
      requirements,
      benefits,
      experience,
      salary,
      imageUrl,
      sortOrder,
      published,
    },
  };
}
