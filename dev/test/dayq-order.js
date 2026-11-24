/* FLIGHT-DAYQ (owner 24/11 ~18:05Z bug (5)) — scripted repro of her exact path + the new-day order, real render, Fold + iPad.
   Her path: Tài nghệ › Vũ › Múa self-study ends the LAST buổi of the day (its callback: S.mg=null; wkFinishLesson; render) → the
   «Tác phẩm tự tay · Nhận» reveal (kitGain via kmPush) → the day turn.
   Checks per viewport:
     R1 the reveal is on screen and the day does NOT turn under it (3.5 s > the 2.6 s auto-advance timer): same buổi, DQ.want held;
     R2 tap «Nhận» → the turn runs by itself: new day (buổi 0), the title card (#dawn.kne-day) or the book is up, no card painted (#modal hidden);
     R3 tap through the title card → the Tuần lục book; still no card painted over it, no motion scene over it;
     R4 close the book → «Tin trong cung» is the FIRST card shown (when the day has news), the book is gone;
     R5 answer the cards: the morning (buổi 0) shows no optional (j68) event and no unslotted world event; no page error.
   Shots (looked at, not in git): <out>/<vp>-R1.png … R4.png
   usage: node dev/test/dayq-order.js <baseURL> <path> <outDir>   e.g. http://127.0.0.1:8765 dev/index.html /home/user/wt/dayq/shots/after */
