/* ===== dev/test/lib/kopts.js — ONE choice reader for every test (K-OPTS-READER, KK68; law 11 family, law 13 reuse)
   WHY: the game shows a frame's choices in several kit hosts, not only «#mb .opts»:
     - #mb .opts > button (.opt / .ka.kopt act cards; jopic / j63) — the classic list, also the HIDDEN source cards of a hand (kitHand §101,
       .opts.khand) and of a stage dialogue (§102.2: «the hand cards stay in the DOM (hidden) as the data + choose path»);
     - kitPick plaques button.kfoc-b.kpk-b (THẺ GỖ TREO §98, jkpick) — kit-stage-r17 card acts (place / greeting cards) hang ONLY as plaques
       inside #modal (no .opts at all), person cards (#popw, jkpcard §98.20) hang plaques beside hidden .pcb rows.
   A test that reads only «#mb .opts button» / «.opts button» finds 0 choices on a plaque frame and passes VACUOUSLY (lesson: LR-RULES tsg-kpk 09e10cd3).
   This file is the ONE reader; tests never write their own choice selector again.

   USE (Node side):
     const KO=require('./lib/kopts');
     await KO.install(page);            // or a BrowserContext; BEFORE page.goto (init script + report binding); every frame gets it
     ... in page code: __kopts()          → [button…] choices of the open #modal (the old #mb .opts buttons, unchanged, + plaques with no card behind)
                       __kopts('any')     → same, whole document (old «.opts button» reads)
                       __kopts(el)        → same, inside el (e.g. document.getElementById('popw'))
                       __koptName(b)      → the choice's short name (plaque: its name line; card: .kan or text without its info lines)
                       __koptText(b)      → innerText squashed of what she SEES (a hidden card shown as a plaque → the plaque's text)
                       __koptSeen(b)      → on show? (the card, or the plaque that shows it) — use instead of b.offsetParent
                       __koptFace(b)      → the element on show for b (plaque or b)
                       __koptOff(b)       → locked? (b.disabled OR a locked plaque .kfoc-off — a plaque is never [disabled])
                       __koptsOn(sc,sel)  → __kopts(sc) that are not locked and match the optional CSS filter sel (e.g. ':not([data-kcp])')
                       __koptGo(b)        → choose it (plaque = 2 robot taps: lift + «Chọn»; card / button = b.click())
     await KO.tap(page,handle[,opts]) — REAL tap(s) on a choice handle: a plaque gets lift + «Chọn», anything else one tap
     __kopts(sc, also)  — also = the read's extra old hosts (e.g. '.opt' or '#popw button.ka'), kept in the list and mirrored like the cards
     KO.SEL / KO.ANY  — the same hosts as a plain CSS selector (for page.$$ / locator); NOT de-duplicated: prefer __kopts() in page code.
     KO.stat()        — {reads, blind, plaques}: reads = calls of __kopts, blind = calls where the OLD selector found 0 but the reader found ≥1
                         (= this read was vacuous before K-OPTS-READER). On exit a test that used the reader prints one line
                         «KOPTS reads N · blind-before M · plaques P» (the before/after evidence; KOPTS=0 silences it).
   No regex lookbehind (webkit hook 30). Test-only: no game code. */
