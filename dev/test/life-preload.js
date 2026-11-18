/* review/life-preload: entering a life on a slow line must never show an empty picture box (owner OD 18/11 ~01:50Z).
   usage: node dev/test/life-preload.js <outdir> [device,...] [mbps]   (serves the BUILT repo root; HOST mode; SW blocked = nothing cached = a fresh phone)
   Per device: open the title, throttle the line, start a new life the real way (identity card → Nhận thân phận), then sample the screen every 250 ms
   for 12 s: blank = a visible <img> (>= 24 px) that has not finished loading, or one shown as the old fallback face while its portrait is still on the way.
   Prints the gate time, life-set size, and the blank samples; shots <outdir>/<dev>-*.png. */
const {chromium}=require('playwright');const fs=require('fs');const D=require('./lib/device');
const [,,OUT='/tmp/lp',DEVS='fold,ipadAir',MBPS='5']=process.argv;fs.mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const R={};
 for(const dev of DEVS.split(',')){const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:process.env.SW?'allow':'block'});const p=await ctx.newPage();const errs=[],e404=[];
  p.on('pageerror',e=>errs.push(e.message));p.on('response',r=>{if(r.status()===404)e404.push(r.url().split('/').slice(-2).join('/'))});
  const game=await D.openHost(p,srv.url);
  await game.waitForFunction(new Function('return typeof start==="function"&&window.KLOAD&&('+(process.env.SW?"['done','all','skipped'].includes(KLOAD.phase)&&!document.getElementById('kload')":"KLOAD.phase!=='check'")+')'),null,{timeout:600000});
  await game.evaluate(()=>{const k=document.getElementById('kload');if(k&&window.KLOAD&&KLOAD.phase==='core'){/* the first-entry set is not this test */k.querySelector('[data-kl]')||0}});
  await sleep(1500);
  const cdp=await ctx.newCDPSession(p);await cdp.send('Network.enable');
  await cdp.send('Network.emulateNetworkConditions',{offline:false,latency:80,downloadThroughput:(+MBPS)*1e6/8,uploadThroughput:1e6/8});
  const t0=Date.now();
  await game.evaluate(()=>{const k=document.getElementById('kload');if(k&&KLOAD.phase==='core')k.remove();SLOT=3;document.getElementById('title').hidden=true;start()});
  const samples=[];let shot=0;const steps=(process.env.STEPS||'Tiếp|Bỏ qua|Nhận thân phận').split('|');const phases=[];
  const sample=async tag=>{const s=await game.evaluate(()=>{const vis=e=>{const r=e.getBoundingClientRect();if(r.width<24||r.height<24||r.bottom<0||r.top>innerHeight)return false;let n=e;while(n&&n.nodeType===1){const cs=getComputedStyle(n);if(cs.display==='none'||cs.visibility==='hidden'||+cs.opacity===0)return false;n=n.parentElement}return true};
    const top=document.elementFromPoint(innerWidth/2,innerHeight/2);const cover=top&&top.closest&&top.closest('#kload,#klife');if(cover)return{cover:cover.id};
    const seen=im=>{const r=im.getBoundingClientRect();const t=document.elementFromPoint(Math.min(innerWidth-1,Math.max(0,r.left+r.width/2)),Math.min(innerHeight-1,Math.max(0,r.top+r.height/2)));return !!t&&(t===im||(im.parentElement&&im.parentElement.contains(t)))};
    const bl=[...document.images].filter(im=>vis(im)&&seen(im)&&im.getAttribute('src')&&!(im.complete&&im.naturalWidth)).map(im=>(im.getAttribute('src')||'').split('/').pop().slice(0,40));
    return{cover:false,blank:bl.length,which:bl.slice(0,6)}});s.tag=tag;samples.push(s);return s};
  for(let st=0;st<=steps.length;st++){const tag=st?steps[st-1]:'start';const t1=Date.now();let open=null,calm=0;
   for(let i=0;i<240;i++){await sleep(250);const s=await sample(tag);if(!s.cover&&open==null)open=Date.now()-t1;
    if(!s.cover&&s.blank&&shot<6){await p.screenshot({path:`${OUT}/${dev}-blank-${shot}.png`});shot++}
    if(!s.cover&&!s.blank){if(++calm>=6)break}else calm=0}
   await p.screenshot({path:`${OUT}/${dev}-${st}.png`});phases.push({tag,openMs:open});
   if(st<steps.length){let ok=false;for(let k=0;k<60&&!ok;k++){if(k)await sleep(250);ok=await game.evaluate(t=>{const b=[...document.querySelectorAll('button,.kbtn')].find(x=>x.offsetParent&&!x.disabled&&x.textContent.trim().startsWith(t));if(b){b.click();return true}return false},steps[st])}if(!ok){phases.push({tag:'no button '+steps[st]});break}}}
    R[dev]={phases,elapsedMs:Date.now()-t0,blankSamples:samples.filter(x=>!x.cover&&x.blank).length,worst:samples.filter(x=>!x.cover).sort((a,b)=>b.blank-a.blank)[0],
   gates:await game.evaluate(()=>(window.KLOAD&&KLOAD.lifes||[]).map(g=>({why:g.why,n:g.n,mb:+(g.bytes/1e6).toFixed(2),ms:g.ms,late:g.late}))),
   e404:[...new Set(e404)].slice(0,8),n404:e404.length,errs:errs.slice(0,5)};
  await p.screenshot({path:`${OUT}/${dev}-end.png`});console.log(dev,JSON.stringify(R[dev]));await ctx.close()}
 fs.writeFileSync(OUT+'/life-preload.json',JSON.stringify(R,null,1));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(1)});
