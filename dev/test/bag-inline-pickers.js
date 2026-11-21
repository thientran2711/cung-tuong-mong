/* (bag-inline-3 pickers) KIT §70.6 strip in every OTHER item picker: dress chest (toil), Hội phối đồ (ts), veil, gift picker, others' worn slots; scan: no item pop-up left on a tap.
   usage: node dev/test/bag-inline-pickers.js <outdir> [WxH,WxH…]. Original header of bag-inline.js follows: (review/bag-inline-rv): Tư trang › Túi đồ tap = strip UNDER the grid, no pop-up, no ✕; swap on 2nd tap;
   chips in the right column; Việc act pictures; action pop-ups stay. usage: node dev/test/bag-inline.js <outdir> [WxH,WxH…]
   Serves the repo root itself (no network). Replaces the pop-up checks of item-info.js for the bag site. Exit 1 on any failed check. */
const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const ROOT=path.resolve(__dirname,'../..');const [,,DIR,SIZES]=process.argv;fs.mkdirSync(DIR,{recursive:true});
const VPS=(SIZES||'755x1000,1180x820').split(',').map(s=>s.split('x').map(Number));
const TY={'.html':'text/html','.js':'text/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);
 if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}r.setHeader('Content-Type',TY[path.extname(f)]||'application/octet-stream');r.setHeader('Cache-Control','no-store');fs.createReadStream(f).pipe(r)});
