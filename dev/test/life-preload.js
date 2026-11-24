/* NOTE: CDP throttling does not reach service-worker fetches: run WITHOUT SW=1 for timings (core set is fetched unthrottled first, then the line is slowed).
   review/life-preload: entering a life on a slow line must never show an empty picture box (owner OD 18/11 ~01:50Z).
   usage: node dev/test/life-preload.js <outdir> [device,...] [mbps]   (serves the BUILT repo root; HOST mode; SW blocked = nothing cached = a fresh phone)
   Per device: open the title, throttle the line, start a new life the real way (identity card → Nhận thân phận), then sample the screen every 250 ms
   for 12 s: blank = a visible <img> (>= 24 px) that has not finished loading, or one shown as the old fallback face while its portrait is still on the way.
   Prints the gate time, life-set size, and the blank samples; shots <outdir>/<dev>-*.png. */
const {chromium}=require('playwright');const fs=require('fs');const D=require('./lib/device');
const [,,OUT='/tmp/lp',DEVS='fold,ipadAir',MBPS='5']=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot(process.env.ROOT);const b=await chromium.launch();const R={};
 for(const dev of DEVS.split(',')){const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:process.env.SW?'allow':'block'});const p=await ctx.newPage();await require('./lib/veil').guard(p);const errs=[],e404=[];
  p.on('pageerror',e=>errs.push(e.message));p.on('response',r=>{if(r.status()===404)e404.push(r.url().split('/').slice(-2).join('/'))});
  let game=await D.openHost(p,srv.url);
  /* iPad / iPhone Safari: the choose-first notice (KIT 35.1) → play here */
  for(let k=0;k<40;k++){const ph=await game.evaluate(()=>window.KLOAD&&KLOAD.phase).catch(()=>null);if(ph==='ask'){await game.evaluate(()=>{const b=document.querySelector('[data-kl="web"]');if(b)b.click()});break}if(ph&&ph!=='check')break;await sleep(500)}
  await game.waitForFunction(new Function('return typeof start==="function"&&window.KLOAD&&('+"['done','all','skipped'].includes(KLOAD.phase)&&!document.getElementById('kload')"+')'),null,{timeout:600000});
  await game.evaluate(()=>{const k=document.getElementById('kload');if(k&&window.KLOAD&&KLOAD.phase==='core'){/* the first-entry set is not this test */k.querySelector('[data-kl]')||0}});
  await sleep(1500);
  if(process.env.CONT){await game.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;try{quiet=false}catch(e){}render();save()});await sleep(6000);
   await game.evaluate(async()=>{const m=await (await fetch('assets.json')).json();const core=new Set(m.files.filter(f=>f[3]==='core').map(f=>f[0]));const c=await caches.open('ctm-assets');
    for(const q of await c.keys()){const pth=decodeURIComponent(new URL(q.url).pathname).replace(/^.*?(img\/)/,'img/');if(!core.has(pth))await c.delete(q)}});
   game=await D.openHost(p,srv.url);await game.waitForFunction(()=>typeof start==='function'&&window.KLOAD&&['done','all','skipped'].includes(KLOAD.phase)&&!document.getElementById('kload'),null,{timeout:300000});await sleep(1500)}
  const cdp=await ctx.newCDPSession(p);await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:80,downloadThroughput:(+MBPS)*1e6/8,uploadThroughput:1e6/8});
  const t0=Date.now();
  if(process.env.CONT){/* title "Tiếp tục" = data-tgo="slots" (the old data-tgo="cont" is gone): open the sổ list, then the slot's data-load button */await game.evaluate(()=>{const b=document.querySelector('#modal .kpmenu [data-tgo="slots"]');if(b)b.click();else throw new Error('no Tiếp tục')});await game.waitForSelector('#modal [data-load]',{timeout:15000});await game.evaluate(()=>document.querySelector('#modal [data-load]').click())}else await game.evaluate(()=>{const k=document.getElementById('kload');if(k&&KLOAD.phase==='core')k.remove();SLOT=3;document.getElementById('title').hidden=true;start()});
  if(process.env.GOEARLY)setTimeout(()=>game.evaluate(()=>{if(window.KLIFE){KLIFE.go=true;KLIFE.off=true}}).catch(()=>0),+process.env.GOEARLY);
  const samples=[];let shot=0;const steps=(process.env.STEPS!=null?process.env.STEPS:process.env.CONT?'':'Tiếp|Bỏ qua|Nhận thân phận|@closeQ|Hậu cung|Giao tình|Dư đồ|Tư trang|Hành sự').split('|').filter(Boolean);const phases=[];
  const sample=async tag=>{const s=await game.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();if(r.width<24||r.height<24||r.bottom<0||r.top>innerHeight)return false;let n=e;while(n&&n.nodeType===1){const cs=getComputedStyle(n);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)return false;n=n.parentElement}return true};
    const top=document.elementFromPoint(innerWidth/2,innerHeight/2);const cover=top&&top.closest&&top.closest('#kload,#klife');if(cover)return{cover:cover.id};
    const seen=im=>{const r=im.getBoundingClientRect();const t=document.elementFromPoint(Math.min(innerWidth-1,Math.max(0,r.left+r.width/2)),Math.min(innerHeight-1,Math.max(0,r.top+r.height/2)));return !!t&&(t===im||(im.parentElement&&im.parentElement.contains(t)))};
    const inc=[...document.images].filter(im=>vis(im)&&seen(im)&&im.getAttribute('src')&&!(im.complete&&im.naturalWidth));const bl=inc.filter(im=>!im.hasAttribute('data-kwait')).map(im=>(im.getAttribute('src')||'').split('/').pop().slice(0,40));
    /* A: an unfinished full-body figure on the page (not on an off page) with no box / hidden = a person that is simply missing while the picture loads (must show the §59.1 silhouette) */
    const stg=document.getElementById('stage');const stOn=!!stg&&(()=>{const r=stg.getBoundingClientRect();const t=document.elementFromPoint(Math.min(innerWidth-1,r.left+r.width/2),Math.min(innerHeight-1,r.top+r.height/2));return !!t&&stg.contains(t)})();/* a stage covered by a tab panel / dialog is not on screen */
    const nb=!stOn?[]:[...document.images].filter(im=>/\/fig-/.test(im.getAttribute('src')||'')&&!(im.complete&&im.naturalWidth)&&(()=>{let n=im,h=false;while(n&&n.nodeType===1){const cs=getComputedStyle(n);if(cs.display==='none')return false;if(cs.visibility==='hidden'||+cs.opacity===0)h=true;n=n.parentElement}const r=im.getBoundingClientRect();return h||r.width<12||r.height<12})()).map(im=>(im.getAttribute('src')||'').split('/').pop().slice(0,28));
    return{cover:false,blank:bl.length,wait:inc.length-bl.length,nobox:nb.length,which:bl.slice(0,6),nbWhich:nb.slice(0,4)}});s.tag=tag;samples.push(s);return s};
  for(let st=0;st<=steps.length;st++){const tag=st?steps[st-1]:'start';const t1=Date.now();let open=null,calm=0;
   for(let i=0;i<(+process.env.MAXS||120);i++){await sleep(250);const s=await sample(tag);if(!s.cover&&open==null)open=Date.now()-t1;
    if(!s.cover&&(s.blank||s.wait)&&shot<6){await p.screenshot({path:`${OUT}/${dev}-blank-${shot}.png`});shot++}
    if(!s.cover&&!s.blank&&!s.wait){if(++calm>=6)break}else calm=0}
   await p.screenshot({path:`${OUT}/${dev}-${st}.png`});phases.push({tag,openMs:open});
   if(st<steps.length){let ok=false;for(let k=0;k<60&&!ok;k++){if(k)await sleep(250);ok=await game.evaluate(t=>{if(t==='@closeQ'){try{Q.length=0;showModal();render()}catch(e){}return true}const b=[...document.querySelectorAll('button,.kbtn')].find(x=>x.offsetParent&&!x.disabled&&x.textContent.trim().startsWith(t));if(b){b.click();return true}return false},steps[st])}if(!ok){phases.push({tag:'no button '+steps[st]});break}}}
    R[dev]={phases,elapsedMs:Date.now()-t0,blankSamples:samples.filter(x=>!x.cover&&x.blank).length,waitSamples:samples.filter(x=>!x.cover&&x.wait).length,noboxSamples:samples.filter(x=>!x.cover&&x.nobox).length,noboxWorst:samples.filter(x=>!x.cover).sort((a,b)=>(b.nobox||0)-(a.nobox||0))[0],worst:samples.filter(x=>!x.cover).sort((a,b)=>b.blank-a.blank)[0],
   gates:await game.evaluate(()=>(window.KLOAD&&KLOAD.lifes||[]).map(g=>({why:g.why,n:g.n,mb:+(g.bytes/1e6).toFixed(2),ms:g.ms,late:g.late}))),
   e404:[...new Set(e404)].slice(0,8),n404:e404.length,errs:errs.slice(0,5)};
  await p.screenshot({path:`${OUT}/${dev}-end.png`});console.log(dev,JSON.stringify(R[dev]));await ctx.close()}
 fs.writeFileSync(OUT+'/life-preload.json',JSON.stringify(R,null,1));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(1)});
