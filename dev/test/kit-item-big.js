/* kit-item-big (review/kit-item-big, IT01 / KIT §28.13b) — node dev/test/kit-item-big.js [dev/index.html]
   kitItemBigSrc mapping + the lg / xl frameless picture on small sources, and that the 24 big call sites are all classified (item-big-scan.py exit 0). */
const {chromium}=require('playwright');const path=require('path');const {spawnSync}=require('child_process');
const URL0=process.argv[2]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const sc=spawnSync('python3',[path.join(__dirname,'item-big-scan.py')],{encoding:'utf8'});ok(sc.status===0,'every lg / xl kitItem call site is classified (no «other»)',(sc.stdout||'').split('\n').slice(-2)[0]);
 const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof kitItem==='function'&&typeof kitItemBigSrc==='function');await p.waitForTimeout(800);
 const r=await p.evaluate(async()=>{const o={};const B="https://x.example/";
  o.map=[kitItemBigSrc("img/item-nhansam.webp"),kitItemBigSrc(B+"img/item-nhansam.webp"),kitItemBigSrc("img/item512/item-nhansam.webp"),kitItemBigSrc("img/pet512/pet-meomuop.webp"),kitItemBigSrc("img/wd-boodieu.webp"),kitItemBigSrc("img/veil-t5.png"),kitItemBigSrc("")];
  const h=document.createElement('div');h.style.cssText='position:fixed;left:0;top:0;z-index:2147483000;background:#fffaf0';document.body.appendChild(h);
  h.innerHTML=kitItem({src:"img/item-nhansam.webp",name:"",grade:2,size:"lg"})+kitItem({src:"img/item-nhansam.webp",name:"",grade:2,size:"xl"})+kitItem({src:"img/item-nhansam.webp",name:"",grade:2,size:"md"})+kitItem({src:"img/item-nhansam.webp",name:"",grade:2,size:"slot"});
  const im=[...h.querySelectorAll('.kitem img')].map(e=>(e.getAttribute('src')||'').replace(/^.*\/img\//,'img/'));o.srcs=im;
  const fr=e=>{const k=e.querySelector('.kitb'),cs=getComputedStyle(k);return cs.borderTopWidth==='0px'&&cs.boxShadow==='none'};o.frameless=[...h.querySelectorAll('.kitem')].map(fr);
  /* fallback: a missing 512 swaps once to the small file */
  const t=h.querySelector('.kitem-lg img');o.fb=(t.dataset.fb||'').replace(/^.*\/img\//,'img/');o.onerr=t.getAttribute('onerror')||'';h.remove();return o});
 ok(/img\/item512\/item-nhansam\.webp$/.test(r.map[0])&&/^https:\/\/x\.example\/img\/item512\/item-nhansam\.webp$/.test(r.map[1]),'small item src → item512 (relative and CDN-prefixed)',r.map.slice(0,2));
 ok(r.map[2]===(r.map[2]||'')&&/item512\/item-nhansam/.test(r.map[2])&&r.map[3]==="img/pet512/pet-meomuop.webp"&&r.map[4]==="img/wd-boodieu.webp"&&r.map[5]==="img/veil-t5.png"&&r.map[6]==="",'512 / pet512 / wd / veil / empty unchanged',r.map.slice(2));
 ok(/item512/.test(r.srcs[0])&&/item512/.test(r.srcs[1])&&!/item512/.test(r.srcs[2])&&!/item512/.test(r.srcs[3]),'lg / xl ask for the 512 file, md / slot keep the small one',r.srcs);
 ok(r.frameless[0]&&r.frameless[1]&&!r.frameless[2]&&!r.frameless[3],'lg / xl frameless, md / slot framed',r.frameless);
 ok(/img\/item-nhansam\.webp$/.test(r.fb)&&!/item512/.test(r.fb)&&/this\.src=this\.dataset\.fb/.test(r.onerr),'a missing 512 falls back to the small picture (data-fb + one swap, then removes)',r.fb);
 ok(!errs.length,'no page errors',errs.slice(0,2));
 console.log(res.every(x=>x)?'KIT-ITEM-BIG PASS':'KIT-ITEM-BIG FAIL');await b.close();process.exit(res.every(x=>x)?0:1)})();
