/* OB-PHU3 FULL VIDEO (one device per run, real recording of the built game): Dư đồ map wait + zones, Dưỡng Tú viện painted (4 seasons), Tài nghệ without person info,
   Phi tần with «Bảng tài nghệ hậu cung», person-name link (act card → people tab), home Tài nghệ / Gia tộc, home place list (only the road's own places).
   usage: [DEV=fold|ipadAir] node dev/test/ob-phu3-video.js <out.mp4>  (built root) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const D=require('./lib/device');const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process');const sleep=t=>new Promise(r=>setTimeout(r,t));
const OUT=process.argv[2]||'ob-phu3.mp4';const DEV=process.env.DEV||'fold';const CDN='https://ctm-img.victoria-tntt.workers.dev/';const CACHE=(process.env.MFK_CACHE||'/home/user/wt/mfk-cache')+'/';
(async()=>{const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const dir=fs.mkdtempSync(path.join(os.tmpdir(),'obv-'));const b=await chromium.launch();const d=D.DEVICES[DEV];
 const ctx=await D.newDeviceContext(b,DEV,{recordVideo:{dir,size:{width:d.w,height:d.h}}});let slow=false;
 await ctx.route(u=>u.href.startsWith(CDN),async r=>{const u=new URL(r.request().url()),c=CACHE+u.pathname.slice(1).replace(/\//g,'__');const ct=u.pathname.endsWith('.json')?'application/json':u.pathname.endsWith('.webp')?'image/webp':'application/octet-stream';
  if(slow&&/\/img\/(map-|kc-?map|kcmap|mark|kit\/memark|.*-map)/i.test(u.pathname))await sleep(3000);
  if(!u.pathname.endsWith('.json')&&fs.existsSync(c))return r.fulfill({status:200,body:fs.readFileSync(c),contentType:ct});
  for(let i=0;i<4;i++){try{const res=await r.fetch();const body=await res.body();if(res.status()===200&&!u.pathname.endsWith('.json'))fs.writeFileSync(c,body);return r.fulfill({status:res.status(),body,contentType:ct})}catch(e){}}return r.abort()});
 const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
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
 await boot('thd');await g.evaluate(()=>{S.rank=Math.max(S.rank,2);S.buoi=0;used=0;S.confined=0;tab="act";render();Q.length=0;document.getElementById('modal').hidden=true});await sleep(600);const tStart=(Date.now()-T0)/1000;
 await cap('Hậu cung · Dư đồ: bản đồ chờ tranh (tranh chậm 3 giây)');slow=true;
 await g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;window.__mapZ=0;tab='go';render();const i=document.querySelector('.mapw>.mapimg');if(i){const s=i.src;i.src='';i.src=s+(s.includes('?')?'&':'?')+'w='+Date.now()}});await sleep(1500);
 await cap('Tranh + tên cung hiện cùng lúc, không hộp xám');await g.waitForFunction(()=>{const w=document.querySelector('.mapw');return w&&w.classList.contains('kmready')},null,{timeout:30000}).catch(()=>{});slow=false;await sleep(3000);
 await cap('Chạm khu «Nội vụ» → phóng vào, tối quanh');const z=await g.$('.mspot.mzone');if(z){await z.click().catch(()=>{});await sleep(3500)}
 await g.evaluate(()=>{window.__mapZ=0;render()});await sleep(800);
 await cap('Dưỡng Tú viện · tranh riêng, mỗi mùa mỗi buổi một tranh');
 await g.evaluate(()=>{const u=used,e0=window.j95sEntNeed;try{j95sEntNeed=function(){return false}}catch(e){}window.__accSilent=1;window.__walkFree=1;try{Q.length=0;S.buoi=1;S.place='home';goTo('dtv')}finally{window.__accSilent=0;window.__walkFree=0;try{j95sEntNeed=e0}catch(e){}used=u}Q.length=0});await sleep(1500);await clr();
 await g.evaluate(()=>Promise.all(['xuan-sang','ha-trua','thu-chieu','dong-trua'].map(n=>new Promise(r=>{const i=new Image();i.onload=i.onerror=r;i.src=IMG_BASE+'img/duong-tu-vien-'+n+'.webp'}))));
 for(const [m,bu] of [[2,0],[5,1],[8,2],[11,1]]){await g.evaluate(([m,bu])=>{S.month=m;S.buoi=bu;S.place='dtv';try{renderStage()}catch(e){}},[m,bu]);await sleep(900);await cap(`Dưỡng Tú viện · tháng ${m} · ${['sáng','trưa','chiều'][bu]}`);await sleep(2300)}
 await g.evaluate(()=>{S.month=3;S.buoi=0;S.place='home';render()});await clr();
 await goTab('art');await cap('Tài nghệ (hậu cung): chỉ hành động — không thẻ người, không Bảng tài nghệ');await sleep(3500);
 await goTab('rv');await cap('Phi tần = tab người: «Bảng tài nghệ hậu cung» nằm ở đây');await sleep(4000);
 await goTab('act');await cap('Hành sự: tên người trong thẻ việc là liên kết (gạch chấm)');await sleep(2500);
 const lk=await g.$('#panel .kplink');if(lk){await cap('Chạm tên → mở đúng người đó ở tab Phi tần');await lk.click().catch(()=>{});await sleep(3800)}else await sleep(500);
 /* ---------------- HOME ---------------- */
 await boot('tt');await g.evaluate(()=>{S.origin=ORIGINS.find(x=>x.k==='tt');S.kcPick='nha';Q=[];window.__bot=1;kcInit();delete window.__bot;Q=[]});await sleep(800);
 for(let i=0;i<4;i++){const n=await g.evaluate(()=>{const B=[...document.querySelectorAll('button')].filter(b=>/^(Nhận|Bỏ qua)$/.test(b.textContent.trim())&&b.offsetParent);B.forEach(b=>b.click());return B.length});if(!n)break;await sleep(700)}
 await goTab('art');await cap('Khuê các · Tài nghệ: chỉ hành động (thầy dạy đã chuyển sang Gia tộc)');await sleep(3500);
 await goTab('rv');await cap('Gia tộc = tab người: Người nhà · Khuê hữu · Thầy dạy · Người ngoài');await sleep(2500);
 const th=await g.$('#panel [data-ktsv="thay"]');if(th){await th.click().catch(()=>{});await cap('Thầy dạy: thẻ người ở đây');await sleep(3000)}
 await g.evaluate(()=>{window.__mapList=1});await goTab('go');await cap('Khuê các · Dư đồ · Danh sách: chỉ nơi của nhà mình (13 nơi, không Nhà tranh / Thọ Xương cung)');await sleep(3500);
 await g.evaluate(()=>{try{KTSUB.kcgo='kinh'}catch(e){}render()});await sleep(3000);
 const vpath=await p.video().path();await ctx.close();await b.close();srv.close();
 const ss=Math.max(0,tStart-0.5).toFixed(2);cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',ss,'-i',vpath,'-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart','-crf','28',OUT]);
 console.log(JSON.stringify({dev:DEV,out:OUT,errs:errs.slice(0,3)}))})().catch(e=>{console.error(e);process.exit(1)});
