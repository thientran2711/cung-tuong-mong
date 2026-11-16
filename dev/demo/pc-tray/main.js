// Isolated trial: Emperor's card-flip tray with real depth (PlayCanvas engine, plain). NOT wired into the game.
import * as pc from './vendor/playcanvas.min.mjs';
const Q = new URLSearchParams(location.search);
const CDN = Q.get('cdn') || 'https://ctm-img.victoria-tntt.workers.dev/img/';
const DPR = Math.min(+(Q.get('dpr') || devicePixelRatio || 1), 3);
if (Q.has('ui')) document.body.classList.add('ui');
const T0 = performance.now();
const stats = { fps: [], long: 0, longMs: 0, frames: 0, loadMs: 0, bytes: 0, done: false };
window.__trial = stats;
try { new PerformanceObserver(l => { for (const e of l.getEntries()) { stats.long++; stats.longMs += e.duration; } }).observe({ entryTypes: ['longtask'] }); } catch (e) {}

const canvas = document.getElementById('c');
const app = new pc.Application(canvas, { graphicsDeviceOptions: { antialias: true, alpha: false, powerPreference: 'high-performance' } });
app.setCanvasFillMode(pc.FILLMODE_FILL_WINDOW); app.setCanvasResolution(pc.RESOLUTION_AUTO);
app.graphicsDevice.maxPixelRatio = DPR;
app.scene.ambientLight = new pc.Color(0.34, 0.27, 0.24);
app.start();

const W = innerWidth, H = innerHeight, portrait = W / H < 0.95;
const PW = portrait ? 1200 : 1600, PH = portrait ? 1600 : 1200;
const plateName = portrait ? 'kit/cf-gplate-emp-p.webp' : 'kit/cf-gplate-emp.webp';
// tray floor as fractions of the plate picture (measured by eye from the art), lamp position
const FLOOR = portrait ? { x0: .085, x1: .915, y0: .305, y1: .655, lamp: [.13, .11] } : { x0: .115, x1: .885, y0: .235, y1: .70, lamp: [.08, .10] };

function loadImg(src) { return new Promise((res, rej) => { const i = new Image(); i.crossOrigin = 'anonymous'; i.onload = () => { stats.bytes += 0; res(i); }; i.onerror = rej; i.src = src; }); }
function tex(canvasOrImg, srgb = true) {
  const t = new pc.Texture(app.graphicsDevice, { width: canvasOrImg.width, height: canvasOrImg.height, format: pc.PIXELFORMAT_RGBA8, mipmaps: true, minFilter: pc.FILTER_LINEAR_MIPMAP_LINEAR, magFilter: pc.FILTER_LINEAR, addressU: pc.ADDRESS_CLAMP_TO_EDGE, addressV: pc.ADDRESS_CLAMP_TO_EDGE, anisotropy: 4 });
  t.setSource(canvasOrImg); return t;
}
function mk(w, h) { const c = document.createElement('canvas'); c.width = w; c.height = h; return c; }

const NAMES = ['01', '05', '12', '02', '03', '06', '08', '10'];
const FRAMES = ['frame-consort-3', 'frame-consort-4', 'frame-consort-2', 'frame-consort-5', 'frame-consort-3', 'frame-consort-4', 'frame-consort-2', 'frame-consort-5'];
const CW = 550, CH = 1037;
function composeFront(face, frame) {
  const c = mk(CW, CH), g = c.getContext('2d');
    const wx = CW * .15, wy = CH * .215, ww = CW * .755, wh = CH * .485; // frame window
  g.save(); g.beginPath(); g.rect(wx, wy, ww, wh); g.clip();
  const s = Math.max(ww / face.width, wh / face.height); g.drawImage(face, wx + (ww - face.width * s) / 2, wy + (wh - face.height * s) / 2, face.width * s, face.height * s); g.restore();
  g.drawImage(frame, 0, 0, CW, CH); return c;
}
function composeBack(back, frame) {
  const c = mk(CW, CH), g = c.getContext('2d'); const r = 40;
  g.save(); g.beginPath(); g.roundRect(8, 8, CW - 16, CH - 16, r); g.clip();
  const s = Math.max((CW - 16) / back.width, (CH - 16) / back.height) * 1.0; g.drawImage(back, (CW - back.width * s) / 2, (CH - back.height * s) / 2, back.width * s, back.height * s); g.restore();
  g.lineWidth = 7; g.strokeStyle = '#d9b25a'; g.beginPath(); g.roundRect(8, 8, CW - 16, CH - 16, r); g.stroke(); return c;
}
function radial(size, stops) { const c = mk(size, size), g = c.getContext('2d'); g.fillStyle = '#000'; g.fillRect(0, 0, size, size); const gr = g.createRadialGradient(size / 2, size / 2, 0, size / 2, size / 2, size / 2); stops.forEach(([o, col]) => gr.addColorStop(o, col)); g.fillStyle = gr; g.fillRect(0, 0, size, size); return c; }

