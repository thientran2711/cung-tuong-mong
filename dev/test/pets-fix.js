/* review/pets-fix: pets end to end at one size — Tư trang "Thú nuôi" row alignment (kitEquipSlots subgrid), the pet shop (kitShop grid:
   rows aligned ±1 px, Non pictures, buy on the tile), the pet card picture per stage (-non / -tn / grown / -lt), the care screen (kit person
   dialog: stat cells, the 3 mini-games played for real), neglect → omen card → runs away, growth cards, Ngự tứ saves a life only as Linh thú,
   other palaces (help / steal, NPC steals hers), 0 page errors, no horizontal overflow. Optional old save made by an older build.
   usage: node dev/test/pets-fix.js <base url dir> <W>x<H>@dpr <outdir> [oldBuildPage]
     (<base>/index.html = this build; oldBuildPage = e.g. main.html, an older build in the same dir: makes a save there, loads it here)
   Boot (fixes the old dev/test/pets.js): service workers blocked, window.__nlInner (no Luân hồi), #kload / .krbox / #kroul removed. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,SZ,OUT,OLD]=process.argv;const [WH,DPR]=(SZ||'755x1000@2').split('@');const [W,H]=WH.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
const T0=Date.now(),lg=m=>console.error('['+Math.round((Date.now()-T0)/1000)+'s] '+m);const sleep=t=>new Promise(r=>setTimeout(r,t));
const prox=process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{};
const fresh=`(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();document.querySelectorAll('.krbox').forEach(e=>e.remove());try{localStorage.clear()}catch(e){}
 SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;try{NLP=null}catch(e){}
 const kr=document.getElementById('kroul');if(kr)kr.remove();const dw=document.getElementById('dawn');if(dw)dw.remove();document.body.classList.remove('kbk-open');window.kmPush=function(){};document.querySelectorAll('.kmov').forEach(e=>e.remove());render()})()`;
(async()=>{const b=await chromium.launch(prox);const R={size:SZ};const errs=[],errsOld=[];
 const mk=()=>b.newContext(Object.assign({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),hasTouch:true,isMobile:W<1100,reducedMotion:'reduce',serviceWorkers:'block',ignoreHTTPSErrors:true}));
 const boot=async(ctx,url,E)=>{const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>E.push(e.message.slice(0,200)));await p.addInitScript(()=>{window.__nlInner=1;addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kroul,#kload,.krbox{display:none!important}';document.head.appendChild(s)})});
  await p.route(/ctmload=1/,r=>r.abort());/* the first-entry asset download (jload) is not part of the test: blocked, its screen hidden */
  await p.goto(url,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2000);return p};
 /* --- old save (made by an older build) --- */
 let old=null;if(OLD){const c0=await b.newContext({viewport:{width:755,height:1000},deviceScaleFactor:1,serviceWorkers:'block',ignoreHTTPSErrors:true});const p0=await boot(c0,BASE+'/'+OLD,errsOld);
  old=await p0.evaluate(`(()=>{(${fresh});SLOT=3;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}
   /* a pets-era save: old keys (linhquy = the removed turtle, rua) and the old single "care" number, no stage */
   S.pets=[{t:"linhquy",care:60,at:0,src:"emp",from:"Hoàng thượng ban"},{t:"rua",care:40,at:0,src:"buy"}];S.petOn=0;quiet=false;save();const o={};for(let i=0;i<localStorage.length;i++){const k=localStorage.key(i);o[k]=localStorage.getItem(k)}return o})()`);
  lg('old save keys '+Object.keys(old).length);await c0.close()}
 const ctx=await mk();if(old)await ctx.addInitScript(o=>{if(!sessionStorage.getItem('__seeded')){for(const k in o)localStorage.setItem(k,o[k]);sessionStorage.setItem('__seeded','1')}},old);
 const p=await boot(ctx,BASE+'/index.html',errs);await p.addStyleTag({content:'#kroul{display:none!important}'});
 const imgs=()=>p.evaluate(()=>Promise.all([...document.querySelectorAll('#modal img, #panel img')].map(i=>i.complete?0:new Promise(r=>{i.onload=i.onerror=r;setTimeout(r,8000)}))));
 const shot=async n=>{await imgs();await sleep(500);try{await p.screenshot({path:`${OUT}/${n}-${WH}.jpg`,type:'jpeg',quality:70,timeout:120000})}catch(e){lg('shot fail '+n)}};
 const audit=n=>p.evaluate(n=>{const vw=innerWidth,bad=[];document.querySelectorAll('#panel *, #modal .dlg *').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||e.closest('.kcattabs,.pctabs,.kshg'))return;
   if(r.right>vw+1||r.left<-1)bad.push('x:'+(String(e.className)||e.tagName).slice(0,40));const cs=getComputedStyle(e);if(cs.textOverflow==='ellipsis'&&e.scrollWidth>e.clientWidth+1&&!e.closest('.kshe'))bad.push('ell:'+e.className)});
  const broken=[...document.querySelectorAll('#panel img, #modal img')].filter(i=>i.complete&&i.naturalWidth===0&&/pet/.test(i.src)).map(i=>i.src.slice(-34));
  return{n,ovX:document.documentElement.scrollWidth>vw+1,bad:[...new Set(bad)].slice(0,6),broken}},n);
 const A=[];
 /* --- 0. old save loads here --- */
 if(old){R.old=await p.evaluate(()=>{document.getElementById('title').hidden=true;let ok='ok';try{const d=loadSlot(3);if(!d)return{ok:'NO SAVE'};SLOT=3;quiet=true;deser(d);quiet=false;deal();showModal()}catch(e){ok='ERR '+e.message}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{tab='inv';render()}catch(e){ok='RENDER '+e.message}
   for(let i=0;i<4;i++){try{nextBuoi()}catch(e){ok='NEXT '+e.message}Q.length=0;if(m)m.hidden=true}const dw=document.getElementById('dawn');if(dw)dw.remove();document.body.classList.remove('kbk-open');render();
   return{ok,turn:S.turn,pets:(S.pets||[]).map(P=>`${P.t}:${petStage(P)}:${Math.round(P.full)}/${Math.round(P.clean)}/${Math.round(P.joy)}/${Math.round(P.aff)}`),petOn:S.petOn}});
  await p.evaluate(()=>{tab='inv';render();const e=document.querySelector('#panel .keq[data-keq="pets"]');if(e)e.scrollIntoView({block:'center'})});await shot('00-oldsave-inv');A.push(await audit('oldsave'))}
 await p.evaluate(fresh);await sleep(800);
 /* --- 1. Tư trang: two pets, one followed (chip) — the row is aligned --- */
 await p.evaluate(()=>{S.inv=S.inv.filter(e=>e.w||e.h);S.pets=[];S.petTip=1;S.rank=3;S.bac=900;S.mat=4;petAdd(S,'meo','Nhờ thái giám mua','buy');petAdd(S,'vet','Nhờ thái giám mua','buy');S.petOn=0;S.pets[1].stg=2;tab='inv';render()});
 await sleep(600);await p.evaluate(()=>{const e=document.querySelector('#panel .keq[data-keq="pets"]');if(e)e.scrollIntoView({block:'center'})});
 R.row=await p.evaluate(()=>{const out={};const R=e=>e.getBoundingClientRect();const sp=a=>a.length?+(Math.max(...a)-Math.min(...a)).toFixed(2):0;
  for(const k of ['pets','tutrang']){const q=document.querySelector(`#panel .keq[data-keq="${k}"]`);if(!q)continue;const C=[...q.querySelectorAll('.keqc,.keqrc')];const rows={};C.forEach(c=>{const y=Math.round(R(c).top);(rows[y]=rows[y]||[]).push(c)});
   out[k]=Object.values(rows).map(cs=>{const part=s=>cs.map(c=>c.querySelector(s)).filter(Boolean).map(e=>R(e).top);return{n:cs.length,pic:sp(part('.kitem')),name:sp(cs.map(c=>c.querySelector('.keqnm,.keql')).filter(Boolean).map(e=>R(e).top)),
    chips:sp(cs.map(c=>c.querySelector('.keqfx')).filter(e=>e&&e.children.length).map(e=>R(e).top)),note:sp(part('.keqnote')),noteTxt:cs.map(c=>(c.querySelector('.keqnote')||{}).textContent||'')}})}return out});
 await shot('01-inv-pets');A.push(await audit('inv-pets'));
 /* --- 2. the pet shop (empty slot) --- */
 await p.evaluate(()=>{S.pets=[];S.petOn=-1;render()});await sleep(300);await p.evaluate(()=>{KINV_SUB='thu';render()});await sleep(400);await p.click('#panel [data-petshop]',{force:true});await sleep(1500);await imgs();
 R.shop=await p.evaluate(()=>{const M=document.getElementById('modal'),R=e=>e.getBoundingClientRect();const tiles=[...M.querySelectorAll('.kshc')];const rows={};tiles.forEach(t=>{const y=Math.round(R(t).top);(rows[y]=rows[y]||[]).push(t)});
  const part=(t,s,edge)=>{const e=t.querySelector(s);return e?R(e)[edge]:NaN};const sp=a=>a.length?+(Math.max(...a)-Math.min(...a)).toFixed(2):0;
  const rr=Object.values(rows).map(ts=>({n:ts.length,pic:sp(ts.map(t=>part(t,'.kshpic','top'))),name:sp(ts.map(t=>part(t,'.kshn','top'))),use:sp(ts.map(t=>part(t,'.kshe','top'))),price:sp(ts.map(t=>part(t,'.kshp','bottom'))),
   step:sp(ts.map(t=>part(t,'.kshst','top'))),btn:sp(ts.map(t=>part(t,'.kshgo','top'))),h:sp(ts.map(t=>R(t).height))}));
  const cols=[...new Set(tiles.map(t=>Math.round(R(t).left)))].length;const colX={};tiles.forEach(t=>{const x=Math.round(R(t).left);(colX[x]=colX[x]||[]).push(R(t).width)});
  const pics=tiles.map(t=>t.querySelector('img')).filter(Boolean);
  return{title:M.querySelector('.kptitle').textContent,tiles:tiles.length,cols,rows:rr,worstRow:Math.max(0,...rr.map(r=>Math.max(r.pic,r.name,r.use,r.price,r.step,r.btn,r.h))),
   allNon:pics.every(i=>/-non\.webp/.test(i.src)),loaded:pics.filter(i=>i.naturalWidth>0).length+'/'+pics.length,x:!!M.querySelector('.kph > .kit-x'),
   seller:(M.querySelector('.kpsubj.kes .kpsn')||{}).textContent||'',grey:[...M.querySelectorAll('.kshgo:disabled')].map(b=>b.textContent).slice(0,4)}});
 await shot('02-pet-shop');A.push(await audit('shop'));
 R.buy=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const t=[...document.querySelectorAll('#modal .kshc')].find(c=>/Mèo mướp/.test(c.textContent));if(!t)return'no tile';
  const b0=S.bac;Math.__r=Math.random;Math.random=()=>0.01;t.querySelector('.kshgo').click();await W(500);Math.random=Math.__r;const P=S.pets[0];
  return{bac:[b0,S.bac],pets:S.pets.map(x=>x.t),stage:P&&petStage(P),stats:P&&[P.full,P.clean,P.joy,P.aff],again:(document.querySelector('#modal .kshc .kshgo:disabled')||{}).textContent||''}});
 await p.evaluate(()=>{Q.length=0;closeModal()}).catch(()=>{});
 /* --- 3. the pet card picture per stage --- */
 R.stagePics=[];for(const [k,s] of [['kylan',0],['kylan',1],['kylan',2],['kylan',3],['meo',3],['thienma',2],['hac',1]]){
  const r=await p.evaluate(async([k,s])=>{const W=t=>new Promise(r=>setTimeout(r,t));Q.length=0;try{closeModal()}catch(e){}S.pets=[];S.petTip=1;petAdd(S,k,'Hoàng thượng ban','emp');S.pets[0].stg=s;S.petOn=0;tab='inv';KINV_SUB='thu';render();await W(400);
   const im=document.querySelector('#panel [data-skill="pet-0"] img');if(im&&!im.complete)await new Promise(r=>{im.onload=im.onerror=r;setTimeout(r,8000)});
   const T=petT(S.pets[0]);return{k,s,tier:PET_TIER[T.tr],src:im&&im.src.replace(/^.*\//,''),ok:!!(im&&im.naturalWidth),rescue:!!T.rescue,rows:(document.querySelector('#panel [data-skill="pet-0"] .kpkb')||{innerText:''}).innerText.replace(/\s+/g,' ').slice(0,140)}},[k,s]);
  R.stagePics.push(r);if(k==='kylan'&&s===3)await shot('03-card-kylan-linhthu');if(k==='kylan'&&s===0)await shot('03-card-kylan-non')}
 A.push(await audit('card'));await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}});
 /* --- 4. the care screen + the three games, played --- */
 await p.evaluate(()=>{S.pets=[];petAdd(S,'meo','Nhờ thái giám mua','buy');S.petOn=0;S.pets[0].full=40;S.pets[0].clean=40;S.pets[0].joy=40;S.khac=4;tab='inv';KINV_SUB='thu';render()});await sleep(600);
 R.careBtn=await p.evaluate(()=>{const b=document.querySelector('#panel [data-pet="care"]');if(!b)return'no care act';b.click();return'ok'});await sleep(1500);
 const careGeo=()=>p.evaluate(()=>{const M=document.getElementById('modal'),d=M.querySelector('.dlg'),R=e=>e.getBoundingClientRect();const fig=M.querySelector('.kpsubj.kes img');const fr=fig&&R(fig),dr=R(d);
  return{open:!M.hidden,title:(M.querySelector('.kptitle')||{}).textContent,fig:fig&&fig.src.replace(/^.*\//,''),figH:fr&&Math.round(fr.height),dlg:[Math.round(dr.width),Math.round(dr.height)],
   cells:[...M.querySelectorAll('#kpcare .kst')].map(c=>c.innerText.replace(/\s+/g,' ')),x:!!M.querySelector('.kph > .kit-x'),band:!!M.querySelector('.kdlgart'),inside:dr.bottom<=innerHeight+1&&dr.right<=innerWidth+1,
   privateCss:!!document.getElementById('kpetcare-css')}});
 R.care=await careGeo();await shot('04-care');A.push(await audit('care'));
 R.feed=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const P=S.pets[0];const f0=P.full;document.querySelector('#modal [data-petc="feed"]').click();await W(300);
  const ok=PETC_FOOD[petcKind(P.t)];const b=document.querySelector(`#modal [data-food="${ok}"]`);if(!b)return'no food';const r=b.getBoundingClientRect();
  b.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,clientX:r.left+5,clientY:r.top+5,pointerId:1}));const fig=document.querySelector('#modal .kpsubj.kes').getBoundingClientRect();
  /* drag onto the .kesimg rect only works with the picture loaded; the kit's own "touch the food, then touch the pet" path is exercised here (images are not reachable from the sandbox) */
  dispatchEvent(new PointerEvent('pointerup',{clientX:-5,clientY:-5,pointerId:1}));document.querySelector('#modal .kpsubj.kes').click();await W(400);
  return{full:[f0,P.full],aff:P.aff,msg:(document.querySelector('#kpcare .kinvrows, #kpcare')||{innerText:''}).innerText.match(/Vừa rồi[^\n]*\n?[^\n]*/)?.[0]||''}});
 await shot('05-care-after-feed');
 R.bath=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const P=S.pets[0];const c0=P.clean;document.querySelector('#modal [data-petc="bath"]').click();await W(300);const st=document.querySelector('#modal .kpsubj.kes');const r=st.getBoundingClientRect();
  for(let i=0;i<5;i++){st.dispatchEvent(new PointerEvent('pointerdown',{bubbles:true,clientX:r.left+20,clientY:r.top+40,pointerId:2}));st.dispatchEvent(new PointerEvent('pointerup',{bubbles:true,clientX:r.left+20,clientY:r.top+160,pointerId:2}));await W(60)}await W(300);return{clean:[c0,P.clean]}});
 R.play=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const P=S.pets[0];const j0=P.joy;document.querySelector('#modal [data-petc="play"]').click();await W(300);const shot1=document.querySelectorAll('#modal [data-ball].on').length;
  if(typeof PETC.peek!=='function')return{err:'no peek',game:PETC.game,btn:!!document.querySelector('#modal [data-petc="play"]'),dis:(document.querySelector('#modal [data-petc="play"]')||{}).disabled,khac:S.khac,box:!!document.querySelector('#modal [data-ball]')};for(let i=0;i<3;i++){const l=PETC.peek();document.querySelector(`#modal [data-ball="${l}"]`).click();await W(120)}await W(300);return{joy:[j0,P.joy],litOne:shot1}});
 await p.evaluate(()=>{document.querySelector('#modal [data-petc="play"]')&&0});R.closeX=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));const x=document.querySelector('#modal .kph > .kit-x');if(x)x.click();await W(400);return document.getElementById('modal').hidden&&PETC.i===-1});
 /* --- 5. growth: time + Tình cảm → the "đã lớn" card, Linh thú picture --- */
 R.grow=await p.evaluate(async()=>{const W=t=>new Promise(r=>setTimeout(r,t));Q.length=0;S.pets=[];petAdd(S,'kylan','Thái hậu ban','th');const P=S.pets[0];P.at=tsbWk()-60;P.aff=95;const st=[];
  for(let i=0;i<3;i++){petcGrow(S,P,false);st.push(petStage(P))}await W(300);return{st,card:(document.querySelector('#modal .kptitle')||{}).textContent||'',pic:petcStageSrc(P,1).src.replace(/^.*\//,'')}});
 await shot('06-grow-card');await p.evaluate(()=>{Q.length=0;try{closeModal()}catch(e){}});
 /* --- 6. Ngự tứ saves a life only as Linh thú --- */
 R.rescue=await p.evaluate(()=>{const out=[];for(const s of [2,3]){Q.length=0;S.dead=false;S.pets=[];petAdd(S,'kylan','Thái hậu ban','th');S.pets[0].stg=s;S.pets[0].care=80;S.petOn=0;
   const j=petRescuer(S);out.push({stage:s,rescuer:j})}return out});
 /* --- 7. neglect: omen card → runs away with a notice --- */
 R.neglect=await p.evaluate(()=>{Q.length=0;S.pets=[];petAdd(S,'cho','Nhờ thái giám mua','buy');const P=S.pets[0];P.full=10;P.clean=10;P.joy=10;const seen=[];
  for(let w=0;w<5&&S.pets.length;w++){petWeek();seen.push(Q.map(m=>m.t).join('|'));Q.length=0}return{left:S.pets.length,cards:seen}});
 /* --- 8. other palaces: help, steal; an NPC steals hers --- */
 R.others=await p.evaluate(()=>{const v=liveRivals(true).find(x=>x.alive);if(!v)return'no npc';Q.length=0;v.pets=[];petAdd(v,'vet','Nhờ thái giám mua','buy');petcInit(v.pets[0]);v.pets[0].full=30;S.pets=[];S.khac=4;
  const f0=v.pets[0].full,r0=rel(v,S);const t1=ACT.petcare.f(S,v);const help={full:[f0,v.pets[0].full],rel:[r0,rel(v,S)],txt:t1};
  Math.__r=Math.random;Math.random=()=>0.01;const caught0=window.caught;window.caught=()=>"";let t2='';try{t2=ACT.petsteal.f(S,v)}finally{window.caught=caught0;Math.random=Math.__r}
  const steal={mine:S.pets.map(x=>x.t+':'+petStage(x)),hers:v.pets.map(x=>x.t),txt:t2};
  S.pets=[];petAdd(S,'meo','Nhờ thái giám mua','buy');v.pets=[];Math.random=()=>0.01;window.caught=()=>"";let t3='';try{t3=ACT.petsteal.f(v,S)}finally{window.caught=caught0;Math.random=Math.__r}
  const npc={mine:S.pets.map(x=>x.t),hers:v.pets.map(x=>x.t),card:Q.map(m=>m.t).join('|'),txt:t3};Q.length=0;
  const menu={care:typeof ACT.petcare.ok==='function'&&ACT.petcare.ok(S,v),groups:RVGRP.filter(g=>g[1].includes('petcare')||g[1].includes('petsteal')).map(g=>g[0])};return{help,steal,npc,menu}});
 /* --- 9. a few weeks of play with pets: no errors --- */
 R.weeks=await p.evaluate(()=>{Q.length=0;S.pets=[];petAdd(S,'meo','x','buy');petAdd(S,'hac','x','th');S.petOn=0;let e='';for(let i=0;i<12;i++){try{nextBuoi()}catch(x){e=x.message}Q.length=0;try{closeModal()}catch(x){}}const dw=document.getElementById('dawn');if(dw)dw.remove();document.body.classList.remove('kbk-open');render();return{e,pets:S.pets.map(P=>P.t+':'+petStage(P)+':'+Math.round(P.care))}});
 A.push(await audit('after-weeks'));
 console.log(JSON.stringify({R,A,errs:errs.slice(0,8),errsOld:errsOld.slice(0,4)}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
