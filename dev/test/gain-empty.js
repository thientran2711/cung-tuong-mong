/* GAIN-EMPTY (law 3, E-GAIN3 27/11): no act card shows an empty «Được» row («Được: không» or no Được at all).
   Reuses the act-audit state + surfaces (dev/test/act-audit.js LIB): every scenario, every surface (Hành sự, person cards, Cung nhân, Hoàng tự,
   Tư trang, Tài nghệ, Mệnh truyện, Quan hệ, Phe, places and the people met there), every enabled card AND every option of the dialog it opens.
   No rolls are made (a dialog is opened, read, closed). Fast: one pass ≈ a few minutes.
   usage: node dev/test/gain-empty.js <url> [out.json] [WxH@dpr] [scenarios]  → exit 1 when any card has an empty Được.
   Mutant check: MUTANT=1 node dev/test/gain-empty.js <url> → must exit 1 (door cards lose their Được). */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,URL,OUT,SZ,SC]=process.argv;const [WH,DPR]=(SZ||'755x1000@1').split('@');const [W,H]=WH.split('x').map(Number);
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.slice(src.indexOf('String.raw`')+11,src.indexOf('})();`;')+5);
const T0=Date.now(),lg=m=>console.error('['+Math.round((Date.now()-T0)/1000)+'s] '+m);
const PROBE=String.raw`
/* the gain the card SHOWS: kit rows Được / Thành (.kr-duoc/.kr-thanh), or the door-card grid cell after «Thành»/«Được» (.kgrid) */
AA.gainOf=b=>{const T=e=>(e&&e.innerText||e&&e.textContent||"").replace(/\s+/g," ").trim();const L=[];
 b.querySelectorAll(".kr-duoc > .krv, .kr-thanh > .krv").forEach(v=>{const c=[...v.querySelectorAll(".ef,.kitem")].map(T).filter(Boolean);L.push(...(c.length?c:[T(v)]))});
 b.querySelectorAll(".kgrid > .kl").forEach(l=>{if(/^(Thành|Được)$/.test(T(l))&&l.nextElementSibling)L.push(...[...l.nextElementSibling.querySelectorAll(".ef")].map(T))});
 return L.filter(x=>x&&!/^(không|—|-)$/i.test(x))};
AA.empty=c=>!c.dis&&!c.gain.length;
AA.probe=async(s)=>{const sl=ms=>new Promise(r=>setTimeout(r,ms));AA.restore();AA.show(s);const P=s.pop!=null&&S.visit&&S.visit.people[s.pop];const who=P?(P.name||P.kind):"";await sl(40);/* the deck door cards (jdoor) are folded by an observer after render */
 const top=AA.btns(s).map(b=>Object.assign(AA.rowsOf(b),{gain:AA.gainOf(b),cls:b.className,door:b.dataset.door||b.dataset.ill||b.dataset.ddoor||''}));const out=[];
 const NAV=AA.btns(s).map(b=>!!b.closest(".tdseg")||!!b.closest("[data-knav]"));/* a view switch (Phe phái hậu cung / Triều đình seg, j55) opens no act: not an act card; KIT §104.2d (KK60): a ring OPENER («Lập phe cùng ai · N ›», «Các phe · N ›», strip «‹ tên · i/n ›», data-knav="ring") is a door, not an act — law 3 is checked on the plaques the ring drops, not on the opener */
 for(let j=0;j<top.length;j++){const c=top[j];if(c.dis||NAV[j])continue;out.push({who,name:c.name,gain:c.gain,ton:c.ton,door:c.door,cls:c.cls,empty:AA.empty(c),lvl:0});
  AA.restore();AA.show(s);await sl(40);const b=AA.btns(s)[j];if(!b)continue;AA.force=null;try{b.click()}catch(e){}await sl(20);try{render()}catch(e){}
  const m=document.getElementById("modal");if(m&&!m.hidden){const O=[...m.querySelectorAll(".opts button.ka, .opts button.opt")];
   for(const o of O){const r=Object.assign(AA.rowsOf(o),{gain:AA.gainOf(o)});if(r.dis||/^✕/.test(r.name))continue;if(!o.classList.contains("ka"))continue;out.push({who,parent:c.name,title:(document.getElementById("mt")||{}).innerText||"",name:r.name,gain:r.gain,ton:r.ton,empty:AA.empty(r),lvl:1})}}
  AA.hide()}
 return out};`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(LIB);await p.evaluate(PROBE);
 /* MUTANT=1: blank one producer (the door cards' Được, jdoor doorGain) — the test must then FAIL */
 if(process.env.MUTANT)await p.evaluate(()=>{window.doorGain=()=>""});
 const ALL=[];for(const sc of (SC||'dau,toi,cao,con,hau,hh').split(',')){await p.evaluate(n=>AA.scen(n),sc);const SF=await p.evaluate(()=>AA.surfaces());
  for(const sf of SF){let subs=[sf];if(sf.place){const n=await p.evaluate(s=>{AA.restore();AA.show(s);return S.visit&&S.visit.people?S.visit.people.length:0},sf);subs=[];for(let i=0;i<n;i++)subs.push(Object.assign({},sf,{pop:i,id:sf.id+"#"+i}))}
   for(const s2 of subs){const r=await p.evaluate(s=>AA.probe(s),s2);r.forEach(x=>{x.sc=sc;x.sf=s2.id;ALL.push(x)})}}
  lg(sc+' done, cards '+ALL.length)}
 const bad=ALL.filter(x=>x.empty);const key=x=>(x.parent?x.parent+' › ':'')+x.name.replace(/\s+(Tốn|Được|Mất)\b.*$/,'');const uniq={};bad.forEach(x=>{const k=key(x);(uniq[k]=uniq[k]||[]).push(x.sc+':'+x.sf)});
 if(OUT)fs.writeFileSync(OUT,JSON.stringify({all:ALL,bad,uniq,perr},null,1));
 console.log('cards '+ALL.length+' | empty Được '+bad.length+' runs, '+Object.keys(uniq).length+' distinct | page errors '+perr.length);
 for(const k of Object.keys(uniq).sort())console.log('  EMPTY: '+k+'  ['+[...new Set(uniq[k])].slice(0,3).join(', ')+']');
 await b.close();process.exit(Object.keys(uniq).length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
