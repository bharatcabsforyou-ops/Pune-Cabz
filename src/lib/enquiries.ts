export type EnquiryStatus = "new" | "read" | "closed";

export type Enquiry = {
  id: string;
  name: string;
  email: string;
  subject: string;
  message: string;
  status: EnquiryStatus;
  createdAt: string;
};

export type EnquiryInput = {
  name: string;
  email: string;
  subject: string;
  message: string;
};

export function validateEnquiryInput(input: Partial<EnquiryInput>) {
  const name = String(input.name ?? "").trim();
  const email = String(input.email ?? "").trim().toLowerCase();
  const subject = String(input.subject ?? "").trim();
  const message = String(input.message ?? "").trim();

  if (name.length < 2 || name.length > 80) {
    return { error: "Name must be 2–80 characters." };
  }
  if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(email)) {
    return { error: "Enter a valid email address." };
  }
  if (subject.length < 2 || subject.length > 120) {
    return { error: "Subject must be 2–120 characters." };
  }
  if (message.length < 10 || message.length > 2000) {
    return { error: "Message must be 10–2000 characters." };
  }

  return { data: { name, email, subject, message } };
}

export function formatEnquiryDate(iso: string) {
  return new Date(iso).toLocaleDateString("en-IN", {
    day: "numeric",
    month: "short",
    year: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });
}
