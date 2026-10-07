import { assemblyState, clamp, projectState, sceneProgress, joyStoryState } from './motion';
import type { LabScene } from './scene';
import type { JoyScene } from './joy-scene';

function element<T extends HTMLElement = HTMLElement>(selector: string): T {
  const result = document.querySelector<T>(selector);
  if (!result) throw new Error(`Missing required element: ${selector}`);
  return result;
}
const scenes = [...document.querySelectorAll<HTMLElement>('[data-scene]')];
const machine = element('.machine');
const reduced = matchMedia('(prefers-reduced-motion: reduce)');
const desktop = matchMedia('(min-width: 900px)');
const finePointer = matchMedia('(pointer: fine)');
const motionButton = element<HTMLButtonElement>('#motion');
const progressBar = element('.page-progress span');
const timeline = element('.timeline');
const ticker = element('.ticker');
let enabled = !reduced.matches, frame = 0, scene: LabScene | undefined, heroProgress = 0, pointerX = 0, pointerY = 0;
let sceneLoading = false;
const livePreview = element<HTMLIFrameElement>('#joy-live-preview');
const joyArt = element('.joy-art');
const joyScreen = element('#joy-monitor-screen');
const typedUrl = element('#joy-typed-url');
const storyCaption = element('#joy-story-caption');
let joyScene: JoyScene | undefined, joyLoading = false, joyProgress = 0;

