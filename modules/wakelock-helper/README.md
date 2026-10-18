# WakeLock Helper (minimal module)

A small helper for keeping the screen awake on mobile devices during active usage.
Useful for real‑time or long‑running interfaces where the user should not lose focus
due to automatic screen dimming or locking.

Features:
- Requests a screen wake lock when the app becomes active
- Releases the wake lock when the page is hidden
- Gracefully handles browser support and errors
- Minimal, standalone, safe to use in any project

This module is intentionally minimal and does **not** represent the full Duo Voice system.
Only safe, standalone components are included in this public release.

License: MIT — applies only to the modules included in this repository.
