/* hoa-dien (review/hoa-dien, dev/build/jhd.js): hoa điền = owned items in the ONE j92 table (slot "hd"), the placing step of the makeup
   (drag only — tilt step removed, mg-play2 owner OD 20/11 ~07:55Z; score = distance to the brow-centre spot), NPCs by the same formula (cap BAL.hd.npcCap), xa xỉ inside luxTotal,
   +1 per promotion, the Thử tay kind, old saves. Plays the step with REAL pointer drags (mouse, or touch through CDP with TOUCH=1).
   usage: node dev/test/hoa-dien.js <url of dev/index.html> <WxH@dpr> <shotdir>   (env TOUCH=1: touch drags) */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,URL,VP,DIR]=process.argv;const m=/(\d+)x(\d+)@([\d.]+)/.exec(VP||'755x1000@2');const W=+m[1],H=+m[2],DPR=+m[3];const tag=`${W}x${H}`;const TOUCH=!!process.env.TOUCH;
fs.mkdirSync(DIR,{recursive:true});let fail=0;const ck=(n,c,x)=>{console.log((c?'ok  ':'FAIL')+' '+n+(x!==undefined?' · '+JSON.stringify(x):''));if(!c)fail++};
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:DPR,serviceWorkers:'block',hasTouch:TOUCH,isMobile:false});
 await ctx.route(u=>/ctmload=1|x-ctm-load/.test(String(u)),r=>r.abort());const p=await ctx.newPage();const cdp=TOUCH?await ctx.newCDPSession(p):null;
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(180000);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1500);
 await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;new MutationObserver(()=>document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove())).observe(document.body,{childList:true})});
 for(let i=0;i<20;i++){await p.evaluate(()=>{window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S!==window.S0&&S.origin,null,{timeout:120000});
  if(await p.evaluate(()=>S.origin.k!=='cnv'&&!isSrv()&&!S.out))break}
 try{await require('./lib/roulette').dismissRoulette(p)}catch(e){}
 await p.waitForTimeout(1200);
 await p.evaluate(()=>{const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;S.buoi=0;used=0;S.suc=90;S.sac=Math.max(S.sac,55);deal();render();try{closeModal()}catch(e){}});

 /* 1. the ONE table: 8 hoa điền, one per phẩm, allowed motifs, never worn through the wardrobe */
 const t=await p.evaluate(()=>{const L=WD_LIST.filter(r=>r[1]==='hd');return{n:L.length,P:L.map(r=>r[3]).sort((a,b)=>a-b),names:L.map(r=>r[2]),kd:L.map(r=>IT[r[0]].kd),tg:IT.hoadien_bac.tg,
  bad:L.filter(r=>/nho|trái|quả|giọt|hạt|đồng xu/i.test(r[2])).map(r=>r[2]),tramPool3:wdPool('tram',3,true).length,lux:L.map(r=>wdLux(r[0]))}});
 ck('8 hoa điền, P1..P8',t.n===8&&t.P.join()==='1,2,3,4,5,6,7,8',t.P);ck('kind Hoa điền',t.kd.every(k=>k==='Hoa điền'),t.kd);ck('motifs flowers/leaves/butterfly/phoenix only',!t.bad.length,t.bad);
 ck('giftable (tg rv)',t.tg.includes('rv'));ck('xa xỉ grows with phẩm',t.lux.every((v,i)=>!i||v>=t.lux[i-1]-12),t.lux);
 const wr=await p.evaluate(()=>{S.inv.push({k:'hd_diep'});const i=S.inv.length-1;const r=wdWear(S,i);const still=S.inv[i]&&S.inv[i].k==='hd_diep';const w=wdOf(S);return{r,still,hd:w.hd||null,tram:w.tram&&w.tram.k}});
 ck('wdWear refuses a hoa điền (stays in chest)',wr.r===''&&wr.still&&!wr.hd,wr);
 /* old save: hoa điền worn in the Cài tóc slot goes back to the chest */
 const os=await p.evaluate(()=>{const v=rivals.find(x=>x.alive);v.wd={tram:{k:'hoadien_bac',from:'emp'},y:null};const w=wdOf(v);return{tram:w.tram&&w.tram.k,back:(v.inv||[]).some(e=>e.k==='hoadien_bac')}});
 ck('old save: worn hoa điền → chest, default trâm back',os.tram&&os.tram!=='hoadien_bac'&&os.back,os);

 /* 2. one formula: toilRaw without hd = the old .4/.3/.3; hdQ falls with distance (no tilt); NPC by the same q, hashed, cap 95 % */
 const f=await p.evaluate(()=>{const P={brow:.8,powder:.6,son:.7};const old=Math.round(100*(.4*.8+.3*.6+.3*.7));
  const T=BAL.hd.tolD;const q=[hdQ(0,0,1),hdQ(T*.2,0,1),hdQ(T*.5,0,1),hdQ(T*.8,0,1),hdQ(T*.5,1,1)];
  const v=rivals.find(x=>x.alive&&x!==S);v.inv=(v.inv||[]).filter(e=>!WD_ITEMS[e.k]||WD_ITEMS[e.k].sl!=='hd');v.inv.push({k:'hd_mai'},{k:'hd_phuong'});delete v.tl2;/* AG (jagtoil G11): her face of the day is chosen once, at first need; she chose it before these were in her chest, so she sits again */
  const a=hdNpc(v,12345,.6),b2=hdNpc(v,12345,.6);let mx=0;for(let i=0;i<400;i++)mx=Math.max(mx,hdNpc(v,i,1).q);
  const rec=toilNpc(v);const lx=luxOf(v).sc,parts=luxParts(v);
  return{raw:toilRaw(P),old,rawHd:toilRaw(Object.assign({hd:1},P)),q,a,same:JSON.stringify(a)===JSON.stringify(b2),mx,cap:BAL.hd.npcCap,rec:rec.hd||null,mk:rec.makeup,lx,parts,
   P:wdPOf(v),pick:a&&WD_ITEMS[a.k].P}});
 ck('toilRaw without hd = old formula',f.raw===f.old,[f.raw,f.old]);ck('a good hoa điền raises the score',f.rawHd>f.raw,[f.rawHd,f.raw]);
 ck('hdQ: 1 at the anchor, falls with distance, skill widens',f.q[0]===1&&f.q[1]>f.q[2]&&f.q[2]>f.q[3]&&f.q[4]>f.q[2],f.q);
 ck('NPC hd deterministic',f.same,f.a);ck('NPC never above cap',f.mx<=f.cap+1e-9,[f.mx,f.cap]);ck('NPC wears one within her phẩm (or her lowest)',f.pick<=Math.max(1,f.P+1),[f.pick,f.P]);
 ck('NPC record carries hd when made up',!f.mk||!!f.rec,f.rec);ck('luxParts.hd inside mk',!f.rec||(f.parts.hd>0&&f.parts.mk>=f.parts.hd),f.parts);

 /* 3. promotion +1, restock can carry one */
 const pr=await p.evaluate(()=>{const v=rivals.find(x=>x.alive&&x!==S&&rkOf(x)<5&&!x.queen);const n0=(v.inv||[]).filter(e=>WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='hd').length;
  const r0=rkOf(v);const fx=promoReqP;promoReqP=()=>[[true]];let txt='';try{txt=promoteP(v)}finally{promoReqP=fx}const n1=(v.inv||[]).filter(e=>WD_ITEMS[e.k]&&WD_ITEMS[e.k].sl==='hd').length;
  const r1=rkOf(v);const sv=BAL.hd.shop;BAL.hd.shop=100;restock();BAL.hd.shop=sv;return{n0,n1,r0,r1,shop:S.shop.filter(k=>WD_ITEMS[k]&&WD_ITEMS[k].sl==='hd')}});
 ck('promotion gives one hoa điền',pr.r1<=pr.r0||pr.n1===pr.n0+1,pr);ck('restock can carry a hoa điền',pr.shop.length>=1,pr.shop);

 /* 3b. r3: dropped designs (BAL.hd.drop): never given out, an old save owning one maps to the nearest kept design by phẩm, no crash */
 const dr=await p.evaluate(()=>{const D=BAL.hd.drop.slice();const pools=[1,2,3,4,5,6,7,8].map(P=>wdPool('hd',P));const given=new Set();for(let i=0;i<200;i++)for(let P=1;P<=8;P++){const k=wdPickAt(P,'hd',0);if(k)given.add(k)}
  const v=rivals.find(x=>x.alive&&x!==S);v.inv=(v.inv||[]).filter(e=>!WD_ITEMS[e.k]||WD_ITEMS[e.k].sl!=='hd');v.inv.push({k:D[0]},{k:D[1]});const own=hdOwned(v).map(e=>e.k);
  S.toilette={day:toilWk()*10,wk:toilWk(),score:60,makeup:true,look:'vua',hd:{k:D[1],q:.9}};const sh=hdShown(S);
  return{D,empty:pools.map(a=>a.length),given:[...given],own,map:D.map(k=>hdMap(k)),shown:sh&&sh.k}});
 ck('dropped designs are never given out (pool / pick), empty phẩm falls back to a kept one',dr.D.every(k=>!dr.given.includes(k))&&dr.empty.every(n=>n>0),dr);
 ck('old save owning a dropped design maps to a kept one (no crash)',dr.own.length>0&&dr.own.every(k=>!dr.D.includes(k))&&dr.map.every(k=>!dr.D.includes(k))&&!dr.D.includes(dr.shown),dr);

 /* 4. the makeup step, played: give her two hoa điền, run the morning sitting fast, pick one, drag it onto the brow centre, Dán (no tilt step) */
 async function sitting(good){await p.evaluate(()=>{Q.length=0;S.buoi=0;used=0;S.suc=90;S.toilette=null;S.toilSeen=null;S.inv=(S.inv||[]).filter(e=>!WD_ITEMS[e.k]||WD_ITEMS[e.k].sl!=='hd');S.inv.push({k:'hd_dao'},{k:'hd_sen'});
   try{closeModal()}catch(e){}deal();render()});await p.waitForTimeout(500);
  for(let i=0;i<4;i++){try{await require('./lib/roulette').clearMoments(p)}catch(e){}await p.evaluate(()=>document.querySelectorAll('.kfgain').forEach(e=>e.remove()));await p.waitForTimeout(200)}
  await p.evaluate(()=>{const c=document.querySelector('#k3tt [data-k3="toil"]');if(c)c.click();else toilOpen()});await p.waitForSelector('#toilrdy');await p.click('#toilrdy');await p.waitForSelector('#kg82 .toilw');await p.waitForTimeout(500);
  await p.click('#toilok');await p.waitForTimeout(300);await p.evaluate(()=>{TOIL.clock=.25});await p.click('#toilmk');await p.waitForSelector('#kg82 .kswt');
  await p.$eval('#toilgo',e=>e.click());await p.waitForFunction(()=>TOIL.geo&&TOIL.geo.ready(),null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(500);
  for(let i=0;i<2;i++){await p.waitForSelector('#toilnx',{timeout:30000});await p.click('#toilnx');await p.waitForTimeout(250)}
  await p.waitForSelector('#kg82 [data-hdk]',{timeout:60000});await p.waitForTimeout(400);
  const pick=await p.evaluate(()=>({n:document.querySelectorAll('#kg82 [data-hdk]').length,lbl:[...document.querySelectorAll('#kg82 [data-hdk]')].map(b=>b.textContent)}));
  await p.screenshot({path:`${DIR}/hd-${tag}-1-pick${good?'':'-miss'}.jpg`,quality:70});
  await p.click('#kg82 [data-hdk="hd_sen"]');await p.waitForFunction(()=>HD.peek&&HD.peek(),null,{timeout:20000});await p.waitForTimeout(300);
  await p.waitForFunction(()=>{const i=kg82Img('chai-bg');const h=HD_IMG.hd_sen;return i.complete&&i.naturalWidth&&h&&h.complete&&h.naturalWidth},null,{timeout:90000}).catch(()=>{});await p.waitForTimeout(800);
  const pk=await p.evaluate(()=>HD.peek());const tx=good?pk.anchor.x:pk.anchor.x+pk.ed*.5,ty=good?pk.anchor.y:pk.anchor.y-pk.ed*.3;
  /* drag from a point on the board (relative drag: the finger never covers the target) */
  const sx=pk.at.x-40,sy=pk.at.y+30,ex=sx+(tx-pk.at.x),ey=sy+(ty-pk.at.y);
  if(TOUCH){const tp=(type,x,y)=>cdp.send('Input.dispatchTouchEvent',{type,touchPoints:type==='touchEnd'?[]:[{x,y}]});await tp('touchStart',sx,sy);for(let i=1;i<=12;i++)await tp('touchMove',sx+(ex-sx)*i/12,sy+(ey-sy)*i/12);await tp('touchEnd')}
  else{await p.mouse.move(sx,sy);await p.mouse.down();await p.mouse.move(ex,ey,{steps:12});await p.mouse.up()}
  ck('no tilt buttons on the board',!(await p.$('#hdl,#hdr')));
  const pk2=await p.evaluate(()=>HD.peek());await p.screenshot({path:`${DIR}/hd-${tag}-2-place${good?'':'-miss'}.jpg`,quality:70});
  if(TOUCH){const bb=await p.$eval('#hdok',e=>{const r=e.getBoundingClientRect();return[r.x+r.width/2,r.y+r.height/2]});await p.touchscreen.tap(bb[0],bb[1])}else await p.click('#hdok');
  await p.waitForFunction(()=>S.toilette&&S.toilette.wk===toilWk(),null,{timeout:30000});const snap=await p.evaluate(()=>HD.peek());await p.waitForTimeout(1500);
  await p.screenshot({path:`${DIR}/hd-${tag}-3-result${good?'':'-miss'}.jpg`,quality:70});
    for(let i=0;i<6&&await p.$('.ktrv');i++){if(await p.$('.ktrv-ov>.kmend'))await p.click('.ktrv-ov>.kmend').catch(()=>{});else await p.evaluate(()=>{const o=document.querySelector('.ktrv-ov');o&&o.click()});await p.waitForTimeout(900)}
  await p.waitForSelector('#toildone',{timeout:30000}).catch(()=>{});await p.screenshot({path:`${DIR}/hd-${tag}-3b-rows${good?'':'-miss'}.jpg`,quality:70});
  const res=await p.evaluate(()=>({rec:S.toilette,row:[...document.querySelectorAll('#kg82 .kgr td,#kg82 .kgr .krow,#kg82 .kgr')].map(e=>e.textContent).join(' ').includes('Dán hoa điền'),lux:luxParts(S)}));
  try{await require('./lib/roulette').clearMoments(p)}catch(e){}const d=await p.$('#toildone');if(d)await d.click();await p.waitForTimeout(500);
  /* r2: every view draws it at the anchor (kitFxLayers layer), straight or with the fixed vụng tilt */
  await p.evaluate(()=>{try{render()}catch(e){}});await p.waitForFunction(()=>[...document.querySelectorAll('img[data-hdl]')].some(i=>/^data:image\/png/.test(i.src)),null,{timeout:60000}).catch(()=>{});await p.waitForTimeout(500);
  const lay=await p.evaluate(()=>{const L=[...document.querySelectorAll('img[data-hdl]')];const where=[...new Set(L.map(e=>e.closest('#stage')?'stage':e.closest('header')?'header':e.closest('.kmini')?'avatar':'other'))];
   const e=L.length?HD_FL[L[0].dataset.hdl]:null;return{n:L.length,where,painted:L.filter(i=>/^data:image\/png/.test(i.src)).length,at:e&&e.at,vung:hdVung(S.toilette.hd&&S.toilette.hd.q),look:S.toilette.look,slip:S.toilette.slip||''}});
  await p.screenshot({path:`${DIR}/hd-${tag}-5-stage${good?'':'-vung'}.jpg`,quality:70});
  for(const w of ['#stage','header']){const c=await p.evaluate(w=>{const i=[...document.querySelectorAll(w+' img[data-hdl]')].find(x=>x.getBoundingClientRect().width>0);if(!i)return null;const e=HD_FL[i.dataset.hdl];const r=i.getBoundingClientRect();if(!e||!e.at)return null;
    const R=Math.max(24,r.width*.12);return{x:Math.max(0,r.x+e.at[0]*r.width-R),y:Math.max(0,r.y+e.at[1]*r.height-R),width:2*R,height:2*R}},w);
   if(c)await p.screenshot({path:`${DIR}/hd-${tag}-6-face-${w.replace('#','')}${good?'':'-vung'}.jpg`,quality:85,clip:c})}
  return{pick,pk,pk2,res,snap,lay}}
 const G=await sitting(true);
 ck('picker lists her 2 hoa điền + Không dán',G.pick.n===3,G.pick.lbl);
 ck('placed on the anchor → high q',G.res.rec.hd&&G.res.rec.hd.q>=.8,G.res.rec.hd);ck('result row "Dán hoa điền"',G.res.row);
 ck('xa xỉ: the hoa điền is in the total',G.res.lux.hd>0&&G.res.lux.mk>=G.res.lux.hd,G.res.lux);
 ck('anchor from the face table/mesh, hidden',!!(G.pk&&G.pk.mesh&&!G.pk.shown),G.pk);
 const Mi=await sitting(false);
 ck('miss still counts (lower q, still a part)',Mi.res.rec.hd&&Mi.res.rec.hd.q<G.res.rec.hd.q,Mi.res.rec.hd);
 /* r2 owner OD 21:03Z: the result sits at the anchor whatever she dragged; straight when good, fixed vụng tilt when low */
 const near=(a,b)=>Math.hypot(a.x-b.x,a.y-b.y)<2;const vA=await p.evaluate(()=>BAL.hd.vungA);
 ck('good: snapped to the anchor, straight',G.snap&&near(G.snap.at,G.snap.anchor)&&Math.abs(G.snap.ang-G.snap.ideal)<.01,G.snap);
 ck('vụng: snapped to the anchor, fixed tilt',Mi.snap&&near(Mi.snap.at,Mi.snap.anchor)&&Math.abs(Mi.snap.ang-Mi.snap.ideal-vA)<.01,Mi.snap);
 ck('good: layer drawn on her pictures (stage/header), straight',G.lay.painted>0&&!G.lay.vung,G.lay);
 ck('vụng: layer drawn with the vụng tilt + look vụng (praise/criticism follows)',Mi.lay.painted>0&&Mi.lay.vung&&Mi.lay.look==='vung',Mi.lay);
 const npcL=await p.evaluate(()=>{const v=rivals.find(x=>x.alive&&!x.out&&toilNpc(x).makeup&&toilNpc(x).hd);if(!v)return{none:1};const f=String(figFor(v,'por')||'').split('/').pop().split('?')[0];MK_FIT.get(f);return{f,h:hdFaceLayer(v,f).length}});
 if(!npcL.none){await p.waitForTimeout(3000);const h=await p.evaluate(f=>{const v=rivals.find(x=>x.alive&&!x.out&&toilNpc(x).makeup&&toilNpc(x).hd);const off=hdFaceLayer(v,f);BAL.hd.npcShow=1;const on=hdFaceLayer(v,f);BAL.hd.npcShow=0;return{off,on,dom:[...document.querySelectorAll('img[data-hdl]')].filter(i=>!i.dataset.hdl.includes(String(figFor(S,'por')||'').split('/').pop().split('?')[0])&&!i.dataset.hdl.includes(String(figFor(S)||'').split('/').pop().split('?')[0])).length}},npcL.f);
  ck('NPC switch OFF (BAL.hd.npcShow 0): no sticker on NPC portraits',h.off===''&&h.dom===0,{f:npcL.f,dom:h.dom});ck('NPC switch ON: the same layer',/data-hdl/.test(h.on))}

 /* 5. Thử tay: the kind is registered and its board plays to env.end */
 const th=await p.evaluate(()=>({k:KG82_KIND.hoadien,eng:typeof KG82_ENG.hoadien}));ck('KG82_KIND.hoadien registered',!!th.k&&th.eng==='function',th);
 /* jmgcal (review/ag-all-2) lists a kind for Thử tay by exactly this filter (mgCalKinds) */
 ck('Thử tay lists it (mgCalKinds filter)',await p.evaluate(()=>Object.keys(KG82_KIND).filter(k=>{const K=KG82_KIND[k];return K&&K.n&&typeof KG82_ENG[K.e]==='function'}).includes('hoadien')));
 await p.evaluate(()=>{window.__hdEnd=null;kg82Open({title:'Dán hoa điền',how:KG82_KIND.hoadien.how,round:'Thử tay'});KG82.lv=2;kg82Play('hoadien',r=>{window.__hdEnd=r})});
 await p.waitForFunction(()=>HD.peek&&HD.peek()&&document.getElementById('hdok'),null,{timeout:60000});await p.waitForTimeout(300);
 const pk=await p.evaluate(()=>HD.peek());await p.mouse.move(pk.at.x,pk.at.y);await p.mouse.down();await p.mouse.move(pk.anchor.x,pk.anchor.y,{steps:8});await p.mouse.up();
 await p.screenshot({path:`${DIR}/hd-${tag}-4-thutay.jpg`,quality:70});await p.click('#hdok');await p.waitForFunction(()=>window.__hdEnd!=null,null,{timeout:20000}).catch(()=>{});
 const end=await p.evaluate(()=>window.__hdEnd);ck('Thử tay board ends with a grade',end!=null,end);try{await p.evaluate(()=>kg82Close())}catch(e){}

 /* 6. old save (fixture from before hoa-dien) with the old hair-slot hoa điền worn: loads, migrates, renders, NPC looks + totals work */
 {const J=JSON.parse(fs.readFileSync(__dirname+'/fixtures/world30-met.json','utf8'));J.S.wd.tram={k:'hoadien_bac',from:'emp'};
  const o=await p.evaluate(d=>{const e0=[];try{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;Q.length=0;render()}catch(e){e0.push(String(e))}
   const w=wdOf(S);let n=0;try{for(const v of rivals)if(v.alive){toilNpc(v);luxTotal(v);n++}}catch(e){e0.push(String(e))}
   return{e0,tram:w.tram&&w.tram.k,back:S.inv.some(e=>e&&e.k==='hoadien_bac'),tot:luxTotal(S),n}},JSON.stringify(J));
  ck('old save loads + migrates the worn hoa điền',!o.e0.length&&o.tram!=='hoadien_bac'&&o.back&&o.n>0,o)}
 /* 6. no horizontal overflow, no page errors */
 const ov=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);ck('no horizontal overflow',!ov);
 ck('no page errors',!errs.length,errs.slice(0,5));
 console.log(fail?`FAIL ${fail}`:'ALL OK');await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
