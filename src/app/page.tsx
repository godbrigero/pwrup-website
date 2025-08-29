"use client";

import { LargeText, LogoPageContainer } from "@/components/PwrupLogo";
import { NextSlideText } from "@/components/NextSlideText";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";

export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const titleRef = useRef<HTMLHeadingElement | null>(null);

  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    if (!heroRef.current || !titleRef.current) return;

    const ctx = gsap.context(() => {
      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: heroRef.current,
          start: "top top",
          end: "bottom top",
          scrub: true,
          pin: true,
        },
      });

      tl.to(
        titleRef.current,
        { scale: 2.5, xPercent: 40, ease: "back", duration: 0.6 },
        0
      );

      tl.to(
        titleRef.current,
        { scale: 2.5, xPercent: 40, ease: "back", duration: 0.6 },
        0
      );
    }, heroRef);

    return () => ctx.revert();
  }, []);

  return (
    <SmoothScrollProvider>
      <main className="min-h-[300dvh]">
        <section ref={heroRef} className="relative h-[200dvh]">
          <LogoPageContainer>
            <LargeText ref={titleRef}>PWRUP</LargeText>
          </LogoPageContainer>
        </section>
        <section className="h-dvh w-full flex items-center justify-center">
          <div className="w-fit">
            <NextSlideText
              title='"Impossible is a word to be found only in the dictionary of fools."'
              subtitle="— Napoleon Bonaparte"
            />
          </div>
        </section>
      </main>
    </SmoothScrollProvider>
  );
}
