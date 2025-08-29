"use client";

import { forwardRef } from "react";
import {
  LazyMotion,
  domAnimation,
  m,
  useMotionTemplate,
  useMotionValue,
  MotionStyle,
} from "framer-motion";

export function LogoPageContainer(props: {
  children: React.ReactNode;
  className?: string;
  style?: MotionStyle;
}) {
  return (
    <m.div
      className={`h-dvh w-full flex items-center justify-center ${
        props.className ?? ""
      }`}
      style={props.style}
    >
      {props.children}
    </m.div>
  );
}

export const LargeText = forwardRef<
  HTMLHeadingElement,
  {
    children: React.ReactNode;
    className?: string;
    style?: MotionStyle;
  }
>(function LargeText(props, ref) {
  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const shadow = useMotionTemplate`${offsetX}px ${offsetY}px 0 rgba(0,255,0,0.30)`;

  return (
    <LazyMotion features={domAnimation} strict>
      <m.h1
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
        className={`text-[25vw] leading-none font-black tracking-tight select-text duration-75 p-20 ${props.className}`}
        aria-label="PWRUP"
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        ref={ref}
        onMouseMove={(e) => {
          const r = e.currentTarget.getBoundingClientRect();
          const nx = (e.clientX - (r.left + r.width / 2)) / r.width;
          const ny = (e.clientY - (r.top + r.height / 2)) / r.height;
          offsetX.set(nx * 10);
          offsetY.set(ny * 10);
        }}
        onMouseLeave={() => {
          offsetX.set(0);
          offsetY.set(0);
        }}
        style={{
          textShadow: shadow,
          WebkitTextStroke: "2px rgba(255,255,255,0.3)",
          cursor: "default",
          ...props.style,
        }}
      >
        {props.children}
      </m.h1>
    </LazyMotion>
  );
});
