/* kit-stage-r4-video.js — KIT-STAGE-R4 owner look videos (OD 26/11 ~18:55Z / ~19:00Z; MAIN 162: r3 videos started half-loaded and showed the boot notice).
   Every video starts AFTER full load with the boot notices («Điều mới trong cung» …) closed: the recording is cut at the moment the game is ready (ffmpeg -ss).
   REAL taps only (touch on Fold, mouse on iPad), ≤ 30 s.  Setup that the owner does not see (start, fire the event, put the visit line) runs in page code.
   flows: banbai  = rg c1b event choice as Bàn bài (deal → tap card → lift → ✕ → tap another → ✓)
          pcard   = Hậu cung tab › Chí tôn › Hoàng thượng card: acts as thẻ gỗ beside the portrait (§98.12) → tap plaque → ✕ → tap another → ✓ … then the
                    stage person card (#popw, Mộc Cận) plaques → ✓ (talk runs)
          theo    = the visit line «… vừa rời đi» → «Theo đến» plaque on the stage (§98.13) → tap → ✓ (the follow path opens «Chọn người theo hầu»)
   usage: node dev/test/kit-stage-r4-video.js <index.html> <outdir>  [ONLY=banbai,pcard,theo] → <outdir>/{fold,ipad}-<flow>.mp4 + step shots. Never in git. */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),cp=require('child_process');const [,,SRC,OUT]=process.argv;fs.mkdirSync(OUT,{recursive:true});
