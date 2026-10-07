import * as THREE from 'three';
import { RoundedBoxGeometry } from 'three/addons/geometries/RoundedBoxGeometry.js';
import { CSS3DObject, CSS3DRenderer } from 'three/addons/renderers/CSS3DRenderer.js';
import { clamp, smooth, joyStoryState } from './motion';

export interface JoyScene { update(progress: number): void; resize(): void; dispose(): void; }

export function createJoyScene(container: HTMLElement, screenElement: HTMLElement): JoyScene {
  const renderer = new THREE.WebGLRenderer({ alpha: true, antialias: true, powerPreference: 'low-power' });
  renderer.setPixelRatio(Math.min(devicePixelRatio, innerWidth < 600 ? 1.25 : 1.75));
  renderer.outputColorSpace = THREE.SRGBColorSpace;
  renderer.toneMapping = THREE.ACESFilmicToneMapping;
  renderer.toneMappingExposure = 1.2;
  renderer.shadowMap.enabled = true; renderer.shadowMap.type = THREE.PCFSoftShadowMap;
  const cssRenderer = new CSS3DRenderer();
  cssRenderer.domElement.className = 'joy-css-world'; renderer.domElement.className = 'joy-webgl-world';
  const scene = new THREE.Scene(), cssScene = new THREE.Scene();
  const camera = new THREE.PerspectiveCamera(36, 1, .1, 60);
  const room = new THREE.Group(); scene.add(room);
  scene.add(new THREE.HemisphereLight(0xffffff, 0x8c739b, 3));
  const sunlight = new THREE.DirectionalLight(0xffefdc, 4);
  sunlight.position.set(-4, 8, 5); sunlight.castShadow = true;
  sunlight.shadow.mapSize.set(1024, 1024); sunlight.shadow.camera.left = -6; sunlight.shadow.camera.right = 6; sunlight.shadow.camera.top = 6; sunlight.shadow.camera.bottom = -6; sunlight.shadow.normalBias = .035;
  scene.add(sunlight);
  const rim = new THREE.DirectionalLight(0xd3deff, 2); rim.position.set(4, 4, -3); scene.add(rim);
  const geometries: THREE.BufferGeometry[] = [], materials: THREE.Material[] = [];
  const mat = (color: string, roughness = .55) => { const m = new THREE.MeshStandardMaterial({ color, roughness, metalness: .03 }); materials.push(m); return m; };
  const skin = mat('#efbc96'), shirt = mat('#294dff'), pants = mat('#34384b'), shoes = mat('#f4f1e8'), hair = mat('#3b2823'), wood = mat('#ebd8b8'), graphite = mat('#343947'), purple = mat('#9d82c9'), white = mat('#f4f1e8');
  function mesh(geometry: THREE.BufferGeometry, material: THREE.Material, parent: THREE.Object3D = room): THREE.Mesh {
    geometries.push(geometry); const object = new THREE.Mesh(geometry, material); object.castShadow = true; object.receiveShadow = true; parent.add(object); return object;
  }
  function box(w: number, h: number, d: number, material: THREE.Material, x: number, y: number, z: number, parent: THREE.Object3D = room): THREE.Mesh {
    const object = mesh(new RoundedBoxGeometry(w, h, d, 3, Math.min(.055, h / 4, w / 4)), material, parent); object.position.set(x, y, z); return object;
  }
  function sphere(radius: number, material: THREE.Material, parent: THREE.Object3D, x: number, y: number, z: number): THREE.Mesh {
    const object = mesh(new THREE.SphereGeometry(radius, 24, 20), material, parent); object.position.set(x, y, z); return object;
  }
  // An original miniature developer workspace, modelled with real 3D geometry.
  const floor = mesh(new THREE.CircleGeometry(5.2, 72), mat('#b6a1cf')); floor.rotation.x = -Math.PI / 2; floor.position.y = -.045;
  box(4.0, .17, 1.7, wood, 0, 1.68, -.05);
  for (const x of [-1.65, 1.65]) for (const z of [-.67, .58]) box(.13, 1.58, .13, graphite, x, .83, z);
  box(3.0, .075, .16, graphite, 0, .38, -.68);
  const monitorY = 2.78, monitorZ = -.57, monitorW = 2.85, monitorH = 1.8;
  box(.66, .08, .45, graphite, .2, 1.82, monitorZ);
  box(.12, .54, .11, graphite, .2, 2.08, monitorZ - .08);
  // Leave the glass area open so the CSS3D live homepage can sit inside the bezel.
  box(monitorW, .09, .17, graphite, .2, monitorY + monitorH / 2, monitorZ);
  box(monitorW, .11, .17, graphite, .2, monitorY - monitorH / 2, monitorZ);
  box(.09, monitorH, .17, graphite, .2 - monitorW / 2, monitorY, monitorZ);
  box(.09, monitorH, .17, graphite, .2 + monitorW / 2, monitorY, monitorZ);
  const power = mat('#d5eb71'); sphere(.018, power, room, 1.35, monitorY - monitorH / 2, monitorZ + .095);
  box(1.12, .055, .38, white, 0, 1.81, .5);
  const enterMaterial = mat('#b9a6ed');
  let enterKey: THREE.Mesh | undefined;
  for (let row = 0; row < 3; row++) for (let col = 0; col < 11; col++) {
    const isEnter = row === 1 && col === 10;
    const key = box(.075, .013, .072, isEnter ? enterMaterial : graphite, -.47 + col * .09, 1.85, .38 + row * .1);
    if (isEnter) enterKey = key;
  }
  box(.14, .05, .23, white, .8, 1.82, .55);
  const mug = mesh(new THREE.CylinderGeometry(.11, .095, .23, 24), purple); mug.position.set(-1.45, 1.89, .23);
  const mugHandle = mesh(new THREE.TorusGeometry(.08, .022, 10, 24), purple); mugHandle.position.set(-1.59, 1.91, .23);
  const plantPot = mesh(new THREE.CylinderGeometry(.17, .12, .27, 24), mat('#ff9674')); plantPot.position.set(1.65, 1.89, -.32);
  for (let i = 0; i < 5; i++) { const leaf = sphere(.16, mat(i % 2 ? '#8da858' : '#bad174'), room, 1.65 + Math.sin(i * 1.4) * .11, 2.17 + (i % 2) * .08, -.32 + Math.cos(i) * .07); leaf.scale.set(.5, 1.9, .45); leaf.rotation.z = (i - 2) * .28; }

  const chair = new THREE.Group(); room.add(chair); chair.position.set(0, 0, 1.32);
  box(.82, .14, .78, purple, 0, 1.04, 0, chair); box(.8, .76, .11, purple, 0, 1.48, .43, chair);
  const chairStem = mesh(new THREE.CylinderGeometry(.045, .055, .82, 16), graphite, chair); chairStem.position.y = .56;
  for (let i = 0; i < 5; i++) { const leg = box(.055, .055, .54, graphite, 0, .13, .22, chair); const pivot = new THREE.Group(); chair.add(pivot); pivot.rotation.y = i * Math.PI * 2 / 5; pivot.attach(leg); leg.position.set(0, .13, .22); sphere(.065, graphite, pivot, 0, .10, .48); }

  const character = new THREE.Group(); room.add(character);
  const pelvis = box(.46, .25, .28, pants, 0, 0, 0, character);
  const torso = box(.58, .63, .34, shirt, 0, .40, 0, character); torso.rotation.z = .015;
  const neck = mesh(new THREE.CylinderGeometry(.09, .10, .13, 16), skin, character); neck.position.y = .77;
  const head = new THREE.Group(); head.position.y = 1.01; character.add(head);
  sphere(.245, skin, head, 0, 0, 0).scale.set(.92, 1.04, .93);
  const hairCap = sphere(.25, hair, head, 0, .10, -.015); hairCap.scale.set(1, .65, .97);
  sphere(.07, hair, head, -.14, .19, .12); sphere(.045, skin, head, 0, -.01, .24);
  sphere(.015, graphite, head, -.08, .01, .213); sphere(.015, graphite, head, .08, .01, .213);
  sphere(.053, skin, head, -.235, -.02, 0); sphere(.053, skin, head, .235, -.02, 0);
  const limbs: { arm: THREE.Group; forearm: THREE.Group; thigh: THREE.Group; shin: THREE.Group; side: number }[] = [];
  for (const side of [-1, 1]) {
    const arm = new THREE.Group(); arm.position.set(side * .36, .63, 0); character.add(arm);
    box(.17, .34, .19, shirt, 0, -.14, 0, arm);
    const forearm = new THREE.Group(); forearm.position.y = -.30; arm.add(forearm);
    box(.135, .32, .14, skin, 0, -.16, 0, forearm); sphere(.087, skin, forearm, 0, -.35, 0);
    const thigh = new THREE.Group(); thigh.position.set(side * .145, -.07, 0); character.add(thigh);
    box(.20, .45, .22, pants, 0, -.23, 0, thigh);
    const shin = new THREE.Group(); shin.position.y = -.46; thigh.add(shin);
    box(.16, .45, .18, pants, 0, -.22, 0, shin); box(.21, .13, .33, shoes, 0, -.49, .08, shin);
    limbs.push({ arm, forearm, thigh, shin, side });
  }

  const screen = new CSS3DObject(screenElement);
  screen.position.set(.2, monitorY, monitorZ + .095);
  screen.scale.setScalar((monitorW - .12) / 1366);
  cssScene.add(screen);
  screenElement.classList.add('is-projected');
  container.append(cssRenderer.domElement, renderer.domElement);
  let current = 0, disposed = false;
  const cameraWide = new THREE.Vector3(6.7, 4.8, 9.2), cameraDesk = new THREE.Vector3(4.3, 3.8, 7.1);
  const deskTarget = new THREE.Vector3(0, 1.75, .35);
  const cameraScreen = new THREE.Vector3(.35, 2.84, 3.0), screenTarget = new THREE.Vector3(.2, monitorY, monitorZ);
  const cameraKeyboard = new THREE.Vector3(1.45, 2.75, 2.45), keyboardTarget = new THREE.Vector3(.25, 1.86, .48);
  const target = new THREE.Vector3();
  function update(progress: number): void {
    current = clamp(progress);
    const story = joyStoryState(current);
    const { walk, sit, typing: type } = story;
    const gait = Math.sin(walk * Math.PI * 8) * .42 * (1 - sit);
    character.position.set(THREE.MathUtils.lerp(-4.2, 0, walk), 1.10 + Math.sin(walk * Math.PI * 16) * .026 * (1 - sit), THREE.MathUtils.lerp(1.85, 1.15, sit));
    character.rotation.y = THREE.MathUtils.lerp(Math.PI / 2, Math.PI, smooth((current - .12) / .17));
    torso.rotation.x = -.08 * sit + Math.sin(type * Math.PI * 12) * .006;
    head.rotation.x = -.09 * sit;
    limbs.forEach(({ arm, forearm, thigh, shin, side }) => {
      thigh.rotation.x = THREE.MathUtils.lerp(gait * side, -Math.PI / 2, sit);
      shin.rotation.x = THREE.MathUtils.lerp(Math.max(0, -gait * side) * .5, Math.PI / 2, sit);
      shin.scale.y = 1 + sit * .8;
      const tapping = current > .48 && current < .64 ? Math.sin(type * Math.PI * 22 + side) * .04 : 0;
      const enterTap = side === -1 ? story.enterPress * .065 : 0;
      arm.rotation.x = THREE.MathUtils.lerp(-gait * side * .5, -1.10 + tapping, sit);
      arm.rotation.z = -side * .06; forearm.rotation.x = -1.10 * sit + tapping + enterTap;
    });
    pelvis.rotation.x = -.03 * sit;
    cameraScreen.z = monitorZ + Math.max(3.0, 2.9 / (2 * Math.tan(THREE.MathUtils.degToRad(18)) * camera.aspect));
    camera.position.lerpVectors(cameraWide, cameraDesk, smooth(current / .35));
    camera.position.lerp(cameraScreen, story.screenFocus);
    camera.position.lerp(cameraKeyboard, story.keyboardFocus);
    target.lerpVectors(deskTarget, screenTarget, story.screenFocus).lerp(keyboardTarget, story.keyboardFocus);
    camera.lookAt(target);
    if (enterKey) enterKey.position.y = 1.85 - story.enterPress * .018;
    enterMaterial.color.set(story.enterPress > .1 ? '#d5eb71' : '#b9a6ed');
    screenElement.style.setProperty('--hero-visible', String(story.homepage));
    if (disposed || document.hidden) return;
    cssRenderer.render(cssScene, camera); renderer.render(scene, camera);
  }
  const resize = () => { const bounds = container.getBoundingClientRect(); const width = Math.max(1, bounds.width), height = Math.max(1, bounds.height); camera.aspect = width / height; camera.updateProjectionMatrix(); renderer.setSize(width, height); cssRenderer.setSize(width, height); update(current); };
  const lost = (event: Event) => { event.preventDefault(); container.classList.remove('joy-webgl-ready'); };
  const restored = () => { container.classList.add('joy-webgl-ready'); resize(); };
  renderer.domElement.addEventListener('webglcontextlost', lost); renderer.domElement.addEventListener('webglcontextrestored', restored);
  resize(); container.classList.add('joy-webgl-ready');
  return { update, resize, dispose() { disposed = true; renderer.domElement.removeEventListener('webglcontextlost', lost); renderer.domElement.removeEventListener('webglcontextrestored', restored); geometries.forEach(g => g.dispose()); materials.forEach(m => m.dispose()); renderer.dispose(); renderer.domElement.remove(); cssRenderer.domElement.remove(); screenElement.classList.remove('is-projected'); container.append(screenElement); container.classList.remove('joy-webgl-ready'); } };
}
