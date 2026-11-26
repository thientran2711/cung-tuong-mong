/* ACT-MERGE J3 deck scan (owner 26/11 ~07:25Z/~07:32Z; plan review/act-merge §4 J3 = HANHSU_MERGE §3.2 H1–H16).
   Same forced states as the dup-report scan v3 (dev/test/dup-report-scan.js on review/dup-report): base · art lv max · ill · con · pregnant hidden ·
   tâm cơ ≥50 — plus lãnh cung (must be UNCHANGED: J5 owns it). For every state: the Hành sự buttons RENDERED (door cards resolved to their ways),
   so the table shows BEFORE (every way as its own card) → AFTER (one button per feature).
   usage: node dev/test/act-merge-j3-deck.js [url] [--json out.json]   (exit 1 if a page error, a way lost, or a door shown in lãnh cung) */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const src=fs.readFileSync(path.join(__dirname,'act-audit.js'),'utf8');const LIB=src.match(/const LIB=String\.raw`([\s\S]*?)`;\n\(async/)[1];
const A=process.argv.slice(2);const URL=A.find(x=>!x.startsWith('--')&&!x.endsWith('.json'))||'file://'+path.resolve(__dirname,'../../index.html');const JO=A.includes('--json')?A[A.indexOf('--json')+1]:null;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820},reducedMotion:'reduce',serviceWorkers:'block'});const p=await ctx.newPage();
 const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'load',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(2500);await p.evaluate(LIB);
 const R=await p.evaluate(()=>{const out={};const nm=b=>{const k=b.querySelector('.kan');return (k?k.textContent:b.textContent).replace(/\s+/g," ").trim()};
  const shown=()=>{render();const sf=AA.surfaces().find(s=>s.id==="act");AA.show(sf);const L=[];
   for(const b of document.querySelectorAll('#panel .cards > button')){if(b.dataset.ddoor){L.push({n:b.dataset.ddoor,door:b.dataset.ddoor,ways:b.dataset.ddi.split(",").map(i=>deck[+i].n)})}else if(b.dataset.i!=null)L.push({n:nm(b)})}
   const dealt=deck.filter(a=>a&&!(typeof AD_OUT!=="undefined"&&AD_OUT.test(a.n||""))).map(a=>a.n);return {L,dealt}};
  const run=(k,fn)=>{try{AA.scen(/^con/.test(k)?"con":"cao");fn();deal();out[k]=shown()}catch(e){out[k]={err:e.message}}};
  run("base",()=>{});
  run("art lv max",()=>{for(const a of ["cam","vu","ky","hoa","y"])S.arts[a]=20});
  run("ill",()=>{S.ill={k:Object.keys(ILL)[0],st:2,at:wk()};S.arts.y=5});
  run("con: kid ≥3, sick, Y thuật",()=>{S.arts.y=20;for(const k of S.kids){k.age=Math.max(k.age,4);k.hp=10}});
  run("pregnant, hidden",()=>{S.preg=2;S.hidden=true;S.fake=0});
  run("tâm cơ ≥50, not pregnant",()=>{S.preg=0;S.tamco=80});
  run("evening (buổi tối)",()=>{S.buoi=3});
  try{AA.scen('cao');S.out=1;deal();out["lãnh cung (J5, unchanged)"]=shown()}catch(e){out["lãnh cung"]={err:e.message}}
  return out});
 let bad=0;const P=(...a)=>console.log(...a);const allB=new Set(),allA=new Set();
 P("| state | before (cards) | after (buttons) | doors (ways inside) | ĐỂ RIÊNG / single |");P("|---|---|---|---|---|");
 for(const k in R){const r=R[k];if(r.err){P("|",k,"| ERR",r.err,"|");bad++;continue}
  const ways=r.L.flatMap(x=>x.ways||[x.n]);const before=ways.length;const after=r.L.length;
  /* every dealt card is reachable: as its own card or as a way inside a door */
  const vis=new Set(ways);const lost=[...new Set(r.dealt)].filter(n=>!vis.has(n)&&!/^Phát bạc/.test(n));
  if(lost.length&&!/lãnh/.test(k)){P(" LOST in",k,":",lost.join(" · "));}
  if(/lãnh/.test(k)&&r.L.some(x=>x.door)){P(" DOOR IN LÃNH CUNG");bad++}
  ways.forEach(n=>allB.add(n));r.L.forEach(x=>allA.add(x.door?x.n:x.n));
  P("|",k,"|",before,"|",after,"|",r.L.filter(x=>x.door).map(x=>`**${x.n}** (${x.ways.join(" · ")})`).join("; ")||"—","|",r.L.filter(x=>!x.door).map(x=>x.n).join(" · "),"|")}
 const cons=k=>!/lãnh/.test(k);const B=new Set(),Af=new Set();for(const k in R){if(!cons(k)||R[k].err)continue;R[k].L.forEach(x=>{(x.ways||[x.n]).forEach(n=>B.add(n.replace(/^Để ý một .+$/,"Để ý một nam nhân").replace(/^Xin ban hôn cho .+$/,"Xin ban hôn cho Vương gia")));Af.add(x.n.replace(/^Để ý một .+$/,"Để ý một nam nhân"))})}
 P("\nconsort Hành sự, distinct over these states: BEFORE",B.size,"→ AFTER",Af.size);P(" after:",[...Af].join(" · "));
 P("page errors:",perr.length,perr.slice(0,3).join(" | "));if(perr.length)bad++;
 if(JO)fs.writeFileSync(JO,JSON.stringify({R,perr},null,1));await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
