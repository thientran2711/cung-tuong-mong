/* mg-ui-rest (owner OD:L1981 / L2008) — node dev/test/mg-ui-rest.js [dev/index.html] [WxH] [shotdir]
   1 td_dung: the guided round exists (tdwalk engine + «Hướng dẫn» on its rules screen), rules open with no engine / no clock
   2 pet care (feed / bath / play) + plant care (water): the tap opens the kit rules screen (kgReady) with «Hướng dẫn» + «Sẵn sàng»; no khắc spent, no game running;
     «Hướng dẫn» runs an unscored guided round (khắc, pet / plant stats untouched) and returns to the same screen; «Sẵn sàng» spends the khắc and starts the game
   3 seal word per caller: scheme games «MƯU»; every other kitGameFrame / kg82 caller defaults «TÀI NGHỆ»; an explicit seal wins
   4 no page errors */
const {chromium}=require('playwright');const path=require('path');const fs=require('fs');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(process.argv[3]||'755x1000').split('x').map(Number);const SH=process.argv[4]||'';if(SH)fs.mkdirSync(SH,{recursive:true});
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH},deviceScaleFactor:SH?2:1});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;S.rank=3;S.petTip=1;try{render()}catch(e){}});
 await p.evaluate(()=>{const st=document.createElement('style');st.textContent='.kmov{display:none!important}';document.head.appendChild(st);try{if(window.KMQ)KMQ.length=0}catch(e){}document.querySelectorAll('.kmov').forEach(e=>e.remove());Q.length=0;try{closeModal()}catch(e){}});await p.waitForTimeout(600);
 const sleep=t=>p.waitForTimeout(t);const shot=async n=>{if(SH)await p.screenshot({path:path.join(SH,`${n}-${VW}x${VH}@2.png`)})};
 /* 1 td_dung */
 const td=await p.evaluate(()=>({kind:!!KG82_KIND.td_dung,eng:typeof KG82_ENG[KG82_KIND.td_dung.e]==="function",can:typeof kgReadyCan==="function"&&kgReadyCan({kind:"td_dung"})}));
 ok(td.kind&&td.eng&&td.can,'td_dung: kind + tdwalk engine + guided round available',td);
 await p.evaluate(()=>{try{kg82Close()}catch(e){}Q.length=0;S.mg=null;TDS.busy=false;S.vir=S.vir||{};tdPlay("dung","self")});await sleep(900);
 const tdr=await p.evaluate(()=>{const bx=kg82Box();return bx?{rules:!!bx.querySelector('.kgr .kpst .kfx'),go:(bx.querySelector('.kgr-go')||{}).textContent,tut:!!bx.querySelector('#kgrtut'),canvas:!!bx.querySelector('canvas'),run:!!KG82.run}:null});
 ok(tdr&&tdr.rules&&tdr.tut&&/Sẵn sàng/.test(tdr.go||"")&&!tdr.canvas&&!tdr.run,'td_dung: rules screen + Hướng dẫn + Sẵn sàng, nothing running',tdr);await shot('td_dung');
 await p.evaluate(()=>{try{kg82Close();TDS.busy=false}catch(e){}});
 /* 2 pet care */
 const khac=()=>p.evaluate(()=>used);
 /* law 10 (rv FAIL 9137759f): every kgReady screen inside a figure-left dialog shows «Sẵn sàng», «Hướng dẫn» and «Để trời định» fully inside the visible dialog column */
 const fit=(sel)=>p.evaluate(sel=>{const q=s=>document.querySelector(s);const col=q('#modal .k3right')||q('#modal .dlg');const cb=col.getBoundingClientRect().bottom;const r={};for(const [n,s2] of [['go',sel+' .kgr-go'],['tut',sel+' #kgrtut'],['quick',sel.replace('game','quick')]]){const e=q(s2);if(e){const b=e.getBoundingClientRect();r[n]=Math.round(b.bottom)+'/'+Math.round(cb);r[n+'ok']=b.bottom<=cb+1&&b.top>=0}else r[n+'ok']=n==='quick'}return r},sel);
 for(const kind of ['feed','bath','play']){
  await p.evaluate(()=>{S.pets=[];petAdd(S,'meo','x','buy');S.petOn=0;Q.length=0;document.getElementById('modal').hidden=true;petcOpen(0)});await sleep(500);
  const u0=await khac();const pet0=await p.evaluate(()=>JSON.stringify(tsbPets(S)[0]));
  await p.evaluate(k=>document.querySelector(`[data-petc="${k}"]`).click(),kind);await sleep(500);
  const r=await p.evaluate(()=>{const bx=document.getElementById('kpcgame');return bx?{rules:!!bx.querySelector('.kgr .kpst .kfx'),go:(bx.querySelector('.kgr-go')||{}).textContent,tut:!!bx.querySelector('#kgrtut'),food:!!bx.querySelector('[data-food]'),ball:!!bx.querySelector('[data-ball]')}:null});
  ok(r&&r.rules&&r.tut&&/Sẵn sàng/.test(r.go||"")&&!r.food&&!r.ball,`pet ${kind}: rules screen (Luật chơi + Hướng dẫn + Sẵn sàng), game not started`,r);
  {const f=await fit('#kpcgame');ok(f.gook&&f.tutok&&f.quickok,`pet ${kind}: Sẵn sàng / Hướng dẫn / Để trời định inside the visible dialog`,f)}
  ok(await khac()===u0,`pet ${kind}: no khắc spent on the rules screen`,{u0,u:await khac()});await shot('pet-'+kind+'-rules');
  await p.evaluate(()=>document.getElementById('kgrtut').click());await sleep(800);
  let hand=false;for(let i=0;i<10&&!hand;i++){hand=await p.evaluate(()=>!!document.querySelector('.kgt-hand.on'));if(!hand)await sleep(300)}
  ok(hand,`pet ${kind}: guided round shows the ghost hand`);await shot('pet-'+kind+'-guide');
  ok(await khac()===u0&&await p.evaluate(()=>JSON.stringify(tsbPets(S)[0]))===pet0,`pet ${kind}: guided round is unscored (no khắc, pet unchanged)`);
  await p.evaluate(()=>document.getElementById('kgtback').click());await sleep(400);
  const back=await p.evaluate(()=>{const bx=document.getElementById('kpcgame');return !!bx&&!!bx.querySelector('.kgr-go')&&!!bx.querySelector('.kgr')&&!KG82.tut});
  ok(back,`pet ${kind}: «Về luật chơi» brings the same rules screen back`);
  await p.evaluate(()=>document.querySelector('#kpcgame .kgr-go').click());await sleep(500);
  const g=await p.evaluate(()=>{const bx=document.getElementById('kpcgame');return{kgr:!!bx.querySelector('.kgr'),food:!!bx.querySelector('[data-food]'),ball:!!bx.querySelector('[data-ball]'),bath:PETC.game,pips:bx.querySelectorAll('.nwb-cnt .nwb-pip').length,on:bx.querySelectorAll('.nwb-cnt .nwb-pip.on').length,words:/Đã vuốt/.test(bx.textContent||'')}/* mg-noword-care: no word in play, the game state is checked (5 empty dots), not text */});
  ok(!g.kgr&&(kind==='bath'?g.bath==='bath'&&g.pips===5&&g.on===0&&!g.words:kind==='feed'?g.food:g.ball),`pet ${kind}: «Sẵn sàng» starts the game`,g);
  ok(await khac()===u0+await p.evaluate(()=>BAL.pet.khac),`pet ${kind}: khắc spent only on «Sẵn sàng»`,{u:await khac()});await shot('pet-'+kind+'-play')}
 /* 2b plant care */
 const pk=await p.evaluate(()=>Object.keys(BAL.shelf.it).find(k=>BAL.shelf.it[k].care)||null);
 if(!pk)ok(false,'plant care: a care item exists in BAL.shelf.it');else{
  await p.evaluate(k=>{Q.length=0;document.getElementById('modal').hidden=true;shelfOf(S).g.mgp={k,pc:40};shelfPlantOpen('mgp')},pk);await sleep(500);
  const u0=await khac();const pc0=await p.evaluate(()=>shelfOf(S).g.mgp.pc);
  await p.evaluate(()=>document.querySelector('[data-shc="water"]').click());await sleep(500);
  const r=await p.evaluate(()=>{const bx=document.getElementById('kshpgame');return bx?{rules:!!bx.querySelector('.kgr .kpst .kfx'),go:(bx.querySelector('.kgr-go')||{}).textContent,tut:!!bx.querySelector('#kgrtut'),game:!!bx.querySelector('[data-shw]')}:null});
  ok(r&&r.rules&&r.tut&&/Sẵn sàng/.test(r.go||"")&&!r.game,'plant water: rules screen (Luật chơi + Hướng dẫn + Sẵn sàng), game not started',r);
  {const f=await fit('#kshpgame');ok(f.gook&&f.tutok&&f.quickok,'plant water: Sẵn sàng / Hướng dẫn / Để trời định inside the visible dialog',f)}
  ok(await khac()===u0,'plant water: no khắc spent on the rules screen');await shot('plant-rules');
  await p.evaluate(()=>document.getElementById('kgrtut').click());await sleep(800);
  let hand=false;for(let i=0;i<12&&!hand;i++){hand=await p.evaluate(()=>!!document.querySelector('.kgt-hand.on'));if(!hand)await sleep(300)}
  ok(hand,'plant water: guided round shows the ghost hand');await shot('plant-guide');
  ok(await khac()===u0&&await p.evaluate(()=>shelfOf(S).g.mgp.pc)===pc0,'plant water: guided round is unscored (no khắc, plant unchanged)');
  await p.evaluate(()=>document.getElementById('kgtback').click());await sleep(400);
  ok(await p.evaluate(()=>!!document.querySelector('#kshpgame .kgr-go')&&!!document.querySelector('#kshpgame .kgr')&&!KG82.tut),'plant water: «Về luật chơi» brings the same rules screen back');
  await p.evaluate(()=>document.querySelector('#kshpgame .kgr-go').click());await sleep(500);
  const g=await p.evaluate(()=>({kgr:!!document.querySelector('#kshpgame .kgr'),game:!!document.querySelector('#kshpgame [data-shw]'),st:SHPC.game}));
  ok(!g.kgr&&g.game&&g.st==='water','plant water: «Sẵn sàng» starts the game',g);
  ok(await khac()===u0+await p.evaluate(()=>BAL.shelf.plant.khacSelf),'plant water: khắc spent only on «Sẵn sàng»',{u:await khac()});await shot('plant-play');
  /* the quick roll from the rules screen also costs the khắc */
  await p.evaluate(k=>{Q.length=0;document.getElementById('modal').hidden=true;shelfOf(S).g.mgp={k,pc:40};used=0;shelfPlantOpen('mgp')},pk);await sleep(400);
  const u1=await khac();await p.evaluate(()=>document.querySelector('[data-shc="water"]').click());await sleep(400);await p.evaluate(()=>document.getElementById('kshpquick').click());await sleep(500);
  ok(await khac()===u1+await p.evaluate(()=>BAL.shelf.plant.khacSelf),'plant water: «Để trời định» from the rules screen spends the khắc once',{u1,u:await khac()})}
 /* 3 seal per caller */
 const seals=await p.evaluate(async()=>{const o={};const seal=h=>{const d=document.createElement('div');d.innerHTML=h;const e=d.querySelector('.kpseal');return e?e.textContent:null};
  o.frame=seal(kitGameFrame({art:"Cầm",title:"x"}));o.frameMuu=seal(kitGameFrame({art:"Cầm",title:"x",seal:"MƯU"}));o.kg82=seal(kg82Frame({art:"A",title:"B",how:"c"}));o.kg82Muu=seal(kg82Frame({art:"A",title:"B",how:"c",seal:"MƯU"}));
  o.pet=null;try{S.pets=[];petAdd(S,'meo','x','buy');S.petOn=0;petcOpen(0);document.querySelector('[data-petc="play"]').click();o.pet=(document.querySelector('#kpcgw .kpseal')||{}).textContent;petcClose()}catch(e){o.petErr=String(e)}
  try{kg82Close();S.vir=S.vir||{};const v=(typeof people==="function"?null:null);}catch(e){}
  return o});
 ok(seals.frame==='TÀI NGHỆ'&&seals.kg82==='TÀI NGHỆ'&&seals.pet==='TÀI NGHỆ','default seal TÀI NGHỆ (kitGameFrame, kg82Frame, pet care)',seals);
 ok(seals.frameMuu==='MƯU'&&seals.kg82Muu==='MƯU','explicit seal parameter wins (kitGameFrame, kg82Frame)',seals);
 const sg=await p.evaluate(async()=>{try{const G=SG.K.rumor;const v=(S.rivals&&S.rivals[0])||(typeof rivals==="function"?rivals()[0]:null)||S.pal&&S.pal[0];sgPlay({G,art:"Mưu kế",v,p0:()=>50,run:()=>{},cost:""});await new Promise(r=>setTimeout(r,900));const e=document.querySelector('#kg82 .kpseal');return e?e.textContent:null}catch(e){return 'ERR '+e.message}});
 ok(sg==='MƯU','scheme game (sgPlay) seal reads MƯU',sg);await shot('scheme-seal');
 ok(errs.length===0,'no page errors',errs.slice(0,3));
 await b.close();const f=res.filter(x=>!x).length;console.log(`${res.length-f}/${res.length} ok`);process.exit(f?1:0)})();
