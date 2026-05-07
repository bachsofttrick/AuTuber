"use client";

import { useState } from "react";
import Image from "next/image";
import SectionWrapper from "./SectionWrapper";

const SOLUTION_ITEMS = [
  {
    title: "Scene and overlay control via OBS WebSocket",
    body: "switch from gameplay to facecam when you start talking to chat, drop in a BRB scene when you step away, fade overlays in and out based on the activity on screen.",
  },
  {
    title: "VTube Studio expression triggers",
    body: "fire a surprised emote when chat reacts to a clutch play, swap to a thinking pose when you open a code editor, animate a celebration on a Hype Train.",
  },
  {
    title: "Audience moment recognition",
    body: "catch raids, donations, and Hype Trains and produce visible reactions so the moment lands with the audience.",
  },
  {
    title: "Safety by default",
    body: "every action passes through validation, cooldowns, and configurable autonomy levels so you stay in control.",
  },
];

const SOLUTION_IMAGES = [
  { src: "/images/antuber/general.png", alt: "AuTuber general overview" },
  { src: "/images/antuber/screen1.png", alt: "AuTuber screen 1" },
  { src: "/images/antuber/screen2.png", alt: "AuTuber screen 2" },
  { src: "/images/antuber/screen3.png", alt: "AuTuber screen 3" },
];

export default function SolutionSection() {
  const [carouselIdx, setCarouselIdx] = useState(0);

  return (
    <SectionWrapper id="solution" title="The Solution">
      <h2 className="text-center mb-8 text-(--ink) max-w-3xl">
        AuTuber is an AI agent that runs in the background as your stage hand.
      </h2>
      <p className="text-center mb-12 text-(--muted) max-w-2xl leading-relaxed">
        Instead of you pressing shortcut keys, the agent observes your context
        from multiple sources at once. It watches your webcam, listens to your
        microphone, captures your game or work screen, and reads OBS and VTube
        Studio state. Then it controls your local streaming tools to match the
        moment.
      </p>

      <div className="grid grid--2col w-full max-w-6xl gap-6 mb-16">
        {SOLUTION_ITEMS.map((item, idx) => (
          <div key={idx} className="panel__card fadeIn">
            <h3 className="text-(--ink) mb-2 text-[1.2rem] font-600">
              {item.title}
            </h3>
            <p className="text-(--muted) text-[0.85rem] leading-relaxed">
              {item.body}
            </p>
          </div>
        ))}
      </div>

      <div className="w-full max-w-6xl">
        <div className="relative">
          <div className="relative w-full aspect-video rounded-[20px] overflow-hidden bg-(--bg-alt)">
            <Image
              key={carouselIdx}
              src={SOLUTION_IMAGES[carouselIdx].src}
              alt={SOLUTION_IMAGES[carouselIdx].alt}
              fill
              sizes="(max-width: 72rem) 100vw, 72rem"
              className="object-contain fadeIn"
            />
          </div>
          <button
            onClick={() =>
              setCarouselIdx(
                (carouselIdx - 1 + SOLUTION_IMAGES.length) %
                  SOLUTION_IMAGES.length
              )
            }
            className="carousel__btn carousel__btn--prev"
            aria-label="Previous image"
          >
            ‹
          </button>
          <button
            onClick={() =>
              setCarouselIdx((carouselIdx + 1) % SOLUTION_IMAGES.length)
            }
            className="carousel__btn carousel__btn--next"
            aria-label="Next image"
          >
            ›
          </button>
        </div>
        <div className="carousel__dots">
          {SOLUTION_IMAGES.map((_, i) => (
            <button
              key={i}
              onClick={() => setCarouselIdx(i)}
              className={`carousel__dot ${i === carouselIdx ? "carousel__dot--active" : ""}`}
              aria-label={`Go to image ${i + 1}`}
            />
          ))}
        </div>
      </div>

      <p className="text-center mt-12 text-(--muted) max-w-2xl leading-relaxed">
        You keep your existing OBS scenes, VTS hotkeys, and platform setup.
        AuTuber plugs into them.
      </p>
    </SectionWrapper>
  );
}
