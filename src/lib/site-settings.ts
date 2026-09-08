import { site } from "@/lib/site";

export type SiteSettings = {
  phone: string;
  phoneHref: string;
  email: string;
  emailHref: string;
  whatsapp: string;
  whatsappHref: string;
  instagram: string;
  address: string;
  addressLine: string;
  city: string;
};

export function defaultSiteSettings(): SiteSettings {
  return {
    phone: site.phone,
    phoneHref: site.phoneHref,
    email: site.email,
    emailHref: site.emailHref,
    whatsapp: site.whatsapp,
    whatsappHref: site.whatsappHref,
    instagram: site.instagram,
    address: site.address,
    addressLine: site.addressLine,
    city: site.city,
  };
}

export function normalizePhoneToWhatsApp(phone: string) {
  const digits = phone.replace(/\D/g, "");
  if (digits.length === 10) return `91${digits}`;
  if (digits.startsWith("91") && digits.length >= 12) return digits;
  return digits || site.whatsapp;
}

export function buildSiteSettings(input: Partial<SiteSettings>): SiteSettings {
  const base = defaultSiteSettings();
  const phone = (input.phone ?? base.phone).trim() || base.phone;
  const email = (input.email ?? base.email).trim() || base.email;
  const whatsappRaw = (input.whatsapp ?? "").trim();
  const whatsapp = whatsappRaw
    ? normalizePhoneToWhatsApp(whatsappRaw)
    : normalizePhoneToWhatsApp(phone);
  const phoneDigits = phone.replace(/\D/g, "");
  const phoneHref =
    input.phoneHref?.trim() ||
    (phoneDigits ? `tel:+${phoneDigits.startsWith("91") ? phoneDigits : `91${phoneDigits.slice(-10)}`}` : base.phoneHref);

  return {
    phone,
    phoneHref,
    email,
    emailHref: input.emailHref?.trim() || `mailto:${email}`,
    whatsapp,
    whatsappHref:
      input.whatsappHref?.trim() ||
      `https://wa.me/${whatsapp}?text=${encodeURIComponent("Hi Pune Cabz, I need help with a ride.")}`,
    instagram: (input.instagram ?? base.instagram).trim() || base.instagram,
    address: (input.address ?? base.address).trim() || base.address,
    addressLine: (input.addressLine ?? base.addressLine).trim() || base.addressLine,
    city: (input.city ?? base.city).trim() || base.city,
  };
}
