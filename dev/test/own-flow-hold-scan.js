/* own-flow-hold-scan (DIALOG-ORDER r4, LC22 HOLD of lc22-do: dress-tap FAIL — after her 1st Y phục tap the «Xong việc» card was painted over
   Điểm trang at her next tap, blocking the Trâm cài slot). usage: node dev/test/own-flow-hold-scan.js [index.html] [W H] [shotdir]
   Rule (MAIN rec, whole family law 11): a screen she opened HERSELF (Điểm trang, Phối đồ, a mini-game, a shop, the gift picker, an item card in
   Tư trang …) never gets a card that was ALREADY WAITING painted over it while she works in it; the waiting card comes when she leaves (none lost).
   Per flow: open it → a GAME card is posted (pushModal + showModal, no tap) → real taps inside the flow (page.click, her finger) → after each tap:
   OVER = a card that was waiting before the tap is on screen over her flow (the bug) · ok = it still waits (or her own card of this tap is on top)
   then she leaves the flow → AFTER = the waiting card is shown / still queued (ok) · LOST = gone (bug). Exit 1 on any OVER / LOST / page error.
   The person view (jdfv .kfoc) is the same family: dev/test/dialog-order-scan.js HOLD=1. */
const {chromium}=require('playwright');const path=require('path');
const U0=process.argv[2]||'index.html';const URL=/^(https?|file):/.test(U0)?U0:'file://'+path.resolve(U0);
const DEV=process.argv[3]?[[+process.argv[3],+process.argv[4],process.argv[3]+'x'+process.argv[4]]]:[[755,1000,'fold'],[1180,820,'ipad']];const SHOT=process.argv[5]||'';
const sleep=t=>new Promise(r=>setTimeout(r,t));
const GAME=`pushModal({t:'GAMECARD-WAIT',h:'thẻ của game',opts:[{t:'Được',f:()=>''}]});render()`;
/* state: the card on screen (Q[0] when #modal shows), the queue, is the flow still open */
const ST=root=>`(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);const M=document.getElementById('modal');
 const vis=!!(M&&!hid(M)&&getComputedStyle(M).display!=='none');const top=vis&&Q[0]?Q[0]:null;
 return {vis,top:top?String(top.t||top.title||'').replace(/<[^>]+>/g,'').slice(0,50):null,topId:top?(top.__sid||(top.__sid=Math.random().toString(36).slice(2))):null,
  q:Q.map(m=>(m.__sid||(m.__sid=Math.random().toString(36).slice(2)))),qt:Q.map(m=>String(m.t||'').replace(/<[^>]+>/g,'').slice(0,30)),
  open:(${root})()}})()`;
/* real taps inside the flow root: visible, enabled, not a leave / finish button */
const PICK=(rootSel,n,skip)=>`(()=>{const R=document.querySelector(${JSON.stringify(rootSel)});if(!R)return [];const out=[];let i=0;
 for(const e of R.querySelectorAll('button,[role=button],.kitem,[data-kinvi],[data-kinvtab]')){if(!e.offsetParent||e.disabled)continue;const t=(e.textContent||'').trim();
  if(/Đóng|Lui|Xong|Ra mắt|Bỏ|Thôi|✕|Về|Mua|Tặng|Bán|Nộp|Sẵn sàng/.test(t)||/close|ok|back|kx|kg82x/i.test((e.id||'')+' '+(e.className||'')))continue;
  const r=e.getBoundingClientRect();if(r.width<4||r.height<4)continue;const id='ofs'+(i++);e.setAttribute('data-ofs',id);out.push(id);if(out.length>=${n})break}
 return out.slice(${skip||0})})()`;
