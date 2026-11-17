/* book-col-scan.js — Tuần lục pages with a figure column (KIT 32.2a/T3 + KIT 52 'on paper').
   usage: python3 dev/build/assemble.py && node dev/test/book-col-scan.js <outdir> [shots]
   Plays a short week (as weekbook-entries.js), opens the REAL book (dawn) and for every page with a figure column at 755x1000@2 (Fold),
   1180x820@2 + 1366x1024@2 (iPad), 412x1058@2 (cover), 390x844@3 reports: figure column width / page, figure left gap to the page's left edge,
   text column width, relation table cut at the right (scrollWidth/rect past the text column), relation table with a header band or a card
   background (must be none 'on paper'), broken words. Exit 1 when a page has a table cut / band / card. Images come from the live site. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const OUT=process.argv[2]||'/home/user/wt/sdf-shots';const SHOTS=process.argv[3]==='shots';fs.mkdirSync(OUT,{recursive:true});
const LIVE='https://thientran2711.github.io/cung-tuong-mong/';const HTML=fs.readFileSync(path.join(__dirname,'..','index.html'));
const VPS=[[755,1000,2],[1180,820,2],[1366,1024,2],[412,1058,2],[390,844,3]];
const SETUP=()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;document.getElementById('title').hidden=true;
 Math.random=(()=>{let s=777;return()=>{s=(s*16807)%2147483647;return s/2147483647}})();window.__forceOrigin='cn';
 for(let i=0;i<60;i++){start();if(!isSrv()&&S.emp)break}Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render();window.__bot=true;S.mat=12;
 S.logs.length=0;S.logSeq=0;S.wkSnap=wkSnap();S.wkSnap.seq=0;
 const L=liveRivals(false);const hh=L.find(v=>v.queen)||L[0],a=L.find(v=>!v.queen&&v!==hh)||L[1];kn();for(const v of L)S.met[v.id]=wk();
 const t0=S.th;S.th+=8;S.danh+=2;log(`Thỉnh an Thái hậu: thành. Danh ${S.danh-2}→${S.danh}, Thái hậu quý ngươi ${t0}→${S.th}.`);
 S.sung+=7;log(`Đánh đàn ở ngự hoa viên: <span class="g">thành</span>. <span class="g">Sủng ${S.sung-7}→${S.sung}</span>.`);
 log(`Thỉnh an Hoàng hậu: hỏng. ${hh.name} thiện cảm -3.`);relAdd(hh,S,-3);log(`${a.name} oán ta +4.`);};
const PAGE=()=>{const out=[];const bk=window.__kbk;
 return (async()=>{for(let i=0;i<=bk.max;i++){bk.go(i);await new Promise(r=>setTimeout(r,700));
  const K=document.querySelector('.kbk');const kr=K.getBoundingClientRect();
  for(const pg of [...K.querySelectorAll('.kbk-pg')]){const r=pg.getBoundingClientRect();if(r.width<10||r.right<=0||r.left>=innerWidth)continue;const hit=document.elementFromPoint(Math.min(innerWidth-2,Math.max(2,r.left+r.width/2)),r.top+r.height/2);if(!hit||hit.closest('.kbk-pg')!==pg)continue;
   const box=pg.querySelector('.kbk-person');if(!box)continue;const por=box.querySelector(':scope>.kbk-por'),fl=box.querySelector(':scope>.kbk-flow'),hd=box.querySelector(':scope>.kbk-phead');
   const sc=r.width/pg.offsetWidth||1;const pr=por.getBoundingClientRect(),fr=fl.getBoundingClientRect(),inn=pg.querySelector('.kbk-in').getBoundingClientRect();
   const fig=box.querySelector('.kesimg'),ir=fig?fig.getBoundingClientRect():null;
   const nm=(hd.querySelector('.kbk-pname')||box.querySelector('.kbk-t')||{}).textContent||'';
   const tb=[...pg.querySelectorAll('.kr2')];let cut=0,band=0,card=0;
   tb.forEach(t=>{const tr=t.getBoundingClientRect(),cr=(box.querySelector('.kbk-phead')).getBoundingClientRect();if(tr.right>Math.max(fr.right,cr.right)+1)cut++;t.querySelectorAll('.kr2g,.kr2h').forEach(x=>{if(x.scrollWidth>x.clientWidth+1)cut++});
    t.querySelectorAll('.kr2h').forEach(h=>{const c=getComputedStyle(h);if(c.backgroundColor!=='rgba(0, 0, 0, 0)'&&c.display!=='none')band++});
    t.querySelectorAll('.kr2b').forEach(b=>{const c=getComputedStyle(b);if(c.backgroundColor!=='rgba(0, 0, 0, 0)')card++})});
   out.push({i,name:nm.trim().slice(0,22),pageW:Math.round(r.width/sc),figCol:Math.round(pr.width/sc),figPct:+(pr.width/inn.width).toFixed(2),figGap:ir?Math.round((ir.left-r.left)/sc):null,textW:Math.round(fr.width/sc),fontPx:parseFloat(getComputedStyle(fl).fontSize),tables:tb.length,cut,band,card,
    feet:ir?Math.round((pr.bottom-ir.bottom)/sc):null})}}
  return out})()};
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost,ctm.test'}}:{});let bad=0;const ALL=[];
 for(const [W,H,dpr] of VPS){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce',ignoreHTTPSErrors:true});
  await ctx.route('http://ctm.test/**',async rt=>{const u=new URL(rt.request().url());if(/\.html$|\/$/.test(u.pathname))return rt.fulfill({status:200,body:HTML,contentType:'text/html; charset=utf-8'});
   try{const rs=await rt.fetch(LIVE+u.pathname.slice(1),{timeout:30000});return rt.fulfill({response:rs})}catch(e){return rt.abort()}});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof dawn==='function');await p.waitForTimeout(3000);
  await p.evaluate(SETUP);await p.waitForFunction(()=>typeof FIGS!=='undefined'&&FIGS.length>0,null,{timeout:60000}).catch(()=>{});
  await p.addStyleTag({content:'#modal,#kroul,#kroulw,.kmov{display:none!important}'});await p.evaluate(()=>{Q.length=0;dawn()});await p.waitForTimeout(6000);
  const rows=await p.evaluate(PAGE);const seen=new Set();const uniq=rows.filter(r=>{const k=r.name+'|'+r.i;if(seen.has(k))return false;seen.add(k);return true});
  console.log(`== ${W}x${H}@${dpr}`);for(const r of uniq){const f=r.cut||r.band||r.card;if(f)bad++;console.log((f?'FAIL ':'  ok ')+JSON.stringify(r))}
  ALL.push({vp:`${W}x${H}`,rows:uniq});
  if(SHOTS){const want=[/Tổng lược/,/Thái hậu/];for(const re of want){const hit=uniq.find(r=>re.test(r.name));if(hit){await p.evaluate(i=>window.__kbk.go(i),hit.i);await p.waitForTimeout(1200);await p.screenshot({path:`${OUT}/${W}x${H}-${re.source.replace(/\W/g,'')}.jpg`,type:'jpeg',quality:70})}}
   const pp=uniq.find(r=>!/Tổng lược|Thái hậu/.test(r.name));if(pp){await p.evaluate(i=>window.__kbk.go(i),pp.i);await p.waitForTimeout(1200);await p.screenshot({path:`${OUT}/${W}x${H}-person.jpg`,type:'jpeg',quality:70})}}
  if(errs.length){bad++;console.log('page errors',errs.slice(0,3))}await ctx.close()}
 fs.writeFileSync(`${OUT}/scan.json`,JSON.stringify(ALL));await b.close();console.log(bad?`FAIL ${bad}`:'ALL OK');process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(2)});
