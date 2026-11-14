/* Tư trang bag (kitInvGrid) + Luân hồi face-down pick (kitRoulette) — screenshots + audit.
   usage: node dev/test/inv-origin.js <baseURL> <W>x<H>@dpr <outdir> <tag> [oldsave.json]
   Writes <tag>-r1-faceup, r2-shuffle, r3-facedown, r4-picked, r5-revealed, r6-card, inv-empty, inv-all, inv-tab, inv-item. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,BASE,SZ,OUT,TAG,OLD]=process.argv;const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
(async()=>{const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1)});
 const p=await ctx.newPage();p.setDefaultTimeout(60000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const shot=async n=>{await p.screenshot({path:`${OUT}/${TAG}-${n}.jpg`,type:'jpeg',quality:84})};
 const audit=n=>p.evaluate(n=>{const vw=innerWidth,bad=[];document.querySelectorAll('#kroul *, #panel *, #modal .dlg *').forEach(e=>{const r=e.getBoundingClientRect();if(!r.width||e.closest('.kcattabs,.pctabs'))return;
   if(r.right>vw+1||r.left<-1){if(!e.closest('.krt'))bad.push('x:'+(e.className||e.tagName))}
   const cs=getComputedStyle(e);if(cs.textOverflow==='ellipsis'&&e.scrollWidth>e.clientWidth)bad.push('ell:'+e.className)});
  /* chips of one row share a baseline */
  const rows={};document.querySelectorAll('#kroul .krt .krr').forEach(c=>{const t=c.closest('.krt');if(t.classList.contains('down'))return;const r=c.getBoundingClientRect();const k=Math.round(t.getBoundingClientRect().top/4);(rows[k]=rows[k]||[]).push(Math.round(r.bottom))});
  const chipRows=Object.values(rows).map(a=>Math.max(...a)-Math.min(...a));
  return{n,ovX:document.documentElement.scrollWidth>vw,bad:[...new Set(bad)].slice(0,6),chipRows}},n);
 const A=[];
 await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 if(OLD){const d=fs.readFileSync(OLD,'utf8');const r=await p.evaluate(d=>{try{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);if(!x)return'noload';SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;deal();showModal();render();return'ok '+S.name+' inv '+S.inv.length}catch(e){return'ERR '+e.message}},d);console.log('oldsave',r);await p.waitForTimeout(1500);
  await p.evaluate(()=>{Q.length=0;showModal();document.querySelector('#tabs [data-tab=inv]').click()});await p.waitForTimeout(800);await shot('oldsave-inv');A.push(await audit('oldsave'));await p.goto(BASE,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500)}
 await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}window.__kroulKey=null;start()});
 await p.waitForFunction(()=>document.querySelector('#kroul'),null,{timeout:20000});await p.waitForTimeout(1500);
 await shot('r1-faceup');A.push(await audit('faceup'));
 await p.click('#kroul .krgo');await p.waitForTimeout(1250);await shot('r2-shuffle');
 await p.waitForFunction(()=>window.__kroulStep===2);await p.waitForTimeout(500);await shot('r3-facedown');A.push(await audit('facedown'));
 const tiles=await p.$$('#kroul .krt');await tiles[4].click();await p.waitForTimeout(650);await shot('r4-picked');
 await p.waitForFunction(()=>window.__kroulStep===3);await p.waitForTimeout(900);await shot('r5-revealed');A.push(await audit('revealed'));
 const tgt=await p.evaluate(()=>({origin:S.origin.k,shown:document.querySelector('#kroul .krt.pick').dataset.k}));
 await p.click('#kroul .krgo');await p.waitForTimeout(500);await shot('r6-fly');await p.waitForTimeout(1200);await shot('r7-card');
 /* bag: empty, then a few earned items */
 await p.evaluate(()=>{for(let i=0;i<20&&(S.origin.k==='cnv'||(typeof isSrv==='function'&&isSrv()));i++){try{store.set(NL_KEY,null)}catch(e){}start()}const k=document.getElementById('kroul');if(k)k.remove();Q.length=0;showModal();S.inv=[];render();document.querySelector('#tabs [data-tab=inv]').click()});await p.waitForTimeout(800);await shot('inv-empty');A.push(await audit('inv-empty'));
 await p.evaluate(()=>{S.inv=[{k:'tramngoc',w:1},{k:'vongngoc',from:'th'},{k:'nhansam'},{k:'nhansam'},{k:'nhansam'},{k:'yensao'},{k:'luahang'},{k:'huongtram'},{k:'tuithom',t:'xa',by:'me'},{k:'tranhco'},{k:'thunha'},{k:'ngocboi',from:'emp'},{k:'boodieu'}];render()});
 await p.waitForTimeout(900);await shot('inv-all');A.push(await audit('inv-all'));
 await p.click('#panel [data-kinvtab="thuoc"]');await p.waitForTimeout(600);await shot('inv-tab');A.push(await audit('inv-tab'));
 await p.click('#panel [data-kinvtab="all"]');await p.waitForTimeout(400);
 await p.click('#panel .kinvg [data-kinvi]');await p.waitForTimeout(800);await shot('inv-item');A.push(await audit('inv-item'));
 /* act from the popup: wear/unwear the hairpin */
 const worn0=await p.evaluate(()=>S.inv[0].w);await p.click('#modal [data-kinvact="wear"]');await p.waitForTimeout(500);const worn1=await p.evaluate(()=>S.inv[0].w);
 const grid=await p.evaluate(()=>{const g=document.querySelector('.kinvg');const cols=getComputedStyle(g).gridTemplateColumns.split(' ').length;return{cols,slots:g.children.length,full:g.children.length%cols===0,filled:g.querySelectorAll('[data-kinvi]').length,slot:Math.round(g.firstElementChild.getBoundingClientRect().width)}});
 console.log(JSON.stringify({TAG,tgt,grid,wear:[worn0,worn1],A,errs}));await b.close()})();
