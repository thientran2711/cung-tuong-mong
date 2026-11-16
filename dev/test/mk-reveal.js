/* D28 makeup final-look reveal (KIT §60.5): every look at the phases step-in / effect / zoom / card; overflow + errors.
   usage: node dev/test/mk-reveal.js <url> <WxH@dpr> <shotdir> [looks=moc,vua,dep,tuyet,diem,vung] */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,VP,DIR,LK]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');const W=+m[1],H=+m[2],DPR=+m[3];const tag=`${W}x${H}`;
fs.mkdirSync(DIR,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,serviceWorkers:'block'});await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(180000);const out={vp:VP};
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true})});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:120000});
  const ok=await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out);if(ok)break}
 await p.waitForTimeout(1500);
 await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;S.buoi=0;used=0;S.suc=90;S.sac=Math.max(S.sac,55);deal();render()});
 await p.evaluate(()=>{while(Q.length){Q.length=0}try{closeModal()}catch(e){}const m=document.getElementById('modal');if(m)m.hidden=true;render()});await p.waitForTimeout(800);
 /* 1. morning: the card is in Hành sự and the chip is in the top bar */

 const looks=(LK||'moc,vua,dep,tuyet,diem,vung').split(',');out.res={};
 for(const lk of looks){
  await p.evaluate(()=>{window.__done=0;kmBusy=false;OPT.fxon=!/still/.test(location.hash);OPT.fxpick=1});
  await p.evaluate(([lk])=>{const made=lk!=='moc';S.toilette={day:toilWk()*10,wk:toilWk(),score:made?80:0,makeup:made,style:'fit',dv:'chinh',F:0,occ:[],look:lk==='dep'||lk==='diem'||lk==='vung'?lk:null,col:toilColFix(null)};if(made)S.toilette.col.seed=toilWk();
   const col=toilColFix(null);TOIL.test_rev=1;toilReveal({manual:1,look:lk,made,score:80,good:lk==='dep'||lk==='tuyet',pre:made?toilPreName(S.toilette.col,S.toilette.look):''},()=>{window.__done=1})},[lk]);
  await p.waitForSelector('.ktrv',{timeout:20000});
  const r={};await p.waitForFunction(()=>document.querySelector('.ktrv.ktrv-in'));await p.waitForTimeout(1300);await p.screenshot({path:`${DIR}/rev-${tag}-${lk}-1.jpg`,quality:60});
  await p.evaluate(()=>TOIL_REV.fx());await p.waitForTimeout(1200);await p.screenshot({path:`${DIR}/rev-${tag}-${lk}-2fx.jpg`,quality:60});
  await p.evaluate(()=>TOIL_REV.go());await p.waitForTimeout(500);await p.screenshot({path:`${DIR}/rev-${tag}-${lk}-2b.jpg`,quality:60});
  await p.evaluate(()=>TOIL_REV.zoom());await p.waitForTimeout(1800);await p.screenshot({path:`${DIR}/rev-${tag}-${lk}-3zoom.jpg`,quality:60});
  r.card=await p.evaluate(()=>{const c=document.querySelector('.ktrv-card');const r=c.getBoundingClientRect();const z=document.querySelector('.ktrv-fw img').getBoundingClientRect();return{round:!!document.querySelector('.ktrv .kfzoom'),card:[r.left|0,r.top|0,r.right|0,r.bottom|0],zoom:[z.left|0,z.top|0,z.right|0,z.bottom|0],op:getComputedStyle(c).opacity,txt:c.innerText.replace(/\n/g,' | '),over:c.scrollWidth>c.clientWidth+1,vw:[innerWidth,innerHeight],layers:document.querySelectorAll('.ktrv-zoom .kfxf img,.ktrv-zoom .kfxf svg,.ktrv-fw .kfxf *').length}});
  r.hov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
  await p.click('.ktrv-ov>.kmend');/* KIT 81: the scene-end button closes, no tap on the scene */await p.waitForFunction(()=>window.__done===1,null,{timeout:8000}).catch(()=>{});r.done=await p.evaluate(()=>window.__done);await p.waitForTimeout(400);
  r.gone=await p.evaluate(()=>!document.querySelector('.ktrv'));out.res[lk]=r}
 out.errs=errs;console.log(JSON.stringify(out));await b.close()})();
