/* node dev/test/scene-phone.js OUTDIR : in-game shots of Phi tần cung (place rv) with the portrait -p paintings at 3 sizes.
   Serve the repo root on :8942 with dev/index.html copied to t-phone.html. Checks: #scimg uses <scene>-<season>-<buoi>-p.webp when the
   room view is taller than wide, feet line, no page errors, no 404. */
const {chromium}=require('playwright');const fs=require('fs');
const OUT=process.argv[2]||'dev/shots/scene-phone';fs.mkdirSync(OUT,{recursive:true});
const SIZES=[[686,880,2.2],[412,1058,2],[1180,820,2]];
(async()=>{const b=await chromium.launch();const res=[];
for(const [W,H,D] of SIZES){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,hasTouch:W<1100});const p=await ctx.newPage();
 const errs=[],bad=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.on('response',r=>{if(r.status()>=400)bad.push(r.status()+' '+r.url().split('/').pop())});
 await p.goto('http://localhost:8942/t-phone.html',{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 if(!await p.locator('[data-new]:visible').count())await p.getByRole('button',{name:/^Bắt đầu/}).first().click();await p.waitForTimeout(800);
 await p.locator('[data-new]:visible').first().click();await p.waitForTimeout(1200);
 const clear=async()=>{for(let i=0;i<16;i++){const st=await p.evaluate(()=>{const d=document.getElementById('dawn');if(d&&!d.hidden){const g=document.getElementById('dawn-go');if(g){g.click();return 1}}
  const m=document.getElementById('modal');if(!m||m.hidden)return 0;const bs=[...m.querySelectorAll('button')].filter(b=>b.offsetParent&&!b.disabled);const pr=bs.find(b=>b.dataset.nl!==undefined)||bs.find(b=>b.id==='mclose')||bs[bs.length-1];if(pr){pr.click();return 1}return 0});if(!st)return;await p.waitForTimeout(450)}};
 await clear();await p.waitForTimeout(600);await clear();
 for(const [m,bu,tag] of [[2,0,'xuan-sang'],[8,2,'thu-chieu'],[11,3,'dong-toi']]){
  await p.evaluate(([m,bu])=>{S.month=m;S.buoi=Math.min(bu,BUOI.length-1);S.place='rv';document.getElementById('modal')&&(document.getElementById('modal').hidden=true);render()},[m,bu]);
  await p.waitForTimeout(1500);
  const r=await p.evaluate(()=>{const st=document.getElementById('stage');const sr=st.getBoundingClientRect();const im=document.getElementById('scimg');
   const figs=[document.getElementById('mefig'),...document.querySelectorAll('#tokens .tok.fig img.figimg')].filter(e=>e&&e.offsetParent);
   return {stage:[Math.round(sr.width),Math.round(sr.height)],bg:(im.style.backgroundImage.match(/img\/([^")]+)/)||[])[1],pos:im.style.backgroundPosition,
    feet:figs.map(e=>Math.round(e.getBoundingClientRect().bottom-sr.top)),figH:figs.map(e=>Math.round(e.getBoundingClientRect().height)),kfa:st.__kfa}});
  res.push({size:`${W}x${H}@${D}`,tag,...r});
  await p.screenshot({path:`${OUT}/game-${W}x${H}-${tag}.jpg`,type:'jpeg',quality:82});
 }
 res.push({size:`${W}x${H}`,errors:[...new Set(errs)],http:[...new Set(bad)]});await ctx.close()}
console.log(JSON.stringify(res,null,1));await b.close()})().catch(e=>{console.log('FATAL',e.message);process.exit(1)});
