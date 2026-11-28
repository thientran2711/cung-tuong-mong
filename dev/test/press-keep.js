/* PRESS-KEEP regression test (button-crawl-fix-4, owner OD 25/11 ~05:10Z «make sure là cái nút nào cũng work», law 11 whole family).
   Fault (LIVE 9f72524b, iPad 1180x820, a cung nữ life's «Tuyển chọn» card): a press on an option card's row text did nothing. The press effect
   (jfx: .kfdown on the card + a ripple node in body) woke the kit observers (j63 kaMO → kaNorm → jopic kitOptFinal); their «did this card change?»
   signature read className, so the press itself looked like a change → the card's Tốn/Được rows were rebuilt UNDER the finger → the pointer-down
   target left the page → the browser dropped the click (mouse; iOS Safari drops a touch click the same way). Also: jseal kitSealEvPlace wrote
   dlg.classList.remove("kseal-room") on every call → its own MutationObserver → again (~11 writes/s on every open dialog, forever).
   Checks, Fold 755x1000 (touch) + iPad 1180x820 (mouse), REAL taps only (dev/test/realtap.js hit-check, then a real pointer at the row text):
   1. every option card of a kit dialog (VIỆC card with Tốn/Được rows): the node under the finger at pointer-DOWN is still in the page at pointer-UP,
      and the tap chose THAT option (its go() ran, the card left the queue);
   2. the real card of the LIVE fault (cung nữ «Tuyển chọn», jkc2 kc2Sel) chooses «Cúi đầu chờ xét» from a press on its Tốn row;
   3. an open dialog left alone for 2 s writes nothing (no self-triggering observer loop).
   KIT §101 (owner 25/11 ~21:55Z): on a HAND the press lifts the card and a real tap on its green ✓ chooses (realtap choose); the pressed node must still be in the page.
   usage: node dev/test/press-keep.js <page url>   exit 1 on any failure */
