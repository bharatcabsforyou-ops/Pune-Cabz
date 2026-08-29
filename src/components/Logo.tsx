import Image from "next/image";
import clsx from "clsx";
import { images } from "@/lib/images";

export default function Logo({ className }: { className?: string; dark?: boolean }) {
  return (
    <span
      className={clsx(
        "relative block h-9 w-[7.75rem] max-w-[46vw] sm:h-11 sm:w-[10.5rem] sm:max-w-none",
        className
      )}
    >
      <Image
        src={images.logo}
        alt="Pune Cabz"
        fill
        priority
        sizes="(max-width: 640px) 124px, 168px"
        className="object-contain object-left"
      />
    </span>
  );
}
