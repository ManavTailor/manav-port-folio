# Manav Tailor — Playful Portfolio Generation Brief

## How to use this file

For Replit Agent or a coding agent: paste the **Master build prompt** and **Verified content** below, or attach this entire file. When updating this existing project, also provide its source files and `public/Manav_Resume.pdf`.

For Figma: use the **Figma design prompt** together with the master brief and verified content. Figma should deliver editable visual designs and motion storyboards; the coding agent implements the actual browser interactions.

This file is a proposed creative direction, not a claim that the new experience has already been built. Professional details were extracted from the existing portfolio; confirm employment status and project links before publication.

## Master build prompt

You are a creative director, interaction designer, and senior creative frontend developer. Create an original, visually exceptional portfolio for **Manav Tailor, Full Stack Software Engineer, Udaipur, India**.

The audience is recruiters, engineering teams, collaborators, and potential clients. They must quickly understand who Manav is, see his strongest work, and reach his resume and contact information. The experience should also make them curious enough to explore.

Build a finished, responsive website with working interactions, real content, and a coherent visual identity. The defining feature is a continuous, playful journey controlled by scrolling. A section appearing with a fade or slide does not satisfy the brief.

### 1. Creative direction: Manav's Build Lab

Imagine entering a small designer-engineer's workshop where ideas turn into working products. A distinctive assembly of sculptural building blocks becomes the recurring visual motif. Scrolling takes the visitor from loose parts, to a connected system, to finished projects, to an invitation to collaborate.

The hero composition, project chapters, toolkit, and ending share these same parts. Transitions should feel like changes within one world rather than unrelated animated sections.

The atmosphere is tactile, curious, optimistic, and professionally art-directed. Combine large editorial typography, warm paper surfaces, graphite, cobalt, and a few candy-coloured objects. Keep whitespace generous. Show technical depth through the content and the interaction metaphor.

Alternative directions, only if the main concept proves unsuitable:
- **Paper Playground:** illustrated cutouts, unfolding project posters, and a paper conveyor. Lighter and easier to deliver without WebGL.
- **Miniature Workshop:** a complete 3D environment with camera travel. More immersive, but requires more asset creation and device optimisation.

Use **Build Lab** by default. Prefer a few excellent scenes over a sprawling game world.

### 2. Reference vocabulary

Study these references when browsing is available. Extract principles rather than copying assets, layouts, branding, or exact interactions:

| Reference | Principle to study |
| --- | --- |
| https://lusion.co/ | Visual craft, dimensional objects, continuity between movement and layout |
| https://thesillybunny.co/ | Friendly illustration, discovery, a consistent story world |
| https://bruno-simon.com/ | A recognisable personal world and interaction that invites play |
| https://choochooworld.com/ | Tactile objects and approachable play |
| https://neal.fun/space-elevator/ | Scrolling as a journey, progressive discoveries, meaningful scale |
| https://www.cameronsworld.net/ | Unexpected details and personality |
| https://tympanus.net/Development/OnScrollTypographyAnimations/ | Expressive typography tied to scroll position |

These references include both scrolling experiences and games. Build Lab should retain scroll as its main navigation mechanism. Treat contemporary creative-web techniques as inspiration, not a guarantee of awards or popularity.

### 3. Visual system

- Paper: `#F4F1E8`; graphite: `#20211F`; cobalt: `#294DFF`; tangerine: `#FF7548`; lilac: `#B9A6ED`; lime: `#D5EB71`.
- Use paper and graphite for most surfaces. Pick one dominant accent per scene; other colours belong to the recurring objects.
- Display type: a distinctive licensed grotesk with strong proportions. Prefer Space Grotesk or another available open-source face; body text can use Manrope. Use a mono face sparingly for chapter numbers and technical annotations.
- Hero type should feel poster-sized, with deliberate line breaks. Use fluid sizing and readable mobile layouts. Do not distort the accessible text layer.
- Objects: bevelled cubes, rounded connectors, a small spring, and project panels with consistent materials and soft shadows. Avoid unrelated stock illustrations.
- Composition: asymmetry, strong alignment, varying scale, occasional overlaps that preserve legibility. Rounded shapes are a material choice, not a reason to put every section into a card.
- Texture should be subtle. Preserve text contrast and avoid expensive full-screen animated noise.

