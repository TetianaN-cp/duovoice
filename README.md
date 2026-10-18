# Duo Voice (Public Minimal Release)

Duo Voice is a browser‑based real‑time bilingual communication tool.  
This repository contains a **minimal public subset** of the project: small, safe, standalone modules that do not expose the full internal pipeline.

The full Duo Voice system includes real‑time speech recognition, synchronized bilingual display, translation, TTS, and session management.  
Only selected non‑critical components are published here to support transparency, community interest, and early experimentation.

## What This Repository Contains

This public release includes **small, isolated modules** that are safe to open‑source:

### ✔ UI Select (minimal version)
A small standalone component for rendering and managing a custom dropdown selector.
This module is part of the minimal public release of Duo Voice.

### ✔ Scroll Sync (minimal version)
A small helper for synchronized scrolling between two containers, keeping both panels aligned and auto‑scrolling to the bottom when new content arrives.

These modules are intentionally limited and do **not** represent the full Duo Voice pipeline.

## What Is Not Included

To protect the integrity of the project, this repository does **not** include:

- real‑time audio pipeline  
- ASR logic  
- translation pipeline  
- TTS queueing  
- synchronization logic  
- UI/UX components  
- WebAudio or WebSocket streaming  
- mobile auto‑mute logic  
- system audio capture  
- full session engine  

These components remain private until a later stage of development.

## Project Goals (Public Version)

- Provide a minimal, safe preview of Duo Voice internals  
- Share small utilities that may be useful to developers  
- Build early community interest without exposing core architecture  
- Prepare the foundation for future open modules

## Repository Structure (minimal)
```
/modules
    /ui-select
    /scroll-sync
/docs
    OVERVIEW.md
LICENSE
README.md
```

## License

MIT License — applies only to the modules included in this repository.

## Status

This is a **partial public release**.  
The full Duo Voice system remains in active development and will be introduced gradually.

## Additional Resources

Full user documentation is available at:
https://duo-voice.com/documentation
