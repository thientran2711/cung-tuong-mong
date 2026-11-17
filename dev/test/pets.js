/* Thú nuôi (jpet): Tư trang ô thú nuôi, thẻ thú, mua, thẻ Ngự ban / Thu săn, đỡ mạng, sổ cũ — ảnh + soát tràn/cắt chữ + lỗi trang.
   usage: node dev/test/pets.js <baseURL> <W>x<H>@dpr <outdir> <tag> [oldsave.json]   (old save: dev/test/mk-oldsave-pets.js)
   Boot (review/pets-fix, as fix-float's rules-one-source): service workers blocked, window.__nlInner (no Luân hồi #kroul), #kload / .krbox
   removed, proxy from HTTPS_PROXY. The fuller check is dev/test/pets-fix.js.
   (ảnh thú: img/pet-*.webp ở máy — cdn_sync --pull 'img/pet*' nếu chưa có) */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,SZ,OUT,TAG,OLD]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
 await ctx.addInitScript(()=>{window.__nlInner=1;addEventListener('DOMContentLoaded',()=>{const s=document.createElement('style');s.textContent='#kroul,#kload,.krbox{display:none!important}';document.head.appendChild(s)})});
 const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[],bad404=[];p.on('pageerror',e=>errs.push(e.message));
 p.on('response',r=>{if(r.status()>=400)bad404.push(r.status()+' '+r.url().slice(-60))});
 const T0=Date.now();const shot=async n=>{console.error("shot",n,((Date.now()-T0)/1000).toFixed(0)+"s");await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:82})};
 const audit=n=>p.evaluate(n=>{const vw=innerWidth,bad=[];document.querySelectorAll('#panel *, #modal .dlg *, #rtoast *').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||e.closest('.kcattabs,.pctabs'))return;
   if(r.right>vw+1||r.left<-1)bad.push('x:'+(String(e.className)||e.tagName).slice(0,40));
   const cs=getComputedStyle(e);if(cs.textOverflow==='ellipsis'&&e.scrollWidth>e.clientWidth+1)bad.push('ell:'+e.className);
   if((e.matches('button.ka, .keqc, .kitem'))&&e.scrollWidth>e.clientWidth+2&&cs.overflowX!=='auto')bad.push('cut:'+String(e.className).slice(0,30))});
  const imgs=[...document.querySelectorAll('#panel img, #modal img')].filter(i=>i.complete&&i.naturalWidth===0&&i.src.includes('pet')).map(i=>i.src.slice(-30));
  return{n,ovX:document.documentElement.scrollWidth>vw,bad:[...new Set(bad)].slice(0,8),brokenPet:imgs}},n);
 const A=[];const clearQ=()=>p.evaluate(()=>{try{const t=document.getElementById('rtoast');if(t)t.hidden=true}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove());Q.length=0;try{$("modal").hidden=true}catch(e){}try{closeModal()}catch(e){}render()});
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
 if(OLD){const d=fs.readFileSync(OLD,'utf8');const r=await p.evaluate(d=>{try{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);if(!x)return'noload';SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;deal();showModal();render();
   return'ok '+S.name+' pets '+(S.pets||[]).map(x=>x.t).join(',')}catch(e){return'ERR '+e.message}},d);console.log('oldsave',r);await p.waitForTimeout(1200);
  await p.evaluate(()=>{Q.length=0;showModal();((document.querySelector('#panel .keq')&&document.getElementById('panel').getBoundingClientRect().height>50)||document.querySelector('#tabs [data-tab=inv]').click())});await p.waitForTimeout(900);await shot('oldsave-inv');A.push(await audit('oldsave'));
  for(let i=0;i<6;i++){await p.evaluate(()=>{Q.length=0;try{nextBuoi()}catch(e){console.error(e)}});await p.waitForTimeout(200)}A.push(await audit('oldsave-6buoi'));A.push({n:'oldsave-state',pets:await p.evaluate(()=>(S.pets||[]).map(x=>x.t+':'+Math.round(x.care)).join(',')+' petOn '+S.petOn+' dead '+S.dead)});await shot('oldsave-6buoi');
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);}
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}window.__kroulKey=null;start()});
 await p.waitForTimeout(2500);
 await p.evaluate(()=>{for(let i=0;i<20&&(S.origin.k==='cnv'||(typeof isSrv==='function'&&isSrv()));i++){try{store.set(NL_KEY,null)}catch(e){}start()}const k=document.getElementById('kroul');if(k)k.remove();window.kmPush=function(){};document.querySelectorAll('.kmov').forEach(e=>e.remove());Q.length=0;showModal();S.inv=[];S.pets=[];S.petOn=-1;S.petTip=1;S.rank=3;S.bac=600;tmPlace(S,4);render();((document.querySelector('#panel .keq')&&document.getElementById('panel').getBoundingClientRect().height>50)||document.querySelector('#tabs [data-tab=inv]').click())});
 await p.waitForTimeout(900);await shot('01-inv-empty');A.push(await audit('inv-empty'));
 /* empty slot → buy list */
 await p.click('#panel [data-keqk="pets"][data-keqi="0"]');await p.waitForTimeout(800);await shot('02-slot-buy');A.push(await audit('slot-buy'));
 /* the pet shop is the kit shop (kitShop "pet"): buy the Mèo tuyết tile */
 const buy=await p.evaluate(()=>!![...document.querySelectorAll('#modal .kshc')].find(c=>/Mèo tuyết/.test(c.textContent)));
 await p.evaluate(()=>{Math.__r=Math.random;Math.random=()=>0.01;const c=[...document.querySelectorAll('#modal .kshc')].find(c=>/Mèo tuyết/.test(c.textContent));if(c)c.querySelector('.kshgo').click()});await p.waitForTimeout(700);await p.evaluate(()=>{Math.random=Math.__r});
 await shot('03-bought-result');A.push(await audit('bought'));
 const after=await p.evaluate(()=>({pets:S.pets.map(x=>x.t),on:S.petOn,sac:S.sac}));
 /* a full stable: one of each tier */
 await clearQ();await p.evaluate(()=>{S.petTip=0;S.pets=[];S.petOn=-1;S.rank=6;document.querySelectorAll('.kmov').forEach(e=>e.remove());petAdd(S,'bachloc','Thu săn, Hoàng thượng ban','hunt');petAdd(S,'phuong','Hoàng thượng ban','emp');petAdd(S,'vet','Nhờ thái giám mua','buy');petAdd(S,'cho','Nhờ thái giám mua','buy');S.pets[3].care=20;render()});
 await p.waitForTimeout(900);await shot('04-tip-first');A.push(await audit('tip'));
 await clearQ();await p.evaluate(()=>{if(!document.querySelector('#panel .keq[data-keq="pets"]'))((document.querySelector('#panel .keq')&&document.getElementById('panel').getBoundingClientRect().height>50)||document.querySelector('#tabs [data-tab=inv]').click())});await p.waitForTimeout(800);
 await p.evaluate(()=>{const e=document.querySelector('#panel .keq[data-keq="pets"]');if(e)e.scrollIntoView({block:'start'})});await p.waitForTimeout(400);await shot('05-inv-pets');A.push(await audit('inv-pets'));
 await p.click('#panel [data-keqk="pets"][data-keqi="0"]');await p.waitForTimeout(800);await shot('06-pet-card-than');A.push(await audit('pet-card'));
 await clearQ();await p.click('#panel [data-keqk="pets"][data-keqi="2"]');await p.waitForTimeout(800);await shot('07-pet-card-vet');A.push(await audit('pet-card2'));
 await p.click('#modal [data-pet="follow"]');await p.waitForTimeout(700);await shot('08-follow-result');const fol=await p.evaluate(()=>({on:S.petOn,tamco:S.tamco,petB:S.petB}));
 /* event cards */
 await clearQ();await p.evaluate(()=>{petCard("tsbPetGift",{src:"emp",t:"thienma"},"Ngự ban")});await p.waitForTimeout(900);await shot('09-card-ngu-ban');A.push(await audit('card-emp'));
 await clearQ();await p.evaluate(()=>{petCard("tsbPetHunt",{ts:["camke","cuuvi"]},"Thu săn")});await p.waitForTimeout(900);await shot('10-card-thu-san');A.push(await audit('card-hunt'));
 await p.evaluate(()=>{const b=document.querySelector('#modal .opts button[data-m="1"]');if(b)b.click()});await p.waitForTimeout(900);await shot('11-thu-san-result');
 await clearQ();await p.evaluate(()=>{petCard("tsbPetW",{i:3},"Thú nuôi biếng ăn")});await p.waitForTimeout(900);await shot('12-card-bieng-an');A.push(await audit('card-w'));
 /* đỡ mạng: Sức 0 at the end of the week */
 await clearQ();const res=await p.evaluate(()=>{const n0=S.pets.length;S.pets.forEach(P=>{if(petT(P).tr===4)P.stg=3});/* Ngự tứ saves a life only as Linh thú */S.suc=0;rivalsTurn();return{dead:S.dead,suc:S.suc,n0,n1:S.pets.length,has:S.pets.some(x=>x.t==='bachloc')}});
 await p.waitForTimeout(900);await shot('13-do-mang');A.push(await audit('rescue'));
 /* the second time there is no sacred animal any more: death is real */
 await clearQ();await p.evaluate(()=>{for(let i=0;i<3;i++){try{nextBuoi()}catch(e){console.error(e)}Q.length=0}});
 console.log(JSON.stringify({TAG,buy,after,fol,res,A,errs:errs.slice(0,6),bad404:bad404.filter(x=>/pet/.test(x)).slice(0,6)}));await b.close()})();
