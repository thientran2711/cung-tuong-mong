/* review/ts-a (Top 15 lô A, jts.js): plays each idea once on the live layout and shoots one picture per idea.
   usage: node dev/test/ts-a.js <baseURL> <W>x<H>@dpr <outdir> <tag> [smoke]
   Needs a static server on the repo root (python3 -m http.server). reducedMotion on (machine is slow).
   Prints JSON: per step {k, overflowX, cut (text cut by its box), errs}. */
const {chromium}=require('playwright');
const [,,BASE,SZ,OUT,TAG,MODE]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
const fs=require('fs');
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',hasTouch:true,isMobile:W<1100});
 /* BASE "root" = serve the repo root from disk through the browser (no separate server needed) */
 let URL0=BASE;if(BASE==='root'){const R=require('path').resolve(__dirname,'../..');const MT={html:'text/html; charset=utf-8',js:'text/javascript',json:'application/json',webp:'image/webp',png:'image/png',jpg:'image/jpeg',mp3:'audio/mpeg',css:'text/css',webmanifest:'application/json'};
  await ctx.route('http://ts.local/**',r=>{let u=decodeURIComponent(new URL(r.request().url()).pathname);if(u==='/')u='/index.html';const f=R+u;if(!fs.existsSync(f))return r.fulfill({status:404,body:''});r.fulfill({status:200,contentType:MT[f.split('.').pop()]||'application/octet-stream',body:fs.readFileSync(f)})});URL0='http://ts.local/index.html'}
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL0,{waitUntil:'domcontentloaded'});await p.waitForTimeout(3000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;
  for(let i=0;i<80;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!isSrv())break}try{NLP=null}catch(e){}
  Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});
 await p.waitForTimeout(1500);
 for(let i=0;i<3;i++){await p.evaluate(()=>{document.querySelectorAll('#kroul,.kroul').forEach(e=>{const b=[...e.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(b)b.click();else e.remove()});Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});await p.waitForTimeout(700)}
 if(MODE==='smoke'){const r=await p.evaluate(()=>{const out=[];for(let t=0;t<60&&!S.dead;t++){Q.length=0;if(S.mg)S.mg=null;try{endTurn()}catch(e){out.push('ERR '+e.message)}out.push(Q.map(m=>m.t).join('|'))}return{out:out.filter(Boolean),ts:S.ts,dead:S.dead}});
  console.log(JSON.stringify({r,errs}).slice(0,6000));await b.close();return}
 const check=async k=>{for(let i=0;i<3;i++){await p.evaluate(()=>document.querySelectorAll('[data-km-close]').forEach(b=>b.click()));await p.waitForTimeout(300)}await p.waitForTimeout(600);const r=await p.evaluate(()=>{const vw=innerWidth;const cut=[];
   document.querySelectorAll('#modal:not([hidden]) .kpanel *, #kg82 *, #kpodov *, #k3tc *, #rtoast *').forEach(e=>{if(!e.offsetParent&&e.id!=='kpodov')return;const cs=getComputedStyle(e);if(e.children.length)return;if(!e.textContent.trim())return;
    if((cs.overflow==='hidden'||cs.textOverflow==='ellipsis')&&(e.scrollWidth>e.clientWidth+2||e.scrollHeight>e.clientHeight+3))cut.push(e.className+':'+e.textContent.trim().slice(0,30))});
   return{overflowX:document.documentElement.scrollWidth>vw,cut:cut.slice(0,5)}});
  await p.screenshot({path:`${OUT}/${TAG}-${k}.jpg`,type:'jpeg',quality:80});R.push(Object.assign({k},r));};
 const R=[];
 const clear0=async()=>{for(let i=0;i<5;i++){await p.evaluate(()=>document.querySelectorAll('[data-km-close]').forEach(b=>b.click()));await p.waitForTimeout(400)}};
 const clear=async()=>{for(let i=0;i<4;i++){await p.evaluate(()=>document.querySelectorAll('[data-km-close]').forEach(b=>b.click()));await p.waitForTimeout(250)}await p.evaluate(()=>{try{kg82Close(true)}catch(e){}try{kitPodiumClose(true)}catch(e){}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const t=document.getElementById('rtoast');if(t)t.hidden=true;document.getElementById('ov').hidden=true;render()});await p.waitForTimeout(400)};
 /* 6: danger bar */
 await p.evaluate(()=>{const v=liveRivals(false)[1];v.ghen=75;S.met[v.id]=1;const w=liveRivals(false)[2];oanAdd(w,S,45);S.met[w.id]=1;render();TSA.dangerPanel()});await check('6-nguy-hiem');await clear();
 /* 5: promotion gate */
 await p.evaluate(()=>{TSA.promoPanel(false)});await check('5-xet-pham');await clear();
 /* 3: summon (đàn) + mini game */
 await p.evaluate(()=>{TSA.summonMe('dan');showModal()});await check('3-trieu-dan');
 await p.evaluate(()=>{const b=document.querySelector('#modal .opt[data-m="0"]');b.click()});await p.waitForTimeout(1500);await p.evaluate(()=>{const g=document.getElementById('kg82go');if(g)g.click()});await p.waitForTimeout(3500);await check('3-dan-choi');await clear();
 /* 3: du hồ with an omen (border unrest) */
 await p.evaluate(()=>{const T=trS();T.bien=40;TSA.summonMe('duho');showModal()});await check('3-du-ho-dieu-bao');
 await p.evaluate(()=>{const b=document.querySelector('#modal .opt[data-m="0"]');b.click()});await p.waitForTimeout(1500);await p.evaluate(()=>{KG82.tsRisk=1;const g=document.getElementById('kg82go');if(g)g.click()});await p.waitForTimeout(13200);await check('3-du-ho-ho-gia');
 await p.evaluate(()=>{const g=document.querySelector('.ts-guard');if(g)g.click()});await p.waitForTimeout(800);await clear();
 /* 3: cờ */
 await p.evaluate(()=>{TSA.summonMe('co');showModal()});await p.evaluate(()=>{document.querySelector('#modal .opt[data-m="0"]').click()});await p.waitForTimeout(1500);await p.evaluate(()=>{const g=document.getElementById('kg82go');if(g)g.click()});await p.waitForTimeout(2500);await check('3-co');
 await p.evaluate(()=>{const s=document.getElementById('kg82skip');if(s)s.click()});await clear();
 /* 4: lễ tấn phong (she is host) */
 await p.evaluate(()=>{S.bac=300;S.lastPromo=-99;S.sung=90;S.danh=90;S.rank=Math.min(S.rank,5);const r0=S.rank;promoteP(S);if(S.rank===r0){S.rank++;TSA.leHost(S,S.rank)}showModal()});await clear0();await check('4-le-tan-phong');
 await p.evaluate(()=>{const b=document.querySelector('#modal .opt[data-m="0"]');if(b)b.click()});await p.waitForTimeout(1200);await check('4-le-ket-qua');await clear();await p.evaluate(()=>{const t=document.getElementById('rtoast');if(t){t.hidden=true;t.classList.remove('on','show')}});
 await p.evaluate(()=>{const v=liveRivals(false)[3];TSA.leHost(v,v.rank+1);showModal()});await clear0();await check('4-le-cua-nang');await clear();
 /* 12: birth reward */
 await p.evaluate(()=>{S.th=40;S.sung=40;const r=birthP(S,false);showModal()});await clear0();await check('12-an-thuong-sinh');await clear();
 /* 14: lantern */
 await p.evaluate(()=>{S.month=1;S.tuan=(FEST.nguyentieu.t||[0])[0];S.buoi=BUOI.length-1;used=0;deal();render();const f=festToday();TSA.denWish(f||{k:'nguyentieu',name:'Nguyên tiêu'});showModal()});await check('14-tha-den');
 await p.evaluate(()=>{document.querySelector('#modal .opt[data-m="2"]').click()});await p.waitForTimeout(1500);await p.evaluate(()=>{const g=document.getElementById('kg82go');if(g)g.click()});await p.waitForTimeout(4000);await check('14-tha-den-choi');await clear();
 /* 2: dress contest */
 await p.evaluate(()=>{['tramngoc','vongngoc','luahang','tuithom','boodieu'].forEach(k=>S.inv.push({k,from:'shop'}));S.month=3;S.tuan=1;TSA.dressAnnounce();showModal()});await check('2-bao-de');await clear();
 await p.evaluate(()=>{S.month=4;S.tuan=1;S.ts.dress.m=4;S.ts.dress.y=S.year;TSA.dressHold();showModal()});await p.evaluate(()=>{document.querySelector('#modal .opt[data-m="0"]').click()});await p.waitForTimeout(1500);
 await p.evaluate(()=>{const it=[...document.querySelectorAll('[data-tsi]')];if(it[0])it[0].click()});await p.waitForTimeout(300);await p.evaluate(()=>{const it=[...document.querySelectorAll('[data-tsi]')];if(it[1])it[1].click();const it2=[...document.querySelectorAll('[data-tsi]')];if(it2[2])it2[2].click()});await check('2-phoi-do');
 await p.evaluate(()=>{document.getElementById('tsdgo').click()});await p.waitForTimeout(2500);await check('2-buc-vinh-danh');await clear();
 /* HUD chips */
 await check('hud');
 /* old save loads */
 const old=await p.evaluate(()=>{try{const raw=localStorage.getItem('hclh-save-v2-3')||localStorage.getItem('hclh-slot');return !!raw}catch(e){return false}});
 console.log(JSON.stringify({TAG,R,errs:errs.slice(0,8),old}));await b.close()})();
