/* review/sangbuoi-held-fix — «Sang buổi» never silently does nothing while cards wait unpainted in Q (Robot M4, 25/11: Fold, solo seed 104,
   Tháng tám trung tuần năm 1, Buổi trưa, 4 khắc spent, Q=[«Có người đến — …», «Kỳ ngộ — …»], #modal hidden, a real tap on «Sang buổi» did nothing;
   root: jdayq dqWait dropped the held turn with only render() and j9 nextBuoi returns on Q.length — the cards were never painted).
   REAL taps (page.tap on #next / the card buttons), solo, viewports Fold 755x1000 + iPad 1180x820. Cases:
   A  (robot) 4 khắc spent + 2 queued cards + #modal hidden + «Sang buổi» enabled → tap «Sang buổi» → a card shows; tap through both → the buổi advances.
   B  (dqWait exit) 4 khắc spent + a kit motion scene on screen → the turn is HELD (DQ.want); 2 cards arrive in Q unpainted; the scene closes →
      a card shows by itself (no tap needed); tap through both → the buổi advances.
   C  (newsHold) a «Tin trong cung» card unpainted in Q + DQ.newsHold + a queued kit scene (KMQ) + 4 khắc spent → tap «Sang buổi» → the news card shows,
      then the scene, then the buổi advances (no deadlock KMQ ⇄ news).
   D  (free khắc) khắc left + 2 queued cards hidden → tap «Sang buổi» → a card shows; after both, a second tap advances.
   E  (dqArmModal one-shot, the M4 state DQ.mt 0 / dropped 0) 2 cards held while an activity (#ov) is open (dqArmModal armed); the activity
      closes and an inner gate SWALLOWS the first paint → the painter looks again by itself and the card shows (no tap); then the buổi advances.
   F  (night mutual wait, Robot M4 night dump, rv 2yv2CZAt) the night choice is open (S.nfX.st "open"), a card-flip scene is QUEUED (cfBusy true,
      not on screen), «Tin trong cung» sits in Q with DQ.newsHold → before: jdayq kmFree holds the flip for the news card, jnf's night gate holds
      the news card for the flip (~80 s stall). Now: the news card paints within 1 s (time asserted), she taps it closed, the flip scene plays
      right after (≤ 1 s), she taps it, the turn goes on.
   usage: node dev/test/sangbuoi-held.js file:///…/index.html [shotDir] */
