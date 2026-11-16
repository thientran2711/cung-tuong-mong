/* C43 review/coop-invite-ux: host invite screen (waiting state, 1-2-3 guide, live time) and auto-continue when the friend joins.
   usage: python3 dev/build/assemble.py && node dev/test/coop-invite-ux.js [outdir] [workerURL]   (Worker = live; 1 browser, 2 contexts) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path');
const {serve,BASE}=require('./coop-serve.js');
const OUT=path.resolve(process.argv[2]||path.join(__dirname,'../shots/coop-invite-ux'));fs.mkdirSync(OUT,{recursive:true});
const WURL=process.argv[3]||'https://ctm-coop.victoria-tntt.workers.dev';
const VPS=[[755,1000,2],[1180,820,2],[1366,1024,2],[844,390,2]];
let fails=0;const ok=(c,m,x)=>{if(!c)fails++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
async function mk(b,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2],hasTouch:true,isMobile:vp[0]<1100,reducedMotion:'reduce'});
 await serve(ctx);await ctx.addInitScript(u=>{window.COOP_URL=u},WURL);const p=await ctx.newPage();p.setDefaultTimeout(30000);p.setDefaultNavigationTimeout(120000);
 p.errs=[];p.on('pageerror',e=>p.errs.push(e.message));p.ctx=ctx;return p}
async function tap(p,re,ms=15000){const t0=Date.now();while(Date.now()-t0<ms){const h=await p.evaluateHandle(s=>{const R=new RegExp(s);return [...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()))||null},re.source);
 const el=h.asElement();if(el){try{await el.click({noWaitAfter:true,timeout:10000});return true}catch(e){}}await sleep(250)}return false}
(async()=>{const b=await chromium.launch();
 for(const vp of VPS){const tag=vp[0]+'x'+vp[1];console.log('== host '+tag);
  const A=await mk(b,vp);await A.goto(BASE,{waitUntil:'domcontentloaded'});
  ok(await tap(A,/^Cùng hảo hữu/),'open Cùng hảo hữu');ok(await tap(A,/^Mời hảo hữu/),'Mời hảo hữu');
  await A.waitForFunction(()=>COOP.state.status==='open'&&document.querySelector('#modal.kcoop [data-kcw]'),null,{timeout:30000});
  const t=()=>A.evaluate(()=>({rows:[...document.querySelectorAll('#modal.kcoop .kr')].map(r=>r.innerText.replace(/\s+/g,' ').trim()),live:(document.querySelector('[data-kcw]')||{}).textContent,ovx:document.documentElement.scrollWidth>innerWidth+1,
   clip:(()=>{const d=document.querySelector('#modal .dlg');return d?[d.scrollHeight,d.clientHeight]:0})()}));
  let s=await t();console.log(JSON.stringify(s.rows));
  ok(s.rows.some(r=>/^1 · Gửi lời mời/i.test(r)&&/chạm Gửi/i.test(r)),'step 1 asks to send');ok(s.rows.some(r=>/^2 · Hảo hữu vào phòng.*đang đợi/i.test(r)),'step 2 waiting');ok(s.rows.some(r=>/^3 · Cùng chơi/i.test(r)),'step 3');ok(!s.ovx,'no h-overflow');
  await A.screenshot({path:`${OUT}/1-wait-${tag}.png`});
  await sleep(2600);const s2=await t();ok(/\d:0[2-9]/.test(s2.live||''),'live elapsed time ticks',s2.live);
  if(vp[0]===1180){ /* send step flips after Chép đường dẫn */
   await A.evaluate(()=>{navigator.clipboard&&0});ok(await tap(A,/^Chép đường dẫn/),'copy link');await sleep(500);s=await t();ok(s.rows.some(r=>/^1 · Gửi lời mời.*✓/i.test(r)),'step 1 done after copy');
   await A.screenshot({path:`${OUT}/2-sent-${tag}.png`});
   const code=await A.evaluate(()=>COOP.state.room);
   const B=await mk(b,[1180,820,2]);await B.goto(BASE+'?room='+code,{waitUntil:'domcontentloaded'});
   const t0=Date.now();A.evaluate(()=>{window.__ln=[];new MutationObserver(()=>{const e=document.getElementById('kupdline');if(e&&e.textContent&&window.__ln[window.__ln.length-1]!==e.textContent)window.__ln.push(e.textContent)}).observe(document.body,{childList:true,subtree:true,characterData:true})});const go=await A.waitForFunction(()=>COOP.state.playing&&COOP.state.bothIn,null,{timeout:60000}).then(()=>true,()=>false);
   ok(go,'host auto-continues into the shared game, no tap ('+(Date.now()-t0)+' ms)');
   await A.screenshot({path:`${OUT}/3-joined-${tag}.png`});
   ok(await A.evaluate(()=>document.getElementById('title').hidden),'title hidden on host');
   const line=(await A.evaluate(()=>window.__ln)).join(' | ');console.log('both PG',await A.evaluate(()=>window.__cuxBoth));ok(/Hảo hữu đã vào phòng/.test(line),'joined line',line);
   ok(!A.errs.length&&!B.errs.length,'no page errors',[...A.errs,...B.errs]);await B.ctx.close()}
  else ok(!A.errs.length,'no page errors',A.errs);
  await A.ctx.close()}
 await b.close();console.log(fails?'FAILS '+fails:'ALL OK');process.exit(fails?1:0)})();
