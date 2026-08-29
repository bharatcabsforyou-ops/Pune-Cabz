import Image from "next/image";

export default function RouteImage({
  src,
  alt,
  className = "object-cover",
}: {
  src: string;
  alt: string;
  className?: string;
}) {
  if (src.startsWith("/")) {
    return (
      <Image src={src} alt={alt} fill className={className} sizes="(max-width:768px) 100vw, 320px" />
    );
  }
  // eslint-disable-next-line @next/next/no-img-element
  return <img src={src} alt={alt} className={`h-full w-full ${className}`} />;
}
