# Duo Voice — Overview (Public Minimal Release)

Duo Voice is a browser-based real-time bilingual communication tool designed for accessibility, learning, and cross-language interaction.  
This overview describes the project at a high level without exposing internal architecture or proprietary components.

## What Duo Voice Does

- Captures audio from the microphone and, on desktop, from the active browser tab  
- Processes speech in real time directly in the browser  
- Produces bilingual text output in a clean, synchronized layout  
- Allows optional playback of translated text using TTS  
- Supports interactive editing and transcript saving  
- Works without installation or extensions

## What This Public Release Includes

This repository contains only small, safe, standalone modules:

- **UI Select (minimal)** — а small standalone component for rendering and managing a custom dropdown selector.  
- **Scroll Sync (minimal)** — keeps two containers scrolled together and auto‑aligned at the bottom  

These modules are intentionally limited and do not represent the full Duo Voice system.

## What Is Not Included

The following components remain private:

- real-time audio pipeline  
- ASR, translation, and TTS logic  
- synchronization engine  
- UI/UX components  
- WebAudio/WebSocket streaming  
- mobile-specific logic  
- full session engine  

## Purpose of This Release

- Provide a minimal public preview  
- Share small utilities with developers  
- Maintain safety and privacy of core technology  
- Prepare for future open modules

This overview describes the project at a conceptual level while keeping the internal implementation private.
