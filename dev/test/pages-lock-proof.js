/* PAGES-LOCK proof: serve ONLY the staged player files (dev/site/pages_stage.sh) under /cung-tuong-mong/ like the real Pages site,
   play the game from it (cold start with the service worker on, old save, turns, a mini-game, Pixi, co-op lobby, offline reload) and log
   every same-origin request. FAIL on any 404, any request outside the allowlist, any page error.
   usage: bash dev/site/pages_stage.sh /tmp/site && node dev/test/pages-lock-proof.js /tmp/site */
const {chromium}=require('playwright');const http=require('http'),fs=require('fs'),path=require('path');
const SITE=path.resolve(process.argv[2]||'_site'),ROOT=path.resolve(__dirname,'../..'),sleep=t=>new Promise(r=>setTimeout(r,t));
const MIME={html:'text/html',js:'text/javascript',json:'application/json',png:'image/png',mp3:'audio/mpeg',webmanifest:'application/manifest+json',txt:'text/plain'};
const serve=(dir,prefix,log)=>new Promise(ok=>{const s=http.createServer((q,r)=>{let u=decodeURIComponent(q.url.split('?')[0]);if(prefix&&!u.startsWith(prefix)){log&&log.push([404,u]);r.writeHead(404);return r.end()}
 if(prefix)u=u.slice(prefix.length-1);if(u.endsWith('/'))u+='index.html';const f=path.join(dir,u);
 if(!f.startsWith(dir)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){log&&log.push([404,q.url]);r.writeHead(404);return r.end('nf')}
 log&&log.push([200,u]);const ext=f.split('.').pop();r.writeHead(200,{'content-type':MIME[ext]||'application/octet-stream','accept-ranges':'bytes'});fs.createReadStream(f).pipe(r)}).listen(0,'127.0.0.1',()=>ok({port:s.address().port,close:()=>s.close()}))});
