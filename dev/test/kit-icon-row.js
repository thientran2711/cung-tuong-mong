/* review/kit-icon-row (VISITOR-FIX KIT REQUEST, iPad Sổ ghi): a note row that starts with a small portrait icon (.md.xs inside .logs > div, also Tin báo / Tuần lục rows with .md) wraps its text TIGHT under itself:
   consecutive text lines are at most 1.6 line-heights apart (no big gap under the icon) and the last line is not a single orphan word (≥ 2 words) when the row wraps.
   Fold 755x1000 + iPad 1180x820. usage: node dev/test/kit-icon-row.js <url file:///…/index.html> <outdir> [WxH,...]   FAILS on main 502c48c9 */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,SIZES]=process.argv;fs.mkdirSync(OUT,{recursive:true});
(async()=>{const b=await chromium.launch(process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{});let bad=0;
 for(const wh of (SIZES||"755x1000,1180x820").split(",")){const [W,H]=wh.split("x").map(Number);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.route('**/assets.json',r=>r.fulfill({status:404,body:''}));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof mdH==='function',null,{timeout:240000});await p.waitForTimeout(2000);
  await p.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(typeof isSrv==='function'&&isSrv()))break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;for(let i=0;i<5;i++){try{nextBuoi()}catch(e){}Q.length=0}m.hidden=true;const w=document.getElementById('dawn');if(w){w.hidden=true;w.innerHTML='';w.classList.remove('on')}});
  await p.waitForTimeout(2500);await p.addStyleTag({content:'#kload,#klife,.modal.kload,#modal.kptitle,#kroulw,.kroul,#curtain,#modal,#dawn,#kxcatch,.kmov{display:none!important}'});
  await p.evaluate(()=>{for(const b of document.querySelectorAll('button'))if(/Vào cung ngay/.test(b.textContent)&&b.offsetParent)b.click()});await p.waitForTimeout(3000);
  const f=[];
  const r=await p.evaluate(async()=>{const v=(typeof rivals!=='undefined'&&rivals[0])||{name:'Quý phi'};const nm=v.name;
   S.logs.unshift(`${nm} tâu xin Trường Xuân cung, Hoàng thượng chuẩn tấu, dời sang Trường Xuân cung.`,`Một vị Phi dời khỏi Trường Xuân cung, sang Diên Huy cung, ${nm} bước đi thong thả qua hành lang dài rồi dừng lại hỏi han ta đôi câu cho phải lẽ.`,`${nm} tâu xin Dục Khôn cung, Hoàng thượng không chuẩn. Vẫn ở Diên Huy cung.`);
   tab='log';render();await new Promise(r=>setTimeout(r,600));
   const rows=[...document.querySelectorAll('.logs > div')].filter(d=>d.querySelector('.md'));const out=rows.map(d=>{const ws=[],tw=document.createTreeWalker(d,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('.md')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let n;const tops=[];const lh=parseFloat(getComputedStyle(d).lineHeight)||18;
    while(n=tw.nextNode()){if(!n.nodeValue.trim())continue;const rg=document.createRange();rg.selectNodeContents(n);[...rg.getClientRects()].forEach(q=>{if(q.width>1)tops.push(Math.round(q.top))})}
    const cl=[];[...new Set(tops)].sort((a,b)=>a-b).forEach(t=>{if(!cl.length||t-cl[cl.length-1]>6)cl.push(t)});const lines=cl;const gaps=lines.slice(1).map((t,i)=>t-lines[i]);
    /* last line words: text rects on the last top */const words=[];const last=lines[lines.length-1];const tw2=document.createTreeWalker(d,NodeFilter.SHOW_TEXT,{acceptNode:n=>n.parentElement.closest('.md')?NodeFilter.FILTER_REJECT:NodeFilter.FILTER_ACCEPT});let m2,lastTxt='';
    while(m2=tw2.nextNode()){const t=m2.nodeValue;for(let i=0;i<t.length;i++){const rg=document.createRange();rg.setStart(m2,i);rg.setEnd(m2,i+1);const q=rg.getClientRects()[0];if(q&&Math.abs(Math.round(q.top)-last)<=6)lastTxt+=t[i]}}
    const md=d.querySelector('.md').getBoundingClientRect();return {n:d.textContent.slice(0,24),lh:Math.round(lh),lines:lines.length,gaps,lastWords:lastTxt.trim().split(/\s+/).filter(Boolean).length,lastTxt:lastTxt.trim(),all:d.textContent.slice(-70),ws:getComputedStyle(d).textWrap+'/'+getComputedStyle(d).display,h:Math.round(d.getBoundingClientRect().height),icon:[Math.round(md.width),Math.round(md.height)]}});
   return out});
  console.log(wh,JSON.stringify(r));
  if(r.filter(o=>o.h>0).length<3)f.push('icon rows not rendered ('+r.length+', visible '+r.filter(o=>o.h>0).length+')');r.forEach(o=>{const mx=Math.max(0,...o.gaps);if(mx>o.lh*1.6)f.push(`«${o.n}» line gap ${mx}px > 1.6 × ${o.lh}`);if(o.lines>1&&o.lastWords<2)f.push(`«${o.n}» orphan last word «${o.lastTxt}» in «${o.all}» ${o.ws}`)});
  await p.screenshot({path:`${OUT}/${wh}-iconrow.jpg`,type:'jpeg',quality:80});
  if(errs.length)f.push('page errors '+errs.join(' | '));console.log(wh,f.length?'FAIL\n  '+f.join('\n  '):'ALL PASS');if(f.length)bad++;await ctx.close()}
 await b.close();process.exit(bad?1:0)})();
