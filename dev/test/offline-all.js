/* dev/test/offline-all.js — review/offline-all: «Tải hết để chơi offline» (Thiết lập row + kit panel + download of EVERY assets.json group into 'ctm-assets').
   Runs the BUILT site against a small FAKE assets.json (40 files: core/fig/fx/lazy, ~50 KB each) served by a local server that counts hits, can delay and can change the manifest:
   the built index.html / sw.js are copied to a scratch root with the picture CDN base turned into the local origin.
   Checks (each prints PASS/FAIL):
     plan      what is left = manifest minus cache minus dead list; a changed hash / a new file shows as «Có N tranh mới cần tải»; resume after pause / reload
     run       3 at a time, all 40 land under '<path>?h=<hash>', «Đã tải đủ, chơi offline được»; a later build fetches ONLY the changed files
     pause     Tạm ngưng stops the fetching, Tải tiếp continues; a reload mid-way resumes by itself; a 404 file is skipped, the rest finish
     offline   going offline mid-way stops cleanly (state offline), 'online' resumes; after «đủ»: offline reload, lazy pictures answer from the cache (SW)
     quota     Cache.put throwing QuotaExceededError stops with the notice + how much was saved; free-room warning when navigator.storage.estimate is small
     shots     Fold 755x1000 + iPad 1180x820: the row (idle / done) and the panel (idle / running / done) in <out>/
   usage: node dev/test/offline-all.js [outdir]   (needs the built root: bash dev/site/build_site.sh) */
