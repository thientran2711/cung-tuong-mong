/* review/charge-evidence (D4) — real taps on the real page, LIVE vs branch (same steps on both):
   1. she sends her maid «Sai đi dò la» on a consort who really poisoned someone (one deed, charge Mưu hại) — the picker card (real tap),
      its «Tìm chứng» line, each result line, the pieces after each search;
   2. her evidence card (kit panel) → «Tố giác» by a real tap once the charge is full → the result + the punishment by charge;
   3. two-way: a consort who holds pieces of ONE of her wrongs accuses her → her notice names the charge (closed by real taps).
   usage: node dev/test/charge-taps.js <url> [W=755] [H=1000] [videoDir] [label]. Prints a JSON summary line «SUMMARY {...}». */
const {chromium}=require('playwright');const [,,URL,W='755',H='1000',VID,LAB='branch']=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:+W,height:+H},deviceScaleFactor:1,serviceWorkers:'block',...(VID?{recordVideo:{dir:VID,size:{width:+W,height:+H}}}:{})});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.goto(URL,{waitUntil:'domcontentloaded'});for(let i=0;i<300;i++){if(await p.evaluate(()=>typeof start==='function'&&!!window.__ctmBuilt).catch(()=>false))break;await sleep(300)}
 await p.evaluate(()=>{window.__bot=1;localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();for(let i=0;i<60&&isSrv();i++)start();window.__nlInner=0;quiet=false});await sleep(1500);
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw,#kload,#kboot,#klife,.kroul,.kmov').forEach(e=>e.remove());Q.length=0;try{closeModal()}catch(e){}render()});
 const shot=async n=>{if(VID)await p.screenshot({path:`${VID}/${LAB}-${W}-${n}.png`})};
 async function drain(max=10){const seen=[];for(let i=0;i<max;i++){const q=await p.evaluate(()=>Q.length);if(!q)break;
   const info=await p.evaluate(()=>{showModal();const M=document.getElementById('modal');return {t:Q[0]&&Q[0].t||'',body:M.innerText.replace(/\s+/g,' ').slice(0,900)}});seen.push(info);await sleep(900);
   const btn=await p.$('#modal:not([hidden]) #mr .kbtn')||await p.$('#modal:not([hidden]) #mr button')||await p.$('#modal:not([hidden]) .kpopts button, #modal:not([hidden]) .opts button');
   if(btn){await btn.click({timeout:3000}).catch(async()=>{await p.evaluate(()=>closeModal())})}else await p.evaluate(()=>closeModal());await sleep(400)}return seen}
 /* setup (same on LIVE): v really poisoned w (one deed); she is Tần with Tâm cơ 40; v Tâm cơ 40, Quý nhân */
 const su=await p.evaluate(()=>{window.__r0=Math.random;S.rank=3;const L0=(typeof spyList==='function'?spyList():liveRivals(true)).filter(x=>!x.queen&&!x.out);const L=L0.filter(x=>!sameHouse(S,x)&&x.rank<5);const v=L[0],w=L[1];
  for(const x of [v,w,S]){x.wrongs=[];x.dw=0;x.schemes=0;x.dws=0;x.dkeys=[];if(x!==S){x.scandal=0;x.affair=null;x.plan=null;x.inv=[];x.dress=null}}
  v.ev=0;v.evc={};S.evc={};S.evq={};v.tamco=40;S.tamco=40;S.rank=3;S.bac=500;S.suc=100;S.out=0;S.confined=0;
  deedAdd(v,"poison",w,2,`bỏ độc vào điểm tâm của ${w.name}`);if(typeof k61Know==="function")try{k61Know(v,"",true,2)}catch(e){}S.met=S.met||{};S.met[v.id]=S.turn;S.mspy={id:v.id};
  return {v:v.id,vn:v.name,w:w.id,wn:w.name}});
 console.log('setup',JSON.stringify(su));
 const out={label:LAB,searches:[],accuse:null,herNotice:null};
 /* 1. searches by real taps on the maid picker */
 for(let i=0;i<14;i++){const can=await p.evaluate(id=>accOK(S,RV(id)),su.v);if(can)break;
  await drain();await p.evaluate(()=>{S.suc=100;used=0;if(typeof spyPick==="function")spyPick(0)});await sleep(700);if(i===0)await shot('picker');
  const idx=await p.evaluate(id=>{const q=Q[0];window.__qdbg=JSON.stringify(Q.map(x=>[x.t,(x.opts||[]).map(o=>o.kgt&&o.kgt.id)]));return q&&q.opts?q.opts.findIndex(o=>o.kgt&&o.kgt.id===id):-1},su.v);
  const BT=p.locator('#modal:not([hidden]) .opts > button, #modal:not([hidden]) .kpopts > button');const nb=await BT.count();
  if(idx<0||idx>=nb){out.searches.push({i,card:`(no picker card idx ${idx}/${nb}) `+await p.evaluate(()=>window.__qdbg)});break}
  const btnL=BT.nth(idx);await btnL.scrollIntoViewIfNeeded();await sleep(500);if(i===0)await shot('picker-card');const card=(await btnL.innerText()).replace(/\s+/g,' ');
  const btn={asElement:async()=>btnL};
  await btnL.click();await sleep(900);/* the maid walks there (jptime): wait for her return = the game's «Chờ» (ptWait), then her report */await p.evaluate(()=>{try{if(typeof ptWait==='function')ptWait();if(typeof ptTick==='function')ptTick()}catch(e){}render()});await sleep(900);if(i===0)await shot('report');const after=await p.evaluate(()=>({q:Q.map(x=>x.t),m:document.getElementById('modal').hidden?'':document.getElementById('modal').innerText.replace(/\s+/g,' ').slice(0,300)}));const seen=await drain();
  const st=await p.evaluate(id=>{const v=RV(id);return {ev:v.ev||0,mh:typeof chHave==="function"?chHave(S,v,"mh"):null,log:(S.logs||[]).slice(0,3).join(' | ').replace(/<[^>]+>/g,'').slice(0,400)}},su.v);
  out.searches.push({i,after,card:card.slice(0,400),ev:st.ev,mh:st.mh,log:st.log,seen:seen.map(x=>x.t)})}
 /* 2. her evidence card → Tố giác by a real tap */
 await p.evaluate(id=>{Q.length=0;closeModal();kitEvidencePanel(RV(id))},su.v);await sleep(900);await shot('evidence');
 const evc=await p.evaluate(()=>document.getElementById('modal').innerText.replace(/\s+/g,' ').slice(0,900));
 const ab=await p.$('#modal:not([hidden]) button[data-kevact="accuse"]:not([disabled])');let accSeen=[];
 if(ab){await p.evaluate(()=>{Math.random=()=>0.02});await ab.click();await sleep(900);accSeen=await drain();await p.evaluate(()=>{Math.random=window.__r0})}
 out.accuse={card:evc,tapped:!!ab,after:await p.evaluate(id=>{const v=RV(id);return {out:!!v.out,rank:v.rank,log:(S.logs||[]).slice(0,2).join(' | ').replace(/<[^>]+>/g,'').slice(0,300)}},su.v)};
 /* 3. two-way: w holds pieces of HER one wrong (ức hiếp) and accuses her */
 await p.evaluate(id=>{const w=RV(id);deedAdd(S,"trip",w,1,`ngáng chân ${w.name}`);w.evm=w.evm||{};w.evm.me=0;w.evc={};evA(w,S,2);Math.random=()=>0.02;ACTX={a:w,pen:0};try{log(ACT.accuse.f(w,S)||"")}finally{ACTX={a:null,pen:0};Math.random=window.__r0}render()},su.w);
 await sleep(700);await shot('her-notice');const her=await drain();out.herNotice={seen:her.map(x=>x.t+': '+x.body.slice(0,420)),rank:await p.evaluate(()=>({rank:S.rank,out:!!S.out,conf:S.confined}))};
 console.log('SUMMARY '+JSON.stringify(out));console.log('page errors:',errs.length,errs.slice(0,4));await ctx.close();await b.close()})();
