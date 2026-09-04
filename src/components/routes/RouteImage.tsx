import Image from "next/image";
import { isBrandedRouteBanner } from "@/lib/images";

export default function RouteImage({
  src,
  alt,
  className = "",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  const branded = isBrandedRouteBanner(src);
  const fitClass = branded ? "object-contain object-center" : "object-cover object-center";

  if (src.startsWith("/")) {
    return (
      <Image
        src={src}
        alt={alt}
        fill
        className={`${fitClass} ${className}`.trim()}
        sizes="(max-width:768px) 100vw, 320px"
      />
    );
  }

  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={`h-full w-full ${fitClass} ${className}`.trim()} />;
}
