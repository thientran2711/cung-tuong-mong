/* pic-dupes.js (review/pic-dupes, owner 15/11: "two different acts share the same picture"): which picture does EVERY act card show?
   Runs the game (Playwright, pictures stubbed) in several states (fresh, high rank + staff, children, Empress, pets, every buổi), collects
   every act name of the deck pools / deal() / rendered act buttons (same harvest as dev/tools/missing_pics.js) plus the names in EXTRA
   (static list, one per line), resolves each with the game's own kitActArt (incl. jph §59 placeholder + CDN check) and groups by picture.
   A picture shown by 2+ different act names = COLLISION (placeholder ph-act-* counts too: every act on it shares it).
   usage: [ACTS_FILE=patched.json] node dev/test/pic-dupes.js <build url> <out.json> [extra-names.txt] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT,EXTRA]=process.argv;const extra=EXTRA?fs.readFileSync(EXTRA,'utf8').split('\n').map(s=>s.trim()).filter(Boolean):[];
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:1180,height:820},reducedMotion:'reduce',serviceWorkers:'block'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 await ctx.route(/\.(webp|png|jpg)(\?|$)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==','base64')}));
 const p=await ctx.newPage();p.setDefaultTimeout(600000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 /* ACTS_FILE=<local ACTS.json>: test a manifest patch before it goes to the CDN */
 if(process.env.ACTS_FILE)await p.route(/img\/ACTS\.json/,r=>r.fulfill({status:200,contentType:'application/json',body:fs.readFileSync(process.env.ACTS_FILE)}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(3000);
 await p.waitForFunction(()=>typeof KIT_ACTS!=='undefined'&&KIT_ACTS.acts&&Object.keys(KIT_ACTS.acts).length&&typeof KIT_CDNHAVE!=='undefined'&&KIT_CDNHAVE,null,{timeout:90000});
 const res=await p.evaluate(extra=>{const acts=new Map();const add=(n,st)=>{n=kpPlain(String(n||""));if(!n)return;if(!acts.has(n))acts.set(n,st)};
  const harvest=st=>document.querySelectorAll('button.ka.kcard .kan, .pc>.pcr button.ka .kan, .kpanec button.ka .kan').forEach(k=>{try{add(kpActName(k),st)}catch(e){}});
  const fresh=()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove())};
  const setup={fresh:()=>{},cao:()=>{S.rank=5;S.sung=65;S.danh=60;S.th=55;S.tamco=55;S.mat=3;S.duc=60;try{fillStaff(S,true)}catch(e){}},
   con:()=>{try{S.kids.push(mkKid("m",4));S.kids.push(mkKid("f",2))}catch(e){}S.preg=0},
   hh:()=>{S.rank=7;try{const q=rivals.find(v=>v.queen);if(q){q.queen=false;q.rank=6}}catch(e){}S.sung=70;S.danh=70;try{fillStaff(S,true)}catch(e){}},
   om:()=>{S.suc=10;try{S.ill={k:"phong",d:3}}catch(e){}}};
  for(const st in setup){try{fresh();setup[st]();const A=a=>{if(a&&a.n)add(a.n,st)};
   try{(pool()||[]).forEach(A)}catch(e){}try{(coldActs()||[]).forEach(A)}catch(e){}try{(illCards()||[]).forEach(A)}catch(e){}
   for(let i=0;i<40;i++){try{S.buoi=i%4;deal();(deck||[]).forEach(A)}catch(e){}}
   try{S.buoi=0;render()}catch(e){}harvest(st);
   for(const t of [...new Set([...document.querySelectorAll('[data-tab]')].map(b=>b.dataset.tab))]){try{tab=t;for(const k in PG)PG[k]=0;render();harvest(st);
    if(PG[t]!=null){for(let i=1;i<60;i++){PG[t]=i;render();if(PG[t]!==i)break;harvest(st)}PG[t]=0}}catch(e){}}}catch(e){}}
  for(const n of extra)add(n,"static");
  return [...acts].map(([n,st])=>{let a={};try{a=kitActArt(n)||{}}catch(e){}return{name:n,st,key:kitActKey(n),src:String(a.src||"").split('/').pop(),ph:a.ph||"",cat:a.cat||""}})},extra);
 const by={};for(const r of res){if(!r.src)continue;(by[r.src]=by[r.src]||[]).push(r.name)}
 const coll=Object.entries(by).filter(([s,L])=>L.length>1).sort((a,b)=>b[1].length-a[1].length);
 fs.writeFileSync(OUT,JSON.stringify({acts:res,collisions:coll,errs},null,1));
 console.log(`acts ${res.length}, pictures ${Object.keys(by).length}, shared pictures ${coll.length} (names on them ${coll.reduce((a,c)=>a+c[1].length,0)}), placeholder ${res.filter(r=>r.ph).length}, page errors ${errs.length}`);
 await b.close()})().catch(e=>{console.error(e);process.exit(2)});