const urls = { plate: CDN + plateName, back: CDN + 'kit/card-back.webp', hand: CDN + 'kit/cf-hand-emp.webp', seal: CDN + 'kit/cf-seal-thitam.webp' };
const imgs = {}; const jobs = Object.entries(urls).map(([k, u]) => loadImg(u).then(i => imgs[k] = i));
const fr = {}; const faces = {};
for (const n of new Set(FRAMES)) jobs.push(loadImg(CDN + 'kit/' + n + '.webp').then(i => fr[n] = i));
for (const n of NAMES) jobs.push(loadImg(CDN + 'face-consort-' + n + '.webp').then(i => faces[n] = i));
await Promise.all(jobs);
stats.loadMs = Math.round(performance.now() - T0);
try { stats.bytes = performance.getEntriesByType('resource').reduce((a, e) => a + (e.transferSize || 0), 0); } catch (e) {}

// ---- scene (plate on XY plane facing +Z camera) ----
const UH = 3.0, UW = UH * PW / PH; // plate world size
function plane(name, w, h, mat, parent) {
  const e = new pc.Entity(name); e.addComponent('render', { type: 'plane', material: mat, castShadows: false, receiveShadows: false });
  e.setLocalScale(w, 1, h); e.setLocalEulerAngles(90, 0, 0); // plane faces +Z
  if (parent) parent.addChild(e); else app.root.addChild(e); return e;
}
function stdMat(o) { const m = new pc.StandardMaterial(); Object.assign(m, o); m.update(); return m; }
const plateTex = tex(imgs.plate);
const plateMat = stdMat({ diffuse: new pc.Color(.8, .74, .7), diffuseMap: plateTex, emissive: new pc.Color(.3, .28, .26), emissiveMap: plateTex, useMetalness: false, gloss: .25, specular: new pc.Color(.12, .1, .08), useLighting: true });
const plate = plane('plate', UW, UH, plateMat); plate.render.receiveShadows = true;

