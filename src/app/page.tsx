"use client";

import { AssemblingTitle } from "@/components/AssemblingTitle";
import { QuoteWBorder } from "@/components/Quotes";
import { useLayoutEffect, useRef } from "react";
import gsap from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import { SmoothScrollProvider } from "@/components/SmoothScrollProvider";
import { VideoBackground } from "@/components/VideoBackground";
import { useMotionValue } from "motion/react";

export default function Home() {
  const heroRef = useRef<HTMLDivElement | null>(null);
  const opacityTransformation = useMotionValue(1);
  useLayoutEffect(() => {
    gsap.registerPlugin(ScrollTrigger);

    const ctx = gsap.context(() => {
      if (!heroRef.current) return;
      ScrollTrigger.create({
        trigger: heroRef.current,
        start: "top top",
        end: "bottom top",
        scrub: true,
        onUpdate: (self) => {
          opacityTransformation.set(Math.max(0, 1 - self.progress));
        },
      });
    }, heroRef);

    return () => ctx.revert();
  }, [opacityTransformation]);

  return (
    <SmoothScrollProvider>
      <VideoBackground opacityTransformation={opacityTransformation} />
      <main className="min-h-[300dvh] overflow-hidden overflow-x-hidden">
        <section ref={heroRef} className="relative h-[200dvh]">
          <AssemblingTitle text="PWRUP" />
        </section>
        <section className="h-dvh flex items-center justify-center">
          <QuoteWBorder
            title='"Impossible is a word to be found only in the dictionary of fools."'
            subtitle="— Napoleon Bonaparte"
          />
        </section>
      </main>
    </SmoothScrollProvider>
  );
}
