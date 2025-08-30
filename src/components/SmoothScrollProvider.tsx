"use client";

import { useEffect, useRef } from "react";
import Lenis from "lenis";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";

gsap.registerPlugin(ScrollTrigger);

export function SmoothScrollProvider(props: { children: React.ReactNode }) {
  const lenisRef = useRef<Lenis | null>(null);

  useEffect(() => {
    ScrollTrigger.config({ ignoreMobileResize: true });
    // Make the scroll much faster by reducing duration and using a snappier easing
    const lenis = new Lenis({
      duration: 0.4, // Lower duration for faster scroll (default is 1)
      easing: (t: number) => t, // Linear easing for immediate response
      smoothWheel: true,
    });
    lenisRef.current = lenis;

    // Using native document scrolling with Lenis; no scrollerProxy needed

    const onScroll = () => {
      ScrollTrigger.update();
    };
    lenis.on("scroll", onScroll);

    const ticker = (time: number) => {
      lenis.raf(time * 600);
    };
    gsap.ticker.add(ticker);
    gsap.ticker.lagSmoothing(0);

    requestAnimationFrame(() => ScrollTrigger.refresh());

    return () => {
      lenis.off("scroll", onScroll);
      lenis.destroy();
      gsap.ticker.remove(ticker);
    };
  }, []);

  return <>{props.children}</>;
}
