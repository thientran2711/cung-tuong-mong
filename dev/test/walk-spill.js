/* walk spill test (KIT 34.1d, owner 11/15 09:05Z; updated 15/11 review/khac-day-r1 for 4 buổi + the current start()): a walk longer than the khắc left spills into the next buổi.
   usage: node dev/test/walk-spill.js <site url> <W>x<H>@dpr <outdir> [oldsave.json]
   1 spill: morning, 1 khắc left, Thái y viện (2 khắc dry / 3 rain) → tap goes AT ONCE (map-tap-go 18/11: no confirm card; the buổi turn card is closed) → arrives in buổi trưa with 4-(walk-1) khắc left, sees who is there
   2 night: buổi tối (B4L), too few khắc → no spill, night rule ("Đợi sáng mai")
   3 closed: buổi chiều → Thái y viện closed in buổi tối → no spill, reason shown
   4 old save (optional) loads and the walk card still works */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,SZ,OUT,OLD]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
 const p=await ctx.newPage();await require('./lib/kopts').install(p);p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await p.waitForTimeout(2500);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;window.__forceOrigin='thd';window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const md=document.getElementById("modal");if(md)md.hidden=true;try{NLP=null}catch(e){}tab="go";render()});
 await p.waitForTimeout(1200);
 const shot=async n=>{for(let t=0;t<3;t++){try{await p.screenshot({path:`${OUT}/${n}.jpg`,type:'jpeg',quality:80});break}catch(e){await p.waitForTimeout(2000)}}};
 const card=()=>p.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return null;return{t:document.getElementById('mt').textContent,body:(document.querySelector('#mb')||{}).innerText.replace(/\s+/g,' ').slice(0,600),btns:[...new Set(__kopts().concat([...M.querySelectorAll('#mb button.ka, .dlg button')]))].map(x=>__koptText(x)).filter(Boolean)}});
 const setup=(bu,u,k)=>p.evaluate(([bu,u,k])=>{document.querySelectorAll(".kroul,#kroul,#kroulw").forEach(e=>e.remove());if(!document.getElementById("tkr")){const s=document.createElement("style");s.id="tkr";s.textContent=".kroul{display:none!important}";document.head.appendChild(s)}Q.length=0;document.getElementById('modal').hidden=true;S.place="home";S.visit={k:"home",people:homePeople(),talked:false,tk:{}};S.buoi=bu;used=u;S.wx=S.wx||{};S.wx.f=1;S.out=0;S.confined=0;window.__walkSpill=null;tab="go";render();Q.length=0;document.getElementById("modal").hidden=true;const tc=travel(S.place,k),left=4-used;j77Tap(k);return{tc,left}},[bu,u,k]);
 const R={};const B4=await p.evaluate(()=>typeof B4L==='number'?B4L:BUOI.length-1);
 /* 1 spill */
 R.spill={setup:await setup(0,3,'tyv')};await p.waitForTimeout(900);R.spill.card=await card();await shot('spill-1-card');
 for(let i=0;i<20;i++){await p.waitForTimeout(500);const st=await p.evaluate(()=>{const M=document.getElementById('modal');if(M&&!M.hidden){const t=document.getElementById('mt').textContent;const b=__kopts()[0]||M.querySelector('.dlg .btn, .dlg button.kbtn, #mclose, .dlg button');if(b)__koptGo(b);return'closed '+t}return S.place});R.spill['step'+i]=st;if(st==='tyv')break}
 await p.waitForTimeout(800);
 R.spill.after=await p.evaluate(()=>({place:S.place,buoi:S.buoi,buoiName:BUOI[S.buoi],used,left:4-used,people:(S.visit&&S.visit.people||[]).map(x=>x.name),pending:!!window.__walkSpill}));
 R.spill.pass=R.spill.after.place==='tyv'&&R.spill.after.buoi===1&&R.spill.after.left===4-(R.spill.setup.tc-R.spill.setup.left);
 await shot('spill-2-arrived');
 /* 2 night */
 R.night={setup:await setup(B4,3,'tyv')};await p.waitForTimeout(900);R.night.card=await card();await shot('spill-3-night');
 R.night.pass=(!!R.night.card&&!R.night.card.btns.some(x=>/buổi sau\)/.test(x)))||(!R.night.card&&await p.evaluate(()=>/CẤM/.test((document.getElementById('rtoast')||{}).textContent||'')));
 /* 3 closed at night */
 R.closed={setup:await setup(B4-1,3,'tyv')};await p.waitForTimeout(900);R.closed.card=await card();await shot('spill-4-closed');
 R.closed.toast=await p.evaluate(()=>({t:(document.getElementById('rtoast')||{}).textContent||'',place:S.place}));/* map-tap-go: a closed place with no real choice says why in the CẤM toast; one with a real choice (lẻn vào) still opens the card */
 R.closed.pass=(!!R.closed.card&&!R.closed.card.btns.some(x=>/buổi sau\)/.test(x))&&/không (vào )?được|đóng cửa/.test(R.closed.card.body))||(!R.closed.card&&/CẤM/.test(R.closed.toast.t)&&/đóng cửa|không|hết/.test(R.closed.toast.t)&&R.closed.toast.place==='home');
 /* 4 old save */
 if(OLD){const d=fs.readFileSync(OLD,'utf8');R.old=await p.evaluate(d=>{try{Q.length=0;document.getElementById('modal').hidden=true;localStorage.setItem(SK(2),d);const dd=loadSlot(2);if(!dd)return{err:"no save"};SLOT=2;quiet=true;deser(dd);quiet=false;deal();render();const ok=true;return{ok:ok!==false&&!!S&&!S.dead,name:S.name,place:S.place}}catch(e){return{err:e.message}}},d);
  R.old.card=await setup(0,3,'tyv');await p.waitForTimeout(700);R.old.c=await card();R.old.pass=!!(R.old.ok&&R.old.c&&R.old.c.btns.some(x=>/buổi sau\)/.test(x)))}
 console.log(JSON.stringify({R,errs},null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