const DEV=[["fold",755,1000],["ipad",1180,820]];
(async()=>{const px=process.env.HTTPS_PROXY;const b=await chromium.launch(px?{proxy:{server:px,bypass:'127.0.0.1,localhost'}}:{});const html=fs.readFileSync(SRC);const R={};
 for(const [dn,W,H] of DEV)for(const vid of (process.env.ONLY||'banbai,pcard,theo').split(',')){const touch=W<1100;
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:1,hasTouch:touch,isMobile:touch,serviceWorkers:'block',ignoreHTTPSErrors:true,recordVideo:{dir:OUT,size:{width:W,height:H}}});const T0=Date.now();
  await ctx.addInitScript(()=>{window.__bot=1;window.__kpcard=1;let s=777;Math.random=()=>{s=(s*1664525+1013904223)%4294967296;return s/4294967296}});
  await ctx.route('http://ctm.test/**',r=>r.fulfill({status:200,body:html,contentType:'text/html; charset=utf-8'}));
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>{if(!/Unexpected token '<'/.test(String(e)))errs.push(String(e).slice(0,160))});const L=[];
  const shot=async n=>{L.push(n);await p.screenshot({path:path.join(OUT,`${dn}-${vid}-${String(L.length).padStart(2,'0')}.png`)})};
  const tapEl=async(sel,i=0)=>{const r=await p.evaluate(([s,i])=>{const e=[...document.querySelectorAll(s)].filter(x=>x.getClientRects().length&&!x.disabled)[i];if(!e)return null;e.scrollIntoView({block:'nearest'});const q=e.getBoundingClientRect();return {x:q.left+q.width/2,y:q.top+Math.min(q.height/2,40)}},[sel,i]);if(!r)return false;if(touch)await p.touchscreen.tap(r.x,r.y);else await p.mouse.click(r.x,r.y);return true};
  const tapText=async t=>{const r=await p.evaluate(t=>{const e=[...document.querySelectorAll('button')].find(x=>x.getClientRects().length&&x.textContent.trim()===t);if(!e)return null;const q=e.getBoundingClientRect();return {x:q.left+q.width/2,y:q.top+q.height/2}},t);if(!r)return false;if(touch)await p.touchscreen.tap(r.x,r.y);else await p.mouse.click(r.x,r.y);return true};
  await p.goto('http://ctm.test/index.html',{waitUntil:'domcontentloaded',timeout:120000});
  await p.waitForFunction(()=>typeof start==='function'&&typeof kitPick!=='undefined'&&typeof kitPcard!=='undefined',null,{timeout:120000});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;for(const e of [...document.body.querySelectorAll('*')]){const cs=getComputedStyle(e);if(cs.position==='fixed'&&/Luân hồi/.test(e.textContent||''))e.remove()}document.getElementById('modal').hidden=true;render()});
  await p.waitForFunction(()=>!/Sửa soạn nhập cung/.test(document.body.innerText),null,{timeout:90000}).catch(()=>{});
  await p.addStyleTag({content:'#dawn,.kroul,.kmbox,.kne,[class*=kmrew],#kxcatch,.kmov,#kroulw,#kdaytc,#klife{display:none!important}'});
  /* boot notices: close every open notice (its own ✕) until none is left, then wait for every picture on screen to finish loading */
  for(let k=0,quiet=0;k<30&&quiet<8;k++){const open=await p.evaluate(()=>!document.getElementById('modal').hidden);if(!open){quiet++;await p.waitForTimeout(500);continue}quiet=0;await p.evaluate(()=>{const x=document.querySelector('#modal .kit-x,#modal [aria-label="Đóng"]');if(x)x.click();else{Q.length=0;document.getElementById('modal').hidden=true}});await p.waitForTimeout(500)}
  await p.waitForFunction(()=>[...document.images].filter(i=>i.getClientRects().length).every(i=>i.complete),null,{timeout:30000}).catch(()=>{});await p.waitForTimeout(1500);
  const o={boot:await p.evaluate(()=>document.getElementById('modal').hidden?'closed':document.getElementById('modal').textContent.slice(0,40))};const CUT=(Date.now()-T0)/1000;
  if(vid==='banbai'){o.fired=await p.evaluate(()=>{for(let k=0;k<4;k++){Q.length=0;document.getElementById('modal').hidden=true;if((()=>{try{S.evc=null;EVCW.length=0}catch(e){}/* clean day: LIVE jevc daily cap */return rgFire('c1b')})()){Q.length=1;showModal();return true}}return false});
   await p.waitForTimeout(2800);await shot('dealt');await tapEl('#modal .opts.khand>button.kopt',0);await p.waitForTimeout(1600);await shot('lift 1');o.lift1=await p.evaluate(()=>!!document.querySelector('#modal .opts.khand>button.klift'));
   await tapEl('#modal .dlg>.khconf>.khno');await p.waitForTimeout(1200);await tapEl('#modal .opts.khand>button.kopt',1);await p.waitForTimeout(1600);await shot('lift 2');
   await tapEl('#modal .dlg>.khconf>.khok');await p.waitForTimeout(2800);await shot('chosen');o.chose=await p.evaluate(()=>!Q.length||!Q[0]||Q[0].pid!=='rg')}
  else if(vid==='pcard'){await tapEl('#tokens .tok',0);await p.waitForTimeout(2600);await shot('stage card plaques');o.pw=await p.evaluate(()=>[...document.querySelectorAll('#popw .kpk .kfoc-b')].map(b=>b.textContent.replace(/\s+/g,' ').trim().slice(0,24)));
   await tapEl('#popw .kpk .kfoc-b',1);await p.waitForTimeout(1500);await shot('lift');await tapEl('#popw .kpk .khconf:not([hidden]) .khno');await p.waitForTimeout(900);
   await tapEl('#popw .kpk .kfoc-b',0);await p.waitForTimeout(1500);await tapEl('#popw .kpk .khconf:not([hidden]) .khok');await p.waitForTimeout(2600);await shot('chosen');o.done=await p.evaluate(()=>/đã nói chuyện/.test(document.getElementById('popw').textContent));
   await tapEl('#popx');await p.waitForTimeout(1000);await tapText('Hậu cung');await p.waitForTimeout(2600);await shot('hc card plaques');o.hc=await p.evaluate(()=>[...document.querySelectorAll('#panel .kpk .kfoc-b')].map(b=>b.textContent.replace(/\s+/g,' ').trim().slice(0,24)));
   await tapEl('#panel .kpk .kfoc-b',0);await p.waitForTimeout(1500);await shot('lift');await tapEl('#panel .kpk .khconf:not([hidden]) .khno');await p.waitForTimeout(900);await tapEl('#panel .kpk .kfoc-b',4);await p.waitForTimeout(1500);await shot('lift gift');await p.waitForTimeout(800)}
  else{o.line=await p.evaluate(()=>{const v=rivals.find(x=>whereOf(x)!==S.place)||rivals[0];if(!S.visit)S.visit={};const now=whereOf(v);S.visit.msg=`${v.name} vừa rời đi, sang ${placeName(now)}. <button class="btn" data-follow="${v.id}">Theo đến<small>${travel(S.place,now)} khắc</small></button>`;popIdx=null;render();return v.name});
   await p.waitForTimeout(2800);await shot('theo plaque');await tapEl('#stage .kpk .kfoc-b',0);await p.waitForTimeout(1600);await shot('lift');await tapEl('#stage .kpk .khconf:not([hidden]) .khok');await p.waitForTimeout(2600);await shot('follow');o.follow=await p.evaluate(()=>!document.getElementById('modal').hidden)}
  o.errs=errs;R[dn+'-'+vid]=o;await p.waitForTimeout(600);await ctx.close();const v=await p.video().path();const mp4=path.join(OUT,`${dn}-${vid}.mp4`);
  cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',String(CUT),'-i',v,'-t','30','-c:v','libx264','-pix_fmt','yuv420p','-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2',mp4]);fs.unlinkSync(v);o.cut=CUT}
 console.log(JSON.stringify(R,null,1));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
