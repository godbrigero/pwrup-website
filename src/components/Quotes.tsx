"use client";

import { LazyMotion, domAnimation, m } from "framer-motion";

export function QuoteWBorder(props: {
  title: string;
  subtitle?: string;
  className?: string;
}) {
  return (
    <LazyMotion features={domAnimation} strict>
      <m.div
        className={`flex flex-col border border-white/20 rounded-lg p-10 items-center w-fit mx-16 ${
          props.className ?? ""
        }`}
        viewport={{ once: true, amount: 0.4 }}
        whileHover={{ scale: 1.02 }}
        transition={{ duration: 0.6, ease: "easeOut" }}
      >
        <h2 className="text-4xl md:text-6xl font-bold text-white mb-5">
          {props.title}
        </h2>
        {props.subtitle ? (
          <p className="text-lg md:text-2xl ml-auto text-white/80">
            {props.subtitle}
          </p>
        ) : null}
      </m.div>
    </LazyMotion>
  );
}
