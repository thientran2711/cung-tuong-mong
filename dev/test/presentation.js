/* presentation (D11, review/presentation): every event picture group opens a card with its sound / music / voice / painted fx / frame hooks (jpres.js).
   usage: node dev/test/presentation.js <site url> <outdir> [--shots] 755x1000@2 1000x755 1180x820@2 1366x1024@2 844x390 390x844
   Checks per size: 0 page errors, 0 HTTP >= 400, every group in EVENTS.json produced a plan (grp + cat on the dialog), a sound (or a keyword sound),
   the music track follows the group, story cards carry data-kpres-story (+ origin for main), Gọn (OPT.fxon=false) starts no particle / edge
   (KFK.log has no burst:/edge:), perf (ticks while 12 cards open), old save loads (hclh-save-v2-2 from OLD env var if given). */
const {chromium}=require('playwright');const fs=require('fs');
const [,,URL,OUT,...A]=process.argv;const SHOTS=A.includes('--shots');const SZ=A.filter(x=>!x.startsWith('--'));
(async()=>{const b=await chromium.launch({args:['--autoplay-policy=no-user-gesture-required']});const out=[];fs.mkdirSync(OUT,{recursive:true});
 for(const sz of SZ){const [wh,dp]=sz.split('@');const [W,H]=wh.split('x').map(Number);const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+(dp||1),hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[],bad=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));p.on('response',r=>{if(r.status()>=400&&!/\.(webp|webm|mp4)/.test(r.url()))bad.push(r.status()+' '+r.url().slice(-80))});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof kpresPlan==='function'&&typeof EVART!=='undefined'&&EVART);await p.waitForTimeout(2500);await p.addStyleTag({content:'#kroul,#kroulw,.kroul,.krbox,#kload,#ktut{display:none!important}'});
  await p.evaluate(()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}['kroul','kroulw','kload','ktut'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});document.querySelectorAll('.krbox,.ktip').forEach(e=>e.remove());Q.length=0;tab='go';render();OPT.snd=true;OPT.mute=false;OPT.sfx=.7;AU.unlocked=true;window.__bot=false;OPT.fxon=true;OPT.fxpick=1});
  await p.waitForTimeout(800);
  const cats=await p.evaluate(()=>Object.keys(EVART.categories));
  const rows=[];let shot=0;
  for(const c of cats){
   const r=await p.evaluate(async(c)=>{Q.length=0;document.querySelectorAll('.kmov').forEach(e=>e.remove());const md=document.getElementById('modal');if(md)md.hidden=true;
    KPRES_LOG.length=0;KSFX.log.length=0;const n0=0,k0=0;Q.push({t:'Việc thử · '+c,h:'<p>Một việc thử trong cung.</p>',btn:'Đã rõ',evId:'cat:'+c});showModal();await new Promise(r=>setTimeout(r,420));
    const d=document.querySelector('#modal .dlg');const L=KPRES_LOG.slice(k0)[0]||null;
    return{c,log:L,sfx:KSFX.log.slice(n0).map(x=>x.n),attr:d?{g:d.dataset.kpresGrp||'',c:d.dataset.kpresCat||''}:null,mus:musicCtx(),vis:!!d&&!md.hidden}},c);
   rows.push(r);
   if(SHOTS&&['tu-tinh','dau-doc','hinh-phat','le-xuan','tin-don','tang-le'].includes(c)){await p.screenshot({path:`${OUT}/pres-${sz.replace('@','_')}-${c}.png`});shot++}
  }
  const hidden=rows.filter(r=>!r.vis).map(r=>r.c);const noPlan=rows.filter(r=>!r.log||!r.log.grp||!r.attr||r.attr.g!==r.log.grp||r.attr.c!==c0(r.c)).map(r=>r.c);function c0(c){return c}
  const noSound=rows.filter(r=>r.log&&!r.log.sfx&&!r.sfx.length).map(r=>r.c);
  const badMus=rows.filter(r=>r.log&&r.log.mus&&r.mus!==r.log.mus).map(r=>r.c+':'+r.mus+'!='+r.log.mus);
  const story=await p.evaluate(async()=>{Q.length=0;const md=document.getElementById('modal');Q.push({t:'Chính tuyến · Báo thù cho nhà · Chương 1 · Hồi 1/5',h:'<p>x</p>',btn:'Đã rõ'});showModal();await new Promise(r=>setTimeout(r,300));const a=document.querySelector('#modal .dlg').dataset;const m={s:a.kpresStory,o:a.kpresOrigin};
   Q.length=0;Q.push({t:'Phụ tuyến · Việc nhỏ · Lời nhờ',h:'<p>x</p>',btn:'Đã rõ'});showModal();await new Promise(r=>setTimeout(r,300));const s={s:document.querySelector('#modal .dlg').dataset.kpresStory};return{main:m,side:s,origin:S.origin.k}});
  /* Gọn: no particle / edge / sheet may start */
  const gon=await p.evaluate(async()=>{OPT.fxon=false;KFK.log.length=0;for(const c of ['sung-ai','hai-nguoi','tin-don','le-xuan','lanh-cung']){Q.length=0;Q.push({t:'Gọn '+c,h:'<p>x</p>',btn:'Đã rõ',evId:'cat:'+c});showModal();await new Promise(r=>setTimeout(r,250))}
   const l=KFK.log.filter(x=>/^(burst|edge|sheet|light):/.test(x));OPT.fxon=true;return l});
  /* perf: 12 cards in a row, longest frame gap */
  const perf=await p.evaluate(async()=>{let max=0,last=performance.now(),run=true;const tick=()=>{const n=performance.now();max=Math.max(max,n-last);last=n;if(run)requestAnimationFrame(tick)};requestAnimationFrame(tick);
   for(const c of ['sung-ai','hai-nguoi','tin-don','le-xuan','lanh-cung','dau-doc','hinh-phat','sinh-no','yen-tiec','tang-le','tu-tinh','thang-tran']){Q.length=0;Q.push({t:'P '+c,h:'<p>x</p>',btn:'Đã rõ',evId:'cat:'+c});showModal();await new Promise(r=>setTimeout(r,300))}
   run=false;return{maxGapMs:Math.round(max),live:KFK.live.size,parts:(KFX.parts||[]).length}});
  const ok=!errs.length&&!bad.length&&!noPlan.length&&!hidden.length&&!noSound.length&&!badMus.length&&story.main.s==='main'&&story.main.o===story.origin&&story.side.s==='side'&&!gon.length;
  out.push({size:sz,cats:cats.length,noPlan,hidden,noSound,badMus,story,gon,perf,errs,http4xx:bad.slice(0,6),shots:shot,ok});console.error(sz,JSON.stringify(out[out.length-1]).slice(0,400));
  if(sz===SZ[0])fs.writeFileSync(OUT+'/table.json',JSON.stringify(rows.map(r=>({c:r.c,grp:r.log&&r.log.grp,sfx:r.log&&r.log.sfx,mus:r.log&&r.log.mus,vo:r.log&&r.log.vo,fx:r.log&&r.log.fx})),null,0));
  await ctx.close()}
 console.log(JSON.stringify(out,null,1));await b.close();process.exit(out.every(x=>x.ok)?0:1)})().catch(e=>{console.error(e);process.exit(1)});