const fx = (u) => (u - .5) * UW, fy = (v) => (.5 - v) * UH;
const fl = { x0: fx(FLOOR.x0), x1: fx(FLOOR.x1), y0: fy(FLOOR.y0), y1: fy(FLOOR.y1) };
// card grid: 2 rows x 4 (landscape) / 4 rows x 2 (portrait) -> 8 cards, biggest that fits
const cols = 4, rows = 2, N = cols * rows;
const gw = fl.x1 - fl.x0, gh = fl.y0 - fl.y1;
const ca = CW / CH; let ch = Math.min(gh / rows * .96, gw / cols / ca * .96); const cw = ch * ca;
const cards = [];
const cardMat = (map, extra = {}) => stdMat(Object.assign({ diffuse: new pc.Color(.62, .6, .58), diffuseMap: map, emissive: new pc.Color(.42, .4, .38), emissiveMap: map, opacityMap: map, opacityMapChannel: 'a', alphaTest: .35, blendType: pc.BLEND_NONE, useMetalness: false, gloss: .5, specular: new pc.Color(.25, .22, .15), cull: pc.CULLFACE_BACK }, extra));
for (let i = 0; i < N; i++) {
  const c = Math.floor(i % cols), r = Math.floor(i / cols);
  const x = fl.x0 + gw * (c + .5) / cols, y = fl.y0 - gh * (r + .5) / rows;
  const root = new pc.Entity('card' + i); root.setLocalPosition(x, y, .02); app.root.addChild(root);
  const pivot = new pc.Entity('pv'); root.addChild(pivot);
  // face-down at rest: back faces camera. front plane rotated 180deg about Y.
  const back = plane('back', cw, ch, cardMat(tex(composeBack(imgs.back))), pivot); back.render.castShadows = true; back.render.receiveShadows = true;
  const front = plane('front', cw, ch, cardMat(tex(composeFront(faces[NAMES[i]], fr[FRAMES[i]]))), pivot);
  front.setLocalPosition(0, -0.0012, 0); front.setLocalEulerAngles(90, 180, 0); front.render.castShadows = true; front.render.receiveShadows = true;
  back.setLocalPosition(0, 0.0012, 0);
  pivot.setLocalEulerAngles(0, 0, 0);
  cards.push({ root, pivot, x, y, mats: [back.render.meshInstances[0].material, front.render.meshInstances[0].material] });
}
const PICK = portrait ? 2 : 2; // her card
// hand + seal + halo
const handTex = tex(imgs.hand), sealTex = tex(imgs.seal);
const handH = 1.5, handW = handH * imgs.hand.width / imgs.hand.height;
const handMat = stdMat({ diffuse: new pc.Color(.6, .55, .5), diffuseMap: handTex, emissive: new pc.Color(.45, .42, .4), emissiveMap: handTex, opacityMap: handTex, opacityMapChannel: 'a', alphaTest: .3, blendType: pc.BLEND_NONE, useMetalness: false });
const hand = plane('hand', handW, handH, handMat); hand.render.castShadows = true; 
const sealMat = stdMat({ diffuse: new pc.Color(0, 0, 0), emissive: new pc.Color(1, 1, 1), emissiveMap: sealTex, opacityMap: sealTex, opacityMapChannel: 'a', blendType: pc.BLEND_NORMAL, depthWrite: false, useLighting: false });
const seal = plane('seal', cw * .62, cw * .62 * imgs.seal.height / imgs.seal.width, sealMat); seal.enabled = false;
const haloTex = tex(radial(256, [[0, 'rgb(255,225,150)'], [.3, 'rgb(190,130,60)'], [.65, 'rgb(70,40,15)'], [1, 'rgb(0,0,0)']]));
const haloMat = stdMat({ diffuse: new pc.Color(0, 0, 0), emissive: new pc.Color(.5, .5, .5), emissiveMap: haloTex, opacity: 1, blendType: pc.BLEND_ADDITIVE, depthWrite: false, useLighting: false });
const halo = plane('halo', ch * 2.4, ch * 2.4, haloMat); halo.enabled = false;
// petals: small additive glints drifting (cheap instanced planes)
const sparkTex = tex(radial(64, [[0, 'rgb(255,235,190)'], [1, 'rgb(0,0,0)']]));
const sparkMat = stdMat({ diffuse: new pc.Color(0, 0, 0), emissive: new pc.Color(1, 1, 1), emissiveMap: sparkTex, blendType: pc.BLEND_ADDITIVE, depthWrite: false, useLighting: false });
const sparks = []; for (let i = 0; i < 18; i++) { const s = plane('sp', .05, .05, sparkMat); s.enabled = false; sparks.push({ e: s, a: Math.random() * 6.28, r: .2 + Math.random() * .5, sp: .15 + Math.random() * .25, ph: Math.random() }); }

