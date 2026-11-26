/* review/reign-end stills: each reign-end card + each end screen + the j99succ card after an abdication, on the two owner devices.
   usage: node dev/test/reignend-shots.js <file> <outdir>   (Fold 755x1000 + iPad 1180x820, deviceScaleFactor 2) */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const [,,F,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();
 for(const [W,H,tag] of [[755,1000,'fold'],[1180,820,'ipad']]){
  const shotOne=async(name,setup)=>{const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
   await p.goto('file://'+path.resolve(F),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.reDbg,null,{timeout:120000});await p.waitForTimeout(1500);
   await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<60;i++){start();if(S.ps&&!isSrv())break}});
   for(let i=0;i<40;i++){const bt=await p.$('#kload button');if(bt){try{await bt.click()}catch(e){}break}await p.waitForTimeout(500)}
   await p.waitForTimeout(4000);
   await p.evaluate(()=>{try{kmReset()}catch(e){}Q.length=0;const md=$('modal');md.hidden=true;md.className='modal';['kdaytc','kload'].forEach(id=>{const e=document.getElementById(id);if(e)e.remove()});
    S.year=S.reign.y0+12;S.emp.age=34;const T=trS();T.H["Hộ bộ"].pow=82;T.bien=30;T.kho=30;
    const v=liveRivals(false)[0];v.clan="Hộ bộ";v.sung=70;const k=mkKid("m",16);k.name="Hoàng tử Minh";(v.kids=v.kids||[]).push(k);S.bac=Math.max(S.bac,200);render()});
   await p.waitForTimeout(800);await p.evaluate(setup);await p.waitForTimeout(1500);await p.evaluate(()=>{try{document.querySelectorAll('.kmov,#kmrew,#kpodov').forEach(e=>e.remove())}catch(e){}});await p.waitForTimeout(2000);
   await p.screenshot({path:`${OUT}/${name}-${tag}.png`});console.log(name,tag,errs.slice(0,2).join(' | '));await ctx.close()};
  for(const k of ['abd','phe','coup'])await shotOne('card-'+k,new Function(`try{kmReset()}catch(e){}reDbg.F('Hộ bộ').ev=6;reDbg.card('${k}',${k==='abd'?'null':"'Hộ bộ'"});showModal()`));
  for(const k of ['abd','phe','coup'])await shotOne('end-'+k,new Function(`S.heir=null;const T=trS();if(S.mort){S.mort.empDue=null;S.emp.tho=200}
    if('${k}'==='abd'){S.re=S.re||{a:0,F:{},seen:{},her:0};S.re.a=99.9;S.re.seen.abd=1;T.H["Hộ bộ"].pow=40}
    if('${k}'==='phe'){T.H["Hộ bộ"].pow=90;const f=reDbg.F('Hộ bộ');f.ev=8;f.pm=BAL.re.phe.mo-1;f.her=200;BAL.re.coup.pow=200}
    if('${k}'==='coup'){T.H["Hộ bộ"].pow=95;const f=reDbg.F('Hộ bộ');f.pl=BAL.re.coup.mo-1;f.her=200}
    for(let n=0;n<3&&!S.dead;n++){try{kmReset()}catch(e){}monthTick();Q=Q.filter(m=>/^succ/.test(m.pid||''))}try{kmReset()}catch(e){}render()`));
  await shotOne('succ-abd',()=>{S.rank=7;const k=mkKid("m",15);k.name="Hoàng tử Khang";S.kids.push(k);S.heir={k,v:null};S.re=S.re||{a:0,F:{},seen:{},her:0};S.re.a=99.9;S.re.seen.abd=1;if(S.mort){S.mort.empDue=null;S.emp.tho=200}
   for(let n=0;n<3&&!(S.succ&&S.succ.on);n++){try{kmReset()}catch(e){}monthTick()}try{kmReset()}catch(e){}showModal()});
 }
 await b.close()})();
