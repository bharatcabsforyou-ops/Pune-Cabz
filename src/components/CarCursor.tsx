"use client";

import Image from "next/image";
import { useEffect, useRef, useState } from "react";

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

  return (
    <div
      aria-hidden
      className="pointer-events-none fixed z-[9999]"
      style={{
        left: pos.x,
        top: pos.y,
        transform: `translate(-50%, -50%) scale(${hover ? 1.12 : 1}) ${faceRight ? "" : "scaleX(-1)"}`,
        transition: "transform 70ms linear",
      }}
    >
      <Image
        src="/cursor-car.svg"
        alt=""
        width={36}
        height={16}
        priority
        draggable={false}
        className="drop-shadow-[0_2px_6px_rgba(26,10,12,0.22)]"
      />
    </div>
  );
}
