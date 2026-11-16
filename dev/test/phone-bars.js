/* phone-bars.js — top bar + bottom tab bar on the ONE-PAGE (kv1) view; iPad bars must not change.
   usage: node dev/test/phone-bars.js <outdir> [WxH@D ...]   (serves the repo root itself on a free port; img/ → CDN redirect)
   per size: home + hậu cung tab shot (full screen), rects of header.hud / #tabs buttons / #next / #panel, clipped labels, overlaps of tab buttons and stat cells.
   exit 1 on overlap, clipped label or page error. */
const {chromium}=require('playwright'),http=require('http'),fs=require('fs'),path=require('path');
const OUT=process.argv[2]||'/tmp/phone-bars';fs.mkdirSync(OUT,{recursive:true});
const SIZES=(process.argv.slice(3).length?process.argv.slice(3):['755x1000@2','412x1058@2','390x844@3','1180x820@2','1366x1024@2']).map(s=>{const m=/(\d+)x(\d+)@(\d+)/.exec(s);return[+m[1],+m[2],+m[3]]});
const REPO=path.resolve(__dirname,'../..'),ROOT=process.env.PB_ROOT||REPO;/* PB_ROOT = a dir with another build's index.html/sw.js/assets.json (e.g. live main) for the before shots */const BASE=(/const IMG_BASE="([^"]*)"/.exec(fs.readFileSync(path.join(REPO,'dev/build/jcdn.js'),'utf8'))||[])[1];
const T={'.html':'text/html; charset=utf-8','.js':'text/javascript; charset=utf-8','.json':'application/json','.webp':'image/webp','.png':'image/png','.mp3':'audio/mpeg','.webmanifest':'application/manifest+json'};
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname).replace(/^\/+/,'');if(!p)p='index.html';if(p.includes('..')){r.statusCode=400;return r.end()}
 if(p.startsWith('img/')){r.statusCode=302;r.setHeader('Location',BASE+p);r.setHeader('Access-Control-Allow-Origin','*');return r.end()}
 fs.readFile(path.join(ROOT,p),(e,b)=>{if(e&&ROOT!==REPO)return fs.readFile(path.join(REPO,p),(e2,b2)=>{if(e2){r.statusCode=404;return r.end('404')}r.setHeader('Content-Type',T[path.extname(p)]||'application/octet-stream');r.end(b2)});if(e){r.statusCode=404;return r.end('404')}r.setHeader('Content-Type',T[path.extname(p)]||'application/octet-stream');r.setHeader('Cache-Control','no-cache');r.end(b)})});
const MODE=process.env.PB_MODE||'cons';/* PB_MODE=srv forces a servant start (fewer tabs); default consort start */
const sleep=t=>new Promise(r=>setTimeout(r,t));
const SEED=()=>{let a=20261116;Math.random=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}};
const CLEAN=()=>{document.querySelectorAll('[id^=kroul],#dawn,#kload,#kpodov,.kmov').forEach(e=>e.remove());Q.length=0;const m=document.getElementById('modal');if(m)m.hidden=true;render()};
const MEASURE=()=>{const R=e=>{if(!e)return null;const r=e.getBoundingClientRect();return[r.left,r.top,r.width,r.height].map(v=>Math.round(v*10)/10)};
 const X=(a,b)=>a[0]<b[0]+b[2]-1&&b[0]<a[0]+a[2]-1&&a[1]<b[1]+b[3]-1&&b[1]<a[1]+a[3]-1;
 const tabs=[...document.querySelectorAll('#tabs button')].filter(b=>b.offsetParent);
 const rs=tabs.map(b=>{const cs=getComputedStyle(b,'::after');const c=document.createElement('canvas').getContext('2d');c.font=`${cs.fontWeight} ${cs.fontSize} ${cs.fontFamily}`;const w=c.measureText((b.dataset.s||b.textContent).trim()).width;
  const room=b.clientWidth-parseFloat(getComputedStyle(b).paddingLeft)-parseFloat(getComputedStyle(b).paddingRight);return{t:(b.dataset.s||b.textContent).trim(),r:R(b),clip:Math.round((w-room)*10)/10,fs:cs.fontSize}});
 const ov=[];for(let i=0;i<rs.length;i++)for(let j=i+1;j<rs.length;j++)if(X(rs[i].r,rs[j].r))ov.push(rs[i].t+'x'+rs[j].t);
 const hd=document.querySelector('header.hud');
 const cells=[...document.querySelectorAll('#kstrow .kst')].filter(e=>e.offsetParent).map(e=>({k:e.dataset.k,r:R(e),over:e.scrollWidth>e.clientWidth+1,fs:getComputedStyle(e.querySelector('.kstl')||e).fontSize}));
 const co=[];for(let i=0;i<cells.length;i++)for(let j=i+1;j<cells.length;j++)if(X(cells[i].r,cells[j].r))co.push(cells[i].k+'x'+cells[j].k);
 const blocks=['.me','#k3tc','#kstrow','#k3room','#menu'].map(s=>{const e=hd&&hd.querySelector(s);return e&&e.offsetParent?{k:s,r:R(e)}:null}).filter(Boolean);
 const bo=[];for(let i=0;i<blocks.length;i++)for(let j=i+1;j<blocks.length;j++)if(X(blocks[i].r,blocks[j].r))bo.push(blocks[i].k+'x'+blocks[j].k);
 return{srv:isSrv(),pages:kitView().pages,hud:R(hd),nav:R(document.querySelector('nav.bar')),next:R(document.getElementById('next')),panel:R(document.getElementById('panel')),stage:R(document.getElementById('stage')),tabs:rs,tabOverlap:ov,blocks,blockOverlap:bo,cells,cellOverlap:co,tfs:getComputedStyle(document.getElementById('tabs')).getPropertyValue('--tfs')}};
