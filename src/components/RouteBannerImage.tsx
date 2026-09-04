"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { images } from "@/lib/images";

const FALLBACK = images.film1;

/** Full banner visible — no crop for branded route artwork */
export default function RouteBannerImage({
  src,
  alt,
  className,
  priority,
  rounded = "xl",
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
  rounded?: "none" | "lg" | "xl" | "2xl" | "3xl";
}) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK);

  useEffect(() => {
    setImgSrc(src || FALLBACK);
  }, [src]);

  const radius = {
    none: "",
    lg: "rounded-lg",
    xl: "rounded-xl",
    "2xl": "rounded-2xl",
    "3xl": "rounded-3xl",
  }[rounded];

  return (
    <div
      className={clsx(
        "overflow-hidden bg-[#1a1214]",
        radius,
        className
      )}
    >
      <Image
        src={imgSrc}
        alt={alt}
        width={1536}
        height={1024}
        priority={priority}
        sizes="(min-width: 1024px) 480px, 100vw"
        className="h-auto w-full object-contain object-center"
        onError={() => setImgSrc(FALLBACK)}
      />
    </div>
  );
}
