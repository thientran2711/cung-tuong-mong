/* npc-roads-saves (review/npc-roads): saves and NPC roads (jnroad.js).
   1) a save from the MAIN build (no NPC roads) loads in this build, plays 6 months: live consorts get a road (lazy fill), no errors;
   2) a save of this build after 30 months (NPC roads running) → ser/deser keeps every v.nr unchanged and plays on;
   3) the person card (Hậu cung) of a consort shows her road row (kit pcard line). usage: node dev/test/npc-roads-saves.js <url> <main url> */
const {chromium}=require('playwright');
const [,,URL,MAIN]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];const ok=[];const chk=(n,c,x)=>{ok.push([n,!!c]);console.log(c?'PASS':'FAIL',n,c?'':JSON.stringify(x).slice(0,700))};
 const boot=async url=>{const ctx=await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(0);
  p.on('pageerror',e=>errs.push(url.slice(-20)+': '+e.message.slice(0,200)));await p.goto(url,{waitUntil:'domcontentloaded',timeout:0});
  await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1200);return p};
 const mk=async(url,k,months)=>{const q=await boot(url);const s=await q.evaluate(([k,months])=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}
   SLOT=3;window.__forceOrigin=k;document.getElementById('title').hidden=true;quiet=true;start();quiet=false;if(typeof S==='undefined'||!S)return{retry:1};
   for(let m=0;m<months;m++){if(!S)return{retry:1};if(S.dead){S.dead=false;S.suc=60}const t=S.turn;for(let g=0;g<40&&S&&S.turn===t;g++){Q.length=0;used=0;nextBuoi()}}
   Q.length=0;if(!S)return{retry:1};return{save:JSON.stringify(ser()),nr:JSON.stringify(rivals.map(v=>v.nr||null)),nrO:typeof nrMenL!=='function'?'':JSON.stringify(nrMaidL().concat(nrServL('eunuch')).map(s=>s.nr||null).concat(nrMenL().map(e=>e.p.nr||null)))}},[k,months]);await q.context().close();return s};
 const mkR=async(u,k,m)=>{for(let t=0;t<4;t++){const s=await mk(u,k,m);if(!s.retry)return s}return null};
 const old=MAIN?await mkR(MAIN,'thd',2):null;const mine=await mkR(URL,'muoi',30);if(MAIN&&!old)chk('main-build save built',false,'boot');
 const q=await boot(URL);
 const run=s=>q.evaluate(s=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.getElementById('title').hidden=true;Q.length=0;deser(JSON.parse(s));
   const nr0=JSON.stringify(rivals.map(v=>v.nr||null));const nrO0=typeof nrMenL==='function'?JSON.stringify(nrMaidL().concat(nrServL('eunuch')).map(s=>s.nr||null).concat(nrMenL().map(e=>e.p.nr||null))):'';for(let m=0;m<6;m++){if(S.dead){S.dead=false;S.suc=60}const t=S.turn;for(let g=0;g<40&&S.turn===t;g++){Q.length=0;used=0;try{nextBuoi()}catch(e){return{err:e.message}}}}Q.length=0;
   const live=liveRivals(true);const v=live.find(x=>x.nr);let row='';if(v){tab='rv';render();const i=rivals.indexOf(v);try{row=rvCard(v,i)}catch(e){row='ERR '+e.message}}
   return{nr0,nrO0,filled:live.filter(x=>x.nr).length,live:live.length,row:row.includes('Tuyến truyện: «')}},s);
 if(old){const r=await run(old.save);console.log('main save',JSON.stringify(r).slice(0,300));chk('main-build save loads, plays 6 months, live consorts get a road',!r.err&&r.filled===r.live&&r.live>0,r)}
 const r2=await run(mine.save);chk('this-build save keeps every NPC road (ser/deser)',r2.nr0===mine.nr,[r2.nr0.slice(0,200),mine.nr.slice(0,200)]);
 chk('this-build save keeps every maid / eunuch / man road (ser/deser)',r2.nrO0===mine.nrO&&/"r":/.test(mine.nrO),[String(r2.nrO0).slice(0,200),String(mine.nrO).slice(0,200)]);
 chk('this-build save plays on',!r2.err,r2);chk('person card shows her road row',r2.row,r2);
 chk('no page errors',!errs.length,errs.slice(0,5));const nb=ok.filter(x=>!x[1]).length;console.log(`npc-roads-saves: ${ok.length-nb}/${ok.length} pass`);await b.close();process.exit(nb?1:0)})();
