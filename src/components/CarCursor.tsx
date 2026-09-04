"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";
import { carAssets } from "@/lib/car-icons";

const CURSOR_W = 32;
const CURSOR_H = 11;

export default function CarCursor() {
  const [pos, setPos] = useState({ x: -40, y: -40 });
  const [on, setOn] = useState(false);
  const [typing, setTyping] = useState(false);
  const [hover, setHover] = useState(false);
  const [faceRight, setFaceRight] = useState(true);
  const lastX = useRef(0);

  useEffect(() => {
    const hoverMq = window.matchMedia("(hover: hover)");
    if (!hoverMq.matches) return;

    const onMove = (e: MouseEvent) => {
      setOn(true);
      document.documentElement.classList.add("has-car-cursor");
      setPos({ x: e.clientX, y: e.clientY });
      if (Math.abs(e.clientX - lastX.current) > 2) {
        setFaceRight(e.clientX >= lastX.current);
      }
      lastX.current = e.clientX;
      const t = e.target as HTMLElement | null;
      const typingNow = Boolean(t?.closest("input, textarea, [contenteditable='true']"));
      setTyping(typingNow);
      setHover(
        Boolean(t?.closest("a, button, [role='button'], summary, label, select")) && !typingNow
      );
    };

    window.addEventListener("mousemove", onMove, { passive: true });
    return () => {
      window.removeEventListener("mousemove", onMove);
      document.documentElement.classList.remove("has-car-cursor");
    };
  }, []);

  if (!on || typing) return null;

  const scale = hover ? 1.05 : 1;
  const flip = faceRight ? "" : " scaleX(-1)";

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[9999] will-change-transform"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate3d(-50%, -58%, 0) scale(${scale})${flip}`,
        transition: "transform 80ms ease-out",
      }}
    >
      <Image
        src={carAssets.cursorSedan}
        alt=""
        width={CURSOR_W}
        height={CURSOR_H}
        unoptimized
        priority
        draggable={false}
        className="block select-none drop-shadow-[0_1px_3px_rgba(26,10,12,0.2)]"
      />
    </div>
  );
}
