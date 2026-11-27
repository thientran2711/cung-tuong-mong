/* ACT-MOVE robot, BATCH 2 (worker ACT-MOVE-4, MAIN CHÍNH 170; owner OD 27/11 ~00:32Z (4) whole family, ~00:42Z, ~01:14Z NPC parity).
   Cung nhân / Hoàng tự / lãnh cung cards are info only; every act the OLD card offered is still reachable on that person's STAGE pop-up.
   Asserts, over scenarios cao / con / hh (hh: one consort sent to lãnh cung, she is Quyền Hoàng hậu rank) × buổi 0–2:
     A. every Cung nhân card (maid, own servants, court, Thái hậu's people, other palaces' servants), Hoàng tự card and lãnh cung card
        carries 0 act buttons (only «Tìm gặp» / «Ghé cung»: data-go / visit / amoff)
     D. BASELINE = the old card buttons (AMV.card=0, same builders) per person; wherever that person stands on stage (any place, any buổi of the
        run), her / his pop-up offers each old label (talk option, door member or the bridged twin) — none lost
     G. a bridged option fires the SAME handler: one sample per data-* family is clicked through amFire and must not throw
   usage: node dev/test/act-move-reach2.js [index.html]   (run python3 dev/build/assemble.py first) → exit 1 on any failure */
