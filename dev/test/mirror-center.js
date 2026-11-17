/* mirror-center (owner 17/11 ~18:00Z): in the makeup close-up the face must sit in the middle of the mirror glass.
   usage: node dev/test/mirror-center.js <url> <WxH@dpr> <shotdir|-> [looks=dep,diem]
   prints per look: face-axis x (eye midpoint of img/mk-fit) vs glass centre x vs screen centre x, px and % of the face width; FAILs when |face - glass| > 3 % of the face width or > 8 px */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,VP,DIR,LK]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@1');const W=+m[1],H=+m[2],DPR=+m[3];
const P={w:1200,h:800,bx:.52,gx:628/1200};/* img/toil-mirror-room.webp, .ktrv-plate background-position-x, glass centre (measured) */
if(DIR&&DIR!=='-')fs.mkdirSync(DIR,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,serviceWorkers:'block'});await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(180000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true})});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:120000});
  if(await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out))break}
 await p.waitForTimeout(1500);
 await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;S.buoi=0;used=0;S.suc=90;S.sac=Math.max(S.sac,55);deal();render();while(Q.length){Q.length=0}try{closeModal()}catch(e){}const mo=document.getElementById('modal');if(mo)mo.hidden=true;render()});await p.waitForTimeout(800);
 const out={vp:VP,rows:[]};let bad=0;
 for(const lk of (LK||'dep,diem').split(',')){
  await p.evaluate(()=>{window.__done=0;kmBusy=false;OPT.fxon=true;OPT.fxpick=1});
  await p.evaluate(([lk])=>{S.toilette={day:toilWk()*10,wk:toilWk(),score:80,makeup:true,style:'fit',dv:'chinh',F:0,occ:[],look:lk,col:toilColFix(null)};S.toilette.col.seed=toilWk();
   TOIL.test_rev=1;toilReveal({manual:1,look:lk,made:true,score:80,good:lk==='dep',pre:''},()=>{window.__done=1})},[lk]);
  await p.waitForSelector('.ktrv',{timeout:20000});await p.waitForFunction(()=>document.querySelector('.ktrv.ktrv-in'));await p.waitForTimeout(1500);
  await p.evaluate(()=>TOIL_REV.zoom());await p.waitForTimeout(1900);
  const r=await p.evaluate(([P])=>{const R=document.querySelector('.ktrv').getBoundingClientRect(),pw=document.querySelector('.ktrv-pw'),q=pw.getBoundingClientRect(),pl=document.querySelector('.ktrv-plate').getBoundingClientRect();
   const pf=kitFile(toilPor().src),e=MK_FIT.get(pf);if(!e||e.length<80)return{err:'no mesh for '+pf};let ax=0;for(const s0 of[20,30])for(let i=0;i<10;i++)ax+=e[2*(s0+i)];const axP=ax/20/4000;/* eye midpoint of the face-mesh, share of the picture width (same as toilAxisX; own copy so the test also runs on a build without it) */
   const ps=Math.max(R.width/P.w,R.height/P.h),RWc=document.querySelector('.ktrv').offsetWidth,RHc=document.querySelector('.ktrv').offsetHeight,s2=Math.max(RWc/P.w,RHc/P.h),gxIn=((RWc-P.w*s2)*P.bx+P.gx*P.w*s2)/RWc;
   const face=q.left+axP*q.width,glass=pl.left+gxIn*pl.width,scr=R.left+R.width/2,fwpx=TOIL_FIT.fit[pf][6]/100*q.width/ (TOIL_FIT.fit[pf][6]/100) * (TOIL_FIT.fit[pf][6]/100);
   return{face:+face.toFixed(1),glass:+glass.toFixed(1),scr:+scr.toFixed(1),fw:+fwpx.toFixed(1),file:pf}},[P]);
  if(r.err){out.rows.push({lk,err:r.err});bad++}else{r.dGlass=+(r.face-r.glass).toFixed(1);r.dScr=+(r.face-r.scr).toFixed(1);r.pct=+(100*r.dGlass/r.fw).toFixed(1);if(Math.abs(r.dGlass)>Math.max(8,.03*r.fw))bad++;out.rows.push(Object.assign({lk},r))}
  if(DIR&&DIR!=='-')await p.screenshot({path:`${DIR}/mc-${W}x${H}-${lk}.jpg`,quality:60});
  await p.click('.ktrv-ov>.kmend');await p.waitForFunction(()=>window.__done===1,null,{timeout:8000}).catch(()=>{});await p.waitForTimeout(400)}
 out.errs=errs;out.bad=bad;console.log(JSON.stringify(out));await b.close();process.exit(bad||errs.length?1:0)})();