(async()=>{await new Promise(r=>srv.listen(0,r));const URL='http://localhost:'+srv.address().port+'/index.html?khost=1';const b=await chromium.launch();let bad=0;const all={};
 for(const [W,H,D] of SIZES){const tag=`${W}x${H}${MODE==='srv'?'-srv':''}`;const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:D,serviceWorkers:'block',hasTouch:true,isMobile:W<1100});await c.addInitScript(SEED);
  const p=await c.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.goto(URL,{waitUntil:'commit'});
  let fr;for(let i=0;i<180;i++){fr=p.frames().find(x=>x.url().includes('krot=1'))||p.mainFrame();try{if(await fr.evaluate(()=>typeof start==='function'))break}catch(e){}await sleep(1000)}
  await fr.waitForFunction(()=>!document.getElementById('kload')||(window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)),null,{timeout:180000}).catch(()=>{});await sleep(1500);
  await fr.evaluate((MODE)=>{try{localStorage.clear()}catch(e){}OPT.fxon=false;SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<200;i++){start();if(MODE==='srv'?isSrv():!isSrv())break}if(MODE==='srv'&&!isSrv()){S.origin=S.origin||{};S.origin.k='cnv';quiet=true;srvInit();quiet=false;try{deal()}catch(e){}render()}},MODE);
  for(let i=0;i<5;i++){await sleep(900);await fr.evaluate(CLEAN)}
  const out={home:await fr.evaluate(MEASURE)};await p.screenshot({path:`${OUT}/${tag}-home.png`});
  await fr.evaluate(CLEAN);await fr.evaluate(()=>{const b=document.querySelector('#tabs [data-kg="hc"]')||document.querySelector('#tabs [data-tab="rv"]');b&&b.click()});await sleep(1500);
  out.tab=await fr.evaluate(MEASURE);await p.screenshot({path:`${OUT}/${tag}-tab.png`});out.errs=errs;all[tag]=out;
  const probs=[...out.home.tabOverlap,...out.home.cellOverlap,...out.home.blockOverlap,...out.tab.tabOverlap,...out.home.tabs.filter(t=>t.clip>0.5).map(t=>'clip '+t.t+' '+t.clip),...errs];if(probs.length){bad=1;console.log(tag,'PROBLEMS',probs)}
  console.log(tag,'srv',out.home.srv,'pages',out.home.pages,'hud',out.home.hud,'nav',out.home.nav,'next',out.home.next,'panel(tab)',out.tab.panel,'tfs',out.home.tfs,'tabs',out.home.tabs.map(t=>t.t+':'+t.r.join(',')+'@'+t.fs).join(' | '));
  await c.close()}
 fs.writeFileSync(OUT+'/measure.json',JSON.stringify(all,null,1));await b.close();srv.close();process.exit(bad)})();
