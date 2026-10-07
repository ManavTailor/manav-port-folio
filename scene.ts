import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { assemblyState } from './motion';

export interface LabScene { update(progress: number, pointerX?: number, pointerY?: number): void; resize(): void; dispose(): void; }

export function createLabScene(container: HTMLElement): LabScene {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 600 ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.1;
  const scene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(35, 1, .1, 60);
  camera.position.set(1.2, 1.2, 10.8); camera.lookAt(0, 0, 0);
  const world = new THREE.Group(); scene.add(world);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8e86b4, 3));
  const key = new THREE.DirectionalLight(0xfff6eb, 4); key.position.set(-4, 6, 7); scene.add(key);
  const fill = new THREE.DirectionalLight(0xd1d9ff, 2); fill.position.set(5, 2, -3); scene.add(fill);
  const geometries: THREE.BufferGeometry[] = [], materials: THREE.Material[] = [], textures: THREE.Texture[] = [];

  function panel(width: number, height: number, color: string, draw: (ctx: CanvasRenderingContext2D) => void): THREE.Group {
    const group = new THREE.Group();
    const geometry = new RoundedBoxGeometry(width, height, .16, 5, .07); geometries.push(geometry);
    const material = new THREE.MeshStandardMaterial({ color, roughness: .3, metalness: .12 }); materials.push(material);
    group.add(new THREE.Mesh(geometry, material));
    const canvas = document.createElement('canvas'); canvas.width = 1024; canvas.height = Math.round(1024 * height / width);
    const ctx = canvas.getContext('2d');
    if (ctx) { ctx.scale(canvas.width / 600, canvas.height / 400); draw(ctx); }
    const texture = new THREE.CanvasTexture(canvas); texture.colorSpace = THREE.SRGBColorSpace; textures.push(texture);
    const faceGeometry = new THREE.PlaneGeometry(width - .1, height - .1); geometries.push(faceGeometry);
    const faceMaterial = new THREE.MeshBasicMaterial({ map: texture }); materials.push(faceMaterial);
    const face = new THREE.Mesh(faceGeometry, faceMaterial); face.position.z = .088; group.add(face); world.add(group); return group;
  }
  function header(ctx: CanvasRenderingContext2D, title: string, dark = false): void {
    ctx.fillStyle = dark ? '#1d243a' : '#f4f1e8'; ctx.fillRect(0, 0, 600, 400);
    ctx.fillStyle = dark ? '#28324d' : '#e5e3dc'; ctx.fillRect(0, 0, 600, 42);
    ['#ff977c', '#e9d879', '#abc77b'].forEach((color, i) => { ctx.fillStyle = color; ctx.beginPath(); ctx.arc(20 + i * 17, 21, 5, 0, Math.PI * 2); ctx.fill(); });
    ctx.font = '13px monospace'; ctx.fillStyle = dark ? '#b4bdd5' : '#64675d'; ctx.fillText(title, 90, 26);
  }
  const editor = panel(3.65, 2.65, '#1d243a', ctx => {
    header(ctx, 'experience.tsx', true);
    const lines: [string, string][] = [['#b9a6ed', 'const Developer = () => {'], ['#929db7', '  // good ideas, shipped.'], ['#d5eb71', '  return ('], ['#8aabff', '    <Experience'], ['#f4f1e8', '      frontend="React"'], ['#f4f1e8', '      backend="Node.js"'], ['#ffaf8c', '      curiosity={Infinity}'], ['#8aabff', '    />'], ['#d5eb71', '  );'], ['#b9a6ed', '};']];
    lines.forEach(([color, text], index) => { ctx.fillStyle = '#59647f'; ctx.font = '14px monospace'; ctx.fillText(String(index + 1).padStart(2, '0'), 18, 78 + index * 26); ctx.fillStyle = color; ctx.font = '18px monospace'; ctx.fillText(text, 61, 78 + index * 26); });
  });
  const ui = panel(2.9, 2.25, '#294dff', ctx => {
    header(ctx, 'localhost:3000'); ctx.fillStyle = '#294dff'; ctx.fillRect(0, 42, 600, 358);
    ctx.fillStyle = '#d5eb71'; ctx.font = '14px monospace'; ctx.fillText('FROM IDEA TO INTERFACE', 35, 93);
    ctx.fillStyle = '#f4f1e8'; ctx.font = 'bold 65px Arial'; ctx.fillText('Ideas.', 33, 180); ctx.fillText('Made real.', 33, 247);
    ctx.fillStyle = '#d5eb71'; ctx.fillRect(35, 300, 215, 52); ctx.fillStyle = '#20211f'; ctx.font = '17px Arial'; ctx.fillText('Explore experience  ↗', 51, 332);
    ctx.strokeStyle = '#b9a6ed'; ctx.lineWidth = 15; ctx.beginPath(); ctx.arc(480, 285, 78, 0, Math.PI * 2); ctx.stroke();
  });
  const api = panel(1.7, 1.7, '#b9a6ed', ctx => {
    ctx.fillStyle = '#b9a6ed'; ctx.fillRect(0, 0, 600, 400); ctx.fillStyle = '#443362'; ctx.font = '20px monospace'; ctx.fillText('API / CONNECTED', 35, 55);
    ctx.font = 'bold 130px monospace'; ctx.fillText('{ }', 93, 240); ctx.font = '21px monospace'; ctx.fillText('200 OK  ·  GraphQL', 35, 355);
  });
  const data = panel(2.05, .85, '#d5eb71', ctx => {
    ctx.fillStyle = '#d5eb71'; ctx.fillRect(0, 0, 600, 400); ctx.fillStyle = '#3f5021'; ctx.font = '28px monospace'; ctx.fillText('DATABASE', 38, 75); ctx.font = 'bold 75px Arial'; ctx.fillText('PostgreSQL', 35, 213); ctx.font = '25px monospace'; ctx.fillText('● connected / ready', 38, 327);
  });
  const parts = [
    { object: editor, from: new THREE.Vector3(-.7, .65, -.4), to: new THREE.Vector3(-.35, .45, -.65), turn: -.12 },
    { object: ui, from: new THREE.Vector3(.95, -.45, .65), to: new THREE.Vector3(.45, -.15, .7), turn: .12 },
    { object: api, from: new THREE.Vector3(1.85, 1.4, .1), to: new THREE.Vector3(1.75, .85, -.15), turn: .2 },
    { object: data, from: new THREE.Vector3(-1.4, -1.5, .5), to: new THREE.Vector3(-1.3, -1.25, .75), turn: -.1 },
  ];
  let current = 0, px = 0, py = 0, disposed = false;
  const machine = container.closest('.machine');
  const update = (progress: number, pointerX = 0, pointerY = 0) => {
    current = progress; px = pointerX; py = pointerY;
    const { assembled, opening } = assemblyState(progress);
    parts.forEach(part => { part.object.position.lerpVectors(part.from, part.to, assembled); part.object.rotation.z = part.turn * (1 - assembled * .6); part.object.rotation.y = -.15 + opening * .25; });
    world.rotation.y = pointerX * .13 - opening * .12; world.rotation.x = pointerY * .06; world.scale.setScalar(1 + opening * .07);
    if (!disposed && !document.hidden) renderer.render(scene, camera);
  };
  const resize = () => { const { width, height } = container.getBoundingClientRect(); renderer.setSize(Math.max(width, 1), Math.max(height, 1)); camera.aspect = Math.max(width, 1) / Math.max(height, 1); camera.updateProjectionMatrix(); update(current, px, py); };
  const lost = (event: Event) => { event.preventDefault(); machine?.classList.remove('webgl-ready'); };
  const restored = () => { machine?.classList.add('webgl-ready'); resize(); };
  renderer.domElement.addEventListener('webglcontextlost', lost); renderer.domElement.addEventListener('webglcontextrestored', restored);
  container.append(renderer.domElement); resize(); machine?.classList.add('webgl-ready');
  return { update, resize, dispose() { disposed = true; renderer.domElement.removeEventListener('webglcontextlost', lost); renderer.domElement.removeEventListener('webglcontextrestored', restored); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); textures.forEach(t => t.dispose()); renderer.dispose(); renderer.domElement.remove(); machine?.classList.remove('webgl-ready'); } };
}
