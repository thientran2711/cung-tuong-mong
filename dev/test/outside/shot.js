// Outside route (jkc) screenshot / probe: node dev/test/outside/shot.js <w> <h> <dpr> <out.png> [js evaluated after a new game] [js2 after]
// Needs zz-test.html at the repo root (dev/index.html with a <meta charset> wrapper; not committed).
const {chromium}=require('playwright');const path=require('path');const [,,W,H,D,OUT,JS,JS2]=process.argv;
const ROOT=path.resolve(__dirname,'../../..');const GAME='http://game.local/'+(process.env.GF||'zz-test.html');const fs=require('fs');
const MT={html:'text/html',js:'text/javascript',json:'application/json',webp:'image/webp',png:'image/png',jpg:'image/jpeg',mp3:'audio/mpeg',ogg:'audio/ogg',css:'text/css',svg:'image/svg+xml'};
async function serve(c){await c.route('http://game.local/**',r=>{const u=decodeURIComponent(new URL(r.request().url()).pathname);const f=path.join(ROOT,u);if(!f.startsWith(ROOT)||!fs.existsSync(f)||fs.statSync(f).isDirectory())return r.fulfill({status:404,body:''});r.fulfill({status:200,body:fs.readFileSync(f),contentType:MT[f.split('.').pop()]||'application/octet-stream'})})}
module.exports={serve,GAME};
(async()=>{const b=await chromium.launch();const c=await b.newContext({viewport:{width:+W,height:+H},deviceScaleFactor:+D,serviceWorkers:'block'});
 await serve(c);const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));p.on('console',m=>{if(m.type()==='error')errs.push('console: '+m.text().slice(0,200))});
 await p.goto(GAME,{waitUntil:'domcontentloaded'});await p.waitForTimeout(1200);await p.evaluate(()=>localStorage.clear());await p.reload({waitUntil:'domcontentloaded'});await p.waitForTimeout(1500);
 await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await p.waitForTimeout(1500);
 for(const js of [JS,JS2]){if(!js)continue;const r=await p.evaluate(js);if(r!==undefined)console.log('EVAL',JSON.stringify(r).slice(0,4000));await p.waitForTimeout(1200)}
 await p.evaluate(()=>{try{PX.app.ticker.stop()}catch(e){}});await p.waitForTimeout(300);await p.screenshot({path:OUT,timeout:30000}).catch(e=>console.log("SHOTFAIL"));
 const ovf=await p.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);
 console.log(JSON.stringify({errs:errs.slice(0,10),ovf}));await b.close()})().catch(e=>{console.error(e);process.exit(1)});
