"use client";

import { useScrollProgress } from "@/hooks/use-scroll-progress";
import { ReactNode } from "react";

type Range = [number, number];

interface ScrollAnimatedProps {
  children: ReactNode;
  parallax?: number;
  scale?: Range;
  rotate?: Range;
  opacity?: Range;
  translateX?: Range;
  disableOnMobile?: boolean;
  className?: string;
  /** Start progress at 0 at initial position. Use for top-of-page elements. */
  startAtZero?: boolean;
}

function lerp(start: number, end: number, t: number) {
  return start + (end - start) * t;
}

export function ScrollAnimated({
  children,
  parallax,
  scale,
  rotate,
  opacity,
  translateX,
  disableOnMobile = !!parallax,
  className,
  startAtZero,
}: ScrollAnimatedProps) {
  const { ref, progress } = useScrollProgress({ disableOnMobile, startAtZero });

  const transforms: string[] = [];

  if (parallax) {
    const offset = (progress - (startAtZero ? 0 : 0.5)) * parallax;
    transforms.push(`translateY(${offset}px)`);
  }

  if (translateX) {
    const isMobile = typeof window !== "undefined" && window.innerWidth < 768;
    const range: Range = isMobile
      ? [translateX[0] / 2, translateX[1]]
      : translateX;
    const val = lerp(range[0], range[1], progress);
    transforms.push(`translateX(${val}px)`);
  }

  if (scale) {
    const val = lerp(scale[0], scale[1], progress);
    transforms.push(`scale(${val})`);
  }

  if (rotate) {
    const val = lerp(rotate[0], rotate[1], progress);
    transforms.push(`rotate(${val}deg)`);
  }

  const style: React.CSSProperties = {
    willChange: "transform",
  };

  if (transforms.length > 0) {
    style.transform = transforms.join(" ");
  }

  if (opacity) {
    style.opacity = lerp(opacity[0], opacity[1], progress);
  }

  return (
    <div ref={ref} style={style} className={className}>
      {children}
    </div>
  );
}
