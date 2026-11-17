/* missing_pics.js — KIT §59 (review/placeholder-pics): lists every EVENT dialog id and every ACT card that has no picture of its own and
   therefore shows a placeholder (img/ph-{p,l,w,s}-light|dark-<size>.webp, picked by orientation and size, KIT §59), with its tone.
   Runs the game (Playwright, pictures stubbed), opens every dialog it can build (same enumeration as dev/tools/pic_usage.js: PEND builders,
   E68 events, T72 quests, festivals, feast invitations, news, gift) and reads window.CTM_MISSING_PICS (filled by jph.js);
   acts = every act of the deck pools (pool, coldActs, illCards, 40 deals) plus every act button the tabs render, checked with kitActKey + the CDN index.
   usage: node dev/tools/missing_pics.js <url of a build page> <out.json> [dev/art/MISSING_PICS.md] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT,MD]=process.argv;
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:1180,height:820},reducedMotion:'reduce',ignoreHTTPSErrors:true,serviceWorkers:'block'});
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 /* pictures are not needed, only their names: answer every image request with an empty 1x1 so the run is fast and offline-safe */
 await ctx.route(/\.(webp|png|jpg)(\?|$)/,r=>r.fulfill({status:200,contentType:'image/png',body:Buffer.from('iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVR42mNk+M9QDwADhgGAWjR9awAAAABJRU5ErkJggg==','base64')}));
 const p=await ctx.newPage();p.setDefaultTimeout(600000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(3000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;document.querySelectorAll('.kroul,#kroul,#kroulw').forEach(e=>e.remove());
  try{S.inv.push({k:"tramngoc",from:"me"})}catch(e){}try{if(typeof wkMake==="function")S.inv.push(wkMake(S,"mon",0,7))}catch(e){}render()});
 await p.waitForFunction(()=>typeof EVART!=='undefined'&&EVART,null,{timeout:60000}).catch(()=>{});
 await p.waitForFunction(()=>typeof KIT_ACTS!=='undefined'&&KIT_ACTS.acts&&Object.keys(KIT_ACTS.acts).length&&typeof KIT_CDNHAVE!=='undefined'&&KIT_CDNHAVE,null,{timeout:60000}).catch(()=>{});
 const res=await p.evaluate(()=>{const rows=[];const P=s=>String(s||"").replace(/<[^>]+>/g," ").replace(/\s+/g," ").trim();
  const close=()=>{Q.length=0;const M=document.getElementById('modal');M.hidden=true};
  const idOf=m=>{if(!m)return"";const pp=m.pp||{};return m.evId||(m.pid?(m.pid+(pp&&(pp.id||pp.k)?":"+(pp.id||pp.k):"")):"")||(m.kind==="news"?"news:"+(m.t||""):"")};
  const look=(src,extra)=>{const M=document.getElementById('modal');if(M.hidden)return;const m=Q[0]||{};
   const img=M.querySelector('#mb .kdlgart .ksart > img, #mb .kpsubj .ksart > img, #mb .kpsubj.kgiftpic img');const fr=M.querySelector('#mb .kdlgart .ksart, #mb .kpsubj .ksart');
   const pic=img?(img.getAttribute('src')||"").split('/').pop().split('?')[0]:"";const id=extra&&extra.id||idOf(m);
   const own=id&&typeof evArtCat==="function"?(evArtCat(id)||""):"";
   rows.push({src,id,title:P(document.getElementById('mt').textContent),first:(P(m.h||"").split(/(?<=[.!?…])\s/)[0]||P(M.querySelector('#mb .kpmain, #mb .kpb')?.innerText||"")).slice(0,160),
    pic,label:fr?P(fr.querySelector('figcaption,.ksart-chip')?.textContent||fr.title||""):"",own,person:!!M.querySelector('#mb .kes, #mb .kesov'),item:!!M.querySelector('.kgiftpic')})};
  const R=liveRivals(true);const v=R[0];const wix=S.inv.findIndex(e=>e&&e.wk),iix=S.inv.findIndex(e=>e&&e.k==="tramngoc");
  /* 1. PEND */
  for(const id of Object.keys(PEND)){for(const pp of [{v:v&&v.id,ix:iix},{ix:id==="wkgive"?wix:iix},{v:v&&v.id},{}]){let d=null;try{d=PEND[id](Object.assign({},pp))}catch(e){d=null}if(!d||!(d.o||d.t))continue;
    close();try{pushDil(mkP(id,pp),id);showModal()}catch(e){continue}look("PEND");close();break}}
  /* 2. E68 events */
  try{for(const id of Object.keys(E68I||{})){close();try{if(e68Test(id))look("E68",{id:"e68:"+id})}catch(e){}close()}}catch(e){}
  /* 3. T72 quests */
  try{for(const id of Object.keys(T72I||{})){close();try{if(q72Test(id,true))look("T72",{id:"q72:"+id})}catch(e){}close()}}catch(e){}
  /* 4. festivals */
  try{for(const k of Object.keys(FV7||{})){for(let vi=0;vi<(FV7[k]||[]).length;vi++){close();try{if(j71Fest(k,vi))look("FEST-invite",{id:"j71f:"+k+"#"+vi})}catch(e){}close()}
    close();try{if(j71Day(k))look("FEST-day",{id:"j71d:"+k})}catch(e){}close()}}catch(e){}
  try{for(const kk of Object.keys(FX7||{})){close();try{if(j71FeastInvite(kk))look("FEAST-invite",{id:"j71x:"+kk})}catch(e){}close()}}catch(e){}
  /* 5. news */
  try{const N=(S.news||[]).slice(0,6);const L=N.length?N:[{t:"Tin trong cung"}];for(const n of L){close();Q.push({t:"Tin trong cung",kind:"news",h:`<p>${P(n.t||n.h||n.s||"")}</p>`});showModal();look("NEWS");close()}}catch(e){}
  /* 6. gift */
  try{close();itemAct("gift",wix);look("GIFT",{id:"giftpick:item"})}catch(e){}close();
  /* 7. acts: every act of the deck pools (deal() in many states + pool/cold/ill), then every act button the tabs render */
  const acts=new Set();const addA=a=>{if(a&&a.n)acts.add(kpPlain(String(a.n)))};
  try{(pool()||[]).forEach(addA)}catch(e){}try{(coldActs()||[]).forEach(addA)}catch(e){}try{(illCards()||[]).forEach(addA)}catch(e){}
  for(let i=0;i<40;i++){try{S.buoi=i%4;deal();(deck||[]).forEach(addA)}catch(e){}}
  try{render()}catch(e){}
  /* only the buttons the game treats as ACT cards (deck cards, person-card acts, pane acts); person lists / account buttons are not acts */
  const harvest=()=>document.querySelectorAll('button.ka.kcard .kan, .pc>.pcr button.ka .kan, .kpanec button.ka .kan').forEach(k=>{try{const n=kpActName(k);if(n)acts.add(n)}catch(e){}});
  harvest();for(const t of [...new Set([...document.querySelectorAll('[data-tab]')].map(b=>b.dataset.tab))]){try{tab=t;for(const k in PG)PG[k]=0;render();harvest();
   /* page through every person card of a paged tab (rivals, men, staff, court) */
   if(PG[t]!=null){for(let i=1;i<60;i++){PG[t]=i;render();if(PG[t]!==i)break;harvest()}PG[t]=0}}catch(e){}}
  const actRows=[...acts].filter(Boolean).sort().map(n=>{const key=kitActKey(n);const a=kitActArt(n);return{name:n,key,ph:a&&a.ph||"",tone:a&&a.ph||"",cat:a&&a.cat||""}});
  return{rows,acts:actRows,missing:window.CTM_MISSING_PICS||[]}});
 const ev=res.missing.filter(x=>x.kind==="event");const evIds=[...new Map(ev.map(x=>[x.id,x])).values()].sort((a,b)=>a.id.localeCompare(b.id));
 const actPh=res.acts.filter(a=>a.ph);
 const evTotal=new Set(res.rows.map(r=>r.id).filter(Boolean)).size;
 const opt=[...new Map(res.missing.filter(x=>x.kind==="opt").map(x=>[x.id,x])).values()].sort((a,b)=>String(a.id).localeCompare(String(b.id)));
 const out={eventsChecked:evTotal,eventsPh:evIds,optPh:opt,actsChecked:res.acts.length,actsPh:actPh,errs};
 fs.writeFileSync(OUT,JSON.stringify(out,null,1));
 if(MD){const L=[];const cnt=(A,t)=>A.filter(x=>x.tone===t).length;
  L.push("# Events and acts on the placeholder pictures (KIT §59)","",`Generated by \`node dev/tools/missing_pics.js <build url> <out.json> dev/art/MISSING_PICS.md\` on ${new Date().toISOString().slice(0,16)}Z.`,
   "Each row has no picture of its own and shows the placeholder by tone (light = normal/positive, dark = negative/scheming; rule: KIT.md §59).",
   "At runtime the same list builds up in `window.CTM_MISSING_PICS` (each logged once to the console as `[CTM missing pic]`).","Coverage: one fresh life (the dialog builders that can be built in it, every act of its deck pools and rendered tabs). Dialogs of other roads (e.g. the maid road's `cnvAge`, seen by dev/test/placeholder-pics.js) show up at runtime in `CTM_MISSING_PICS`. The week book (Tuần lục) is not covered: its lines keep the owner's \"no picture rather than a repeated one\" rule.","",
   "| | checked | on placeholder | light | dark |","|---|---|---|---|---|",
   `| Events (dialogs) | ${evTotal} | ${evIds.length} | ${cnt(evIds,"light")} | ${cnt(evIds,"dark")} |`,
   `| Option cards (dialog choices seen) | - | ${opt.length} | ${cnt(opt,"light")} | ${cnt(opt,"dark")} |`,
   `| Acts (cards) | ${res.acts.length} | ${actPh.length} | ${cnt(actPh,"light")} | ${cnt(actPh,"dark")} |`,"",
   "## Events","","| event id | tone | title |","|---|---|---|",...evIds.map(x=>`| \`${x.id}\` | ${x.tone} | ${String(x.title||"").replace(/\|/g,"/")} |`),"",
   "## Option cards (dialog choices on the act placeholder, KIT §6.2)","","| option title | tone |","|---|---|",...opt.map(x=>`| ${String(x.id).replace(/\|/g,"/")} | ${x.tone} |`),"","## Acts","","| act (card title) | tone | category |","|---|---|---|",...actPh.map(x=>`| ${x.name.replace(/\|/g,"/")} | ${x.tone} | ${x.cat} |`),"");
  fs.writeFileSync(MD,L.join("\n"))}
 console.log(`option cards ${opt.length} on placeholder; events ${evIds.length}/${evTotal} on placeholder, acts ${actPh.length}/${res.acts.length} on placeholder, ${errs.length} page errors`);await b.close()})().catch(e=>{console.error(e);process.exit(2)});
