/* review/home-way-nits VIDEO: at Ngự hoa viên with too few khắc to walk home → the top-bar «Về phòng · hết khắc» + her palace's name (two lines, one box)
   → Dư đồ: the disabled «Về phòng» card says the REAL reason under «Cần» → a real tap on it: the lock pop says the same.
   usage: [DEV=fold|ipadAir] node dev/test/home-way-nits-video.js <out.mp4>  (built root) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process');const sleep=t=>new Promise(r=>setTimeout(r,t));
const OUT=process.argv[2]||'home-way-nits.mp4';const DEV=process.env.DEV||'fold';
(async()=>{const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const dir=fs.mkdtempSync(path.join(os.tmpdir(),'hwnv-'));const b=await chromium.launch();const d=D.DEVICES[DEV];
 const ctx=await D.newDeviceContext(b,DEV,{recordVideo:{dir,size:{width:d.w,height:d.h}}});const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.addInitScript(()=>{let a=24681357;Math.random=()=>{a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
 const T0=Date.now();const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');
 for(let i=0;i<400;i++){const s=await g.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return !document.getElementById('kload')||window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)?'ok':''});if(s==='ok')break;await sleep(250)}
 await sleep(800);
 await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;S.rank=Math.max(S.rank,2);const st=document.createElement('style');st.textContent='#klife,#kroul,#kload,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(st);
  window.__accSilent=1;accGrant(S,"vuon");S.buoi=1;goTo("vuon");window.__accSilent=0;Q.length=0;document.getElementById('modal').hidden=true;used=BAL.time.khac-1;tab="act";try{kmBusy=false;KMQ.length=0}catch(e){}document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove());render()});
 const T1=Date.now();await sleep(4500);
 const r1=await g.evaluate(()=>{const rb=document.getElementById('k3room');return{lab:rb.querySelector('.kbl').textContent,dis:rb.disabled,why:rb.dataset.why}});
 await g.click('#tabs [data-tab="go"]').catch(()=>g.evaluate(()=>{tab="go";render()}));await sleep(1500);
 await g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;try{kmBusy=false;KMQ.length=0}catch(e){}document.querySelectorAll('.kmov,.kmfls').forEach(e=>e.remove());const b=document.querySelector('[data-plhome]');if(b)b.scrollIntoView({block:'center'})});await sleep(1500);
 const r2=await g.evaluate(()=>{const b=document.querySelector('[data-plhome]');return{can:[...b.querySelectorAll('.kr-why .kwhy')].map(x=>x.textContent.trim()),dis:b.disabled}});
 const bx=await g.evaluate(()=>{const r=document.querySelector('[data-plhome]').getBoundingClientRect();return{x:r.x,y:r.y,width:r.width,height:r.height}});let ox=0,oy=0;try{const fe=await g.frameElement();const fb=fe&&await fe.boundingBox();if(fb){ox=fb.x;oy=fb.y}}catch(e){}await p.touchscreen.tap(ox+bx.x+bx.width/2,oy+bx.y+bx.height/2).catch(()=>{});await sleep(400);
 const r3=await g.evaluate(([x,y])=>{const e=document.querySelector('.kflockwhy');const h=document.elementFromPoint(x,y);return e?e.textContent:'none; at point: '+(h&&(h.outerHTML||'').slice(0,160))+' kf '+(window.KFX&&KFX.log.slice(-3))},[bx.x+bx.width/2,bx.y+bx.height/2]);await sleep(2600);
 await ctx.close();const vid=fs.readdirSync(dir).find(f=>f.endsWith('.webm'));const ss=((T1-T0)/1000).toFixed(1);
 cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',ss,'-i',path.join(dir,vid),'-vf','scale=trunc(iw/2)*2:trunc(ih/2)*2','-c:v','libx264','-pix_fmt','yuv420p','-crf','30','-an',OUT]);
 const fail=[];if(!r1.dis||!/hết khắc/.test(r1.lab))fail.push("top bar");if(!r2.can.some(x=>/cần 2/.test(x))||r2.can.some(x=>/chưa đủ điều kiện/.test(x)))fail.push("Cần row");if(!r3||!/cần 2/.test(r3))fail.push("lock pop "+r3);
 console.log(JSON.stringify({r1,r2,r3,errs,fail,out:OUT}));await b.close();srv.close();process.exit(fail.length?1:0)})();
