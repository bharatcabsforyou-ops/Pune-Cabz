import clsx from "clsx";
import type { ComponentType } from "react";

type IconComponent = ComponentType<{ className?: string; strokeWidth?: number }>;

const sizes = {
  sm: { box: "h-9 w-9 rounded-lg", icon: "h-4 w-4" },
  md: { box: "h-10 w-10 rounded-xl", icon: "h-5 w-5" },
  lg: { box: "h-11 w-11 rounded-xl", icon: "h-5 w-5" },
} as const;

export default function FeatureIcon({
  icon: Icon,
  className,
  iconClassName,
  size = "md",
  variant: _variant = "brand",
  strokeWidth = 2,
}: {
  icon: IconComponent;
  className?: string;
  iconClassName?: string;
  size?: keyof typeof sizes;
  variant?: "brand" | "whatsapp";
  strokeWidth?: number;
}) {
  const s = sizes[size];
  const tone = "bg-brand/[0.09] text-brand ring-1 ring-brand/12";

  return (
    <span
      className={clsx(
        "flex shrink-0 items-center justify-center",
        s.box,
        tone,
        className
      )}
    >
      <Icon className={clsx(s.icon, iconClassName)} strokeWidth={strokeWidth} />
    </span>
  );
}
