# AuTuber App

Desktop automation agent for VTuber streaming. Built with Electron, React, TypeScript, and integrates with VTube Studio, OBS, and AI model providers.

## Purpose

AuTuber is the core desktop application that runs background automation for VTuber streamers. It captures screen/camera/audio, monitors an AI model for real-time insights, and orchestrates automated actions in OBS and VTube Studio based on model responses. The app maintains state across two main processes (main and renderer) with strict security boundaries and type-safe IPC communication.

## Key Files & Entry Points

**Main Entry Points**
- `src/main/index.ts` — Main process entry. Initializes app, registers IPC handlers, creates main window, and resumes persisted model monitoring.
- `src/renderer/main.tsx` — Renderer process entry. Renders React app into #app container with StrictMode.
- `index.html` — Main UI entry point, loads renderer/main.tsx.
- `hidden-capture.html` — Invisible window (480x270) for media capture. Loads renderer/hidden-capture.ts which handles real-time frame/audio/video capture.

**Preload & Security**
- `src/preload/index.ts` — Context isolation bridge. Exposes typed `window.desktop` and `window.captureBridge` APIs to renderer via contextBridge, preventing renderer direct access to Node.js/Electron APIs.

**Config & Build**
- `electron.vite.config.ts` — Build config for main, preload, and renderer (two entry points: index.html and hidden-capture.html).
- `electron-builder.yml` — Packaging config. Targets Windows (portable .exe) and Linux (AppImage).
- `vite.config.ts` — Placeholder; actual config in electron.vite.config.ts.
- `tsconfig.json` — ES2022 target, React JSX, strict mode enabled. Includes src/ and tests/.
- `package.json` — Dependencies: Electron 41, React 19, Tailwind 4, electron-store, obs-websocket-js, zod, ffmpeg-static.

**Key Artifacts**
- `src/shared/channels.ts` — IPC channel name constants (GetAppVersion, ModelMonitorStart, VtsConnect, CaptureStart, etc.). All follow `domain:operation` format.

## Architecture

### Process Structure

**Main Process** (`src/main/`)
- Single application lifecycle owner. Manages windows, IPC handlers, and background services.
- Services instantiated at startup (VtsService, ObsService, ModelMonitorService, CaptureOrchestratorService, etc.).
- IPC handlers register in `src/main/ipc/` and respond to renderer requests.

**Renderer Process** (`src/renderer/`)
- React app with two tabs: Dashboard and VTS Catalog.
- Uses `window.desktop` API (exposed by preload) for all IPC communication.
- Local state via React hooks (useState, useCallback); no global state manager (Redux, Zustand).

**Hidden Capture Window** (Special Renderer Process)
- Invisible BrowserWindow (480x270, `frame: false`, `transparent: true`, `skipTaskbar: true`, `backgroundThrottling: false`).
- Runs `src/renderer/hidden-capture.ts` — a pure JavaScript capture loop.
- Captures camera, screen, and audio frames/clips in real-time via MediaRecorder and canvas APIs.
- Communicates via `window.captureBridge.sendFrame()`, `sendAudio()`, `sendClip()`, etc.

### IPC Communication Pattern

All IPC is **invoke** (request-response), no fire-and-forget send channels. Exceptions: capture frame/clip streaming uses `ipcRenderer.send()` from hidden window to main.

**Request Flow**
1. Renderer calls `window.desktop.methodName(args)` (e.g., `window.desktop.vtsGetStatus()`).
2. Preload's `desktopApi.methodName()` wraps the call: `ipcRenderer.invoke(IpcChannels.MethodName, args)`.
3. Main process IPC handler in `src/main/ipc/` processes and returns result.
4. Preload returns result to renderer; errors are caught and safe defaults returned.

**IPC Channel Domains**
- `app:*` — App metadata (get-version)
- `model:*` — Model provider configuration (list-providers, set-provider, test-connection)
- `model-monitor:*` — Real-time monitoring loop (start, stop, status, event)
- `vts:*` — VTube Studio integration (connect, disconnect, authenticate, get-hotkeys, get-catalog, refresh-catalog, update-catalog-override, update-cue-labels, trigger-hotkey)
- `obs:*` — OBS Studio integration (get-status)
- `capture:*` — Media capture control (start, stop, status, status-lite, list-sources, export-clip, control, frame, audio, clip, level, error)
- `settings:*` — App settings persistence (get, update)
- `services:*` — Service activation (activate, get-status)
- `automation:*` — Model-driven automation (analyze-now)

### Services Architecture

All services instantiated in `src/main/ipc/index.ts` at startup. Dependency chain:

```
ModelRouterService (wraps OpenAICompatibleProvider)
  |
  +-> VtsCatalogGeneratorService -> CatalogEntry classification
  +-> VtsService (uses catalog generator)
  +-> PipelineService (orchestrates automation):
        - ObservationBuilderService (ingests capture, vts state, obs state)
        - PromptBuilderService (formats observation as prompt)
        - ModelRouterService (queries AI)
        - ActionPlanParserService (parses model response)
        - ActionValidatorService (checks against cooldowns)
        - ActionExecutorService (runs actions in obs/vts)
        - AfkOverlayService (toggles OBS source when user AFK)
ModelMonitorService (ticks pipeline in loop, reports progress via IPC event)
CaptureOrchestratorService (manages media buffers, hidden capture window)
ServiceActivationService (retries connecting OBS/VTS on app startup)
```

### State Management

**Main Process State**
- Settings persisted via `electron-store` (JSON file in userData directory).
- Services hold in-memory state: VTS connection, OBS status, capture buffers, model monitor status.
- Model monitor status queried on-demand via IPC (immutable snapshot returned).

