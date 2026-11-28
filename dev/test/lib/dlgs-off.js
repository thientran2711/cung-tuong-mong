/* dev/test/lib/dlgs-off.js — THE one test switch for the SIDE-LINE DIALOGUE SCENES (dev/build/jdlgs.js, KIT §93 kitScene / §95 kitDialogue).
   Why (review/sideline-dlg F3, law 11): jdlgs wraps showModal; a side-line card (j72 offer q72o, j68 «e68c:*» / «e68<id>», j7 ev ids / «j7c»,
   kỳ ngộ «kyngo:*», j70 stage seen, j71c / jworldc cards with m.dlg) HIDES #modal and plays a visual-novel scene first (DLGS.playing,
   body.kdlgs-on); the card shows only after the player taps every line, and while DLGS.playing every later showModal keeps #modal hidden.
   A test that opens such a card and reads / shoots #modal, or a bot that drives turns without tapping the scene, breaks
   (thin-p4-shots «open:false n:0», j72c-shots shot the scene, a bot's JS «Sang buổi» under a scene left every later card hidden).
   Two guards — pick by what the test is (dev/test/dlgs-guard-scan.js lists every test and which one it uses):
     OFF  card / shot / scan / UI tests: the scenes are turned off (BAL.dlgs.on=false, the one switch) — they check the CARD.
          The scenes themselves are checked tap by tap on both devices by dev/test/dlgs-play.js.
     TAP  play bots (turns, perf, roulette, co-op seats): the scene still plays and is tapped through like a player
          (one tap finishes the typing line, the next moves on; while its figures load — DLGS.playing, no DLGS.cur yet — wait).
   API (node side):
     pw(mode[, base])         drop-in for require('playwright') (or a wrapper of it, e.g. require('./pw-roulette')): every browser / context /
                              page it makes gets mode 'off' (OFF_INIT) or 'tap' (AUTOTAP) as an init script — every frame, every navigation.
     off(target)              ctx / page / frame: add OFF_INIT (when it can) and run OFF now (page / frame, and every open page of a ctx).
     autoTap(target)          ctx / page: add AUTOTAP.
     tap(frame)               ONE player tap on a playing scene → 'x' (tapped or waiting for it), '' (no scene).  (lib/coop-clear step 0)
     through(frame[, ms])     tap until no scene plays (or ms, default 30 s) → number of taps.
   In-page functions (for evaluate / addInitScript / composing into a bot's own in-page step): OFF, OFF_INIT, TAP, AUTOTAP.
   Count of taps: window.__dlgsTapN. */
const OFF=()=>{try{if(typeof BAL!=='undefined'&&BAL&&BAL.dlgs){BAL.dlgs.on=false;window.__dlgsOff=1;return true}}catch(e){}return false};
/* BAL is built by the game script after the init script runs: set it the moment it exists (poll + DOMContentLoaded + load);
   a frame without the game (the rot.js host page) stops polling after 10 min */
const OFF_INIT=()=>{const f=()=>{try{if(typeof BAL!=='undefined'&&BAL&&BAL.dlgs){BAL.dlgs.on=false;window.__dlgsOff=1;return true}}catch(e){}return false};
 if(f())return;const t0=Date.now();const iv=setInterval(()=>{if(f()||Date.now()-t0>600000)clearInterval(iv)},20);
 try{document.addEventListener('DOMContentLoaded',f);window.addEventListener('load',f)}catch(e){}};
const TAP=()=>{const D=typeof DLGS!=='undefined'?DLGS:window.DLGS;if(!D||!D.playing)return'';window.__dlgsTapN=(window.__dlgsTapN||0)+1;try{if(D.cur)D.cur.skip()}catch(e){}return'x'};
const AUTOTAP=()=>{setInterval(()=>{try{const D=typeof DLGS!=='undefined'?DLGS:window.DLGS;if(D&&D.playing&&D.cur){window.__dlgsTapN=(window.__dlgsTapN||0)+1;D.cur.skip()}}catch(e){}},250)};
const can=(t,k)=>t&&typeof t[k]==='function';
async function off(t){if(can(t,'addInitScript'))await t.addInitScript(OFF_INIT);
 if(can(t,'pages')){for(const p of t.pages())for(const f of p.frames())await f.evaluate(OFF).catch(()=>{})}
 else if(can(t,'frames')){for(const f of t.frames())await f.evaluate(OFF).catch(()=>{})}
 else if(can(t,'evaluate'))await t.evaluate(OFF).catch(()=>{})}
async function autoTap(t){if(can(t,'addInitScript'))await t.addInitScript(AUTOTAP)}
async function tap(f){try{return await f.evaluate(TAP)}catch(e){return''}}
async function through(f,ms){const t0=Date.now();let n=0;while(Date.now()-t0<(ms||30000)){if(await tap(f)!=='x')break;n++;await new Promise(r=>setTimeout(r,250))}return n}
/* the playwright drop-in: patch launch / launchPersistentContext of chromium (firefox / webkit too) of `base` (default the real playwright) */
function pw(mode,base){const B=base||require('playwright');const add=mode==='tap'?autoTap:off;
 const wrapB=b=>{const nc=b.newContext.bind(b),np=b.newPage.bind(b);
  b.newContext=async function(){const c=await nc.apply(null,arguments);await add(c);return c};
  b.newPage=async function(){const p=await np.apply(null,arguments);await add(p);return p};return b};
 const wrapT=T=>{if(!T)return T;const o=Object.create(T);
  o.launch=async function(){return wrapB(await T.launch.apply(T,arguments))};
  if(can(T,'launchPersistentContext'))o.launchPersistentContext=async function(){const c=await T.launchPersistentContext.apply(T,arguments);await add(c);return c};
  return o};
 return Object.assign({},B,{chromium:wrapT(B.chromium),firefox:wrapT(B.firefox),webkit:wrapT(B.webkit),__dlgs:mode})}
module.exports={OFF,OFF_INIT,TAP,AUTOTAP,off,autoTap,tap,through,pw};
