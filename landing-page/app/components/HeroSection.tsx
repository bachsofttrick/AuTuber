interface HeroSectionProps {
  onScrollToDemo: () => void;
}

export default function HeroSection({ onScrollToDemo }: HeroSectionProps) {
  return (
    <section className="min-h-screen flex flex-col items-center justify-center px-[clamp(24px,6vw,72px)] py-32 text-center fadeIn">
      <h1 className="max-w-3xl mb-6 text-(--ink)">
        Your AI stage hand for live streaming.
      </h1>
      <p className="max-w-2xl mb-8 text-(--muted) leading-relaxed">
        We watch the camera, the screen, and the mic so you can focus on the
        show.
      </p>
      <div className="flex gap-4 flex-wrap justify-center">
        <button onClick={onScrollToDemo} className="pill-btn pill-btn--primary">
          Watch the Demo
        </button>
        <a
          href="https://github.com/bachsofttrick/autuber"
          target="_blank"
          rel="noopener noreferrer"
          className="pill-btn pill-btn--secondary"
        >
          View on GitHub
        </a>
      </div>
    </section>
  );
}
