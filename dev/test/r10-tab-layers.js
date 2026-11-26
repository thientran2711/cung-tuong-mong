/* robot10 nc-fix family «stage layers over another tab» (rows: Fold story tab span.kchkt × kfoc-sayn, rel tab p.past × kfoc-next):
   every layer drawn on #game over the Dư đồ stage (kitFocus focus layer, an NPC encounter say box on it, the mood bubble) must be gone from
   every other tab, and the open focus must come back as it was on «Hành sự».
   usage: node dev/test/r10-tab-layers.js <save.json> [WxH ...]   (default 755x1000 1180x820)   exit 1 on a fail */
const {chromium}=require('./lib/pw-roulette');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs');
const [save,...vp]=process.argv.slice(2);const VPS=(vp.length?vp:['755x1000','1180x820']).map(s=>s.split('x').map(Number));let bad=0;
const ok=(c,m,x)=>{if(!c)bad++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch({args:['--no-sandbox']});const txt=fs.readFileSync(save,'utf8');
 for(const [w,h] of VPS){const tag=w+'x'+h;const ctx=await b.newContext({viewport:{width:w,height:h},reducedMotion:'reduce'});await serve(ctx);
  await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});await ctx.addInitScript(t=>{try{localStorage.setItem('hclh-save-v2-1',t)}catch(e){}},txt);
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
  await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:120000});await p.waitForFunction(()=>typeof deser==='function'&&document.querySelector('#modal.kpthome'),null,{timeout:90000});
  await p.evaluate(()=>{$("title").hidden=false;showTitle();const bt=document.querySelector('#slots [data-load="1"]');if(bt)bt.click()});
  const shown=()=>p.evaluate(()=>[...document.querySelectorAll('.kfoc,.kfoc-mood')].filter(e=>e.offsetParent!==null||getComputedStyle(e).position==='fixed'&&getComputedStyle(e).display!=='none').filter(e=>e.getClientRects().length).map(e=>e.className.split(' ')[0]));
  const openAll=()=>p.evaluate(()=>{try{Q.length=0;closeModal()}catch(e){}tab="act";render();const L=curPeople();let i=-1;for(let k=0;k<L.length;k++){if(dfOpen(k)){i=k;break}}
   /* the mood bubble too (beside a stage figure) */try{const f=document.querySelector('#stage img');if(f&&typeof kitMoodSay==="function")kitMoodSay(f,"Hôm nay trời đẹp.",{})}catch(e){}return i});
  const i0=await openAll();await p.waitForTimeout(500);ok(i0>=0,`${tag} focus opened on a stage person`,i0);ok((await shown()).includes('kfoc'),`${tag} focus layer shown on «Hành sự»`);
  const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs [data-tab]')].filter(e=>e.offsetParent!==null).map(e=>e.dataset.tab).filter(t=>t!=="act"));
  for(const t of tabs){await openAll();await p.waitForTimeout(200);
   /* the tab button as the robot presses it (a click event on the button) */
   await p.evaluate(t=>document.querySelector('#tabs [data-tab="'+t+'"]').click(),t);await p.waitForTimeout(250);
   const s=await shown();ok(!s.length,`${tag} tab ${t}: no stage layer over the panel`,s)}
  await p.evaluate(()=>{try{Q.length=0;closeModal()}catch(e){}document.querySelector('#tabs [data-tab="act"]').click()});await p.waitForTimeout(300);
  ok((await shown()).includes('kfoc'),`${tag} back on «Hành sự»: the open focus is there again`);
  ok(!errs.length,`${tag} no page errors`,errs.slice(0,3));await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
