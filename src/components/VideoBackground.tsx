"use client";

import { MotionValue } from "motion";
import { motion } from "motion/react";
import Image from "next/image";
import { useEffect, useRef, useState } from "react";

type VideoBackgroundProps = {
  src?: string;
  className?: string;
  blurClassName?: string;
  opacityTransformation: MotionValue<number>;
};

export function VideoBackground({
  src = "https://cdn.pinewood.one/Robot.webm",
  className,
  blurClassName,
  opacityTransformation,
}: VideoBackgroundProps) {
  const videoRef = useRef<HTMLVideoElement | null>(null);
  const [posterDataUrl, setPosterDataUrl] = useState<string | null>(null);
  const [isVideoReady, setIsVideoReady] = useState(false);

  useEffect(() => {
    const video = videoRef.current;
    if (!video) return;

    let isCancelled = false;

    const handleLoadedData = () => {
      if (!video || isCancelled) return;
      try {
        const canvas = document.createElement("canvas");
        const width = video.videoWidth || 1280;
        const height = video.videoHeight || 720;
        canvas.width = width;
        canvas.height = height;
        const ctx = canvas.getContext("2d");
        if (!ctx) return;
        ctx.drawImage(video, 0, 0, width, height);
        const dataUrl = canvas.toDataURL("image/webp", 0.8);
        setPosterDataUrl(dataUrl);
      } catch {
        // Cross-origin or other failure; ignore and fall back to video paint.
      }
    };

    const handleCanPlay = () => {
      setIsVideoReady(true);
    };

    video.addEventListener("loadeddata", handleLoadedData, { once: true });
    video.addEventListener("playing", handleCanPlay);
    video.addEventListener("canplay", handleCanPlay);

    return () => {
      isCancelled = true;
      video.removeEventListener("loadeddata", handleLoadedData);
      video.removeEventListener("playing", handleCanPlay);
      video.removeEventListener("canplay", handleCanPlay);
    };
  }, [src]);

  return (
    <div
      aria-hidden
      className={[
        "pointer-events-none fixed inset-0 z-[-1] overflow-hidden bg-black",
        className,
      ]
        .filter(Boolean)
        .join(" ")}
    >
      {posterDataUrl && !isVideoReady && (
        <Image
          alt="Video first frame"
          src={posterDataUrl}
          className={[
            "object-cover",
            "scale-[1.05]",
            blurClassName ?? "blur-md",
          ]
            .filter(Boolean)
            .join(" ")}
          fill
          priority
          sizes="100vw"
        />
      )}

      <motion.video
        ref={videoRef}
        className={[
          "absolute inset-0 h-full w-full object-cover",
          "scale-[1.05]",
          blurClassName ?? "blur-md",
        ]
          .filter(Boolean)
          .join(" ")}
        src={src}
        muted
        playsInline
        autoPlay
        loop
        preload="auto"
        crossOrigin="anonymous"
        poster={posterDataUrl ?? undefined}
        style={{
          opacity: opacityTransformation,
        }}
      />
    </div>
  );
}
