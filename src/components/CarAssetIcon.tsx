import Image from "next/image";
import clsx from "clsx";
import { carAssets, type CarAssetKey } from "@/lib/car-icons";

const sizes = {
  sm: 36,
  md: 44,
  lg: 52,
} as const;

export default function CarAssetIcon({
  asset,
  alt,
  size = "md",
  className,
}: {
  asset: CarAssetKey;
  alt: string;
  size?: keyof typeof sizes;
  className?: string;
}) {
  const px = sizes[size];

  return (
    <span
      className={clsx(
        "relative inline-flex shrink-0 items-center justify-center",
        className
      )}
      style={{ width: px, height: px }}
    >
      <Image
        src={carAssets[asset]}
        alt={alt}
        width={px}
        height={px}
        className="h-full w-full object-contain drop-shadow-[0_2px_6px_rgba(26,10,12,0.12)]"
      />
    </span>
  );
}