const prox=process.env.HTTPS_PROXY?{proxy:{server:process.env.HTTPS_PROXY,bypass:'localhost,127.0.0.1'}}:{};
const ALLOW=/^(\/(index\.html|sw\.js|assets\.json|manifest\.webmanifest|robots\.txt)|\/audio\/[^/]+\.(mp3|json)|\/icons\/[^/]+\.png|\/dev\/vendor\/pixi-8\.5\.2\.min\.js)$/;
(async()=>{let fail=0;const ok=(c,m,x)=>{if(!c)fail++;console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
 /* 1. an OLD save made by a previous build (committed .out/oldsave.json, v6) */
 const b=await chromium.launch(prox);const OLDSAVE=fs.readFileSync(path.join(ROOT,'.out/oldsave.json'),'utf8');ok(JSON.parse(OLDSAVE).v>=2,'old save file read');
 /* 2. the staged site under the Pages prefix */
 const log=[];const S=await serve(SITE,'/cung-tuong-mong/',log);const base=`http://127.0.0.1:${S.port}/cung-tuong-mong/`;
 const ctx=await b.newContext({viewport:{width:755,height:1000},serviceWorkers:'allow'});const errs=[],cdn=new Set();
 ctx.on('request',q=>{const h=new URL(q.url()).host;if(!/^127\.0\.0\.1/.test(h))cdn.add(h)});   /* picture CDN + co-op worker are other origins (real, through the proxy): not part of the site */
 const p=await ctx.newPage();p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
 await p.goto(base+'?khost=0',{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await sleep(3000);
 ok(await p.evaluate(()=>!!document.querySelector('meta[name=robots][content*=noai]')),'robots meta present');
 const sw=await p.evaluate(async()=>{const r=await Promise.race([navigator.serviceWorker.ready,new Promise((_,no)=>setTimeout(()=>no(1),45000))]);return !!r.active}).catch(()=>false);ok(sw,'service worker active from the staged site');
 await p.evaluate(j=>{localStorage.setItem(SK(3),j)},OLDSAVE);
 const ld=await p.evaluate(()=>{document.getElementById('title').hidden=true;try{const d=loadSlot(3);SLOT=3;quiet=true;deser(d);quiet=false;Q.length=0;for(const m of document.querySelectorAll('.kmov'))m.remove();return 'ok '+S.year+'/'+S.month}catch(e){return'ERR '+e.message}});ok(/^ok/.test(ld),'old save loads',ld);
 for(let i=0;i<4;i++){await p.evaluate(()=>{try{endTurn()}catch(e){}Q.length=0;for(const m of document.querySelectorAll('.kmov'))m.remove()});await sleep(500)}
 ok(true,'4 turns played');
 const px=await p.evaluate(()=>kitPixi().then(P=>!!P.Application).catch(e=>'ERR '+e.message));ok(px===true,'Pixi vendor script loads (dev/vendor/pixi)',px);
 const mg=await p.evaluate(()=>{try{const k=mgCalKinds();return 'kinds '+(k&&k.length)}catch(e){return 'ERR '+e.message}});ok(/kinds/.test(mg),'mini-game list (Thử tay)',mg);
 await p.evaluate(()=>{try{document.getElementById('title').hidden=false}catch(e){}});await sleep(500);
 const lob=await p.evaluate(()=>{const bs=[...document.querySelectorAll('button,.btn,[role=button],div')].filter(e=>/chơi cùng bạn/i.test(e.textContent)&&e.textContent.length<40);if(bs[0]){bs[0].click();return 'clicked '+bs[0].textContent.trim()}return 'no lobby button'});console.log('     co-op lobby:',lob);await sleep(1500);
 await p.reload({waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function',null,{timeout:60000});await sleep(2500);ok(true,'second open (service worker answers)');
 await ctx.setOffline(true);await p.reload({waitUntil:'domcontentloaded'}).catch(()=>{});await sleep(2500);
 ok(await p.evaluate(()=>typeof start==='function').catch(()=>false),'offline reload from the service worker cache');await ctx.setOffline(false);
 /* manifest + icons + robots as a browser asks them */
 const man=await p.evaluate(async()=>{const m=await (await fetch('manifest.webmanifest')).json();const r=[];for(const i of m.icons){r.push((await fetch(i.src)).status)}r.push((await fetch('robots.txt')).status);return r});ok(man.every(s=>s===200),'manifest icons + robots.txt 200',man);
 /* things that must NOT be served */
 const deny=await p.evaluate(async()=>{const o={};for(const u of['CLAUDE.md','AGENTS.md','README.md','dev/OWNER_DECISIONS.md','dev/build/jbal.js','docs/ideas/README.md','coop/worker/src/index.js','.github/workflows/perf.yml','.mgport','dev/kit/KIT.md'])o[u]=(await fetch(u,{cache:'no-store'})).status;return o});
 ok(Object.values(deny).every(s=>s===404),'private files are 404 on the site',deny);
 await b.close();S.close();
 const seen=[...new Set(log.map(l=>l[0]+' '+l[1]))].sort();const bad=log.filter(l=>l[0]===404&&!/^\/cung-tuong-mong\/(CLAUDE|AGENTS|README)\.md$|dev\/(OWNER|build|kit)|docs\/|coop\/|\.github|\.mgport|\.md$/.test(l[1]));
 const outside=log.filter(l=>l[0]===200).map(l=>l[1]).filter(u=>u!=='/index.html'?!ALLOW.test(u):false);
 const files=new Set(log.filter(l=>l[0]===200).map(l=>l[1].replace(/^\/cung-tuong-mong/,'')));
 console.log('same-origin 200 paths:',[...files].filter(f=>!/^\/audio\/(sfx|bgm|voice)/.test(f)).join(', '),'+',[...files].filter(f=>/^\/audio\/(sfx|bgm|voice)/.test(f)).length,'audio files');
 console.log('404s (expected: only the deny probes):',log.filter(l=>l[0]===404).map(l=>l[1]).join(' | '));
 console.log('other origins touched (not part of the site):',[...cdn].join(', '));
 ok(!bad.length,'no unexpected 404');ok(!outside.length,'every served path is on the allowlist',outside);ok(!errs.length,'0 page errors',errs.slice(0,3));
 console.log(fail?'FAIL '+fail:'PASS');process.exit(fail?1:0)})();
