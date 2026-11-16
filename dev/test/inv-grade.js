/* Tư trang: grade ground+frame on item slots, "Đang mang" equipment slots (kitEquipSlots), act-card rows never clipped (all panel tabs).
   usage: node dev/test/inv-grade.js <baseURL> <W>x<H>@dpr <outdir> <tag> [oldsave.json]
   Writes <tag>-inv-grades, inv-eqpick, inv-worn, inv-item, inv-scrolled (+ oldsave-inv). Prints JSON audit. */
const {chromium}=require('./lib/pw-roulette');const fs=require('fs');
const [,,BASE,SZ,OUT,TAG,OLD]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce'});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 fs.mkdirSync(OUT,{recursive:true});
 const shot=async n=>{await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:84,animations:'disabled',timeout:120000})};
 /* overflow / ellipsis + act-card clip check: the bottom-centre point just inside each visible act card must hit the card itself */
 const audit=n=>p.evaluate(n=>{const vw=innerWidth,bad=[];document.querySelectorAll('#panel *, #modal .dlg *').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||e.closest('.kcattabs,.pctabs'))return;
   if(r.right>vw+1||r.left<-1)bad.push('x:'+(e.className||e.tagName));const cs=getComputedStyle(e);if((cs.textOverflow==='ellipsis'||e.classList.contains('kchip')&&cs.overflow!=='visible')&&e.scrollWidth>e.clientWidth+1)bad.push('ell:'+e.className)});
  document.querySelectorAll('.keq').forEach(q=>{if(/\d+ th(?!\p{L})/u.test(q.textContent))bad.push('abbr:th')});document.querySelectorAll('.keq .keqc *').forEach(e=>{if(e.scrollWidth>e.clientWidth+1&&getComputedStyle(e).overflow!=='visible')bad.push('cut:'+e.className)});
  if(/[\u3400-\u9FFF]/.test(document.body.innerText))bad.push('cjk');
  const clip=[];const P=document.getElementById('panel');const pr=P.getBoundingClientRect();
  P.querySelectorAll('button.ka').forEach(c=>{const r=c.getBoundingClientRect();if(!r.height||r.bottom>pr.bottom-2||r.top<pr.top+2)return;
   for(const x of [r.left+r.width/2,r.left+6,r.right-6]){const h=document.elementFromPoint(x,r.bottom-1.5);if(h&&h.closest&&h.closest('#modal'))break;if(!h||!c.contains(h)&&h!==c){clip.push((c.textContent||'').slice(0,18)+'@'+(h&&h.className));break}}});
  const gaps=[...P.querySelectorAll('.kcattabs')].filter(r=>r.offsetParent).map(r=>{const rr=r.getBoundingClientRect();let pv=r.previousElementSibling||(r.parentElement.id!=='panel'?r.parentElement.previousElementSibling:null);while(pv&&!pv.getBoundingClientRect().height)pv=pv.previousElementSibling;
   let nx=r.nextElementSibling;const a=pv?Math.round(rr.top-pv.getBoundingClientRect().bottom):null,b=nx?Math.round(nx.getBoundingClientRect().top-rr.bottom):null;return [a,b,r.classList.contains('kstick')?'stick':'flat',pv&&(pv.tagName+'.'+pv.className).slice(0,40),pv&&getComputedStyle(pv).paddingBottom,pv&&pv.lastElementChild&&Math.round(pv.getBoundingClientRect().bottom-pv.lastElementChild.getBoundingClientRect().bottom)]});
  return{n,ovX:document.documentElement.scrollWidth>vw,bad:[...new Set(bad)].slice(0,6),clip,gaps}},n);
 const A=[];
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(3000);
 if(OLD){const d=fs.readFileSync(OLD,'utf8');const r=await p.evaluate(d=>{try{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);if(!x)return'noload';SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;deal();Q.length=0;showModal();render();return'ok '+S.name+' inv '+S.inv.length}catch(e){return'ERR '+e.message}},d);console.log('oldsave',r);await p.waitForTimeout(1200);
  await p.evaluate(()=>{Q.length=0;showModal();document.querySelector('#tabs [data-tab=inv]').click()});await p.waitForTimeout(1200);await shot('oldsave-inv');A.push(await audit('oldsave'));
  await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(3000)}
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}start()});await p.waitForTimeout(2500);
 await require('./lib/roulette').dismissRoulette(p);
 await p.evaluate(()=>{for(let i=0;i<20&&(S.origin.k==='cnv'||(typeof isSrv==='function'&&isSrv()));i++){try{store.set(NL_KEY,null)}catch(e){}start()}const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;showModal();
  S.inv=[{k:'tramngoc',w:1},{k:'vongngoc'},{k:'nhansam'},{k:'nhansam'},{k:'nhansam'},{k:'yensao'},{k:'luahang'},{k:'huongtram'},{k:'tuithom',t:'xa',by:'me'},{k:'tranhco'},{k:'boodieu'},{k:'tramphuong'},{k:'gamvang'},{k:'dancoc'},{k:'ngocboi',from:'emp'},{k:'thunha'}];
  S.dress={k:'gamto',until:S.turn+2};S.scar={sev:2,known:1,veil:1};render();document.querySelector('#tabs [data-tab=inv]').click()});
 await p.waitForTimeout(1500);await shot('inv-grades');A.push(await audit('inv-grades'));
 const geo=await p.evaluate(()=>{const g=document.querySelector('.kinvg'),P=document.getElementById('panel');const cols=getComputedStyle(g).gridTemplateColumns.split(' ').length;
  const eq=document.querySelector('.keq');const last=eq.getBoundingClientRect();
  const kb=document.querySelector('.kinvg .kig3>.kitb');const cs=kb&&getComputedStyle(kb,'::after');
  return{cols,slots:g.children.length,full:g.children.length%cols===0,gapBelow:Math.round(P.getBoundingClientRect().bottom-last.bottom),scroll:P.scrollHeight>P.clientHeight+1,eqSlots:eq&&eq.querySelectorAll('[data-keqi]').length,
   frame:cs&&cs.borderImageSource.slice(-30),bg:kb&&getComputedStyle(kb).backgroundImage.slice(-30),pad:getComputedStyle(P).paddingTop}});
 /* empty wrist slot → pick list → wear the jade bangle */
 await p.click('.keq [data-keqi="1"]');await p.waitForTimeout(900);await shot('inv-eqpick');A.push(await audit('eqpick'));
  /* the pick list now shows the candidates: tap the bangle first (the detail card then has the wear button) */
 await p.click('#modal .keqpick [data-kidpick="wear"]');await p.waitForTimeout(700);
 await p.click('#kidfl [data-kinvact="wear"]');await p.waitForTimeout(900);const worn=await p.evaluate(()=>S.inv.filter(e=>e.w).map(e=>e.k));
 await shot('inv-worn');const gapWorn=await p.evaluate(()=>{const P=document.getElementById('panel');return Math.round(P.getBoundingClientRect().bottom-document.querySelector('.keq').getBoundingClientRect().bottom)+(P.scrollHeight>P.clientHeight+1?' SCROLL':'')});A.push(await audit('inv-worn'));
 await p.click('.keq [data-keqi="0"]');await p.waitForTimeout(900);await shot('inv-item');A.push(await audit('inv-item'));
 await p.evaluate(()=>{closeModal()});await p.waitForTimeout(300);
 await p.click('.keq [data-keqi="5"]');await p.waitForTimeout(900);await shot('inv-dress');A.push(await audit('inv-dress'));
 await p.evaluate(()=>{closeModal()});await p.waitForTimeout(300);
 /* other tabs: act-card rows never clipped (at top, and scrolled so the sticky tab row is stuck) */
 const T=[];for(const t of ['act','go','rv','rel','fac','staff','kid','art','story']){const ok=await p.evaluate(t=>{const b=document.querySelector(`#tabs [data-tab=${t}]`);if(!b||b.offsetParent===null)return false;b.click();return true},t);if(!ok)continue;
  await p.waitForTimeout(700);const a=await audit('tab-'+t);if(a.clip.length||a.ovX||a.bad.length)T.push(a);else T.push(t+':ok '+JSON.stringify(a.gaps))}
 await p.evaluate(()=>document.querySelector('#tabs [data-tab=inv]').click());await p.waitForTimeout(600);
 await p.evaluate(()=>{const P=document.getElementById('panel');P.scrollTop=140});await p.waitForTimeout(500);await shot('inv-scrolled');
 const lux=await p.evaluate(()=>{const out=[];const g0=liveRivals(true).map(v=>v.ghen);S.inv.forEach(e=>{if(IT[e.k]&&IT[e.k].sl)e.w=0});
  for(const k of ['tramphuong','vongvang','ngocboi','tuithom']){const i=S.inv.findIndex(e=>e.k===k);if(i>=0)wear(S,i);else{S.inv.push({k});wear(S,S.inv.length-1)}}
  out.push(luxOf(S));const r=itemMonth(S);out.push(r);out.push(liveRivals(true).map((v,i)=>v.ghen-g0[i]).join(','));
  const v=liveRivals(false)[0];if(v){v.inv=v.inv||[];v.inv.push({k:'tramphuong',w:1},{k:'ngocboi',w:1});out.push(['npc',v.rank,luxOf(v).name]);itemMonth(v)}
  S.inv.forEach(e=>e.w=0);out.push(luxOf(S).name);return out});
 console.log(JSON.stringify({TAG,geo,gapWorn,worn,A,T,lux,errs}));await b.close()})();
