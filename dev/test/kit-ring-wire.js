/* RING-BUILD-2: the 33-place wiring of vòng người / vòng nhóm (KK44 NEW-KIT FAMILY SCAN §3/§4), real taps, Fold + iPad.
   usage: node dev/test/kit-ring-wire.js <url> <shotdir>   (shots go OUTSIDE the repo) */
const {chromium}=require('playwright');const fs=require('fs');const boot=require('./kit-ring-boot.js');const [,,URL,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const tapEl=async(p,sel)=>{let h=null;for(const e of await p.$$(sel)){if(await e.isVisible()){h=e;break}}h=h||await p.$(sel);if(!h)return false;const b=await h.boundingBox();if(!b)return false;await p.touchscreen.tap(b.x+b.width/2,b.y+b.height/2);return true};
const tapFront=async p=>{const r=await p.evaluate(()=>{const R=kitRing.cur;if(!R)return null;const s=R.slots[kitRing.front()];const b=s.getBoundingClientRect();return {x:b.left+b.width/2,y:b.top+b.height*.45}});if(r)await p.touchscreen.tap(r.x,r.y);return !!r};
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});let fail=0;
 for(const wh of (process.env.SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();let res0;const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await boot(p,{url:URL});res0=await boot.seedWire(p);console.log('seed',JSON.stringify(res0));const sh=n=>p.screenshot({path:`${OUT}/${wh}-${n}.jpg`,type:'jpeg',quality:70});const res={};
  /* C: stage — close the auto ring, tap a stage figure → ring at that person, focused */
  await p.evaluate(()=>kitRing.close(true));await p.waitForTimeout(600);await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m&&!m.classList.contains('kring-held'))m.hidden=true});
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
  /* RING-BUILD-3 cases: staff / q72 strips, Ân oán slot, Chí tôn rows (#kshR / group buttons), Phe phái person + group ring */
  const ringCase=async(name,prep,sel,opt)=>{opt=opt||{};await p.evaluate(()=>{try{kitRing.close(true)}catch(e){}Q.length=0;document.getElementById('modal').hidden=true});await p.evaluate(prep).catch(()=>{});await p.waitForTimeout(800);await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m&&!m.classList.contains('kring-held'))m.hidden=true});await p.waitForTimeout(200);
   /* RING-BUILD-6: an open kit result card (#kxcatch over the page) eats the first tap (kit §7: a tap closes the card first) — close it like a player does */
   for(let k=0;k<3&&await p.evaluate(()=>{const c=document.getElementById('kxcatch');return !!c&&c.offsetWidth>0&&getComputedStyle(c).display!=='none'});k++){const c=await p.evaluate(()=>{const r=document.getElementById('rtoast');const b=r&&r.getBoundingClientRect();return b&&b.width?[b.left+b.width/2,b.top+b.height/2]:[innerWidth/2,innerHeight/2]});await p.touchscreen.tap(c[0],c[1]);await p.waitForTimeout(500)}
   const vis=await p.evaluate(sel=>{const b=[...document.querySelectorAll(sel)].find(e=>e.getClientRects().length>0)||document.querySelector(sel);return b?b.getClientRects().length>0:null},sel);if(!vis){res[name]=vis===null?'n/a here':'hidden';return}
   await tapEl(p,sel);await p.waitForFunction(()=>kitRing.cur&&kitRing.cur.slots.length,null,{timeout:8000}).catch(()=>{});await p.waitForTimeout(900);const o={open:!!(await p.evaluate(()=>kitRing.cur)),n:await p.evaluate(()=>kitRing.cur?kitRing.cur.slots.length:0)};if(!o.open){await sh(name+"-fail")}if(!o.open)o.why=await p.evaluate(sel=>{const b=document.querySelector(sel);const r=b&&b.getBoundingClientRect();const top=r&&document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return{q:Q.length,modal:!document.getElementById('modal').hidden,top:top&&(top.tagName+'.'+String(top.className).slice(0,30)+'#'+top.id),stack:r&&document.elementsFromPoint(r.left+r.width/2,r.top+r.height/2).slice(0,4).map(t=>t.tagName+'.'+String(t.className).slice(0,24)+'#'+t.id)}},sel);
   if(o.open){if(o.n>1){await p.evaluate(()=>kitRing.turnBy(1));await p.waitForTimeout(600)}await tapFront(p);await p.waitForTimeout(1700);o.acts=await p.evaluate(()=>[...document.querySelectorAll('.kpk .kpk-b b')].map(b=>b.textContent).join('|'));await sh(name);
    if(opt.pick){await tapEl(p,'.kpk .kpk-b');await p.waitForTimeout(500);await tapEl(p,'.kpk-conf .khok');await p.waitForTimeout(900);o.after=await p.evaluate(opt.pick)}
    else{await tapEl(p,'.kring-x button');await p.waitForTimeout(600);await tapEl(p,'.kring-x button');await p.waitForTimeout(600)}o.closed=await p.evaluate(()=>!kitRing.cur)}
   res[name]=o};
  await ringCase('staff',()=>{tab='staff';render()},'[data-kring-pg="staff"]',{pick:()=>({tab,pg:PG.staff})});
  await ringCase('q72',()=>{tab='q72';render()},'[data-kring-pg="q72"]');
  await ringCase('rel',()=>{tab='rel';render()},'#panel [data-relslot="x"]',{pick:()=>({relSel:String(relSel)})});
  /* RING-BUILD-6 (Fold court / crew ✗ = test state, not a layout bug): on Fold the Chí tôn / Cung nhân buttons live ON the place stage (iPad: own right column); earlier cases leave
     the act tab on its list view and the place ring (auto) covers the stage → back to the place, let the auto ring open, close it with ✕ like a player, then tap the button */
  const PLACE=()=>new Promise(r=>{try{kitRing.close(true);Q.length=0;window.__kgfOpen=null;tab='act';if(!S.visit||S.place!=='vuon'){S.place='home';goTo('vuon')}Q.length=0;document.getElementById('modal').hidden=true;render()}catch(e){}
   /* the phone shell leaves the place page on a tab change (jk3 tab watch, 150 ms) → back to it like the player (k3Home = the place page) */setTimeout(()=>{try{window.k3Home()}catch(e){}const t0=Date.now();const iv=setInterval(()=>{if(kitRing.cur||Date.now()-t0>3000){clearInterval(iv);try{kitRing.close(true)}catch(e){}setTimeout(r,300)}},100)},400)});
  await ringCase('court',PLACE,'#kshR [data-kc],.kgfbtns [data-kgf="ct"],#krail [data-rail^="kgf-ct"]',{pick:()=>({modal:!document.getElementById('modal').hidden||!!document.querySelector('.kcourt,.pcpop')})});
  await ringCase('crew',PLACE,'.kgfbtns [data-kgf="cn"],#krail [data-rail^="kgf-cn"],#kshR [data-k3go]',{pick:()=>({tab})});
  await ringCase('facP',()=>{tab='fac';render()},'[data-kring-fa]');
  await ringCase('facG',()=>{tab='fac';render()},'[data-kring-fac]');
  res.errs=errs;console.log(wh,JSON.stringify(res));if(errs.length)fail++;await ctx.close()}
 await b.close();process.exit(fail?1:0)})();