### 4. Scroll choreography

Create five connected scenes. Use the progress ranges below as local scene progress, from 0 to 1. Values are direction for implementation, not fixed pixel offsets.

#### Scene 1 — Start the machine

Initial viewport: Manav's identity and role are immediately visible. Headline: **“I turn moving parts into working products.”** Show a sculptural cluster of loose parts beside or behind the type, without obscuring it. Include **View work** and **Resume** links immediately.

- Progress 0–0.2: the loose parts separate slightly, revealing the shape of an unfinished machine.
- 0.2–0.7: scrolling assembles the parts into a recognisable connected structure. Connectors meet, pieces rotate into place, and the camera or composition moves closer.
- 0.7–1: the assembled structure opens a clear window into the first project. The page background changes smoothly to that project's accent.

Use a short pin, approximately one extra viewport on desktop. The transition reverses naturally when scrolling upward. Pointer movement adds only a small tilt; scroll remains the primary driver. Identity and navigation must be usable before scene assets finish loading.

#### Scene 2 — Products on the workbench

Give each project a large, distinct chapter rather than three identical tiles:

1. **Joy Fashion:** a product presentation surface unfolds into customer and admin views. Use supplied screenshots if available. Otherwise create a tasteful illustrative commerce composition and label it “Illustrative interface”.
2. **TDCCommerce ERP:** a simple order object travels along connected stages: transaction → fulfilment → shipment → tracking. The scene visually explains connected workflows.
3. **Food Delivery Platform:** menu items assemble into an order, then settle into a restaurant dashboard composition.

For each chapter, local progress 0–0.25 introduces the project, 0.25–0.75 demonstrates its metaphor, and 0.75–1 resolves into a readable project summary and case-study link. Give visitors a pause in the choreography to read. The visual should support a real engineering story.

Show project name, problem, Manav's contribution, relevant technology, and known features. Include a live link only where one exists. A keyboard-accessible case study should explain the work without requiring the animated scene.

Use at most one horizontal sequence on desktop, if it improves the composition. On mobile, projects flow vertically. Do not combine horizontal and vertical scroll traps.

#### Scene 3 — Meet the builder

Let the workbench parts stretch into a path that connects Manav's education and professional experience. As each milestone enters the viewport, one corresponding object joins the path. Keep dates and roles as readable HTML.

This scene should be calmer than the project showcase. Use short factual copy with personality. Avoid calculating years of experience from an unconfirmed current-role end date.

#### Scene 4 — Under the surface

Use a cutaway view of the machine to connect three skill groups:
- Frontend: the visible interface.
- Backend: the connected engine.
- Workflow: the tools that help ship it.

Scroll gently opens the layers; hovering or focusing a group highlights its connected parts. Provide equivalent click/tap controls. Skill names remain readable in a normal list. Do not invent proficiency percentages.

Optional delight: visitors can briefly nudge three decorative parts, then use **Reset** to put them back. This is a small side interaction, not required navigation. Omit it if it compromises the main experience.

#### Scene 5 — Make room for the next idea

The recurring objects settle into a simple frame around the final headline: **“What should we build next?”** End with a warm, quiet composition, email, GitHub, LinkedIn, and resume links.

An optional spring or stamp reacts to hover, focus, or tap. Keep the email link clear and immediately usable. End the story with resolution rather than another elaborate transition.

### 5. Interaction rules

- Include a compact header: Work, About, Contact, Resume. Anchor links must land at usable reading positions even when desktop scenes are pinned.
- Scroll controls assembly, camera position, material changes, and transitions. Hover states add secondary feedback.
- Use restrained spring settling on discrete actions. Scroll-scrubbed motion should remain predictable and reversible.
- Keep native scrolling. Smooth scrolling is optional and must not interfere with keyboard navigation, anchors, dialogs, or browser history.
- Sound is optional, off by default, and can only start after explicit user interaction. Omit it if it adds little value.
- Cursor enhancements are optional; retain the normal cursor and disable enhancements on touch devices.
- Motion controls should freeze decorative motion while preserving readable layout, links, and access to every scene.
- Never delay meaningful content behind an arbitrary cinematic loader.

