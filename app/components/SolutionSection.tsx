import ImageGallery from "./ImageGallery";
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
  { src: "/images/solution/general1.png", alt: "AuTuber general 1" },
  { src: "/images/solution/general2.png", alt: "AuTuber general 2" },
  { src: "/images/solution/general3.png", alt: "AuTuber general 3" },
  { src: "/images/solution/general4.png", alt: "AuTuber general 4" },
  { src: "/images/solution/screen1.png", alt: "AuTuber screen 1" },
  { src: "/images/solution/screen2.png", alt: "AuTuber screen 2" },
  { src: "/images/solution/screen3.png", alt: "AuTuber screen 3" },
];

export default function SolutionSection() {
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

      <ImageGallery images={SOLUTION_IMAGES} />

      <p className="text-center mt-12 text-(--muted) max-w-2xl leading-relaxed">
        You keep your existing OBS scenes, VTS hotkeys, and platform setup.
        AuTuber plugs into them.
      </p>
    </SectionWrapper>
  );
}
