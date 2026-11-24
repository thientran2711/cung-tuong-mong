/* dev/test/lib/veil.js — ONE shared helper for the «Luân hồi / Tranh luân hồi đang trải các thân phận…» picture-wait veil (#kroulw, jk2b.js kitRoulette wrapper).
   Why: after start() (new life) the origin-card roulette fetches its pictures first; when they are not cached (tests 404 assets.json / block the SW) a full-screen kit wait
   (#kroulw, up to 8 s) covers the scene, so a tap right after start() never reaches the scene. The veil is cosmetic; tests must not depend on it.
   API:  await V.guard(pageOrContext)   addInitScript: removes #kroulw the moment it is inserted (call BEFORE page.goto; every later navigation too)
         await V.waitOut(page,{max})    after start(): lets the 150 ms veil timer pass, then removes any #kroulw and waits until neither the veil nor the real roulette #kroul exists (max 9 s)
   usage: const V=require('./lib/veil'); await V.guard(p); ... await p.evaluate(()=>start()); await V.waitOut(p); await p.mouse.click(x,y) */
const INIT=()=>{const arm0=()=>{try{const st=document.createElement('style');st.textContent='#kroulw{display:none!important;pointer-events:none!important}';(document.head||document.documentElement).appendChild(st)}catch(e){}};
 const kill=()=>{const w=document.getElementById('kroulw');if(w)w.remove()};
 const arm=()=>{arm0();try{new MutationObserver(kill).observe(document.documentElement,{childList:true,subtree:true})}catch(e){}kill()};
 if(document.documentElement)arm();else document.addEventListener('DOMContentLoaded',arm)};
async function guard(t){await t.addInitScript(INIT)}
async function waitOut(p,o){const max=(o&&o.max)||9000;await p.waitForTimeout(250);
 await p.evaluate(()=>{const w=document.getElementById('kroulw');if(w)w.remove()}).catch(()=>{});
 /* the veil is followed by the REAL origin roulette (#kroul, skipped by the test's .krskip clicker): wait for both to be gone */
 await p.waitForFunction(()=>!document.getElementById('kroulw')&&!document.getElementById('kroul'),null,{timeout:max}).catch(()=>{});await p.waitForTimeout(150)}
module.exports={guard,waitOut,INIT};