const {chromium}=require('playwright');const fs=require('fs'),path=require('path'),http=require('http');const D=require('./lib/device');
const OUT=path.resolve(process.argv[2]||path.join(require('os').tmpdir(),'offline-all-shots'));fs.mkdirSync(OUT,{recursive:true});
const REPO=path.resolve(__dirname,'../..');const ROOT=path.join(OUT,'_root');
const sleep=t=>new Promise(r=>setTimeout(r,t));let fails=0;const ok=(c,m,x)=>{console.log((c?'PASS ':'FAIL ')+m+(x!==undefined?' · '+JSON.stringify(x):''));if(!c)fails++};
/* ---- scratch root: built site, picture CDN → local ---- */
function mkRoot(){fs.rmSync(ROOT,{recursive:true,force:true});fs.mkdirSync(ROOT,{recursive:true});
 for(const n of fs.readdirSync(REPO)){if(['dev','.git','img','cdn','docs','coop','rank','assets.json'].includes(n))continue;fs.cpSync(path.join(REPO,n),path.join(ROOT,n),{recursive:true})}
 for(const n of fs.readdirSync(path.join(ROOT,'audio')))if(!/\.json$/.test(n))fs.rmSync(path.join(ROOT,'audio',n));
 const H=/https:\/\/ctm-img\.victoria-tntt\.workers\.dev\//g;let ix=fs.readFileSync(path.join(ROOT,'index.html'),'utf8').replace(H,'');fs.writeFileSync(path.join(ROOT,'index.html'),ix);
 let sw=fs.readFileSync(path.join(ROOT,'sw.js'),'utf8').replace(/,"https:\/\/ctm-img\.victoria-tntt\.workers\.dev\/[^"]*"/g,'').replace(H,'');fs.writeFileSync(path.join(ROOT,'sw.js'),sw)}
/* ---- fake manifest ---- */
const SZ=50*1024;
function manifest(v,over){const files=[];const add=(g,n)=>{for(let i=0;i<n;i++)files.push([`img/t/${g}-${i}.webp`,(g[0]+String(i)).padEnd(8,'0')+'h0000000',SZ+i*7,g])};add('core',3);add('fig',5);add('fx',2);add('lazy',30);
 for(const [p,h] of Object.entries(over&&over.hash||{})){const f=files.find(x=>x[0]===p);if(f)f[1]=h}
 for(const x of (over&&over.add)||[])files.push(x);return {v,files}}
function server(){const S={man:manifest('v1'),hits:new Map(),delay:0,dead:new Set(),total:0};
 const srv=http.createServer((q,r)=>{const u=new URL(q.url,'http://x');let p=decodeURIComponent(u.pathname).replace(/^\/+/,'');
  if(p==='assets.json'){r.setHeader('Content-Type','application/json');r.setHeader('Cache-Control','no-store');return r.end(JSON.stringify(S.man))}
  const f=S.man.files.find(x=>x[0]===p);
  if(f){S.hits.set(p,(S.hits.get(p)||0)+1);S.total++;const go=()=>{if(S.dead.has(p)){r.statusCode=404;return r.end('gone')}r.setHeader('Content-Type','image/webp');r.setHeader('Cache-Control','no-store');r.setHeader('Access-Control-Allow-Origin','*');r.end(Buffer.alloc(f[2],f[0].length&255))};return S.delay?setTimeout(go,S.delay):go()}
  if(p==='index.html'||p===''||/\.(js|json|webmanifest|png|webp|mp3|ico|svg)$/.test(p)){const fp=path.join(ROOT,p||'index.html');if(fs.existsSync(fp)&&fs.statSync(fp).isFile()){r.setHeader('Content-Type',D.TYPES&&D.TYPES[path.extname(fp)]||({'.html':'text/html','.js':'text/javascript','.json':'application/json','.webmanifest':'application/manifest+json'}[path.extname(fp)]||'application/octet-stream'));r.setHeader('Cache-Control','no-store');return fs.createReadStream(fp).pipe(r)}}
  r.statusCode=404;r.end('nf')});
 return new Promise(res=>srv.listen(0,'127.0.0.1',()=>{S.url='http://127.0.0.1:'+srv.address().port+'/';S.close=()=>srv.close();res(S)}))}
const titleUp=()=>{const f=document.getElementById('krotf'),w=f&&f.contentWindow;if(!w||!w.document)return false;const d=w.document,t=d.getElementById('title');const k=w.KLOAD||{};return !!t&&!t.hidden&&t.getClientRects().length>0&&!d.getElementById('kload')&&!!w.__kbootDone&&(!k.phase||['done','skipped','all','idle'].includes(k.phase))&&!!w.CTM_OFFLINE};
const A=g=>g.evaluate(()=>({st:KLOAD.all.state,have:KLOAD.all.have,total:KLOAD.all.total,files:KLOAD.all.files,left:KLOAD.all.left,skipped:KLOAD.all.skipped,err:KLOAD.all.err,ls:localStorage.getItem('ctm-offall')}));
const until=async(g,f,ms)=>{const t0=Date.now();let s;while(Date.now()-t0<(ms||30000)){s=await A(g);if(f(s))return s;await sleep(120)}return s};
const cached=g=>g.evaluate(async()=>{const c=await caches.open('ctm-assets');return (await c.keys()).map(r=>decodeURIComponent(new URL(r.url).pathname.slice(1))+new URL(r.url).search).filter(k=>k.startsWith('img/t/'))});
const cleanCache=p=>p.evaluate(async()=>{try{for(const k of await caches.keys())await caches.delete(k);localStorage.clear()}catch(e){}});
async function open(b,srv,dev,extra){const ctx=await D.newDeviceContext(b,dev,Object.assign({serviceWorkers:'allow'},extra));await ctx.addInitScript(()=>{try{localStorage.setItem('ctm-ios-browser','1')}catch(e){}});const p=await ctx.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,140)));p.on('console',m=>{if(/offall|kitStatus|kitPanel/.test(m.text()))console.log('CONSOLE',m.text().slice(0,900))});
 await p.goto(srv.url+'?khost=1',{waitUntil:'commit'});await p.waitForFunction(titleUp,null,{timeout:45000,polling:250}).catch(async e=>{console.log('TITLE TIMEOUT',JSON.stringify(await D.gameFrame(p).evaluate(()=>({phase:KLOAD.phase,kd:!!window.__kbootDone,ko:!!window.CTM_OFFLINE,kl:!!document.getElementById('kload'),core:KLOAD.core,err:KLOAD.err})).catch(x=>String(x))),errs);throw e});return {ctx,p,g:D.gameFrame(p),errs}}
const openOpt=async g=>{await g.evaluate(()=>{const b=document.querySelector('#modal [data-tgo="opt"]');if(b)b.click()});await sleep(500);await g.evaluate(()=>{const w=document.querySelector('#modal .offwrap');if(w)w.scrollIntoView({block:'center'})});await sleep(300)};
const rowText=g=>g.evaluate(()=>{const w=document.querySelector('#modal .offwrap');return w?w.innerText.replace(/\s+/g,' ').trim():null});
const openPanel=async g=>{await g.evaluate(()=>document.querySelector('#modal .offwrap [data-oa="open"]').click());await sleep(700)};
const panelText=g=>g.evaluate(()=>{const m=document.querySelector('#modal .dlg');return m?m.innerText.replace(/\s+/g,' ').trim():null});
const clickOpt=(g,label)=>g.evaluate(l=>{const b=document.querySelector('#modal .oa-btns [data-oa="'+(l==='Tạm ngưng'?'pause':'start')+'"]');if(b&&b.textContent.trim().startsWith(l)){b.click();return true}return false},label);
const shot=async(p,n)=>{await p.screenshot({path:path.join(OUT,n+'.png')})};

