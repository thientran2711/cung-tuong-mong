/* review/title-stale-sel — the title home menu + Chọn sổ screen still carry every hook the rest of the game looks for.
   Opens the ☰ title with a live kiếp, asserts: "Xem lại lời dặn" (jtut addReplay, [data-ktut-replay]) shows as a kit .kbtn.alt, the home
   hooks (data-tgo slots/past/opt, jcooplobby .kco, jrank [data-krk-open]), then Chọn sổ: #slots .kslot rows, [data-load], [data-new],
   [data-kcs]; and slotWho names the kc / kd lives (the old #slots .slot text patches are gone).
   usage: node dev/test/title-stale-sel.js <index.html path> <shot dir> [WxH@dpr,…]   (default 755x1000@2,1180x820@2). Exit 1 on a failed check. */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');const path=require('path');const https=require('https');
const [,,FILE,OUT,SIZES]=process.argv;const CLR="document.querySelectorAll('#klife,#kroul,#kroulw').forEach(e=>e.remove())";fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));const LIVE='https://thientran2711.github.io/cung-tuong-mong/';const cache=new Map();
const live=p=>cache.has(p)?Promise.resolve(cache.get(p)):new Promise(res=>https.get(LIVE+p,r=>{const c=[];r.on('data',d=>c.push(d));r.on('end',()=>{const v={status:r.statusCode,body:Buffer.concat(c),ct:r.headers['content-type']||''};cache.set(p,v);res(v)})}).on('error',()=>res({status:404,body:Buffer.alloc(0),ct:''})));
let fails=0;const ck=(ok,msg)=>{console.log((ok?'PASS ':'FAIL ')+msg);if(!ok)fails++};
(async()=>{const b=await chromium.launch();
 for(const sz of (SIZES||'755x1000@2,1180x820@2').split(',')){const [wh,dpr]=sz.split('@');const [W,H]=wh.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.route('**/*',async rt=>{const u=new URL(rt.request().url());const m=u.pathname.match(/\/((?:img|audio|icons)\/.*)$/);
   if(u.hostname==='localhost'&&/\/index\.html$/.test(u.pathname))return rt.fulfill({status:200,body:fs.readFileSync(path.resolve(FILE)),contentType:'text/html; charset=utf-8'});
   if(u.hostname==='localhost'&&m){const v=await live(m[1]);return rt.fulfill({status:v.status,body:v.body,contentType:v.ct})}
   return rt.continue()});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto('http://localhost/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function'&&typeof showTitle==='function');await sleep(2500);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  for(let i=0;i<40;i++){await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:90000});if(!(await p.evaluate(()=>typeof isSrv==='function'&&isSrv())))break;await p.evaluate(()=>{S=null;try{nlNew()}catch(e){}start()})}
  await p.evaluate(()=>{Q.length=0;const md=document.getElementById('modal');md.hidden=true;md.className='modal';try{quiet=false}catch(e){}try{localStorage.setItem(SK(SLOT),JSON.stringify(ser()))}catch(e){console.error(e)}});
  await sleep(1500);await p.evaluate(()=>{document.querySelectorAll('#klife,#kroul,#kroulw').forEach(e=>e.remove());try{OPT.tut=false;T.pend={};T.tip&&tipOff()}catch(e){}try{NLP=null}catch(e){}});/* the new-life cover would hide the menu in the shot */
  console.log('save dbg',await p.evaluate(()=>({quiet:typeof quiet!=='undefined'?quiet:'n/a',slot:SLOT,keys:Object.keys(localStorage).filter(k=>/save/.test(k)),ld:!!loadSlot(3)})));
  /* the in-game ☰ (title button) opens the title home */
  await p.evaluate(()=>document.getElementById('menu').click());await sleep(1200);
  const home=await p.evaluate(()=>{const m=document.querySelector('#modal.kpthome .kpmenu');if(!m)return null;const q=s=>!!m.querySelector(s);const rb=m.querySelector('.ktutb');const r=rb&&rb.getBoundingClientRect(),mr=m.getBoundingClientRect();
   return{replay:q('[data-ktut-replay]'),kit:!!(rb&&rb.classList.contains('kbtn')&&rb.classList.contains('alt')),slots:q('[data-tgo="slots"]'),past:q('[data-tgo="past"]'),opt:q('[data-tgo="opt"]'),kco:q('.kco'),krk:q('[data-krk-open]'),
    inside:!!(r&&r.left>=mr.left-1&&r.right<=mr.right+1&&r.width>0),vis:!!(rb&&rb.offsetParent),stale:q('[data-tgo="cont"]'),replayN:m.querySelectorAll('.ktutb').length}});
  ck(!!home,`${sz} title home menu opens`);
  if(home){ck(home.replay&&home.replayN===1,`${sz} Xem lại lời dặn shows once (data-ktut-replay)`);ck(home.kit,`${sz} replay is a kit .kbtn.alt`);ck(home.vis&&home.inside,`${sz} replay is visible and inside the menu`);
   ck(home.slots&&home.past&&home.opt,`${sz} home hooks data-tgo slots/past/opt`);ck(home.kco,`${sz} co-op button hook (.kco)`);ck(home.krk,`${sz} rank button hook ([data-krk-open])`);ck(!home.stale,`${sz} no stale data-tgo="cont" is expected any more`)}
  console.log('modal dbg',JSON.stringify(await p.evaluate(()=>{const M=document.getElementById('modal');const d=M.querySelector('.dlg');const r=d&&d.getBoundingClientRect();const cs=getComputedStyle(M);const mid=document.elementFromPoint(innerWidth/2,innerHeight*0.8);return{hidden:M.hidden,cls:M.className,op:cs.opacity,disp:cs.display,vis:cs.visibility,z:cs.zIndex,rect:r&&[r.left,r.top,r.width,r.height].map(Math.round),top:mid&&(mid.id||mid.className||mid.tagName)}})));
  await p.addStyleTag({content:'#kroul,#kroulw,#klife{display:none!important}'});await p.evaluate(CLR);
  const top1=await p.evaluate(()=>{const d=document.querySelector('#modal .dlg');const r=d.getBoundingClientRect();const e=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return !!(e&&e.closest('#modal'))});ck(top1,`${sz} title menu is the top layer (nothing covers it)`);
  await sleep(500);await p.screenshot({path:`${OUT}/title-${wh}.jpg`,type:'jpeg',quality:74,timeout:60000});
  /* the replay button works: it closes the menu back to the game */
  /* Chọn sổ */
  await p.evaluate(()=>document.querySelector('#modal.kpthome [data-tgo="slots"]').click());await sleep(1200);
  const sl=await p.evaluate(()=>{const M=document.querySelector('#modal.kptitle');const q=s=>M?M.querySelectorAll(s).length:0;return{open:!!M&&!!M.querySelector('.kpt-mount[data-pg="slots"]'),kslot:q('#slots .kslot:not(.cloudmini)'),load:q('#slots [data-load]'),nw:q('#slots [data-new]'),kcs:q('#slots [data-kcs]'),old:q('#slots .slot'),pd:!!M&&!!M.querySelector('#pdwrap')}});
  ck(sl.open,`${sz} Chọn sổ opens`);ck(sl.kslot===3,`${sz} ${sl.kslot} .kslot sổ rows (3 expected)`);ck(sl.load>=1,`${sz} [data-load] on the saved sổ (${sl.load})`);ck(sl.nw>=3,`${sz} [data-new] on every sổ (${sl.nw})`);ck(sl.kcs===2,`${sz} [data-kcs] solo/coop tabs`);ck(sl.old===0,`${sz} no old .slot rows`);
  await p.evaluate(CLR);
  const top2=await p.evaluate(()=>{const d=document.querySelector('#modal .dlg');const r=d.getBoundingClientRect();const e=document.elementFromPoint(r.left+r.width/2,r.top+r.height/2);return !!(e&&e.closest('#modal'))});ck(top2,`${sz} Chọn sổ is the top layer (nothing covers it)`);
  await sleep(500);await p.screenshot({path:`${OUT}/slots-${wh}.jpg`,type:'jpeg',quality:74,timeout:60000});
  /* slotWho names the kc / kd lives that the old #slots .slot patches used to relabel */
  const who=await p.evaluate(()=>[CTM_SLOTWHO({rank:0,kc:{inPal:false}}),CTM_SLOTWHO({rank:0,kc:{inPal:false,kd:'dan'}}),CTM_SLOTWHO({rank:0,kc:{inPal:false,kd:'x'}}),CTM_SLOTWHO({rank:0,kc:{inPal:true}})]);
  ck(who[0]==='Tiểu thư ngoài cung'&&who[1]==='Thôn nữ chờ tuyển'&&who[2]==='Công chúa chờ hòa thân'&&who[3]!=='Tiểu thư ngoài cung',`${sz} slotWho kc/kd labels ${JSON.stringify(who)}`);
  ck(errs.length===0,`${sz} no page errors ${errs.join('|')}`);
  await ctx.close()}
 await b.close();console.log(fails?`FAILS ${fails}`:'ALL PASS');process.exit(fails?1:0)})();
