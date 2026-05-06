"use client";

import { useEffect, useRef, useState } from "react";
import Image from "next/image";

interface NavLink {
  label: string;
  id: string;
}

const NAV_LINKS: NavLink[] = [
  { label: "Problem", id: "problem" },
  { label: "Solution", id: "solution" },
  { label: "Why", id: "why" },
  { label: "Demo", id: "demo" },
  { label: "Team", id: "team" },
];

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

const TEAM_MEMBERS = [
  {
    name: "Jacob Berger",
    roles: ["Project Manager", "AI Engineer", "Full Stack Engineer"],
  },
  {
    name: "Anthony Kung",
    roles: ["AI Engineer"],
  },
  {
    name: "Brian Phan",
    roles: ["Full Stack Engineer", "Cameraman", "Video Editor"],
  },
  {
    name: "Marcus Tin",
    roles: ["Full Stack Engineer", "Pitch Deck"],
  },
];

export default function Home() {
  const [activeSection, setActiveSection] = useState<string>("");
  const sectionRefs = useRef<Map<string, IntersectionObserverEntry>>(new Map());
  const observerRef = useRef<IntersectionObserver | null>(null);

  useEffect(() => {
    const observerOptions = {
      root: null,
      rootMargin: "-50% 0px -50% 0px",
      threshold: 0,
    };

    observerRef.current = new IntersectionObserver((entries) => {
      entries.forEach((entry) => {
        const id = entry.target.id;
        if (entry.isIntersecting) {
          setActiveSection(id);
          sectionRefs.current.set(id, entry);
        }
      });
    }, observerOptions);

    NAV_LINKS.forEach(({ id }) => {
      const el = document.getElementById(id);
      if (el) observerRef.current?.observe(el);
    });

    return () => {
      observerRef.current?.disconnect();
    };
  }, []);

  const handleNavClick = (id: string) => {
    const element = document.getElementById(id);
    if (element) {
      element.scrollIntoView({ behavior: "smooth" });
    }
  };

  const handleScrollToDemo = () => {
    handleNavClick("demo");
  };

  return (
    <div className="flex flex-col w-full bg-[var(--bg)]">
      {/* Sticky Navigation */}
      <nav className="app-nav fixed top-0 left-0 right-0 z-50 justify-between">
        <div className="text-base font-bold text-[var(--ink)]">
          Au<span className="text-[var(--accent)]">Tuber</span>
        </div>
        <div className="flex gap-2">
          {NAV_LINKS.map(({ label, id }) => (
            <button
              key={id}
              onClick={() => handleNavClick(id)}
              className={`app-nav__tab ${
                activeSection === id ? "app-nav__tab--active" : ""
              }`}
            >
              {label}
            </button>
          ))}
        </div>
      </nav>

      <main className="pt-[40px] flex flex-col w-full">
        {/* Hero Section */}
        <section className="min-h-screen flex flex-col items-center justify-center px-[clamp(20px,6vw,72px)] py-32 text-center fadeIn">
          <h1 className="max-w-3xl mb-6 text-[var(--ink)]">
            Your AI stage hand for live streaming.
          </h1>
          <p className="max-w-2xl mb-8 text-[0.85rem] text-[var(--muted)] leading-relaxed">
            We watch the camera, the screen, and the mic so you can focus on the
            show.
          </p>
          <div className="flex gap-4 flex-wrap justify-center">
            <button
              onClick={handleScrollToDemo}
              className="pill-btn pill-btn--primary"
            >
              Watch the Demo
            </button>
            <a
              href="https://github.com/bachsofttrick/autuber-vts"
              target="_blank"
              rel="noopener noreferrer"
              className="pill-btn pill-btn--secondary"
            >
              View on GitHub
            </a>
          </div>
        </section>

        {/* Problem Section */}
        <section
          id="problem"
          className="px-[clamp(20px,6vw,72px)] py-32 flex flex-col items-center"
        >
          <span className="eyebrow">The Problem</span>
          <h2 className="text-center mb-12 text-[var(--ink)] max-w-3xl">
            Live streaming has exploded, and the streamer is drowning in manual
            work.
          </h2>
          <p className="text-center mb-12 text-[var(--muted)] max-w-2xl leading-relaxed">
            Behind every successful stream sits a single person juggling four
            jobs at once. They play the game, they read chat, they react to
            alerts, and they pilot OBS and VTube Studio with hotkeys.
          </p>
          <div className="grid grid--auto w-full max-w-6xl">
            {PROBLEM_ITEMS.map((item, idx) => (
              <div key={idx} className="panel__card fadeIn">
                <h3 className="text-[var(--ink)] mb-2 text-[1.2rem] font-600">
                  {item.title}
                </h3>
                <p className="text-[var(--muted)] text-[0.85rem] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>
          <p className="text-center mt-12 text-[var(--muted)] max-w-2xl leading-relaxed">
            Small and mid-size streamers cannot afford a producer to handle
            this. They need software that does it for them.
          </p>
        </section>

        {/* Solution Section */}
        <section
          id="solution"
          className="px-[clamp(20px,6vw,72px)] py-32 flex flex-col items-center"
        >
          <span className="eyebrow">The Solution</span>
          <h2 className="text-center mb-8 text-[var(--ink)] max-w-3xl">
            AuTuber is an AI agent that runs in the background as your stage
            hand.
          </h2>
          <p className="text-center mb-12 text-[var(--muted)] max-w-2xl leading-relaxed">
            Instead of you pressing shortcut keys, the agent observes your
            context from multiple sources at once. It watches your webcam,
            listens to your microphone, captures your game or work screen, and
            reads OBS and VTube Studio state. Then it controls your local
            streaming tools to match the moment.
          </p>

          {/* Feature Cards */}
          <div className="grid grid--2col w-full max-w-6xl gap-6 mb-16">
            {SOLUTION_ITEMS.map((item, idx) => (
              <div key={idx} className="panel__card fadeIn">
                <h3 className="text-[var(--ink)] mb-2 text-[1.2rem] font-600">
                  {item.title}
                </h3>
                <p className="text-[var(--muted)] text-[0.85rem] leading-relaxed">
                  {item.body}
                </p>
              </div>
            ))}
          </div>

          {/* Image Gallery */}
          <div className="w-full max-w-6xl">
            <div className="grid grid--2col gap-6">
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/antuber/general.png"
                  alt="AuTuber general"
                  fill
                  className="object-cover rounded-[20px]"
                />
              </div>
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/antuber/screen1.png"
                  alt="AuTuber screen 1"
                  fill
                  className="object-cover rounded-[20px]"
                />
              </div>
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/antuber/screen2.png"
                  alt="AuTuber screen 2"
                  fill
                  className="object-cover rounded-[20px]"
                />
              </div>
              <div className="relative w-full aspect-square">
                <Image
                  src="/images/antuber/screen3.png"
                  alt="AuTuber screen 3"
                  fill
                  className="object-cover rounded-[20px]"
                />
              </div>
            </div>
          </div>

          <p className="text-center mt-12 text-[var(--muted)] max-w-2xl leading-relaxed">
            You keep your existing OBS scenes, VTS hotkeys, and platform setup.
            AuTuber plugs into them.
          </p>
        </section>

        {/* Why Section */}
        <section
          id="why"
          className="px-[clamp(20px,6vw,72px)] py-32 flex flex-col items-center"
        >
          <span className="eyebrow">Why AuTuber</span>
          <h2 className="text-center mb-8 text-[var(--ink)] max-w-3xl">
            The streaming automation market exists, and every product in it
            stops short of contextual intelligence.
          </h2>
          <p className="text-center mb-12 text-[var(--muted)] max-w-2xl leading-relaxed">
            We surveyed the competitive landscape across event-based automation
            platforms, hardware controllers, AI co-pilots, and OBS/VTS plugins.
          </p>

          {/* Comparison Table */}
          <div className="w-full max-w-6xl mb-12 overflow-x-auto">
            <table className="w-full border-collapse">
              <thead>
                <tr className="bg-[var(--accent)] text-white">
                  <th className="border border-[var(--panel-border)] px-4 py-3 text-left font-600">
                    Product
                  </th>
                  <th className="border border-[var(--panel-border)] px-4 py-3 text-left font-600">
                    OBS
                  </th>
                  <th className="border border-[var(--panel-border)] px-4 py-3 text-left font-600">
                    VTS
                  </th>
                  <th className="border border-[var(--panel-border)] px-4 py-3 text-left font-600">
                    LLM
                  </th>
                  <th className="border border-[var(--panel-border)] px-4 py-3 text-left font-600">
                    Multimodal Context
                  </th>
                  <th className="border border-[var(--panel-border)] px-4 py-3 text-left font-600">
                    Cost
                  </th>
                </tr>
              </thead>
              <tbody className="text-[0.85rem]">
                <tr className="bg-[var(--panel)]">
                  <td className="border border-[var(--panel-border)] px-4 py-3 font-500">
                    Streamer.bot
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Yes
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Yes
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    No
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Chat only
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Free
                  </td>
                </tr>
                <tr className="bg-[var(--bg-alt)]">
                  <td className="border border-[var(--panel-border)] px-4 py-3 font-500">
                    Aitum
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Yes
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Yes
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    No
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Chat only
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    $5/mo
                  </td>
                </tr>
                <tr className="bg-[var(--panel)]">
                  <td className="border border-[var(--panel-border)] px-4 py-3 font-500">
                    Advanced Scene Switcher
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Yes
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    No
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    No
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Motion only
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Free
                  </td>
                </tr>
                <tr className="bg-[var(--bg-alt)]">
                  <td className="border border-[var(--panel-border)] px-4 py-3 font-500">
                    OBS Agent
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Yes
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    No
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Yes
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Metrics only
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Free
                  </td>
                </tr>
                <tr className="bg-[var(--panel)]">
                  <td className="border border-[var(--panel-border)] px-4 py-3 font-500">
                    Streamlabs Intelligent Agent
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Yes
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Unclear
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Yes
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    4 supported games only
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Free/Paid
                  </td>
                </tr>
                <tr className="bg-[var(--bg-alt)]">
                  <td className="border border-[var(--panel-border)] px-4 py-3 font-500">
                    Elgato Stream Deck
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Yes
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Manual
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    No
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    None
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    $99-$299
                  </td>
                </tr>
                <tr className="bg-[var(--panel)]">
                  <td className="border border-[var(--panel-border)] px-4 py-3 font-500">
                    VSeeFace
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    No
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Manual
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    No
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Facial only
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3">
                    Free
                  </td>
                </tr>
                <tr className="bg-[var(--accent-soft)] text-[var(--accent-strong)]">
                  <td className="border border-[var(--panel-border)] px-4 py-3 font-600">
                    AuTuber
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3 font-600">
                    Yes
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3 font-600">
                    Yes
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3 font-600">
                    Yes
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3 font-600">
                    Camera + Screen + Audio + State
                  </td>
                  <td className="border border-[var(--panel-border)] px-4 py-3 font-600">
                    Open
                  </td>
                </tr>
              </tbody>
            </table>
          </div>

          {/* Why Points */}
          <div className="w-full max-w-6xl">
            <div className="space-y-6">
              <div className="panel__card fadeIn">
                <div className="font-bold text-[var(--accent)] mb-2">
                  1. Multimodal context
                </div>
                <p className="text-[var(--muted)] text-[0.85rem] leading-relaxed">
                  We combine the webcam, screen capture, microphone audio, and
                  live OBS/VTS state into one observation that the model reasons
                  over.
                </p>
              </div>
              <div className="panel__card fadeIn">
                <div className="font-bold text-[var(--accent)] mb-2">
                  2. LLM-driven action planning
                </div>
                <p className="text-[var(--muted)] text-[0.85rem] leading-relaxed">
                  The agent decides what to do next from context.
                </p>
              </div>
              <div className="panel__card fadeIn">
                <div className="font-bold text-[var(--accent)] mb-2">
                  3. Plug-and-play with existing workflows
                </div>
                <p className="text-[var(--muted)] text-[0.85rem] leading-relaxed">
                  We control OBS and VTube Studio through their official
                  WebSocket APIs and auto-discover default ports.
                </p>
              </div>
              <div className="panel__card fadeIn">
                <div className="font-bold text-[var(--accent)] mb-2">
                  4. Open and platform-agnostic
                </div>
                <p className="text-[var(--muted)] text-[0.85rem] leading-relaxed">
                  Twitch, YouTube, Kick, and TikTok all work because we control
                  the local tools, not the platform.
                </p>
              </div>
              <div className="panel__card fadeIn">
                <div className="font-bold text-[var(--accent)] mb-2">
                  5. Affordable for solo streamers
                </div>
                <p className="text-[var(--muted)] text-[0.85rem] leading-relaxed">
                  Small and mid-size creators get the producer-class behavior
                  that has only been available to professional studios.
                </p>
              </div>
            </div>
          </div>
        </section>

        {/* Demo Section */}
        <section
          id="demo"
          className="px-[clamp(20px,6vw,72px)] py-32 flex flex-col items-center"
        >
          <span className="eyebrow">Demo</span>
          <div className="w-full max-w-4xl">
            <div className="panel fadeIn">
              <div
                style={{
                  position: "relative",
                  width: "100%",
                  paddingBottom: "56.25%",
                }}
              >
                <iframe
                  style={{
                    position: "absolute",
                    top: 0,
                    left: 0,
                    width: "100%",
                    height: "100%",
                  }}
                  width="560"
                  height="315"
                  src="https://www.youtube.com/embed/twF145Klzwg?si=RvE6lGYx9qNl3M2y"
                  title="AuTuber: AI stage hand for VTubers"
                  frameBorder="0"
                  allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
                  referrerPolicy="strict-origin-when-cross-origin"
                  allowFullScreen
                ></iframe>
              </div>
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section
          id="team"
          className="px-[clamp(20px,6vw,72px)] py-32 flex flex-col items-center"
        >
          <span className="eyebrow">Development Team</span>

          {/* Team Photo */}
          <div className="w-full max-w-6xl mb-12">
            <div className="relative w-full aspect-video">
              <Image
                src="/images/dev-team.png"
                alt="Development team"
                fill
                className="object-cover rounded-[28px]"
              />
            </div>
          </div>

          {/* Team Cards */}
          <div className="grid grid--2col w-full max-w-6xl gap-6">
            {TEAM_MEMBERS.map((member, idx) => (
              <div key={idx} className="panel__card fadeIn">
                <h3 className="text-[var(--ink)] mb-3 text-[1.2rem] font-600">
                  {member.name}
                </h3>
                <div className="flex flex-wrap gap-2">
                  {member.roles.map((role, roleIdx) => (
                    <span
                      key={roleIdx}
                      className="status-pill status-pill--idle"
                    >
                      {role}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* Footer spacing */}
        <div className="h-32"></div>
      </main>
    </div>
  );
}
