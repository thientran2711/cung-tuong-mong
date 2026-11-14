/* j99succ kế vị: Playwright check at one viewport.
   usage: node dev/test/succession.js <URL of built page> <W>x<H>@dpr <outdir> [path a|b|c|all]
   Scenes: choice card for each path (rows Cần/Tốn/Được/Kèm, disabled reasons), play each epilogue to its ending,
   save+reload mid-epilogue keeps the chapter, old save without S.succ loads. */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT,ONLY]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const tag=SZ.replace('@','_');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push('console: '+m.text())});
 const res=[];
 const check=name=>p.evaluate(name=>{const M=document.getElementById('modal');const vw=innerWidth;const bad=[];
  if(!M||M.hidden)return{name,modal:false};
  M.querySelectorAll('.kptitle,.ka,.ka *,.kpb p,.kfacts *').forEach(e=>{const q=e.getBoundingClientRect();if(!q.width)return;if(q.left<-1||q.right>vw+1)bad.push('out:'+(e.className||e.tagName)+':'+e.textContent.slice(0,24));
   const cs=getComputedStyle(e);if(e.scrollWidth>e.clientWidth+1&&cs.overflow!=='visible'&&cs.overflowX!=='visible')bad.push('clip:'+(e.className||e.tagName)+':'+e.textContent.slice(0,24))});
  const opts=[...M.querySelectorAll('.opts .opt')].map(o=>({t:(o.querySelector('.kan')||o).textContent.trim().slice(0,50),dis:o.disabled,rows:[...o.querySelectorAll('.kr .krl')].map(x=>x.textContent.trim()),odds:(o.querySelector('.kodds')||{}).textContent||'',why:[...o.querySelectorAll('.kr-why .kwhy')].map(x=>x.textContent.trim()).slice(0,8)}));
  const txt=M.innerText;return{name,modal:true,title:(M.querySelector('.kptitle')||document.getElementById('mt')).textContent,overflowX:document.documentElement.scrollWidth>vw,bad,opts,
   pct:/%/.test(txt),chacchan:/Chắc chắn/.test(txt),ell:/…/.test(txt)}},name);
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const fresh=async()=>{await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();});await p.waitForTimeout(600);
  await p.evaluate(()=>{try{if(typeof nlAccept==='function')nlAccept(false)}catch(e){}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});await p.waitForTimeout(500)};
 const choose=async i=>{await p.evaluate(i=>chooseM(i),i);await p.waitForTimeout(350)};
 const paths=ONLY&&ONLY!=='all'?[ONLY]:['a','b','c','none'];
 for(const P of paths){await fresh();
  await p.evaluate(P=>succDebug(P==='none'?'':P,1),P);await p.waitForTimeout(1500);await p.evaluate(()=>document.querySelectorAll('.kmedict').forEach(e=>e.click()));await p.waitForTimeout(1200);await p.evaluate(()=>document.querySelectorAll('.kmedict').forEach(e=>e.remove()));
  await p.evaluate(P=>succDebug(P==='none'?'':P),P);await p.waitForTimeout(900);
  const c=await check('card-'+P);res.push(c);await p.screenshot({path:`${OUT}/card-${P}-${tag}.png`});
  if(P==='none')continue;
  /* pick the path; for b/c force the roll to succeed */
  const idx={a:0,b:1,c:2}[P];await p.evaluate(()=>{window.__r0=Math.random;Math.random=()=>0.01});await choose(idx);await p.evaluate(()=>{Math.random=window.__r0});
  for(let ch=0;ch<3;ch++){const r=await check(`ch${ch+1}-${P}`);res.push(r);await p.screenshot({path:`${OUT}/ch${ch+1}-${P}-${tag}.png`});
   if(ch===1&&P==='b'){/* save + reload mid-epilogue */await p.evaluate(()=>save());await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
    await p.evaluate(()=>{const d=loadSlot(3);deser(d);SLOT=3;document.getElementById('title').hidden=true;showModal();render()});await p.waitForTimeout(600);
    res.push(Object.assign(await check('reload-b'),{succ:await p.evaluate(()=>S.succ&&{p:S.succ.p,ch:S.succ.ch})}))}
   await p.evaluate(()=>{const m=Q[0];const i=m.opts.findIndex(o=>!(o.need||[]).some(n=>!n.ok)&&!o.rare);chooseM(i)});await p.waitForTimeout(400)}
  const end=await p.evaluate(()=>({dead:S.dead,title:document.getElementById('mt').textContent,kiep:(store.get('cung-kiep')||[])[0],book:localStorage.getItem('ctm-succ-book')}));
  res.push(Object.assign(await check('end-'+P),{end}));await p.screenshot({path:`${OUT}/end-${P}-${tag}.png`});
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true})}
 /* old save (no S.succ) loads and a turn passes */
 await fresh();const old=await p.evaluate(()=>{save();const d=JSON.parse(localStorage.getItem(SK(3)));delete d.S.succ;localStorage.setItem(SK(3),JSON.stringify(d));deser(loadSlot(3));render();try{endTurn()}catch(e){return 'err '+e.message}return {ok:true,turn:S.turn,dead:S.dead}});
 res.push({name:'old-save',old});
 console.log(JSON.stringify({tag,errs,res},null,1));await b.close()})();
