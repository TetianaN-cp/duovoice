# Duo Voice — Real‑Time Bilingual Conversation Tool

Duo Voice is a real‑time audio translation system designed for bilingual conversations, accessibility support, ESL learners, newcomers, and multilingual families.
The project focuses on **low-latency speech‑to‑speech translation, local processing, and decentralized deployment**, without reliance on BigTech cloud APIs.

Duo Voice is currently developed by a single independent engineer.
This repository contains open components, documentation, and architecture describing how the system works and how it can be deployed locally.

## Key Features

- Real‑time ASR → NMT → TTS pipeline
- Local speech recognition (Vosk)
- Local neural machine translation (CTranslate2)
- WebAudio + WebSocket streaming for low‑latency audio
- Chunking & partial/final synchronization
- Bilingual pairing for two‑way conversations
- Mobile‑optimized interface with auto‑mute loop
- Designed for accessibility and long sessions

## Architecture Overview

Duo Voice uses a modular pipeline:

1. **Audio Capture (WebAudio)** - microphone input is chunked into small frames for low‑latency streaming.

2. **Real‑Time Streaming (WebSocket)** - audio frames are sent to the backend with partial/final markers.

3. **Local ASR (Vosk)** - speech recognition runs locally or on a self‑hosted server.

4. **Local NMT (CTranslate2)** - neural translation is performed without external APIs.

5. **TTS Output** - translated speech is returned to the client for playback.

6. **Bilingual Synchronization** - both sides receive translations in real time with paired partial/final updates.

A detailed description is available in **ARCHITECTURE.md**.

## Self-Hosting & Local Deployment

Duo Voice can run fully locally:

- Local ASR (Vosk)
- Local NMT (CTranslate2)
- Local backend (Python/Node)
- No Google Cloud, Azure, or OpenAI dependencies

See **LOCAL_RUN.md** for instructions.

## Open Ecosystem

This repository includes:

- documentation
- architecture
- examples of local deployment
- open utility modules:
	- **UI Select** - a small standalone component for rendering and managing a custom dropdown selector.
	Provides clean DOM interaction, floating card positioning, and a change event for integration.
	- **Scroll Sync** - a lightweight helper for synchronized scrolling between two containers.
	Keeps both panels aligned and auto‑scrolls to the bottom when new content arrives.
	- **WakeLock Helper** - a minimal utility for keeping the screen awake during active usage on mobile devices.
	Automatically requests and releases the wake lock based on page visibility.


The full production system is not open-sourced, but the project follows an **open-ecosystem model**, enabling:

- community contributions,
- local hosting,
- integration with nonprofit and educational organizations.

## Use Cases

- ESL learners and newcomers
- Multilingual families
- Community centers and nonprofits
- Accessibility support (hearing assistance, low‑literacy environments)
- Real‑time bilingual communication

## Status

Duo Voice is actively developed.
Additional contributors or contractors may be involved as funding allows.

## License

MIT License — applies only to the modules included in this repository. The full production system is not open‑sourced. See LICENSE file.

## Contact

For collaboration, pilots, or nonprofit use cases:
duovoice.info@gmail.com

## Additional Resources

Full user documentation is available at:
https://duo-voice.com/documentation