const FLOWS=[
 {n:'Điểm trang (toil, #ov)',root:`()=>!!document.querySelector('#kg82')`,sel:'#kg82',
  open:`(()=>{try{kmReset()}catch(e){}try{kg82Close()}catch(e){}toilOpen();document.getElementById('toilrdy').click()})()`,
  taps:async p=>{const r=[];for(const tb of ['y','tram','trang']){r.push(`#kg82 [data-kinvtab="${tb}"]`);
   const i=await p.evaluate(tb=>{const o=KINV.reg.toil;return [...document.querySelectorAll('#kg82 .toilinv [data-kinvi]')].map(e=>+e.dataset.kinvi)},tb);r.push('ITEM')}return r},
  close:`(()=>{try{kg82Close()}catch(e){}})()`},
 {n:'Phối đồ (Hội phối đồ board, kg82)',root:`()=>!!document.querySelector('#kg82')`,sel:'#kg82',
  open:`(()=>{try{kg82Close()}catch(e){}tsDressGame(Object.keys(TS_THEME)[0],()=>{});const g=document.getElementById('kg82go');if(g)g.click()})()`,close:`(()=>{try{kg82Close()}catch(e){}})()`},
 {n:'Mini-game (openMG, #ov)',root:`()=>{const o=document.getElementById('ov');return !!o&&!o.hidden}`,sel:'#ov',
  open:`(()=>{try{kg82Close()}catch(e){}const k=Object.keys(MG)[0];openMG(k,1,()=>{});const g=document.getElementById('kg82go');if(g)g.click()})()`,close:`(()=>{const o=document.getElementById('ov');o.hidden=true;try{document.getElementById('mgb').innerHTML='';kg82Close()}catch(e){}})()`},
 {n:'Shop (Nhờ thái giám mua đồ, kitShop)',root:`()=>!!document.querySelector('#modal .kshop,#modal [data-kshop],#modal [data-shop]')||!!(Q[0]&&/mua/i.test(String(Q[0].t||Q[0].title||'')))`,sel:'#modal',
  open:`(()=>{S.shop=Object.keys(IT).filter(k=>IT[k]&&!IT[k].h).slice(0,8);S.bac=500;kitShopNvp()})()`,close:`(()=>{try{closeModal()}catch(e){Q.shift();showModal()}})()`},
 {n:'Gift picker (Tư trang → item → «Tặng»)',root:`()=>!!(Q[0]&&Q[0].pid==='giftpick'&&!document.getElementById('modal').hidden)`,sel:'#modal',
  real:async p=>{await p.click('#tabs button[data-tab="inv"]');await sleep(800);await p.locator('#panel [data-kinvi]:not(.kitem-on):visible').first().click();await sleep(600);await p.locator('#panel [data-kinvact="gift"]').first().click();await sleep(300)},
  maxTaps:3,close:`(()=>{try{closeModal()}catch(e){}})()`},
];
(async()=>{const b=await chromium.launch();const rows=[];let bad=0;
 for(const [W,H,tag] of DEV){
  for(const F of FLOWS){const p=await (await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:SHOT?2:1,serviceWorkers:'block'})).newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));
   await p.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());
   await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof toilOpen==='function'&&typeof start==='function');await sleep(2500);
   await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.bac=500;S.ap=9;S.suc=Math.max(S.suc||0,80);
    try{const k=Object.keys(WD_ITEMS).find(k=>WD_ITEMS[k]&&WD_ITEMS[k].sl==="tram"&&k!==((wdOf(S).tram||{}).k));if(k)S.inv.push({k})}catch(e){}save();try{render()}catch(e){}});await sleep(1200);
   await p.evaluate(()=>{document.querySelectorAll('.kmov,#kmrew,#kroul,#kpodov').forEach(e=>e.remove());try{KMQ.length=0;kmBusy=false}catch(e){}});
   const row={dev:tag,flow:F.n,open:0,taps:0,over:0,overT:'',after:'',err:''};
   try{if(F.real)await F.real(p);else{
    /* she opens the flow with her own tap: the opener runs inside a click event (as from its card / button in her panel) */
    await p.evaluate(src=>{const b=document.createElement('button');b.id='ofsopen';b.textContent='mở';b.onclick=()=>{(0,eval)(src)};document.body.appendChild(b)},F.open);
    await p.$eval('#ofsopen',e=>{e.click();e.remove()})}await sleep(1500);row.open=await p.evaluate(ST(F.root)).then(s=>s.open?1:0);
    if(row.open){await p.evaluate(GAME);await sleep(700);let s=await p.evaluate(ST(F.root));
     if(s.vis&&s.top==='GAMECARD-WAIT'){row.over++;row.overT='posted over the flow'}
     let list=[];if(F.taps)list=await F.taps(p);else for(let k=0;k<(F.maxTaps||4);k++)list.push('PICK'+k);
     for(const sel of list){const before=await p.evaluate(ST(F.root));if(!before.open)break;let target=sel;
      if(/^PICK/.test(sel)){const k=+sel.slice(4);const ids=await p.evaluate(PICK(F.sel,k+1,k));if(!ids.length)break;target=`[data-ofs="${ids[0]}"]`}
      if(sel==='ITEM'){const id=await p.evaluate(()=>{const o=KINV.reg.toil;const e=[...document.querySelectorAll('#kg82 .toilinv [data-kinvi]')].find(e=>{const it=o.items[+e.dataset.kinvi];return e.offsetParent&&it&&it.g&&!(it.g.wdSlot||it.g.w)});return e?e.dataset.kinvi:null});if(id==null)continue;target=`#kg82 .toilinv [data-kinvi="${id}"]`}
      try{await p.click(target,{timeout:4000})}catch(e){const m=String(e.message).match(/<div id="modal"[^>]*> intercepts/);if(m){row.over++;row.overT+=(row.overT?' · ':'')+'tap blocked by the waiting card'}break}
      row.taps++;await sleep(900);const a=await p.evaluate(ST(F.root));
      if(a.vis&&a.topId&&before.q.includes(a.topId)&&a.open&&!(F.sel==='#modal'&&before.topId===a.topId)){row.over++;row.overT+=(row.overT?' · ':'')+'«'+a.top+'» over the flow'}}
     if(SHOT)await p.screenshot({path:path.join(SHOT,`ofs-${tag}-${FLOWS.indexOf(F)}.png`)});
     await p.evaluate(F.close);await sleep(400);await p.evaluate(()=>{try{render()}catch(e){}});await sleep(1500);s=await p.evaluate(ST(F.root));
     row.after=s.qt.includes('GAMECARD-WAIT')?(s.vis&&s.top==='GAMECARD-WAIT'?'shown after':'queued (waits)'):'LOST'}}catch(e){row.err=String(e.message).slice(0,120)}
   if(errs.length)row.err+=(row.err?' · ':'')+'page: '+errs[0];
   if(row.over||row.after==='LOST'||errs.length)bad++;rows.push(row);await p.context().close()}}
 await b.close();
 console.log('| device | flow | opened | taps | waiting card painted mid-flow | after she leaves | errors |\n|---|---|---|---|---|---|---|');
 for(const r of rows)console.log(`| ${r.dev} | ${r.flow} | ${r.open?'yes':'NOT OPENED'} | ${r.taps} | ${r.over?'OVER ×'+r.over+' ('+r.overT+')':'no (waits)'} | ${r.open?r.after:'-'} | ${r.err||'0'} |`);
 const nopen=rows.filter(r=>!r.open).length;console.log(bad?`FAIL ${bad}/${rows.length} rows`:`PASS ${rows.length} rows`+(nopen?` (${nopen} not opened)`:''));process.exit(bad?1:0)})();
