/* NEWS SIEVE videos (owner OD 26/11 ~04:40Z): BUILT site, HOST mode, the owner's two devices. A palace life is played ~4 tuần by the bot (the
   same one as news-sieve.test.js), then on screen: the «Tin báo» box (short, only her news), the morning «Tin trong cung» card, the monthly
   «Tin trong cung · tổng kết tháng» panel, and a consort's card in Hậu cung with every nết shown. Each step held ~3 s, closed with «Lui» / ✕.
   NEWS-SIEVE-2 (owner OD 26/11 ~05:05Z): one big NPC ↔ NPC harm (a hủy dung, landed now) is in the «Tin báo» box, the Sổ ghi tab shows its record
   (doer, victim, cause, result), and the Cung nhân tab shows her servants' nết open.
   usage: node dev/test/news-sieve-video.js <outdir> [fold,ipadAir]   (run bash dev/site/build_site.sh first) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs');const path=require('path');
const OUT=process.argv[2]||'/tmp/news-sieve-video';const DEVS=(process.argv[3]||'fold,ipadAir').split(',');fs.mkdirSync(OUT,{recursive:true});
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();
 for(const dev of DEVS){const d=D.DEVICES[dev];const ctx=await D.newDeviceContext(b,dev,{recordVideo:{dir:OUT,size:{width:d.w,height:d.h}},deviceScaleFactor:1});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));const f=await D.openHost(p,srv.url);
  await f.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:180000});await p.waitForTimeout(2000);
  await f.evaluate(()=>{let s=9973;Math.random=()=>{s=(s*16807)%2147483647;return (s-1)/2147483646};try{localStorage.clear()}catch(e){}
   setInterval(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul,#kload').forEach(r=>r.remove())},200);
   SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;let g=0;do{start();g++}while((isSrv()||(typeof isKc==='function'&&isKc()))&&g<60);window.__nlInner=0;quiet=false;Q.length=0;try{deal()}catch(e){}render()});
  /* the bot plays 4 tuần quietly (cards answered with the first payable option), the last morning card and the month summary are kept */
  await f.evaluate(()=>{window.__bot=1;let keep=[];const drain=()=>{let g=0;while(Q.length&&g++<40){const m=Q[0];if(m&&(m.nsSum||/^Tin trong cung/.test(m.t||''))){keep.push(Q.shift());continue}
     try{if(m&&m.opts&&m.opts.length){let i=m.opts.findIndex(c=>!c.off&&!(c.fx&&c.fx.bac&&S.bac+c.fx.bac<0));chooseM(i<0?0:i);if(Q[0]===m)Q.shift()}else Q.shift()}catch(e){Q.shift()}}Q.length=0;S.mg=0};
   for(let d=0;d<4;d++)for(let bb=0;bb<5;bb++){drain();try{placeWhere()}catch(e){}try{nextBuoi()}catch(e){}drain()}
   window.__keep={sum:keep.filter(m=>m.nsSum).pop()||null,card:keep.filter(m=>!m.nsSum&&typeof m.h==='string').pop()||null};window.__bot=0;try{closeModal()}catch(e){}Q.length=0;render()});
  /* the night / dawn scenes the bot's days left on screen: press their end button or tap to skip, like a player */
  const clear=async()=>{for(let i=0;i<40;i++){const n=await f.evaluate(()=>{let n=0;document.querySelectorAll('.kmov.km-endon > .kmend').forEach(b=>{b.click();n++});
     for(const el of document.querySelectorAll('button, .kbtn, [role=button], div, p, span')){const t=(el.textContent||'').trim();if(/^(Tiếp theo|Chạm để bỏ qua|Chạm để mở|Nhận)$/.test(t)&&el.getClientRects().length&&el.children.length<=2){el.click();n++;break}}
     const d=document.getElementById('dawn');if(d&&getComputedStyle(d).display!=="none"&&d.getClientRects().length){const bb=d.querySelector("button");(bb||d).click();n++}return n});const busy=await f.evaluate(()=>[...document.querySelectorAll('.kmov')].some(e=>e.getClientRects().length));if(!n&&!busy)break;await p.waitForTimeout(900)}};
  await p.waitForTimeout(2500);await clear();await p.waitForTimeout(1200);await clear();
  const shot=async n=>{await p.screenshot({path:path.join(OUT,`${dev}-${n}.png`)})};
  await clear();
  /* the start-of-life chest (kit motion scene) re-queues itself after the bot skipped it: hidden for this recording only (not part of this change) */
  await f.evaluate(()=>{const st=document.createElement('style');st.textContent='.kmov{display:none!important}';document.head.appendChild(st)});
  /* 0 a big harm between two other consorts lands now (parallel time: as when a sent deed lands) */
  await f.evaluate(()=>{const L=liveRivals(true).filter(v=>v&&v.alive&&!v.out&&!v.confined);const A=L[0],B=L.find(v=>v!==A&&!sameHouse(A,v));if(!A||!B)return;
   try{npcLearn(A,B)}catch(e){}delete B.scar;const mo=motiveOK;motiveOK=()=>({ok:true});const pl=PT.landing;PT.landing=1;try{runAct(A,B,'huydung')}finally{PT.landing=pl;motiveOK=mo}try{kitKnowFlush()}catch(e){}Q.length=0;render()});
  /* 1 the box «Tin báo» */
  await f.evaluate(()=>{try{kitNoticeSeen&&0}catch(e){}const L=kitNoticeList();if(!L.length)kitNotice({id:'nsv-v',line:'Đêm qua thẻ bài của Hoàng hậu được lật.',text:'Đêm qua thẻ bài của Hoàng hậu được lật.'});for(const x of kitNoticeList().slice(0,6))x.seen=false;kitNoticeOpen()});
  await p.waitForTimeout(1200);await clear();await f.evaluate(()=>{if(!Q.some(m=>m&&m.t==='Tin báo'))kitNoticeOpen()});await p.waitForTimeout(2500);await shot('1-tinbao');
  await f.evaluate(()=>{try{closeModal()}catch(e){}});await p.waitForTimeout(1500);await clear();
  /* 2 the morning card «Tin trong cung buổi này» (after the sieve) */
  await f.evaluate(()=>{const m=__keep.card;if(m){Q.unshift(m);showModal()}});await p.waitForTimeout(1200);await clear();await p.waitForTimeout(2500);await shot('2-tintrongcung');
  await f.evaluate(()=>{try{closeModal()}catch(e){}});await p.waitForTimeout(1500);await clear();
  /* 2b the Sổ ghi (Mệnh truyện › Sổ ghi): the harem record with doer, victim, cause */
  await f.evaluate(()=>{tab='log';render()});await p.waitForTimeout(3500);await shot('2b-soghi');
  /* 3 the monthly summary */
  await f.evaluate(()=>{let m=__keep.sum;if(!m){m=nsMonth()}else{Q.unshift(m)}showModal()});await p.waitForTimeout(1200);await clear();await p.waitForTimeout(3000);await shot('3-tongket');
  await f.evaluate(()=>{try{closeModal()}catch(e){}});await p.waitForTimeout(1500);await clear();
  /* 4 Hậu cung: a consort's card, nết open */
  await f.evaluate(()=>{const b=[...document.querySelectorAll('#tabs [data-tab], #tabs button, .tabs button')].find(x=>/Hậu cung/.test(x.textContent||''));if(b)b.click();else{tab='rv';render()}});
  await p.waitForTimeout(3500);await shot('4-haucung-net');
  /* 5 Cung nhân: servants' nết open (no «Xem người») */
  await f.evaluate(()=>{tab='staff';render()});await p.waitForTimeout(3500);await shot('5-cungnhan-net');
  const v=p.video();await ctx.close();const vp=await v.path();const dst=path.join(OUT,`news-sieve-${dev}-${dev==='fold'?'755x1000':'1180x820'}.webm`);fs.renameSync(vp,dst);
  console.log(dev,'video',dst,'errors',errs.length,errs.slice(0,3))}
 await b.close();srv.close()})();
