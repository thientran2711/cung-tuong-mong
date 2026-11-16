/* review/mortality UI check: the two new player-visible cards use the existing kit modal (news item / end card).
   usage: node dev/test/mortality-ui.js <outdir>  — sizes 755x1000 1000x755 1180x820 1366x1024 844x390 (+390x844 rotate prompt).
   For each size: card "Giữ mẹ hay giữ con" (her hard birth, giữ mẹ) and the end card "Xuất gia" (Emperor dies, childless low rank).
   FAIL on page errors, horizontal overflow, text outside the screen, '%' in the card. One small JPEG per card per size. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const R=path.resolve(__dirname,'../..');
const OUT=process.argv[2]||R+'/.tmp/ui';fs.mkdirSync(OUT,{recursive:true});
const SIZES=process.env.SIZES?JSON.parse(process.env.SIZES):[[755,1000],[1000,755],[1180,820],[1366,1024],[844,390],[390,844]];const DSF=+process.env.DSF||1;
(async()=>{const b=await chromium.launch();let fails=0;
 for(const [w,h] of SIZES){const ctx=await b.newContext({viewport:{width:w,height:h},deviceScaleFactor:DSF,reducedMotion:'reduce'});
  await ctx.route('http://ts.local/**',r=>{const f=R+decodeURIComponent(new URL(r.request().url()).pathname);if(!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});
   r.fulfill({status:200,contentType:/\.html$/.test(f)?'text/html; charset=utf-8':/\.json$/.test(f)?'application/json':/\.js$/.test(f)?'text/javascript':/\.webp$/.test(f)?'image/webp':'application/octet-stream',body:fs.readFileSync(f)})});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto('http://ts.local/index.html',{waitUntil:'domcontentloaded',timeout:120000});await p.waitForTimeout(4000);
  if(w<500){const t=await p.evaluate(()=>document.body.innerText.includes("Xoay ngang"));console.log(`${w}x${h} rotate prompt: ${t?"PASS":"FAIL"}`);if(!t)fails++;await ctx.close();continue}
  for(const card of ["birth","nun"]){
   await p.evaluate(card=>{try{kitRoulette=function(){};const t=document.getElementById('title');if(t)t.hidden=true}catch(e){}SLOT=3;try{store.set(NL_KEY,null)}catch(e){}start();Q.length=0;try{NLP=null}catch(e){}
    if(card==="birth"){const B=BAL.mort.birth,o=JSON.stringify(B);B.stillP=0;B.hardX=99;B.choiceP=100;B.emp.base=500;S.sung=100;S.th=80;S.preg=0;const r0=roll;roll=x=>x>=50;try{birthP(S,false)}finally{roll=r0}Object.assign(B,JSON.parse(o));Q=Q.filter(x=>x.t==="Giữ mẹ hay giữ con")}
    else{rivals.forEach(v=>v.kids=[]);S.heir=null;S.kids=[];S.rank=0;S.age=22;S.sung=10;S.mort.empWhy="Ngự thiện có độc";emperorDies("");Q=Q.filter(x=>x.cls==="end")}
    showModal();render();document.querySelectorAll('.kroul,#kroulw').forEach(e=>e.remove())},card);await p.waitForTimeout(900);
   const r=await p.evaluate(()=>{const m=document.getElementById('modal');const tx=m?m.innerText:"";const W=document.documentElement.clientWidth;let out=0;
    m&&m.querySelectorAll('*').forEach(e=>{const b=e.getBoundingClientRect();if(b.width&&(b.right>W+1||b.left<-1))out++});
    return {open:!!(m&&!m.hidden),title:tx.split("\n")[0],pct:/%/.test(tx),ovf:document.documentElement.scrollWidth>W+1,out,len:tx.length}});
   const ok=r.open&&!r.pct&&!r.ovf&&!r.out&&!errs.length;if(!ok)fails++;
   console.log(`${w}x${h} ${card}: ${ok?"PASS":"FAIL"} ${JSON.stringify(r)} ${errs.slice(0,2).join(" | ")}`);
   await p.screenshot({path:`${OUT}/${card}-${w}x${h}.jpg`,type:'jpeg',quality:45})}
  await ctx.close()}
 await b.close();console.log(fails?`FAILS ${fails}`:"ALL PASS")})().catch(e=>{console.error(e);process.exit(1)});
