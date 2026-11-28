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
   G  (r3, emptied queue) 2 cards make render() disable «Sang buổi»; the cards are then taken out of Q inside showModal (G1, as j68 evGate
      does) or with no call at all (G2) → «Sang buổi» comes back by itself (G1 ≤ 600 ms, G2 ≤ 1500 ms: the 700 ms safety-net tick dqWake), then a real tap advances.
   H  (r3, Q>0 member) 7 cards hidden in Q, «Sang buổi» greyed, nothing on screen → H1 the first card shows by itself (dqWake) · H2 a real tap on
      the greyed button shows it at once (dqBring); she taps through all 7, then «Sang buổi» advances.
   I  (r3, robot E-S1) a scene left in the page but NOT on screen (I1 zero-size, I2 hidden layer) + 7 kit info panels queued → the first panel shows
      by itself; I3 control: a scene ON screen holds them (none painted over it for 3 s), they show once it closes; I4 (r4) the same with a zero-size scene FIRST in the page; then «Sang buổi» advances.
   J  (Q-SOFTLOCK a) night news card ⇄ queued flip behind a stale scene job (kmBusy, nothing on screen) → the flip plays, the news shows, the turn goes on.
   K  (Q-SOFTLOCK b) a left-over #kmrew host (not on screen) blocks the scene queue; 8 cards wait, khắc spent → cards, scene, the buổi turns.
   L  (Q-SOFTLOCK c, F s9e Q=0) the kmFree activity gate trusted a ghost #ov (L1) / a left-over DF.play (L2) → scene queue blocked, turn held → cards, scene, the buổi turns.
   usage: node dev/test/sangbuoi-held.js file:///…/index.html [shotDir] */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const [,,URL,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VP=[[755,1000,2],[1180,820,2]].filter(v=>!process.env.VP||process.env.VP.split(',').includes(v[0]+'x'+v[1]));/* VP=1180x820: one device */
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
    /* LIVE ≥ f009e1a6: the identity card «Thân phận kiếp này» carries the road picker (jkc «Vào cung ngay» / «Ở nhà chờ tuyển tú», data-kcp: a tap only
       re-picks the road and re-draws the card) — take the life with «Nhận thân phận» (data-nl=ok), never loop on the road button */
    {const nl=document.querySelector('#modal:not([hidden]) [data-nl=ok]');if(nl&&nl.getClientRects().length&&!nl.disabled)return mark(nl)}
    const vc=[...document.querySelectorAll('button')].find(b=>/Vào cung ngay/.test(b.textContent)&&b.offsetParent&&!b.hasAttribute('data-kcp'));if(vc)return mark(vc);
    /* a person view she opened (jdfv, not an encounter) is an activity: close it (its ✕) */
    if(window.DF&&DF.F&&!DF.encM){const x=document.querySelector('.kfoc .kfoc-x');if(x&&x.getClientRects().length)return mark(x)}
    /* a small open info card with its transparent catcher (jk4 kitCatchOn): the first tap outside only closes it */
    const kx=document.getElementById('kxcatch');if(kx&&!hid(kx)&&kx.getClientRects().length)return mark(kx);
    /* a gate scene (j93 .kmov.km-gate «Tiếp theo» / «Vào điện», new-life flow on LIVE ≥ f009e1a6) covers the screen it opens (#ov «Xét phong danh
       phận» under it): its own button first, a tap on what lies under it does nothing */
    {const g=[...document.querySelectorAll('.kmov.km-gate:not(.km-out)')].find(e=>e.getClientRects().length);if(g){const b=[...g.querySelectorAll('button')].find(b=>b.getClientRects().length&&!b.disabled);if(b)return mark(b)}}
    /* a mini-game screen (#ov: «Tuyển chọn» intro / result): skip it like the robot (Bỏ qua), else its next / close button */
    const ov=document.getElementById('ov');if(ov&&!hid(ov)){const bs=[...ov.querySelectorAll('button')].filter(b=>b.getClientRects().length&&!b.disabled);const b=bs.find(b=>/Bỏ qua/.test(b.textContent))||bs.find(b=>/Nhận|Tiếp|Xong|Đóng|Rời|Về|Thôi/.test(b.textContent))||bs[0];if(b)return mark(b)}
    /* a visitor playing in the jdfv stage scene (encounter): its say box / choice buttons, else its close */
    if(window.DF&&DF.F&&DF.encM){const f=document.querySelector('.kfoc');if(f){const bs=[...f.querySelectorAll('button,[role=button]')].filter(b=>b.getClientRects().length&&!b.disabled&&!b.classList.contains('kfoc-x'));const b=bs.find(b=>/^Thôi/.test(b.textContent.trim()))||bs[0]||f.querySelector('.kfoc-x');if(b)return mark(b);return mark(f)}}
    /* the «Luân hồi» origin roulette (jk2b #kroul, new-life flow on LIVE f009e1a6): skip it like the robot (Bỏ qua), else its next button */
    {const kr=[...document.querySelectorAll('[id^="kroul"],.kroul-ov')].find(e=>e.getClientRects().length);if(kr){const bs=[...kr.querySelectorAll('button')].filter(b=>b.getClientRects().length&&!b.disabled);const b=bs.find(b=>/Bỏ qua/.test(b.textContent))||bs.find(b=>/Tiếp|Nhận|Xong|Vào/.test(b.textContent))||bs[0];if(b)return mark(b)}}
    /* the selection scenes of a new life (jkitsel kitDialogue, «Chạm để tiếp ▸»): a tap on the line box goes on (only a box on top: a
       left-over box under the gate scene «Vào điện» is not tapped); its layer ignores button taps */
    {const top=e=>{const r=e.getBoundingClientRect();if(!r.width||!r.height)return false;const h=document.elementFromPoint(r.x+r.width/2,r.y+r.height/2);return !!h&&e.contains(h)};const dv=[...document.querySelectorAll('.kdv-box')].find(top);if(dv)return mark(dv)}
    /* the cases' own queued scene (#tstkm) is tapped by the case loop, never here: tapAny tapping it raced the loop's check (K×6 iPad 1/6 «queued
       scene never played» with kmGhost 2, KMQ 0: the scene HAD played, tapAny closed it and the buổi turned before the loop looked) */
    const kc=[...document.querySelectorAll('.kmov:not(.km-out):not(#tstkm) button,#kpodov button,#kmrew button')].find(b=>b.getClientRects().length&&!b.disabled);if(kc)return mark(kc);
    const ko=document.querySelector('.kmov:not(.km-out):not(#tstkm)');if(ko&&ko.getClientRects().length)return mark(ko);
    const M=document.getElementById('modal');if(M&&!hid(M)){const o=[...M.querySelectorAll('.opt:not([disabled])')];const th=o.find(b=>/^Thôi/.test(b.textContent.trim()));if(th)return mark(th);if(o.length)return mark(o[0]);
     const c=M.querySelector('#mclose')||[...M.querySelectorAll('button')].find(b=>b.offsetParent&&!b.disabled);if(c)return mark(c)}return ''});
   if(!sel)return false;try{await p.tap(sel,{timeout:3000,force:true})}catch(e){await p.evaluate(s=>{const e=document.querySelector(s);e&&e.click()},sel)}return true};
  /* Q-SOFTLOCK owner (26/11): «nothing to tap» is only idle once the jdayq safety net (dqWake, BAL.dayq.wake ms + one 700 ms tick) has had its turn —
     a card held for a moment (a real game card the turn brought) is painted by that net; a drain that gave up at 1.5 s left it on screen after the
     case ended (case A «cards closed but the buổi did not advance» with a real «Có người tìm đến» card up; the changed jdayq line was not in those traces) */
  const BAL_W=await p.evaluate(()=>(BAL.dayq&&BAL.dayq.wake)||2000);
  const IDLE=await p.evaluate(()=>Math.ceil(((BAL.dayq&&BAL.dayq.wake)||2000)/500)+2);
  const drain=async(n=120)=>{let idle=0;for(let i=0;i<n&&idle<IDLE;i++){if(await tapAny()){idle=0;await sleep(350)}else{idle++;await sleep(500)}}};
  /* a fresh solo life at a quiet Buổi trưa (buổi 1) like the robot: start, accept «Thân phận», tap through, turn to buổi 1.
     LIVE ≥ f009e1a6 (selection-scene) starts a life with the «Luân hồi» roulette, the road picker on the identity card and the Dưỡng Tú viện
     selection scenes inside buổi 0: the old 8 × 900 ms loop returned while those still ran (case B «setup: turn not held» at bk 0.0 with a scene).
     Now it waits for a normal day (buổi 1, nothing queued or on screen, «Sang buổi» enabled), tapping like a player, up to NL_MS. */
  const NL_MS=+process.env.NL_MS||300000;
  /* test-side pick of the life, not a game bypass: re-roll (a new pending life each time, NL_KEY cleared, the quickcheck NEWLIFE idiom) until the
     life has no tú nữ selection days (jselxday selxDaysFit false: a hòa thân / palace start) and is not a servant life (cnv / isSrv, the quickcheck NEWLIFE rule; a game «Chuyển kiếp» into one is rolled again); these cases build their
     own buổi states and need a palace consort at a quiet buổi 1, not her 3 selection days (option-0 taps end in ban hoa about half the time). */
  const roll=async()=>{await p.evaluate(()=>{try{kmReset()}catch(e){}Q.length=0;SLOT=3;document.getElementById('title').hidden=true;
    for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();const fit=typeof selxDaysFit==='function'&&selxDaysFit();if(!fit&&!(S.origin&&S.origin.k==='cnv')&&!(window.isSrv&&isSrv()))break}});
   /* SETUP only (not a step under test): take the life with «Nhận thân phận». A cung nữ card keeps the button out of view (page.tap: «not visible»),
      so after one real-tap try the button is clicked in the page; the cases' own taps stay real taps */
   for(let i=0;i<40;i++){const r=await p.evaluate(()=>{const b=document.querySelector('#modal [data-nl=ok]');if(!b)return Q.some(m=>/^Thân phận/.test(m.t||''))?'wait':'gone';return b.getClientRects().length&&!document.getElementById('modal').hidden?'vis':'hid'});
    if(r==='gone')break;if(r==='wait'){if(!(await tapAny()))await sleep(500);continue}
    if(r==='vis'&&i<2){try{await p.tap('#modal [data-nl=ok]',{timeout:3000,force:true})}catch(e){}}else await p.evaluate(()=>{const b=document.querySelector('#modal [data-nl=ok]');b&&b.click()});await sleep(900)}};
  /* a life that ends in its opening (a hòa thân «Lễ ra mắt» lost → «Duyên cung lỡ hẹn» → the game's own «Chuyển kiếp», or a new identity card) is
     rolled again the same way instead of being played through */
  const newLife=async()=>{const t0=Date.now();let quiet=0,same=0,mt0='';await roll();await drain();
   while(Date.now()-t0<NL_MS){const s=await st();if(s.buoi===1&&!s.Q.length&&!s.modal&&!s.scene&&!s.dawn&&s.next&&!s.want){if(++quiet>=2)return;await sleep(700);continue}quiet=0;
    if(await p.evaluate(()=>!!(S&&S.dead)||(S&&S.origin&&S.origin.k==='cnv')||!!(window.isSrv&&isSrv())||!!document.querySelector('#modal:not([hidden]) [data-nl=ok]')||Q.some(m=>/^(Duyên cung lỡ hẹn|Thân phận kiếp này)/.test(m.t||'')))){await roll();continue}
    /* SETUP only: a card that stays up through 25 taps (seen once: a «Tâm trạng · <name>» look-up card over «Người bên cạnh» whose ✕/Lui did
       nothing — the known robot «Tâm trạng ✕/Lui no effect» row, not this branch's family) is closed in the page and logged, so one dead card
       does not cost the whole case; the cases themselves never do this */
    if(s.modal&&s.mt===mt0){if(++same>=25){console.log('newLife setup: card «'+s.mt+'» stayed up through 25 taps — closed in page');await p.evaluate(()=>{try{closeModal()}catch(e){}});same=0}}else{same=0;mt0=s.mt}
    if(await tapAny()){await sleep(350);continue}
    /* nothing to tap: spend the khắc and turn like a player (the night / buổi 0 turn waits for her tap) */
    await p.evaluate(()=>{try{used=BAL.time.khac;render()}catch(e){}});
    if(s.buoi!==1&&await p.evaluate(()=>{const n=document.getElementById('next');return !n.disabled&&!Q.length})){try{await p.tap('#next',{timeout:2000,force:true})}catch(e){}}await sleep(900)}
   console.log('newLife: no quiet buổi 1 after '+NL_MS+' ms '+JSON.stringify(await st()))};
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
   G:async()=>{/* r3 mirror family «the queue EMPTIED with no render after it» (real nights: j68 evGate held every waiting card inside showModal,
       j3's empty branch only hid #modal, «Sang buổi» stayed disabled from the last render with nothing on screen, 20 s+, LIVE too).
       G1 the cards are taken out inside showModal (as evGate does) · G2 taken out with no call at all (any other path: the net) */
     for(const [k,viaShow,lim] of [['G1',1,600],['G2',0,1500]]){
      await p.evaluate(()=>{Q.push({t:'Thử: thẻ một',h:'<p>Thử.</p>'},{t:'Thử: thẻ hai',h:'<p>Thử.</p>'});render();const M=document.getElementById('modal');M.hidden=true});
      if(!(await p.evaluate(()=>document.getElementById('next').disabled)))return k+' setup: «Sang buổi» not disabled with 2 cards';
      await p.evaluate(v=>{window.__t0=Date.now();if(v){const s0=window.showModal;window.showModal=function(){Q.splice(0,Q.length);window.showModal=s0;return s0.apply(this,arguments)};showModal()}else Q.splice(0,Q.length)},viaShow);
      let ms=-1;for(let i=0;i<40;i++){const d=await p.evaluate(()=>({dis:document.getElementById('next').disabled,ms:Date.now()-window.__t0}));if(!d.dis){ms=d.ms;break}await sleep(100)}
      if(ms<0)return k+' queue emptied: «Sang buổi» still disabled after 4 s, nothing on screen '+JSON.stringify(await diag());
      if(ms>lim)return k+' «Sang buổi» came back too late: '+ms+' ms (limit '+lim+')';
      rows.push(`${W}x${H} ${k} «Sang buổi» back after ${ms} ms`);console.log(rows[rows.length-1]);await shot(k+'-back')}
     const b0=(await st()).bk;await p.tap('#next',{force:true});return (await advanced(b0))?'':'«Sang buổi» back but the tap did not advance'},
   H:async()=>{/* r3 (MAIN 143, robot E on LIVE dbae89eb 17:17Z: «Có tin đang chờ» greyed, nothing on screen, Q = 7 hidden): the Q>0 member of the
       same family. 7 cards in Q, #modal hidden, render() greys the button, nothing else on screen →
       H1 the safety net shows the first card by itself (dqWake: BAL.dayq.wake + its 700 ms tick) · H2 a REAL tap on the greyed button shows it at once (dqBring);
       then she taps through all 7 and «Sang buổi» advances */
     const W8=await p.evaluate(()=>(BAL.dayq&&BAL.dayq.wake)||2000);
     for(const [k,tapIt,lim] of [['H1',0,W8+2*700+600],['H2',1,900]]){
      await p.evaluate(()=>{for(let i=1;i<=7;i++)Q.push({t:'Thử: thẻ chờ '+i,h:'<p>Thử.</p>'});const M=document.getElementById('modal');M.hidden=true;render();M.hidden=true;window.__t0=Date.now()});
      if(!(await p.evaluate(()=>document.getElementById('next').disabled)))return k+' setup: «Sang buổi» not greyed with 7 cards';
      if(tapIt){const c=await p.evaluate(()=>{const r=document.getElementById('next').getBoundingClientRect();return [r.x+r.width/2,r.y+r.height/2]});await p.evaluate(()=>window.__t0=Date.now());await p.touchscreen.tap(c[0],c[1])}
      const s1=await waitCard(lim+1500);const ms=await p.evaluate(()=>Date.now()-window.__t0);
      if(!s1.modal)return k+' 7 cards hidden, greyed button: NO card painted in '+(lim+1500)+' ms '+JSON.stringify({Q:s1.Q.length,d:await diag()});
      if(ms>lim)return k+' card painted too late: '+ms+' ms (limit '+lim+')';
      rows.push(`${W}x${H} ${k} card shown after ${ms} ms`);console.log(rows[rows.length-1]);await shot(k+'-card');await drain();
      const left=await p.evaluate(()=>Q.filter(m=>/^Thử: thẻ chờ/.test(m.t||'')).length);if(left)return k+' '+left+' test cards left after tapping through'}
     const b0=(await st()).bk;await p.tap('#next',{force:true});return (await advanced(b0))?'':'cards closed but «Sang buổi» did not advance'},
   I:async()=>{/* r3 robot E-S1 (LIVE dbae89eb, Tài nghệ tab, Q = 7 info panels hidden, «Có tin đang chờ» greyed, NOTHING on screen): a scene left in the page
       but NOT on screen held every card for ever (jdayq dqActEl took any .kmov in the DOM as an open activity). I1 zero-size .kmov · I2 .kmov on a hidden
       layer → the first kit panel shows by itself (safety net) · I3 control: a scene ON screen still holds them, and they show once it closes */
     const W8=await p.evaluate(()=>(BAL.dayq&&BAL.dayq.wake)||2000);const lim=W8+2*700+900;
     const T=['Công · Nữ công: các lối','Cầm','Xem quan hệ của','Xem quan hệ của','Cầm: các lối','Lịch tháng','Thử bảy'];
     for(const k of ['I1','I2','I3','I4']){
      await p.evaluate(([k,T])=>{const d=document.createElement('div');d.className='kmov km-gate';d.id='tstki';
        if(k==='I1'||k==='I4')d.style.cssText='position:fixed;left:0;top:0;right:auto;bottom:auto;width:0;height:0;min-width:0;min-height:0;max-width:0;max-height:0;padding:0;border:0;overflow:hidden';/* r4: .kmov's own CSS (inset / padding / min size) gave the old I1 a real box on screen */
        else if(k==='I2'){const w=document.createElement('div');w.id='tstkw';w.hidden=true;document.body.appendChild(w);w.appendChild(d)}
        else d.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(40,20,10,.35)';
        if(k!=='I2')document.body.appendChild(d);if(k==='I4'){const r=document.createElement('div');r.className='kmov km-gate';r.id='tstkr';r.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(40,20,10,.35)';document.body.appendChild(r)}/* r4 I4: a zero-size scene FIRST in the page + a real one on screen: the real one still holds every card */
        for(const t of T)kitModal({t,h:'<p>Thử: bảng thông tin.</p>'});const M=document.getElementById('modal');M.hidden=true;render();M.hidden=true;window.__t0=Date.now()},[k,T]);
      if(k==='I3'||k==='I4'){await sleep(3000);const s0=await st();if(s0.modal){await p.evaluate(()=>{['tstki','tstkw','tstkr'].forEach(i=>{const e=document.getElementById(i);e&&e.remove()})});return k+' a panel was painted OVER a scene on screen'}
        await p.evaluate(k=>{document.getElementById(k==='I4'?'tstkr':'tstki').remove();window.__t0=Date.now()},k)}
      const s1=await waitCard(lim+1500);const ms=await p.evaluate(()=>Date.now()-window.__t0);
      await p.evaluate(()=>{['tstki','tstkw','tstkr'].forEach(i=>{const e=document.getElementById(i);e&&e.remove()})});
      if(!s1.modal)return k+' 7 panels hidden, nothing on screen: NO panel painted in '+(lim+1500)+' ms '+JSON.stringify({Q:s1.Q.length,d:await diag()});
      if(ms>lim)return k+' panel painted too late: '+ms+' ms (limit '+lim+')';
      rows.push(`${W}x${H} ${k} first panel shown after ${ms} ms`);console.log(rows[rows.length-1]);await shot(k+'-panel');await drain();
      const left=await p.evaluate(T=>Q.filter(m=>T.includes(m.t)).length,T);if(left)return k+' '+left+' panels left after tapping through'}
     const b0=(await st()).bk;await p.tap('#next',{force:true});return (await advanced(b0))?'':'panels closed but «Sang buổi» did not advance'},
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
   /* J (Q-SOFTLOCK (a), F s3f ×19: «Sang ngày mới» ×3 no turn, Q=1 «Tin trong cung buổi này»): night choice open, the flip QUEUED behind a scene job that
      holds kmBusy with NOTHING on screen (stale), the per-buổi news card (DQ.newsHold 0) held by the night gate for that unstarted flip → mutual wait
      (LIVE: up to the 80 s choice cap). Now: the stale job is released after BAL.dayq.stale ms → the flip plays → she taps it → the news card shows → the turn goes on. */
   J:async()=>{for(let i=0;i<4&&!(await p.evaluate(()=>typeof nfOn==='function'&&nfOn()));i++){await newLife();await ensureQuiet()}
     const r0=await p.evaluate(()=>{used=0;advLock=false;render();S.nfX={d:(typeof wk==='function'?wk():(S.turn*3+(S.tuan||0))),st:'open',at:Date.now()};window.__cf0=window.cfBusy;window.__cfQ=1;window.cfBusy=()=>window.__cfQ===1;
       DQ.newsHold=0;kmBusy=true/* a stale job: nothing of it on screen */;Q.unshift({t:'Tin trong cung buổi này',kind:'news',h:'<p>Thử: tin trong cung buổi này.</p>'});Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').set.call(document.getElementById('modal'),true);
       kmPush(done=>{const d=document.createElement('div');d.className='kmov kcf';d.id='tstcf';d.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(40,20,10,.35);display:flex;align-items:center;justify-content:center';
         d.innerHTML='<button type="button" class="main" id="tstcfb">Lật thẻ · xong</button>';document.body.appendChild(d);
         d.querySelector('button').onclick=()=>{d.remove();window.__cfQ=0;S.nfX.st='done';window.cfBusy=window.__cf0;done()}});
       window.__t0=Date.now();showModal();return {nf:typeof nfOn==='function'&&nfOn(),lim:(BAL.dayq.stale+BAL.dayq.wake*2+3000)}});
     if(!r0.nf)return 'setup: nfOn() false';
     /* she taps «Sang ngày mới» 3× like the robot, then waits */
     for(let k=0;k<3;k++){await p.tap('#next',{force:true}).catch(()=>{});await sleep(400)}
     let on=0;for(let i=0;i<r0.lim/250&&!on;i++){on=await p.evaluate(()=>!!document.getElementById('tstcf'));if(!on)await sleep(250)}
     const dt=await p.evaluate(()=>Date.now()-window.__t0);
     if(!on){const dg=await diag();await p.evaluate(()=>{window.cfBusy=window.__cf0;window.__cfQ=0;S.nfX.st='done';kmBusy=false;try{kmPump()}catch(e){}});return 'flip never played (queue blocked by a stale job, '+dt+' ms) '+JSON.stringify({s:await st(),d:dg})}
     await shot('J1-flip');await p.tap('#tstcfb',{force:true});
     const s1=await waitCard(BAL_W*2+1500);await shot('J2-news');if(!s1.modal||!/Tin trong cung/.test(s1.mt))return 'flip done but the news card did not show '+JSON.stringify({Q:s1.Q,d:await diag()});
     rows.push(`${W}x${H} J timing: flip after ${dt} ms`);console.log(rows[rows.length-1]);
     await drain();const bk0=(await st()).bk;await p.tap('#next',{force:true});return (await advanced(bk0))?'':'news closed but «Sang buổi» did not advance'},
   /* K (Q-SOFTLOCK (b), F s3f: «Có tin đang chờ» greyed, Q=8 Tin báo / Xét phẩm, 150 taps): a LEFT-OVER #kmrew host (not on screen) makes j93 kmFree «not free»
      for ever → the month-end scene never starts → KMQ holds the turn (dqOldPending). 8 kit info cards wait in Q unpainted, khắc spent. Now: the cards show
      (net), she taps through all 8, the scene plays (the ghost host no longer holds it after BAL.dayq.wake ms), she taps it, the buổi turns. */
   K:async()=>{const bk0=(await st()).bk;await p.evaluate(c=>{const g=document.createElement('div');g.id='kmrew';g.className='tstghost';g.style.display='none';document.body.appendChild(g);
       used=BAL.time.khac;advLock=true;Q.push(...c);Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').set.call(document.getElementById('modal'),true);
       kmPush(done=>{const d=document.createElement('div');d.className='kmov';d.id='tstkm';d.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(40,20,10,.35);display:flex;align-items:center;justify-content:center';
         d.innerHTML='<button type="button" class="main" id="tstkmb">Bổng lộc · Nhận</button>';document.body.appendChild(d);d.querySelector('button').onclick=()=>{d.remove();done()}});
       setTimeout(()=>{advLock=false},300)},['Tin báo','Xét phẩm cuối tháng','Tin báo · 2','Tin báo · 3','Tin báo · 4','Tin báo · 5','Tin báo · 6','Tin báo · 7'].map(card));
     for(let k=0;k<3;k++){await p.tap('#next',{force:true}).catch(()=>{});await sleep(400)}
     const s1=await waitCard(BAL_W*3+1500);await shot('K1-card');if(!s1.modal)return 'no card shown '+JSON.stringify({Q:s1.Q,d:await diag()});
     /* tap through the 8 cards (and whatever the turn brings), the scene when it comes */
     let km=0;for(let i=0;i<60;i++){if(await p.evaluate(()=>!!document.getElementById('tstkm'))){km=1;await shot('K2-scene');await p.tap('#tstkmb',{force:true});await sleep(500);continue}
       if((await st()).bk!==bk0)break;if(!(await tapAny())){await sleep(500)}else await sleep(350)}
     await p.evaluate(()=>{const g=document.querySelector('#kmrew.tstghost');if(g)g.remove()});
     if(!km)return 'the queued scene never played (ghost #kmrew held kmFree) '+JSON.stringify({s:await st(),KMQ:await p.evaluate(()=>KMQ.length),d:await diag()});
     return (await advanced(bk0,BAL_W*3+6000))?'':'cards + scene done but the buổi did not turn '+JSON.stringify(await st())},
   /* L (Q-SOFTLOCK c, F s9e 03:47Z: «Sang ngày mới» ×3 in one buổi, no turn, Q=0, DQ.want held, screen free, DQ.stat.actKm +4/s; 03:27Z before it:
      Q=4 «Mục lục / Tin báo / Danh hiệu / Quẻ» held, «Có tin đang chờ» greyed): the jdayq kmFree activity gate (c) believed an #ov that is merely
      un-hidden (L1, not on screen) or a left-over DF.play handle with no person view on screen (L2) → the queued scene never starts → KMQ holds the turn.
      Now: only an activity ON SCREEN holds the scene; a ghost lasting BAL.dayq.wake ms no longer does. 2 cards + a queued scene, khắc spent, she taps
      «Sang ngày mới» 3× → the cards, the scene, then the buổi turns. */
   L:async()=>{for(const v of [1,2]){const bk0=(await st()).bk;await p.evaluate(([c,v])=>{const hs=Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').set;
       if(v===1){const o=document.getElementById('ov');window.__ovC=o.style.cssText;hs.call(o,false);o.style.display='none'}else{window.DF=window.DF||{};window.__dfp=DF.play;DF.play={tst:1,skip(){},destroy(){}}}
       used=BAL.time.khac;advLock=true;Q.push(...c);hs.call(document.getElementById('modal'),true);
       kmPush(done=>{const d=document.createElement('div');d.className='kmov';d.id='tstkm';d.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(40,20,10,.35);display:flex;align-items:center;justify-content:center';
         d.innerHTML='<button type="button" class="main" id="tstkmb">Bổng lộc · Nhận</button>';document.body.appendChild(d);d.querySelector('button').onclick=()=>{d.remove();done()}});
       setTimeout(()=>{advLock=false},300)},[['Tin báo','Danh hiệu'].map(card),v]);
     const undo=()=>p.evaluate(v=>{const hs=Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').set;if(v===1){const o=document.getElementById('ov');o.style.cssText=window.__ovC||'';hs.call(o,true)}else if(window.DF&&DF.play&&DF.play.tst)DF.play=window.__dfp||null},v);
     for(let k=0;k<3;k++){await p.tap('#next',{force:true}).catch(()=>{});await sleep(400)}
     let km=0;const t0=Date.now();for(let i=0;i<80;i++){if(await p.evaluate(()=>!!document.getElementById('tstkm'))){km=1;await shot('L'+v+'-scene');await p.tap('#tstkmb',{force:true});await sleep(500);continue}
       if((await st()).bk!==bk0)break;if(!(await tapAny())){await sleep(500)}else await sleep(350)}
     const dg=km?null:{s:await st(),KMQ:await p.evaluate(()=>KMQ.length),d:await diag()};await undo();
     if(!km){await p.evaluate(()=>{try{kmPump()}catch(e){}});await drain();return 'L'+v+' the queued scene never played (ghost '+(v===1?'#ov':'DF.play')+' held kmFree) '+JSON.stringify(dg)}
     rows.push(`${W}x${H} L${v} scene played after ${Date.now()-t0} ms`);console.log(rows[rows.length-1]);
     if(!(await advanced(bk0,BAL_W*3+6000)))return 'L'+v+' cards + scene done but the buổi did not turn '+JSON.stringify(await st());await drain()}return ''},
  };
  console.log(`${W}x${H} life ready`,JSON.stringify(await st()));
  const order=Object.keys(CASES).filter(k=>!process.env.CASES||process.env.CASES.includes(k));const REP=+process.env.REPEAT||1;/* REPEAT=10: each case N times (stability gate) */
  for(const k of [].concat(...Array(REP).fill(order))){const s=await ensureQuiet();let r;try{/* r3 watchdog: a case that never ends is a FAIL with what was on screen, not a silent stall */r=await Promise.race([CASES[k](),sleep(180000).then(async()=>'case did not finish in 180 s '+JSON.stringify({s:await st().catch(()=>null),d:await diag().catch(()=>null)}))])}catch(e){r='threw '+e.message.slice(0,120)}
   rows.push(`${W}x${H} ${k}: ${r?'FAIL '+r:'PASS'}`);console.log(rows[rows.length-1]);if(r)fails++;await drain()}
  if(errs.length){fails++;rows.push(`${W}x${H} page errors: ${errs.slice(0,3).join(' | ')}`)}
  await ctx.close()}
 await b.close();console.log(rows.join('\n'));console.log(fails?'FAIL '+fails:'ALL PASS');process.exit(fails?1:0)})();
