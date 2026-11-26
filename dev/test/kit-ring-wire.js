/* RING-BUILD-2: the 33-place wiring of vòng người / vòng nhóm (KK44 NEW-KIT FAMILY SCAN §3/§4), real taps, Fold + iPad.
   usage: node dev/test/kit-ring-wire.js <url> <shotdir>   (shots go OUTSIDE the repo) */
const {chromium}=require('playwright');const fs=require('fs');const boot=require('./kit-ring-boot.js');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const tapEl=async(p,sel)=>{const h=await p.$(sel);if(!h)return false;const b=await h.boundingBox();if(!b)return false;await p.touchscreen.tap(b.x+b.width/2,b.y+b.height/2);return true};
const tapFront=async p=>{const r=await p.evaluate(()=>{const R=kitRing.cur;if(!R)return null;const s=R.slots[kitRing.front()];const b=s.getBoundingClientRect();return {x:b.left+b.width/2,y:b.top+b.height*.45}});if(r)await p.touchscreen.tap(r.x,r.y);return !!r};
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});let fail=0;
 for(const wh of (process.env.SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await boot(p,{url:URL});const sh=n=>p.screenshot({path:`${OUT}/${wh}-${n}.jpg`,type:'jpeg',quality:70});const res={};
  /* C: stage — close the auto ring, tap a stage figure → ring at that person, focused */
  await p.evaluate(()=>kitRing.close(true));await p.waitForTimeout(600);
  const tk=await p.evaluate(()=>{const P=curPeople();const t=[...document.querySelectorAll('#tokens .tok[data-p]')].find(t=>t.getClientRects().length&&kitRing.ringable(P[+t.dataset.p]));return t?t.dataset.p:null});
  if(tk!=null){await tapEl(p,`#tokens .tok[data-p="${tk}"]`);await p.waitForTimeout(2600);res.stageDbg=await p.evaluate(()=>({cur:!!kitRing.cur,sel:kitRing.cur&&kitRing.cur.sel,q:Q.length,foc:!!document.querySelector('.kfoc,#popw .pcpop')}));res.stage=await p.evaluate(i=>!!kitRing.cur&&kitRing.cur.sel>=0&&!!kitRing.cur.who&&String(kitRing.cur.who.i)===i&&!!document.querySelector('.kpk'),tk);await sh('C-stage')}else res.stage='no token';
  await p.evaluate(()=>kitRing.close(true));await p.waitForTimeout(400);
  /* B: face strips (pager keys reachable from the tabs) */
  const strips=[['rv',"tab='rv';render()"],['kid',"tab='kid';render()"],['court',"tab='court';render()"],['men',"tab='men';render()"]];
  res.strip={};
  for(const [k,go] of strips){await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});if(!await tapEl(p,`button[data-tab="${k}"]:not([hidden])`))await p.evaluate(g=>{try{eval(g)}catch(e){}},go);await p.waitForTimeout(700);
   const has=await p.evaluate(k=>{const b=document.querySelector(`[data-kring-pg="${k}"]`);return b?b.getClientRects().length>0:null},k);
   if(!has){res.strip[k]=has===null?'n/a here':'hidden';await sh('B-'+k+'-hidden');continue}
   await tapEl(p,`[data-kring-pg="${k}"]`);await p.waitForTimeout(1800);const open=await p.evaluate(()=>!!kitRing.cur);
   await p.evaluate(()=>kitRing.turnBy(1));await p.waitForTimeout(600);await tapFront(p);await p.waitForTimeout(1600);
   const acts=await p.evaluate(()=>[...document.querySelectorAll('.kpk .kpk-b b')].map(b=>b.textContent));await sh('B-'+k);
   const want=await p.evaluate(()=>kitRing.cur&&kitRing.cur.who&&kitRing.cur.who.i);await tapEl(p,'.kpk .kpk-b');await p.waitForTimeout(500);await tapEl(p,'.kpk-conf .khok');await p.waitForTimeout(900);
   const pg=await p.evaluate(k=>PG[k],k);res.strip[k]={open,acts:acts.length,first:acts[0],paged:pg===want}}
  /* A: person-picker frame — the spy pick (all-face option list) */
  await p.evaluate(()=>{try{tab='act';render();Q.length=0;spyPick()}catch(e){window.__spyErr=String(e)}});await p.waitForTimeout(1800);
  res.modal=await p.evaluate(()=>({ring:!!kitRing.cur&&!!kitRing.cur.o.modal,held:document.getElementById('modal').classList.contains('kring-held'),n:kitRing.cur?kitRing.cur.list.length:0,err:window.__spyErr||''}));await sh('A-ring');
  if(res.modal.ring){await tapFront(p);await p.waitForTimeout(1600);res.modal.acts=await p.evaluate(()=>[...document.querySelectorAll('.kpk .kpk-b b')].map(b=>b.textContent).join('|'));await sh('A-focus');
   await tapEl(p,'.kring-x button');await p.waitForTimeout(700);await tapEl(p,'.kring-x button');await p.waitForTimeout(800);res.modal.closed=await p.evaluate(()=>!kitRing.cur)}
  res.errs=errs;console.log(wh,JSON.stringify(res));if(errs.length)fail++;await ctx.close()}
 await b.close();process.exit(fail?1:0)})();
