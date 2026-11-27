/* j99succ kế vị (review/succession-port): Playwright check at one or more viewports.
   usage: node dev/test/succession.js <URL of built page> <outdir> [WxH ...] [--path a|b|c|none|all]
   Scenes per size: the choice card for each path (kit act-card rows Cần/Tốn/Được/Mất/Kèm, disabled reasons, header picture
   Tiên đế băng hà = kit 31.16 headArt band), play each epilogue to its ending (end card says "Kết cục" for living endings),
   save + reload mid-epilogue keeps the chapter (path b), an old save without S.succ loads and a turn passes, Sổ luân hồi
   shows "Kết cục kế vị" (kit rows). FAIL on page errors, horizontal overflow, cut/outside text, '%', '…'. */
const {chromium}=require('playwright');const fs=require('fs');
const args=process.argv.slice(2);const pi=args.indexOf('--path');const ONLY=pi>=0?args.splice(pi,2)[1]:'all';
const [BASE,OUT,...SZ]=args;fs.mkdirSync(OUT,{recursive:true});const SIZES=SZ.length?SZ:['755x1000','1180x820'];
const sleep=t=>new Promise(r=>setTimeout(r,t));
async function run(b,SZx){const [W,H]=SZx.split('x').map(Number);const tag=SZx;
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,serviceWorkers:'block',reducedMotion:'reduce'});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 p.on('console',m=>{if(m.type()==='error'&&!/Failed to load resource|net::ERR/.test(m.text()))errs.push('console: '+m.text().slice(0,200))});
 const res=[];
 const check=name=>p.evaluate(name=>{const M=document.getElementById('modal');const vw=innerWidth;const bad=[];
  if(!M||M.hidden)return{name,modal:false};
  M.querySelectorAll('.kptitle,.ka,.ka *,.kpb p').forEach(e=>{const q=e.getBoundingClientRect();if(!q.width)return;if(q.left<-1||q.right>vw+1)bad.push('out:'+(e.className||e.tagName)+':'+e.textContent.slice(0,24)+':'+Math.round(q.left)+'-'+Math.round(q.right)+'/'+vw);
   const cs=getComputedStyle(e);if(e.scrollWidth>e.clientWidth+1&&cs.overflow!=='visible'&&cs.overflowX!=='visible'&&!/kpth|ksart|img/i.test(e.className+e.tagName))bad.push('clip:'+(e.className||e.tagName)+':'+e.textContent.slice(0,24))});
  const opts=[...M.querySelectorAll('button[data-m]')].map(o=>({t:(o.querySelector('.kan')||o).textContent.trim().slice(0,50),dis:o.disabled,rows:[...o.querySelectorAll('.krl')].map(x=>x.textContent.trim()),odds:(o.querySelector('.kodds')||{}).textContent||'',rare:o.classList.contains('ksel')}));
  const art=M.querySelector('.kdlgart img');const ar=art&&art.getBoundingClientRect();
  const txt=M.innerText;return{name,modal:true,title:((M.querySelector('.kptitle')||document.getElementById('mt'))||{}).textContent,overflowX:document.documentElement.scrollWidth>vw+1,bad,opts,
   head:art?{src:art.getAttribute('src').replace(/^.*\/img\//,'img/'),w:Math.round(ar.width),h:Math.round(ar.height),ok:art.complete&&art.naturalWidth>0}:null,
   pct:/%/.test(txt),ell:/…/.test(txt),endLab:((Q[0]&&Q[0].h||'').match(/Kết cục|Chết vì/)||[''])[0]}},name);
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof succDebug==='function');await sleep(2500);
 const fresh=async()=>{await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();SLOT=3;document.getElementById('title').hidden=true;start()});
  await p.waitForFunction(()=>typeof S!=="undefined"&&S&&S.name,null,{timeout:90000});await sleep(1500);
  await p.addStyleTag({content:'#kroul,#kroulw{display:none!important}'});
  await p.evaluate(()=>{document.querySelectorAll('#kroul,#kroulw').forEach(e=>e.remove());try{if(typeof nlAccept==='function')nlAccept(false)}catch(e){}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()});await sleep(600)};
 const choose=async i=>{await p.evaluate(i=>chooseM(i),i);await sleep(500)};
 const paths=ONLY!=='all'?[ONLY]:['a','b','c','none'];
 for(const P of paths){await fresh();
  await p.evaluate(P=>succDebug(P==='none'?'':P,1),P);await sleep(800);await p.evaluate(()=>{document.querySelectorAll('.kmedict').forEach(e=>e.remove());Q.length=0;document.getElementById('modal').hidden=true});
  await sleep(2000);await p.evaluate(()=>document.querySelectorAll('.kmov,.kmnote').forEach(e=>e.remove()));
  await p.evaluate(P=>succDebug(P==='none'?'':P),P);await sleep(1500);await p.evaluate(()=>document.querySelectorAll('.kmov,.kmnote').forEach(e=>e.remove()));
  await p.waitForFunction(()=>{const i=document.querySelector('#modal .kdlgart img');return !i||(i.complete&&i.naturalWidth>0)},null,{timeout:30000}).catch(()=>{});await sleep(800);
  await p.screenshot({path:`${OUT}/card-${P}-${tag}.jpg`,quality:60});const c=await check('card-'+P);res.push(c);
  if(P==='none')continue;
  const idx={a:0,b:1,c:2}[P];await p.evaluate(()=>{window.__r0=Math.random;Math.random=()=>0.01});await choose(idx);await p.evaluate(()=>{const m=Q[0];const i=m&&m.opts?m.opts.findIndex(o=>/^Vẫn chọn/.test(o.n||'')):-1;if(i>=0)chooseM(i)});await sleep(500);await p.evaluate(()=>{Math.random=window.__r0});
  for(let ch=0;ch<3;ch++){const r=await check(`ch${ch+1}-${P}`);res.push(r);await p.evaluate(()=>document.querySelectorAll('.kmov,.kmnote').forEach(e=>e.remove()));if(ch===0)await p.screenshot({path:`${OUT}/ch${ch+1}-${P}-${tag}.jpg`,quality:60});
   if(ch===1&&P==='b'){await p.evaluate(()=>save());await p.reload({waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof deser==='function');await sleep(2500);
    await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();const d=loadSlot(3);deser(d);SLOT=3;document.getElementById('title').hidden=true;showModal();render()});await sleep(1000);
    res.push(Object.assign(await check('reload-b'),{succ:await p.evaluate(()=>S.succ&&{p:S.succ.p,ch:S.succ.ch,on:S.succ.on})}))}
   await p.evaluate(()=>{const m=Q[0];const i=m.opts.findIndex(o=>!(o.need||[]).some(n=>!n.ok)&&!o.rare);chooseM(i)});await sleep(600)}
  const end=await p.evaluate(()=>({dead:S.dead,fate:S.fate,kiep:(store.get('cung-luanhoi')||[])[0],book:localStorage.getItem('ctm-succ-book')}));
  await sleep(1500);await p.evaluate(()=>document.querySelectorAll('.kmov,.kmnote').forEach(e=>e.remove()));res.push(Object.assign(await check('end-'+P),{end}));await p.screenshot({path:`${OUT}/end-${P}-${tag}.jpg`,quality:60});
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true})}
 /* forced roll failures: b fails → path a; c fails → Mưu nghịch bất thành (dies) */
 if(ONLY==='all')for(const P of ['b','c']){await fresh();await p.evaluate(P=>{succDebug(P,1);Q.length=0;document.getElementById('modal').hidden=true;succDebug(P)},P);await sleep(1500);
  await p.evaluate(()=>{window.__r0=Math.random;Math.random=()=>0.999});await choose(P==='b'?1:2);await p.evaluate(()=>{const m=Q[0];const i=m&&m.opts?m.opts.findIndex(o=>/^Vẫn chọn/.test(o.n||'')):-1;if(i>=0)chooseM(i)});await sleep(500);await p.evaluate(()=>{Math.random=window.__r0});
  res.push({name:'fail-'+P,st:await p.evaluate(()=>({dead:S.dead,fate:S.fate,p:S.succ&&S.succ.p,title:Q[0]&&Q[0].t}))})}
 /* old save (no S.succ) loads and a turn passes */
 await fresh();const old=await p.evaluate(()=>{save();const d=JSON.parse((window.slotGet?slotGet(SK(3)):localStorage.getItem(SK(3))));delete d.S.succ;localStorage.setItem(SK(3),JSON.stringify(d));deser(loadSlot(3));render();try{endTurn()}catch(e){return 'err '+e.message}return {ok:true,turn:S.turn,dead:S.dead,succ:S.succ===undefined?'none':'set'}});
 res.push({name:'old-save',old});
 const book=await p.evaluate(()=>{const h=pastHTML();return {has:/Kết cục kế vị/.test(h)}});res.push({name:'book',book});
 await ctx.close();return {tag,errs,res}}
