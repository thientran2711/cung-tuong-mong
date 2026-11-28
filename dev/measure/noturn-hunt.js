/* DAYQ-NOTURN robot-lite hunt: plays a solo life with random taps (bottom tabs, panel buttons, «Sang buổi»), and whenever a card waits in Q with #modal
   hidden, «Sang buổi» enabled and nothing on screen for 2.5 s, taps «Sang buổi» 3x; no turn = STUCK, logged with the showModal wrapper trace
   (use the trace build: dev/measure/sm-trace-build.py). usage: [W=755 H=1000] [NSTUCK=n] [MAXMS=ms] node dev/measure/noturn-hunt.js file:///…/index.trace.html [shotDir] */
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
const {chromium}=require('playwright');const [,,URL,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
const VP=[[+(process.env.W||1180),+(process.env.H||820),1]];
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
  const snap=()=>p.evaluate(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);const t=document.getElementById('rtoast');
   let rt=null;if(t){const cs=getComputedStyle(t),r=t.getBoundingClientRect();rt={cls:t.className,hid:t.hidden,disp:cs.display,vis:cs.visibility,op:cs.opacity,r:[r.x|0,r.y|0,r.width|0,r.height|0],txt:t.textContent.slice(0,80)}}
   return {bk:wk()+'.'+S.buoi,Q:Q.map(m=>m.t),modal:!hid(document.getElementById('modal')),tab:typeof tab!=='undefined'?tab:null,next:document.getElementById('next').textContent+'|'+document.getElementById('next').disabled,
    RF:window.RF&&{held:RF.held,want:RF.wantModal,depth:RF.depth,later:RF.later.length,stat:RF.stat},rt,SP:window.SP13&&{nb:SP13.nb,vo:SP13.vo},RB:window.RB&&{d:RB.d},
    nf:S.nfX&&S.nfX.st,dq:{mt:DQ.mt,want:DQ.want,mine:DQ.mine&&DQ.mine.t,user:DQ.user,act:(()=>{try{const e=dqActEl();return e&&(e.id||e.className)}catch(x){return 'err'}})(),dawn:dqDawn(),free:dqFreeScreen()},
    kfoc:!!document.querySelector('.kfoc'),df:!!(window.DF&&DF.F),encM:!!(window.DF&&DF.encM),kmBusy:typeof kmBusy!=='undefined'&&kmBusy,kmFree:(()=>{try{return kmFree(KMQ[0])}catch(e){return 'e'}})(),rankWait:(()=>{try{return kmRankWait()}catch(e){return 'e'}})(),endUp:(()=>{try{return kitEndUp()}catch(e){return 'e'}})(),cfBusy:window.cfBusy&&cfBusy(),cfAge:window.cfAge&&cfAge(),cap:BAL.steal&&BAL.steal.choice&&[BAL.steal.choice.waitMs,BAL.steal.choice.ms],cfdbg:(window.__cfdbg||[]).slice(-8),q0:Q[0]&&Object.keys(Q[0]).join(','),q0rk:Q[0]&&Q[0].rk,kmq:KMQ.map(f=>f&&(f.krank?'rank':f.kend?'end':'n')),nfX:S.nfX&&JSON.stringify(S.nfX).slice(0,300),KMQ:KMQ.length,mg:!!S.mg}});
  const rnd=n=>Math.floor(Math.random()*n);let stuck=0;const T0=Date.now();const MAXMS=+process.env.MAXMS||1500000;let steps=0;
  console.log("loop start",JSON.stringify(await st()).slice(0,200));
  while(Date.now()-T0<MAXMS&&stuck<+(process.env.NSTUCK||2)){steps++;
   const s=await st();if(await p.evaluate(()=>!!S.dead)){await newLife();continue}
   /* the robot condition: Q waiting, modal hidden, next enabled, nothing on screen */
   const cond=await p.evaluate(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);return Q.length>0&&hid(document.getElementById('modal'))&&!document.getElementById('next').disabled&&dqFreeScreen()&&!S.mg});
   if(cond){await sleep(2500);const c2=await p.evaluate(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);return Q.length>0&&hid(document.getElementById('modal'))&&!document.getElementById('next').disabled});
     if(c2){const a=await snap();await p.evaluate(()=>{window.__smT=[]});for(let k=0;k<3;k++){await p.tap('#next',{force:true}).catch(()=>{});await sleep(600)}
       const b2=await snap();const tr=await p.evaluate(()=>window.__smT.slice(0,200));
       if(b2.bk===a.bk&&b2.Q.length&&!b2.modal){stuck++;console.log('STUCK '+JSON.stringify({a,b2,tr}));if(OUT)await p.screenshot({path:OUT+'/stuck'+stuck+'.png'})}
       else console.log('nearmiss '+JSON.stringify({Q:a.Q,bk:a.bk,after:b2.bk,modal:b2.modal}))}}
   const r=Math.random();
   if(s.modal||s.scene||s.dawn){ if(!(await tapAny()))await sleep(300);await sleep(150);continue}
   if(r<0.25){/* a bottom tab */await p.evaluate(i=>{const bs=[...document.querySelectorAll('#tabs button,.ktabs button,nav button')].filter(b=>b.getClientRects().length&&b.id!=='next');document.querySelectorAll('[data-tt]').forEach(x=>x.removeAttribute('data-tt'));if(bs.length)bs[i%bs.length].setAttribute('data-tt','1')},rnd(99));await p.tap('[data-tt="1"]',{force:true,timeout:1500}).catch(()=>{})}
   else if(r<0.75){/* a random visible button in the right panel / stage */await p.evaluate(i=>{const bs=[...document.querySelectorAll('button,.act-card,[role=button],.opt')].filter(b=>{if(!b.getClientRects().length||b.disabled||b.id==='next'||b.closest('#tabs,#top,.ktop,#title,header'))return false;const r=b.getBoundingClientRect();return r.y>40&&r.y<innerHeight-60&&r.x>=0&&r.x<innerWidth});document.querySelectorAll('[data-tt]').forEach(x=>x.removeAttribute('data-tt'));if(bs.length)bs[i%bs.length].setAttribute('data-tt','1')},rnd(997));await p.tap('[data-tt="1"]',{force:true,timeout:1500}).catch(()=>{})}
   else if(r<0.97){await p.tap('#next',{force:true,timeout:1500}).catch(()=>{})}
   else await tapAny();
   await sleep(250+rnd(400));if(steps%25===0)console.log('steps',steps,JSON.stringify(await st()).slice(0,200))}
  console.log('done steps',steps,'stuck',stuck);await ctx.close()}
 await b.close();process.exit(0)})();
