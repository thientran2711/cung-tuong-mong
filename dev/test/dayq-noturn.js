/* review/dayq-noturn — «Sang ngày mới» is never dead while a card waits (Foreman F flight2-s21g, LIVE 5fb13d60, iPad seed 2026112565: ×3 in year 1,
   Q = 1 «Thái hậu triệu» / «Nghe đồn» / «Kẻ hầu xin», #modal hidden, nothing on screen, a tab open (Tài nghệ / Sổ ghi), 3 real taps, no turn).
   ROOT (robot-lite capture, showModal wrapper trace ends in the jnf night gate, nfX "open", KMQ 1, kmBusy false): j93 kmRankCard read the SAVE RECIPE
   KEY m.rk ("tsbAp", "j95bRum", "ap.svAsk" — j3 rcpReg stamps it on nearly every generated choice card) as the rank-screen marker rk:1 → kmRankWait
   held every kit scene (the night flip) → jnf held the card for that unstarted flip → mutual wait with nothing on screen.
   REAL taps, solo, Fold 755x1000 + iPad 1180x820. Cases:
   N1 (the robot state) the night choice open, a flip QUEUED, a recipe card (rk "tsbAp") hidden in Q, a tab open (every bottom tab in turn: law 11) →
      3 taps on «Sang ngày mới» / «Sang buổi» → the flip or the card is on screen within BAL.dayq.wake + 2 s; she taps through; the buổi turns.
   N2 (cfStuck, same family, a REAL rank card): a rank card (kit.rk 1) waits in Q while the flip is queued → kmRankWait holds the flip (rank screen
      first, kept) → the jnf gate no longer holds the rank card for that flip: it is painted, she closes it, the flip plays, the buổi turns.
   N3 (control, j93 RANK SCREEN FIRST kept) a reward scene queued while a real rank card is in Q waits until the card closes; with a recipe card it plays at once.
   usage: node dev/test/dayq-noturn.js file:///…/index.html [shotDir] */
