import type { CareerOpening, CareerOpeningInput } from "@/lib/career";

export const CAREER_SELECT_BASE =
  "id, title, type, location, department, description, requirements, published, sort_order, created_at";

export const CAREER_SELECT_FULL =
  "id, title, type, location, department, description, responsibilities, requirements, benefits, experience, salary, image_url, published, sort_order, created_at";

export type CareerRow = {
  id: string;
  title: string;
  type: string;
  location: string;
  department: string;
  description: string;
  responsibilities?: string | null;
  requirements: string | null;
  benefits?: string | null;
  experience?: string | null;
  salary?: string | null;
  image_url?: string | null;
  published: boolean;
  sort_order: number;
  created_at: string;
};

export function mapCareerRow(row: CareerRow): CareerOpening {
  return {
    id: row.id,
    title: row.title,
    type: row.type,
    location: row.location,
    department: row.department,
    description: row.description,
    responsibilities: row.responsibilities?.trim() ?? "",
    requirements: row.requirements?.trim() ?? "",
    benefits: row.benefits?.trim() ?? "",
    experience: row.experience?.trim() ?? "",
    salary: row.salary?.trim() ?? "",
    imageUrl: row.image_url?.trim() || "/image1.jpeg",
    published: row.published,
    sortOrder: row.sort_order,
    createdAt: row.created_at,
    isSeed: false,
  };
}

export function careerDbPayload(input: CareerOpeningInput, includeExtras = true) {
  const base = {
    title: input.title,
    type: input.type,
    location: input.location,
    department: input.department,
    description: input.description,
    requirements: input.requirements,
    published: input.published,
    sort_order: input.sortOrder,
  };
  if (!includeExtras) return base;
  return {
    ...base,
    responsibilities: input.responsibilities,
    benefits: input.benefits,
    experience: input.experience,
    salary: input.salary,
    image_url: input.imageUrl,
  };
}

export function isMissingCareerTable(message: string) {
  const lower = message.toLowerCase();
  return (
    lower.includes("career_openings") ||
    lower.includes("does not exist") ||
    lower.includes("schema cache")
  );
}

export function isMissingCareerExtraColumns(message: string) {
  const lower = message.toLowerCase();
  return (
    lower.includes("responsibilities") ||
    lower.includes("benefits") ||
    lower.includes("experience") ||
    lower.includes("salary") ||
    lower.includes("image_url")
  );
}
