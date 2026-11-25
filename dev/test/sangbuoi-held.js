/* review/sangbuoi-held-fix — «Sang buổi» never silently does nothing while cards wait unpainted in Q (Robot M4, 25/11: Fold, solo seed 104,
   Tháng tám trung tuần năm 1, Buổi trưa, 4 khắc spent, Q=[«Có người đến — …», «Kỳ ngộ — …»], #modal hidden, a real tap on «Sang buổi» did nothing;
   root: jdayq dqWait dropped the held turn with only render() and j9 nextBuoi returns on Q.length — the cards were never painted).
   REAL taps (page.tap on #next / the card buttons), solo, viewports Fold 755x1000 + iPad 1180x820. Cases:
   A  (robot) 4 khắc spent + 2 queued cards + #modal hidden + «Sang buổi» enabled → tap «Sang buổi» → a card shows; tap through both → the buổi advances.
   B  (dqWait exit) 4 khắc spent + a kit motion scene on screen → the turn is HELD (DQ.want); 2 cards arrive in Q unpainted; the scene closes →
      a card shows by itself (no tap needed); tap through both → the buổi advances.
   C  (newsHold) a «Tin trong cung» card unpainted in Q + DQ.newsHold + a queued kit scene waiting on it → tap «Sang buổi» → the news card shows
      (≤ 1 s, asserted), then the scene plays, then «Sang buổi» advances (no KMQ ⇄ news wait).
   D  (free khắc) khắc left + 2 queued cards hidden → tap «Sang buổi» → a card shows; after both, a second tap advances.
   E  (dqArmModal one-shot, the M4 state DQ.mt 0 / dropped 0) 2 cards held while an activity (a kit scene on screen) is open (dqArmModal armed); the activity
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
   return {bk:(typeof wk==='function'?wk():(S.turn||0))+'.'+(S.buoi||0),buoi:S.buoi||0,used,Q:Q.map(m=>m.t),modal:!hid(M)||!!(window.DF&&DF.encM&&DF.F),mt:document.getElementById('mt').textContent,next:!document.getElementById('next').disabled,
    scene:!!document.querySelector('.kmov:not(.km-out)')||!!(window.DF&&DF.F&&!DF.encM),dawn:(()=>{const d=document.getElementById('dawn');return !!(d&&!hid(d)&&d.classList.contains('on'))})(),want:DQ.want,stat:Object.assign({},DQ.stat)}});
  /* a player tapping through whatever is on screen (morning panel, scene, card) — real taps */
  const tapAny=async()=>{const sel=await p.evaluate(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);const mark=e=>{document.querySelectorAll('[data-tt]').forEach(x=>x.removeAttribute('data-tt'));e.setAttribute('data-tt','1');return '[data-tt="1"]'};
    const dw=document.getElementById('dawn');if(dw&&!hid(dw)&&dw.classList.contains('on')){const bt=[...dw.querySelectorAll('button')].find(b=>b.offsetParent);if(bt)return mark(bt)}
    const vc=[...document.querySelectorAll('button')].find(b=>/Vào cung ngay/.test(b.textContent)&&b.offsetParent);if(vc)return mark(vc);
    /* a person view she opened (jdfv, not an encounter) is an activity: close it (its ✕) */
    if(window.DF&&DF.F&&!DF.encM){const x=document.querySelector('.kfoc .kfoc-x');if(x&&x.getClientRects().length)return mark(x)}
    /* a small open info card with its transparent catcher (jk4 kitCatchOn): the first tap outside only closes it */
    const kx=document.getElementById('kxcatch');if(kx&&!hid(kx)&&kx.getClientRects().length)return mark(kx);
    /* a mini-game screen (#ov: «Tuyển chọn» intro / result): skip it like the robot (Bỏ qua), else its next / close button */
    const ov=document.getElementById('ov');if(ov&&!hid(ov)){const bs=[...ov.querySelectorAll('button')].filter(b=>b.getClientRects().length&&!b.disabled);const b=bs.find(b=>/Bỏ qua/.test(b.textContent))||bs.find(b=>/Nhận|Tiếp|Xong|Đóng|Rời|Về|Thôi/.test(b.textContent))||bs[0];if(b)return mark(b)}
    /* a visitor playing in the jdfv stage scene (encounter): its say box / choice buttons, else its close */
    if(window.DF&&DF.F&&DF.encM){const f=document.querySelector('.kfoc');if(f){const bs=[...f.querySelectorAll('button,[role=button]')].filter(b=>b.getClientRects().length&&!b.disabled&&!b.classList.contains('kfoc-x'));const b=bs.find(b=>/^Thôi/.test(b.textContent.trim()))||bs[0]||f.querySelector('.kfoc-x');if(b)return mark(b);return mark(f)}}
    const kc=[...document.querySelectorAll('.kmov:not(.km-out) button,#kpodov button,#kmrew button')].find(b=>b.getClientRects().length&&!b.disabled);if(kc)return mark(kc);
    const ko=document.querySelector('.kmov:not(.km-out)');if(ko&&ko.getClientRects().length)return mark(ko);
    const M=document.getElementById('modal');if(M&&!hid(M)){const o=[...M.querySelectorAll('.opt:not([disabled])')];const th=o.find(b=>/^Thôi/.test(b.textContent.trim()));if(th)return mark(th);if(o.length)return mark(o[0]);
     const c=M.querySelector('#mclose')||[...M.querySelectorAll('button')].find(b=>b.offsetParent&&!b.disabled);if(c)return mark(c)}return ''});
   if(!sel)return false;try{await p.tap(sel,{timeout:3000,force:true})}catch(e){await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},sel)}return true};
  const drain=async(n=120)=>{let idle=0;for(let i=0;i<n&&idle<3;i++){if(await tapAny()){idle=0;await sleep(350)}else{idle++;await sleep(500)}}};
  /* a fresh solo life at a quiet Buổi trưa (buổi 1) like the robot: start, accept «Thân phận», tap through, turn to buổi 1 */
  const newLife=async()=>{await p.evaluate(()=>{try{kmReset()}catch(e){}Q.length=0;SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
   await p.waitForFunction(()=>document.querySelector('#modal:not([hidden]) [data-nl=ok]'),null,{timeout:60000});
   await sleep(600);try{await p.tap('#modal [data-nl=ok]',{timeout:8000})}catch(e){await p.evaluate(()=>{const b=document.querySelector('#modal [data-nl=ok]');b&&b.click()})}await sleep(800);await drain();
   for(let i=0;i<8;i++){const s=await st();if(s.buoi===1&&!s.Q.length&&!s.modal&&!s.scene&&!s.dawn)break;await p.evaluate(()=>{try{used=BAL.time.khac;render()}catch(e){}});await sleep(900);await drain()}};
  await newLife();
  const diag=()=>p.evaluate(()=>{const a=(()=>{try{const e=dqActEl();return e?(e.id||e.className||e.tagName):null}catch(x){return 'err'}})();
    const n=document.getElementById('next'),r=n.getBoundingClientRect(),e=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);
    return {hit:e&&(e===n||n.contains(e))?'next':(e&&(e.id||String(e.className).slice(0,40)||e.tagName)),act:a,dawn:(()=>{try{return dqDawn()}catch(x){return 'err'}})(),mt:DQ.mt,stat:DQ.stat,df:!!(window.DF&&DF.F),dfplay:!!(window.DF&&DF.play),cf:typeof cfBusy==='function'&&cfBusy(),nfX:S.nfX&&S.nfX.st,mg:!!S.mg,
     ov:(()=>{const o=document.getElementById('ov');return o&&!Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(o)})(),km:typeof kmBusy!=='undefined'&&kmBusy,KMQ:KMQ.length,kmov:[...document.querySelectorAll('.kmov,#kmrew,#kpodov')].map(e=>e.className||e.id)}});
  const card=(t)=>({t,h:'<p>Thử: thẻ chờ.</p>'});
  const shot=async n=>{if(OUT)await p.screenshot({path:`${OUT}/${W}x${H}-${n}.png`})};
  const waitCard=async(ms)=>{for(let i=0;i<ms/100;i++){const s=await st();if(s.modal)return s;await sleep(100)}return await st()};
  const advanced=async(bk0,ms=6000)=>{for(let i=0;i<ms/200;i++){const s=await st();if(s.bk!==bk0)return true;await sleep(200)}return false};
  const ensureQuiet=async()=>{if((await st()).buoi>=2)await newLife();/* leftovers of a failed case (our own test scenes / patched hooks) */await p.evaluate(()=>{let k=0;['tstkm','tstkc','tstcf'].forEach(i=>{const e=document.getElementById(i);if(e){e.remove();k=1}});if(k){kmBusy=false;try{kmPump()}catch(e){}}if(window.__cf0){window.cfBusy=window.__cf0;window.__cfQ=0}const o=document.getElementById('ov');if(o&&!S.mg)o.hidden=true;try{if(window.__restoreHid)window.__restoreHid()}catch(e){}});await drain();for(let i=0;i<16;i++){const s=await st();if(!s.Q.length&&!s.modal&&!s.scene&&!s.dawn&&s.buoi<2)return s;
    if(s.buoi>=2){await newLife();continue}
    if(s.Q.length||s.modal||s.dawn||s.scene){await p.evaluate(()=>{try{used=BAL.time.khac;render()}catch(e){}});await sleep(800);await drain();
      /* like a player: tap «Sang buổi» / «Sang ngày mới» when it is enabled (the night turn waits for her tap) */
      if(await p.evaluate(()=>{const n=document.getElementById('next');return !n.disabled&&!Q.length})){try{await p.tap('#next',{timeout:2000})}catch(e){}await sleep(1500);await drain()}}}return await st()};
  if(process.env.TRACE)await p.evaluate(()=>{window.__tr=[];const M=document.getElementById('modal');const d=Object.getOwnPropertyDescriptor(M,'hidden')||Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden');
    const cm=window.closeModal;window.closeModal=closeModal=function(){window.__tr.push('closeModal '+(Q[0]&&Q[0].t)+' '+new Error().stack.split('\n').slice(2,6).join('<'));return cm.apply(this,arguments)};
    const ch=window.chooseM;window.chooseM=chooseM=function(i){window.__tr.push('chooseM '+(Q[0]&&Q[0].t));return ch.apply(this,arguments)}});
  const CASES={
   /* A — the robot's state, built exactly: no render after the cards land (the button keeps its enabled look) */
   A:async()=>{await p.evaluate(c=>{used=BAL.time.khac;advLock=true;Q.push(c[0],c[1]);const M=document.getElementById('modal');M.hidden=true},[card('Có người đến — thử'),card('Kỳ ngộ — thử')]);
     await sleep(200);const s0=await st();if(!s0.next)return 'setup: next disabled';if(s0.modal)return 'setup: modal open';await p.evaluate(()=>{advLock=false});
     {const h=(await diag()).hit;if(h!=='next')return 'setup: «Sang buổi» covered by '+h}
     await p.tap('#next',{force:true});const s1=await waitCard(5000);await shot('A1-card');if(!s1.modal)return 'tap «Sang buổi»: NO card painted '+JSON.stringify({Q:s1.Q,next:s1.next,want:s1.want,d:await diag()});
     await drain();return (await advanced(s0.bk))?'':'cards closed but the buổi did not advance'},
   /* B — dqWait: turn held by a scene, cards arrive unpainted, the scene closes */
   B:async()=>{/* a kit motion scene ON SCREEN that we control (kmBusy + .kmov), like a reward scene of the old buổi */
     await p.evaluate(()=>{kmBusy=true;const d=document.createElement('div');d.className='kmov';d.id='tstkm';d.style.cssText='position:fixed;inset:0;z-index:50;background:rgba(0,0,0,.2)';document.body.appendChild(d)});
     const bk0=(await st()).bk;await p.evaluate(()=>{used=BAL.time.khac;advLock=true;nextBuoi()});await sleep(500);await p.evaluate(()=>{advLock=false});const s0=await st();if(!s0.want)return 'setup: turn not held ('+JSON.stringify({scene:s0.scene,want:s0.want,bk:s0.bk})+')';
     await p.evaluate(c=>{Q.push(c[0],c[1]);const M=document.getElementById('modal');Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').set.call(M,true)},[card('Có người đến — thử B'),card('Kỳ ngộ — thử B')]);
     await p.evaluate(()=>{const d=document.getElementById('tstkm');if(d)d.remove();kmBusy=false;try{kmPump()}catch(e){}});
     /* r2: a REAL scene the world queued meanwhile (a reward chest «Thái hậu ban thưởng» …) is an activity: the cards wait for it, she taps it
        through like a player, then a card must show by itself (no «Sang buổi» tap) */
     let s1=await waitCard(5000);for(let i=0;i<8&&!s1.modal&&(s1.scene||s1.dawn);i++){await tapAny();await sleep(400);s1=await waitCard(3000)}
     await shot('B1-card');if(!s1.modal)return 'scene closed: NO card painted, Q='+JSON.stringify(s1.Q)+' next='+s1.next+' scene='+s1.scene+' dropped='+s1.stat.dropped+' '+JSON.stringify(await diag());
     /* after her cards the turn goes on by itself (khắc spent: auto-advance) — under load allow 15 s, tapping through what the turn brings */
     await drain();for(let i=0;i<10;i++){if(await advanced(bk0,1500))return '';await tapAny()}
     return 'cards closed but the buổi did not advance '+JSON.stringify(await st())+' '+JSON.stringify(await diag())},
   /* C — newsHold: news card unpainted + a queued scene waiting on it */
   C:async()=>{await p.evaluate(c=>{DQ.newsHold=1;used=0;advLock=false;render();Q.unshift(c);Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').set.call(document.getElementById('modal'),true);
       kmPush(done=>{const d=document.createElement('div');d.className='kmov';d.id='tstkc';d.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(40,20,10,.35);display:flex;align-items:center;justify-content:center';
         d.innerHTML='<button type="button" class="main" id="tstkcb">Cảnh · xong</button>';document.body.appendChild(d);d.querySelector('button').onclick=()=>{d.remove();done()}})},
       Object.assign(card('Tin trong cung'),{kind:'news',__sp13:{b0:'x'}}));
     const t0=Date.now();await sleep(350);let s1=await st();if(s1.scene&&!s1.modal)return 'setup: the scene started over the unpainted news card';
     /* the render net may already have painted it (fine: the queue never stays hidden); else her tap on «Sang buổi» paints it */
     if(!s1.modal){const h=(await diag()).hit;if(h!=='next')return 'setup: «Sang buổi» covered by '+h;await p.tap('#next',{force:true});s1=await waitCard(3000)}const dt=Date.now()-t0;await shot('C1-news');
     if(!s1.modal||!/Tin trong cung/.test(s1.mt))return 'tap: news card NOT painted '+JSON.stringify({Q:s1.Q,want:s1.want,mt:s1.mt,d:await diag(),tr:await p.evaluate(()=>window.__tr||[])});
     if(dt>1000)return 'news painted too late '+dt+' ms';
     await tapAny();let on=0;for(let i=0;i<20&&!on;i++){on=await p.evaluate(()=>!!document.getElementById('tstkc'));if(!on)await sleep(100)}
     if(!on)return 'news closed but the held scene did not play';await p.tap('#tstkcb',{force:true});await sleep(400);await drain();
     const bk0=(await st()).bk;await p.tap('#next',{force:true});return (await advanced(bk0))?'':'«Sang buổi» did not advance after news + scene'},
   /* D — khắc left: tap shows the card; after the cards a second tap advances */
   D:async()=>{await p.evaluate(c=>{used=0;advLock=false;render();Q.push(c[0],c[1]);document.getElementById('modal').hidden=true},[card('Thẻ D1'),card('Thẻ D2')]);await sleep(200);const s0=await st();if(s0.modal)return 'setup: card already painted';{const h=(await diag()).hit;if(h!=='next')return 'setup: «Sang buổi» covered by '+h}
     await p.tap('#next',{force:true});const s1=await waitCard(5000);if(!s1.modal)return 'tap: NO card painted '+JSON.stringify({Q:s1.Q,d:await diag(),tr:(await p.evaluate(()=>window.__tr||[])).slice(-3)});await drain();const s2=await st();if(s2.bk!==s0.bk)return '';
     await p.tap('#next',{force:true});return (await advanced(s0.bk))?'':'second tap did not advance'},
   E:async()=>{const bk0=(await st()).bk;await p.evaluate(c=>{used=0;advLock=true;kmBusy=true;const d=document.createElement('div');d.className='kmov';d.id='tstkm';d.style.cssText='position:fixed;inset:0;z-index:50;background:rgba(0,0,0,.2)';document.body.appendChild(d);Q.push(c[0],c[1]);showModal()},[card('Có người đến — thử E'),card('Kỳ ngộ — thử E')]);
     await sleep(700);const s0=await st();if(s0.modal&&/thử E/.test(s0.mt))return 'setup: card painted over the activity '+JSON.stringify({mt:s0.mt,Q:s0.Q,d:await diag(),tr:await p.evaluate(()=>window.__tr||[])});if(!(await p.evaluate(()=>!!DQ.mt)))return 'setup: painter not armed';
     /* one inner gate swallows the next paint (the #modal stays hidden once) */
     await p.evaluate(()=>{const M=document.getElementById('modal');const d=Object.getOwnPropertyDescriptor(M,'hidden')||Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden');let sw=1;
       Object.defineProperty(M,'hidden',{configurable:true,get(){return d.get.call(this)},set(v){if(!v&&sw>0){sw--;window.__swallowed=1;return}d.set.call(this,v)}});window.__restoreHid=()=>{if(Object.getOwnPropertyDescriptor(M,'hidden'))delete M.hidden;if(d!==Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden'))Object.defineProperty(M,'hidden',d)}});
     await p.evaluate(()=>{const d=document.getElementById('tstkm');if(d)d.remove();kmBusy=false;advLock=false});
     const s1=await waitCard(5000);const sw=await p.evaluate(()=>{const w=!!window.__swallowed;window.__restoreHid();return w});await shot('E1-card');
     if(!sw)return 'setup: no paint was swallowed';if(!s1.modal)return 'activity closed + swallowed paint: NO card painted (one-shot painter) '+JSON.stringify({Q:s1.Q,mt:await p.evaluate(()=>DQ.mt)});
     await drain();{const b1=(await st()).bk;await p.tap('#next',{force:true});return (await advanced(b1))?'':'cards closed but «Sang buổi» did not advance'}},
   F:async()=>{/* the night choice exists only in a life where jnf is on (not a servant / khoa cử road, not parked): else a fresh life */
     for(let i=0;i<4&&!(await p.evaluate(()=>typeof nfOn==='function'&&nfOn()));i++){await newLife();await ensureQuiet()}
     const r0=await p.evaluate(()=>{used=0;advLock=false;render();S.nfX={d:(typeof wk==='function'?wk():(S.turn*3+(S.tuan||0))),st:'open',at:Date.now()};window.__cf0=window.cfBusy;window.__cfQ=1;window.cfBusy=()=>window.__cfQ===1;
       DQ.newsHold=1;Q.unshift({t:'Tin trong cung buổi này',kind:'news',__sp13:{b0:'x'},h:'<p>Thử: tin trong cung.</p>'});
       kmPush(done=>{const d=document.createElement('div');d.className='kmov kcf';d.id='tstcf';d.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(40,20,10,.35);display:flex;align-items:center;justify-content:center';
         d.innerHTML='<button type="button" class="main" id="tstcfb">Lật thẻ · xong</button>';document.body.appendChild(d);
         d.querySelector('button').onclick=()=>{d.remove();window.__cfQ=0;S.nfX.st='done';window.cfBusy=window.__cf0;done()}});
       window.__t0=Date.now();showModal();return typeof nfOn==='function'&&nfOn()});
     if(!r0)return 'setup: nfOn() false';
     const s1=await waitCard(3000);const dt=await p.evaluate(()=>Date.now()-window.__t0);await shot('F1-news');
     if(!s1.modal||!/Tin trong cung/.test(s1.mt)){const dg=await diag();
       await p.evaluate(()=>{window.cfBusy=window.__cf0;window.__cfQ=0;S.nfX.st='done';DQ.newsHold=0;try{kmPump()}catch(e){}});return 'news card NOT painted in 3 s (mutual wait) '+JSON.stringify({Q:s1.Q,d:dg})}
     if(dt>1000)return 'news card painted too late: '+dt+' ms';
     if(await p.evaluate(()=>!!document.getElementById('tstcf')))return 'flip scene on screen UNDER the news card';
     await tapAny();const t1=Date.now();let on=0;for(let i=0;i<20&&!on;i++){on=await p.evaluate(()=>!!document.getElementById('tstcf'));if(!on)await sleep(100)}
     if(!on)return 'news closed but the flip scene did not play';const dt2=Date.now()-t1;await shot('F2-flip');
     await p.tap('#tstcfb',{force:true});await sleep(500);await drain();
     const fin=await p.evaluate(()=>({cf:!!document.getElementById('tstcf'),KMQ:KMQ.length}));if(fin.cf||fin.KMQ)return 'after the flip: '+JSON.stringify(fin);
     rows.push(`${W}x${H} F timing: news painted ${dt} ms, flip after ${dt2} ms`);console.log(rows[rows.length-1]);
     const bk0=(await st()).bk;await p.tap('#next',{force:true});return (await advanced(bk0))?'':'«Sang buổi» after the night did not advance'},
  };
  console.log(`${W}x${H} life ready`,JSON.stringify(await st()));
  const order=Object.keys(CASES).filter(k=>!process.env.CASES||process.env.CASES.includes(k));const REP=+process.env.REPEAT||1;/* REPEAT=10: each case N times (stability gate) */
  for(const k of [].concat(...Array(REP).fill(order))){const s=await ensureQuiet();let r;try{r=await CASES[k]()}catch(e){r='threw '+e.message.slice(0,120)}
   rows.push(`${W}x${H} ${k}: ${r?'FAIL '+r:'PASS'}`);console.log(rows[rows.length-1]);if(r)fails++;await drain()}
  if(errs.length){fails++;rows.push(`${W}x${H} page errors: ${errs.slice(0,3).join(' | ')}`)}
  await ctx.close()}
 await b.close();console.log(rows.join('\n'));console.log(fails?'FAIL '+fails:'ALL PASS');process.exit(fails?1:0)})();
