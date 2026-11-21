/* ui-tour-states shared helpers: serve the built site from disk via Playwright routes (no local server), open a page at a device size,
   start a seeded life (Con gái Tể tướng road), helpers to close modals and shoot. Read-only: no game code is changed. */
const {chromium}=require('playwright');const fs=require('fs');const path=require('path');
const ROOT=path.resolve(__dirname,'../../..');const HOST='http://ctm.local/';
const MIME={'.html':'text/html','.js':'application/javascript','.css':'text/css','.json':'application/json','.webp':'image/webp','.png':'image/png','.jpg':'image/jpeg','.svg':'image/svg+xml','.mp3':'audio/mpeg','.woff2':'font/woff2','.txt':'text/plain','.webmanifest':'application/manifest+json'};
async function openPage(b,W,H,o){o=o||{};
 const ctx=await b.newContext({viewport:{width:W,height:H},hasTouch:true,isMobile:W<1100,deviceScaleFactor:1,reducedMotion:'reduce',serviceWorkers:'block'});
 if(o.seed)await ctx.addInitScript(`(()=>{let sd=${o.seed};Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646}})()`);
 if(o.init)await ctx.addInitScript(o.init);
 await ctx.addInitScript(()=>{setInterval(()=>{document.querySelectorAll(".krskip").forEach(b=>b.click())},300)});
 await ctx.route(HOST+'**',r=>{let u=new URL(r.request().url()).pathname;if(u.endsWith('/'))u+='index.html';const f=path.join(ROOT,decodeURIComponent(u));
  if(u.endsWith('/assets.json'))return r.fulfill({status:404,body:''});
  if(fs.existsSync(f)&&fs.statSync(f).isFile())return r.fulfill({path:f,contentType:MIME[path.extname(f)]||'application/octet-stream'});return r.fulfill({status:404,body:''})});
 const p=await ctx.newPage();p.setDefaultTimeout(120000);p.errs=[];p.on('pageerror',e=>p.errs.push(e.message.slice(0,200)));
 await p.goto(HOST,{waitUntil:'domcontentloaded'});
 return {ctx,p};
}
/* the game may run inside the host frame #krotf; return the frame that has start() */
async function gameFrame(p){for(let i=0;i<120;i++){for(const f of p.frames()){try{if(await f.evaluate(()=>typeof start==='function'))return f}catch(e){}}await p.waitForTimeout(500)}throw new Error('no game frame')}
module.exports={chromium,openPage,gameFrame,ROOT};
