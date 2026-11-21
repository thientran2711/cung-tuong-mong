/* mg-noword-a (owner OD 20/11 ~05:10Z: NO TEXT in mini-game play) — node dev/test/mg-noword-a.js [dev/index.html] [WxH] [--scan]
   For each kind of group a, every caller path used by mg-ready-guide (playArt / startContest), press «Sẵn sàng», and also «Hướng dẫn»:
   the play area (the kit game box minus the rules block .kgr, the kit chips/clock/progress, the guided-round bar) holds NO visible text node
   except pure numbers/score/clock. Prints the scan table kind | words. --scan = print only, never fail. */
const {chromium}=require('playwright');const path=require('path');
const A=process.argv.slice(2);const scan=A.includes('--scan');const pos=A.filter(a=>!a.startsWith('--'));
const URL0=pos[0]||'dev/index.html';const URL=/^(https?|file):/.test(URL0)?URL0:'file://'+path.resolve(URL0);
const [VW,VH]=(pos[1]||'755x1000').split('x').map(Number);
const KINDS=['dan','hat','co','dauho','ban','ve','hoa','theu','kim','mua','huong','doden','den','tat','ne'];
const GW=60,longW=a=>(a||[]).some(t=>t.replace(/\s+«.*$/,'').length>GW);const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:VW,height:VH}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.addInitScript(()=>{window.__ct=null;const ok=t=>/^[^\p{L}]*$/u.test(t)||/^Gió (lặng|(ngược|xuôi) (nhẹ|vừa|mạnh))$/.test(t);/* owner 21/11: guide words that are needed stay (Đầu hồ wind line, dauho-lv5) */
  for(const f of['fillText','strokeText']){const o=CanvasRenderingContext2D.prototype[f];CanvasRenderingContext2D.prototype[f]=function(t){if(window.__ct&&!ok(String(t).trim()))window.__ct.add(String(t).trim());return o.apply(this,arguments)}}});
 await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 await p.evaluate(()=>{localStorage.clear();SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;
  const m=document.getElementById('modal');if(m)m.hidden=true;S.suc=100;S.bac=999;S.ap=9;try{render()}catch(e){}
  /* visible text nodes of the play area: skip the rules block, the kit chips (clock/progress/score = numbers + their kit word is NOT skipped unless pure number), the tutor bar */
  window.__words=box=>{const out=[];const w=document.createTreeWalker(box,NodeFilter.SHOW_TEXT);let n;
   while(n=w.nextNode()){const t=n.nodeValue.replace(/\s+/g,' ').trim();if(!t)continue;const el=n.parentElement;if(!el)continue;
    if(el.closest('.kgr,.kgt-bar,script,style,[data-nw-ok]'))continue;
    const cs=getComputedStyle(el);if(cs.display==='none'||cs.visibility==='hidden')continue;const r=el.getBoundingClientRect();if(!r.width&&!r.height)continue;
    if(/^[^\p{L}]*$/u.test(t))continue;/* numbers, score, clock, signs */
    out.push(t+'  «'+(el.className&&el.className.baseVal===undefined?el.className:el.tagName)+'»')}return out};
  window.__nw=async(src,o)=>{o=o||{};const sleep=t=>new Promise(r=>setTimeout(r,t));const r={};
   try{kg82Close()}catch(e){}Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true;
   try{(0,eval)(src)}catch(e){r.err=String(e.message||e);return r}
   await sleep(900);const box=kg82Box();if(!box){r.nobox=1;return r}
   const go=box.querySelector('.kgr-go');if(!go){r.nogo=1;return r}
   window.__ct=new Set();go.click();await sleep(o.wait||1800);r.play=[...new Set(__words(box))];
   /* a few more samples mid-play (cues change) */
   for(let i=0;i<5;i++){await sleep(900);for(const t of __words(box))if(!r.play.includes(t))r.play.push(t)}
   r.play.push(...[...window.__ct].map(t=>t+'  «canvas»'));window.__ct=null;try{kg82Close()}catch(e){}await sleep(150);
   try{(0,eval)(src)}catch(e){}await sleep(900);const b2=kg82Box();const tb=b2&&b2.querySelector('#kgrtut');r.tut=null;
   if(tb){window.__ct=new Set();tb.click();await sleep(2500);r.tut=[...new Set(__words(b2))];r.tut.push(...[...window.__ct].map(t=>t+'  «canvas»'));window.__ct=null}
   try{kg82Close()}catch(e){}return r}});
 await p.waitForTimeout(3500);
 const rows=[];
 for(const k of KINDS){const exists=await p.evaluate(k=>!!KG82_KIND[k],k);if(!exists){console.log('skip kind '+k+' (not a KG82 kind)');continue}
  const src=k==='hoa'?`startContest({art:"hoa",title:"Hội thi",onDone:()=>{}})`:`playArt({art:${JSON.stringify(k)},onDone:()=>{}})`;
  let r;try{r=await p.evaluate(s=>window.__nw(s),src)}catch(e){r={err:String(e.message).slice(0,120)}}
  /* OD 21/11 ~00:50Z (canon overwrite, mg-5s-clear): the short GUIDING words stay (the kit guide pill kg82Guide, zone labels); everything else is still a FAIL */
  {const GU={ban:/^(Chạm ngay!|Chờ mũi ngắm vào giữa hồng tâm, rồi chạm|Chạm khi mũi ngắm ở giữa hồng tâm)$/,
   tat:/^(Nặng|Vừa|Chạm ngay!|Tay đang lướt qua thước · chạm khi kim vào vùng đỏ)$/,ne:/^(Né|Chạm ngay để né!|Đòn đang lướt qua thước · chạm khi kim vào vùng xanh)$/}[k];
   if(GU){const f=l=>(l||[]).filter(x=>!GU.test(String(x).replace(/\s+«.*»$/,'').trim()));r.play=f(r.play);if(r.tut)r.tut=f(r.tut)}}
  rows.push([k,r]);const n=(r.play||[]).length+((r.tut||[]).length);
  console.log(k.padEnd(7),n?('WORDS '+JSON.stringify({play:r.play,tut:r.tut})):('0 words'+(r.err||r.nobox||r.nogo?' ('+JSON.stringify(r)+')':'')))}
 console.log('errors',errs.slice(0,3));
 if(!scan){for(const [k,r] of rows){ok(r&&!r.err&&!r.nobox&&!r.nogo,k+' opened');ok(!longW(r.play),k+' play: no reading-heavy text (guiding words ≤ '+GW+' chars are allowed, owner OD 21/11 ~00:50Z)',(r.play||[]).filter(t=>t.length>GW));ok(!longW(r.tut),k+' tutorial: no reading-heavy text')}ok(!errs.length,'no page errors')}
 await b.close();process.exit(scan||res.every(Boolean)?0:1)})();