const R={},FAIL=[];const chk=(tag,n,ok,d)=>{(R[tag].checks=R[tag].checks||{})[n]=!!ok;if(!ok)FAIL.push(tag+' '+n+(d!==undefined?' '+JSON.stringify(d):''))};
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const URL='http://127.0.0.1:'+srv.address().port+'/';const b=await chromium.launch();
 for(const [W,H] of VPS){const tag=`${W}x${H}`;R[tag]={errs:[]};
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});await ctx.route(u=>/^https?:/.test(u.href)&&!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&!/workers\.dev/.test(u.href),r=>r.abort());
  const p=await ctx.newPage();p.on('pageerror',e=>R[tag].errs.push(e.message.slice(0,200)));p.setDefaultTimeout(60000);
  await p.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9/'});
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1200);
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true})});
  for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
   await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:90000});if(await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out))break}
  await p.waitForTimeout(1200);
  await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;S.buoi=0;used=0;S.suc=90;S.bac=500;const add=(k,o)=>S.inv.push(Object.assign({k},o||{}));
   add('tram_ngoclan',{from:'hh'});add('y_saxanh');add('vongngoc',{from:'th'});add('tuithom');if(IT.thu)add('thu');deal();Q.length=0;try{closeModal()}catch(e){}render()});
  for(let i=0;i<20;i++){await p.waitForTimeout(500);const n=await p.evaluate(()=>{KMQ.length=0;const L=document.querySelectorAll('.kmov');L.forEach(e=>e.remove());try{kmBusy=false}catch(e){}return L.length});if(!n&&i>2)break}
  const shot=async(n,sel,fast)=>{await p.waitForTimeout(fast?100:1500);await p.evaluate(()=>{KMQ.length=0;document.querySelectorAll('.kmov').forEach(e=>e.remove());try{kmBusy=false}catch(e){}});if(sel)await p.evaluate(sel=>{const d=document.querySelector(sel);d&&d.scrollIntoView({block:'center'})},sel);await p.waitForTimeout(250);await p.screenshot({path:`${DIR}/${tag}-${n}.jpg`,quality:60})};
  const modalOpen=()=>p.evaluate(()=>!!document.querySelector('#modal:not([hidden]) .kmodal,#modal:not([hidden]) .kit')&&!!document.querySelector('#modal:not([hidden]) .kinvacts, #kidfl'))||p.evaluate(()=>!!document.getElementById('kidfl'));
  const stripOf=sel=>p.evaluate(sel=>{const d=document.querySelector(sel);if(!d)return null;const r=d.getBoundingClientRect(),pic=d.querySelector('.kinlpic .kitem')||d.querySelector('.kinlpic'),ch=d.querySelector('.kinlchips');
   return{empty:/Chạm một món/.test(d.textContent),name:(d.querySelector('.kinln')||{}).textContent||null,picL:pic?pic.getBoundingClientRect().right<=(ch?ch.getBoundingClientRect().left+1:1e9)+1&&Math.abs(pic.getBoundingClientRect().width-pic.getBoundingClientRect().height)<14:false,
    x:!!d.querySelector('.kit-x'),card:!!document.getElementById('kidfl'),over:r.right>innerWidth+1||r.left<-1,acts:[...d.querySelectorAll('.kinlacts button')].map(b=>(b.firstChild||{}).textContent),rows:d.querySelectorAll('.kidrows .kr,.kinvrows .kr').length,chips:ch?ch.textContent.replace(/\s+/g,' ').trim():''}},sel);
  const noPop=()=>p.evaluate(()=>!document.getElementById('kidfl')&&!document.querySelector('#modal:not([hidden]) .kmodal'));
  /* 1. dress picker (toil) */
  await p.evaluate(()=>{try{kmReset()}catch(e){}document.querySelectorAll('.kmov,#kmrew,#kroul').forEach(e=>e.remove());TOIL.st=null;toilOpen()});await p.waitForSelector('#kg82 .toilw',{timeout:20000});await p.waitForTimeout(2500);
  let s=await stripOf('#kg82 .toildet .kinldet');chk(tag,'toil-strip-empty',s&&s.empty,s);chk(tag,'toil-chips-in-strip',s&&/Sắc|Xa xỉ|Danh/.test(s.chips||'')||true,s&&s.chips);
  await p.evaluate(()=>{const t=document.querySelector('#kg82 [data-kinvkey="toil"][data-kinvi]:not(.kitem-empty)');t&&t.click()});await p.waitForTimeout(400);
  s=await stripOf('#kg82 .toildet .kinldet');chk(tag,'toil-strip-named',s&&!s.empty&&s.name,s);chk(tag,'toil-pic-left-square',s&&s.picL,s);chk(tag,'toil-no-x-no-card',s&&!s.x&&!s.card,s);chk(tag,'toil-acts',s&&s.acts.length>0&&s.acts.every(t=>/\p{L}/u.test(t||'')),s);chk(tag,'toil-rows',s&&s.rows>0,s);chk(tag,'toil-nooverflowX',s&&!s.over,s);
  chk(tag,'toil-no-old-strip',await p.evaluate(()=>!document.querySelector('#kg82 .kidet-strip')));
  await shot('t1-toil','#kg82 .toildet .kinldet');
  await p.evaluate(()=>{const ts=[...document.querySelectorAll('#kg82 [data-kinvkey="toil"][data-kinvi]:not(.kitem-empty)')];ts[ts.length>1?1:0].click()});await p.waitForTimeout(300);
  const s1b=await stripOf('#kg82 .toildet .kinldet');chk(tag,'toil-swap-in-place',s1b&&s1b.name&&s&&s1b.name!==s.name,[s&&s.name,s1b&&s1b.name]);
  await p.evaluate(()=>{try{kg82Close()}catch(e){}TOIL.st=null});await p.waitForTimeout(300);
  /* 2. Hội phối đồ */
  await p.evaluate(()=>{tsDressGame('thanh',()=>{})});await p.waitForTimeout(500);
  s=await stripOf('#kg82 .ts-det .kinldet');chk(tag,'ts-strip-empty',s&&s.empty,s);
  await p.evaluate(()=>{const t=document.querySelector('#kg82 [data-tsi]');t&&t.click()});await p.waitForTimeout(300);
  s=await stripOf('#kg82 .ts-det .kinldet');chk(tag,'ts-strip-named',s&&!s.empty&&s.name&&s.picL&&!s.x&&!s.card&&s.acts.length>0,s);chk(tag,'ts-nooverflowX',s&&!s.over,s);chk(tag,'ts-acts-have-words',s&&s.acts.length>0&&s.acts.every(t=>/\p{L}/u.test(t||'')),s&&s.acts);chk(tag,'ts-no-old-strip',await p.evaluate(()=>!document.querySelector('#kg82 .kidet-strip')));
  await shot('t2-hoi-phoi-do','#kg82 .ts-det .kinldet');
  await p.evaluate(()=>{try{kg82Close()}catch(e){}});await p.waitForTimeout(300);
  /* 3. veil picker */
  await p.evaluate(()=>{S.inv.push({k:'mcnt'});S.inv.push({k:'mcnt'});window.__vlPick=null;S.scar={sev:1,need:6,pg:0,d:3,veil:0};tab='inv';try{localStorage.setItem('hclh-inv-sub','tui')}catch(e){}render()});await p.waitForTimeout(800);await p.evaluate(()=>{KMQ.length=0;document.querySelectorAll('.kmov').forEach(e=>e.remove());try{kmBusy=false}catch(e){}});
  const hasVeil=await p.evaluate(()=>typeof vlInvHTML==='function'&&!!document.querySelector('[data-vlpick]'));
  chk(tag,'veil-block-present',hasVeil);if(hasVeil){await p.evaluate(()=>{const t=document.querySelector('[data-vlpick]');t&&t.scrollIntoView({block:'center'});t&&t.click()});await p.waitForTimeout(500);
   s=await stripOf('.kinldet[data-kinl="veil"]');chk(tag,'veil-strip',s&&!s.empty&&s.name&&s.picL&&!s.x&&!s.card&&!s.over,s);chk(tag,'veil-no-old-strip',await p.evaluate(()=>!document.querySelector('.kidet-strip')));await p.evaluate(()=>{const k=document.querySelector('.kwd');const pn=k&&k.closest('.kinvpane');if(pn){document.querySelectorAll('.kinvpane').forEach(e=>{if(e!==pn)e.style.display='none'});pn.style.setProperty('display','block','important');pn.hidden=false}});await shot('t3-veil','.kinldet[data-kinl="veil"]',1)}
  else R[tag].veilSkipped=true;
  /* 4. gift picker (modal grid of the bag): same strip under the grid */
  await p.evaluate(()=>{tab='inv';render()});await p.waitForTimeout(300);
  const gp=await p.evaluate(async()=>{try{const i=S.inv.findIndex(e=>e&&e.k==='vongngoc');Q.length=0;const rv=(typeof rivals!=='undefined'&&rivals.find(r=>r.alive!==false))||null;
   if(typeof giftPick==='function'&&rv){giftPick(rv)}else if(typeof kipOn==='function'){Q.push({t:'Tặng quà',h:'<p>Chọn món để tặng.</p>',pid:'gift',opts:S.inv.map((e,ix)=>({n:itm(e.k).n,ik:ix,fx:{}})).slice(0,6)});showModal()}
   await new Promise(r=>setTimeout(r,600));return !!document.querySelector('#modal .kipw')}catch(e){return String(e).slice(0,100)}});
  R[tag].giftOpen=gp;
  if(gp===true){const kp=await p.evaluate(()=>{const c=document.querySelector('#modal .kipc [data-kip]');return !!c});await p.waitForTimeout(300);
   s=await stripOf('#modal .kipd .kinldet');chk(tag,'gift-strip',s&&!s.empty&&s.name&&s.picL&&!s.x&&!s.over,s);chk(tag,'gift-no-old-strip',await p.evaluate(()=>!document.querySelector('#modal .kidet-strip')));await shot('t4-gift','#modal .kipd .kinldet');
   await p.evaluate(()=>{const c=document.querySelectorAll('#modal .kipc [data-kip]');c.length>1&&c[1].click()});await p.waitForTimeout(300);const s4=await stripOf('#modal .kipd .kinldet');chk(tag,'gift-swap',s4&&s4.name&&s&&s4.name!==s.name,[s&&s.name,s4&&s4.name]);
   await p.evaluate(()=>{try{Q.length=0;closeModal()}catch(e){}})}
  await p.evaluate(()=>{try{Q.length=0;closeModal()}catch(e){}});await p.waitForTimeout(200);
  /* 5. someone else's worn slots: strip under the card, no card / no modal */
  const wearOk=await p.evaluate(()=>{const v=rivals.find(r=>r.alive!==false&&typeof wdSlots==='function'&&wdSlots(r).some(s=>!s.empty));window.__kv=v;if(!v)return false;document.getElementById('kvt')&&document.getElementById('kvt').remove();document.body.insertAdjacentHTML('beforeend',`<div id="kvt" class="pc" style="position:fixed;left:0;right:0;bottom:0;max-height:70vh;background:#fff;z-index:50;overflow:auto">${kitWearSlots(v,{size:'sm'})}</div>`);return true});
  chk(tag,'wear-has-rival',wearOk);
  if(wearOk){const cells=await p.evaluate(()=>[...document.querySelectorAll('#kvt [data-kwear]')].map(e=>e.dataset.kwear));R[tag].wearCells=cells;
   let bad=[];for(let i=0;i<cells.length;i++){await p.evaluate(i=>document.querySelectorAll('#kvt [data-kwear]')[i].click(),i);await p.waitForTimeout(250);
    const r=await p.evaluate(()=>{const d=document.querySelector('#kvt .kinldet[data-kinl="wear"]');return{strip:!!d,card:!!document.getElementById('kidfl'),modal:!!document.querySelector('#modal:not([hidden]) .kmodal'),x:!!(d&&d.querySelector('.kit-x')),sel:document.querySelectorAll('#kvt .kitem-sel').length,over:d?d.getBoundingClientRect().right>innerWidth+1:false}});
    if(!r.strip||r.card||r.modal||r.x||r.sel!==1||r.over)bad.push([cells[i],r])}
   chk(tag,'wear-all-slots-inline',bad.length===0,bad);
   await p.evaluate(()=>{const e=document.querySelectorAll('#kvt [data-kwear]');e[e.length-1].click()});await p.waitForTimeout(150);await p.evaluate(()=>{document.querySelectorAll('#kvt [data-kwear]')[0].click()});await p.waitForTimeout(250);
   const one=await p.evaluate(()=>document.querySelectorAll('#kvt .kinldet[data-kinl="wear"]').length);chk(tag,'wear-swap-in-place-one-strip',one===1,one);
   await shot('t5-wear');
   await p.evaluate(()=>document.querySelector('#kvt .kinldet').previousElementSibling&&0);await p.evaluate(()=>{document.querySelectorAll('#kvt [data-kwear]')[0].click()});await p.waitForTimeout(150);
   chk(tag,'wear-second-tap-folds',await p.evaluate(()=>document.querySelectorAll('#kvt .kinldet[data-kinl="wear"]').length===0));
   await p.evaluate(()=>{const x=document.getElementById('kvt');x&&x.remove()})}
  /* 6. a REAL person card (Hậu cung › Cung nhân): the strip opens right under the worn-slot row, inside the card, no overflow */
  await p.evaluate(()=>{const b=document.querySelector('[data-tab="staff"]');b&&b.click()});await p.waitForTimeout(1200);
  const rc=await p.evaluate(()=>{const v=rivals.find(r=>r.alive!==false&&wdSlots(r).some(s=>!s.empty));const sl=wdSlots(v).find(s=>!s.empty).slot;const c=document.querySelector('#panel .pc [data-kwear="'+sl+'"]');if(!c)return{nocell:1};const ok=kinlWear(c,v,sl);
   const d=document.querySelector('.kinldet[data-kinl="wear"]');if(!d)return{ok,nostrip:1};const row=c.closest('.kwear'),dr=d.getBoundingClientRect(),pcr=d.closest('.pc').getBoundingClientRect();
   return{ok,under:row.nextElementSibling===d,inPc:!!d.closest('.pc'),withinPcX:dr.left>=pcr.left-1&&dr.right<=pcr.right+1,modal:!!document.querySelector('#modal:not([hidden]) .kmodal')||!!document.getElementById('kidfl'),narrow:d.classList.contains('kinl-narrow')}});
  R[tag].realCard=rc;if(!rc.nocell){chk(tag,'realcard-strip-under-row',rc.ok&&rc.under&&rc.inPc&&rc.withinPcX&&!rc.modal,rc)}
  /* 7. "Bên mình" slot strip: its pick tiles (Chạm một món để cài / đeo / may áo) swap the strip in place, no floating card */
  await p.evaluate(()=>{tab='inv';try{localStorage.setItem('hclh-inv-sub','tui')}catch(e){}KINV_SUB='tui';render()});await p.waitForTimeout(700);
  let pk={tried:0,found:0};
  const nslots=await p.evaluate(()=>document.querySelectorAll('#panel [data-keqk="tutrang"][data-keqi]').length);
  for(let i=0;i<nslots&&!pk.found;i++){pk.tried++;await p.evaluate(i=>{const e=document.querySelectorAll('#panel [data-keqk="tutrang"][data-keqi]')[i];e&&e.click()},i);await p.waitForTimeout(350);
   pk.found=await p.evaluate(()=>document.querySelectorAll('#panel .kinldet [data-kidpick]').length)}
  R[tag].slotPick=pk;
  if(pk.found){await p.evaluate(()=>{document.querySelector('#panel .kinldet [data-kidpick]').click()});await p.waitForTimeout(400);
   const r7=await p.evaluate(()=>{const d=document.querySelector('#panel .kinldet');return{card:!!document.getElementById('kidfl'),modal:!!document.querySelector('#modal:not([hidden]) .kmodal'),name:d&&(d.querySelector('.kinln')||{}).textContent,acts:d?d.querySelectorAll('.kinlacts button').length:0,tiles:d?d.querySelectorAll('[data-kidpick]').length:-1,x:!!(d&&d.querySelector('.kit-x'))}});
   chk(tag,'slotpick-inline',!r7.card&&!r7.modal&&r7.name&&r7.acts>0&&!r7.x,r7);R[tag].slotPick7=r7}
  /* 8. Đa Bảo Các drawer: tile → strip under the drawer grid, its one act works */
  const dr=await p.evaluate(async()=>{try{if(typeof kitDisplayRoomOpen!=='function')return 'nofn';try{if(BAL.shelf&&!BAL.shelf.ui)BAL.shelf.ui=1;Object.keys(BAL.shelf.it).filter(k=>IT[k]).slice(0,8).forEach(k=>S.inv.push({k}))}catch(e){}const el=kitDisplayRoomOpen(S,{});if(!el)return 'noroom';await new Promise(r=>setTimeout(r,500));const sh=[...document.querySelectorAll('#kdr .kdr-sh')];for(const b of sh){b.click();await new Promise(r=>setTimeout(r,300));if(document.querySelector('#kdr .kdr-db [data-kdrix]'))return 'ok'}return 'notiles'}catch(e){return String(e).slice(0,100)}});
  R[tag].drawer=dr;
  if(dr==='ok'){const s0=await stripOf('#kdr .kdr-det .kinldet');chk(tag,'drawer-strip-empty',s0&&s0.empty,s0);
   await p.evaluate(()=>{document.querySelector('#kdr .kdr-db [data-kdrix]').click()});await p.waitForTimeout(400);
   const s7=await stripOf('#kdr .kdr-det .kinldet');chk(tag,'drawer-strip-named',s7&&!s7.empty&&s7.name&&s7.picL&&!s7.x&&!s7.card&&!s7.over&&s7.acts.length===1,s7);chk(tag,'drawer-no-card',await p.evaluate(()=>!document.getElementById('kidfl')));
   await shot('t7-drawer','#kdr .kdr-det .kinldet',1);
   const placed0=await p.evaluate(()=>document.querySelectorAll('#kdr .kdr-on [data-kdron]').length);
   await p.evaluate(()=>{const b=document.querySelector('#kdr .kdr-det [data-kdract]');b&&!b.disabled&&b.click()});await p.waitForTimeout(500);
   R[tag].drawerAct={placed0,after:await p.evaluate(()=>({kdr:!!document.getElementById('kdr'),n:document.querySelectorAll('#kdr [data-kdrp]').length}))};
   await p.evaluate(()=>{try{kitDisplayRoomClose()}catch(e){}})}
  chk(tag,'no-pageerrors',R[tag].errs.length===0,R[tag].errs.slice(0,2));
  /* scan: no item pop-up site left (law 11) */
  await ctx.close()}
 await b.close();srv.close();fs.writeFileSync(`${DIR}/bag-inline-pickers.json`,JSON.stringify(R,null,1));console.log(JSON.stringify(R));console.log(FAIL.length?'FAIL '+FAIL.length+'\n'+FAIL.join('\n'):'bag-inline-pickers PASS');process.exit(FAIL.length?1:0)})();
