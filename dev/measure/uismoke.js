// usage: node dev/measure/uismoke.js <baseURL> <newPage> <oldPage> <outdir>
// 1) old build: new game, a few buổi, save; 2) new build at 755x1000@2 and 1180x820@2: load that save, play some buổi by clicking, screenshots, page errors
const {chromium}=require('playwright');const [,,BASE,NEW,OLD,OUT]=process.argv;
(async()=>{const b=await chromium.launch();const errs=[];
 const ctx=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:2,serviceWorkers:'block'});
 const p=await ctx.newPage();p.on('pageerror',e=>errs.push('OLD '+e.message));
 await p.goto(BASE+OLD);await p.waitForTimeout(1500);await p.evaluate(()=>localStorage.clear());await p.reload();await p.waitForTimeout(1500);
 await p.evaluate(()=>document.querySelector("#slots button[data-new=\"1\"]").click());await p.waitForTimeout(800);
 for(let i=0;i<6;i++){await p.evaluate(()=>{for(let k=0;k<20&&Q.length;k++)closeModal();nextBuoi()});await p.waitForTimeout(150)}
 await p.evaluate(()=>{for(let k=0;k<20&&Q.length;k++)closeModal();save()});const oldSave=await p.evaluate(()=>{const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return o});
 const oldTurn=await p.evaluate(()=>S.turn+'/'+S.tuan+'/'+S.buoi+' '+S.name);await p.close();
 const res=[];
 for(const [w,h] of [[755,1000],[1180,820]]){const c=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:2,serviceWorkers:'block'});
  await c.addInitScript(o=>{if(!sessionStorage.getItem('x')){sessionStorage.setItem('x',1);localStorage.clear();for(const k in o)localStorage.setItem(k,o[k])}},oldSave);
  const q=await c.newPage();const pe=[];q.on('pageerror',e=>pe.push(e.message));
  await q.goto(BASE+NEW);await q.waitForTimeout(2500);await q.screenshot({path:`${OUT}/title-${w}.png`});
  const loadBtn=await q.$('#slots button[data-load]');let loaded=false,turn='';
  if(loadBtn){await q.evaluate(()=>document.querySelector("#slots button[data-load]").click());await q.waitForTimeout(1500);loaded=await q.evaluate(()=>!!S&&!S.dead);turn=await q.evaluate(()=>S.turn+'/'+S.tuan+'/'+S.buoi+' '+S.name)}
  await q.screenshot({path:`${OUT}/loaded-${w}.png`});
  for(let i=0;i<12;i++){await q.evaluate(()=>{for(let k=0;k<5&&Q.length;k++){const m=Q[0];if(m.opts&&m.opts.length)chooseM((L=>L.length?L[L.length-1]:0)(m.opts.map((c,i)=>c.off?-1:i).filter(i=>i>=0)));else closeModal()}});
   const nx=await q.$('#next:not([disabled])');if(nx){await nx.click().catch(()=>{})}await q.waitForTimeout(300)}
  await q.evaluate(()=>{for(let k=0;k<20&&Q.length;k++)closeModal()});await q.waitForTimeout(300);await q.screenshot({path:`${OUT}/play-${w}.png`});
  const ovf=await q.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  res.push({size:`${w}x${h}@2`,loaded,turn,overflowX:ovf,pageErrors:pe.slice(0,5)});await c.close()}
 console.log(JSON.stringify({oldTurn,oldErrors:errs,res},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