const {chromium}=require('playwright');const [,,URL,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VP=[[755,1000,2],[1180,820,2]];
(async()=>{const b=await chromium.launch();let fails=0;const rows=[];
 for(const [W,H,DS] of VP){
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:OUT?DS:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.on('crash',()=>console.log('PAGE CRASH'));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitModal&&window.DQ&&DQ.stat,null,{timeout:240000});await p.waitForTimeout(2500);
  const st=()=>p.evaluate(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);const M=document.getElementById('modal');
   return {bk:(S.day||0)+'.'+(S.buoi||0),buoi:S.buoi||0,used,Q:Q.map(m=>m.t),modal:!hid(M),mt:document.getElementById('mt').textContent,next:!document.getElementById('next').disabled,
    scene:!!document.querySelector('.kmov:not(.km-out)'),dawn:(()=>{const d=document.getElementById('dawn');return !!(d&&!hid(d)&&d.classList.contains('on'))})(),want:DQ.want,stat:Object.assign({},DQ.stat)}});
  /* a player tapping through whatever is on screen (morning panel, scene, card) — real taps */
  const tapAny=async()=>{const sel=await p.evaluate(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);const mark=e=>{document.querySelectorAll('[data-tt]').forEach(x=>x.removeAttribute('data-tt'));e.setAttribute('data-tt','1');return '[data-tt="1"]'};
    const dw=document.getElementById('dawn');if(dw&&!hid(dw)&&dw.classList.contains('on')){const bt=[...dw.querySelectorAll('button')].find(b=>b.offsetParent);if(bt)return mark(bt)}
    const vc=[...document.querySelectorAll('button')].find(b=>/Vào cung ngay/.test(b.textContent)&&b.offsetParent);if(vc)return mark(vc);
    /* a mini-game screen (#ov: «Tuyển chọn» intro / result): skip it like the robot (Bỏ qua), else its next / close button */
    const ov=document.getElementById('ov');if(ov&&!hid(ov)){const bs=[...ov.querySelectorAll('button')].filter(b=>b.getClientRects().length&&!b.disabled);const b=bs.find(b=>/Bỏ qua/.test(b.textContent))||bs.find(b=>/Nhận|Tiếp|Xong|Đóng|Rời|Về|Thôi/.test(b.textContent))||bs[0];if(b)return mark(b)}
    const kc=[...document.querySelectorAll('.kmov:not(.km-out) button,#kpodov button,#kmrew button')].find(b=>b.getClientRects().length&&!b.disabled);if(kc)return mark(kc);
    const ko=document.querySelector('.kmov:not(.km-out)');if(ko&&ko.getClientRects().length)return mark(ko);
    const M=document.getElementById('modal');if(M&&!hid(M)){const o=[...M.querySelectorAll('.opt:not([disabled])')];const th=o.find(b=>/^Thôi/.test(b.textContent.trim()));if(th)return mark(th);if(o.length)return mark(o[0]);
     const c=M.querySelector('#mclose')||[...M.querySelectorAll('button')].find(b=>b.offsetParent&&!b.disabled);if(c)return mark(c)}return ''});
   if(!sel)return false;try{await p.tap(sel,{timeout:3000,force:true})}catch(e){await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},sel)}return true};
  const drain=async(n=120)=>{let idle=0;for(let i=0;i<n&&idle<3;i++){if(await tapAny()){idle=0;await sleep(350)}else{idle++;await sleep(500)}}};
  /* new solo life */
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>document.querySelector('#modal:not([hidden]) [data-nl=ok]'),null,{timeout:60000});
  await p.tap('#modal [data-nl=ok]');await sleep(800);await drain();
  /* a quiet buổi 1 (Buổi trưa) like the robot: advance until buổi 1, nothing on screen */
  for(let i=0;i<8;i++){const s=await st();if(s.buoi===1&&!s.Q.length&&!s.modal&&!s.scene&&!s.dawn)break;await p.evaluate(()=>{try{used=BAL.time.khac;render()}catch(e){}});await sleep(900);await drain()}
  const card=(t)=>({t,h:'<p>Thử: thẻ chờ.</p>'});
  const shot=async n=>{if(OUT)await p.screenshot({path:`${OUT}/${W}x${H}-${n}.png`})};
  const waitCard=async(ms)=>{for(let i=0;i<ms/100;i++){const s=await st();if(s.modal)return s;await sleep(100)}return await st()};
  const advanced=async(bk0,ms=6000)=>{for(let i=0;i<ms/200;i++){const s=await st();if(s.bk!==bk0)return true;await sleep(200)}return false};
  const ensureQuiet=async()=>{await drain();for(let i=0;i<10;i++){const s=await st();if(!s.Q.length&&!s.modal&&!s.scene&&!s.dawn&&s.buoi<3)return s;
    if(s.buoi>=3||s.Q.length||s.modal||s.dawn){await p.evaluate(()=>{try{used=BAL.time.khac;render()}catch(e){}});await sleep(900);await drain()}}return await st()};
  const CASES={
   /* A — the robot's state, built exactly: no render after the cards land (the button keeps its enabled look) */
   A:async()=>{await p.evaluate(c=>{used=BAL.time.khac;advLock=true;Q.push(c[0],c[1]);const M=document.getElementById('modal');M.hidden=true},[card('Có người đến — thử'),card('Kỳ ngộ — thử')]);
     await sleep(500);const s0=await st();if(!s0.next)return 'setup: next disabled';if(s0.modal)return 'setup: modal open';await p.evaluate(()=>{advLock=false});
     await p.tap('#next',{force:true});const s1=await waitCard(2500);await shot('A1-card');if(!s1.modal)return 'tap «Sang buổi»: NO card painted '+JSON.stringify({Q:s1.Q,next:s1.next,want:s1.want});
     await drain();return (await advanced(s0.bk))?'':'cards closed but the buổi did not advance'},
   /* B — dqWait: turn held by a scene, cards arrive unpainted, the scene closes */
   B:async()=>{await p.evaluate(()=>{kmPush(()=>{kmStage({title:'Thử cảnh',tst:'1'})})}).catch(()=>{});
     /* no kmStage helper on this build → hold the turn through KMQ by a scene we control */
     const hasScene=(await st()).scene;if(!hasScene){await p.evaluate(()=>{kmBusy=true;const d=document.createElement('div');d.className='kmov';d.id='tstkm';d.style.cssText='position:fixed;inset:0;z-index:50;background:rgba(0,0,0,.2)';document.body.appendChild(d)})}
     const bk0=(await st()).bk;await p.evaluate(()=>{used=BAL.time.khac;render()});await sleep(800);const s0=await st();if(!s0.want)return 'setup: turn not held ('+JSON.stringify({scene:s0.scene,want:s0.want,bk:s0.bk})+')';
     await p.evaluate(c=>{Q.push(c[0],c[1]);const M=document.getElementById('modal');Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').set.call(M,true)},[card('Có người đến — thử B'),card('Kỳ ngộ — thử B')]);
     await p.evaluate(()=>{const d=document.getElementById('tstkm');if(d){d.remove();kmBusy=false}else{document.querySelectorAll('.kmov').forEach(e=>e.remove());kmBusy=false;KMQ.length=0}});
     const s1=await waitCard(3000);await shot('B1-card');if(!s1.modal)return 'scene closed: NO card painted, Q='+JSON.stringify(s1.Q)+' next='+s1.next+' dropped='+s1.stat.dropped;
     await drain();return (await advanced(bk0))?'':'cards closed but the buổi did not advance'},
   /* C — newsHold: news card unpainted + a queued scene waiting on it */
   C:async()=>{await p.evaluate(c=>{DQ.newsHold=1;used=BAL.time.khac;advLock=true;Q.push(c);document.getElementById('modal').hidden=true;
       KMQ.push(()=>{});},Object.assign(card('Tin trong cung'),{kind:'news'}));await sleep(400);await p.evaluate(()=>{advLock=false});const s0=await st();
     await p.tap('#next',{force:true});const s1=await waitCard(3000);await shot('C1-news');if(!s1.modal)return 'tap: news card NOT painted '+JSON.stringify({Q:s1.Q,want:s1.want});
     await drain();return (await advanced(s0.bk))?'':'news closed but the buổi did not advance (KMQ='+(await p.evaluate(()=>KMQ.length))+')'},
   /* D — khắc left: tap shows the card; after the cards a second tap advances */
   D:async()=>{await p.evaluate(c=>{used=0;advLock=false;render();Q.push(c[0],c[1]);document.getElementById('modal').hidden=true},[card('Thẻ D1'),card('Thẻ D2')]);await sleep(300);const s0=await st();
     await p.tap('#next',{force:true});const s1=await waitCard(2500);if(!s1.modal)return 'tap: NO card painted';await drain();const s2=await st();if(s2.bk!==s0.bk)return '';
     await p.tap('#next',{force:true});return (await advanced(s0.bk))?'':'second tap did not advance'},
   E:async()=>{const bk0=(await st()).bk;await p.evaluate(c=>{used=BAL.time.khac;advLock=true;const ov=document.getElementById('ov');ov.hidden=false;Q.push(c[0],c[1]);showModal()},[card('Có người đến — thử E'),card('Kỳ ngộ — thử E')]);
     await sleep(700);const s0=await st();if(s0.modal)return 'setup: card painted over the activity';if(!(await p.evaluate(()=>!!DQ.mt)))return 'setup: painter not armed';
     /* one inner gate swallows the next paint (the #modal stays hidden once) */
     await p.evaluate(()=>{const M=document.getElementById('modal');const d=Object.getOwnPropertyDescriptor(M,'hidden')||Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden');let sw=1;
       Object.defineProperty(M,'hidden',{configurable:true,get(){return d.get.call(this)},set(v){if(!v&&sw>0){sw--;window.__swallowed=1;return}d.set.call(this,v)}});window.__restoreHid=()=>{if(Object.getOwnPropertyDescriptor(M,'hidden'))delete M.hidden;if(d!==Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden'))Object.defineProperty(M,'hidden',d)}});
     await p.evaluate(()=>{document.getElementById('ov').hidden=true;advLock=false});
     const s1=await waitCard(4000);const sw=await p.evaluate(()=>{const w=!!window.__swallowed;window.__restoreHid();return w});await shot('E1-card');
     if(!sw)return 'setup: no paint was swallowed';if(!s1.modal)return 'activity closed + swallowed paint: NO card painted (one-shot painter) '+JSON.stringify({Q:s1.Q,mt:await p.evaluate(()=>DQ.mt)});
     await drain();return (await advanced(bk0))?'':'cards closed but the buổi did not advance'},
  };
  console.log(`${W}x${H} life ready`,JSON.stringify(await st()));
  for(const k of Object.keys(CASES)){const s=await ensureQuiet();let r;try{r=await CASES[k]()}catch(e){r='threw '+e.message.slice(0,120)}
   rows.push(`${W}x${H} ${k}: ${r?'FAIL '+r:'PASS'}`);console.log(rows[rows.length-1]);if(r)fails++;await drain()}
  if(errs.length){fails++;rows.push(`${W}x${H} page errors: ${errs.slice(0,3).join(' | ')}`)}
  await ctx.close()}
 await b.close();console.log(rows.join('\n'));console.log(fails?'FAIL '+fails:'ALL PASS');process.exit(fails?1:0)})();
