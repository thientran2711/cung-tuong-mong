/* kit-size-ba.js — BEFORE | AFTER sample blocks of the KIT SIZE sheet (jksize.js kitSizeSheet).
   usage: node dev/test/kit-size-ba.js <url/index.html> <W>x<H> <outdir> <before jksize.js> <after jksize.js> [areas=frames,buttons,long]
   Renders each area once with the BEFORE code and once with the AFTER code, screenshots every sample block (h3 + its content, or one frame
   with its label) to <outdir>/blk-<tag>-<area>-<key>-{b,a}.png and prints the AFTER frame metrics (size picked, figure body px, empty px). */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,SZ,OUT,BEF,AFT,AS='frames,buttons,long']=process.argv;const [W,H]=SZ.split('x').map(Number);const TAG=process.env.TAGSZ||SZ;
async function run(INJ,suf){const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(process.env.DPR||2),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL+(URL.includes('?')?'&':'?')+'khost=0',{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}});
 for(let i=0;i<40;i++){const st=await p.evaluate(()=>{const k=document.getElementById('kroul');if(k){const b=[...k.querySelectorAll('button')].find(b=>/Bỏ qua/.test(b.textContent));if(b)b.click();return 'r'}return document.getElementById('kroulw')?'w':'n'});if(st==='n'&&i>4)break;await p.waitForTimeout(700)}
 await p.evaluate(()=>{try{nlAccept(true)}catch(e){}});await p.waitForTimeout(2500);
 await p.addStyleTag({content:'#krottip{display:none!important}#kszsheet h3,#kszsheet .kszn,#kszsheet .kszlab{max-width:600px}'});await p.addScriptTag({content:fs.readFileSync(INJ,'utf8')});
 if(W<H)await p.evaluate(()=>{document.documentElement.classList.remove('kv2');document.documentElement.classList.add('kv1')});
 const met={};
 for(const a of AS.split(',')){await p.evaluate(a=>{document.querySelectorAll('.kmov,#kroul,#kroulw,#krottip').forEach(e=>e.remove());kitSizeSheet(a)},a);await p.waitForTimeout(2500);
  await p.waitForFunction(()=>[...document.querySelectorAll('#kszsheet img')].every(i=>i.complete),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(1500);
  await p.evaluate(()=>{if(window.kszFigFit)kszFigFit(document.getElementById('kszsheet'));document.querySelectorAll('#kszsheet .kszf.kpanel').forEach(f=>kitFrameApply(f))});await p.waitForTimeout(800);
  met[a]=await p.evaluate(()=>[...document.querySelectorAll('#kszsheet .kszf.kpanel')].map(f=>{const q=f.getBoundingClientRect(),Bd=f.querySelector('.kszbody'),fs=f.querySelector('.kszfs,.kszfig>span');
   const bw=[...f.querySelectorAll('.kszopts>.kszb')].map(b=>b.getBoundingClientRect().width|0);
   return{got:f.dataset.ksz,w:q.width|0,h:q.height|0,figBoxH:fs?fs.getBoundingClientRect().height|0:null,tag:(f.querySelector('.kszfig>.kt3,.kszfig>.kszname')||{}).innerText||null,btnWidths:[...new Set(bw)],btnClasses:[...new Set([...f.querySelectorAll('.kszopts>.kszb')].map(b=>b.dataset.kbs))],hasDaHieu:/Đã hiểu|Đã rõ/.test(f.innerText),hasX:!!f.querySelector('.kit-x')}}));
  const h=await p.evaluate(()=>document.getElementById('kszsheet').scrollHeight);
  await p.evaluate(h=>{const s=document.getElementById('kszsheet');s.style.position='absolute';s.style.height=h+'px';document.body.style.height=h+'px'},h);
  await p.setViewportSize({width:W,height:Math.min(h+30,6000)});await p.waitForTimeout(1200);
  const blocks=await p.evaluate(()=>{const s=document.getElementById('kszsheet');const out=[];let cur=null;let fi=0;
   for(const el of s.children){if(el.tagName==='H2'||(el.classList.contains('kszn')&&!cur))continue;
    if(el.tagName==='H3'){let k=el.textContent.trim().split(/[ ·]/)[0];if(/^The$|^\(6\)/.test(k))k='figrow';if(/^Pictures/.test(k))k='pics';if(k==='(9)')k='narrow';cur={k,els:[el]};out.push(cur);continue}
    if(el.querySelector(':scope>[data-want]')||el.hasAttribute('data-want')){cur=null;out.push({k:'f'+(fi++),els:[el]});continue}
    if(cur)cur.els.push(el)}
   const SEL='.kszf,.kszopts,.kszskills,.kszrow>div,h3,.kszn,.kszlab';return out.map(b=>{const r=b.els.map(e=>e.getBoundingClientRect());const rr=b.els.flatMap(e=>[...(e.matches(SEL)?[e]:[]),...e.querySelectorAll(SEL)]).map(e=>e.getBoundingClientRect().right);const x=Math.min(...r.map(q=>q.left)),y=Math.min(...r.map(q=>q.top)),R=rr.length?Math.max(...rr):Math.max(...r.map(q=>q.right)),B=Math.max(...r.map(q=>q.bottom));return{k:b.k,x:Math.max(0,x-4),y:Math.max(0,y-4),w:Math.min(R+4,innerWidth)-Math.max(0,x-4),h:B-y+8}})});
  for(const bl of blocks)await p.screenshot({path:`${OUT}/blk-${TAG}-${a}-${bl.k}-${suf}.png`,clip:{x:bl.x,y:bl.y,width:bl.w,height:bl.h}});
  await p.setViewportSize({width:W,height:H});await p.evaluate(()=>{document.body.style.height=''})}
 await b.close();return{met,errs}}
(async()=>{const B=await run(BEF,'b');const A=await run(AFT,'a');console.log(JSON.stringify({TAG,before_errs:B.errs,after:A.met,after_errs:A.errs}))})().catch(e=>{console.error(e);process.exit(1)});
