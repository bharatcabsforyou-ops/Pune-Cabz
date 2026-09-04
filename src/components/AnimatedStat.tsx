"use client";

import Counter from "@/components/motion/Counter";

export default function AnimatedStat({
  value,
  suffix = "",
  decimals = 0,
  label,
  labelClass = "text-[12px] font-medium text-white/50",
  valueClass = "text-2xl font-extrabold leading-none text-white",
}: {
  value: number;
  suffix?: string;
  decimals?: number;
  label: string;
  labelClass?: string;
  valueClass?: string;
}) {
  return (
    <div className="text-center">
      <Counter value={value} suffix={suffix} decimals={decimals} className={valueClass} />
      <p className={`mt-1 ${labelClass}`}>{label}</p>
    </div>
  );
}