(async()=>{const b=await chromium.launch();const ALL=[];for(const s of SIZES){try{ALL.push(await run(b,s))}catch(e){ALL.push({tag:s,fatal:e.message.slice(0,300)})}}
 await b.close();fs.writeFileSync(OUT+'/succession.json',JSON.stringify(ALL,null,1));
 const fails=[];for(const A of ALL){if(A.fatal){fails.push(A.tag+' fatal '+A.fatal);continue}if(A.errs.length)fails.push(A.tag+' errs '+A.errs.join(' | '));
  for(const r of A.res){if(r.overflowX)fails.push(A.tag+' '+r.name+' overflowX');if(r.bad&&r.bad.length)fails.push(A.tag+' '+r.name+' '+r.bad.slice(0,3).join(','));if(r.pct)fails.push(A.tag+' '+r.name+' %');if(r.ell)fails.push(A.tag+' '+r.name+' …');
   if(/^card-[abc]/.test(r.name)&&!(r.head&&r.head.ok))fails.push(A.tag+' '+r.name+' no header picture');if(r.modal===false)fails.push(A.tag+' '+r.name+' no modal');
   if(/^end-/.test(r.name)&&r.end&&r.endLab!==(/ban chết|bị phế/.test(r.end.fate||'')?'Chết vì':'Kết cục'))fails.push(A.tag+' '+r.name+' end label '+r.endLab);if(r.name==='old-save'&&!(r.old&&r.old.ok))fails.push(A.tag+' old save');if(r.name==='book'&&!r.book.has)fails.push(A.tag+' book line missing')}}
 console.log(JSON.stringify(ALL.map(A=>({tag:A.tag,fatal:A.fatal,errs:A.errs,res:(A.res||[]).map(r=>({n:r.name,t:r.title,head:r.head,opts:r.opts&&r.opts.map(o=>o.t+(o.dis?' [dis]':'')+(o.rare?' [rare]':'')+' {'+o.rows.join('/')+'} '+o.odds),end:r.end&&{fate:r.end.fate,dead:r.end.dead},lab:r.endLab,succ:r.succ,st:r.st,old:r.old,book:r.book}))})),null,1));
 console.log(fails.length?'FAIL\n'+fails.join('\n'):'PASS')})();
