# Cricket Career Real - scaffold

This repository contains the initial scaffold and playable T20 prototype for "CRICKET LEGENDS 3D — CAREER MODE".

How to run locally:
1. Clone the repo
2. Serve with a static server (recommended): `npx http-server .` or `python -m http.server 8000`
3. Open http://localhost:8080 (or the port reported by the server)

How to deploy to GitHub Pages:
- Enable GitHub Pages in repository settings pointing to `main` branch (root).

Notes & Known limitations (initial commit):
- This is an MVP prototype. Many full features are simplified but the architecture is modular.
- 3D uses Three.js CDN; fallback renders simple geometry.
- Save system uses localStorage with simple corruption backup.
- Training cooldowns are short for development; adjust in `training.js`.
- Tests: run `window.runGameTests()` from the console.

