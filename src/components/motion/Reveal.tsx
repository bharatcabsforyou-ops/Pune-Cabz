"use client";

import { motion, Variants } from "framer-motion";
import { ReactNode } from "react";

type Direction = "up" | "left" | "right" | "none";

const offsets: Record<Direction, { x?: number; y?: number }> = {
  up: { y: 28 },
  left: { x: -28 },
  right: { x: 28 },
  none: {},
};

export default function Reveal({
  children,
  direction = "up",
  delay = 0,
  duration = 0.6,
  className,
  once = true,
  amount = 0.25,
}: {
  children: ReactNode;
  direction?: Direction;
  delay?: number;
  duration?: number;
  className?: string;
  once?: boolean;
  amount?: number;
}) {
  const variants: Variants = {
    hidden: { opacity: 0, ...offsets[direction] },
    visible: {
      opacity: 1,
      x: 0,
      y: 0,
      transition: { duration, delay, ease: [0.21, 0.47, 0.32, 0.98] },
    },
  };

  return (
    <motion.div
      className={className}
      initial="hidden"
      whileInView="visible"
      viewport={{ once, amount }}
      variants={variants}
    >
      {children}
    </motion.div>
  );
}
