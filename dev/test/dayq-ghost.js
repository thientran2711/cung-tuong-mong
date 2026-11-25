/* coop-rebirth-stuck / FAST LANE F1 (25/11): a GHOST activity never holds a card. jdayq gate (c) holds a queued card (#modal hidden, card kept in Q)
   while she is inside an activity (dqActEl). An activity element that is in the page but NOT RENDERED (display:none, [hidden], zero size — a scene /
   podium / roulette left behind by a reset, a rebirth, a closed screen) held the card for ever: Q kept it, #modal stayed hidden, «Sang ngày mới» /
   «Sẵn sàng» was dead with nothing on screen (base nextBuoi drops a press while Q.length).
   Per case (Fold 755x1000@2 + iPad 1180x820@2): put the ghost in the page, queue a card, showModal(); after BAL.dayq.poll × 4 the card is ON SCREEN.
   Control R1: a RENDERED scene (.kmov full screen) still holds the card (gate (c) unchanged), and the card shows once that scene is gone.
   usage: python3 dev/build/assemble.py && node dev/test/dayq-ghost.js   (serves dev/index.html through coop-serve.js, the site's charset wrapper) */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const sleep=t=>new Promise(r=>setTimeout(r,t));
const VP=[[755,1000,2],[1180,820,2]];
const NEWLIFE=`(function(){localStorage.removeItem('hclh-opt');SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){window.__forceOrigin='thd';window.__nlInner=1;start();window.__nlInner=0;if(!(typeof isSrv==='function'&&isSrv()))break}
 quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();return S.name})()`;
const GHOST={
 G1:`(()=>{const d=document.createElement('div');d.className='kmov';d.dataset.tg=1;d.style.display='none';document.body.appendChild(d)})()`,
 G2:`(()=>{const d=document.createElement('div');d.id='kpodov';d.dataset.tg=1;d.hidden=true;document.body.appendChild(d)})()`,
 G3:`(()=>{const d=document.createElement('div');d.className='kroul-ov';d.dataset.tg=1;d.style.cssText='position:fixed;width:0;height:0';document.body.appendChild(d)})()`,
 G4:`(()=>{const d=document.createElement('div');d.id='kmrew';d.dataset.tg=1;d.style.visibility='hidden';document.body.appendChild(d)})()`,
 R1:`(()=>{const d=document.createElement('div');d.className='kmov';d.dataset.tg=1;d.style.cssText='position:fixed;inset:10%;z-index:9999;background:#fff';document.body.appendChild(d)})()`};
const shown=`(()=>{const M=document.getElementById('modal');return !Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(M)})()`;
(async()=>{const b=await chromium.launch();let fail=0;const rows=[];
 for(const vp of VP){const tag=vp[0]+'x'+vp[1];const c=await b.newContext({serviceWorkers:'block',viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:vp[2]});
  await serve(c);const p=await c.newPage();const pe=[];p.on('pageerror',e=>pe.push(e.message.slice(0,160)));await p.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
  await p.goto(BASE);await p.waitForFunction(()=>typeof start==='function'&&!!document.querySelector('#slots button[data-new="1"]'),null,{timeout:180000});await sleep(1500);
  await p.evaluate(()=>localStorage.clear());await p.evaluate(NEWLIFE);await sleep(2500);
  const poll=await p.evaluate(()=>BAL.dayq.poll);
  for(const g of Object.keys(GHOST)){
   await p.evaluate(()=>{/* a clean screen: no scene of the new life (its chest), nothing queued */document.querySelectorAll('[data-tg],.kmov,#kmrew,#kpodov').forEach(e=>e.remove());try{KMQ.length=0;kmBusy=false}catch(e){}Q.length=0;const m=document.getElementById('modal');m.hidden=true;S.mg=null;render()});await sleep(300);
   await p.evaluate(GHOST[g]);
   await p.evaluate(()=>{Q.push({t:'Tin báo',must:1,h:'<p>Có tin từ Nội vụ phủ.</p>'});showModal()});
   await sleep(poll*4);const on=await p.evaluate(shown);
   let ok,why;
   if(g==='R1'){/* a real scene on screen holds the card; it shows once the scene is gone */
    await p.evaluate(()=>document.querySelectorAll('[data-tg]').forEach(e=>e.remove()));await sleep(poll*4);const after=await p.evaluate(shown);
    ok=!on&&after;why=`held while on screen ${!on} · shown after ${after}`}
   else{ok=on;why=`card on screen ${on}`}
   rows.push([tag,g,ok?'PASS':'FAIL',why]);if(!ok)fail++;
   await p.evaluate(()=>{document.querySelectorAll('[data-tg]').forEach(e=>e.remove());for(let k=0;k<5&&Q.length;k++)closeModal()})}
  if(pe.length){rows.push([tag,'pageerrors','FAIL',pe.slice(0,3).join(' | ')]);fail++}
  await c.close()}
 await b.close();for(const r of rows)console.log(r.join('  '));console.log(fail?`FAIL ${fail}`:'PASS all');process.exit(fail?1:0)})();