### 6. Content and assets

Use the verified content below. Preserve factual project claims. Do not fabricate testimonials, awards, client logos, business outcomes, project URLs, availability, or performance metrics.

If screenshots are absent, use clearly labelled illustrative visuals; do not present invented dashboards as shipped product screenshots. Build custom scene objects with procedural geometry or original SVG assets when possible. Keep all visual elements in one material and lighting system.

Read the source resume when supplied. Reconcile conflicting facts before publishing. Do not guess a portrait or use a stock person as Manav.

### 7. Technical direction

For a new Replit implementation, React, TypeScript, Vite, GSAP ScrollTrigger, and Three.js / React Three Fiber are a suitable starting architecture. Tailwind or CSS modules are optional. Choose one main scroll-animation owner to prevent competing timelines.

For this existing repository, first inspect `index.html`, `styles.css`, `app.js`, and `package.json`. It currently uses vanilla HTML/CSS/JavaScript and Canvas 2D. Preserve the working portfolio content and resume. Explain whether the proposed experience needs a framework migration; do not introduce a new stack solely for fashion.

Use one coordinated decorative scene renderer where WebGL is justified. Map semantic section progress to explicit scene states. Keep text, navigation, and case studies in HTML. Camera movement must not create a duplicate scrolling container.

Separate content data, visual tokens, scene objects, timeline setup, project details, and motion preferences. Clean up animations and observers on teardown. Refresh scroll measurements after fonts and assets load. Use stable layout dimensions to avoid jumps.

Essential deliverables: full runnable source, real scene choreography, working links and case studies, mobile layouts, asset files, instructions, and a short explanation of the motion architecture. Do not stop after the hero.

### 8. Mobile, accessibility, and performance

- Design mobile intentionally at 390 px and verify down to 360 px. Use a compact hero object and vertical project scenes, without long pins.
- Respect `prefers-reduced-motion`. Render meaningful static compositions, remove scroll scrubbing and pins, and keep every fact and action accessible.
- Provide a static poster/SVG fallback when WebGL fails. Hide decorative graphics from screen readers.
- Maintain visible focus, semantic headings, adequate contrast, and touch targets around 44 px. No important information available only on hover.
- Dialogs need focus management, Escape support, and focus restoration. Page scrolling must recover correctly after closing.
- Pause rendering in hidden tabs and when appropriate offscreen. Cap pixel ratio, reduce effects on small devices, and dispose of GPU resources.
- Prefer compressed assets, lazy-loaded secondary visuals, and modest postprocessing. Set a first-load transfer budget near 2 MB excluding the optional PDF; measure it and report any justified overage.
- Aim for smooth motion on representative devices, but report measured results rather than claiming a universal frame rate.

### 9. Workflow and acceptance criteria

First show a concise art direction and scroll storyboard. Once approved, implement the central assembly-to-project transition as a vertical slice. Validate its visual quality before expanding to the remaining scenes. Complete every chapter and then refine the whole journey.

Review desktop and mobile screenshots plus a screen recording of the scroll experience. Static screenshots alone cannot validate choreography. Check forward scrolling, reverse scrolling, direct anchor navigation, resize, touch, keyboard, reduced motion, missing assets, and WebGL failure.

The result is acceptable only when:
- The first viewport communicates Manav's identity and provides direct access to work and resume.
- At least three substantial transformations depend on continuous scroll position rather than simple entrance animations.
- A recurring object system visibly connects the beginning, projects, toolkit, and ending.
- Every project has a different visual idea and a readable engineering explanation.
- The experience works without sound, hover, or WebGL.
- Contact, resume, project details, and external links work.
- There is no accidental horizontal overflow or inaccessible pinned content.
- The delivered build runs successfully, and validation results are reported honestly.

