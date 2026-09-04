"use client";

import { useEffect, useState } from "react";
import Image from "next/image";
import clsx from "clsx";
import { images } from "@/lib/images";

const FALLBACK = images.film1;

export default function TravelCardImage({
  src,
  alt,
  className,
  priority,
}: {
  src: string;
  alt: string;
  className?: string;
  priority?: boolean;
}) {
  const [imgSrc, setImgSrc] = useState(src || FALLBACK);

  useEffect(() => {
    setImgSrc(src || FALLBACK);
  }, [src]);

  return (
    <div
      className={clsx(
        "relative aspect-[16/10] w-full overflow-hidden bg-surface",
        className
      )}
    >
      <Image
        src={imgSrc}
        alt={alt}
        fill
        priority={priority}
        sizes="(min-width: 768px) 400px, 100vw"
        className="object-cover object-center transition-transform duration-500 group-hover:scale-[1.03]"
        onError={() => setImgSrc(FALLBACK)}
      />
      <div className="pointer-events-none absolute inset-0 bg-gradient-to-t from-black/10 via-transparent to-transparent" />
    </div>
  );
}
