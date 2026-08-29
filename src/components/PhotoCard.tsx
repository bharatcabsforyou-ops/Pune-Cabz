"use client";

import Image from "next/image";
import { motion } from "framer-motion";
import { Star, ShieldCheck } from "lucide-react";
import clsx from "clsx";

export default function PhotoCard({
  src,
  alt,
  variant = "wide",
  className,
  badge,
  priority,
}: {
  src: string;
  alt: string;
  variant?: "wide" | "portrait" | "square" | "banner";
  className?: string;
  badge?: "rating" | "verified" | false;
  priority?: boolean;
}) {
  const isBanner = variant === "banner";
  const aspect = {
    wide: "aspect-4/3",
    portrait: "aspect-3/4",
    square: "aspect-square",
    banner: "",
  }[variant];

  return (
    <motion.div
      initial={{ opacity: 0, scale: 0.94, y: 16 }}
      whileInView={{ opacity: 1, scale: 1, y: 0 }}
      viewport={{ once: true, amount: 0.3 }}
      transition={{ duration: 0.7, ease: [0.21, 0.47, 0.32, 0.98] }}
      className={clsx(
        "relative w-full overflow-hidden rounded-3xl bg-navy shadow-2xl shadow-navy/20 ring-1 ring-black/5",
        aspect,
        className
      )}
    >
      {isBanner ? (
        <Image
          src={src}
          alt={alt}
          width={1536}
          height={1024}
          priority={priority}
          sizes="(min-width: 1024px) 50vw, 100vw"
          className="h-auto w-full"
        />
      ) : (
        <>
          <Image
            src={src}
            alt={alt}
            fill
            priority={priority}
            sizes="(min-width: 1024px) 50vw, 100vw"
            className="object-cover"
          />
          <div className="absolute inset-0 bg-gradient-to-t from-navy/25 via-transparent to-transparent" />
        </>
      )}

      {badge === "rating" && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute right-4 top-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-navy shadow-lg backdrop-blur-sm"
        >
          <Star className="h-3.5 w-3.5 fill-amber-400 text-amber-400" />
          4.8 rated
        </motion.div>
      )}

      {badge === "verified" && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          whileInView={{ opacity: 1, y: 0, scale: 1 }}
          viewport={{ once: true }}
          transition={{ delay: 0.4, duration: 0.5 }}
          className="absolute bottom-4 left-4 flex items-center gap-1.5 rounded-full bg-white/95 px-3 py-1.5 text-xs font-bold text-navy shadow-lg backdrop-blur-sm"
        >
          <ShieldCheck className="h-3.5 w-3.5 text-emerald-500" />
          Verified rider
        </motion.div>
      )}
    </motion.div>
  );
}
