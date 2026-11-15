/* review/gift-chest (người duyệt): hộp quà nhà mẹ đẻ, phẩm phục nhập cung, rương thăng phẩm, mua/bán/nhặt/mất (jflow), thu hồi khi giáng phẩm,
   bước nhận kitReward (dải phẩm trên viền ô + tên dưới ô), sổ cũ (không rương bù), kit 0 lỗi trang ở mọi tab.
   usage: node dev/test/gift-chest.js <baseURL of site root> <outdir> [WxH@dpr,...] [oldsave.json]
   The real new-game flow is used (title → Luân hồi card → Nhận thân phận), origin forced to tt. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,OUT,VPA,OLD]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const VPS=(VPA||'755x1000@2,1000x755@2,1180x820@2,844x390@3').split(',').map(s=>{const [a,d]=s.split('@');const [w,h]=a.split('x').map(Number);return [w,h,+d||2]});
const sleep=t=>new Promise(r=>setTimeout(r,t));const shot=(p,o)=>p.screenshot(Object.assign({timeout:120000},o)).catch(e=>console.log('shot fail',o.path));const race=(pr,ms)=>Promise.race([pr,sleep(ms).then(()=>'TIMEOUT')]);
/* the first-download loader (§35) is tested elsewhere (cdn-play); here it is hidden so a cold browser context does not wait for 100 MB */
async function skipLoader(p){for(let i=0;i<240;i++){const s=await p.evaluate(()=>!!document.getElementById('title')&&typeof render==='function').catch(()=>false);if(s)return;await sleep(500)}}
const HIDELOAD=()=>{const f=()=>{const st=document.createElement('style');st.textContent='#kload{display:none!important}';document.head.appendChild(st)};if(document.head)f();else document.addEventListener('DOMContentLoaded',f)};
const scan=`(()=>{const bad=[];const sel='#panel,#modal,.kmov,#hud,#hud2,#tabs';document.querySelectorAll(sel).forEach(r=>{if(!r.offsetParent&&getComputedStyle(r).position!=='fixed')return;[...r.querySelectorAll('*')].slice(0,2500).forEach(e=>{if(!e.childNodes.length||![...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))return;const q=e.getBoundingClientRect();if(!q.width||q.bottom<0||q.top>innerHeight)return;
  const cs=getComputedStyle(e);if((cs.overflow==='hidden'||cs.textOverflow==='ellipsis')&&(e.scrollWidth>e.clientWidth+1||e.scrollHeight>e.clientHeight+2)&&[...e.childNodes].some(n=>n.nodeType===3&&n.textContent.trim()))bad.push('clip '+e.className+': '+e.textContent.trim().slice(0,40))})});
  const ov=document.documentElement.scrollWidth>innerWidth+1;const imgs=[...document.querySelectorAll('img')].filter(i=>i.offsetParent&&i.complete&&i.naturalWidth===0&&i.getAttribute('src')).map(i=>i.getAttribute('src').slice(-50));
  return{ov,bad:bad.slice(0,8),broken:imgs.slice(0,8),panels:document.querySelectorAll('#panel').length}})()`;
/* the open reward overlay: title, from, tiles {rib,name,top,left,w}, the ribbon sits on the frame's top edge */
const rew=`(()=>{const o=document.getElementById('kmrew');if(!o)return null;const r=o.querySelector('.kmrew');const h=o.querySelector('.kmrew-h');
  const T=[...o.querySelectorAll('.kmtile')].map(t=>{const f=t.querySelector('.kmtf').getBoundingClientRect(),rb=t.querySelector('.kmrib'),n=t.querySelector('.kmtn').getBoundingClientRect();const b=rb?rb.getBoundingClientRect():null;
   return{rib:rb?rb.textContent:'',name:t.querySelector('.kmtn').textContent,ft:Math.round(f.top),fl:Math.round(f.left),fw:Math.round(f.width),ribMid:b?Math.round(b.top+b.height/2-f.top):null,nameBelow:Math.round(n.top-f.bottom),inView:f.top>=0&&n.bottom<=innerHeight&&f.left>=0&&f.right<=innerWidth}});
  const white=[...o.querySelectorAll('.kmlist,.kmtiles')].some(e=>{const c=getComputedStyle(e).backgroundColor;return /255, 25[0-5], 2[45]\\d/.test(c)});
  return{cls:r?r.className:'',title:h?h.innerText.replace(/\\n/g,' | '):'',tiles:T,white,take:!!o.querySelector('[data-km-close]')}})()`;