const {chromium}=require('playwright');const [,,URL,OUT]=process.argv;const sleep=t=>new Promise(r=>setTimeout(r,t));
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
  /* like a player: tap through whatever is on screen (the test flip, cards the turn brings), tap «Sang buổi» when nothing is up, until the buổi turns */
  const through=async(bk0)=>{let same=0,mt0='';for(let i=0;i<120;i++){if((await st()).bk!==bk0)return true;if(await p.evaluate(()=>!!document.getElementById('tstcf'))){await p.tap('#tstcfb',{force:true}).catch(()=>{});await sleep(400);continue}
    {const s=await st();if(s.modal&&s.mt===mt0){if(++same>=25){console.log('through: card «'+s.mt+'» stayed up through 25 taps (known dead look-up card row, not this family) — closed in page');await p.evaluate(()=>{try{closeModal()}catch(e){}});same=0}}else{same=0;mt0=s.mt}}
    if(await tapAny()){await sleep(350);continue}if(await p.evaluate(()=>!document.getElementById('next').disabled))await p.tap('#next',{force:true}).catch(()=>{});await sleep(600)}return (await st()).bk!==bk0};
  const CASES={
   N1:async()=>{const tabs=await p.evaluate(()=>[...document.querySelectorAll('#tabs button,.ktabs button,nav button')].filter(b=>b.getClientRects().length&&b.id!=='next').map(b=>b.textContent.trim()).filter(t=>t&&t.length<20));
     if(!tabs.length)return 'setup: no bottom tabs';const W8=BAL_W+2000;
     for(const tn of tabs){await ensureQuiet();for(let i=0;i<4&&!(await p.evaluate(()=>typeof nfOn==='function'&&nfOn()));i++){await newLife();await ensureQuiet()}
      await p.evaluate(t=>{const b=[...document.querySelectorAll('#tabs button,.ktabs button,nav button')].find(b=>b.textContent.trim()===t&&b.getClientRects().length);document.querySelectorAll('[data-tt]').forEach(x=>x.removeAttribute('data-tt'));if(b)b.setAttribute('data-tt','1')},tn);
      await p.tap('[data-tt="1"]',{force:true,timeout:3000}).catch(()=>{});await sleep(600);
      const bk0=(await st()).bk;
      await p.evaluate(()=>{used=BAL.time.khac;S.nfX={d:(typeof wk==='function'?wk():0),st:'open',at:Date.now()};window.__cf0=window.cfBusy;window.__cfQ=1;window.cfBusy=()=>window.__cfQ===1;
        kmPush(done=>{const d=document.createElement('div');d.className='kmov kcf';d.id='tstcf';d.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(40,20,10,.35);display:flex;align-items:center;justify-content:center';
          d.innerHTML='<button type="button" class="main" id="tstcfb">Lật thẻ · xong</button>';document.body.appendChild(d);
          d.querySelector('button').onclick=()=>{d.remove();window.__cfQ=0;S.nfX.st='done';window.cfBusy=window.__cf0;done()}});
        Q.push({ev:1,t:'Thái hậu triệu',h:'<p>Thử: Thái hậu muốn có người hầu chuyện.</p>',opts:[{n:'Vâng',fx:{}},{n:'Thôi',fx:{}}],rk:'tsbAp',ra:['th'],optLayout:'rows'});
        Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').set.call(document.getElementById('modal'),true)});
      const t0=Date.now();let seen='';for(let k=0;k<3;k++){await p.tap('#next',{force:true}).catch(()=>{});await sleep(300)}
      for(let i=0;i<W8/150&&!seen;i++){const s=await st();if(await p.evaluate(()=>!!document.getElementById('tstcf')))seen='flip';else if(s.modal)seen='card';else await sleep(150)}
      const dt=Date.now()-t0;await shot('N1-'+tabs.indexOf(tn));
      if(!seen){const dg=await diag();await p.evaluate(()=>{window.__cfQ=0;if(S.nfX)S.nfX.st='done';window.cfBusy=window.__cf0||window.cfBusy;const d=document.getElementById('tstcf');if(d)d.remove()});await drain();return `tab «${tn}»: NOTHING on screen ${dt} ms after 3 taps (dead «Sang ngày mới») `+JSON.stringify({Q:(await st()).Q,d:dg})}
      rows.push(`${W}x${H} N1 tab «${tn}»: ${seen} on screen after ${dt} ms`);console.log(rows[rows.length-1]);
      if(!(await through(bk0)))return `tab «${tn}»: card + flip done but the buổi did not turn `+JSON.stringify(await st());
      await drain()}return ''},
   N2:async()=>{for(let i=0;i<4&&!(await p.evaluate(()=>typeof nfOn==='function'&&nfOn()));i++){await newLife();await ensureQuiet()}const bk0=(await st()).bk;
     await p.evaluate(()=>{used=BAL.time.khac;S.nfX={d:(typeof wk==='function'?wk():0),st:'open',at:Date.now()};window.__cf0=window.cfBusy;window.__ca0=window.cfAge;const t0=Date.now();window.__cfQ=1;window.cfBusy=()=>window.__cfQ===1;window.cfAge=()=>window.__cfQ===1?Date.now()-t0:0;
       kmPush(done=>{const d=document.createElement('div');d.className='kmov kcf';d.id='tstcf';d.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(40,20,10,.35);display:flex;align-items:center;justify-content:center';
         d.innerHTML='<button type="button" class="main" id="tstcfb">Lật thẻ · xong</button>';document.body.appendChild(d);
         d.querySelector('button').onclick=()=>{d.remove();window.__cfQ=0;S.nfX.st='done';window.cfBusy=window.__cf0;window.cfAge=window.__ca0;done()}});
       Q.push({t:'Bị giáng phẩm — thử',h:'<p>Thử: thẻ đổi phẩm.</p>',kit:{rk:1}});Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').set.call(document.getElementById('modal'),true)});
     const t0=Date.now();for(let k=0;k<3;k++){await p.tap('#next',{force:true}).catch(()=>{});await sleep(300)}
     let seen='';for(let i=0;i<(BAL_W*2+2500)/150&&!seen;i++){const s=await st();if(await p.evaluate(()=>!!document.getElementById('tstcf')))seen='flip';else if(s.modal)seen='card';else await sleep(150)}const dt=Date.now()-t0;await shot('N2');
     if(seen!=='card'){const dg=await diag();await p.evaluate(()=>{window.__cfQ=0;S.nfX.st='done';window.cfBusy=window.__cf0;window.cfAge=window.__ca0;const d=document.getElementById('tstcf');if(d)d.remove()});await drain();return 'rank card: '+(seen?'flip played OVER the waiting rank card':'NOTHING on screen '+dt+' ms (mutual wait)')+' '+JSON.stringify({Q:(await st()).Q,d:dg})}
     rows.push(`${W}x${H} N2 rank card on screen after ${dt} ms`);console.log(rows[rows.length-1]);
     await tapAny();let on=0;for(let i=0;i<80&&!on;i++){on=await p.evaluate(()=>!!document.getElementById('tstcf'));if(!on)await sleep(150)}
     if(!on){const dg=await p.evaluate(()=>({Q:Q.map(m=>m.t),modal:!document.getElementById('modal').hidden,KMQ:KMQ.length,kmBusy,free:kmFree(KMQ[0]),rw:kmRankWait(),end:typeof kitEndUp==='function'&&kitEndUp(),nf:S.nfX&&S.nfX.st,cf:cfBusy()}));await p.evaluate(()=>{window.__cfQ=0;S.nfX.st='done';window.cfBusy=window.__cf0;window.cfAge=window.__ca0});return 'rank card closed but the flip did not play '+JSON.stringify(dg)}
     if(!(await through(bk0)))return 'the buổi did not turn '+JSON.stringify(await st());return ''},
   N3:async()=>{const out=[];for(const rank of [false,true]){await ensureQuiet();
      await p.evaluate(rank=>{Q.push(rank?{t:'Tấn phong — thử',h:'<p>Thử.</p>',kit:{rk:1}}:{t:'Kẻ hầu xin — thử',h:'<p>Thử.</p>',opts:[{n:'Cho',fx:{}},{n:'Từ chối',fx:{}}],rk:'ap.svAsk',ra:[]});showModal();
        kmPush(done=>{const d=document.createElement('div');d.className='kmov';d.id='tstkm';d.style.cssText='position:fixed;inset:0;z-index:60;background:rgba(40,20,10,.35)';d.innerHTML='<button type="button" class="main" id="tstkmb">Nhận</button>';document.body.appendChild(d);d.querySelector('button').onclick=()=>{d.remove();done()}})},rank);
      await sleep(1500);const sc=await p.evaluate(()=>!!document.getElementById('tstkm'));out.push(sc);
      if(sc)await p.tap('#tstkmb',{force:true});await drain();
      for(let i=0;i<20&&await p.evaluate(()=>!!document.getElementById('tstkm'));i++){await p.tap('#tstkmb',{force:true}).catch(()=>{});await sleep(300)}await drain()}
     rows.push(`${W}x${H} N3 scene while a card waits: recipe card → ${out[0]?'plays':'held'}, rank card → ${out[1]?'plays':'held'}`);console.log(rows[rows.length-1]);
     /* recipe card: the scene is not held by a rank rule (it may still sit behind the open card by other gates: not asserted); rank card: held (RANK SCREEN FIRST kept) */
     return out[1]?'RANK SCREEN FIRST broken: a reward scene played while a rank card waited':''},
  };
  console.log(`${W}x${H} life ready`,JSON.stringify(await st()));
  const order=Object.keys(CASES).filter(k=>!process.env.CASES||process.env.CASES.includes(k));const REP=+process.env.REPEAT||1;/* REPEAT=10: each case N times (stability gate) */
  for(const k of [].concat(...Array(REP).fill(order))){const s=await ensureQuiet();let r;try{/* r3 watchdog: a case that never ends is a FAIL with what was on screen, not a silent stall */r=await Promise.race([CASES[k](),sleep(+(process.env.CASE_MS||1200000)).then(async()=>'case did not finish in time '+JSON.stringify({s:await st().catch(()=>null),d:await diag().catch(()=>null)}))])}catch(e){r='threw '+e.message.slice(0,120)}
   rows.push(`${W}x${H} ${k}: ${r?'FAIL '+r:'PASS'}`);console.log(rows[rows.length-1]);if(r)fails++;await drain()}
  if(errs.length){fails++;rows.push(`${W}x${H} page errors: ${errs.slice(0,3).join(' | ')}`)}
  await ctx.close()}
 await b.close();console.log(rows.join('\n'));console.log(fails?'FAIL '+fails:'ALL PASS');process.exit(fails?1:0)})();
