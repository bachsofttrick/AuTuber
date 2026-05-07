const PROBLEM_ITEMS = [
  {
    title: "Hotkey conflicts",
    body: "A scene-switch hotkey accidentally fires a game ability mid-fight.",
  },
  {
    title: "Forgotten triggers",
    body: "A streamer misses a Hype Train or a raid because the small notification slipped past their attention.",
  },
  {
    title: "Awkward scene switches",
    body: "They mis-click a transition and viewers see a black screen or the wrong overlay.",
  },
  {
    title: "VTuber emote selection",
    body: "A VTuber wants their character to react with a surprised expression, but they have to remember which of 30 hotkeys triggers it while playing.",
  },
  {
    title: "Cognitive overload",
    body: "Memorizing 10+ hotkey combinations during demanding gameplay drives the documented rise in streamer burnout for 2025 and 2026.",
  },
];

import SectionWrapper from "./SectionWrapper";

export default function ProblemSection() {
  return (
    <SectionWrapper id="problem" title="The Problem">
      <h2 className="text-center mb-12 text-(--ink) max-w-3xl">
        Live streaming has exploded, and the streamer is drowning in manual
        work.
      </h2>
      <p className="text-center mb-12 text-(--muted) max-w-2xl leading-relaxed">
        Behind every successful stream sits a single person juggling four jobs
        at once. They play the game, they read chat, they react to alerts, and
        they pilot OBS and VTube Studio with hotkeys.
      </p>
      <div className="grid grid--5col w-full max-w-6xl">
        {PROBLEM_ITEMS.map((item, idx) => (
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
      <p className="closing-statement mt-12 max-w-2xl">
        Small and mid-size streamers cannot afford a producer to handle this.
        They need software that does it for them.
      </p>
    </SectionWrapper>
  );
}
