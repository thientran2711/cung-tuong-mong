/* review/hc-portrait-revert-r1: aspect of EVERY img.kfr (all places) in Tuần lục pages, stage pop-up card, modal dialogs, kit page. usage: node dev/test/hc-revert2.js <url> <WxH> <outdir> */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs');
const [,,BASE,SZ,OUT]=process.argv;const [W,H]=SZ.split('x').map(Number);fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,reducedMotion:'reduce'});
await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
 const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));const reqs=[];p.on('request',r=>{if(/frame-[a-z0-9-]+-w\.webp/.test(r.url()))reqs.push(r.url())});
 await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await p.waitForTimeout(2000);
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
  Q.length=0;for(let i=0;i<3;i++){try{nextBuoi()}catch(e){}Q.length=0}kn();for(const v of rivals){S.met[v.id]=1};try{for(const v of rivals)k61Meet(v,"gặp",3)}catch(e){};Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}document.body.classList.remove('kbk-open');try{render()}catch(e){}});
await p.waitForTimeout(1500);const scan=()=>p.evaluate(()=>{const AR=550/1037;const o={};for(const i of document.querySelectorAll('img.kfr')){const r=i.getBoundingClientRect();if(!r.height||!i.getClientRects().length)continue;const k=(i.closest('#dawn')?'book':i.closest('#modal')?'modal':i.closest('#stage')?'stage':i.closest('#panel')?'panel':i.closest('header')?'header':'other');(o[k]=o[k]||[]).push(+(r.width/r.height/AR).toFixed(3))}return o});
 const out={};
 out.panel0=await scan();
 // Tuần lục
 await p.evaluate(()=>{document.getElementById('modal').hidden=true;document.querySelectorAll('.kroul').forEach(e=>e.remove());try{const w=document.getElementById('dawn')||document.body.appendChild(Object.assign(document.createElement('div'),{id:'dawn',className:'dawn kbkdawn on'}));w.hidden=false;w.className='dawn kbkdawn on';document.body.classList.add('kbk-open');const bb=wkBookPages();window.__kbk=kitBook({pages:bb.pages,head:bb.head,host:w,label:'Tuần lục',onClose(){}})}catch(e){console.error(e)}});await p.waitForTimeout(1500);
 for(let i=0;i<14;i++){const s=await scan();out['book'+i]=s.book||null;await p.screenshot({path:`${OUT}/book${i}.jpg`,type:'jpeg',quality:40});const n=await p.$('.kbk-next');if(!n)break;try{await n.click({timeout:2000})}catch(e){break};await p.waitForTimeout(500)}
 await p.evaluate(()=>{try{__kbk&&__kbk.close&&__kbk.close()}catch(e){};const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML=''}document.body.classList.remove('kbk-open')});
 // pframe/pcard in dialogs: render modal with pcard of a stranger + rival
 out.dlg=await p.evaluate(()=>{const AR=550/1037;const h=document.createElement('div');h.id='tst';h.style.cssText='position:fixed;left:0;top:0;width:100%;z-index:99999;background:#fff;display:flex;gap:8px';h.innerHTML=[rivals[0],S.emp,S.maid].filter(Boolean).map(q=>'<div style="width:200px">'+pcard({f:kitFace(q),name:q.name||'',col:'var(--gold)',groups:[]})+'</div>').join('')+(typeof pframe==='function'?'<div style="width:120px">'+pframe(kitFace(rivals[0]))+'</div>':'');document.body.appendChild(h);return [...h.querySelectorAll('img.kfr')].map(i=>{const r=i.getBoundingClientRect();return r.height?+(r.width/r.height/AR).toFixed(3):0})});
 await p.waitForTimeout(800);await p.screenshot({path:`${OUT}/dlg.jpg`,type:'jpeg',quality:50});
 console.log(JSON.stringify({SZ,out,wReqs:reqs,errs}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