function draw(): void {
  frame = 0;
  if (document.hidden) return;
  const viewport = innerHeight;
  const total = Math.max(document.documentElement.scrollHeight - viewport, 1);
  progressBar.style.width = `${clamp(scrollY / total) * 100}%`;
  for (const section of scenes) {
    const rect = section.getBoundingClientRect();
    const pinned = enabled && ((desktop.matches && (section.dataset.scene === 'hero' || section.classList.contains('project-scene'))) || section.dataset.scene === 'joy');
    const progress = enabled ? sceneProgress(rect.top, rect.height, viewport, pinned) : .8;
    section.style.setProperty('--p', String(progress));
    if (section.dataset.scene === 'hero') {
      heroProgress = enabled ? progress : .7;
      const state = assemblyState(heroProgress);
      machine.style.setProperty('--a', String(state.assembled)); machine.style.setProperty('--open', String(state.opening));
      if (rect.bottom > 0 && rect.top < viewport) scene?.update(heroProgress, enabled ? pointerX : 0, enabled ? pointerY : 0);
    }
    const art = section.querySelector<HTMLElement>('.project-art');
    if (art) {
      const state = enabled ? projectState(progress) : .85;
      art.style.setProperty('--unfold', String(state)); art.style.setProperty('--travel', String(state)); art.style.setProperty('--gather', String(state));
      art.style.setProperty('--parcel-distance', `${Math.max(80, art.clientWidth * .65 - 100)}px`);
    }
    if (section.dataset.scene === 'joy') {
      joyProgress = enabled ? progress : .80;
      const story = joyStoryState(joyProgress);
      const typing = story.typing;
      const url = 'www.joyfashion.co.in';
      typedUrl.textContent = typing > 0 ? url.slice(0, Math.max(1, Math.floor(typing * url.length))) : 'Search or enter website address';
      joyScreen.style.setProperty('--hero-visible', String(story.homepage));
      section.style.setProperty('--enter-press', String(story.enterPress));
      joyArt.style.setProperty('--fallback-screen-scale', String(joyArt.clientWidth * .56 / 1366));
      const beat = story.beat;
      document.querySelectorAll<HTMLElement>('[data-beat]').forEach(item => item.classList.toggle('active', Number(item.dataset.beat) === beat));
      storyCaption.textContent = ['Every project starts with a little curiosity.', 'Sit down. Make yourself comfortable.', 'Typing www.joyfashion.co.in — one letter at a time.', 'Press Enter. Bring the idea to life.', 'Joy Fashion is live. Keep scrolling for the next project.'][beat];
      if (rect.bottom > 0 && rect.top < viewport) joyScene?.update(joyProgress);
    }
    if (section.dataset.scene === 'toolkit') element('.layer-machine').style.setProperty('--spread', String(enabled ? projectState(progress) : .8));
  }
  const journey = timeline.getBoundingClientRect();
  timeline.style.setProperty('--journey', String(enabled ? clamp((viewport * .7 - journey.top) / journey.height) : 1));
  ticker.style.setProperty('--ticker', String(enabled ? scrollY * .12 : 0));
}
function schedule(): void { if (!frame) frame = requestAnimationFrame(draw); }
async function loadScene(): Promise<void> {
  if (scene || sceneLoading) return;
  sceneLoading = true;
  try {
    const { createLabScene } = await import('./scene');
    scene = createLabScene(element('#three-scene')); scene.update(enabled ? heroProgress : .7); schedule();
  } catch (error) {
    // The original CSS/SVG composition remains usable without WebGL.
    console.info('Using the static developer composition.', error);
  }
}
async function loadJoyScene(): Promise<void> {
  if (joyLoading || joyScene) return;
  joyLoading = true;
  try {
    const { createJoyScene } = await import('./joy-scene');
    joyScene = createJoyScene(joyArt, joyScreen); joyScene.update(joyProgress); schedule();
  } catch (error) { console.info('Using the static Joy Fashion workspace.', error); joyScreen.style.setProperty('--hero-visible', '1'); }
}
function syncMotion(): void {
  document.body.classList.toggle('motion-enabled', enabled);
  document.body.classList.toggle('motion-off', !enabled);
  motionButton.setAttribute('aria-pressed', String(!enabled));
  motionButton.setAttribute('aria-label', enabled ? 'Pause decorative motion' : 'Enable decorative motion');
  element('.motion-text').textContent = enabled ? 'Motion on' : 'Motion off';
  element('.motion-icon').textContent = enabled ? 'Ⅱ' : '▷';
  pointerX = pointerY = 0;
  schedule();
  scene?.update(enabled ? heroProgress : .7);
}
motionButton.addEventListener('click', () => { enabled = !enabled && !reduced.matches; syncMotion(); });
reduced.addEventListener('change', () => { enabled = !reduced.matches; syncMotion(); });
desktop.addEventListener('change', () => { scene?.resize(); joyScene?.resize(); schedule(); });
window.addEventListener('scroll', schedule, { passive: true });
window.addEventListener('resize', () => { scene?.resize(); joyScene?.resize(); schedule(); });
document.addEventListener('visibilitychange', schedule);
machine.addEventListener('pointermove', event => {
  if (!enabled || !finePointer.matches) return;
  const rect = machine.getBoundingClientRect();
  pointerX = (event.clientX - rect.left) / rect.width - .5; pointerY = (event.clientY - rect.top) / rect.height - .5;
  machine.style.setProperty('--tilt-x', `${pointerY * -5}deg`); machine.style.setProperty('--tilt-y', `${pointerX * 7}deg`); schedule();
});
machine.addEventListener('pointerleave', () => { pointerX = pointerY = 0; machine.style.setProperty('--tilt-x', '0deg'); machine.style.setProperty('--tilt-y', '0deg'); schedule(); });

// Load the actual storefront as its project approaches, without trapping page scrolling.
const previewObserver = new IntersectionObserver(entries => {
  if (!entries.some(entry => entry.isIntersecting)) return;
  if (!livePreview.getAttribute('src')) livePreview.src = livePreview.dataset.src ?? 'https://www.joyfashion.co.in/';
  loadJoyScene();
  previewObserver.disconnect();
}, { rootMargin: '700px 0px' });
previewObserver.observe(joyArt);
const layerMachine = element('.layer-machine');
for (const group of document.querySelectorAll<HTMLElement>('.skill-group')) {
  const button = group.querySelector<HTMLButtonElement>('button');
  const select = () => {
    for (const other of document.querySelectorAll<HTMLElement>('.skill-group')) {
      const active = other === group; other.classList.toggle('active', active); other.querySelector('button')?.setAttribute('aria-pressed', String(active));
    }
    layerMachine.dataset.active = group.dataset.skill;
  };
  button?.addEventListener('click', select); button?.addEventListener('focus', select);
}

