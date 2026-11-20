/* review/life-preload: every picture of a life's FIRST SCREEN (img src + CSS background-image of visible elements) with its assets.json group.
   usage: node dev/test/first-screen-groups.js <out.json> [device] [origins comma list]   (HOST mode, built root; new life via the inner start, each origin)
   A UI icon / frame in 'lazy' or 'fig' = it is not in the core set → a fresh phone waits for it after the loading screen. */
const {chromium}=require('playwright');const fs=require('fs');const D=require('./lib/device');
const [,,OUT='/tmp/fsg.json',DEV='fold',ORIG='']=process.argv;
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const ctx=await D.newDeviceContext(b,DEV);const p=await ctx.newPage();
 const game=await D.openHost(p,srv.url);await game.waitForFunction(()=>typeof start==='function'&&typeof FIGS!=='undefined'&&FIGS.length,null,{timeout:180000});
 const man=JSON.parse(fs.readFileSync(require('path').join(__dirname,'../../assets.json')));const G=new Map(man.files.map(f=>[f[0],f[3]]));
 const origins=ORIG?ORIG.split(','):await game.evaluate(()=>(typeof ORIGINS!=='undefined'?ORIGINS:[]).map(o=>o.k).slice(0,12));
 const R={};for(const o of origins.length?origins:['']){
  const urls=await game.evaluate(async o=>{if(o)window.__forceOrigin=o;SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;try{quiet=false}catch(e){}render();
   await new Promise(r=>setTimeout(r,1500));const U=new Set();const W=innerWidth,H=innerHeight;
   for(const e of document.querySelectorAll('body *')){const r=e.getBoundingClientRect();if(!r.width||!r.height||r.bottom<0||r.top>H||r.right<0||r.left>W)continue;
    if(e.closest('#klife,#kload,#title'))continue;if(e.tagName==='IMG'&&e.getAttribute('src'))U.add(e.currentSrc||e.src);
    const bg=getComputedStyle(e).backgroundImage;if(bg&&bg!=='none')for(const m of bg.matchAll(/url\("?([^")]+)"?\)/g))U.add(m[1])}
   return [...U].filter(u=>!/^data:/.test(u))},o);
  const rows=urls.map(u=>{const m=/img\/[^?#]*/.exec(decodeURIComponent(u));const k=m?m[0]:u;return[k,G.get(k)||'?']});
  R[o||'default']={n:rows.length,byGroup:rows.reduce((a,[k,g])=>(a[g]=(a[g]||0)+1,a),{}),notCore:rows.filter(r=>r[1]!=='core').map(r=>r.join(' '))};
  console.log(o,JSON.stringify(R[o||'default'].byGroup))}
 fs.writeFileSync(OUT,JSON.stringify(R,null,1));await b.close();srv.close()})().catch(e=>{console.error(e);process.exit(1)});
