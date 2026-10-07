# Manav Tailor — Build in Motion

## Creative direction
An original scrolling portfolio for recruiters, collaborators, and potential clients. The visual reference is the playful, immersive spirit of Lusion, Lando Norris and Bruno Simon; this project does not copy their assets or layouts.

A luminous mathematical portal sits behind oversized typography. Scrolling twists the portal while moving through chapters of Manav's career. Violet, lime and ivory create a consistent visual language. Selected work becomes a set of typographic posters with interactive case-study dialogs.

## What is implemented
- Full-height introduction with a continuously animated perspective portal.
- Scroll progress and a changing chapter indicator.
- Pointer-responsive geometry and scroll-driven rotation.
- Reveal animations for experience, projects and skills.
- Resume-based education and career timeline: B.Tech (2020–2024), CodePlanet (June–November 2022), TechForce (April–August 2023), and TDC Consultancy (August 2023–present).
- Joy Fashion, TDCCommerce ERP, and Food Delivery project panels with working detail dialogs.
- Joy Fashion live link, GitHub, LinkedIn, email and included PDF resume download.
- Responsive mobile layouts, keyboard navigation, Escape-to-close dialogs, focus restoration, a skip link and reduced-motion support.
- Motion control; animation stops changing when paused and respects system reduced-motion preferences.

## Technical choices
HTML5, CSS and JavaScript, with Canvas 2D perspective geometry. No frameworks, package downloads, remote fonts, CDN assets, API keys or backend service are required. This is intentionally a portable source project: open index.html directly, or run the included Node server.

The scene looks dimensional through projected geometry; it is not a Three.js or WebGL scene. A future React / Three.js expansion could add custom models, shaders, postprocessing or a playable world. Those features are not claimed as part of this deliverable.

## Content and boundaries
All professional facts come from the attached resume. No revenue numbers, performance percentages, client testimonials or private ERP URLs are invented. The PDF has a masked phone number, so contact uses email. The current-role dates reflect the resume at creation time.

The site has no contact submission backend, analytics or cookies. Email opens the visitor's email application. Food Delivery and TDCCommerce do not have live links because none were provided. Project visuals are abstract typography rather than product screenshots.

## File map
- index.html: semantic page content, navigation and dialogs.
- styles.css: visual system, layout, responsive rules and reduced-motion styles.
- app.js: geometry renderer, scrolling, reveals and project dialogs.
- public/Manav_Resume.pdf: supplied resume.
- scripts/server.mjs: zero-dependency local HTTP server.
- scripts/build.mjs: creates a deployable static dist folder.
- README.md: run and customization instructions.

## Run locally
Use Node.js 18 or later:

```bash
npm run dev
```

Open http://localhost:5173. No npm install is needed. Alternatively open index.html directly in a modern browser.

## Award ambition
The concept is a distinctive starting point, not a promise of award recognition. A submission-ready iteration would benefit from custom art direction, real project screenshots, deeper case studies, additional cross-browser and device testing, and performance measurements on physical devices.
