/* review/sound-cache: a device that cached the OLD build (sfx-tap.mp3 'tèo') must fetch the NEW file after the new build loads.
   usage: node dev/test/sound-cache.js <oldDir> <newDir> ; serves each on the same origin (port 8099) one after the other, one persistent profile. */
const {chromium}=require('playwright'),http=require('http'),fs=require('fs'),path=require('path'),crypto=require('crypto'),os=require('os');
const [OLD,NEW]=process.argv.slice(2),PORT=8099,T={'.html':'text/html','.js':'text/javascript','.json':'application/json','.mp3':'audio/mpeg','.webmanifest':'application/manifest+json','.png':'image/png'};
const md5=b=>crypto.createHash('md5').update(b).digest('hex');
function serve(dir){return new Promise(ok=>{const s=http.createServer((q,r)=>{let p=decodeURIComponent(q.url.split('?')[0]);if(p.endsWith('/'))p+='index.html';const f=path.join(dir,p);fs.readFile(f,(e,b)=>{if(e){r.writeHead(404);r.end();return}r.writeHead(200,{'Content-Type':T[path.extname(f)]||'application/octet-stream','Cache-Control':'max-age=600'});r.end(b)})}).listen(PORT,()=>ok(s))})}
const want=d=>md5(fs.readFileSync(path.join(d,'audio/sfx-tap.mp3')));
(async()=>{const prof=fs.mkdtempSync(path.join(os.tmpdir(),'scp-'));const out=[];
 for(const [name,vp] of [['Fold 755x1000',{width:755,height:1000}],['iPad 1180x820',{width:1180,height:820}]]){
  fs.rmSync(prof,{recursive:true,force:true});fs.mkdirSync(prof);
  const ctx=await chromium.launchPersistentContext(prof,{viewport:vp,deviceScaleFactor:2,serviceWorkers:'allow'});
  const run=async(dir,label)=>{const s=await serve(dir);const pg=await ctx.newPage();const net=[];pg.on('request',r=>{if(/sfx-tap/.test(r.url()))net.push(r.url().replace(/^http:\/\/localhost:\d+\//,''))});
   await pg.goto(`http://localhost:${PORT}/`,{waitUntil:'domcontentloaded'});
   await pg.waitForFunction(()=>navigator.serviceWorker&&navigator.serviceWorker.controller,null,{timeout:90000}).catch(()=>{});
   const grab=()=>pg.evaluate(async()=>{const b=new Uint8Array(await (await fetch('audio/sfx-tap.mp3')).arrayBuffer());return Array.from(b)}).then(x=>md5(Buffer.from(x))).catch(()=>'reload');
   /* the new worker installs in the background (~20 s here) then takes over and the page reloads itself: poll what the page really receives */
   let m=await grab(),sec=0;if(label==='new'){const t0=Date.now();while(m!==want(dir)&&Date.now()-t0<150000){await pg.waitForTimeout(3000);m=await grab()}sec=Math.round((Date.now()-t0)/1000)}
   const swv=await pg.evaluate(()=>new Promise(ok=>{const c=navigator.serviceWorker.controller;if(!c)return ok('none');navigator.serviceWorker.addEventListener('message',e=>{if(e.data&&e.data.ctm==='v')ok(e.data.v)});c.postMessage({ctm:'v'});setTimeout(()=>ok('?'),1500)})).catch(()=>'?');
   const got2=await pg.evaluate(async()=>caches.open('ctm-assets').then(c=>c.keys()).then(k=>k.map(x=>x.url).filter(u=>/sfx-tap/.test(u)))).catch(()=>[]);await pg.close();s.close();return {label,swv,secToSwitch:sec,md5:m,expect:want(dir),keys:got2.map(u=>u.replace(/^http:\/\/localhost:\d+\//,'')),netUrls:net}};
  const a=await run(OLD,'old'),b=await run(NEW,'new');
  out.push({device:name,old:a,new:b,PASS:a.md5===a.expect&&b.md5===b.expect&&a.md5!==b.md5});await ctx.close()}
 console.log(JSON.stringify(out,null,1));process.exit(out.every(o=>o.PASS)?0:1)})();
