"use client";

import { useState } from "react";
import Image from "next/image";

type GalleryImage = { src: string; alt: string };

export default function ImageGallery({ images }: { images: GalleryImage[] }) {
  const [idx, setIdx] = useState(0);

  const prev = () => setIdx((i) => (i - 1 + images.length) % images.length);
  const next = () => setIdx((i) => (i + 1) % images.length);

  return (
    <div className="w-full max-w-6xl">
      <div className="relative">
        <div className="relative w-full aspect-video rounded-[20px] overflow-hidden bg-(--bg-alt)">
          <Image
            key={idx}
            src={images[idx].src}
            alt={images[idx].alt}
            fill
            sizes="(max-width: 72rem) 100vw, 72rem"
            className="object-contain fadeIn"
          />
        </div>
        <button
          onClick={prev}
          className="carousel__btn carousel__btn--prev"
          aria-label="Previous image"
        >
          ‹
        </button>
        <button
          onClick={next}
          className="carousel__btn carousel__btn--next"
          aria-label="Next image"
        >
          ›
        </button>
      </div>
      <div className="carousel__dots">
        {images.map((_, i) => (
          <button
            key={i}
            onClick={() => setIdx(i)}
            className={`carousel__dot ${i === idx ? "carousel__dot--active" : ""}`}
            aria-label={`Go to image ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