Avoid default developer-template patterns: generic neon gradient backgrounds, floating tech logos, endless particle fields, repeated glass cards, fake terminals, oversized empty sections, and the same fade-up effect everywhere. If the result resembles a template with animations added, revise the compositions and scene transitions before delivery.

## Verified content

Source: the existing local portfolio. These details are available for drafting; current facts and external link destinations require verification before publication.

### Identity
- Name: Manav Tailor.
- Role: Full Stack Software Engineer.
- Location: Udaipur, India.
- Email: tailormanav68@gmail.com.
- GitHub: https://github.com/ManavTailor.
- LinkedIn: https://www.linkedin.com/in/manav-tailor.
- Resume asset: `public/Manav_Resume.pdf`.

### Experience and education
- B.Tech, Computer Science, Techno India NJR Institute of Technology, 2020–2024.
- Web Developer Intern, CodePlanet Technologies, June–November 2022: Python, Django, MVC architecture, and database integration.
- Salesforce Intern, TechForce Services, April–August 2023: Salesforce Administration, Lightning Platform, and CRM customisation.
- Software Developer, TDC Consultancy, August 2023–present **as recorded in the supplied portfolio; verify that this is still current**. Work includes applications, backend services, reusable interfaces, and collaboration with engineering, design, and QA.

### Projects
**Joy Fashion:** full-stack e-commerce with customer and admin interfaces. Authentication, role-based access, product browsing, cart, checkout, orders, payment integration, configurable homepage, inventory and order management. Stack recorded: Next.js, GraphQL, PostgreSQL. Existing live URL: https://www.joyfashion.co.in.

**TDCCommerce ERP:** transaction management, order fulfilment, configurable workflows, scripting, shipping labels, and tracking with FedEx, USPS, and UPS integrations. Reusable React interfaces and GraphQL integration. No public live URL supplied.

**Food Delivery Platform:** restaurant management dashboard, authentication and roles, GraphQL APIs for orders and menus, and PostgreSQL query optimisation. Stack recorded: Next.js, GraphQL, PostgreSQL. No public live URL supplied.

### Toolkit
- Frontend: React, Next.js, TypeScript, JavaScript, HTML, CSS, Tailwind CSS, Ant Design.
- Backend: Node.js, Express, GraphQL, TypeORM, PostgreSQL, MySQL, Redis, SQL.
- Workflow: Git, GitHub, Docker, Postman, VS Code, Figma, Agile collaboration.

## Figma design prompt

Using the Build Lab brief above, design an original, editable portfolio for Manav Tailor. Deliver visual designs and a motion specification that a frontend developer can implement.

Create pages named **Direction**, **Desktop**, **Mobile**, **Motion Storyboard**, and **Components**. Use editable text, auto layout where appropriate, colour and spacing variables, and reusable components for navigation, links, project metadata, and controls.

Design desktop at 1440 px and mobile at 390 px. Include the complete portfolio, expanded case-study states, the mobile navigation, visible keyboard focus, and reduced-motion compositions.

For the hero and each major transition, create labelled start, midpoint, and end frames. Annotate the scroll range, object transforms, text timing, layering, pin duration, and mobile alternative. Specify how adjacent scenes connect. Avoid a set of disconnected attractive screenshots.

Represent 3D compositions with polished illustrative mockups or supplied renders, and label them as implementation references. Prototype the navigation and project-detail interactions where possible. Do not claim a Figma prototype implements real WebGL physics or browser scroll scrubbing.

The deliverable should communicate visual hierarchy, typography, material language, spacing, responsive behaviour, and a continuous story. Use the verified content without invented credentials or screenshots.

## Follow-up refinement prompt

Review the current implementation against `PORTFOLIO_GENERATION_PROMPT.md`. Identify the three largest gaps in composition, continuous scroll choreography, or project storytelling. State them briefly, then fix them within the agreed build scope.

Prioritise stronger hero assembly, continuity between adjacent chapters, and unique project visuals. Preserve functional links, factual content, mobile behaviour, and reduced-motion access. Validate changes with desktop/mobile screenshots and a recording of forward and reverse scrolling. Report actual checks and any remaining limitations.
