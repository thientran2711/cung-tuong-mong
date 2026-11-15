/* place-stay test (owner 11/15 06:35Z–06:45Z): when the khắc run out at a place the buổi turns over but she STAYS there.
   A: afternoon, last khắc spent walking to Kính sự phòng (3 people put there) → arrival stage → evening still at Kính sự phòng, note line.
   B: at Ngự hoa viên, a normal act takes the last khắc → next buổi still at Ngự hoa viên.
   C: Dư đồ → tap the place she is at → its stage (phone shell room view), "‹ <place>" button label, the button returns to that stage.
   usage: node dev/test/place-stay.js <url of a build at the site root> <W>x<H>@dpr <outdir> <tag> */
const {chromium}=require('playwright');
const [,,URL,SZ,OUT,TAG]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();p.setDefaultTimeout(300000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 const clean=()=>p.evaluate(()=>{['kload','kroul','dawn'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()})});
 const shot=async n=>{await clean();for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:82,timeout:120000});return}catch(e){await p.waitForTimeout(3000)}}};
 const st=()=>p.evaluate(()=>({buoi:S.buoi,used,place:S.place,visitK:S.visit&&S.visit.k,people:(S.visit&&S.visit.people||[]).map(x=>x.name||x.kind).slice(0,6),msg:(S.visit&&S.visit.msg||"").replace(/<[^>]+>/g,"").slice(0,160),
  tab,home:document.querySelector(".game").classList.contains("k3home"),room:(document.getElementById('k3room')||{}).textContent||"",roomHidden:(document.getElementById('k3room')||{}).hidden,modal:!document.getElementById('modal').hidden?document.getElementById('mt').textContent:""}));
 const R={};
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}Q.length=0;document.getElementById('modal').hidden=true;try{NLP=null}catch(e){}render()});
 await clean();await p.waitForTimeout(1200);
 /* A */
 R.A0=await p.evaluate(()=>{S.week=S.week;S.buoi=1;S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.confined=0;S.out=0;const tc=travel("home","ksp");used=4-tc;
  const L=liveRivals(false).filter(v=>v.alive&&!v.out&&!v.confined).slice(0,3);L.forEach(v=>S.where[v.id]="ksp");tab="go";render();
  const a=accessOf(S,"ksp");j77Tap("ksp");return{tc,acc:a.ok,why:a.why||"",card:document.getElementById('mt').textContent,names:L.map(v=>v.name)}});
 await p.waitForTimeout(1200);await shot('A1-card');
 await p.evaluate(()=>{if(Q[0]&&Q[0].opts){const i=Q[0].opts.findIndex(o=>o.n==="Đi");if(i>=0)chooseM(i)}});await p.waitForTimeout(500);
 R.A1=await st();await shot('A2-arrive');
 await p.waitForTimeout(4500);R.A2=await st();await shot('A3-evening');
 /* B */
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;S.buoi=0;used=0;S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};tab="go";render();goTo("vuon")});await p.waitForTimeout(1500);
 await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;render()});
 R.B0=await st();await p.evaluate(()=>{used=3;spend(1);render()});await p.waitForTimeout(4500);await p.evaluate(()=>{if(Q.length){Q.length=0;document.getElementById('modal').hidden=true;render()}});R.B1=await st();await shot('B-next-buoi');
 /* C */
 await p.evaluate(()=>{const b=document.querySelector('#tabs [data-tab="go"]');if(b)b.click();else{tab="go";render()}});await p.waitForTimeout(1500);R.C0=await st();await shot('C0-map');
 await p.evaluate(()=>{j77Tap(S.place)});await p.waitForTimeout(1500);R.C1=await st();await shot('C1-tap-here');
 await p.evaluate(()=>{const b=document.querySelector('#tabs [data-tab="act"]');if(b)b.click()});await p.waitForTimeout(1200);R.C2=await st();await shot('C2-panel');
 await p.evaluate(()=>{const b=document.getElementById('k3room');if(b&&!b.hidden)b.click()});await p.waitForTimeout(1200);R.C3=await st();await shot('C3-back');
 R.hovf=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 console.log(JSON.stringify({TAG,R,errs},null,0));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