// ---- light ----
const lamp = new pc.Entity('lamp'); lamp.addComponent('light', { type: 'spot', color: new pc.Color(1, .72, .4), intensity: 2.2, range: 12, innerConeAngle: 38, outerConeAngle: 85, castShadows: true, shadowType: pc.SHADOW_PCF5_32F, shadowResolution: 1024, shadowIntensity: .85, shadowBias: .0015, normalOffsetBias: .0, shadowDistance: 8 });
const lx = fx(FLOOR.lamp[0]) - UW * .05, ly = fy(FLOOR.lamp[1]);
lamp.setPosition(lx, ly, 1.7); lamp.lookAt(0, -0.2, 0); app.root.addChild(lamp);
const fill = new pc.Entity('fill'); fill.addComponent('light', { type: 'omni', color: new pc.Color(.9, .75, .6), intensity: .5, range: 14 }); fill.setPosition(UW * .3, -UH * .3, 2.5); app.root.addChild(fill);
const glow = new pc.Entity('glow'); glow.addComponent('light', { type: 'omni', color: new pc.Color(1, .82, .45), intensity: 0, range: 3 }); app.root.addChild(glow);

// ---- camera ----
const cam = new pc.Entity('cam'); cam.addComponent('camera', { fov: 38, nearClip: .5, farClip: 14, clearColor: new pc.Color(.1, .06, .04), toneMapping: pc.TONEMAP_ACES, gammaCorrection: pc.GAMMA_SRGB });
app.root.addChild(cam);
const tanH = Math.tan(38 * Math.PI / 360), asp = W / H;
const D0 = Math.max(UH / 2 / tanH, (UW / 2) / (tanH * asp)) * 1.02; // cover-fit the plate at start
const tgt = new pc.Vec3();

// ---- timeline (all in seconds, real time) ----
const L = { hand0: 1.6, hand1: 3.6, lift: 3.6, turn0: 4.4, turn1: 7.4, settle: 9.2, seal0: 9.6, seal1: 10.4, glow0: 10.2, end: 14 };
const ease = t => t < 0 ? 0 : t > 1 ? 1 : t * t * (3 - 2 * t), clamp = (t) => Math.max(0, Math.min(1, t)), seg = (t, a, b) => clamp((t - a) / (b - a));
const pc_ = cards[PICK];
const center = new pc.Vec3(0, -.02, 0);
let t0 = performance.now(), flick = 0, ended = false;
function reset() { t0 = performance.now(); ended = false; stats.done = false; stats.fps.length = 0; }
document.getElementById('btn').onclick = reset;

