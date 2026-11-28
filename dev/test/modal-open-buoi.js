/* review/tainghe-open-fix — a REAL tap opens its pop-up at every buổi (0/1/2/3, across the night flip, the next day).
   Bug (kit-tntile r4): in lives at buổi 3 a tap on a Tài nghệ tile opened nothing. Root cause: the harness emptied Q right after start(), dropping
   the «Thân phận kiếp này» card without nlAccept → NLP stayed set → jflip's flip scene waited on NLP for ever (busy()) → cfBusy() true →
   jnf's showModal gate («no dialog under / over the flip scene») swallowed every dialog with nothing on screen. Fix: jflip busy() waits on
   NLP only while the identity card is really open (queued or on screen).
   This test plays a REAL life: taps «Nhận thân phận», taps through every dialog / scene / the night choice like a player, and at each buổi:
   (1) kitModal info card shows; (2) a real DOM click on a Tài nghệ tile (.ktn-tile, when the build has them) opens the môn pop-up;
   (3) real taps on #modal openers: a HUD stat chip (rule pop-up), a Mệnh truyện slide (none = no such opener on this build/life).
   Part B (orphan): the old harness setup (Q emptied after start(), nextBuoi ×5): at buổi 3 the flip scene must PLAY (on screen), never wait
   unseen with NLP set.
   usage: node dev/test/modal-open-buoi.js file:///…/index.html [WxH] [lives] [buổi steps=6] */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const [,,URL,WH,N,NB]=process.argv;
