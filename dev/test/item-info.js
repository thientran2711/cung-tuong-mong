/* KIT §70 item detail (review/item-info): every item cell → tap shows the same kitItemDetail.
   usage: node dev/test/item-info.js <url> <outdir> [WxH,WxH…] [save]
   Per viewport: dress pick (tap = select + strip with Mặc/Cài/Tháo, no blind wear; Mặc bộ này still works), Tư trang bag INLINE strip (§70.6) rows,
   Bên mình slot panel pick tile → card, shop picture → card, reward box row → card, event item tag → card, Hội phối đồ board → strip,
   other people's worn slot → card, veil picker. Checks: same .kidrows labels everywhere, no horizontal overflow, card inside the viewport. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,DIR,SIZES,SAVE]=process.argv;fs.mkdirSync(DIR,{recursive:true});
const VPS=(SIZES||'755x1000,1000x755,1180x820,1366x1024,844x390').split(',').map(s=>s.split('x').map(Number));
const R={};
(async()=>{const b=await chromium.launch();
 for(const [W,H] of VPS){const tag=`${W}x${H}`;const out=R[tag]={errs:[]};
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,serviceWorkers:'block'});await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());
  const p=await ctx.newPage();p.on('pageerror',e=>out.errs.push(e.message.slice(0,200)));p.setDefaultTimeout(60000);const step=n=>{if(process.env.DBG)console.error(tag,'step',n)};
  step(0);await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1200);
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true})});
  for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
   await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:90000});
   if(await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out))break}
  await p.waitForTimeout(1200);
  /* a full chest: hairpins, garments, bracelet, sachet, fabric, tonic, a letter, a gift from Hoàng hậu */
  await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;S.buoi=0;used=0;S.suc=90;S.bac=500;
   const add=(k,o)=>S.inv.push(Object.assign({k},o||{}));add('tram_ngoclan',{from:'hh'});add('y_saxanh');add('y_haiduong',{giver:'Hoàng hậu'});add('vongngoc',{from:'th'});add('tuithom');add('luahang');add('nhansam');
   if(IT.thu)add('thu');deal();Q.length=0;try{closeModal()}catch(e){}document.querySelectorAll('.kmrew').forEach(e=>{const m=e.closest('.modal,#modal');(m||e).hidden=true});render()});
  /* the new items reveal themselves (kitGain / kitReward stages): let them play out, then clear what is left */
  for(let i=0;i<20;i++){await p.waitForTimeout(500);const n=await p.evaluate(()=>{KMQ.length=0;const L=document.querySelectorAll('.kmov');L.forEach(e=>e.remove());try{kmBusy=false}catch(e){}return L.length});if(!n&&i>3)break}
  const shot=async n=>{await p.waitForTimeout(250);await p.screenshot({path:`${DIR}/${tag}-${n}.jpg`,quality:60})};
  const ovf=()=>p.evaluate(()=>{const W=innerWidth;const bad=[];document.querySelectorAll('.kidet, .kidet *').forEach(e=>{const r=e.getBoundingClientRect();if(r.width&&(r.right>W+1||r.left<-1))bad.push(e.className||e.tagName)});return bad.slice(0,5)});
  const labels=()=>p.evaluate(()=>[...document.querySelectorAll('.kidrows .krl')].map(e=>e.textContent));
  const card=async()=>p.evaluate(()=>{const c=document.querySelector('#kidfl .kidc');if(!c)return null;const r=c.getBoundingClientRect();return{name:(c.querySelector('.kidn')||{}).textContent,in:r.top>=0&&r.left>=0&&r.bottom<=innerHeight+1&&r.right<=innerWidth+1,rows:[...c.querySelectorAll('.krl')].map(e=>e.textContent),acts:[...c.querySelectorAll('.kidacts button')].map(e=>e.firstChild.textContent)}});
  step(1);/* 1. dress pick */
  out.toilErr=await p.evaluate(()=>{try{TOIL.st=null;toilOpen();{const r=document.getElementById('toilrdy');if(r)r.click()}return [!!document.querySelector('#kg82'),document.querySelector('#kg82')&&document.querySelector('#kg82').hidden,!!window.__bot].join()}catch(e){return e.stack.slice(0,400)}});if(process.env.DBG)console.error(out.toilErr,out.errs);await p.waitForSelector('#kg82 .toilw');await p.waitForTimeout(500);
  const before=await p.evaluate(()=>JSON.stringify(wdOf(S))+JSON.stringify(S.inv.map(e=>e.w|0)));
  out.dressHint=await p.evaluate(()=>(document.querySelector('#kg82 .toildet')||{}).textContent||'');
  await p.evaluate(()=>{const t=[...document.querySelectorAll('#kg82 [data-kinvkey="toil"][data-kinvi]')].find(e=>/Váy sa xanh/.test(e.title));t&&t.scrollIntoView({block:'center'})});
  out.tapHit=await p.evaluate(()=>{const t=document.querySelector('#kg82 [data-kinvkey="toil"][data-kinvi][title^="Váy sa xanh"]');const r=t.getBoundingClientRect();const h=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);t.click();return h===t||t.contains(h)?'ok':(h&&(h.id||h.className))});await p.waitForTimeout(300);
  out.dressBlind=(await p.evaluate(()=>JSON.stringify(wdOf(S))+JSON.stringify(S.inv.map(e=>e.w|0))))!==before;
  out.dressStrip=await p.evaluate(()=>{const d=document.querySelector('#kg82 .toildet .kidet');if(!d)return null;return{name:d.querySelector('.kidn').textContent,sel:!!document.querySelector('#kg82 .kitem-sel'),
   acts:[...d.querySelectorAll('[data-toilact]')].map(b=>b.firstChild.textContent)}});
  out.dressLabels=await labels();out.dressOvf=await ovf();
  await p.evaluate(()=>{const d=document.querySelector('#kg82 .toildet');d&&d.scrollIntoView({block:'center'})});await shot('1-dress-pick');
  await p.evaluate(()=>document.querySelector('#kg82 .toildet [data-toilact="wear"]').click());await p.waitForTimeout(300);
  out.dressWorn=await p.evaluate(()=>wdOf(S).y&&wdOf(S).y.k);
  out.dressAfter=await p.evaluate(()=>{const d=document.querySelector('#kg82 .toildet .kidet');return d?{name:d.querySelector('.kidn').textContent,acts:[...d.querySelectorAll('[data-toilact]')].map(b=>b.firstChild.textContent)}:null});
  /* slot tap → detail with Tháo */
  await p.evaluate(()=>{const s=document.querySelector('#kg82 [data-keqk="toil"][data-keqi="0"]');s&&s.click()});await p.waitForTimeout(250);
  out.slotStrip=await p.evaluate(()=>{const d=document.querySelector('#kg82 .toildet .kidet');return d?{name:d.querySelector('.kidn').textContent,acts:[...d.querySelectorAll('[data-toilact]')].map(b=>b.firstChild.textContent)}:null});
  await p.evaluate(()=>{const r=document.getElementById('toilrdy');if(r)r.click()});await p.waitForTimeout(300);await p.evaluate(()=>document.getElementById('toilok').click());await p.waitForTimeout(300);out.dressDone=await p.evaluate(()=>TOIL.st&&TOIL.st.dv);
  await p.evaluate(()=>{try{kg82Close()}catch(e){}TOIL.st=null});await p.waitForTimeout(300);
  step(2);/* 2. Tư trang bag panel: tap a tile = INLINE strip under the grid (KIT §70.6, no pop-up); the old modal path is gone */
  await p.evaluate(()=>{try{localStorage.setItem('hclh-inv-sub','tui')}catch(e){}KINV_SUB='tui';tab='inv';render()});await p.waitForTimeout(500);
  await p.evaluate(()=>{const i=kinvItems().findIndex(x=>x.g&&x.g.k==='vongngoc');const t=document.querySelector(`#panel [data-kinvkey="tutrang"][data-kinvi="${i}"]`);t&&t.scrollIntoView({block:'center'});t&&t.click()});await p.waitForTimeout(400);
  out.bagLabels=await p.evaluate(()=>[...document.querySelectorAll('#panel .kinldet .krl')].map(e=>e.textContent));
  out.bagFromFact=await p.evaluate(()=>/Thái hậu ban/.test((document.querySelector("#panel .kinldet")||{}).textContent||''));
  out.bagTxt=await p.evaluate(()=>((document.querySelector('#panel .kinldet')||{}).textContent||'').replace(/\s+/g,' ').slice(0,260));out.bagNoModal=await p.evaluate(()=>!document.querySelector('#modal:not([hidden]) .kmodal')&&!document.querySelector('.kinldet .kit-x'));
  await shot('2-bag-strip');
  step(3);/* 3. Bên mình slot panel → tap a pick tile = card (no blind wear) */
  await p.evaluate(()=>{const it=kinvItems().find(x=>x.g&&x.g.k==='tram_ngoclan');wdSlotOpen({wd:'tram',label:'Cài tóc',ghost:''})});await p.waitForTimeout(400);
  const b3=await p.evaluate(()=>JSON.stringify(wdOf(S)));
  await p.evaluate(()=>{const t=document.querySelector('#modal .keqpick [data-kid]');t&&t.click()});await p.waitForTimeout(300);
  out.slotPickBlind=(await p.evaluate(()=>JSON.stringify(wdOf(S))))!==b3;out.slotPickCard=await card();await shot('3-slot-pick-card');
  await p.evaluate(()=>{kitItemCardClose();try{closeModal()}catch(e){}});await p.waitForTimeout(200);
  step(4);/* 4. shop picture → card */
  await p.evaluate(()=>{try{if(typeof shopOpen==='function')shopOpen();else if(typeof kitShopNvp==='function')kitShopNvp()}catch(e){console.error(e)}});await p.waitForTimeout(600);
  await p.evaluate(()=>{const t=document.querySelector('[data-kshdet]');t&&t.click()});await p.waitForTimeout(300);
  out.shop=await p.evaluate(()=>{const d=document.querySelector('.kshdet .kidet');return d?{name:d.querySelector('.kidn').textContent,rows:[...d.querySelectorAll('.krl')].map(e=>e.textContent)}:null});await shot('4-shop');
  await p.evaluate(()=>{try{closeModal()}catch(e){}});await p.waitForTimeout(200);
  step(5);/* 5. reward box: rows carry data-kid → card */
  await p.evaluate(()=>{kitReward({kind:'chest',title:'Ân thưởng',items:[kgItem({k:'vongngoc'}),kgItem({k:'nhansam'})]})});await p.waitForTimeout(300);
  await p.evaluate(()=>{const r=document.querySelector('.kmrew');r&&r.click()});await p.waitForTimeout(400);await p.evaluate(()=>{const r=document.querySelector('.kmrew');r&&r.click()});await p.waitForTimeout(600);
  out.rewardTap=await p.evaluate(()=>document.querySelectorAll('.kmrew [data-kid]').length);
  await p.evaluate(()=>{const t=document.querySelector('.kmrew .kmrow[data-kid]');t&&t.click()});await p.waitForTimeout(300);out.rewardCard=await card();await shot('5-reward-card');
  await p.evaluate(()=>{kitItemCardClose();try{closeModal()}catch(e){}Q.length=0;KMQ.length=0;document.querySelectorAll('.kmov').forEach(e=>e.remove());try{kmBusy=false}catch(e){}render()});await p.waitForTimeout(200);
  step(6);/* 6. event item tag → card */
  await p.evaluate(()=>{Q.push({t:'Bức thư lạ',h:'<p>Có người để một bức thư trên án thư.</p>',item:{key:'thu'},opts:[{n:'Giữ lại',fx:{}},{n:'Đốt đi',fx:{}}]});showModal()});await p.waitForTimeout(500);
  out.tagTap=await p.evaluate(()=>!!document.querySelector('.kiev [data-kid]'));
  await p.evaluate(()=>{const t=document.querySelector('.kiev [data-kid]');t&&t.click()});await p.waitForTimeout(300);out.tagCard=await card();await shot('6-event-tag-card');
  await p.evaluate(()=>{kitItemCardClose();Q.length=0;try{closeModal()}catch(e){}render()});await p.waitForTimeout(200);
  step(7);/* 7. Hội phối đồ board */
  await p.evaluate(()=>{tsDressGame('thanh',()=>{})});await p.waitForTimeout(400);
  await p.evaluate(()=>{const t=document.querySelector('#kg82 [data-tsi]');t&&t.click()});await p.waitForTimeout(250);
  out.tsStrip=await p.evaluate(()=>{const d=document.querySelector('#kg82 .ts-det .kidet');return d?{name:d.querySelector('.kidn').textContent,acts:[...d.querySelectorAll('[data-tsact]')].map(b=>b.firstChild.textContent),placed:document.querySelectorAll('#kg82 .ts-slot .kitem:not(.kitem-empty)').length}:null});
  await shot('7-hoi-phoi-do');await p.evaluate(()=>{try{kg82Close()}catch(e){}});await p.waitForTimeout(200);
  step(8);/* 8. another consort's worn slot → card */
  await p.evaluate(()=>{const v=rivals.find(r=>r.alive!==false&&typeof wdSlots==='function'&&wdSlots(r).some(s=>!s.empty));window.__kv=v;if(v)document.body.insertAdjacentHTML('beforeend',`<div id="kvt">${kitWearSlots(v,{size:'sm'})}</div>`)});
  await p.evaluate(()=>{const t=document.querySelector('#kvt [data-kwear]');t&&t.click()});await p.waitForTimeout(300);out.npcCard=await card();out.npcDbg=await p.evaluate(()=>{const v=window.__kv;try{const R=kitItemRef({wdSlot:'tram',who:v});return [!!R,R&&R.k,JSON.stringify(wdOf(v)),(document.querySelector('#modal:not([hidden]) .kph')||{}).textContent].join('|')}catch(e){return e.message}});out.npcWho=await p.evaluate(()=>window.__kv?window.__kv.name+':'+document.querySelectorAll('#kvt [data-kwear]').length:'none');
  await p.evaluate(()=>{kitItemCardClose();const x=document.getElementById('kvt');x&&x.remove();try{closeModal()}catch(e){}});
  step(9);/* 9. the kit page sample renders */
  out.kitSample=await p.evaluate(()=>{const s=KIT_SAMPLES.find(x=>x.id==='§70');return s?(s.html().match(/class="kidet/g)||[]).length:0});
  await ctx.close();console.log(tag,JSON.stringify(out))}
 await b.close();fs.writeFileSync(`${DIR}/item-info.json`,JSON.stringify(R,null,1))})();