'use strict';
const SEL='#mb .opts button, #modal button.kpk-b';
const ANY='.opts button, button.kpk-b';
/* page side, as a function so it can be injected by addInitScript and by evaluate (KO.src) */
function pageSide(){
  if(window.__kopts)return;
  const sq=s=>String(s||'').replace(/\s+/g,' ').trim();
  const seen=b=>{if(!b||!b.isConnected||!b.getClientRects().length||b.closest('[aria-hidden="true"]'))return false;const cs=getComputedStyle(b);return cs.visibility!=='hidden'&&cs.display!=='none'};
  const name=b=>{if(!b)return '';
    if(b.classList&&b.classList.contains('kpk-b')){const t=b.querySelector('.kfoc-t b');return sq(t?t.textContent:b.textContent)}
    const k=b.querySelector('.kan');if(k)return sq(k.textContent);
    const c=b.cloneNode(true);c.querySelectorAll('small,.kaart,.kpabox,.kainfo,.kwhy').forEach(x=>x.remove());return sq(c.textContent)};
  /* source card → the plaque that shows it (JS-side map only: nothing is written on the game's DOM) */
  const mir=new WeakMap();
  const face=b=>{const p=b&&mir.get(b);return p&&p.isConnected&&!seen(b)?p:b};
  const st={reads:0,blind:0,plaques:0};
  window.__koptStat=st;window.__koptName=b=>name(face(b));
  window.__koptText=b=>sq(b&&face(b).innerText);/* innerText of what she SEES (a hidden source card shown as a plaque reads the plaque) */
  window.__koptSeen=b=>seen(face(b));
  window.__koptFace=face;
  window.__kopts=function(sc,also){
    if(sc===null)return [];/* an explicit null scope (document.querySelector('#modal:not([hidden])') when the dialog is shut) = no choices, as the old read */
    const any=sc==='any'||sc===true,el=sc&&sc.nodeType===1?sc:null,root=el||document;
    const old=[...root.querySelectorAll((any||el?'.opts button':'#mb .opts button')+(also?', '+also:''))];/* also = extra OLD hosts the read had (e.g. '.opt', '#popw button.ka'): kept in DOM order, mirrored like the cards */
    const pl=[...root.querySelectorAll(any||el?'button.kpk-b':'#modal button.kpk-b')];
    /* one entry per choice. The old cards stay in the list exactly as before (same nodes: data-m / data-kcp / click = the choose path);
       a HIDDEN card that a plaque shows (stage dialogue §102.2, person card §98.20) is linked to it (__koptText / __koptSeen read the plaque);
       a plaque with NO card behind it is added (kit-stage-r17 card acts: the plaque is the only face and path) */
    const pm=new Map();pl.forEach(b=>{const n=name(b);if(!pm.has(n))pm.set(n,b)});
    const used=new Set();
    old.forEach(b=>{const p=pm.get(name(b));if(p&&!used.has(p)){used.add(p);mir.set(b,p)}});
    const add=pl.filter(b=>!used.has(b));
    /* blind-before = the old selector gave NO visible choice (nothing, or only hidden source cards reading "") but plaques were on show */
    const vis=old.filter(seen).length,np=used.size+add.length;
    st.reads++;if(np)st.plaques++;if(!vis&&np)st.blind++;
    /* stats to Node by console.debug, NOT a Playwright binding: a binding call draws on Math.random and shifts the seeded stream of a test (time-spill-guard flaked 2/2 that way) */
    try{console.debug('__KOPT '+vis+' '+np)}catch(e){}
    return old.concat(add)};
  /* a locked plaque is NOT [disabled] (kitFocus .kfoc-off: a tap shows its reason); read «can she take it» with __koptOff, never b.disabled alone */
  const off=b=>!!b&&(b.disabled||b.classList.contains('kfoc-off')||b.classList.contains('kitoff'));
  window.__koptOff=off;
  window.__koptsOn=function(sc,sel){return window.__kopts(sc).filter(b=>!off(b)&&(!sel||b.matches(sel)))};
  window.__koptGo=function(b){if(!b)return false;
    if(b.classList.contains('kpk-b')){b.click();/* 1st tap lifts (the lift may re-lay the plaque node) */
      const box=b.closest('.kpk');const up=b.isConnected&&b.closest('.kpk-n.kpk-up')?b:(box&&box.querySelector('.kpk-n.kpk-up button.kpk-b'))||b;
      const g=box&&box.querySelector('.kpk-n.kpk-up .kpk-gob');(g&&!g.disabled?g:up).click();return true}
    b.click();return true};
}
const src='('+pageSide.toString()+')();';
const S={reads:0,blind:0,plaques:0};let hooked=false;
/* REAL taps (Node side): tap(page, handle[, clickOpts]) — a plaque takes two real taps (1st lifts, the «Chọn» chip or the lifted plaque chooses), anything else one */
async function tap(p,h,o){const pl=await h.evaluate(b=>b.classList.contains('kpk-b')).catch(()=>false);await h.click(o);if(!pl)return;
  const g=await p.$('.kpk-n.kpk-up .kpk-gob:not([disabled])')||await p.$('.kpk-n.kpk-up button.kpk-b');if(g)await g.click(o)}
const done=new WeakSet();
async function install(t){
  if(!t||done.has(t))return t;done.add(t);
  const hear=p=>p.on('console',m=>{if(m.type()!=='debug')return;const x=/^__KOPT (\d+) (\d+)$/.exec(m.text());if(!x)return;const o=+x[1],a=+x[2];S.reads++;if(a)S.plaques++;if(!o&&a)S.blind++});
  if(typeof t.pages==='function'){t.pages().forEach(hear);t.on('page',hear)}else hear(t);
  await t.addInitScript(src);
  /* pages already open (install on a context after newPage, or a page already navigated): inject now too */
  const pages=typeof t.pages==='function'?t.pages():[t];
  for(const p of pages){for(const f of (typeof p.frames==='function'?p.frames():[])){try{await f.evaluate(src)}catch(e){}}}
  if(!hooked){hooked=true;process.on('exit',()=>{if(process.env.KOPTS!=='0'&&S.reads)console.log(`KOPTS reads ${S.reads} · blind-before ${S.blind} · plaques ${S.plaques}`)})}
  return t}
module.exports={install,tap,src,SEL,ANY,stat:()=>Object.assign({},S)};
