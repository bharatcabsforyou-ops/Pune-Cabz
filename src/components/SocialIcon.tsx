import WhatsAppIcon from "./WhatsAppIcon";

export type SocialName = "facebook" | "twitter" | "youtube" | "instagram" | "whatsapp";

const paths: Record<Exclude<SocialName, "whatsapp">, React.ReactNode> = {
  facebook: (
    <path d="M14.5 8.5V6.75c0-.69.56-1.25 1.25-1.25H17V3h-2.2C12.68 3 11 4.79 11 7v1.5H9v3h2V21h3.5v-9.5H17l.5-3h-3z" />
  ),
  twitter: (
    <path d="M18.24 4H20.8l-5.66 6.47L21.8 20h-5.3l-4.15-5.43L7.6 20H5.02l6.06-6.92L4.2 4h5.44l3.75 4.97L18.24 4zm-.93 14.4h1.47L8.76 5.52H7.18l10.13 12.88z" />
  ),
  youtube: (
    <path d="M21.6 7.2s-.2-1.46-.84-2.1c-.8-.84-1.7-.86-2.12-.91C16.2 4 12 4 12 4s-4.2 0-6.64.19c-.42.05-1.32.07-2.12.91-.64.64-.84 2.1-.84 2.1S2.2 8.92 2.2 10.64v1.62c0 1.72.2 3.44.2 3.44s.2 1.46.84 2.1c.8.84 1.86.81 2.33.9 1.69.16 7.43.21 7.43.21s4.2-.01 6.64-.2c.42-.05 1.32-.07 2.12-.91.64-.64.84-2.1.84-2.1s.2-1.72.2-3.44v-1.62c0-1.72-.2-3.44-.2-3.44zM10 14.5v-5l4.8 2.5-4.8 2.5z" />
  ),
  instagram: (
    <path d="M7.8 2h8.4C19.4 2 22 4.6 22 7.8v8.4a5.8 5.8 0 0 1-5.8 5.8H7.8C4.6 22 2 19.4 2 16.2V7.8A5.8 5.8 0 0 1 7.8 2zm-.2 2A3.6 3.6 0 0 0 4 7.6v8.8C4 18.39 5.61 20 7.6 20h8.8a3.6 3.6 0 0 0 3.6-3.6V7.6C20 5.61 18.39 4 16.4 4H7.6zm9.65 1.5a1.25 1.25 0 1 1 0 2.5 1.25 1.25 0 0 1 0-2.5zM12 7a5 5 0 1 1 0 10 5 5 0 0 1 0-10zm0 2a3 3 0 1 0 0 6 3 3 0 0 0 0-6z" />
  ),
};

export default function SocialIcon({
  name,
  className,
}: {
  name: SocialName;
  className?: string;
}) {
  if (name === "whatsapp") {
    return <WhatsAppIcon className={className} />;
  }

  return (
    <svg viewBox="0 0 24 24" fill="currentColor" className={className} aria-hidden="true">
      {paths[name]}
    </svg>
  );
}
