/* owner OD:L555: the colours she picked show on her portrait AND figure ALL DAY, every place her face/figure appears.
   Sets a vụng/diêm dúa/đẹp day, walks every tab, and lists every picture of HER (por-/fig- of her face) that has no makeup layer next to it.
   usage: node dev/test/toil-allday.js <url> <WxH@dpr> */
const {chromium}=require('playwright');const [,,URL,VP]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@1');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+m[1],height:+m[2]},deviceScaleFactor:+m[3],serviceWorkers:'block'});const p=await ctx.newPage();p.setDefaultTimeout(120000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof toilMakeup==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true});start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.origin,null,{timeout:120000});await p.waitForTimeout(3000);
 for(const lk of ['vung','diem','dep']){
  await p.evaluate(lk=>{Q.length=0;try{closeModal()}catch(e){}document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove());const c=toilColFix(null);c.seed=toilWk();S.toilette={day:toilWk()*10,wk:toilWk(),score:lk==='dep'?85:30,makeup:true,style:'fit',dv:'chinh',F:0,occ:[],look:lk,col:c};TOIL.prev=null;toilMkPre();render()},lk);await p.waitForTimeout(3500);
  const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs button,.ktabs button,nav button,.kbar button')].map(b=>b.textContent.trim()).filter(Boolean).slice(0,12));
  const res={};
  for(const t of ['']. concat(tabs)){
   if(t)await p.evaluate(t=>{const b=[...document.querySelectorAll('button')].find(x=>x.textContent.trim()===t&&x.offsetParent);if(b)b.click()},t);await p.waitForTimeout(900);
   res[t||'(start)']=await p.evaluate(()=>{const f=String(toilPor().src).split('?')[0].split('/').pop().replace(/^por-/,'').replace(/-t\d.*|-tm\d.*|-ty\d.*|-kc.*|-ngheo.*|-tcold.*/,'');const bad=[],ok=[];
    document.querySelectorAll('img').forEach(i=>{const s=i.currentSrc||i.src||'';if(!s.includes(f)||!/(por|fig)-/.test(s))return;const r=i.getBoundingClientRect();if(r.width<10||!i.offsetParent&&getComputedStyle(i).position!=='fixed')return;
     const host=i.parentElement;const has=host&&host.querySelector('img.kmkl,.kfxf img.kmkl,.kfxf');(has?ok:bad).push((i.className||'img')+' '+(host&&host.className||'')+' '+(r.width|0)+'x'+(r.height|0))});return{ok:ok.length,bad}})}
  console.log(lk,JSON.stringify(res))}
 await b.close()})();
