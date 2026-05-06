const COMPETITORS = [
  {
    name: "Streamer.bot",
    obs: "Yes",
    vts: "Yes",
    llm: "No",
    context: "Chat only",
    cost: "Free",
    alt: true,
  },
  {
    name: "Aitum",
    obs: "Yes",
    vts: "Yes",
    llm: "No",
    context: "Chat only",
    cost: "$5/mo",
    alt: false,
  },
  {
    name: "Advanced Scene Switcher",
    obs: "Yes",
    vts: "No",
    llm: "No",
    context: "Motion only",
    cost: "Free",
    alt: true,
  },
  {
    name: "OBS Agent",
    obs: "Yes",
    vts: "No",
    llm: "Yes",
    context: "Metrics only",
    cost: "Free",
    alt: false,
  },
  {
    name: "Streamlabs Intelligent Agent",
    obs: "Yes",
    vts: "Unclear",
    llm: "Yes",
    context: "4 supported games only",
    cost: "Free/Paid",
    alt: true,
  },
  {
    name: "Elgato Stream Deck",
    obs: "Yes",
    vts: "Manual",
    llm: "No",
    context: "None",
    cost: "$99-$299",
    alt: false,
  },
  {
    name: "VSeeFace",
    obs: "No",
    vts: "Manual",
    llm: "No",
    context: "Facial only",
    cost: "Free",
    alt: true,
  },
];

const DIFFERENTIATORS = [
  {
    number: "1",
    title: "Multimodal context",
    body: "We combine the webcam, screen capture, microphone audio, and live OBS/VTS state into one observation that the model reasons over.",
  },
  {
    number: "2",
    title: "LLM-driven action planning",
    body: "The agent decides what to do next from context.",
  },
  {
    number: "3",
    title: "Plug-and-play with existing workflows",
    body: "We control OBS and VTube Studio through their official WebSocket APIs and auto-discover default ports.",
  },
  {
    number: "4",
    title: "Open and platform-agnostic",
    body: "Twitch, YouTube, Kick, and TikTok all work because we control the local tools, not the platform.",
  },
  {
    number: "5",
    title: "Affordable for solo streamers",
    body: "Small and mid-size creators get the producer-class behavior that has only been available to professional studios.",
  },
];

export default function WhySection() {
  return (
    <section
      id="why"
      className="px-[clamp(24px,6vw,72px)] py-32 flex flex-col items-center border-t border-(--divider)"
    >
      <span className="eyebrow">Why AuTuber</span>
      <h2 className="text-center mb-8 text-(--ink) max-w-3xl">
        The streaming automation market exists, and every product in it stops
        short of contextual intelligence.
      </h2>
      <p className="text-center mb-12 text-(--muted) max-w-2xl leading-relaxed">
        We surveyed the competitive landscape across event-based automation
        platforms, hardware controllers, AI co-pilots, and OBS/VTS plugins.
      </p>

      <div className="w-full max-w-6xl mb-12 overflow-x-auto">
        <table className="w-full border-collapse">
          <thead>
            <tr className="bg-(--accent) text-white">
              <th className="border border-(--panel-border) px-4 py-3 text-left font-600">
                Product
              </th>
              <th className="border border-(--panel-border) px-4 py-3 text-left font-600">
                OBS
              </th>
              <th className="border border-(--panel-border) px-4 py-3 text-left font-600">
                VTS
              </th>
              <th className="border border-(--panel-border) px-4 py-3 text-left font-600">
                LLM
              </th>
              <th className="border border-(--panel-border) px-4 py-3 text-left font-600">
                Multimodal Context
              </th>
              <th className="border border-(--panel-border) px-4 py-3 text-left font-600">
                Cost
              </th>
            </tr>
          </thead>
          <tbody className="text-[0.85rem]">
            {COMPETITORS.map((row) => (
              <tr
                key={row.name}
                className={row.alt ? "bg-(--panel)" : "bg-(--bg-alt)"}
              >
                <td className="border border-(--panel-border) px-4 py-3 font-500">
                  {row.name}
                </td>
                <td className="border border-(--panel-border) px-4 py-3">
                  {row.obs}
                </td>
                <td className="border border-(--panel-border) px-4 py-3">
                  {row.vts}
                </td>
                <td className="border border-(--panel-border) px-4 py-3">
                  {row.llm}
                </td>
                <td className="border border-(--panel-border) px-4 py-3">
                  {row.context}
                </td>
                <td className="border border-(--panel-border) px-4 py-3">
                  {row.cost}
                </td>
              </tr>
            ))}
            <tr className="bg-(--accent-soft) text-(--accent-strong)">
              <td className="border border-(--panel-border) px-4 py-3 font-600">
                AuTuber
              </td>
              <td className="border border-(--panel-border) px-4 py-3 font-600">
                Yes
              </td>
              <td className="border border-(--panel-border) px-4 py-3 font-600">
                Yes
              </td>
              <td className="border border-(--panel-border) px-4 py-3 font-600">
                Yes
              </td>
              <td className="border border-(--panel-border) px-4 py-3 font-600">
                Camera + Screen + Audio + State
              </td>
              <td className="border border-(--panel-border) px-4 py-3 font-600">
                Open
              </td>
            </tr>
          </tbody>
        </table>
      </div>

      <div className="w-full max-w-6xl">
        <div className="space-y-6">
          {DIFFERENTIATORS.map((item) => (
            <div key={item.number} className="panel__card fadeIn">
              <div className="font-bold text-(--accent) mb-2">
                {item.number}. {item.title}
              </div>
              <p className="text-(--muted) text-[0.85rem] leading-relaxed">
                {item.body}
              </p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}
