"use client";

import Image from "next/image";
import { useEffect, useState } from "react";
import { useReducedMotion } from "framer-motion";
import { images } from "@/lib/images";
import { site } from "@/lib/site";

export default function HeroMediaBackground() {
  const reduceMotion = useReducedMotion();
  const [videoOk, setVideoOk] = useState(true);
  const [videoSrc, setVideoSrc] = useState(site.heroVideoUrl);

  useEffect(() => {
    if (reduceMotion) return;
    setVideoSrc(site.heroVideoUrl);
    setVideoOk(true);
  }, [reduceMotion]);

  const showVideo = !reduceMotion && videoOk;

  return (
    <>
      <div className="absolute inset-0">
        <Image
          src={images.heroBg}
          alt=""
          fill
          priority
          sizes="100vw"
          className="hero-media-bright object-cover object-[68%_center]"
        />
        {showVideo ? (
          <video
            key={videoSrc}
            className="hero-media-bright absolute inset-0 h-full w-full object-cover object-[68%_center]"
            autoPlay
            muted
            loop
            playsInline
            poster={images.heroBg}
            onError={() => {
              if (videoSrc !== images.heroVideo) {
                setVideoSrc(images.heroVideo);
                return;
              }
              setVideoOk(false);
            }}
          >
            <source src={videoSrc} type="video/mp4" />
          </video>
        ) : null}
      </div>
      <div className="pointer-events-none absolute inset-0 bg-black/18" />
      <div className="pointer-events-none absolute inset-0 hero-overlay" />
      <div className="pointer-events-none absolute inset-0 hero-overlay-wash" />
    </>
  );
}
