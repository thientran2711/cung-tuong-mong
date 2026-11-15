/* NPC art audit (owner 16:40Z "every side character must have a figure"): starts a game, visits every place on the map (several
   game states), and lists every person token that shows NO full-body figure (no .fig) — with kind, name and whether a portrait exists.
   usage: NODE_PATH=$(npm root -g) node dev/test/npc-art-audit.js <url> <outdir> */
const {chromium}=require('playwright');
const [,,URL,OUT]=process.argv;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1280,height:800},serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();p.setDefaultTimeout(300000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof goTo==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;render()});
 await p.waitForFunction(()=>typeof FIGS!=='undefined'&&FIGS.length>0,null,{timeout:120000}).catch(()=>{});
 const states=['early','fallen-rival'];const out=[];
 for(const st of states){
  const keys=await p.evaluate(st=>{if(st==='fallen-rival'){const v=rivals.find(v=>v.alive&&!v.queen);if(v){v.out=1}}return ['home'].concat(places().map(x=>x.k))},st);
  for(const k of keys){
   const r=await p.evaluate(k=>{try{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;S.out=0;S.confined=0;S.dead=0;try{used=0}catch(e){}S.buoi=1;S.suc=100;S.sung=Math.max(S.sung,60);
    S.place='home';goTo(k);return {ok:true,n:(S.visit&&S.visit.people||[]).length}}catch(e){return {ok:false,e:String(e).slice(0,120)}}},k);
   await p.waitForTimeout(900);
   const res=await p.evaluate(()=>{const ppl=curPeople();return [...document.querySelectorAll('#tokens .tok')].map(t=>{const pp=ppl[+t.dataset.p]||{};const im=t.querySelector('.md img,.md');
     let por='';try{por=figFor(pp,'por')}catch(e){}let fig='';try{fig=figFor(pp)}catch(e){}
     return {kind:pp.kind||'?',name:pp.name||t.textContent.trim().slice(0,30),fig:t.classList.contains('fig'),figSrc:fig?fig.split('/').pop():'',por:por?por.split('/').pop():''}})});
   for(const x of res)out.push({state:st,place:k,...x});
   if(res.some(x=>!x.fig&&x.kind!=='kid'&&x.kind!=='chest'))await p.screenshot({path:`${OUT}/${st}-${k}.jpg`,type:'jpeg',quality:70});
  }}
 const miss=out.filter(x=>!x.fig&&x.kind!=='kid'&&x.kind!=='chest');
 const seen={};for(const x of miss){const id=x.kind+'|'+x.name;(seen[id]=seen[id]||{...x,places:[]}).places.push(x.state+':'+x.place)}
 console.log(JSON.stringify({tokens:out.length,withFig:out.filter(x=>x.fig).length,missing:Object.values(seen),errors:[...new Set(errs)].slice(0,8)},null,1));
 require('fs').writeFileSync(`${OUT}/audit.json`,JSON.stringify(out,null,1));await b.close()})();
