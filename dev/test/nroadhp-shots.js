/* nroadhp-shots (QUESTLINE Q2): Mệnh truyện › «Phụ tuyến» list on the owner's two devices (Fold 755x1000@2, iPad 1180x820@2) after three
   real help hồi played through j72 (help → won chapter, betrayal → lost chapter + found out, help → road closed with the finale reward).
   Shots go to <outdir> (outside git). usage: node dev/test/nroadhp-shots.js <url> <outdir> */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL0,OUT0]=process.argv;const URL=URL0||'http://127.0.0.1:8731/index.html',OUT=OUT0||'/tmp/nroadhp-shots';
(async()=>{fs.mkdirSync(OUT,{recursive:true});const b=await chromium.launch();const errs=[];
 for(const [nm,W,H] of [['fold',755,1000],['ipad',1180,820]]){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,serviceWorkers:'block'});const p=await ctx.newPage();
  p.on('pageerror',e=>errs.push(e.message));await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof nhHp==='function',null,{timeout:120000});await p.waitForFunction(()=>!document.getElementById('kload'),null,{timeout:30000}).catch(()=>{});await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove();try{kitRoulette=o=>{try{o&&o.done&&o.done()}catch(e){}}}catch(e){}});await p.waitForTimeout(1500);
  const info=await p.evaluate(()=>{try{document.getElementById('title').hidden=true}catch(e){}window.__sqoff=1;/* sideq-trim: content test of the help quests, any asker (the rank gate has its own test, sideq-optscan) */quiet=true;window.__forceOrigin='muoi';start();quiet=false;Q.length=0;
   const L=liveRivals(false).filter(v=>!v.queen);const roll0=roll;const res=[];
   const help=(v,w,oi,win,fin)=>{v.nr=null;nrInit(v);v.nr.c=w.id;S.met=S.met||{};S.met[v.id]=S.turn;S.bac=999;S.suc=90;used=0;const q=q72();q.a.length=0;q.ch.length=0;
    if(fin){let n=0;for(let i=BAL.road.first-1;i<=BAL.road.last;i++)if(nrCh(v.nr.r,i)){n=i;v.nr.l.push([i,1])}v.nr.l.pop();v.nr.n=n}
    const x=q72Make(T72I['nr_thu'],q72A('rv',v.id));x.bk='rv';x.bi=w.id;x.p={nr:v.nr.r,nn:v.nr.n};v.nr.hs=1;q.a.push(x);let t=0;roll=()=>true;while(q.a.includes(x)&&t++<12){used=0;S.suc=90;Q.length=0;q72Do(x.u,oi)}
    for(const u of rivals)if(u.nr&&u!==v)u.nr.t=S.turn+99;v.nr.t=S.turn;roll=()=>win;nrMonth();roll=roll0;if(oi===2){roll=()=>true;S.turn++;nhSbMonth();roll=roll0}res.push(v.name)};
   help(L[0],L[3],0,true,false);help(L[1],L[3],2,false,false);help(L[2],L[3],0,true,true);KTSUB.story='pt';tab='story';render();
   return{res,n:nhList().length}});
  await p.waitForTimeout(1500);await p.evaluate(()=>{['kroul','kroulw','dawn','kload','klife','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove());for(let j=0;j<20&&Q.length;j++)closeModal();Q.length=0;$('modal').hidden=true;KTSUB.story='pt';tab='story';render()});await p.waitForTimeout(800);const f=`${OUT}/phu-tuyen-${nm}.png`;await p.screenshot({path:f,fullPage:false});
  const ov=await p.evaluate(()=>{const P=document.querySelector('#panel');return{sw:document.documentElement.scrollWidth,cw:document.documentElement.clientWidth,cards:P?P.querySelectorAll('.kskill').length:0}});
  console.log(nm,JSON.stringify(info),JSON.stringify(ov),f);await ctx.close()}
 console.log('page errors:',errs.length,errs.slice(0,3).join(' | '));await b.close()})();
