// review/luxury (D17) screenshots: node dev/test/luxury-shots.js <index.html> <outdir> [WxH,WxH…]
// 1 Hành sự with "Thỉnh an Thái hậu" when she is dressed too lavishly for a frugal Thái hậu (card Kèm line names Xa xỉ + Đức)
// 2 Hội phối đồ: báo đề (row Xa xỉ range) · 3 the dress board (header "Xa xỉ N") · 4 Ý chỉ tiết kiệm event card
const {chromium}=require('playwright');const fs=require('fs');
const [,,GAME,OUT,SZ]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch({args:['--disable-dev-shm-usage','--disable-gpu']});const errs=[];
 for(const s of (SZ||'755x1000,1180x820').split(',')){const [w,h]=s.split('x').map(Number);const pg=await b.newPage({viewport:{width:w,height:h}});pg.on('pageerror',e=>errs.push(s+' '+e.message.slice(0,160)));
  await pg.goto('file://'+GAME,{waitUntil:'domcontentloaded'});await pg.waitForTimeout(800);await pg.evaluate(()=>localStorage.clear());await pg.reload({waitUntil:'domcontentloaded'});
  for(let i=0;i<200;i++){const ok=await pg.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return false}return typeof start==='function'&&!document.getElementById('kload')});if(ok)break;await pg.waitForTimeout(300)}
  await pg.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;S.buoi=0;S.month=5;S.tuan=1;
   const lo=luxOf;luxOf=p=>{const x=lo(p);return p===S?Object.assign({},x,{sc:Math.round(x.bud*.95),lv:1}):x};leHostKind=h=>h==="th"?"frugal":"normal";S.toilSeen=null;deal();render()});
  await pg.waitForTimeout(1500);
  for(let k=0;k<6;k++){const t=pg.getByText('Chạm để bỏ qua');if(await t.count()){await t.first().click({force:true}).catch(()=>{});await pg.waitForTimeout(700)}else break}
  await pg.evaluate(()=>{document.querySelectorAll('.kmhint').forEach(h=>{const o=h.parentElement;if(o&&o!==document.body)o.remove()});deal();render()});await pg.waitForTimeout(800);
  const card=await pg.evaluate(()=>{const i=deck.findIndex(a=>/^Thỉnh an Thái hậu/.test(a.n));const el=document.querySelector(`.kcard[data-i="${i}"]`);if(el)el.scrollIntoView({block:'center'});return el?el.innerText.replace(/\s+/g,' ').slice(0,400):'(no card) '+(deck[i]?deck[i].risk:'')});
  /* the deck card as the kit draws it (cardH), in a plain sheet on top (the live pane is behind the home scene at this size) */
  const rc=await pg.evaluate(()=>{const i=deck.findIndex(a=>/^Thỉnh an Thái hậu/.test(a.n));if(i<0)return null;const w=document.createElement('div');w.id='lxsheet';
   w.style.cssText='position:fixed;inset:0;z-index:2147483000;background:var(--paper,#f7efe0);padding:16px;overflow:auto';w.innerHTML=`<div class="cards" style="max-width:520px">${cardH(deck[i],i)}</div>`;document.body.appendChild(w);
   try{if(typeof kaNorm==="function")kaNorm(w)}catch(e){}const r=w.querySelector('.kcard').getBoundingClientRect();return{x:Math.max(0,r.x-6),y:Math.max(0,r.y-6),width:r.width+12,height:r.height+12}});
  if(rc)await pg.screenshot({path:`${OUT}/1-thinhan-${s}.jpg`,type:'jpeg',quality:70,clip:rc});else console.log('no card');
  await pg.evaluate(()=>{const w=document.getElementById('lxsheet');if(w)w.remove()});
  await pg.evaluate(()=>{const m=document.getElementById('modal');if(m)m.hidden=true});
  await pg.evaluate(()=>{Q.length=0;tsDressAnnounce();render()});await pg.waitForTimeout(1500);
  const ann=await pg.evaluate(()=>(document.getElementById('modal')||{}).innerText||'');await pg.evaluate(()=>document.querySelectorAll('.kmhint').forEach(h=>{const o=h.parentElement;if(o&&o!==document.body)o.remove()}));await pg.screenshot({path:`${OUT}/2-announce-${s}.jpg`,type:'jpeg',quality:60});
  await pg.evaluate(()=>{const m=document.getElementById('modal');if(m)m.hidden=true;Q.length=0;["vongngoc","tuithom","luahang","vongvang"].forEach(k=>S.inv.push({k}));tsDressGame("thanh",()=>{})});await pg.waitForTimeout(1500);
  await pg.evaluate(()=>{const b=document.querySelector('[data-tsi]');if(b)b.click()});await pg.waitForTimeout(500);await pg.evaluate(()=>{const b=document.querySelector('[data-tsact="on"]');if(b)b.click()});await pg.waitForTimeout(500);
  const board=await pg.evaluate(()=>{const d=document.getElementById('kg82');return d?d.innerText.replace(/\s+/g,' ').slice(0,300):''});await pg.evaluate(()=>document.querySelectorAll('.kmhint').forEach(h=>{const o=h.parentElement;if(o&&o!==document.body)o.remove()}));await pg.screenshot({path:`${OUT}/3-board-${s}.jpg`,type:'jpeg',quality:60});
  await pg.evaluate(()=>{try{kg82Close()}catch(e){}Q.length=0;const C=[S].concat(liveRivals(true));C.forEach(p=>p.luxRep=8);S.luxEdict=null;const pp=BAL.lux.edictP;BAL.lux.edictP=100;luxEdictTry();BAL.lux.edictP=pp;render()});await pg.waitForTimeout(1500);
  const ed=await pg.evaluate(()=>(document.getElementById('modal')||{}).innerText||'');await pg.evaluate(()=>document.querySelectorAll('.kmhint').forEach(h=>{const o=h.parentElement;if(o&&o!==document.body)o.remove()}));await pg.screenshot({path:`${OUT}/4-edict-${s}.jpg`,type:'jpeg',quality:60});
  console.log(s,JSON.stringify({card,ann:ann.replace(/\s+/g,' ').slice(0,500),board,ed:ed.replace(/\s+/g,' ').slice(0,400)}));await pg.close()}
 console.log(errs.length?'PAGE ERRORS '+errs.join(' | '):'no page errors');await b.close()})();
