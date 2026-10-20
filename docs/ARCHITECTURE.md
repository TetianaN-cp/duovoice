# Duo Voice — High-Level Architecture Overview

This document describes the high-level architecture of Duo Voice.
It outlines the real-time audio pipeline, bilingual synchronization model, and local deployment capabilities.
It does **not** include proprietary implementation details of the full production system.

## 1. System Goals
Duo Voice is designed for:

- real-time bilingual conversation,
- low-latency speech-to-speech translation,
- accessibility support (hearing assistance, low-literacy environments),
- ESL learners and newcomers,
- multilingual families and community centers.

The architecture prioritizes:

- **local processing,**
- **decentralization,**
- **low latency,**
- **mobile stability,**
- **long-session reliability,**
- **privacy (no BigTech cloud APIs).**

## 2. High-Level Pipeline
Duo Voice uses a modular real-time pipeline:
```
Audio Input → Chunking → WebSocket Stream → ASR → NMT → TTS → Output
```

Each stage is independent and can run locally or on a self-hosted server.

### 2.1 Audio Input (WebAudio)
The client captures microphone audio using WebAudio.
Audio is segmented into small frames (chunks) to minimize latency.

### 2.2 Chunking & Partial/Final Frames
Audio is streamed as:

- **partial frames** — fast, low-confidence updates
- **final frames** — stable, high-confidence segments

This allows Duo Voice to display and speak translations while the user is still talking.

### 2.3 Real-Time Transport (WebSocket)
A bidirectional WebSocket channel sends audio frames to the backend and receives translated text and audio.

The transport layer supports:

- partial/final markers,
- bilingual pairing,
- multi-hour sessions,
- mobile reconnection.

### 2.4 Local ASR (Vosk)
Speech recognition runs locally using Vosk:

- no external cloud APIs,
- offline capability,
- low-latency streaming mode.

ASR produces partial and final text segments.

### 2.5 Local NMT (CTranslate2)
Neural machine translation uses CTranslate2:

- runs locally or on a self‑hosted server,
- optimized for CPU inference,
- supports bilingual pairing.

### 2.6 TTS Output
Translated text is converted to speech using a local or self‑hosted TTS engine.
The client receives audio frames and plays them immediately.

## 3. Bilingual Synchronization Model
Duo Voice maintains two parallel pipelines:
```
Speaker A → ASR → NMT → TTS → Speaker B
Speaker B → ASR → NMT → TTS → Speaker A
```
Synchronization features include:

- paired partial/final updates,
- latency‑aware chunking,
- mobile auto‑mute loop (prevents echo),
- Flip logic for bilingual turn-taking,
- long-session stability (1–3 hours).

This enables natural two‑way conversation without waiting for full sentences.

## 4. Mobile Stability Layer
Mobile stability is a core requirement because Duo Voice is frequently used in real-world environments where users rely on smartphones.
Mobile devices require additional handling:

- automatic audio routing,
- reconnection logic,
- swipe‑mode interface,
- reduced latency buffers,
- adaptive chunk size.

The stability layer ensures consistent performance even on low‑power devices.

## 5. Local Deployment & Self‑Hosting
Duo Voice can run fully locally:

- **Local ASR (Vosk)**
- **Local NMT (CTranslate2)**
- **Local backend (Python/Node)**
- **Local TTS**
- **Local WebSocket server**

This enables:

- offline use,
- privacy‑sensitive environments,
- nonprofit and community deployments,
- decentralized hosting.

See LOCAL_RUN.md for instructions.

## 6. Open Ecosystem Components
This repository includes:

- open utility modules (see [modules](../modules)),
- documentation,
- architecture overview,
- examples of local deployment.

The full production system is not open‑sourced, but Duo Voice follows an **open-ecosystem model**, allowing:

- community contributions,
- integration with educational and nonprofit organizations,
- decentralized hosting.

## 7. Future Extensions
Planned improvements include:

- expanded language support,
- improved accessibility modes,
- additional local ASR/NMT models,
- community‑driven modules.

## 8. Status
Duo Voice is actively developed by a single independent engineer.
Contractors or contributors may be involved as funding allows.