const fs=require('fs'),path=require('path');const ROOT=path.resolve(__dirname,'../..');const {chromium}=require('playwright');
const src=fs.readFileSync(path.join(ROOT,'dev/test/act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const URL='file://'+path.resolve(process.argv[2]||path.join(ROOT,'dev/index.html'));
const RUN=String.raw`(sc=>{window.__bot=1;const R={fail:[],n:{card:0,old:0,ok:0,unseen:0},unseen:{},fam:{}};const F=t=>{if(R.fail.length<80)R.fail.push(t)};
 const T=h=>String(h||"").replace(/<[^>]+>/g,"").replace(/\s+/g," ").trim();
 AA.scen(sc);if(sc==="hh"){const v=rivals.find(x=>x.alive&&!x.queen&&!sameHouse(S,x));if(v)v.out=1;S.rank=Math.max(S.rank,7)}
 const OKB=/^data-(go|see|scout|visit|amoff|pg|pi|pct|pgo|pager)$/;
 /* every card of the three tabs, with its buttons (pcard recorder, like act-move-inv2) */
 const cards=()=>{const L=[];const P0=pcard;pcard=function(o){const h=P0.apply(this,arguments);try{L.push({tab,name:T(o.name),rank:T(o.rank),h})}catch(e){}return h};
  try{for(const t of ["staff","kid","rv"]){tab=t;for(let i=0;i<60;i++){for(const k in PG)PG[k]=i;try{render()}catch(e){F("render "+t+" "+e.message)}}}}finally{pcard=P0}return L};
 const btns=h=>{const d=document.createElement("div");d.innerHTML=h;return [...d.querySelectorAll("button")].filter(b=>!b.classList.contains("pct")).map(b=>({n:b.dataset.runner?"Đổi người chạy việc":T(b.childNodes[0]&&b.childNodes[0].nodeType===3?b.childNodes[0].textContent:b.textContent),at:[...b.attributes].filter(a=>/^data-/.test(a.name)).map(a=>a.name)})).filter(b=>b.at.length)};
 const isAct=b=>!b.at.some(a=>OKB.test(a));
 const pick=L=>L.filter(c=>c.tab!=="rv"||/lãnh cung/i.test(c.h)&&!/Đã chết/.test(c.h));
 /* A: the cards now */
 AMV.card=1;const NOW=pick(cards());for(const c of NOW){R.n.card++;const a=btns(c.h).filter(isAct);if(a.length)F(sc+" card "+c.tab+" "+c.name+": "+a.map(b=>b.n+"["+b.at.join(",")+"]").join(", "))}
 /* the baseline: the old cards (same builders, ACT-MOVE card change off) */
 AMV.card=0;const OLD=pick(cards());AMV.card=1;const want=new Map();for(const c of OLD){const a=btns(c.h).filter(isAct).filter(b=>!b.at.includes("data-k61"));if(!a.length)continue;const k=c.name;if(!want.has(k))want.set(k,new Map());for(const b of a)want.get(k).set(b.n,b.at.join(","))}
 /* D: walk every place × buổi; a person on stage = her pop-up offers each old label */
 const go=k=>{Q.splice(0);used=0;S.confined=0;popIdx=null;window.__j77etq=1;window.__accStay=1;window.__walkFree=1;try{goTo(k)}finally{window.__j77etq=0;window.__accStay=0;window.__walkFree=0}return S.place===k};
 const nameOf=p=>{if(p.kind==="kid")return T(typeof sname==="function"&&p.ref?sname(p.ref):p.name);if(p.kind==="fallen"&&p.ref)return T(p.ref.name);try{return T(amPName(p))}catch(e){return T(p.name)}};
 const offered=p=>{const s=new Set();const add=a=>{if(!a)return;s.add(T(a.n));if(Array.isArray(a.m))a.m.forEach(m=>m&&s.add(T(m.n)))};try{talkOpts(p).forEach(add)}catch(e){F("talkOpts "+p.kind+" "+e.message)}try{doorRaw(p).forEach(add)}catch(e){}
  try{if(typeof DOOR==="object")for(const r of DOOR.T)for(const b of (DOOR.more(p,r)||[]))s.add(T(b.n))}catch(e){}return s};
 const seen=new Set();const ks=["home"].concat(places().map(x=>x.k));
 for(const bu of [0,1,2]){S.buoi=bu;for(const k of ks){if(!go(k))continue;for(const p of curPeople()){const nm=nameOf(p);const W=want.get(nm);if(!W||seen.has(nm))continue;
  if(p.kind==="kid"&&!(S.kids||[]).includes(p.ref))continue;seen.add(nm);const O=offered(p);
  for(const [n,at] of W){R.n.old++;if(O.has(n))R.n.ok++;else F(sc+" pop-up miss «"+n+"» ["+at+"] on "+p.kind+" "+nm+" @"+k)}
  /* G: fire one bridged twin per data family (the handler runs; a dialog it opens is closed) */
  for(const a of talkOpts(p))if(a&&a.amb&&!a.lock){const fam=(W.get(T(a.n))||"").split(",")[0];if(!fam||R.fam[fam])continue;R.fam[fam]=nm;
   const st=JSON.stringify([S.bac,used]);try{popIdx=curPeople().indexOf(p);a.open()}catch(e){F(sc+" fire «"+a.n+"» ("+fam+"): "+e.message)}finally{try{Q.splice(0);hideModal&&hideModal()}catch(e){}}}}}}
 for(const [nm,W] of want)if(!seen.has(nm)){R.n.unseen++;R.unseen[nm]=[...W.keys()].join("/")}
 return R})`;
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);await p.evaluate(LIB);
 let fail=[];const tot={card:0,old:0,ok:0,unseen:0};const fam={};
 for(const sc of ['cao','con','hh']){const R=await p.evaluate(RUN+'('+JSON.stringify(sc)+')');for(const k in tot)tot[k]+=R.n[k];Object.assign(fam,R.fam);fail=fail.concat(R.fail);
  console.log(`${sc}: A cards ${R.n.card} · D old labels offered ${R.n.ok}/${R.n.old} · persons never on stage this run ${R.n.unseen}`);for(const nm in R.unseen)console.log(`   unseen ${nm}: ${R.unseen[nm]}`)}
 await b.close();console.log(`ACT-MOVE REACH 2 · A ${tot.card} cards · D ${tot.ok}/${tot.old} · G fired families ${Object.keys(fam).join(' ')}`);console.log('page errors',perr.length,perr.slice(0,3).join(' | '));
 if(fail.length||perr.length){console.log('FAIL',fail.length);fail.forEach(f=>console.log('  - '+f));process.exit(1)}console.log('PASS')})();
