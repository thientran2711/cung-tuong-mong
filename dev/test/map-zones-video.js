/* MAP-ZONES VIDEO (OB-PHU4; owner 26/11 ~07:05Z): Dư đồ level 1 (zones) → tap the zone that holds her palace → level 2 (every palace, zoom + fog) → tap her palace → courtyard (level 3) → back → zone → back → overview; Ty sở zone + fog tap back; Ngự hoa viên areas. Based on the OB-PHU3 video script.
   (was: OB-PHU3 FULL VIDEO (one device per run, real recording of the built game): Dư đồ map wait + zones, Dưỡng Tú viện painted (4 seasons), Tài nghệ without person info,
   Phi tần with «Bảng tài nghệ hậu cung», person-name link (act card → people tab), home Tài nghệ / Gia tộc, home place list (only the road's own places).
   usage: [DEV=fold|ipadAir] node dev/test/ob-phu3-video.js <out.mp4>  (built root) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const D=require('./lib/device');const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process');const sleep=t=>new Promise(r=>setTimeout(r,t));
const OUT=process.argv[2]||'map-zones.mp4';const DEV=process.env.DEV||'fold';const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=(process.env.MFK_CACHE||'/home/user/wt/mfk-cache')+'/';
(async()=>{const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const dir=fs.mkdtempSync(path.join(os.tmpdir(),'obv-'));const b=await chromium.launch();const d=D.DEVICES[DEV];
 const ctx=await D.newDeviceContext(b,DEV,{recordVideo:{dir,size:{width:d.w,height:d.h}}});let slow=false;
 await ctx.route(u=>u.href.startsWith(CDN),async r=>{const u=new URL(r.request().url()),c=CACHE+u.pathname.slice(1).replace(/\//g,'__');const ct=u.pathname.endsWith('.json')?'application/json':u.pathname.endsWith('.webp')?'image/webp':'application/octet-stream';
  if(slow&&/\/img\/(map-|kc-?map|kcmap|mark|kit\/memark|.*-map)/i.test(u.pathname))await sleep(3000);
  if(!u.pathname.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
  for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!u.pathname.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.addInitScript(()=>{let a=24681357;window.__rnd=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Math.random=()=>window.__rnd()});
 const T0=Date.now();let g;
 const boot=async org=>{g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');
  for(let i=0;i<400;i++){const s=await g.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return !document.getElementById('kload')||window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)?'ok':''});if(s==='ok')break;await sleep(250)}await sleep(800);
  await g.evaluate(o=>{try{localStorage.clear()}catch(e){}window.__forceOrigin=o;SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!isSrv())break}
   const s=document.createElement('style');s.textContent='#klife,#kroul,#kroulw,.kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s);Q.length=0;document.getElementById('modal').hidden=true;try{OPT.fxon=false;if(typeof saveOpt==='function')saveOpt()}catch(e){}},org);
  for(let i=0;i<15;i++){await sleep(400);const s=await g.evaluate(()=>{const s=isSrv();if(s)start();return s});if(!s)break}};
 const cap=async t=>{await p.evaluate(t=>{let c=document.getElementById('prcap');if(!c){c=document.createElement('div');c.id='prcap';c.style.cssText='position:fixed;left:6px;bottom:6px;z-index:2147483647;max-width:90%;background:rgba(20,10,0,.78);color:#ffe9b0;font:600 13px/1.3 sans-serif;padding:5px 8px;border-radius:6px;pointer-events:none';document.body.appendChild(c)}c.textContent=t},t).catch(()=>{})};
 const clr=()=>g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});
 const goTab=async t=>{await clr();await g.evaluate(t=>{tab=t;render()},t);await sleep(900)};
 /* ---------------- PALACE ---------------- */
 await boot('thd');await g.evaluate(()=>{S.rank=Math.max(S.rank,2);S.buoi=0;used=0;S.confined=0;Q.length=0;document.getElementById('modal').hidden=true;window.__mapZ=0;window.__mapZone=null;tab='go';render()});
 await g.waitForFunction(()=>{const w=document.querySelector('.mapw');return w&&w.classList.contains('kmready')},null,{timeout:30000}).catch(()=>{});await sleep(800);const tStart=(Date.now()-T0)/1000;
 const n1=await g.evaluate(()=>[...document.querySelectorAll('.mapw .mspot')].filter(s=>s.offsetWidth&&getComputedStyle(s).display!=='none').length);
 await cap(`Dư đồ · tầng 1: ${n1} thẻ — các cung phi tần gộp thành «Đông lục cung» / «Tây lục cung», các ty thành «Ty sở»`);await sleep(4500);
 const hz=await g.evaluate(()=>{const k=plHomeK();const z=[...document.querySelectorAll('.mapw .mspot.mzone')].find(z=>(z.dataset.mzk||'').split(' ').includes(k));return z?{id:z.dataset.zone,k}:null});
 const back=async()=>{const b=await g.$('#krail [data-rail="back"]');if(b&&await b.isVisible()){await b.click().catch(()=>{})}else await g.evaluate(()=>{const o=kplBack();if(o&&o.go)o.go()})};
 if(hz){await cap('Thẻ khu có dấu «Nhà ta» — chạm vào khu');await sleep(1500);await g.click(`.mspot.mzone[data-zone="${hz.id}"]`,{timeout:8000}).catch(()=>{});await sleep(1200);
  await cap('Tầng 2: phóng vào khu, sương mờ phủ chỗ khác — mỗi cung một thẻ riêng, không cung nào mất');await sleep(4500);
  await cap('Chạm cung của ta → tầng 3: Chính điện / Đông viện / Tây viện');await g.click(`.mapw .mspot[data-go="${hz.k}"]`,{timeout:8000}).catch(()=>{});await sleep(4500);
  await cap('Nút «Về» → trở lại khu');await back();await sleep(3500);
  await cap('Nút «Về» lần nữa → toàn cảnh Dư đồ');await back();await sleep(3500)}
 await cap('Chạm «Ty sở» → Ngự thiện phòng, Thái y viện, Kính sự phòng');await g.click('.mspot.mzone[data-zone="ty"]',{timeout:8000}).catch(()=>{});await sleep(4000);
 await cap('Chạm vào vùng sương → về toàn cảnh');const fb=await g.evaluate(()=>{const w=document.querySelector('.mapv[data-mz] .mapw'),r=w.getBoundingClientRect(),sc=w.closest('.mapsc').getBoundingClientRect();const b=mapzBox(mapzCur());
  for(const [fx,fy] of [[.05,.5],[.95,.5],[.5,.05],[.3,.3],[.15,.8]]){if(fx>=b.x&&fx<=b.x+b.w&&fy>=b.y&&fy<=b.y+b.h)continue;const x=r.left+fx*r.width,y=r.top+fy*r.height;if(x>sc.left+60&&x<sc.right-10&&y>sc.top+50&&y<sc.bottom-10){const e=document.elementFromPoint(x,y);if(e&&e.closest('.kmfog'))return[x,y]}}return null});
 if(fb)await p.mouse.click(fb[0],fb[1]);else await back();await sleep(3500);
 await cap('Ngự hoa viên → tầng 2: các khu vườn, mỗi khu số bóng');await g.click('.mapw .mspot[data-go="vuon"]',{timeout:8000}).catch(()=>{});await sleep(4500);
 await back();await sleep(2500);
 const vpath=await p.video().path();await ctx.close();await b.close();srv.close();
 const ss=Math.max(0,tStart-0.5).toFixed(2);cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',ss,'-i',vpath,'-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart','-crf','28',OUT]);
 console.log(JSON.stringify({dev:DEV,out:OUT,errs:errs.slice(0,3)}))})().catch(e=>{console.error(e);process.exit(1)});
