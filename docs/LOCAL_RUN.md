# Local Deployment Guide (Minimal Example)

This document describes how to run the core components of Duo Voice locally using open‑source tools.
It demonstrates the decentralized and privacy‑friendly nature of the system without exposing proprietary production code.

The instructions below show a minimal setup using:

- **Vosk** for local ASR
- **CTranslate2** for local NMT
- a lightweight **Python WebSocket backend**
- a simple **browser client** for audio capture and streaming

This setup runs fully offline and does not rely on Google Cloud, Azure, or OpenAI.

## 1. Requirements
### System
This minimal setup is intended for demonstration and evaluation purposes.

- Python
- Node.js (optional for frontend)
- CPU with AVX2 support (recommended for CTranslate2)

### Python packages
```
pip install vosk
pip install ctranslate2
pip install websockets
pip install sounddevice
pip install numpy
```

### Models
Download:

- Vosk ASR model (any language)
- CTranslate2 NMT model (e.g., MarianMT converted to CT2)

Place them in:
```
models/asr/
models/nmt/
```

## 2. Minimal Local Backend (Python)
This is a simplified example backend showing the structure of the real pipeline.
It is not the production implementation.
```
# This is a simplified demonstration backend.
# The production system includes additional synchronization, pairing,
# mobile stability logic, and long-session handling.

import asyncio
import websockets
from vosk import Model, KaldiRecognizer
import ctranslate2
import json

asr_model = Model("models/asr")
translator = ctranslate2.Translator("models/nmt")

async def handler(ws):
    recognizer = KaldiRecognizer(asr_model, 16000)

    async for message in ws:
        data = json.loads(message)

        audio_bytes = data["chunk"]
        is_final = data["final"]

        if recognizer.AcceptWaveform(audio_bytes):
            text = recognizer.Result()
        else:
            text = recognizer.PartialResult()

        # Extract recognized text
        text_json = json.loads(text)
        recognized = text_json.get("text", "")

        # Translate locally
        translated = translator.translate_batch([[recognized]])[0].hypotheses[0]

        await ws.send(json.dumps({
            "recognized": recognized,
            "translated": translated,
            "final": is_final
        }))

async def main():
    async with websockets.serve(handler, "localhost", 8000):
        await asyncio.Future()

asyncio.run(main())

```

This backend:

- receives audio chunks
- performs **local ASR**
- performs **local NMT**
- returns translated text
- runs fully offline

## 3. Minimal Browser Client (Audio Capture + WebSocket)
This example demonstrates the basic streaming mechanism used in Duo Voice.
It shows how the client streams audio chunks to the backend.
```
const ws = new WebSocket("ws://localhost:8000");

navigator.mediaDevices.getUserMedia({ audio: true }).then(stream => {
  const ctx = new AudioContext();
  const source = ctx.createMediaStreamSource(stream);
  const processor = ctx.createScriptProcessor(4096, 1, 1);

  processor.onaudioprocess = e => {
    const input = e.inputBuffer.getChannelData(0);
    const chunk = new Int16Array(input.length);

    for (let i = 0; i < input.length; i++) {
      chunk[i] = input[i] * 32767;
    }

    ws.send(JSON.stringify({
      chunk: Array.from(chunk),
      final: false
    }));
  };

  source.connect(processor);
  processor.connect(ctx.destination);
});

ws.onmessage = e => {
  const data = JSON.parse(e.data);
  console.log("Recognized:", data.recognized);
  console.log("Translated:", data.translated);
};

```
This client:

- captures microphone audio
- converts it to PCM
- streams chunks via WebSocket
- prints recognized + translated text

## 4. Running Everything Locally

### Step 1 — Start backend
```python backend.py```

### Step 2 — Open client
Serve the HTML/JS file locally:
```npx http-server .```

Open in browser:
```http://localhost:8080```

### Step 3 — Speak
You will see:

- partial recognition
- final recognition
- local translation

All running offline.

## 5. Notes on Production Deployment
The real Duo Voice system includes:

- bilingual pairing
- partial/final synchronization
- mobile auto‑mute loop
- latency‑aware chunking
- multi‑hour session stability
- accessibility modes
- UI/UX components

These are not included in this minimal example.

The purpose of this document is to demonstrate:

- **local ASR**
- **local NMT**
- **local backend**
- **real‑time streaming**
- **full decentralization**

without exposing proprietary production code.

## 6. Why This Matters
Local deployment is a key requirement for decentralized, privacy‑sensitive environments.

This minimal setup proves that Duo Voice:

- can run fully offline,
- does not depend on BigTech APIs,
- supports decentralized hosting,
- can be deployed in privacy‑sensitive environments,
- aligns with open‑ecosystem principles.

