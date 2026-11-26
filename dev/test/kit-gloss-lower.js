/* kit-gloss-lower.js — KIT §12.2 «Cách giảm» row (K-GLOSS-LOWER, owner OD 26/11 ~08:25Z). Fold 755x1000 + iPad 1180x820, a fresh consort life:
   a REAL tap on a glossary word whose stat can turn against her (Oán, Ghen, Nguy hiểm, Thiện cảm, Sủng, Danh …) shows the kit popover with ONE extra row
   «Cách giảm: …» (rise hurts) / «Cách tăng: …» (fall hurts), text = kitLowerText(term); a term with no data (Đức) shows none; the header help panel (Sủng, Danh, Sức)
   carries the same row; the popover stays inside the screen. When the build has no kitLowerText (OB-OAN data not landed) the test loads the table from DATA=<file>.
   usage: [DATA=tslower.js] [SHOTS=dir] node dev/test/kit-gloss-lower.js <index.html>   exit 1 on a FAIL */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');const F=path.resolve(process.argv[2]||'index.html');const DATA=process.env.DATA?fs.readFileSync(process.env.DATA,'utf8'):'';const SH=process.env.SHOTS;
(async()=>{const b=await chromium.launch();let bad=0;const ok=(c,m)=>{console.log((c?'PASS ':'FAIL ')+m);if(!c)bad++};
for(const [W,H] of [[755,1000],[1180,820]]){const D=W+'x'+H;const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(mp3|ogg|m4a|mp4|webm|wav)(\?|$)/,r=>r.abort());await p.goto('file://'+F,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:240000});await p.waitForTimeout(1500);
 await p.evaluate(()=>{if(typeof kitRoulette==='function'){kitRoulette=function(o){try{o&&o.done&&o.done()}catch(e){}}}try{localStorage.clear()}catch(e){}SLOT=3;window.__forceOrigin='tt';document.getElementById('title').hidden=true;try{REC.tour='done';REC.asked=1;saveRec()}catch(e){}for(let i=0;i<60;i++){try{nlNew()}catch(e){}start();if(!isSrv())break}try{S.tutTour=1}catch(e){}Q.length=0;document.getElementById('modal').hidden=true;document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn,#kdaytc').forEach(e=>e.remove());render()});
 for(let i=0;i<4;i++){await p.waitForTimeout(600);await p.evaluate(()=>{document.querySelectorAll('#kload,#kroul,#kroulw,#klife,.kroul,#dawn,#kdaytc').forEach(e=>e.remove());if(Q.length){Q.length=0;document.getElementById('modal').hidden=true;render()}})}
 const has=await p.evaluate(()=>typeof kitLowerText==='function');if(!has&&DATA)await p.evaluate(src=>{(0,eval)(src.replace(/^const /gm,'var '))},DATA);
 ok(await p.evaluate(()=>typeof kitLowerText==='function'&&typeof kitGlossPopHtml==='function'),`${D}: kitLowerText ${has?'in build':'loaded from DATA'} + kit kitGlossPopHtml`);
 const tap=async el=>{const r=await el.boundingBox();const x=r.x+Math.min(r.width/2,20),y=r.y+r.height/2;if(W<1100)await p.touchscreen.tap(x,y);else await p.mouse.click(x,y);await p.waitForTimeout(400)};
 /* 1. glossary words: real tap on a kitGloss word placed in the panel (the same .kgl every surface prints) */
 for(const [t,want] of [["Oán","Cách giảm"],["Ghen","Cách giảm"],["Nguy hiểm","Cách giảm"],["Thiện cảm","Cách tăng"],["Sủng","Cách tăng"],["Danh","Cách tăng"],["Đức",""]]){
  await p.evaluate(t=>{document.querySelectorAll('.kglt-probe').forEach(e=>e.remove());const d=document.createElement('div');d.className='kglt-probe';d.style.cssText='position:fixed;left:40%;top:45%;z-index:5;background:#fff;padding:6px';d.innerHTML=kitGloss(t);document.body.appendChild(d);const p=document.getElementById('kpop');if(p)p.hidden=true},t);
  const el=await p.$('.kglt-probe .kgl');if(!el){ok(false,`${D}: «${t}» is a glossary word`);continue}await tap(el);
  const r=await p.evaluate(()=>{const k=document.getElementById('kpop');if(!k||k.hidden)return null;const q=k.getBoundingClientRect();const l=k.querySelector('.kplow');return {low:l?l.textContent:'',inV:q.left>=0&&q.top>=0&&q.right<=innerWidth+1&&q.bottom<=innerHeight+1,sc:k.scrollHeight>k.clientHeight+1&&getComputedStyle(k).overflowY!=='visible'}});
  if(!r){ok(false,`${D}: «${t}» popover opens`);continue}
  ok(want?r.low.startsWith(want+':')&&r.low.length>want.length+6:!r.low,`${D}: «${t}» → ${want?'«'+want+': …»':'no row'} (${r.low.slice(0,48)})`);ok(r.inV,`${D}: «${t}» popover inside the screen`);
  if(SH&&(t==="Oán"||t==="Sủng"))await p.screenshot({path:`${SH}/gl-${t==="Oán"?'oan':'sung'}-${W}.png`})}
 await p.evaluate(()=>{document.querySelectorAll('.kglt-probe').forEach(e=>e.remove());const k=document.getElementById('kpop');if(k)k.hidden=true});
 /* 2. header help panels (HX → kit rule panel) */
 for(const [k,want] of [["sung","Cách tăng"],["danh","Cách tăng"],["suc","Cách tăng"],["tai",""]]){
  await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});const hc=await p.$('#hud-'+k);if(!hc){ok(false,`${D}: header cell #hud-${k}`);continue}await tap(hc);await p.waitForTimeout(500);
  const r=await p.evaluate(()=>{const M=document.getElementById('modal');if(!M||M.hidden)return null;const t=M.innerText;const m=t.match(/cách (giảm|tăng)[^\n]*\n?[^\n]*/i);return {low:m?m[0].replace(/^cách (giảm|tăng)/i,(x,y)=>'Cách '+y.toLowerCase()):'',t:t.slice(0,80)}});
  if(!r){ok(false,`${D}: header «${k}» opens a help panel`);continue}ok(want?r.low.startsWith(want):!r.low,`${D}: header «${k}» → ${want||'no row'} («${r.low.replace(/\n/g,' ').slice(0,60)}»)`);
  if(SH&&k==="sung")await p.screenshot({path:`${SH}/hx-sung-${W}.png`});await p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true})}
 /* 3. cung nữ road: no row (the acts named are consort acts) */
 ok(await p.evaluate(()=>{if(typeof kitLowerRow!=='function')return false;const s=window.isSrv;window.isSrv=()=>true;let r;try{r=kitLowerRow('Oán')}finally{window.isSrv=s}return r===null}),`${D}: cung nữ road → no row`);
 ok(!errs.length,`${D}: no page error ${JSON.stringify(errs.slice(0,2))}`);await ctx.close()}
await b.close();console.log(bad?`KIT-GLOSS-LOWER FAIL (${bad})`:'KIT-GLOSS-LOWER PASS');process.exit(bad?1:0)})();
