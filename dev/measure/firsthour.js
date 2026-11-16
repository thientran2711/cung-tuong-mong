/* Records the "first hour" file list (dev/site/first-hour.txt, read by dev/site/assets.py): every img/ + audio/ file the BUILT game requests while a few
   lives play 3 weeks (every tab, a walk to a random place each buổi, a random choice in every dialog), on several device profiles, HOST mode, SW + jload off
   so only what the game itself asks for is seen. Union with the existing list (a file once needed stays core). Run again when new first-hour art lands.
   Lives cycle through EVERY origin (window.__forceOrigin, ORIGINS incl. the cung nữ servant road 'cnv'; review/perf-r1: random lives left whole roads uncovered).
   usage: node dev/measure/firsthour.js [devices=fold,ipadAir,iphone14Land] [lives=0 (= one per origin)] [weeks=3]   (needs the CDN; ONE Chromium; ~4 min per 9 lives) */
const {chromium}=require('playwright');const D=require('../test/lib/device');const fs=require('fs'),path=require('path');
const DEVS=(process.argv[2]||'fold,ipadAir,iphone14Land').split(','),LIVES=+(process.argv[3]||0),WEEKS=+(process.argv[4]||3);
const OUT=path.join(__dirname,'../site/first-hour.txt');
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch({proxy:process.env.HTTPS_PROXY?{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}:undefined});
 const seen=new Set();try{for(const l of fs.readFileSync(OUT,'utf8').split('\n'))if(l&&!l.startsWith('#'))seen.add(l)}catch(e){}
 const n0=seen.size;
 let nO=LIVES,L0=0;
 for(const dev of DEVS)for(let L=0;L<nO||!nO;L++){
  const ctx=await D.newDeviceContext(b,dev,{serviceWorkers:'block'});
  await ctx.addInitScript(()=>{Object.defineProperty(window,'caches',{get(){return undefined},configurable:true})});   /* jload.js off: no bulk download */
  ctx.on('response',r=>{const u=r.url();if(/ctm-img|127\.0\.0\.1/.test(u)&&/\/(img|audio)\//.test(u)){const k=u.replace(/^https?:\/\/[^/]+\//,'').replace(/\?.*$/,'');if(!/\.json$/.test(k))seen.add(k)}});
  const p=await ctx.newPage();p.setDefaultTimeout(120000);const game=await D.openHost(p,srv.url);await p.waitForTimeout(2500);
  const OR=await game.evaluate(()=>[...new Set(ORIGINS.map(o=>o.k))]);if(!nO)nO=OR.length;const want=OR[(L0++)%OR.length];
  const R=await game.evaluate(async([weeks,want])=>{const out={buoi:0,tuan:0};const sl=t=>new Promise(r=>setTimeout(r,t));
   try{SLOT=3;document.getElementById('title').hidden=true;window.__forceOrigin=want;start();out.origin=S.origin.k;Q.length=0;render();
   const e0=endTurn;endTurn=function(){out.tuan++;return e0.apply(this,arguments)};
   const drain=async()=>{for(let j=0;j<12&&Q.length&&!S.dead;j++){const m=Q[0];try{if(m.opts&&m.opts.length){chooseM(Math.floor(Math.random()*m.opts.length))}else closeModal()}catch(e){Q.shift();try{showModal()}catch(e){}}await sl(100)}
    for(const x of [...document.querySelectorAll('#ov,#modal')].filter(x=>!x.hidden)){const bt=[...x.querySelectorAll('button')].find(b=>b.offsetParent&&!b.disabled);if(bt){bt.click();await sl(100)}}};
   for(let i=0;i<weeks*30&&out.tuan<weeks&&!S.dead;i++){await drain();if(Q.length){Q.length=0;render()}
    for(const t of [...document.querySelectorAll('#tabs [data-tab]')].filter(b=>b.offsetParent)){t.click();await sl(100)}
    try{const Lp=places().filter(p=>p.k&&p.k!==S.place);const pl=Lp[Math.floor(Math.random()*Lp.length)];if(pl){goTo(pl.k);await sl(300);await drain()}}catch(e){}
    try{goTo('home')}catch(e){}await drain();
    const n=document.getElementById('next');if(n&&!n.disabled){n.click();out.buoi++}else{try{Q.length=0;endTurn()}catch(e){}}await sl(300)}
   }catch(e){out.err=String(e)}return out},[WEEKS,want]);
  console.log(dev,L,JSON.stringify(R),'distinct',seen.size);await ctx.close()}
 await b.close();srv.close();
 fs.writeFileSync(OUT,'# first-hour files (dev/measure/firsthour.js): img/ + audio/ requested by real lives in the first 3 weeks; assets.py makes these group core\n'+[...seen].sort().join('\n')+'\n');
 console.log('first-hour.txt:',seen.size,'files (was',n0+')')})().catch(e=>{console.error(e);process.exit(1)});