app.on('update', () => {
  const now = window.__T !== undefined ? window.__T * 1000 : performance.now(); const t = window.__T !== undefined ? window.__T : (now - t0) / 1000; stats.frames++;
  // candle flicker: two incommensurate sines + noise, soft
  flick = .5 * Math.sin(now * .0071) + .3 * Math.sin(now * .0173 + 1.3) + .2 * Math.sin(now * .031 + 4);
  lamp.light.intensity = 2.2 + .22 * flick; lamp.setPosition(lx + .012 * flick, ly + .01 * Math.sin(now * .0093), 1.7);
  // camera: slow drift in, parallax orbit
  const push = ease(seg(t, 0, L.end)) * .16 + ease(seg(t, L.turn0, L.settle)) * .22;
  const d = D0 * (1 - push), ox = Math.sin(t * .35) * .26, oy = Math.cos(t * .27) * .10;
  tgt.set(ox * .3, oy * .3 + ease(seg(t, L.turn0, L.settle)) * (pc_.y * .0) , 0);
  cam.setPosition(ox, oy - .05, d); cam.lookAt(tgt.x, tgt.y - .0, 0);
  // hand
  const hIn = ease(seg(t, L.hand0, L.hand0 + 1.4)), hOut = ease(seg(t, L.turn1 - .6, L.settle));
  const hx = pc_.x + cw * .12, hy = pc_.y + handH * .42; // fingertip ~ at card centre
  const hp = Math.max(0, hIn - hOut);
  hand.enabled = hp > .001; hand.setLocalPosition(pc.math.lerp(hx + .35, hx, hIn) + hOut * .4, pc.math.lerp(hy + 1.4, hy, hIn) + hOut * 1.6 - .06 * Math.sin(seg(t, L.lift, L.turn0) * Math.PI), .75);
  // picked card: lift -> turn -> settle at centre ; others dim
  const lift = ease(seg(t, L.lift, L.turn0 + .6)), turn = ease(seg(t, L.turn0, L.turn1)), go = ease(seg(t, L.turn1 - 1.0, L.settle));
  const sc = 1 + (portrait ? .85 : .9) * go;
  const z = .012 + .55 * lift * (1 - .0 * go) + .35 * Math.sin(turn * Math.PI) + .35 * go;
  const px = pc.math.lerp(pc_.x, center.x, go), py = pc.math.lerp(pc_.y, center.y, go);
  pc_.root.setLocalPosition(px, py, z); pc_.root.setLocalScale(sc, sc, sc);
  pc_.pivot.setLocalEulerAngles(8 * Math.sin(turn * Math.PI) * 1.0 - 4 * lift * (1 - go), 180 * turn, 10 * Math.sin(turn * Math.PI));
  for (let i = 0; i < N; i++) if (i !== PICK) { const dim = ease(seg(t, L.turn1 - .5, L.settle)); const k = 1 - .55 * dim; for (const m of cards[i].mats) { m.emissive.set(.42 * k, .4 * k, .38 * k); m.diffuse.set(.62 * k, .6 * k, .58 * k); m.update(); } }
  // halo + light
  const gl = ease(seg(t, L.glow0, L.glow0 + 1.2)) * (.8 + .2 * Math.sin(t * 1.7));
  halo.enabled = gl > .01; haloMat.emissive.set(.2 * gl, .2 * gl, .2 * gl); haloMat.update(); halo.setLocalPosition(px, py, z - .01); { const q = ch * 1.9 * sc * (1 + .05 * Math.sin(t * 1.7)); halo.setLocalScale(q, 1, q); }
  glow.light.intensity = gl * .55; glow.setPosition(px, py, z + .5);
  // seal: drops with a small bounce, then settles
  const s1 = seg(t, L.seal0, L.seal1); seal.enabled = s1 > 0;
  if (s1 > 0) { const sc2 = 1 + (1 - ease(s1)) * 1.6 + .08 * Math.sin(s1 * 9) * (1 - s1); seal.setLocalPosition(px + cw * sc * .2, py - ch * sc * .2, z + .03 + (1 - s1) * .25); seal.setLocalScale(cw * .4 * sc2 * sc, 1, cw * .4 * sc2 * sc * imgs.seal.height / imgs.seal.width); sealMat.opacity = Math.min(1, s1 * 3); sealMat.update(); seal.setLocalEulerAngles(90, 0, -8); }
  // sparks
  const sp0 = seg(t, L.glow0, L.glow0 + .8);
  for (const s of sparks) { s.e.enabled = sp0 > 0; if (sp0 > 0) { const ph = ((t * s.sp + s.ph) % 1); const a = s.a + t * .2; s.e.setLocalPosition(px + Math.cos(a) * s.r * (1 + ph) * sc * .7, py + Math.sin(a) * s.r * (1 + ph) * sc * .9 + ph * .3, z + .1); const k = Math.sin(ph * Math.PI) * sp0 * 3; s.e.setLocalScale(.05 * k + .001, 1, .05 * k + .001); } }
  if (t > L.end && !ended) { ended = true; stats.done = true; }
  hud(t);
});
// fps sampler (real frames)
let last = performance.now(); (function loop() { const n = performance.now(); stats.fps.push(n - last); last = n; requestAnimationFrame(loop); })();
const hudEl = document.getElementById('hud'); let hf = 0;
function hud(t) { if (!document.body.classList.contains('ui') || (hf++ % 15)) return; const a = stats.fps.slice(-60); const ms = a.reduce((x, y) => x + y, 0) / Math.max(1, a.length); hudEl.textContent = `t ${t.toFixed(1)}s  fps ${(1000 / ms).toFixed(0)}  long ${stats.long}`; }
stats.ready = true; stats.draws = () => app.stats.drawCalls ? app.stats.drawCalls.total : 0;
window.__restart = reset; stats.cardPx = [Math.round(cw * 100), Math.round(ch * 100)];
