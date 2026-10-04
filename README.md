# Nadia Noor - Interactive 3D Birthday

A Three.js birthday scene with a cartoon character, candles, cake cutting, a served slice, and a personalized birthday wish.

## Run locally

Install Node.js, then run these commands from the repository folder:

```sh
npm start
```

Open http://localhost:4173 in a browser with WebGL enabled. No package installation or build step is required; Three.js is included in `dist/`.

## Controls

- Drag to rotate the camera; scroll or pinch to zoom.
- Use the candle and cake buttons, or tap the objects, to advance the celebration.
- Watch the automatic story, pause, replay, or seek using the timeline.
- Enable optional music with the Music button.
- Focus the scene and use arrow keys to rotate, or plus/minus to zoom.

## Files

- `dist/`: complete static website, including local Three.js modules.
- `serve.mjs`: local HTTP server.
- `verify-animation.mjs`: checks arm reach, cake cuts, candle timing, and slice placement.
- `verify-*.cjs`: browser QA scripts; these expect a local Chrome debugging session on port 9224 and run from the parent of a folder named `birthday`.

Run the animation checks with `npm run verify`.

Google Fonts requires an internet connection; the page includes fallback fonts. This repository upload does not deploy the website.

## Deploy on Vercel

Import this repository and keep Root Directory at the repository root (`.`). The included `vercel.json` selects the Other framework preset, skips build and install commands, and serves `dist/` as a static website. `npm start` is only for local preview; do not use it as the Vercel build command.

## Birthday release

The entry page shows a countdown until **5 October 2026 at 00:00 Pakistan Standard Time** (4 October at 19:00 UTC). The birthday markup remains in an inert template and the 3D application is imported only after that time. This presentation gate uses the visitor's device clock; it is not server-side access control. The release constant is in `dist/release.js`. `verify-countdown.cjs` checks the locked and released browser states.