interface Project { type: string; title: string; summary: string; points: string[]; url?: string; }
const projects: Record<string, Project> = {
  joy: { type: '01 / COMMERCE', title: 'Joy Fashion', summary: 'A full-stack e-commerce platform connecting the customer shopping experience with flexible admin tools.', points: ['Customer and admin interfaces, with Google Sign-In, email login, and role-based access.', 'Product discovery, cart, checkout, order management, and payment integration.', 'Admin-managed homepage templates, inventory, and product management.', 'Next.js interfaces connected to GraphQL APIs and PostgreSQL.'], url: 'https://www.joyfashion.co.in' },
  tdc: { type: '02 / ENTERPRISE', title: 'TDCCommerce ERP', summary: 'Connected transaction management and automation for enterprise fulfilment workflows.', points: ['Transaction Module development and order fulfilment workflows.', 'FedEx, USPS, and UPS integrations for shipments, labels, and tracking.', 'Configurable workflows and scripting for complex transaction processes.', 'Reusable React and TypeScript interfaces, GraphQL integration, and collaboration with backend and QA teams.'] },
  food: { type: '03 / OPERATIONS', title: 'Food Delivery Platform', summary: 'A restaurant management dashboard that connects menus, orders, and the teams running them.', points: ['Restaurant management interfaces built with Next.js.', 'Authentication and role-based access.', 'GraphQL APIs for menus and order management.', 'PostgreSQL integration and query optimisation.'] },
};
const dialog = element<HTMLDialogElement>('#project-dialog');
let opener: HTMLButtonElement | undefined;
let previousOverflow = '';
for (const button of document.querySelectorAll<HTMLButtonElement>('[data-project]')) {
  button.addEventListener('click', () => {
    const project = projects[button.dataset.project ?? '']; if (!project) return;
    opener = button;
    element('#dialog-type').textContent = project.type; element('#dialog-title').textContent = project.title; element('#dialog-summary').textContent = project.summary;
    element('#dialog-list').replaceChildren(...project.points.map(point => { const item = document.createElement('li'); item.textContent = point; return item; }));
    const linkSlot = element('#dialog-link'); linkSlot.replaceChildren();
    if (project.url) { const link = document.createElement('a'); link.href = project.url; link.target = '_blank'; link.rel = 'noopener noreferrer'; link.textContent = 'Visit Joy Fashion ↗'; linkSlot.append(link); }
    previousOverflow = document.body.style.overflow; dialog.showModal(); document.body.style.overflow = 'hidden'; element<HTMLButtonElement>('.dialog-close').focus();
  });
}
element('.dialog-close').addEventListener('click', () => dialog.close());
dialog.addEventListener('close', () => { document.body.style.overflow = previousOverflow; opener?.focus({ preventScroll: true }); schedule(); });
dialog.addEventListener('click', event => { if (event.target !== dialog) return; const rect = dialog.getBoundingClientRect(); if (event.clientX < rect.left || event.clientX > rect.right || event.clientY < rect.top || event.clientY > rect.bottom) dialog.close(); });

syncMotion(); loadScene();
document.fonts.ready.then(() => { scene?.resize(); joyScene?.resize(); schedule(); });
window.addEventListener('pageshow', schedule);
window.addEventListener('pagehide', event => { if (!event.persisted) { if (frame) cancelAnimationFrame(frame); previewObserver.disconnect(); scene?.dispose(); joyScene?.dispose(); } });