module.exports={mkRoot,server,open,openOpt,openPanel,A,until,sleep};
if(require.main===module)(async()=>{mkRoot();const srv=await server();const b=await chromium.launch();
 try{
 /* ================= 1. plan + run + shots (iPad) ================= */
 let X=await open(b,srv,'ipadAir');let {p,g}=X;
 let s=await A(g);ok(s.st==='idle'&&s.total===0,'boot: nothing planned until Thiết lập is opened',s);
 await openOpt(g);await sleep(1500);s=await A(g);
 ok(s.left===37&&s.total>2e6,"plan: left = all files not yet cached (3 core came in at entry)",s);
 let t=await rowText(g);ok(/Chơi offline/i.test(t)&&/Tải hết để chơi offline/i.test(t)&&/Còn 37 tranh/.test(t),'row: kit row + button «Tải hết để chơi offline», still to fetch in words',t);
 await shot(p,'ipad-row-idle');
 await openPanel(g);{const pe=await g.evaluate(()=>KLOAD.all.panelErr);if(pe)console.log('PANELERR',pe.slice(0,400))};t=await panelText(g);ok(/Tải hết để chơi offline/i.test(t)&&/Còn phải tải/i.test(t)&&/Chỗ trống trong máy/i.test(t)&&/Nên dùng Wi-Fi/.test(t)&&/Bắt đầu tải/.test(t),'panel: size in words + free room + Wi-Fi note + Bắt đầu tải',t.slice(0,900));
 ok(!/%/.test(t),'panel: no %');await shot(p,'ipad-panel-idle');
 srv.delay=150;await clickOpt(g,'Bắt đầu tải');await sleep(900);s=await A(g);ok(s.st==='run','run: started',s);
 await shot(p,'ipad-panel-run');
 s=await until(g,x=>x.files>=6,20000);ok(s.files>=6,'run: files arrive while the panel is open',s);
 /* pause */
 await clickOpt(g,'Tạm ngưng');await sleep(1200);s=await A(g);ok(s.st==='paused','pause: Tạm ngưng stops',s);const h1=srv.total;await sleep(1500);ok(srv.total-h1<=1,'pause: no new requests while paused',srv.total-h1);
 ok(JSON.parse(s.ls).paused===1,'pause: remembered in localStorage',s.ls);
 /* reload while paused -> stays paused, Tải tiếp finishes */
 await p.reload({waitUntil:'commit'});await p.waitForFunction(titleUp,null,{timeout:120000,polling:250});g=D.gameFrame(p);await sleep(9000);s=await A(g);ok(s.st==='paused','reload while paused: stays paused (no restart by itself)',s.st);
 await openOpt(g);await sleep(1500);t=await rowText(g);ok(/Tạm ngưng · còn/.test(t),'reload: plan = what is left (paused, cached files skipped)',t);
 srv.delay=20;await openPanel(g);ok(await clickOpt(g,'Tải tiếp'),'resume: button «Tải tiếp»');
 s=await until(g,x=>x.st==='done',40000);ok(s.st==='done'&&s.left===0&&s.files===40,'run: done, all 40 counted',s);
 const keys=await cached(g);ok(keys.length===40,'run: 40 keys in ctm-assets under <path>?h=<hash>',keys.length);
 const man=srv.man.files;ok(man.every(f=>keys.includes(f[0]+'?h='+f[1])),'run: every key is the manifest key (same as sw.js)');
 ok([...srv.hits.values()].every(n=>n<=2),'run: no file fetched more than twice',Math.max(...srv.hits.values()));
 await sleep(600);t=await panelText(g);ok(/Đã tải đủ, chơi offline được/.test(t),'panel: done words',t.slice(0,200));await shot(p,'ipad-panel-done');
 await g.evaluate(()=>{const b=document.querySelector('#modal [data-oa="close"]');if(b)b.click()});await sleep(900);
 t=await rowText(g);ok(/Đã tải đủ, chơi offline được/.test(t),'row: Đã tải đủ',t);await shot(p,'ipad-row-done');
 /* ================= 2. offline reload: pictures from lazy group answer from the cache ================= */
 await sleep(1500);await X.ctx.setOffline(true);await p.reload({waitUntil:'commit'}).catch(()=>{});
 await p.waitForFunction(()=>!!document.getElementById('krotf'),null,{timeout:60000}).catch(()=>{});await sleep(4000);g=D.gameFrame(p);
 const lazyFiles=man.filter(f=>f[3]==='lazy').slice(0,8);
 const r=await g.evaluate(async fs=>{const out=[];for(const f of fs){try{const x=await fetch(f[0]);const n=(await x.arrayBuffer()).byteLength;out.push([x.status,n===f[2]])}catch(e){out.push(['err',false])}}return out},lazyFiles);
 ok(r.every(([s,m])=>s===200&&m),'offline: lazy pictures answered from the cache (SW), right size',r);

 const hitsOff=srv.total;await X.ctx.setOffline(false);await X.ctx.close();
 /* ================= 3. later build: only changed files ================= */
 srv.man=manifest('v2',{hash:{'img/t/lazy-3.webp':'changed3000000000','img/t/fig-1.webp':'changed1000000000','img/t/core-0.webp':'changed0000000000'},add:[['img/t/lazy-new-a.webp','new0a00000000000',SZ,'lazy'],['img/t/lazy-new-b.webp','new0b00000000000',SZ,'lazy']]});
 /* same profile: re-use the cache by running a persistent context? use one context for the whole story instead */
 await b.close();
 const b2=await chromium.launch();
 const ctx2=await D.newDeviceContext(b2,'ipadAir',{serviceWorkers:'allow'});await ctx2.addInitScript(()=>{try{localStorage.setItem('ctm-ios-browser','1')}catch(e){}});const p2=await ctx2.newPage();p2.setDefaultTimeout(120000);const errs2=[];p2.on('pageerror',e=>errs2.push(e.message.slice(0,140)));
 srv.man=manifest('v1');srv.delay=0;srv.hits.clear();srv.total=0;
 await p2.goto(srv.url+'?khost=1',{waitUntil:'commit'});await p2.waitForFunction(titleUp,null,{timeout:120000,polling:250});let g2=D.gameFrame(p2);
 await openOpt(g2);await g2.evaluate(()=>CTM_OFFLINE.start());await until(g2,x=>x.st==='done',40000);
 ok((await A(g2)).st==='done','v1: all downloaded in a fresh profile');
 srv.man=manifest('v2',{hash:{'img/t/lazy-3.webp':'changed3000000000','img/t/fig-1.webp':'changed1000000000'},add:[['img/t/lazy-new-a.webp','new0a00000000000',SZ,'lazy'],['img/t/lazy-new-b.webp','new0b00000000000',SZ,'lazy']]});
 srv.hits.clear();srv.total=0;
 await p2.reload({waitUntil:'commit'});await p2.waitForFunction(titleUp,null,{timeout:120000,polling:250});g2=D.gameFrame(p2);await sleep(1500);
 await openOpt(g2);await sleep(2500);t=await rowText(g2);ok(/Có 4 tranh mới cần tải/.test(t),'new build: row says «Có 4 tranh mới cần tải»',t);await shot(p2,'ipad-row-new');
 srv.hits.clear();srv.total=0;await g2.evaluate(()=>CTM_OFFLINE.start());s=await until(g2,x=>x.st==='done',40000);
 ok(s.st==='done'&&[...srv.hits.keys()].every(k=>['img/t/fig-1.webp','img/t/lazy-3.webp','img/t/lazy-new-a.webp','img/t/lazy-new-b.webp'].includes(k)),'new build: ONLY the 4 changed/new files were fetched',[...srv.hits.keys()]);
 /* ================= 4. a 404 file is skipped, the rest finish ================= */
 await cleanCache(p2);srv.man=manifest('v1');srv.dead=new Set(['img/t/lazy-9.webp']);srv.hits.clear();srv.total=0;
 await p2.reload({waitUntil:'commit'});await p2.waitForFunction(titleUp,null,{timeout:120000,polling:250});g2=D.gameFrame(p2);
 await g2.evaluate(()=>CTM_OFFLINE.start());s=await until(g2,x=>x.st==='done',60000);ok(s.st==='done'&&s.skipped===1&&s.files===39,'dead: a 404 file is skipped + remembered, the other 39 finish → done',s);
 srv.dead=new Set();
 /* ================= 5. offline mid-way stops cleanly; online resumes ================= */
 await cleanCache(p2);srv.delay=150;srv.hits.clear();srv.total=0;await p2.reload({waitUntil:'commit'});await p2.waitForFunction(titleUp,null,{timeout:120000,polling:250});g2=D.gameFrame(p2);
 await g2.evaluate(()=>CTM_OFFLINE.start());await until(g2,x=>x.files>=5,20000);await ctx2.setOffline(true);s=await until(g2,x=>x.st==='offline',20000);ok(s.st==='offline','offline: state offline, loop stopped cleanly',s);
 const f0=s.files;await sleep(1500);ok((await A(g2)).files<=f0+3,'offline: nothing keeps hammering');
 await openOpt(g2).catch(()=>{});await ctx2.setOffline(false);s=await until(g2,x=>x.st==='run'||x.st==='done',30000);ok(s.st==='run'||s.st==='done','online: resumes by itself',s);
 srv.delay=0;s=await until(g2,x=>x.st==='done',60000);ok(s.st==='done'&&s.files===40,'online: finishes after the line is back',s);
 /* ================= 6. reload mid-way resumes by itself ================= */
 await cleanCache(p2);srv.delay=200;await p2.reload({waitUntil:'commit'});await p2.waitForFunction(titleUp,null,{timeout:120000,polling:250});g2=D.gameFrame(p2);
 await g2.evaluate(()=>CTM_OFFLINE.start());await until(g2,x=>x.files>=4,20000);srv.delay=20;
 await p2.reload({waitUntil:'commit'});await p2.waitForFunction(titleUp,null,{timeout:120000,polling:250});g2=D.gameFrame(p2);
 s=await until(g2,x=>x.st==='done',90000);ok(s.st==='done'&&s.files===40,'reload mid-way: resumes by itself (no tap) and finishes',s);
 /* ================= 7. quota ================= */
 await cleanCache(p2);srv.delay=0;await p2.reload({waitUntil:'commit'});await p2.waitForFunction(titleUp,null,{timeout:120000,polling:250});g2=D.gameFrame(p2);
 await g2.evaluate(()=>{const o=Cache.prototype.put;let n=0;Cache.prototype.put=function(){if(++n>12)return Promise.reject(new DOMException('full','QuotaExceededError'));return o.apply(this,arguments)};
  navigator.storage.estimate=async()=>({quota:5e6,usage:1e6})});
 await openOpt(g2);await sleep(1500);await openPanel(g2);t=await panelText(g2);ok(/chưa đủ chỗ/.test(t),'quota: panel warns the free room is not enough',t.slice(0,420));await shot(p2,'ipad-panel-lowroom');
 await clickOpt(g2,'Bắt đầu tải');s=await until(g2,x=>x.st==='quota',30000);ok(s.st==='quota'&&s.files>0&&s.files<40,'quota: QuotaExceededError stops the run, how much was saved is kept',s);
 await sleep(800);t=await panelText(g2);ok(/hết chỗ cất/.test(t)&&/Đã cất/.test(t),'quota: kit notice says how much was saved',t.slice(0,300));await shot(p2,'ipad-panel-quota');
 ok(!errs2.length,'no page errors',errs2.slice(0,3));await b2.close();
 /* ================= 8. shots: Fold ================= */
 const b3=await chromium.launch();srv.delay=0;X=await open(b3,srv,'fold');await openOpt(X.g);await sleep(1500);await shot(X.p,'fold-row-idle');await openPanel(X.g);await shot(X.p,'fold-panel-idle');
 await clickOpt(X.g,'Bắt đầu tải');await sleep(400);srv.delay=300;await until(X.g,x=>x.files>=4,20000);await sleep(300);await shot(X.p,'fold-panel-run');await until(X.g,x=>x.st==='done',60000);await sleep(800);await shot(X.p,'fold-panel-done');
 ok(!X.errs.length,'fold: no page errors',X.errs.slice(0,3));await b3.close();
 }catch(e){console.log('FAIL exception',e&&e.stack||e);fails++}
 srv.close();console.log(fails?'\n'+fails+' FAIL':'\nALL PASS');console.log('shots →',OUT);process.exit(fails?1:0)})();
