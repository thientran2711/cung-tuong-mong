/* kit-name-stranger.js — KK42 (MAIN 157/158: «Tổng quản thái giám ??? …» in story prose; law 11): a stranger's KIT name chip (kitName, j61 «<tước> ???»)
   follows the same rule as a raw name in text (name-sentence, owner 24/11 ~21:58Z): subject / part of a sentence → «Một vị <tước> …» (start of a line) /
   «… một vị <tước> …» (mid-sentence), never «???» in prose; a bare tag (plate, heading, row label «X: ghen +8», «X thiện cảm +3») keeps «<tước> ???».
   Real kit paths: j79 kpPeopleIn (names in event / news text → chips, incl. the text's own title «Tổng quản thái giám X»), kitName, kitPersonLine.
   Fold 755x1000 + iPad 1180x820. usage: node dev/test/kit-name-stranger.js <index.html> [shotdir]   exit 1 on a FAIL */
const {chromium}=require('playwright');const path=require('path');const [,,F,SH]=process.argv;let bad=0;const ok=(c,m,x)=>{console.log((c?'ok   ':'FAIL ')+m+(x!==undefined?' '+JSON.stringify(x):''));if(!c)bad++};
(async()=>{const b=await chromium.launch();for(const [W,H] of [[755,1000],[1180,820]]){const D=W<H?'fold':'ipad';const p=await b.newPage({viewport:{width:W,height:H}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,120)));
 await p.addInitScript(()=>{let s=4242;Math.random=()=>{s=(s*1664525+1013904223)%4294967296;return s/4294967296}});await p.route(/\.(mp3|ogg|m4a|mp4|webm|wav)(\?|$)/,r=>r.abort());
 await p.goto('file://'+path.resolve(F),{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kpPeopleIn==='function',null,{timeout:240000});await p.waitForTimeout(2500);
 const R=await p.evaluate(async()=>{localStorage.clear();document.getElementById('title').hidden=true;window.__nlInner=1;for(let k=0;k<300;k++){start();if(!(typeof isSrv==="function"&&isSrv())&&!S.out&&!(typeof isKc==="function"&&isKc()))break}window.__nlInner=0;
  document.querySelectorAll('#kload,#kboot,#kcover').forEach(e=>e.remove());
  const v=liveRivals(true).filter(x=>!x.queen&&!k61Named(x))[0];const tq=k61All().find(e=>k61Kind(e)==="tq"&&!k61Named(e))||k61All().find(e=>k61Kind(e)!=="consort"&&k61Kind(e)!=="emp"&&k61Kind(e)!=="th"&&!k61Named(e)&&e.name);
  const rank=RANKS[v.rank].n;const ppl=[[v.name,v]].concat(tq?[[tq.name,tq]]:[]);const PI=h=>{const r=kpPeopleIn(h,ppl);return Array.isArray(r)?r[0]:r};
  const C=[["subject",`<p>${PI(`${rank} ${v.name} tâu xin Hoàng thượng ban thưởng.`)}</p>`,"^Một vị "+rank+" tâu xin"],
   ["mid",`<p>${PI(`Nghe nói ${rank} ${v.name} tâu xin Hoàng thượng.`)}</p>`,"^Nghe nói một vị "+rank+" tâu xin"],
   ["tq-subject",tq?`<p>${PI(`Tổng quản thái giám ${tq.name} sai người đến báo tin.`)}</p>`:"","^Một vị Tổng quản thái giám sai người"],
   ["tag",`<div>${kitName(v)}</div>`,"\\?\\?\\?$"],["stat",`<div>${kitName(v)} thiện cảm +3</div>`,"\\?\\?\\? thiện cảm"],["row",`<div>${kitName(v)}: ghen +8</div>`,"\\?\\?\\?: ghen"],
   ["plate",kitPersonLine(v),"\\?\\?\\?"]];
  const box=document.createElement('div');box.id='kns';box.style.cssText='position:fixed;left:10px;top:120px;right:10px;z-index:99999;background:#fffaf0;padding:12px;font-size:16px;border:2px solid #b8892f';document.body.appendChild(box);
  /* RV-KK41 loop (law 11): EVERY stranger she has in this life — each consort rank + every official / servant kind — as the subject with the text's own title,
     mid-sentence, and an eunuch written «Tổng quản thái giám X» (the title split across raw text + chip) */
  const ALL=k61All().filter(e=>e!==S&&e.name&&!k61Named(e)&&!k61Coop(e)&&!["emp","th"].includes(k61Kind(e)));const seenK=new Set();const PP=[];
  for(const e of ALL){const key=k61Kind(e)+"|"+k61MaskT(e);if(seenK.has(key))continue;seenK.add(key);PP.push(e)}
  const PI2=(h,e)=>{const r=kpPeopleIn(h,[[e.name,e]]);return Array.isArray(r)?r[0]:r};
  for(const e of PP){const T=k61Cap(k61MaskT(e));C.push(["loop-subject "+k61Kind(e)+" "+T,`<p>${PI2(`${T} ${e.name} sai người đến báo tin.`,e)}</p>`,"^Một vị [^?]+ sai người đến báo tin\\.$"]);
   C.push(["loop-mid "+k61Kind(e)+" "+T,`<p>${PI2(`Nghe nói ${T} ${e.name} sai người đến.`,e)}</p>`,"^Nghe nói một vị [^?]+ sai người đến\\.$"]);
   if(k61Kind(e)==="eun"||k61Kind(e)==="tq")C.push(["loop-split "+k61Kind(e),`<p>${PI2(`Tổng quản thái giám ${e.name} sai người đến báo tin.`,e)}</p>`,"^Một vị Tổng quản thái giám sai người đến báo tin\\.$"])}
  box.innerHTML=C.map(c=>`<div data-c="${c[0]}" style="margin:6px 0">${c[1]}</div>`).join("");await new Promise(r=>setTimeout(r,900));
  return {kinds:PP.length,tq:!!tq,rows:C.map(c=>{const t=(box.querySelector(`[data-c="${c[0]}"]`)||{}).textContent||"";return {c:c[0],want:c[2],t:t.replace(/\s+/g," ").trim()}})}});
 for(const r of R.rows){if(r.c==="tq-subject"&&!R.tq){console.log('SKIP no stranger official');continue}ok(new RegExp(r.want).test(r.t),`${D} ${r.c}`,r.t);if(/subject|mid|split/.test(r.c))ok(!/ vị .* vị /.test(r.t),`${D} ${r.c}: one «vị»`);if(/subject|mid|split/.test(r.c))ok(!/\?\?\?/.test(r.t),`${D} ${r.c}: no «???» in prose`)}
 ok(R.kinds>=4,`${D} looped ${R.kinds} stranger kinds/ranks`);
 if(SH){await p.waitForTimeout(1500);await p.evaluate(()=>{for(const e of [...document.body.querySelectorAll('body > *')]){if(e.id==='kns')continue;const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Sửa soạn|nhập cung/.test(e.textContent||'')&&e.offsetWidth>innerWidth*.6)e.remove()}});await p.waitForTimeout(800);await p.screenshot({path:`${SH}/kns-${W}.png`})}ok(!errs.length,`${D} no page error`,errs.slice(0,2));await p.close()}
 await b.close();console.log(bad?`KIT-NAME-STRANGER FAIL (${bad})`:'KIT-NAME-STRANGER PASS');process.exit(bad?1:0)})();
