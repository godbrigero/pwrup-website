"use client";

import { useLayoutEffect, useMemo, useRef } from "react";
import { m, useMotionTemplate, useMotionValue } from "framer-motion";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

type LetterTarget = {
  x: number;
  y: number;
  rotate?: number;
  scale?: number;
};

type AssemblingTitleProps = {
  text: string;
  className?: string;
  letterClassName?: string;
  targets?: LetterTarget[];
  pin?: boolean;
  start?: string;
  end?: string;
  baseWidth?: number;
  baseHeight?: number;
};

function buildDefaultTargets(): LetterTarget[] {
  return [
    { x: 120, y: 120, rotate: 90 }, // left arm
    { x: -180, y: -100, rotate: 180, scale: 0.5 }, // head
    { x: 100, y: -130, rotate: -90 }, // right arm
    { x: 420, y: -280, rotate: 90 }, // left leg
    { x: -140, y: 120, rotate: 90 }, // right leg
  ];
}

export function AssemblingTitle(props: AssemblingTitleProps) {
  const containerRef = useRef<HTMLDivElement | null>(null);
  const headingRef = useRef<HTMLHeadingElement | null>(null);
  const letterRefs = useRef<HTMLSpanElement[]>([]);
  const text = String(props.text);
  const letters = useMemo(() => Array.from(text), [text]);

  const offsetX = useMotionValue(0);
  const offsetY = useMotionValue(0);
  const shadow = useMotionTemplate`${offsetX}px ${offsetY}px 0 rgba(0,255,0,0.30)`;

  const targets = useMemo<LetterTarget[]>(() => {
    if (props.targets && props.targets.length >= letters.length)
      return props.targets;
    return buildDefaultTargets();
  }, [props.targets, letters.length]);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);
    const container = containerRef.current;
    const heading = headingRef.current;
    if (!container || !heading || letterRefs.current.length === 0) return;

    const getContainerRect = () => container.getBoundingClientRect();
    const getScales = () => {
      const rect = getContainerRect();
      const baseW = props.baseWidth ?? 1659; // user's tuned width
      const _baseH = props.baseHeight ?? 967; // eslint-disable-line @typescript-eslint/no-unused-vars
      return {
        scaleX: rect.width / baseW,
        scaleY: rect.width / baseW,
        centerX: rect.width / 2,
        centerY: rect.height / 2,
        rect,
      };
    };

    const resolveX = (idx: number, letterEl: HTMLSpanElement): number => {
      const { rect, centerX, scaleX } = getScales();
      const r = letterEl.getBoundingClientRect();
      const letterCenterX = r.left - rect.left + r.width / 2;
      const dxToCenter = centerX - letterCenterX;
      const targetX = (targets[idx]?.x ?? 0) * scaleX;
      return dxToCenter + targetX;
    };
    const resolveY = (idx: number, letterEl: HTMLSpanElement): number => {
      const { rect, centerY, scaleY } = getScales();
      const r = letterEl.getBoundingClientRect();
      const letterCenterY = r.top - rect.top + r.height / 2;
      const dyToCenter = centerY - letterCenterY;
      const targetY = (targets[idx]?.y ?? 0) * scaleY;
      return dyToCenter + targetY;
    };

    const tl = gsap.timeline({
      scrollTrigger: {
        trigger: container,
        start: props.start ?? "top top",
        end: props.end ?? "+=120%",
        scrub: true,
        pin: props.pin ?? true,
        invalidateOnRefresh: true,
      },
      defaults: { ease: "power2.inOut", duration: 1 },
    });

    letterRefs.current.forEach((el, idx) => {
      tl.to(
        el,
        {
          x: () => resolveX(idx, el),
          y: () => resolveY(idx, el),
          rotation: targets[idx]?.rotate ?? 0,
          scale: targets[idx]?.scale ?? 1,
        },
        0
      );
    });

    const onResize = () => ScrollTrigger.refresh();
    window.addEventListener("resize", onResize);

    return () => {
      tl.scrollTrigger?.kill();
      tl.kill();
      window.removeEventListener("resize", onResize);
    };
  }, [
    targets,
    props.start,
    props.end,
    props.pin,
    props.baseWidth,
    props.baseHeight,
  ]);

  return (
    <div
      ref={containerRef}
      className="relative h-dvh w-full flex items-center justify-center"
    >
      <m.h1
        ref={headingRef}
        className={`text-[25vw] leading-none font-black tracking-tight select-none ${
          props.className ?? ""
        }`}
        aria-label={text}
        initial={{ opacity: 0.5 }}
        animate={{ opacity: 1 }}
        transition={{ type: "spring", stiffness: 300, damping: 20 }}
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
          // Use a more defined, brighter stroke with a subtle glow
          WebkitTextStroke: "3px #00ff99",
          textShadow: [
            "0 0 6px #00ff99", // subtle glow around the stroke
            shadow as unknown as string,
          ].join(", "),
        }}
      >
        {letters.map((char, idx) => (
          <m.span
            key={`${char}-${idx}`}
            ref={(el) => {
              if (el) letterRefs.current[idx] = el;
            }}
            className={`inline-block ${props.letterClassName ?? ""}`}
            style={{ display: "inline-block" }}
          >
            {char === " " ? "\u00A0" : char}
          </m.span>
        ))}
      </m.h1>
    </div>
  );
}
