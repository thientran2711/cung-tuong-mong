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
     ... in page code: __kopts()          → [button…] choices of the open #modal (legacy #mb .opts buttons + plaques not mirrored by one)
                       __kopts('any')     → same, whole document (old «.opts button» reads)
                       __kopts(el)        → same, inside el (e.g. document.getElementById('popw'))
                       __koptName(b)      → the choice's short name (plaque: its name line; card: .kan or text without its info lines)
                       __koptText(b)      → b.innerText squashed (the full face text, as the old reads used)
                       __koptGo(b)        → choose it (plaque = 2 robot taps: lift + «Chọn»; card / button = b.click())
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
  const txt=b=>sq(b&&b.innerText);/* innerText as the old reads (a hidden card reads "") */
  const name=b=>{if(!b)return '';
    if(b.classList&&b.classList.contains('kpk-b')){const t=b.querySelector('.kfoc-t b');return sq(t?t.textContent:b.textContent)}
    const k=b.querySelector('.kan');if(k)return sq(k.textContent);
    const c=b.cloneNode(true);c.querySelectorAll('small,.kaart,.kpabox,.kainfo,.kwhy').forEach(x=>x.remove());return sq(c.textContent)};
  const st={reads:0,blind:0,plaques:0};
  window.__koptStat=st;window.__koptName=name;window.__koptText=txt;
  window.__kopts=function(sc){
    const any=sc==='any'||sc===true,el=sc&&sc.nodeType===1?sc:null,root=el||document;
    const old=[...root.querySelectorAll(any||el?'.opts button':'#mb .opts button')];
    const pl=[...root.querySelectorAll(any||el?'button.kpk-b':'#modal button.kpk-b')];
    /* one entry per choice: a plaque mirrors a HIDDEN source card (stage dialogue, person card) → the plaque stands for it (the face she sees and
       taps; __koptGo chooses through it); a visible source card keeps its place; a plaque with no source card is added (kit-stage-r17 card acts) */
    const seen=b=>{if(!b.getClientRects().length||b.closest('[aria-hidden="true"]'))return false;const cs=getComputedStyle(b);return cs.visibility!=='hidden'&&cs.display!=='none'};
    const pm=new Map();pl.forEach(b=>{const n=name(b);if(!pm.has(n))pm.set(n,b)});
    const used=new Set();
    const out=old.map(b=>{const n=name(b),p=pm.get(n);if(p&&!used.has(p)){used.add(p);return seen(b)?b:p}return b});
    const add=pl.filter(b=>!used.has(b));
    /* blind-before = the old selector gave NO visible choice (nothing, or only hidden source cards reading "") but plaques were on show */
    const vis=old.filter(seen).length,np=used.size+add.length;
    st.reads++;if(np)st.plaques++;if(!vis&&np)st.blind++;
    /* stats to Node by console.debug, NOT a Playwright binding: a binding call draws on Math.random and shifts the seeded stream of a test (time-spill-guard flaked 2/2 that way) */
    try{console.debug('__KOPT '+vis+' '+np)}catch(e){}
    return out.concat(add)};
  window.__koptGo=function(b){if(!b)return false;
    if(b.classList.contains('kpk-b')){b.click();/* 1st tap lifts (the lift may re-lay the plaque node) */
      const box=b.closest('.kpk');const up=b.isConnected&&b.closest('.kpk-n.kpk-up')?b:(box&&box.querySelector('.kpk-n.kpk-up button.kpk-b'))||b;
      const g=box&&box.querySelector('.kpk-n.kpk-up .kpk-gob');(g&&!g.disabled?g:up).click();return true}
    b.click();return true};
}
const src='('+pageSide.toString()+')();';
const S={reads:0,blind:0,plaques:0};let hooked=false;
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
module.exports={install,src,SEL,ANY,stat:()=>Object.assign({},S)};
