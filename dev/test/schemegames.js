/* jsgame (review/scheme-games): each scheme game played through the REAL act-card path at one viewport.
   For each act: open the person card list (tab Phi tần), tap the act card → choice dialog (Tự ra tay / Giao cho người làm / Thôi, full rows)
   → Tự ra tay → intro → auto-player from KG82.peek → game result → Ra tay → the normal result card (#rtoast). One act also takes "Giao cho người làm".
   Checks: no page error, no horizontal overflow, no "…", no "%", no HUD count above its ceiling, NPC odds unchanged while no game runs.
   usage: node dev/test/schemegames.js <baseURL> <W>x<H>@<dpr> <outdir> [reduce] */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT,RM]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);const tag=SZ+(RM?'-rm':'');
const KEYS=['spy','rumor','bribe','poison'];
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:RM?'reduce':'no-preference'});
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource/.test(m.text()))errs.push('console: '+m.text())});
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;start();Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true});
 await p.waitForTimeout(600);
 const fails=[];const out=[];
 const chk=async(where)=>{const r=await p.evaluate(()=>{const o=document.scrollingElement.scrollWidth>innerWidth+1;const vis=[...document.querySelectorAll('#kg82, #modal:not([hidden]), #rtoast')].map(e=>e.innerText).join(' ');
   return{o,ell:/…/.test(vis),pct:/\d\s?%/.test(vis),over:(window.KG82&&KG82.over)||0}});if(r.o)fails.push(where+': horizontal overflow');if(r.ell)fails.push(where+': ellipsis');if(r.pct)fails.push(where+': % sign');if(r.over)fails.push(where+': HUD over ceiling')};
 for(const [n,k] of KEYS.entries()){try{
  /* fresh khắc + silver; a rival this act can target */
  const info=await p.evaluate(k=>{Q.length=0;$('modal').hidden=true;S.bac=400;S.suc=100;S.khac=0;S.used=0;try{S.kUsed=0}catch(e){}S.dead=false;S.confined=0;
   const i=rivals.findIndex((v,i)=>!v.queen&&SG.K[k]&&v.alive&&!v.out&&!sameHouse(S,v)&&ACT[k].ok(S,v)&&(k!=='bribe'||v.maid));
   if(i<0)return{err:'no target'};const v=rivals[i];try{const K=k61S();if(K)K[kOf61(v)]=3}catch(e){}if(k==='poison'&&!S.inv.some(e=>e.k==='hacdinh'))try{S.inv.push({k:'hacdinh'})}catch(e){}const can2=can(2);
   PG.rv=i;window.__grp=(RVGRP.find(g=>g[1].includes(k))||[''])[0];
   /* NPC odds before (must equal after: NPCs never play) */const npc=rivals.find(x=>x!==v&&x.alive);window.__npc0=npc?odA(npc,50):null;window.__npcI=rivals.indexOf(npc);
   window.__sgI=i;tab='rv';try{relSel=i}catch(e){}render();return{i,name:v.name,can2}},k);
  if(info.err){fails.push(k+': '+info.err);continue}
  /* the real act card if it is on screen, else a kit act card injected into the panel (same data-r/data-a contract) */
  const grp=await p.evaluate(()=>window.__grp);const gb=p.locator(`#panel [data-pct="${grp}"]`);if(await gb.count()){await gb.first().click();await p.waitForTimeout(300)}
  let sel=`button[data-r="${info.i}"][data-a="${k}"]:visible`;let real=await p.locator(sel).count();
  if(!real){await p.evaluate(([i,k])=>{const d=document.createElement('div');d.className='pcb';d.id='sgtest';d.innerHTML=pbtn(`data-r="${i}" data-a="${k}"`,ACT[k].n,'');$('panel').prepend(d)},[info.i,k]);sel='#sgtest '+sel}
  await p.locator(sel).first().scrollIntoViewIfNeeded();await p.locator(sel).first().click();await p.waitForTimeout(500);
  const dlg=await p.evaluate(()=>({open:!$('modal').hidden,n:document.querySelectorAll('#modal .opts button').length,txt:$('modal').innerText.slice(0,600),rows:[...document.querySelectorAll('#modal .opts button')].map(b=>[...b.querySelectorAll('.krl')].map(x=>x.textContent).join('/'))}));
  out.push({k,real:!!real,dlg});if(!dlg.open||dlg.n<3){fails.push(k+': choice dialog missing');continue}
  await p.locator('#modal .dlg').screenshot({path:`${OUT}/${k}-${tag}-0choice.jpg`,type:'jpeg',quality:82,timeout:60000}).catch(e=>fails.push('shot: '+e.message.slice(0,80)));await chk(k+' choice');
  const skip=(k==='rumor'&&!RM);
  if(skip){const s0=await p.evaluate(()=>S.logSeq||0);await p.locator('#modal .opts button').nth(1).click();await p.waitForTimeout(900);
   const r=await p.evaluate(s0=>({seq:(S.logSeq||0)>s0,card:!!document.querySelector('#rtoast.on, #rtoast:not([hidden])')}),s0);out.push({k,skip:r});if(!r.seq)fails.push(k+': skip did not run the act');
   await p.screenshot({path:`${OUT}/${k}-${tag}-skip-card.jpg`,type:'jpeg',quality:80,timeout:60000,animations:'disabled'}).catch(e=>fails.push('shot: '+e.message.slice(0,80)));
   await p.evaluate(k=>{S.khac=0;S.used=0;Q.length=0;$('modal').hidden=true;const i=window.__sgI;sgAsk(i,k)},k);await p.waitForTimeout(400)}
  await p.locator('#modal .opts button').nth(0).click();await p.waitForTimeout(700);
  if(!await p.locator('#kg82').count()){fails.push(k+': game did not open');continue}
  await p.locator('#kg82').screenshot({path:`${OUT}/${k}-${tag}-1intro.jpg`,type:'jpeg',quality:82,timeout:60000}).catch(e=>fails.push('shot: '+e.message.slice(0,80)));await chk(k+' intro');
  await p.locator('#sggo').click();
  /* auto-player: oracle taps (buttons by click, canvas by touch pointer events) */
  await p.evaluate(()=>{let nx=0;const pe=(el,t,x,y)=>el.dispatchEvent(new PointerEvent(t,{clientX:x,clientY:y,pointerType:'touch',pointerId:5,isPrimary:true,bubbles:true,cancelable:true}));
   const tick=()=>{if(KG82.phase!=='play'&&KG82.phase!=='')return;const pk=KG82.peek&&KG82.peek();const now=performance.now();
    if(pk&&now>nx){if(pk.sel){const el=document.querySelector(pk.sel);if(el)el.click();nx=now+260}else if(pk.x!=null){const el=document.elementFromPoint(pk.x,pk.y);if(el){pe(el,'pointerdown',pk.x,pk.y);pe(el,'pointerup',pk.x,pk.y)}nx=now+300}}
    setTimeout(tick,30)};tick()});
  const t1=Date.now();let shot=false;
  while(Date.now()-t1<60000){const ph=await p.evaluate(()=>KG82.phase);if(ph==='result')break;
   if(!shot&&Date.now()-t1>3500){await p.locator('#kg82').screenshot({path:`${OUT}/${k}-${tag}-2play.jpg`,type:'jpeg',quality:82,timeout:60000}).catch(e=>fails.push('shot: '+e.message.slice(0,80)));await chk(k+' play');shot=true}await p.waitForTimeout(300)}
  const dur=Math.round((Date.now()-t1)/1000);
  await p.waitForTimeout(400);await p.locator('#kg82').screenshot({path:`${OUT}/${k}-${tag}-3result.jpg`,type:'jpeg',quality:82,timeout:60000}).catch(e=>fails.push('shot: '+e.message.slice(0,80)));await chk(k+' result');
  const s0=await p.evaluate(()=>({seq:S.logSeq||0,bac:S.bac}));
  await p.locator('#sgdo').click();await p.waitForTimeout(900);
  const after=await p.evaluate(([s0,k])=>{const npc=rivals[window.__npcI];return{ran:(S.logSeq||0)>s0.seq,bac:S.bac-s0.bac,card:!!document.querySelector('#rtoast.on'),mod:SG.mod,npc:npc?odA(npc,50)===window.__npc0:true,res:window.kaLastResult?{t:kaLastResult.title,ok:kaLastResult.ok,rows:(kaLastResult.rows||[]).map(r=>r.label+': '+r.items.join(' · '))}:null,log:String(S.logs[0]||'').replace(/<[^>]+>/g,'').slice(0,200)}},[s0,k]);
  out.push({k,dur,after});if(!after.ran)fails.push(k+': act did not run after the game');if(after.mod)fails.push(k+': modifier left set');if(!after.npc)fails.push(k+': NPC odds changed');
  await p.screenshot({path:`${OUT}/${k}-${tag}-4card.jpg`,type:'jpeg',quality:80,timeout:60000,animations:'disabled'}).catch(e=>fails.push('shot: '+e.message.slice(0,80)));await chk(k+' card');
  await p.evaluate(()=>{const t=$('rtoast');if(t){t.classList.remove('on');t.hidden=true}});
 }catch(e){fails.push(k+': '+e.message.slice(0,200))}}
 console.log(JSON.stringify({size:tag,errs,fails,out},null,1));await b.close()})();
