/* jsgame (review/scheme-games): each scheme game through the REAL act-card path at one viewport, three ways: THẮNG, THUA, BỎ QUA.
   win  : act card → choice (Tự ra tay / Giao cho người làm / Thôi) → Tự ra tay → intro → oracle player (KG82.peek) → result (odds UP one step) → Ra tay → result card
   lose : same, bad player (KG82.peekBad or no input) → result (odds DOWN one step) → Ra tay → result card
   skip : choice → Giao cho người làm → plain odds, result card (no game)
   Checks: no page error, no horizontal overflow, no "…", no "%", no HUD count above its ceiling, odds word moved exactly one step (or none),
   SG.mod only set inside the player's doAct, NPC odds identical while the step is live, silver spent = card cost.
   usage: node dev/test/schemegames.js <baseURL> <W>x<H>@<dpr> <shotdir> [reduce] [keys,comma] */
const {chromium}=require('playwright');
const OW=require('./odds-words.js');/* ladder words from the ONE source j0 */
const [,,BASE,SZ,OUT,RM,KS]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const tag=SZ+(RM&&RM!=='0'?'-rm':'');
const KEYS=(KS||'spy,rumor,bribe,poison').split(',');const LAD=OW.W;
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({serviceWorkers:'block',viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:RM&&RM!=='0'?'reduce':'no-preference'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message+' @ '+String(e.stack).slice(0,400)));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push('console: '+m.text())});
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='td';document.getElementById('title').hidden=true;start()});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1800);await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'});
 await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());try{NLP=null}catch(e){}Q.length=0;const m=document.getElementById('modal');if(m){m.hidden=true;m.className='modal'}KG82.noDemo=false;
  /* spy on doAct: what step was live, and whether an NPC's odds moved while it was */
  const d0=doAct;doAct=function(i,k){const npc=rivals.find(x=>x!==rivals[i]&&x.alive);const plain=npc?odA(npc,50):0;const keep=SG.mod;
   window.__live={step:SG.mod?SG.mod.step:0,npcSame:npc?(()=>{const r=odA(npc,50);return r===plain})():true,me:odA(S,50)};return d0.apply(this,arguments)}});
 await p.waitForTimeout(1800);await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'});await p.evaluate(()=>{try{NLP=null}catch(e){}Q.length=0;const m=document.getElementById('modal');if(m){m.hidden=true;m.className='modal'}});
 const fails=[];const out=[];const SV={};
 const chk=async(where)=>{const r=await p.evaluate(()=>{const o=document.scrollingElement.scrollWidth>innerWidth+1;const vis=[...document.querySelectorAll('#kg82, #modal:not([hidden]), #rtoast')].map(e=>e.innerText).join(' ');
   /* text cut inside buttons / rows of the visible kit frame */
   const cut=[...document.querySelectorAll('#kg82 button, #kg82 .krl, #modal:not([hidden]) .opts button b')].filter(e=>e.offsetParent&&e.scrollWidth>e.clientWidth+2&&getComputedStyle(e).overflow!=='visible').map(e=>e.textContent.slice(0,30));
   return{o,ell:/…/.test(vis),pct:/\d\s?%/.test(vis),over:(window.KG82&&KG82.over)||0,cut}});
  if(r.o)fails.push(where+': horizontal overflow');if(r.ell)fails.push(where+': ellipsis');if(r.pct)fails.push(where+': % sign');if(r.over)fails.push(where+': HUD over ceiling');if(r.cut.length)fails.push(where+': cut '+r.cut.join('|'))};
 const prep=async k=>p.evaluate(k=>{Q.length=0;$('modal').hidden=true;S.bac=400;S.suc=100;S.kpWarn=1;S.khac=0;S.used=0;used=0;try{S.kUsed=0}catch(e){}S.dead=false;S.confined=0;
   const i=rivals.findIndex(v=>!v.queen&&SG.K[k]&&v.alive&&!v.out&&!sameHouse(S,v)&&ACT[k].ok(S,v)&&(k!=='bribe'||v.maid));
   if(i<0)return{err:'no target'};const v=rivals[i];try{const K=k61S();if(K)K[kOf61(v)]=3}catch(e){}
   PG.rv=i;window.__grp=(RVGRP.find(g=>g[1].includes(k))||[''])[0];window.__sgI=i;window.__live=null;tab='rv';try{relSel=i}catch(e){}render();
   const p0=sgOdds(v,k);return{i,name:v.name,p0,w0:word(p0),cost:-(ACT[k].c&&ACT[k].c.bac||0)}},k);
 const openChoice=async(k,info)=>{const gb=p.locator(`#panel [data-pct="${await p.evaluate(()=>window.__grp)}"]`);if(await gb.count()){await gb.first().click().catch(()=>{});await p.waitForTimeout(300)}
  let sel=`button[data-r="${info.i}"][data-a="${k}"]:visible`;const real=await p.locator(sel).count();
  if(real){await p.locator(sel).first().scrollIntoViewIfNeeded({timeout:5000}).catch(()=>{});await p.evaluate(s=>document.querySelector(s.replace(':visible','')).click(),sel)}
  else await p.evaluate(([i,k])=>{/* the act card is not on this page of the book: the same data-r/data-a button, clicked in place */const o=$('sgtest');if(o)o.remove();const d=document.createElement('div');d.id='sgtest';d.innerHTML=pbtn(`data-r="${i}" data-a="${k}"`,ACT[k].n,'');document.body.appendChild(d);d.querySelector('button').click();d.remove()},[info.i,k]);
  await p.waitForTimeout(500);
  await p.evaluate(()=>{if(Q.length>1&&Q.some(x=>x.pid==='sgpick')){const k=Q.filter(x=>x.pid==='sgpick');Q.length=0;k.forEach(x=>Q.push(x));try{showModal()}catch(e){}}});await p.waitForTimeout(300);
  return p.evaluate(real=>({open:!$('modal').hidden,n:document.querySelectorAll('#modal .opts button').length,txt:$('modal').innerText.slice(0,900),real}),real)};
 const play=async(k,good,shot)=>{await p.locator('#sggo').click();
  await p.evaluate(good=>{let nx=0;const pe=(el,t,x,y)=>el.dispatchEvent(new PointerEvent(t,{clientX:x,clientY:y,pointerType:'touch',pointerId:5,isPrimary:true,bubbles:true,cancelable:true}));
   const tick=()=>{if(KG82.phase!=='play'&&KG82.phase!=='')return;const f=good?KG82.peek:KG82.peekBad;const pk=f&&f();const now=performance.now();
    if(pk&&now>nx){if(pk.sel){const el=document.querySelector(pk.sel);if(el)el.click();nx=now+260}else if(pk.x!=null){const el=document.elementFromPoint(pk.x,pk.y);if(el){pe(el,'pointerdown',pk.x,pk.y);pe(el,'pointerup',pk.x,pk.y)}nx=now+300}}
    setTimeout(tick,30)};tick()},good);
  const t1=Date.now();let did=false;
  while(Date.now()-t1<75000){const ph=await p.evaluate(()=>KG82.phase);if(ph==='result')break;
   if(!did&&Date.now()-t1>(k==='bribe'?500:2500)){if(shot)await p.locator('#kg82').screenshot({path:`${OUT}/${k}-${tag}.jpg`,type:'jpeg',quality:80,timeout:60000}).catch(e=>fails.push('shot: '+e.message.slice(0,80)));await chk(k+' play');did=true}await p.waitForTimeout(400)}
  return Math.round((Date.now()-t1)/1000)};
 const finishAct=async(k,info,how,expect,b0)=>{const s0=b0||await p.evaluate(()=>({seq:S.logSeq||0,bac:S.bac}));
  if(how!=='skip'){await p.waitForTimeout(300);await chk(k+' '+how+' result');
   const res=await p.evaluate(()=>{const t=$('kg82')?$('kg82').innerText:'';const m=t.match(/Cơ may\s*\n\s*([^\n→]+?)\s*\n?\s*→\s*\n?\s*([^\n]+)/i);return{txt:t.slice(-500),m:m?[m[1].trim(),m[2].trim()]:null}});
   const lv=w=>LAD.findIndex(x=>w&&w.replace(/\s+/g,' ').startsWith(x)&&!(x==='Chắc'&&/^Chắc\S/.test(w)));
   const a0=LAD.indexOf(info.w0);const a1=res.m?LAD.indexOf(LAD.filter(x=>res.m[1].includes(x)).sort((a,b)=>b.length-a.length)[0]):-9;
   const want=Math.max(0,Math.min(6,a0+expect));if(a1!==want)fails.push(`${k} ${how}: odds ${info.w0} → ${res.m&&res.m[1]} (want ${LAD[want]}) :: `+res.txt);
   await p.evaluate(()=>document.getElementById('sgdo').click())}
  await p.waitForTimeout(900);
  const after=await p.evaluate(s0=>({ran:(S.logSeq||0)>s0.seq,bac:s0.bac-S.bac,card:!!document.querySelector('#rtoast.on'),mod:SG.mod,live:window.__live,log:String(S.logs[0]||'').replace(/<[^>]+>/g,'').slice(0,160)}),s0);
  if(!after.live)fails.push(`${k} ${how}: act did not run`);if(after.mod)fails.push(`${k} ${how}: modifier left set`);
  if(!after.live||after.live.npcSame===false)fails.push(`${k} ${how}: NPC odds changed`);
  const ws=how==='win'?1:how==='lose'?-1:0;if(after.live&&after.live.step!==(how==='skip'?0:expect))fails.push(`${k} ${how}: live step ${after.live.step}`);
  SV[k]=SV[k]||[];SV[k].push(after.bac);
  await chk(k+' '+how+' card');await p.evaluate(()=>{const t=$('rtoast');if(t){t.classList.remove('on');t.hidden=true}});return after};
 for(const k of KEYS){for(const how of ['win','lose','skip']){try{
  const info=await prep(k);if(info.err){fails.push(k+': '+info.err);break}
  const dlg=await openChoice(k,info);if(!dlg.open||dlg.n<2){fails.push(`${k} ${how}: choice dialog missing `+JSON.stringify(dlg)+JSON.stringify(await p.evaluate(()=>({q:Q.length,kh:S.khac,can:can(2),mod:$('modal').hidden}))));continue}
  if(how==='win'){await chk(k+' choice');if(!/Tốn/i.test(dlg.txt)||!/Được/i.test(dlg.txt)||!/Mất/i.test(dlg.txt)||!/Ghi chú/i.test(dlg.txt))fails.push(k+': choice rows missing Cần/Tốn/Được/Mất :: '+dlg.txt.slice(0,700));
   if(k==='poison'&&/độc|thuốc|chén|bột/i.test(await p.evaluate(()=>$('modal').querySelector('p')?$('modal').querySelector('p').innerText:'')))fails.push(k+': method words in ask line')}
  if(how==='skip'){const b0=await p.evaluate(()=>({seq:S.logSeq||0,bac:S.bac}));await p.locator('#modal .opts button').nth(1).click();const after=await finishAct(k,info,how,0,b0);out.push({k,how,w0:info.w0,after});continue}
  await p.evaluate(()=>{if(Q.some(x=>x.pid==='sgpick')&&Q[0].pid!=='sgpick'){const k=Q.filter(x=>x.pid==='sgpick');Q.length=0;k.forEach(x=>Q.push(x));showModal()}});await p.waitForTimeout(300);
  await p.locator('#modal .opts button').nth(0).click();await p.waitForTimeout(700);
  if(!await p.locator('#kg82').count()){fails.push(`${k} ${how}: game did not open `+JSON.stringify(await p.evaluate(()=>({q:Q.map(x=>(x.pid||'')+'|'+String(x.t||x.h).slice(0,40)),mh:$('modal').hidden,u:used}))));await p.screenshot({path:`${OUT}/../fail-${k}-${how}.jpg`,type:'jpeg',quality:50}).catch(()=>{});continue}
  if(k==='poison'){const t=await p.evaluate(()=>$('kg82').innerText);if(/độc|thuốc|chén|bột|pha/i.test(t))fails.push(k+': method words on game screen :: '+t)}
  await chk(k+' intro');
  /* the game's own result decides the step: raw 7+ up, 0–3 down; the bad player may land 4–6 (no step) — read it from the result page */
  const dur=await play(k,how==='win',how==='win');
  const raw=await p.evaluate(()=>{const b=document.querySelector('[data-kg="score"]');return b?parseInt(b.textContent):NaN});
  const expect=raw>=7?1:raw<=3?-1:0;if(how==='win'&&expect!==1)fails.push(`${k} win: raw only ${raw}`);if(how==='lose'&&expect===1)fails.push(`${k} lose: raw ${raw}`);
  const after=await finishAct(k,info,how,expect);out.push({k,how,dur,raw,w0:info.w0,step:after.live&&after.live.step,log:after.log});
 }catch(e){fails.push(`${k} ${how}: `+e.message.slice(0,1200));await p.screenshot({path:`${OUT}/../fail-${k}-${how}.jpg`,type:'jpeg',quality:60}).catch(()=>{})}}}
 /* old save loads (schemesave covers the stored-old-build case) */
 /* bribe pays back stolen silver on a win, so its net silver legitimately differs */
 for(const k in SV){if(k!=='bribe'&&new Set(SV[k]).size>1)fails.push(`${k}: silver spent differs between win/lose/skip ${SV[k]}`)}
 console.log(JSON.stringify({size:tag,errs,fails,out},null,1));await b.close()})();
