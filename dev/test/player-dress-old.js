/* review/player-dress: old saves load and her picture fits her state; screenshots of the stage at one size.
   usage: node dev/test/player-dress-old.js <old build url> <new build url> <WxH@dpr> [shotdir]
   Old build writes 3 saves (slot 3..5): cung nữ rank 3 (Chưởng sự cô cô), lãnh cung, Nội vụ phủ Tân Giả khố. Each is loaded by the new
   build: no page error, stage #mefig / header portrait = her own identity in the state's dress (tm3 / cold / tm0). */
const {chromium}=require('playwright');const fs=require('fs');
const [,,OLD,NEW,SIZE,SHOT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const [wh,dpr]=(SIZE||"1180x820@1").split("@");const [W,H]=wh.split("x").map(Number);
 const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(dpr||1),hasTouch:true,isMobile:W<1000,serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(240000);
 const boot=async u=>{await p.goto(u,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof FIGS!=='undefined'&&FIGS.length>1000);await sleep(1500);
  await p.evaluate(()=>{const k=document.getElementById('kload');if(k)k.remove()})};
 await boot(OLD);
 const made=await p.evaluate(()=>{try{localStorage.clear()}catch(e){}const out=[];
  /* a life as every life since 11/14 has it: one identity (S.pid) of the 84 (set the way nlRun sets it: the Luân hồi card is skipped) */
  const K=f88Keys("all");
  const life=(o,slot,f)=>{window.__forceOrigin=o;SLOT=slot;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;NLP=null;Q.length=0;quiet=false;
   S.pid=K[(slot*29)%K.length];pidEnforce();f();save();out.push([slot,S.pid,S.srv?S.srv.rk:null,S.out||0])};
  life("cnv",3,()=>{S.srv.rk=3});life("thd",4,()=>{S.rank=2;S.out=1;S.place="lc"});life("cnv",5,()=>{S.srv.rk=0;S.srv.lau=3;S.place="tgk"});
  return out});
 await boot(NEW);const R=[];
 for(const [slot,pid,rk,out] of made){
  const r=await p.evaluate(([slot])=>{try{const d=loadSlot(slot);if(!d)return{err:'no save'};SLOT=slot;quiet=true;deser(d);quiet=false;document.getElementById('title').hidden=true;Q.length=0;
    const m=document.getElementById('modal');if(m)m.hidden=true;deal();render();const mf=document.getElementById('mefig');const hp=document.querySelector('#me-p img.kpor');
    return{pid:S.pid,srv:S.srv?{rk:S.srv.rk,lau:S.srv.lau}:null,out:S.out||0,stage:mf?mf.getAttribute('src').split('/').pop():'none',header:hp?hp.getAttribute('src').split('/').pop():'none'}}catch(e){return{err:String(e.stack).slice(0,300)}}},[slot]);
  await p.evaluate(()=>Promise.all([...document.querySelectorAll('#stage img,#me img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));await sleep(900);
  if(SHOT){fs.mkdirSync(SHOT,{recursive:true});await p.screenshot({path:`${SHOT}/pdo-${slot}-${wh}.jpg`,type:'jpeg',quality:60})}
  const want=slot===3?"-tm3-":slot===4?/-(t?cold)-/:"-tm0-";const id=String(pid||"").split(":")[1];
  const ok=!r.err&&[r.stage,r.header].every(s=>s.includes("-"+id+"-")&&(typeof want==="string"?s.includes(want)||(want==="-tm1-"):want.test(s)));
  R.push({slot,ok,made:{pid,rk,out},r})}
 const hz=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 console.log(JSON.stringify({size:SIZE,R,hOverflow:hz,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
