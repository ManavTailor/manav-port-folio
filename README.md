# Manav / Build in Motion

A playful scrolling portfolio built from Manav Tailor's resume.

## Quick start
1. Extract the ZIP.
2. Open the `manav-portfolio` folder in VS Code.
3. Open a terminal in that folder and run:

```bash
npm run dev
```

4. Visit **http://localhost:5173**.

Requires Node.js 18+. **No npm install, API key or environment file is needed.** You can also open `index.html` directly in Chrome, Firefox, Safari or Edge.

If port 5173 is in use, stop the other process or choose another port:

```bash
# Linux / macOS
PORT=5174 npm run dev
```

```powershell
# Windows PowerShell
$env:PORT=5174; npm run dev
```

## Production files

```bash
npm run check
npm run build
```

Upload the contents of `dist/` to any static hosting provider. No backend is required.

## Customize
- Text, timeline, skills and contact links: `index.html`.
- Project dialog descriptions: `projects` in `app.js`.
- Palette, typography and layouts: `styles.css`.
- Portal geometry: `draw()` in `app.js`.
- Resume: replace `public/Manav_Resume.pdf`.

Read `PORTFOLIO_DESIGN.md` for the concept, implemented features and future directions. Resume dates and content are not automatically updated. Confirm your public contact details before publishing.

## Accessibility
Semantic HTML stays readable independently of the canvas. System reduced motion disables the continuous motion. The header also provides a motion toggle. Dialogs support keyboard focus and Escape. The canvas is decorative and hidden from screen readers.

## Stack
HTML / CSS / vanilla JavaScript / Canvas 2D. The local server and build script use only Node built-ins. No external runtime dependencies.