const {chromium}=require('playwright');const RT=require('./realtap.js');const [,,URL]=process.argv;
const {keepNotesSeen}=require('./lib/notes-seen');/* rv27: a wiped storage keeps the «Điều mới trong cung» record */
const DEVS={fold:[755,1000],ipad:[1180,820]};
(async()=>{const b=await chromium.launch();let fails=0;const say=(ok,dev,what,why)=>{if(!ok)fails++;console.log(`${ok?'PASS':'FAIL'} · ${dev} · ${what}${why?' · '+why:''}`)};
for(const dev of ['fold','ipad']){const [w,h]=DEVS[dev];
 const ctx=await b.newContext({viewport:{width:w,height:h},hasTouch:true,isMobile:dev==='fold',serviceWorkers:'block'});await keepNotesSeen(ctx);const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(/\.(mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function',null,{timeout:120000});await p.waitForTimeout(1500);
 /* harness setup only (no press): a fresh consort life on the home screen */
 await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';window.__nlInner=1;document.getElementById('title').hidden=true;try{start()}finally{window.__nlInner=0}});
 await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});await p.waitForTimeout(1500);
 const clear=()=>p.evaluate(()=>{Q.length=0;document.querySelectorAll('.kmov,#kroul,#kprevov,#klife,#kload,#ktut,#ov,#dawn').forEach(e=>{if(e.id==='ov'||e.id==='ktut'||e.id==='dawn')e.hidden=true;else e.remove()});const M=document.getElementById('modal');if(M)M.hidden=true;try{render()}catch(e){}});
 for(let k=0;k<6;k++){await clear();await p.waitForTimeout(700)}/* first-life overlays (Nhập cung chest, roulette) come in turn: harness setup clears them, no press */
 const rt=RT.make(p,{dev});const touch=dev==='fold';
 /* in-page watch (read-only): which node got the pointer-down, is it still in the page at pointer-up, did a click reach the document */
 await p.evaluate(()=>{const W=window.__pk={};addEventListener('pointerdown',e=>{W.dn=e.target;W.dnLost=false;W.clicks=0},true);
  addEventListener('pointerup',()=>{W.dnLost=!!W.dn&&!W.dn.isConnected},true);addEventListener('click',()=>{W.clicks=(W.clicks||0)+1},true)});
 /* the row-text point of a card (a Tốn / Được value): real-tap contract = elementFromPoint must be inside the card */
 const rowPt=h=>h.evaluate(bt=>{const ef=[...bt.querySelectorAll('.kr .krv .ef, .kr .krv, .kabody .kan')].find(e=>{const r=e.getBoundingClientRect();return r.width>4&&r.height>4});if(!ef)return {miss:'no row'};
  const r=ef.getBoundingClientRect();const x=r.left+Math.min(r.width/2,12),y=r.top+r.height/2;const t=document.elementFromPoint(x,y);return t&&bt.contains(t)?{x,y}:{miss:t?(t.tagName+'#'+t.id+'.'+String(t.className).slice(0,30)):'none'}});
 const press=async(pt,release)=>{if(touch){await p.touchscreen.tap(pt.x,pt.y);return}await p.mouse.move(pt.x,pt.y);await p.mouse.down();await p.waitForTimeout(250);/* observers run while the finger is down */
  if(release)await p.mouse.move(release.x,release.y);await p.mouse.up()};
 /* 1. kit dialog option cards */
 const N=3;for(let i=0;i<N;i++){
  await p.evaluate(i=>{window.__pick=null;Q.length=0;const mk=k=>({n:'Thử chọn '+k,fx:{suc:-5},x:`được: Danh +1 · tốn: Sức -5`,go:()=>{window.__pick=k}});
   Q.push({t:'Thử bấm',hideOut:true,h:'<p>Thẻ thử: chạm vào dòng Tốn / Được của một lựa chọn.</p>',opts:[mk(0),mk(1),mk(2)]});const D=typeof DQ!=='undefined'?DQ:null;if(D)D.user=(D.user||0)+1;try{showModal()}finally{if(D)D.user--}},i);
  await p.waitForTimeout(1600);const bt=await p.$(`#modal .opts button[data-m="${i}"]`);if(!bt){say(false,dev,`option card ${i}`,'card not built');continue}
  await rt.tap(bt,{screen:'press-keep',label:'(scroll into view only)'}).catch(()=>{});/* first real tap may already choose: rebuild the card for the row-point press below */
  if(await p.evaluate(()=>window.__pick!=null||!!document.querySelector('.opts.khand>button.klift'))){/* kit-stage-r16: a hand card the scroll-tap ENLARGED (KIT §101.10) sits over its neighbours: rebuild the frame so the row point is read on a resting card */await p.evaluate(i=>{window.__pick=null;Q.length=0;const mk=k=>({n:'Thử chọn '+k,fx:{suc:-5},x:`được: Danh +1 · tốn: Sức -5`,go:()=>{window.__pick=k}});Q.push({t:'Thử bấm',hideOut:true,h:'<p>Thẻ thử.</p>',opts:[mk(0),mk(1),mk(2)]});const D=typeof DQ!=='undefined'?DQ:null;if(D)D.user=(D.user||0)+1;try{showModal()}finally{if(D)D.user--}},i);await p.waitForTimeout(1600)}
  const b2=await p.$(`#modal .opts button[data-m="${i}"]`);const pt=b2&&await rowPt(b2);if(!pt||pt.miss){say(false,dev,`option card ${i}`,'row text covered: '+(pt&&pt.miss));continue}
  await press(pt);await p.waitForTimeout(700);let lost0=await p.evaluate(()=>window.__pk.dnLost);/* KIT §101 hand (owner 25/11 ~21:55Z): the press lifts the card, the green ✓ chooses — a real tap on ✓ */
  if(await p.$('#modal .opts.khand')){if(await p.evaluate(()=>window.__pick==null))await rt.tap('#modal .dlg>.khconf:not([hidden])>.khok',{screen:'press-keep',label:'✓ card '+i});await p.waitForTimeout(900)}
  const r=await p.evaluate(l0=>({lost:l0||window.__pk.dnLost,clicks:window.__pk.clicks,pick:window.__pick,q:Q.length&&Q[0].t}),lost0);
  say(!r.lost&&r.pick===i,dev,`option card ${i}: press on its Tốn/Được row`,r.lost?'the pressed node left the page during the press (rows rebuilt under the finger)':r.pick!==i?`option not chosen (click reached: ${r.clicks}, picked ${r.pick})`:'')}
 await clear();await p.waitForTimeout(800);
 /* 1b. the REAL card of the LIVE fault: a cung nữ life's «Tuyển chọn» (jkc2 kc2Sel, person frame + hidden outcomes + «!»), option «Cúi đầu chờ xét» */
 await clear();await p.evaluate(()=>{window.__forceOrigin='cnv';window.__nlInner=1;try{start()}finally{window.__nlInner=0;window.__forceOrigin=null}});await p.waitForFunction(()=>S&&S.origin&&S.origin.k==='cnv',null,{timeout:60000});
 for(let k=0;k<4;k++){await clear();await p.waitForTimeout(600)}
 const okSel=await p.evaluate(()=>{S.selx={};const d=mkP('kc2Sel',{});if(!d)return false;Q.length=0;pushDil(d,'Tuyển chọn');/* the game's own path: the card as kc2SelOn queues it */const D=typeof DQ!=='undefined'?DQ:null;if(D)D.user=(D.user||0)+1;try{showModal()}finally{if(D)D.user--}return true});
 if(!okSel)say(false,dev,'«Tuyển chọn» card','not built');else{await p.waitForFunction(()=>{const M=document.getElementById('modal');return M&&!M.hidden&&/Cúi đầu chờ xét/.test(M.innerText)},null,{timeout:10000}).catch(()=>{});await p.waitForTimeout(1500);
  const ix=await p.evaluate(()=>{const b=[...document.querySelectorAll('#modal .opts button[data-m]')].find(x=>/Cúi đầu chờ xét/.test(x.innerText));return b?b.dataset.m:null});
  const b3=ix!=null&&await p.$(`#modal .opts button[data-m="${ix}"]`);const pt=b3?await rowPt(b3):{miss:'card not shown (option '+ix+')'};
  if(!pt||pt.miss)say(false,dev,'«Tuyển chọn» · Cúi đầu chờ xét','row text covered: '+(pt&&pt.miss));else{await p.waitForTimeout(2500);await rt.choose(b3,{screen:'Tuyển chọn',label:'Cúi đầu chờ xét'});/* the shared real tap, as the crawler found it */await p.waitForTimeout(900);
   const r=await p.evaluate(()=>({lost:window.__pk.dnLost,clicks:window.__pk.clicks,done:!!(S.selx&&S.selx.done),q:Q.length&&Q[0].t}));
   say(!r.lost&&r.done,dev,'«Tuyển chọn» (cung nữ) · Cúi đầu chờ xét: real tap',r.lost?'the pressed node left the page during the press (rows rebuilt under the finger)':!r.done?`option not chosen (click reached: ${r.clicks}; card still ${r.q})`:'')}}
 /* 3. an idle dialog writes nothing */
 await p.evaluate(()=>{Q.length=0;Q.push({t:'Thử yên',h:'<p>Thẻ để yên.</p>',opts:[{n:'Được',fx:{},x:'được: không',go:()=>{}}]});const D=typeof DQ!=='undefined'?DQ:null;if(D)D.user=(D.user||0)+1;try{showModal()}finally{if(D)D.user--}});
 await p.waitForTimeout(2500);const muts=await p.evaluate(()=>new Promise(res=>{let n=0;const L=[];const mo=new MutationObserver(ms=>{for(const m of ms){n++;if(L.length<4)L.push(m.type+':'+String(m.target.className||m.target.id).slice(0,30)+(m.attributeName?'@'+m.attributeName:''))}});mo.observe(document.getElementById('modal'),{subtree:true,childList:true,attributes:true});setTimeout(()=>{mo.disconnect();res({n,L})},2000)}));
 say(muts.n===0,dev,'idle dialog writes nothing for 2 s',muts.n?`${muts.n} writes: ${muts.L.join(' ; ')}`:'');
 say(!errs.length,dev,'no page error',errs.slice(0,2).join(' | '));await ctx.close()}
await b.close();console.log(fails?`PRESS-KEEP FAIL · ${fails}`:'PRESS-KEEP PASS');process.exit(fails?1:0)})();