**Renderer State**
- Pure React hooks: `useState` for UI state, `useCallback` for handlers.
- No Redux/Zustand; all async data fetched via IPC and stored in component state.
- Hooks: `useCapture()`, `useVTS()` — encapsulate IPC calls and status polling.
- Settings loaded once on app start via `settingsGet()` IPC call.

**Capture Buffers** (Main Process)
- Frame buffers: circular ring of last N camera/screen frames (low/high detail, JPEG data URLs).
- Audio buffers: ring of audio chunks (WebM opus, Uint8Array).
- Clip buffers: queues of recent video/audio clips (WebM/MP4 mimeType).
- Managed by `CaptureOrchestratorService`, `FrameBufferService`, `AudioBufferService`, `VideoClipBufferService`.

### Hidden Capture Window

**Initialization** (`createHiddenCaptureWindow()`)
- BrowserWindow (480x270, no frame, transparent, not shown, not in taskbar, no background throttling).
- Loads `hidden-capture.html` -> `src/renderer/hidden-capture.ts`.
- Uses preload for `window.captureBridge` API.

**Capture Loop** (`src/renderer/hidden-capture.ts`)
- Global `state` object holds all active streams, recorders, timers, canvas elements.
- On `type: "start"` control message: starts camera/screen/audio capture.
- On `type: "stop"` control message: stops all streams, recorders, timers, clears state.
- Frame sampling uses `requestVideoFrameCallback()` if available, else `setInterval()`.
- Segmented MediaRecorder records N-ms clips, emits blob via callback.
- Audio level meter uses AnalyserNode, computes RMS every 200ms, sends via `captureBridge.sendLevel()`.

## Key Components

**`src/renderer/App.tsx`**
- Tab router: Dashboard or VTS Catalog. Minimal logic; delegates to child components.

**`src/renderer/components/DashboardPanel.tsx`**
- Real-time monitoring status, capture stats, VTS/OBS status, AFK overlay config.
- Controls: start/stop model monitor, configure capture devices, manage AFK overlay.
- Renders action plan output and execution results.
- Uses `useCapture()` and `useVTS()` hooks.

**`src/renderer/components/HotkeyMapper.tsx`**
- VTube Studio hotkey catalog browser and editor.
- Allows overriding auto/manual mode, confidence, cue labels per hotkey.
- Shows model-generated vs. user-override classification.

**Custom Hooks**
- `useCapture()` — Wraps capture control IPC calls (start, stop, status, list sources, export clip).
- `useVTS()` — Wraps VTS IPC calls (connect, disconnect, authenticate, refresh hotkeys/catalog, trigger hotkey, update overrides).

## Conventions & Patterns

**Naming**
- IPC channels: `domain:operation` (vts:connect, capture:start, model-monitor:event).
- Service classes: `*Service` suffix (VtsService, CaptureOrchestratorService).
- React hooks: `use*` prefix (useCapture, useVTS).
- Event handlers: `handle*` prefix (handleStartCapture, handleConnect).
- Getters: `get*` prefix (getStatus, getAppVersion).

**Error Handling**
- Preload methods wrap IPC calls in try-catch; errors logged, safe defaults returned.
- IPC handlers wrap service calls in try-catch; fallback response returned `{ok: false, message: "..."}`.

**Code Organization**
- Services: `src/main/services/{capture,vts,obs,model,automation,settings}`.
- IPC handlers: `src/main/ipc/{capture.ipc,vts.ipc,obs.ipc,settings.ipc,...}`.
- Shared types: `src/shared/types/`.
- Components and hooks: `src/renderer/{components,hooks}`.

**Type Safety**
- All IPC messages typed via Zod schemas (e.g., `modelMonitorStartRequestSchema`).
- Services define interfaces for dependencies (e.g., `VtsServiceDependencies`).

## Gotchas & Non-Obvious Behavior

- **Capture in hidden window**: Camera/screen/audio captured in invisible BrowserWindow, not in main/renderer.
- **Model monitor persistence**: If `resumeOnLaunch: true` in settings, monitor auto-resumes on next app launch.
- **VTS catalog hash**: If hotkeys added/removed, catalog hash changes and full AI reclassification triggers.
- **AFK overlay**: AfkOverlayService toggles OBS source based on last capture time vs. configured delay threshold.
- **Service activation**: ServiceActivationService retries OBS/VTS connections at startup; failures don't block app launch.
- **Audio level meter**: Computed in hidden-capture.ts (renderer), not in main.
- **Preload isolation**: Renderer has no direct Node.js/Electron access. Adding a new IPC method requires: handler in main, expose in preload desktopApi, TypeScript declaration in renderer types.

## Directory Structure

```
src/
  main/
    index.ts              # Main process entry
    ipc/                  # IPC handler registration
    services/             # Domain services (automation, capture, model, obs, vts, settings)
    windows/              # Window factory functions
    utils/                # Helper functions
  renderer/
    main.tsx              # Renderer entry
    hidden-capture.ts     # Capture loop (runs in hidden window)
    App.tsx               # Tab router
    components/           # DashboardPanel, HotkeyMapper
    hooks/                # useCapture, useVTS
    styles/               # globals.css (Tailwind + design tokens)
  preload/
    index.ts              # Exposes window.desktop and window.captureBridge
  shared/
    channels.ts           # IPC channel constants
    types/                # TypeScript types for IPC messages
    schemas/              # Zod schemas for validation
tests/
  standalone/             # Smoke tests (model-provider-smoke.ts)
```