(async()=>{const b=await chromium.launch();const [W,H]=(WH||"755x1000").split("x").map(Number);let fails=0;const STEPS=+NB||6;
 const mk=async()=>{const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&window.kitModal,null,{timeout:240000});await p.waitForTimeout(2000);return {ctx,p,errs}};
 for(let run=0;run<(+N||1);run++){
  const {ctx,p,errs}=await mk();
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>document.querySelector('#modal:not([hidden]) [data-nl=ok]'),null,{timeout:60000});
  await p.evaluate(()=>document.querySelector('#modal [data-nl=ok]').click());
  /* a player: taps the morning panel, a visible scene's button, Thôi / the first option / the close button of a dialog */
  const drain=async()=>{for(let i=0;i<160;i++){const d=await p.evaluate(()=>{const M=document.getElementById('modal');
    const dw=document.getElementById('dawn');if(dw&&!dw.hidden&&dw.classList.contains('on')){const bt=[...dw.querySelectorAll('button')].find(b=>b.offsetParent);if(bt){bt.click();return 'dawn'}}
    const vc=[...document.querySelectorAll('button')].find(b=>/Vào cung ngay/.test(b.textContent)&&b.offsetParent);if(vc){vc.click();return 'vc'}
    const ov=document.getElementById('ov');if(ov&&!ov.hidden&&ov.getClientRects().length&&getComputedStyle(ov).display!=='none'){const x=[...ov.querySelectorAll('button')].find(b=>/✕|Đóng|Bỏ cuộc|Thôi/.test(b.textContent)&&b.getClientRects().length);if(x){x.click();return 'ov-x'}}
    const kr=[...document.querySelectorAll('.kroul button')].find(b=>/Bỏ qua/.test(b.textContent)&&b.getClientRects().length&&!b.disabled);if(kr){kr.click();return 'roul-skip'}
    const kc=[...document.querySelectorAll('.kmov:not(.km-out) button,#kpodov button,#kmrew button')].find(b=>b.getClientRects().length&&!b.disabled);if(kc){kc.click();return 'scene-btn'}
    const ko=document.querySelector('.kmov:not(.km-out)');if(ko&&ko.getClientRects().length){ko.click();return 'scene-tap'}
    if(M&&!M.hidden){const o=[...M.querySelectorAll('.opt:not([disabled])')];const th=o.find(b=>/^Thôi/.test(b.textContent.trim()));if(th){th.click();return 'thoi'}if(o.length){o[0].click();return 'opt'}
     const c=M.querySelector('#mclose')||[...M.querySelectorAll('button')].find(b=>b.offsetParent&&!b.disabled);if(c){c.click();return 'close'}}
    if(typeof cfBusy==='function'&&cfBusy())return 'scene';if(Q.length)return 'q';return ''});
   if(!d){await p.waitForTimeout(400);const d2=await p.evaluate(()=>{const M=document.getElementById('modal');return (M&&!M.hidden)||Q.length||(typeof cfBusy==='function'&&cfBusy())});if(!d2)return}else await p.waitForTimeout(300)}};
  await p.waitForTimeout(800);await drain();
  /* real openers of #modal pop-ups (every #modal pop-up goes through showModal, the chain the jnf gate sits in): [tab, selector] */
  const OPEN={hud:[null,'#hud2 [data-hx],[data-hx]'],art:['art','#panel .ktn-tile'],story:['story','#panel [data-ksmuc]']};
  const res=[];let lf=0;
  for(let bu=0;bu<STEPS;bu++){
   const st=await p.evaluate(()=>({buoi:S.buoi,nlp:typeof NLP!=='undefined'&&!!NLP}));
   const r=await p.evaluate(async OPEN=>{const M=document.getElementById('modal');const w=async()=>{for(let i=0;i<30&&M.hidden;i++)await new Promise(r=>setTimeout(r,100));return !M.hidden};const cl=()=>{try{closeModal()}catch(e){}};const o={};
    kitModal({kind:"info",title:"Thử",sub:"",sections:[{h:"",html:"<p>thử</p>"}]});o.km=await w();cl();
    for(const k of Object.keys(OPEN)){const [t,sel]=OPEN[k];if(t){tab=t;render();await new Promise(r=>setTimeout(r,500))}
     const e=[...document.querySelectorAll(sel)].find(x=>x.getBoundingClientRect().height>0);if(!e){o[k]='none';continue}e.click();o[k]=await w();if(k==='art'&&o[k])o[k]=!!M.querySelector('.ktn-pop');cl()}
    tab='act';render();return o},OPEN);
   const bad=Object.entries(r).filter(([k,v])=>v===false);if(bad.length){lf++;
    const dg=await p.evaluate(()=>({x:S.nfX&&{st:S.nfX.st,me:S.nfX.me},busy:typeof cfBusy==='function'&&cfBusy(),dbg:(window.__cfdbg||[]).join('|'),kmov:[...document.querySelectorAll('.kmov')].map(e=>e.className+' '+e.getClientRects().length),nlp:typeof NLP!=='undefined'&&!!NLP,Q:Q.map(m=>m.pid||m.t)}));console.log('  DIAG b'+st.buoi,JSON.stringify(dg))}
   res.push(`b${st.buoi}${st.nlp?'!NLP':''}:${bad.length?'FAIL['+bad.map(x=>x[0]).join(',')+']':'ok'}{${Object.entries(r).map(([k,v])=>k+(v===true?'':'='+v)).join(',')}}`);
   await drain();await p.evaluate(()=>{try{nextBuoi()}catch(e){console.error(e)}});await p.waitForTimeout(900);await drain()}
  if(errs.length){lf++;res.push('page errors '+errs.slice(0,2).join(' | '))}
  console.log(`${WH||'755x1000'} life ${run}\n  ${res.join(' ')} ${lf?'FAIL':'PASS'}`);if(lf)fails++;await ctx.close()}
 /* Part B: the old harness setup (identity card dropped from Q): the flip scene must play on screen, never hold dialogs unseen */
 {const {ctx,p}=await mk();
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}Q.length=0;m.hidden=true});
  await p.waitForFunction(()=>!(typeof cfBusy==='function'&&cfBusy())||document.querySelector('.kmov.kcf:not(.km-out)'),null,{timeout:20000}).catch(()=>{});
  const o=await p.evaluate(()=>({buoi:S.buoi,nlp:typeof NLP!=='undefined'&&!!NLP,busy:typeof cfBusy==='function'&&cfBusy(),onScreen:!!document.querySelector('.kmov.kcf:not(.km-out)'),ahead:[...document.querySelectorAll('.kmov:not(.km-out),#kpodov,#kmrew,[id^=kroul]')].filter(e=>e.getClientRects().length).map(e=>String(e.className||e.id).slice(0,40)).concat((()=>{const d=document.getElementById('dawn');return d&&!d.hidden&&d.classList.contains('on')?['dawn']:[]})()),dbg:(window.__cfdbg||[]).join('|')}));
  /* fine: nothing queued, the flip on screen, or a VISIBLE scene / overlay ahead of it in the j93 queue (the player sees it and taps it) */
  const ok=!o.busy||o.onScreen||o.ahead.length>0;console.log(`orphan-NLP life: ${JSON.stringify(o)} ${ok?'PASS':'FAIL (flip scene queued with nothing on screen)'}`);if(!ok)fails++;await ctx.close()}
 await b.close();console.log(fails?'FAIL '+fails:'ALL PASS');process.exit(fails?1:0)})();
