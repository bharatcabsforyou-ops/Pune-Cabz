import clsx from "clsx";
import BrandIcon from "./BrandIcon";

export default function Logo({
  className,
  dark = false,
}: {
  className?: string;
  dark?: boolean;
}) {
  return (
    <span
      className={clsx(
        "inline-flex min-w-0 items-center gap-2.5",
        className
      )}
    >
      <BrandIcon size={36} className="sm:h-9 sm:w-9" />
      <span className="flex min-w-0 flex-col leading-none">
        <span
          className={clsx(
            "truncate text-[1.05rem] font-extrabold tracking-tight sm:text-lg",
            dark ? "text-white" : "text-navy"
          )}
        >
          Pune Cabz
        </span>
        <span
          className={clsx(
            "mt-0.5 hidden text-[10px] font-semibold uppercase tracking-[0.14em] sm:block",
            dark ? "text-white/55" : "text-navy/45"
          )}
        >
          Travel smarter
        </span>
      </span>
    </span>
  );
}
