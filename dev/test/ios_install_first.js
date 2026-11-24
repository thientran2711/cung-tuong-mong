/* review/ios-install-first test: iPad Safari (non-standalone) must ask BEFORE any download; standalone / Android / desktop download as before.
   usage: node dev/test/ios_install_first.js [shotdir]   (serves the repo root on a local port) */
const {chromium}=require("playwright"),http=require("http"),fs=require("fs"),path=require("path");
const ROOT=path.resolve(__dirname,"../.."),SHOTS=process.argv[2]||"/tmp/iosshots";fs.mkdirSync(SHOTS,{recursive:true});
const MIME={".html":"text/html",".js":"text/javascript",".json":"application/json",".webmanifest":"application/json",".webp":"image/webp",".png":"image/png",".mp3":"audio/mpeg",".css":"text/css"};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split("?")[0]);if(p.endsWith("/"))p+="index.html";const f=path.join(ROOT,p);
 fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{"content-type":MIME[path.extname(f)]||"application/octet-stream"});r.end(b)})});
const IPAD_UA="Mozilla/5.0 (Macintosh; Intel Mac OS X 10_15_7) AppleWebKit/605.1.15 (KHTML, like Gecko) Version/17.4 Safari/605.1.15";
const FOLD_UA="Mozilla/5.0 (Linux; Android 14; SM-F946B) AppleWebKit/537.36 (KHTML, like Gecko) Chrome/124.0 Mobile Safari/537.36";
let fails=0;const ok=(c,m)=>{console.log((c?"PASS ":"FAIL ")+m);if(!c)fails++};
(async()=>{await new Promise(r=>srv.listen(0,r));const base="http://localhost:"+srv.address().port+"/";
 const br=await chromium.launch();
 async function run(name,o,fn){const ctx=await br.newContext({userAgent:o.ua,viewport:o.vp,deviceScaleFactor:o.dsf||1,hasTouch:true,serviceWorkers:"allow"});
  await ctx.addInitScript(({ios,sa,save})=>{
   if(ios){Object.defineProperty(navigator,"platform",{get:()=>"MacIntel"});Object.defineProperty(navigator,"maxTouchPoints",{get:()=>5})}
   if(sa)Object.defineProperty(navigator,"standalone",{get:()=>true});
   if(save&&!(window.slotGet?slotGet("hclh-save-v2-1"):localStorage.getItem("hclh-save-v2-1")))localStorage.setItem("hclh-save-v2-1","{}")},{ios:o.ios,sa:o.sa,save:o.save});
  const pg=await ctx.newPage(),reqs=[];/* only jload's bulk download counts (x-ctm-load header, or &ctmload=1 on the CDN); the game's own boot pictures are not the download */
  pg.on("request",q=>{const u=q.url();if(q.headers()["x-ctm-load"]||/ctmload=1/.test(u))reqs.push(u)});
  const errs=[];pg.on("pageerror",e=>errs.push(String(e)));
  await pg.goto(base,{waitUntil:"domcontentloaded"});await pg.waitForTimeout(o.wait||3500);
  await fn(pg,reqs,errs,ctx);await ctx.close()}
 /* 1 iPad Safari, fresh, with an old save: asks first, no download */
 await run("ipad-safari",{ua:IPAD_UA,vp:{width:1180,height:820},dsf:2,ios:1,save:1},async(pg,reqs,errs)=>{
  const k=await pg.evaluate(()=>({ph:KLOAD.phase,core:KLOAD.core}));
  ok(k.ph==="ask","iPad Safari fresh: phase=ask (got "+k.ph+")");
  const btn=await pg.$$eval("#kload .kpopts button",b=>b.map(x=>x.textContent));console.log("  buttons:",JSON.stringify(btn));
  ok(btn.length===3&&/khuyên/.test(btn[0])&&/Chơi luôn/.test(btn[1]),"buttons: a2hs(khuyên) + play-in-browser (+ save peek)");
  ok(reqs.length===0,"no picture/sound request before the choice ("+reqs.length+")");
  await pg.screenshot({path:SHOTS+"/ipad-1180x820-ask.png"});
  await pg.click('[data-kl="a2hs"]');await pg.waitForTimeout(300);
  ok(await pg.evaluate(()=>/Chia sẻ/.test(document.querySelector("#kload .klb").textContent)),"guide steps shown");
  ok(reqs.length===0,"still no download in guide");await pg.screenshot({path:SHOTS+"/ipad-1180x820-guide.png"});
  await pg.click('[data-kl="back"]');await pg.waitForTimeout(200);
  /* choose browser → download starts, flag remembered, extra line */
  await pg.click('[data-kl="web"]');await pg.waitForTimeout(2500);
  ok(await pg.evaluate(()=>KLOAD.phase)==="core"||await pg.evaluate(()=>KLOAD.phase)==="done"||await pg.evaluate(()=>KLOAD.phase)==="skipped","after web choice phase="+await pg.evaluate(()=>KLOAD.phase));
  ok(await pg.evaluate(()=>localStorage.getItem("ctm-ios-browser"))==="1","choice remembered");
  ok(await pg.evaluate(()=>/ứng dụng sẽ thỉnh lại/.test(document.body.textContent)||KLOAD.phase!=="core"),"line: app will download again");
  await pg.screenshot({path:SHOTS+"/ipad-1180x820-web-download.png"});
  ok(errs.length===0,"no page errors "+errs.slice(0,2));});
 /* 1b iPad Safari: peek button → no download, game reachable */
 await run("ipad-peek",{ua:IPAD_UA,vp:{width:1180,height:820},dsf:1,ios:1,save:1},async(pg,reqs)=>{
  await pg.click('[data-kl="peek"]');await pg.waitForTimeout(1500);
  ok(await pg.evaluate(()=>!document.getElementById("kload")),"peek closes notice");ok(reqs.length===0,"peek: no download ("+reqs.length+")")});
 /* 2 iPad standalone: downloads once as before */
 await run("ipad-standalone",{ua:IPAD_UA,vp:{width:1180,height:820},ios:1,sa:1,save:0},async(pg,reqs)=>{
  const ph=await pg.evaluate(()=>KLOAD.phase);ok(ph!=="ask"&&reqs.length>0,"standalone: downloads ("+ph+", "+reqs.length+" requests)");
  await pg.screenshot({path:SHOTS+"/ipad-1180x820-standalone.png"})});
 /* 3 Fold Android: unchanged */
 await run("fold",{ua:FOLD_UA,vp:{width:755,height:1000},dsf:2,ios:0},async(pg,reqs)=>{
  const ph=await pg.evaluate(()=>KLOAD.phase);ok(ph!=="ask"&&reqs.length>0,"Fold Android: downloads, no notice ("+ph+", "+reqs.length+")");
  await pg.screenshot({path:SHOTS+"/fold-755x1000-android.png"})});
 /* 4 Fold-size iOS notice (755x1000) for the shot */
 await run("fold-ios",{ua:IPAD_UA,vp:{width:755,height:1000},dsf:2,ios:1,save:0},async(pg,reqs)=>{
  ok(await pg.evaluate(()=>KLOAD.phase)==="ask","755x1000 iOS: ask");await pg.screenshot({path:SHOTS+"/fold-755x1000-ask.png"});
  const ov=await pg.evaluate(()=>document.documentElement.scrollWidth>innerWidth+1);ok(!ov,"no horizontal overflow")});
 /* 5 desktop */
 await run("desktop",{ua:"Mozilla/5.0 (X11; Linux x86_64) AppleWebKit/537.36 Chrome/124.0 Safari/537.36",vp:{width:1280,height:800},ios:0},async(pg,reqs)=>{
  const ph=await pg.evaluate(()=>KLOAD.phase);ok(ph!=="ask"&&reqs.length>0,"desktop unchanged ("+ph+")")});
 await br.close();srv.close();console.log(fails?"FAILS: "+fails:"ALL PASS");process.exit(fails?1:0)})();
