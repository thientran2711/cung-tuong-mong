/* POPTAB-SCAN (E-GAIN4 (a), law 11): every card of every pop-up (people at home and in every place, act-audit states) with the TAB it sits under.
   A card is under a wrong tab when its tab (j15 group = kitActCat of the card name) is not the matter of the card. The wrong-tab family found
   by E-GAIN4 is pinned in WRONG below (name → the tab it must NOT sit under); the scan prints every (tab, card) pair for the before/after table.
   usage: node dev/test/poptab-scan.js <url> [out.json] [WxH@dpr] [scenarios] → exit 1 when a WRONG pair is seen or a page error.
   Mutant: MUTANT=1 → KIT_ACT_CATS «trung-phat» gets «đổi người» back first in the list → must exit 1. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,URL,OUT,SZ,SC]=process.argv;const [WH,DPR]=(SZ||'755x1000@1').split('@');const [W,H]=WH.split('x').map(Number);
const src=fs.readFileSync(__dirname+'/act-audit.js','utf8');const LIB=src.slice(src.indexOf('String.raw`')+11,src.indexOf('})();`;')+5);
/* card name (regexp) → tab it must not sit under; the cards' own matter in the comment */
const WRONG=[[/^Đổi người chạy việc/,/^Trừng phạt$/] /* picks who runs her errands (jhc PEND.runner): Hầu hạ, not a punishment */,
 [/^Ban thưởng$/,/^Trừng phạt$/] /* a reward: «Ban thưởng» tab */, [/^Hỏi người hầu/,/^Hầu hạ$/] /* a question: Giao thiệp */,
 [/^(Cài người vào cung khác|Chưởng sự tra xét cung nữ)/,/^Đi lại$/] /* planting / sifting eyes and ears: Mưu kế */, [/^Chăm sóc$/,/^Hầu hạ$/] /* only in a child pop-up (scan reads pop-ups): Chăm con */,
 [/^Đổi người chạy việc/,/^Buôn bán$/] /* «đổi» is not a trade here */];
const PROBE=String.raw`
AA.tabs=async(s)=>{const sl=ms=>new Promise(r=>setTimeout(r,ms));const T=e=>(e&&e.textContent||"").replace(/\s+/g," ").trim();AA.restore();AA.show(s);await sl(30);
 const w=document.getElementById("popw");if(!w)return[];const tabs=[...w.querySelectorAll(".pctabs .pct")].map(t=>(t.dataset.pct||T(t)).replace(/\s*\d+\s*\/\s*\d+\s*$/,"").trim());
 const panes=[...w.querySelectorAll(".pcg")];const out=[];const P=S.visit&&S.visit.people[s.pop];const who=P?(P.name||P.kind)+"/"+P.kind:"";
 (panes.length?panes:[w]).forEach((g,gi)=>{for(const b of g.querySelectorAll("button")){if(b.classList.contains("pct")||/^✕/.test(T(b))||(typeof dfIsAct==="function"&&!dfIsAct(b)))continue;
  const n=T(b.querySelector(".kan"))||T(b.childNodes[0]&&b.childNodes[0].nodeType===3?b.childNodes[0]:b).slice(0,60);if(!n)continue;out.push({who,tab:panes.length?(tabs[gi]||""):"",name:n})}});
 return out};`;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(0);const perr=[];p.on('pageerror',e=>perr.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(LIB);await p.evaluate(PROBE);
 if(process.env.MUTANT)await p.evaluate(()=>{KIT_ACT_CATS.unshift(["trung-phat",/đổi người/i])});
 const ALL=[];for(const sc of (SC||'dau,toi,cao,con,hau,hh').split(',')){await p.evaluate(n=>AA.scen(n),sc);const SF=await p.evaluate(()=>AA.surfaces().filter(s=>s.place));
  for(const sf of SF){const n=await p.evaluate(s=>{AA.restore();AA.show(s);return S.visit&&S.visit.people?S.visit.people.length:0},sf);
   for(let i=0;i<n;i++){const r=await p.evaluate(s=>AA.tabs(s),Object.assign({},sf,{pop:i}));r.forEach(x=>{x.sc=sc;x.sf=sf.id;ALL.push(x)})}}
  console.error(sc+' done, cards '+ALL.length)}
 const pairs={};for(const x of ALL){const k=(x.tab||'(no tab)')+' | '+x.name.replace(/\s+(Tốn|Được|Mất|Thành|Bại)\b.*$/,'');(pairs[k]=pairs[k]||new Set()).add(x.who.split('/')[1])}
 const bad=ALL.filter(x=>WRONG.some(([n,t])=>n.test(x.name)&&t.test(x.tab)));
 if(OUT)fs.writeFileSync(OUT,JSON.stringify({pairs:Object.fromEntries(Object.entries(pairs).map(([k,v])=>[k,[...v]])),bad,perr},null,1));
 console.log('cards '+ALL.length+' | distinct tab|card '+Object.keys(pairs).length+' | wrong-tab '+bad.length+' | page errors '+perr.length);
 for(const x of bad.slice(0,10))console.log('  WRONG: '+x.tab+' | '+x.name+' ['+x.sc+':'+x.sf+' '+x.who+']');
 if(process.env.LIST)for(const k of Object.keys(pairs).sort())console.log('  '+k+'  ['+[...pairs[k]].join(',')+']');
 await b.close();process.exit(bad.length||perr.length?1:0)})().catch(e=>{console.error(e);process.exit(2)});
