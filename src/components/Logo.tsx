import clsx from "clsx";
import Image from "next/image";
import { images } from "@/lib/images";

const sizeClasses = {
  nav: "h-12 w-auto max-w-[min(11.5rem,48vw)] sm:h-[3.35rem] sm:max-w-[13.5rem] xl:h-14 xl:max-w-[15.5rem]",
  default: "h-12 w-auto max-w-[12rem] sm:h-14 sm:max-w-[14rem] lg:h-16 lg:max-w-[16rem]",
} as const;

export default function Logo({
  className,
  dark = false,
  size = "default",
}: {
  className?: string;
  dark?: boolean;
  size?: keyof typeof sizeClasses;
}) {
  return (
    <span
      className={clsx(
        "relative inline-flex shrink-0 items-center",
        dark && "rounded-lg bg-white px-2 py-1.5 shadow-sm ring-1 ring-white/20 sm:px-2.5",
        className
      )}
    >
      <Image
        src={images.logoNav}
        alt="Pune Cabz — Travellers Choice"
        width={2078}
        height={721}
        priority={size === "nav"}
        className={clsx("object-contain object-left", sizeClasses[size])}
      />
    </span>
  );
}
