/* KIT 81 scan (owner OD:L1261, review/scene-end-sweep): no animation scene closes by itself or by a tap anywhere; each ends with ONE kit button.
   usage: node dev/test/scene-end-scan.js   (static, reads dev/build/j*.js; exit 1 on any FAIL)
   1. every scene overlay in the game is in the SCENES table below (a new `kmStage(` / `class="kmov` / `kmPush(` / own overlay in an unlisted place FAILS: add it to the table);
   2. every kmStage call that is not `manual:true` has no `hold:` (old auto-close) and a manual one carries its own button (data-km-close / kitSceneEnd);
   3. each converted scene still has its marker (kitSceneEnd / button-only click) and none of the old auto-close / tap-anywhere-close patterns;
   4. no "Chạm để đóng" text in the game (a tap never closes a scene). */
const fs=require('fs'),path=require('path');const D=path.join(__dirname,'..','build');
const src={};for(const f of fs.readdirSync(D))if(/^j.*\.js$/.test(f))src[f]=fs.readFileSync(path.join(D,f),'utf8');
let bad=0;const fail=(m)=>{bad++;console.log('FAIL',m)},ok=(m)=>console.log('ok  ',m);
const has=(f,re)=>re.test(src[f]||'');
/* [file, scene, must contain (button-only end), must NOT contain (auto-close / tap-anywhere close)] */
const SCENES=[
 ['j93.js','kmStage scenes: tablet / edict / gloom / bloom / ink (non-manual: kitSceneEnd in finish)',/kitSceneEnd\(ov,kitSceneEndLabel/,/hold\s*\?|o\.hold/],
 ['j93.js','kitReward chest / tray (manual; own "Nhận" data-km-close)',/class="kbtn kmtake" data-km-close>Nhận/,null],
 ['jpromo.js','kitPersonReveal (manual; own button data-km-close)',/kbtn kmtake" data-km-close/,null],
 ['jflip.js','kitCardFlip (cardflip-glow: kitSceneEnd)',/kitSceneEnd\(/,/CF\.hold/],
 ['jtoil.js','toilReveal makeup reveal (kitSceneEnd after the face zoom)',/kitSceneEnd\(ov,"Tiếp theo",closeAll\)/,/else closeAll\(\)|Chạm để đóng/],
 ['jfx.js','kitGain item reveal (only .krevok closes)',/closest\(".krevok"\)\)close\(e\);else e\.stopPropagation\(\)/,/ov\.addEventListener\("click",close\)/],
 ['j79.js','dawn week-change summary (only #dawn-go closes)',/w\.onclick=e=>\{if\(e\.target\.closest\("#dawn-go"\)\)close\(\)\}/,/closest\("\.kodm,\.kgl"\)\)return;close\(\)/],
 ['jk2b.js','kitRoulette Luân hồi (picker: button "Nhận thân phận" ends it; "Bỏ qua" is the player skip)',/go\.textContent="Nhận thân phận"/,null],
];
for(const [f,name,must,not] of SCENES){let g=true;if(!src[f]){fail(f+' missing: '+name);continue}
 if(must&&!must.test(src[f])){g=false;fail(`${f} · ${name}: marker not found ${must}`)}
 if(not&&not.test(src[f])){g=false;fail(`${f} · ${name}: old auto-close / tap-anywhere close still there ${not}`)}
 if(g)ok(`${f} · ${name}`)}
/* EXEMPT = non-blocking effects, notes and in-event animations (not scenes; reason in dev/handover/reports/scene-end-sweep.md) */
const EXEMPT=[['j93.js','kitFlipNote (kmnote chip, no backdrop, no tap)'],['j93.js','kitAlarm flash'],['jbuoi.js','buổi transition veil (pointer-events:none, never blocks)'],['j25.js','rtoast result toast (not an overlay)'],['jitev.js','kitItemFx item flight inside the event panel (ends in the event\'s own buttons)'],
 ['jkrev.js','kitLose item fall inside the event card'],['jfx.js','kfx flashes / screen shake'],['j11.js','fxOver / stamp / coinPop'],['jstatfx.js','stat floating numbers'],['jnight.js','night end (main\'s own worker)']];
/* 1. every kmStage( / kmov overlay builder sits in a listed file */
const listed=new Set(SCENES.map(s=>s[0]).concat(EXEMPT.map(s=>s[0])));
for(const f in src){const m=src[f].match(/kmStage\(|className="kmov |class="kmov |kmPush\(/);if(m&&!listed.has(f)&&f!=='jk2b.js')fail(`${f}: builds a scene (${m[0]}) but is not in the SCENES table`)}
/* 2. kmStage calls */
for(const f in src){const re=/kmStage\(([^;]*?)\)(?:;|\}|\))/g;let m;while((m=re.exec(src[f]))){const a=m[1];if(/\bhold\s*:/.test(a)&&!/manual\s*:\s*true/.test(a)&&f!=='j93.js')fail(`${f}: kmStage with hold (auto-close)`)}}
/* j93 kmStage options: `hold` is accepted by old callers but must not be read */
if(/o\.hold\b/.test(src['j93.js'].replace(/\/\*[\s\S]*?\*\//g,'')))fail('j93.js kmStage reads o.hold (auto-close)');else ok('j93.js kmStage ignores hold');
/* 4. text */
for(const f in src){if(f==='j84.js')continue;if(/Chạm để đóng/.test(src[f].split('\n').filter(l=>!/rtoast/.test(l)).join('\n')))fail(`${f}: "Chạm để đóng" (a tap closes a scene)`)}
if(!bad)ok('no "Chạm để đóng" outside the j84 wording table and the rtoast toast (not a scene)');
console.log(bad?`\n${bad} FAIL`:'\nALL PASS');process.exit(bad?1:0);
