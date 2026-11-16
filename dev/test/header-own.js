/* review/header-own (D9, OD L607): the top bar keeps ONLY her own info; other people's info (Hoàng thượng, Thái hậu, Hoàng hậu, Cung nữ…) lives on the stage plaques (.k3c) and person cards.
   usage: node dev/test/header-own.js <index.html> <outdir> <WxH@dpr,...> [oldsave.json]   (serves a local index.html under the live origin, like header-danh.js)
   Per size: visible header text (must hold no other person), #emp hidden, plaques reachable in 1 tap and open a card with the person's numbers, overflow, page errors. Exit 1 on any FAIL. */
const {chromium}=require('playwright');const fs=require('fs');
const [,,IDX,OUT,SIZES,OLD]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const LIVE='https://thientran2711.'+'github.io/cung-tuong-mong/';
const html=fs.readFileSync(IDX,'utf8');let FAIL=0;
const measure=()=>{const hd=document.querySelector('header.hud');const R=e=>e.getBoundingClientRect();
 const vis=e=>e.offsetParent!==null&&R(e).width>1&&R(e).height>1&&getComputedStyle(e).visibility!=='hidden';
 const txt=[];hd.querySelectorAll('*').forEach(e=>{if(!vis(e))return;const own=[...e.childNodes].filter(n=>n.nodeType==3).map(n=>n.textContent.trim()).join(' ');if(own)txt.push(own)});
 const emp=document.getElementById('emp');
 const bad=txt.filter(t=>/Hoàng thượng|Hoàng hậu|Thái hậu|Cung nữ|thiện cảm|Thiện cảm|Ân tình|Ân sủng|Ngài sủng/.test(t));
 const plaq=[...document.querySelectorAll('.stage .k3c')].filter(vis).map(e=>({t:e.textContent.trim().slice(0,40),in:!!e.closest('header.hud')}));
 const hb=R(hd);const cut=[...hd.querySelectorAll('.kst,.k3r,#me-n,#me-r,#me-d')].filter(vis).filter(e=>{const q=R(e);return q.left<hb.left-.5||q.right>hb.right+.5}).length;
 return{hdH:Math.round(hb.height),txt,bad,empVisible:!!(emp&&vis(emp)),plaq,cut,ovf:document.documentElement.scrollWidth>innerWidth+1}};
(async()=>{const b=await chromium.launch();const RES={};
 for(const SZ of SIZES.split(',')){const [WH,DPR]=SZ.split('@');const [W,H]=WH.split('x').map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:+(DPR||1),reducedMotion:'reduce',serviceWorkers:'block'});
  await ctx.route(u=>u.href===LIVE||u.href===LIVE+'index.html',r=>r.fulfill({status:200,contentType:'text/html; charset=utf-8',body:html}));
  await ctx.route(/\.(mp3|ogg|m4a)$/,r=>r.fulfill({status:404,body:''}));
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(180000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(LIVE,{waitUntil:'domcontentloaded'});await p.addStyleTag({content:'#kroul,#kroulw,.kroul{display:none!important}'}).catch(()=>{});
  await p.waitForFunction(()=>typeof start==='function');await p.waitForTimeout(2500);
  const clean=async()=>{await p.evaluate(()=>{document.querySelectorAll('.kmov').forEach(e=>e.remove());['kroul','kroulw','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.krbox').forEach(e=>{const w=e.parentElement;if(w&&w!==document.body)w.remove()});
   for(let i=0;i<4;i++)document.querySelectorAll('[data-km-close]').forEach(b=>b.click());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;const w=document.getElementById('dawn');if(w)w.hidden=true;render()});await p.waitForTimeout(700)};
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}
   Q.length=0;for(let i=0;i<2;i++){try{nextBuoi()}catch(e){}Q.length=0}render()});
  await p.waitForTimeout(5000);await clean();
  const r=await p.evaluate(measure);
  /* tap each court plaque: a card/modal with that person must open (1 tap) */
  r.taps=[];const n=r.plaq.length;
  for(let k=0;k<n;k++){await clean();const res=await p.evaluate(async k=>{const sig=()=>{const m=document.getElementById('modal');const t=document.querySelector('#tabs .on,#tabs .act,#tabs [aria-selected=true]');const P=document.getElementById('panel');return (m&&!m.hidden?'M:'+m.textContent.replace(/\\s+/g,' ').trim().slice(0,60):'')+'|T:'+(t?t.dataset.tab:'?')+'|P:'+(P?P.textContent.length:0)};const e=[...document.querySelectorAll('.stage .k3c')][k];if(!e)return'gone';const s0=sig();e.click();await new Promise(r=>setTimeout(r,600));const s1=sig();return s0===s1?'NOTHING':(s1.startsWith('M:')?'modal ':'panel/tab ')+s1.slice(0,70)},k);r.taps.push(res)}
  await clean();await p.screenshot({path:`${OUT}/${WH}-hdr.jpg`,type:'jpeg',quality:60,clip:{x:0,y:0,width:W,height:Math.min(H,r.hdH+6)}});
  const f=[];if(r.bad.length)f.push('other-person text in header: '+r.bad.join('|'));if(r.empVisible)f.push('#emp visible');if(r.plaq.some(x=>x.in))f.push('plaque inside header');if(!r.plaq.length)f.push('no court plaques on stage');if(r.taps.some(t=>t==='NOTHING'||t==='gone'))f.push('plaque tap opens nothing');if(r.cut)f.push('header cell cut '+r.cut);if(r.ovf)f.push('h-overflow');if(errs.length)f.push('page errors '+errs.join(';'));
  if(OLD){r.old=await p.evaluate(d=>{try{localStorage.setItem('hclh-save-v2-2',d);const x=loadSlot(2);if(!x)return'noload';SLOT=2;quiet=true;deser(x);quiet=false;document.getElementById('title').hidden=true;deal();Q.length=0;render();return'ok '+S.name}catch(e){return'ERR '+e.message}},fs.readFileSync(OLD,'utf8'));if(!/^ok/.test(r.old))f.push('old save: '+r.old);await clean();const r2=await p.evaluate(measure);if(r2.bad.length)f.push('old save: other-person text in header')}
  if(f.length)FAIL++;console.log(SZ,f.length?'FAIL '+f.join(' ; '):'PASS',JSON.stringify({hdH:r.hdH,headerText:r.txt.join(' / '),plaques:r.plaq.map(x=>x.t),taps:r.taps,old:r.old}));await ctx.close()}
 await b.close();process.exit(FAIL?1:0)})().catch(e=>{console.error(e);process.exit(1)});