const {chromium}=require('playwright');const fs=require('fs');const [,,BASE,PATH,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VP=[[755,1000,2],[1180,820,2]];const i0=x=>!x;
const NEWLIFE=`(function(){localStorage.removeItem('hclh-opt');SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){window.__forceOrigin='thd';window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==='function'&&isSrv()))break}
 quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;['kroul','kload','kpodov'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});const d=document.getElementById('dawn');if(d){d.hidden=true;d.className='dawn';d.innerHTML=''}document.body.classList.remove('kbk-open');render();return S.name})()`;
const realHid=`(el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el))`;
(async()=>{const b=await chromium.launch();const out={};let fail=0;if(OUT)fs.mkdirSync(OUT,{recursive:true});
 for(const vp of VP){const tag=vp[0]+'x'+vp[1];const c=await b.newContext({serviceWorkers:'block',viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2]});
  const p=await c.newPage();const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,160)));await p.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
  const shot=async n=>{if(OUT)await p.screenshot({path:`${OUT}/${tag}-${n}.png`})};
  await p.goto(BASE+'/'+PATH);await p.waitForFunction(()=>typeof start==='function'&&!!document.querySelector('#slots button[data-new="1"]'),null,{timeout:60000}).catch(e=>console.log('wait',e.message.slice(0,80),pe));await sleep(1500);await p.evaluate(()=>localStorage.clear());await p.evaluate(NEWLIFE);await sleep(800);
  const r={vp:tag,bad:[]};const bad=s=>r.bad.push(s);
  /* play the day up to its LAST buổi (answer every card), then her Múa self-study ends that buổi */
  await p.evaluate(async()=>{const ans=()=>{for(let k=0;k<40&&Q.length;k++){const m=Q[0];if(m.opts&&m.opts.length){const i=m.opts.findIndex(o=>!o.off&&!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0));chooseM(i<0?0:i)}else closeModal()}};
   for(let i=0;i<12&&(S.buoi||0)<B4L&&!S.dead;i++){ans();used=BAL.time.khac;nextBuoi();await new Promise(r=>setTimeout(r,400));
    const d=document.getElementById('dawn');if(d&&!d.hidden){d.hidden=true;d.className='dawn';d.innerHTML='';document.body.classList.remove('kbk-open')}document.querySelectorAll('.kmov').forEach(e=>e.remove());try{KMQ.length=0;kmBusy=false}catch(e){}}
   ans();document.querySelectorAll('.kmov').forEach(e=>e.remove());try{KMQ.length=0;kmBusy=false}catch(e){}render()});
  await sleep(1500);
  r.before=await p.evaluate(()=>({buoi:S.buoi,B4L,wk:wk(),Q:Q.length}));
  await p.evaluate(()=>{S.mg=null;wkFinishLesson('vu',{kind:'mua'},60,'tự học');used=BAL.time.khac;render()});
  await sleep(3500);
  const r1=await p.evaluate(`(()=>({buoi:S.buoi,wk:wk(),gain:!!document.querySelector('.kmov.kfgain'),want:window.DQ?DQ.want:null,held:window.DQ?DQ.stat.held:null,dawn:!!(document.getElementById('dawn')&&!document.getElementById('dawn').hidden)}))()`);
  r.R1=r1;await shot('R1');
  if(!r1.gain)bad('R1 no reveal on screen');if(r1.buoi!==r.before.buoi||r1.wk!==r.before.wk)bad('R1 the day turned under the reveal');if(r1.dawn)bad('R1 dawn under the reveal');
  /* tap «Nhận», then go on like a player: tap the scene's end button / the picture / answer a card, until the Tuần lục book is up;
     every step samples the screen: a card painted over the title card / book, or a motion scene over the book = fault */
  await p.click('.kmov.kfgain .krevok',{force:true}).catch(()=>bad('R2 no Nhận button'));
  const steps=[];let r2=null;
  for(let i=0;i<30;i++){await sleep(1300);
   const st=await p.evaluate(`(()=>{const d=document.getElementById('dawn');const M=document.getElementById('modal');const on=!!(d&&!d.hidden&&(d.classList.contains('on')||d.classList.contains('kne-day')));
     return{wk:wk(),buoi:S.buoi,dawn:on,kne:!!(d&&d.classList.contains('kne-day')),book:!!document.querySelector('#dawn .kbk'),modalShown:!${realHid}(M),top:String(Q[0]&&Q[0].t||'').slice(0,40),
     km:[...document.querySelectorAll('.kmov:not(.km-out)')].map(e=>e.className.slice(0,40)),end:!!(d&&d.querySelector(':scope > .kmend')),kmend:!!document.querySelector('.kmov:not(.km-out) .kmend,.kmov:not(.km-out) .krevok'),dbg:(()=>{try{return [KMQ.length,kmBusy?1:0,window.DQ?DQ.want:'-',used,BAL.time.khac,S.mg?1:0,kmFree()?1:0,Q.length].join(',')}catch(e){return String(e)}})()}})()`);
   steps.push(st);if(!r2&&st.wk!==r1.wk)r2=st;
   if(st.modalShown&&st.dawn)bad('card painted over the '+(st.book?'book':'title card')+': '+st.top);if(st.book&&st.km.length)bad('motion scene over the book: '+st.km[0]);
   if(st.book&&!st.km.length)break;
   if(st.km.length){const hit=await p.evaluate(()=>{const B=[...document.querySelectorAll('.kmov:not(.km-out) button')].filter(b=>!b.disabled&&b.getBoundingClientRect().width>0);const b=B[B.length-1];if(b){b.click();return 1}return 0});if(!hit)await p.mouse.click(vp[0]/2,vp[1]/2);continue}
   if(st.dawn){if(st.end)await p.click('#dawn > .kmend',{force:true}).catch(()=>{});else await p.mouse.click(vp[0]/2,vp[1]/2);continue}
   if(st.modalShown){await p.evaluate(()=>{const m=Q[0];if(!m)return;if(m.opts&&m.opts.length){/* the LAST open option (a decline: no mini-game) */let i=-1;for(let j=m.opts.length-1;j>=0;j--){const o=m.opts[j];if(!o.off&&!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0)){i=j;break}}chooseM(i<0?0:i)}else closeModal()});continue}
   if(await p.evaluate(()=>{const ov=document.getElementById('ov');if(ov&&!ov.hidden){const k=document.querySelector('#kg82skip')||document.querySelector('#mgskip')||document.querySelector('#mgok');if(k){k.click();return 1}}return 0}))continue;
   if(st.wk===r1.wk)await p.evaluate(()=>{try{render()}catch(e){}})}
  r.steps=steps.map(s=>`[${s.dbg}] ${s.wk}/${s.buoi}${s.dawn?(s.book?' BOOK':' CARD'):''}${s.modalShown?' modal:'+s.top:''}${s.km.length?' km:'+s.km[0]:''}`);
  r.R2=r2;if(i0(r2))bad('R2 the held turn did not run after Nhận');
  const r3=steps[steps.length-1];r.R3={book:r3.book,modalShown:r3.modalShown};await shot('R3');if(!r3.book)bad('R3 no book');
  /* close the book */
  await p.click('#dawn .kbk-x',{force:true}).catch(()=>bad('R4 no book close'));await shot('R3b');
  await sleep(1500);
  const r4=await p.evaluate(`(()=>{const d=document.getElementById('dawn');const M=document.getElementById('modal');return{dawn:!!(d&&!d.hidden&&d.classList.contains('on')),modalShown:!${realHid}(M),top:String(Q[0]&&Q[0].t||''),news:Q.some(m=>m.kind==='news'||/^Tin trong cung/.test(m.t||'')),km:document.querySelectorAll('.kmov:not(.km-out)').length,Q:Q.map(m=>String(m.t||'').slice(0,40)),evhold:(typeof EVHOLD!=='undefined'?EVHOLD.map(h=>String(h.m.t||'').slice(0,30)):[]),spread:(typeof SP13!=='undefined'?SP13.L.map(x=>String(x.m.t||'').slice(0,30)+'@'+x.due):[])}})()`);
  r.R4=r4;await shot('R4');
  if(r4.dawn)bad('R4 book still up');if(r4.news&&!/^Tin trong cung/.test(r4.top))bad('R4 news is not first: '+r4.top);if(r4.Q.length&&!r4.modalShown)bad('R4 cards wait but none is shown');if(r4.news&&r4.km)bad('R4 a motion scene over the news card');
  /* R5 answer the morning cards: what the first buổi shows */
  const r5=await p.evaluate(async()=>{const seen=[];let last=null,rep=0;for(let k=0;k<12&&Q.length;k++){const m=Q[0];if(m===last){if(++rep>2)break}else{last=m;rep=0}seen.push({t:String(m.t||'').slice(0,40),opt:typeof evOptional==='function'&&evOptional(m),slot:typeof sp13Slot==='function'&&m.__sp13?sp13Slot(m):null,mv:typeof sp13Movable==='function'&&m.__sp13?sp13Movable(m):null});
    if(m.opts&&m.opts.length){const i=m.opts.findIndex(o=>!o.off&&!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0));chooseM(i<0?0:i)}else closeModal();await new Promise(r=>setTimeout(r,150))}return{buoi:S.buoi,seen}});
  r.R5=r5;if(r5.seen.some(x=>x.opt))bad('R5 an optional event at dawn');
  r.pageErrors=pe.slice(0,5);if(pe.length)bad('page errors');if(r.bad.length)fail++;out[tag]=r;await c.close()}
 console.log(JSON.stringify(out,null,1));console.log(fail?'FAIL '+fail:'PASS');await b.close()})().catch(e=>{console.error(e);process.exit(1)});
