# AuTuber

## Slide 1: Title

**AuTuber**

Your AI stage hand for live streaming.

We watch the camera, the screen, and the mic so you can focus on the show.

---

## Slide 2: The Problem

**Live streaming has exploded, and the streamer is drowning in manual work.**

Behind every successful stream sits a single person juggling four jobs at once. They play the game, they read chat, they react to alerts, and they pilot OBS and VTube Studio with hotkeys.

- **Hotkey conflicts**: A scene-switch hotkey accidentally fires a game ability mid-fight.
- **Forgotten triggers**: A streamer misses a Hype Train or a raid because the small notification slipped past their attention.
- **Awkward scene switches**: They mis-click a transition and viewers see a black screen or the wrong overlay.
- **VTuber emote selection**: A VTuber wants their character to react with a surprised expression, but they have to remember which of 30 hotkeys triggers it while playing.
- **Cognitive overload**: Memorizing 10+ hotkey combinations during demanding gameplay drives the documented rise in streamer burnout for 2025 and 2026.

Small and mid-size streamers cannot afford a producer to handle this. They need software that does it for them.

---

## Slide 3: The Solution

**AuTuber is an AI agent that runs in the background as your stage hand.**

Instead of you pressing shortcut keys, the agent observes your context from multiple sources at once. It watches your webcam, listens to your microphone, captures your game or work screen, and reads OBS and VTube Studio state. Then it controls your local streaming tools to match the moment.

Concrete behaviors the agent handles for you:

- **Scene and overlay control via OBS WebSocket**: switch from gameplay to facecam when you start talking to chat, drop in a BRB scene when you step away, fade overlays in and out based on the activity on screen.
- **VTube Studio expression triggers**: fire a surprised emote when chat reacts to a clutch play, swap to a thinking pose when you open a code editor, animate a celebration on a Hype Train.
- **Audience moment recognition**: catch raids, donations, and Hype Trains and produce visible reactions so the moment lands with the audience.
- **Safety by default**: every action passes through validation, cooldowns, and configurable autonomy levels so you stay in control.

You keep your existing OBS scenes, VTS hotkeys, and platform setup. AuTuber plugs into them.

---

## Slide 4: Why Our Solution

**The streaming automation market exists, and every product in it stops short of contextual intelligence.**

We surveyed the competitive landscape across event-based automation platforms, hardware controllers, AI co-pilots, and OBS/VTS plugins. The results are in `existing-products.md`.

| Product | OBS | VTS | LLM | Multimodal Context | Cost |
|---|---|---|---|---|---|
| Streamer.bot | Yes | Yes | No | Chat only | Free |
| Aitum | Yes | Yes | No | Chat only | $5/mo |
| Advanced Scene Switcher | Yes | No | No | Motion only | Free |
| OBS Agent | Yes | No | Yes | Metrics only | Free |
| Streamlabs Intelligent Agent | Yes | Unclear | Yes | 4 supported games only | Free/Paid |
| Elgato Stream Deck | Yes | Manual | No | None | $99–$299 |
| VSeeFace | No | Manual | No | Facial only | Free |
| **AuTuber** | **Yes** | **Yes** | **Yes** | **Camera + Screen + Audio + State** | **Open** |

Every existing tool reads one slice of the world:

- Streamer.bot and Aitum react to chat events with hand-wired rules.
- Advanced Scene Switcher checks window focus, motion, and pixels.
- OBS Agent runs on engagement metrics with no real understanding.
- Streamlabs Intelligent Streaming Agent handles AI scene switching but only for Fortnite, Valorant, PUBG, and Counter-Strike 2 inside the proprietary Streamlabs Desktop.
- Stream Deck and Touch Portal still demand a human button press.

AuTuber fits into the gap nobody fills:

1. **Multimodal context**: We combine the webcam, screen capture, microphone audio, and live OBS/VTS state into one observation that the model reasons over.
2. **LLM-driven action planning**: The agent decides what to do next from context..
3. **Plug-and-play with existing workflows**: We control OBS and VTube Studio through their official WebSocket APIs and auto-discover default ports.
4. **Open and platform-agnostic**: Twitch, YouTube, Kick, and TikTok all work because we control the local tools, not the platform.
5. **Affordable for solo streamers**: Small and mid-size creators get the producer-class behavior that has only been available to professional studios.

---

## Slide 5: Demo

<iframe width="560" height="315" src="https://www.youtube.com/embed/twF145Klzwg?si=RvE6lGYx9qNl3M2y" title="AuTuber: AI stage hand for VTubers" frameborder="0" allow="accelerometer; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share" referrerpolicy="strict-origin-when-cross-origin" allowfullscreen></iframe>



---

## Slide 6: Architecture

**Three layers, one loop.**

```
┌─────────────────────────────────────────────┐
│ Renderer (React UI)                         │
│  Setup • Status • Controls • Logs           │
└──────────────────┬──────────────────────────┘
                   │ IPC (preload bridge)
┌──────────────────▼──────────────────────────┐
│ Main Process (Electron)                     │
│  Capture orchestration • Model routing      │
│  OBS service • VTS service • Validation     │
└──────┬────────────┬──────────┬──────────────┘
       │            │          │
   ┌───▼───┐   ┌────▼────┐  ┌──▼──────────┐
   │ OBS   │   │  VTS    │  │ Multimodal  │
   │ WS    │   │  WS     │  │ LLM (HPC)   │
   └───────┘   └─────────┘  └─────────────┘
```

Key technical points to call out:

- WebSocket clients auto-discover default ports for OBS and VTube Studio so first-run setup stays minimal.
- The model receives a sliding window of recent frames for temporal reasoning. Audio and screen capture feed in as optional channels we toggle based on latency budget and accuracy.
- The provider layer abstracts model hosting. We run Nemotron locally on H200 hardware, and OpenRouter remains supported for non-tool-calling workflows.
- Action validation, cooldowns, and confirmation gates sit between the model and the local tools so a bad plan never reaches OBS.

---

## Slide 7: Development Team

- Jacob Berger: The Leader (Project Manager, AI Engineer, Full Stack Engineer)
- Anthony Kung: The Expert (AI Engineer)
- Brian Phan: The Renaissance Man (Full Stack Engineer, Cameraman, Video Editor, Landing Page Creator)
- Marcus Tin: The Storyteller (Full Stack Engineer, Pitch Deck)

---

## Slide 8: Closing

**The future of live streaming is contextually aware realtime intelligence.**

AuTuber is a harness for your streaming setup with broad possibilities in live streaming management. We bring producer-class control to the solo streamer and the indie VTuber, and we plug into the tools they already run.

Try it. Watch your hands stay on the game while the agent handles the show.