async function openReward(p,name,shots){/* wait for a reward, tap to open, wait for step 3, shoot, take */
 const ok=await p.waitForFunction(()=>!!document.getElementById('kmrew'),null,{timeout:8000}).then(()=>1).catch(()=>0);if(!ok)return null;await sleep(700);
 if(shots)await shot(p,{path:`${OUT}/${name}-dong.jpg`,type:'jpeg',quality:80});
 await p.evaluate(()=>{const o=document.getElementById('kmrew');o&&o.querySelector('.kmbox').dispatchEvent(new MouseEvent('click',{bubbles:true}))});
 await p.waitForFunction(()=>{const o=document.querySelector('#kmrew .kmrew');return o&&o.classList.contains('km-done')},null,{timeout:8000}).catch(()=>{});await sleep(600);
 const r=await p.evaluate(rew);r.scan=await p.evaluate(scan);if(shots)await shot(p,{path:`${OUT}/${name}-mo.jpg`,type:'jpeg',quality:80});
 await p.evaluate(()=>{const b=document.querySelector('#kmrew [data-km-close]');b&&b.click()});await p.waitForFunction(()=>!document.getElementById('kmrew'),null,{timeout:5000}).catch(()=>{});await sleep(300);return r}
const clr=p=>p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;try{showModal()}catch(e){}});
(async()=>{const b=await chromium.launch();const R={};
 for(const [W,H,D] of VPS){const tag=`${W}x${H}`;const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,hasTouch:true,isMobile:W<1100});
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|favicon/.test(m.text()))errs.push('console: '+m.text())});
  const r=R[tag]={};await ctx.addInitScript(HIDELOAD);const one=W===755||W===844;
  if(OLD)await ctx.addInitScript(d=>{if(!localStorage.getItem('__oldIn')){localStorage.setItem('hclh-save-v2-2',d);localStorage.setItem('__oldIn','1')}},fs.readFileSync(OLD,'utf8'));
  await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});await skipLoader(p);await sleep(2500);
  console.log(tag,'step 1',Date.now()%1e6);/* 1. OLD save (made with main): loads, no chest for the past */
  if(OLD){r.old=await p.evaluate(()=>{try{SLOT=2;document.getElementById('title').hidden=true;loadSlot(2);render();return{name:S.name,rank:S.rank,inv:S.inv.length}}catch(e){return{err:e.message}}});
   await sleep(3500);r.old.reward=await p.evaluate(()=>!!document.getElementById('kmrew')||document.querySelectorAll('.kmov').length);await clr(p);
   /* sang buổi once: still no chest for the past */
   await p.evaluate(()=>{try{nextBuoi();render()}catch(e){window.__e=e.message}});await sleep(2500);r.old.rewardAfterBuoi=await p.evaluate(()=>[...document.querySelectorAll('.kmrew-h')].map(e=>e.innerText));await clr(p);
   r.oldTabs={};for(const t of ['act','go','rv','rel','kid','inv','art','story','log']){const ok=await p.evaluate(t=>{const b=[...document.querySelectorAll(`[data-tab="${t}"]`)].find(x=>x.offsetParent);if(b){b.click();return 1}return 0},t);if(!ok)continue;await sleep(700);r.oldTabs[t]=await race(p.evaluate(scan),60000)}
   await shot(p,{path:`${OUT}/${tag}-0-socu-tutrang.jpg`,type:'jpeg',quality:80})}
  console.log(tag,'step 2',Date.now()%1e6);/* 2. NEW game, real flow: title → Luân hồi card → Nhận thân phận; origin tt (Mẫu thân + Phụ thân → 2 hộp gấm, then Phẩm phục nhập cung) */
  await p.evaluate(()=>{window.__forceOrigin='tt';SLOT=1;try{store.set(NL_KEY,null)}catch(e){}Q.length=0;document.getElementById('title').hidden=true;start()});
  await sleep(1500);if(one)await shot(p,{path:`${OUT}/${tag}-1-luan-hoi.jpg`,type:'jpeg',quality:80});for(let i=0;i<120;i++){const k=await p.evaluate(()=>{const b=document.querySelector('#kroul .krskip');if(b){b.click();return 'skip'}if(document.querySelector('#kroul,#kroulw'))return 'wait';const ok=document.querySelector('#modal [data-nl="ok"]');return ok&&ok.offsetParent?'card':'none'});if(k==='card')break;await sleep(700)}await sleep(800);
  r.cardUp=await p.evaluate(()=>{const m=document.getElementById('modal');return{card:!!(m&&!m.hidden&&/Thân phận kiếp này/.test(m.innerText)),rewardOverCard:!!document.getElementById('kmrew')}});
  if(one)await shot(p,{path:`${OUT}/${tag}-1-than-phan.jpg`,type:'jpeg',quality:80});
  await p.evaluate(()=>{const b=document.querySelector('#modal [data-nl="ok"]');b&&b.click()});await sleep(800);
  r.entry=[];for(let i=0;i<4;i++){const x=await openReward(p,`${tag}-2-nhap-cung-${i}`,true);if(!x)break;r.entry.push(x)}
  r.inv0=await p.evaluate(()=>S.inv.map(e=>(e.giver||e.from||'')+':'+e.k));r.wd0=await p.evaluate(()=>{try{const w=wdOf(S);return[w.y&&w.y.k,w.tram&&w.tram.k]}catch(e){return e.message}});
  console.log(tag,'step 3',Date.now()%1e6);/* 3. promotion: the new rank's set in the chest */
  await clr(p);await p.evaluate(()=>{S.rank=Math.min(7,S.rank+1);render()});r.promo=await openReward(p,`${tag}-3-thang-pham`,true);
  console.log(tag,'step 4',Date.now()%1e6);/* 4. BUY: no box, tile flies into Tư trang, ×N badge, coins out of Bạc */
  await clr(p);await p.evaluate(()=>{S.bac=200;render();buy(S,'nhansam');buy(S,'nhansam');render()});await sleep(350);
  r.buy=await p.evaluate(()=>({fly:document.querySelectorAll('.kmfly').length,badge:(document.querySelector('[data-tab="inv"] .kmbadge')||{}).textContent||'',coin:(document.querySelector('.kmcoinlab')||{}).textContent||'',box:!!document.getElementById('kmrew')}));
  await shot(p,{path:`${OUT}/${tag}-4-mua.jpg`,type:'jpeg',quality:80});await sleep(1800);
  console.log(tag,'step 5',Date.now()%1e6);/* 5. SELL: tile to the eunuch's tray, coins +N into Bạc */
  await p.evaluate(()=>{const i=S.inv.findIndex(e=>e.k==='nhansam');sellItem(S,i);render()});await sleep(350);
  r.sell=await p.evaluate(()=>({fly:document.querySelectorAll('.kmfly').length,coin:(document.querySelector('.kmcoinlab')||{}).textContent||'',box:!!document.getElementById('kmrew'),note:(document.querySelector('.kmnote')||{}).textContent||''}));
  await shot(p,{path:`${OUT}/${tag}-5-ban.jpg`,type:'jpeg',quality:80});await sleep(1800);
  console.log(tag,'step 6',Date.now()%1e6);/* 6. FOUND: túi gấm */
  await p.evaluate(()=>{S.inv.push({k:'tuithom',from:'found'});render()});r.found=await openReward(p,`${tag}-6-nhat`,true);
  console.log(tag,'step 7',Date.now()%1e6);/* 7. a consort's gift: hộp gấm with her name */
  await p.evaluate(()=>{const v=liveRivals(true)[0];S.inv.push({k:'tramngoc',from:v.id});S.inv.push({k:'huongtram',from:v.id});render()});r.gift=await openReward(p,`${tag}-7-tang`,one);
  console.log(tag,'step 8',Date.now()%1e6);/* 8. LOST: fades + one line */
  await p.evaluate(()=>{const i=S.inv.findIndex(e=>e.k==='tuithom');S.inv.splice(i,1);render()});await sleep(400);r.lost=await p.evaluate(()=>(document.querySelector('.kmnote')||{}).textContent||'');
  if(one)await shot(p,{path:`${OUT}/${tag}-8-mat.jpg`,type:'jpeg',quality:80});await sleep(2000);
  console.log(tag,'step 9',Date.now()%1e6);/* 9. DEMOTION: a Nội vụ phủ eunuch takes what is above her new rank */
  await clr(p);await p.evaluate(()=>{S.rank=Math.min(7,S.rank+2);render()});await openReward(p,`${tag}-9a`,false);
  r.beforeDem=await p.evaluate(()=>({rank:S.rank,inv:S.inv.length,wd:(()=>{const w=wdOf(S);return[w.y&&w.y.k,w.tram&&w.tram.k]})()}));
  await clr(p);await p.evaluate(()=>{demote(S,'phạm lỗi');render()});await sleep(1200);
  r.conf=await p.evaluate(()=>{const m=document.getElementById('modal');return{open:!!(m&&!m.hidden),text:m&&!m.hidden?m.innerText.slice(0,400):'',tiles:document.querySelectorAll('#modal .kmconf').length,who:!!document.querySelector('#modal img')}});
  r.conf.scan=await p.evaluate(scan);await sleep(2500);await shot(p,{path:`${OUT}/${tag}-9-thu-hoi.jpg`,type:'jpeg',quality:80});
  r.afterDem=await p.evaluate(()=>({rank:S.rank,inv:S.inv.length,wd:(()=>{const w=wdOf(S);return[w.y&&w.y.k,w.tram&&w.tram.k]})()}));
  console.log(tag,'step 10',Date.now()%1e6);/* 10. tabs on the new life */
  await clr(p);r.tabs={};for(const t of ['act','go','rv','rel','kid','inv','art','story','log']){const ok=await race(p.evaluate(t=>{const b=[...document.querySelectorAll(`[data-tab="${t}"]`)].find(x=>x.offsetParent);if(b){b.click();return 1}return 0},t),60000);console.log(tag,'tab',t,ok);if(!ok)continue;await sleep(700);r.tabs[t]=await race(p.evaluate(scan),60000);if(r.tabs[t]==='TIMEOUT'){const cdp=await ctx.newCDPSession(p);await cdp.send('Debugger.enable');const pr=new Promise(res=>cdp.once('Debugger.paused',res));await cdp.send('Debugger.pause');const ev=await race(pr,30000);console.log(tag,'STUCK in',t,JSON.stringify(ev&&ev.callFrames?ev.callFrames.slice(0,12).map(f=>f.functionName+'@'+f.location.lineNumber+':'+f.location.columnNumber):ev));break}}
  console.log(tag,'step 11',Date.now()%1e6);/* 11. save/load: nothing re-shown */
  r.reload=await p.evaluate(()=>{save();loadSlot(SLOT);render();return 1});await sleep(2500);r.reloadReward=await p.evaluate(()=>!!document.getElementById('kmrew'));
  r.errs=errs;await ctx.close();console.log(tag,JSON.stringify(r).slice(0,6000))}
 fs.writeFileSync(`${OUT}/report.json`,JSON.stringify(R,null,1));await b.close()})();
