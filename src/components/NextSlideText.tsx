"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

export function NextSlideText(props: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={`flex flex-col items-center text-center gap-6 w-fit mx-16 ${
          props.className ?? ""
        }`}
        initial={{ opacity: 0, y: 24 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true, amount: 0.4 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-black-50">
          {props.title}
        </h2>
        {props.subtitle ? (
          <p className="text-base md:text-xl text-black/70">{props.subtitle}</p>
        ) : null}
      </m.div>
    </LazyMotion>
  );
}
