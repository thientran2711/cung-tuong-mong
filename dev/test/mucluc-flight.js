/* flight-mucluc (owner 24/11 f10): Mệnh truyện › Chương này › «Mục lục» = a LARGE kit frame listing every chapter by number + NAME (no «Còn khoảng N chương nữa»).
   usage: node dev/test/mucluc-flight.js <page URL> <outdir> ; every life type (origin) on Fold 755x1000 + iPad 1180x820 @2. Fails on page errors, a «Còn khoảng/chương nữa» row, fewer than 14 chapter rows (frame lives), a row with no name, the dialog not big, horizontal overflow. Shots go outside git. */
const {chromium}=require('playwright');const fs=require('fs');const [,,URL,OUT,ORIG]=process.argv;fs.mkdirSync(OUT,{recursive:true});const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const b=await chromium.launch();const F=[];const origins=(ORIG||'tt,cnv,tdn').split(',');
 for(const [W,H] of [[755,1000],[1180,820]])for(const o of origins){const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:2,hasTouch:true,isMobile:W<1100,serviceWorkers:'block',reducedMotion:'reduce'});
  const p=await ctx.newPage();const E=[];p.on('pageerror',e=>E.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:240000});await p.waitForFunction(()=>typeof start==='function'&&typeof render==='function');await sleep(2000);
  await p.evaluate(o=>{const kl=document.getElementById('kload');if(kl)kl.remove();if(window.KLIFE){KLIFE.off=true;KLIFE.go=true}window.__forceOrigin=o;SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=false;Q.length=0;deal();render()},o);
  await sleep(2000);
  await p.evaluate(()=>{try{kmReset()}catch(e){}Q.length=0;const lc=document.getElementById('klife');if(lc)lc.remove();const m=document.getElementById('modal');if(m)m.hidden=true;tab='story';render()});await sleep(800);
  const tag=`${W} ${o}`;
  /* open slots must show real arc titles, never a typed fallback (MAIN 127) */
  const fb=await p.evaluate(()=>{const T=ktChapToc();return T?T.filter(x=>/Chuyện chung|Chuyện kế|Phần (đầu|giữa|cuối)/.test(x[1])).map(x=>x[1]):[]});if(fb.length)F.push(`${tag}: typed fallback names ${fb.join(' | ')}`);
  const has=await p.evaluate(()=>!!document.querySelector('[data-ksmuc],[data-ktoc]'));if(!has){F.push(`${tag}: no «Mục lục» button`);await p.screenshot({path:`${OUT}/ml-${o}-${W}-none.png`});await ctx.close();continue}
  await p.evaluate(()=>document.querySelector('[data-ksmuc],[data-ktoc]').click());await sleep(900);
  const r=await p.evaluate(()=>{const m=document.querySelector('#modal:not([hidden]) .dlg');if(!m)return{none:1};const q=m.getBoundingClientRect();const rows=[...m.querySelectorAll('.kmuc .kchk')].map(e=>e.textContent.trim());
   return{h:q.height,w:q.width,vh:innerHeight,over:m.scrollWidth>m.clientWidth+2,rows,txt:m.textContent}});
  if(r.none)F.push(`${tag}: no dialog`);else{if(/Còn khoảng|chương nữa/.test(r.txt))F.push(`${tag}: «Còn khoảng/chương nữa» row`);if(r.over)F.push(`${tag}: overflow`);if(r.rows.length<14)F.push(`${tag}: only ${r.rows.length} chapter rows`);
   if(r.rows.some(x=>!/Chương \d+ · \S/.test(x)))F.push(`${tag}: a row without number+name`);if(r.h<r.vh*.55)F.push(`${tag}: frame not large (${Math.round(r.h)}/${r.vh})`);console.log(tag,r.rows.length,'rows','h',Math.round(r.h),'/',r.vh);console.log(r.rows.join(' | '))}
  await p.screenshot({path:`${OUT}/ml-${o}-${W}.png`});
  if(E.length)F.push(`${tag} page errors: ${E.slice(0,2).join(' | ')}`);await ctx.close()}
 console.log(F.length?F.map(x=>'FAIL '+x).join('\n'):'');console.log(`MUCLUC-FLIGHT ${F.length?'FAIL':'PASS'} · ${F.length} issue(s)`);await b.close();process.exit(F.length?1:0)})();
