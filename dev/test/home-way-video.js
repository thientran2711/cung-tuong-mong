/* review/home-way VIDEO (owner OD 26/11 ~04:25Z): a real screen recording of the built game, one device per run.
   Story: she walks to Ngự hoa viên (Dư đồ, real taps) → the top bar shows «Về phòng · 2 khắc» + her palace's name; the Dư đồ shows the same
   button and «Nhà ta» on her palace → she taps the top-bar button → she is in HER OWN room, 2 khắc spent → next morning at Đức Thọ cung with no
   khắc left: the button reads «Về phòng · hết khắc» (disabled) → the buổi turns: escorted home, «Không phải lỗi của ngươi» (no punishment)
   → again at Đức Thọ cung WITH khắc left, she stays on, caught (roll forced for the recording): «Bị bắt» Danh − · khất bổng 1 tháng ·
   «Lỗi nhẹ: không bị cấm túc». A small TEST caption (bottom-left, recording only) names each step.
   usage: [DEV=fold|ipadAir] node dev/test/home-way-video.js <out.mp4>  (built root) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process');const sleep=t=>new Promise(r=>setTimeout(r,t));
const OUT=process.argv[2]||'home-way.mp4';const DEV=process.env.DEV||'fold';
(async()=>{const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const dir=fs.mkdtempSync(path.join(os.tmpdir(),'hwv-'));const b=await chromium.launch();const d=D.DEVICES[DEV];
 const ctx=await D.newDeviceContext(b,DEV,{recordVideo:{dir,size:{width:d.w,height:d.h}}});const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.addInitScript(()=>{let a=24681357;window.__rnd=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Math.random=()=>window.__rnd()});
 const T0=Date.now();const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');
 for(let i=0;i<400;i++){const s=await g.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return !document.getElementById('kload')||window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)?'ok':''});if(s==='ok')break;await sleep(250)}
 await sleep(1000);
 const cap=async t=>{await p.evaluate(t=>{let c=document.getElementById('prcap');if(!c){c=document.createElement('div');c.id='prcap';c.style.cssText='position:fixed;left:6px;bottom:6px;z-index:2147483647;max-width:46%;background:rgba(20,10,0,.78);color:#ffe9b0;font:600 13px/1.3 sans-serif;padding:5px 8px;border-radius:6px;pointer-events:none';document.body.appendChild(c)}c.textContent='TEST · '+t},t)};
 const clr=()=>g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});
 const qn=()=>g.evaluate(()=>Q.map(m=>m.t));
 const info=await g.evaluate(()=>{SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;
  const s=document.createElement('style');s.textContent='#klife,#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,.krbox,.kcurt,#curtain{display:none!important}';document.head.appendChild(s);
  try{asFestToday=function(){return null}}catch(e){}try{if(typeof KB==="function"&&KB())KB().on=false}catch(e){}S.emp.traits=S.emp.traits.filter(t=>t!=="nongnay"&&t!=="nhantu");
  S.rank=Math.max(S.rank,2);S.buoi=1;used=0;S.acPass={};S.confined=0;S.cutPay=0;tab="act";render();Q.length=0;document.getElementById('modal').hidden=true;return{home:homeName()}});
 await sleep(800);await clr();await g.evaluate(()=>render());await sleep(300);await clr();const tStart=(Date.now()-T0)/1000;
 const walk=async k=>{for(let i=0;i<8;i++){const pl=await g.evaluate(()=>S.place);if(pl===k)break;const t=await qn();
   if(t[0]==="Chọn người theo hầu"){const btn=await g.$('#modal button:has-text("Đi một mình")');if(btn){await btn.click().catch(()=>{});await sleep(1000);continue}}
   if(t.length){await clr();await sleep(300);continue}await g.evaluate(k=>{window.__accSilent=1;try{accGrant(S,k);goTo(k)}catch(e){}finally{window.__accSilent=0}},k);await sleep(800)}
  await clr();await g.evaluate(()=>render());await sleep(400)};
 await cap(`Nhà ta: ${info.home} · buổi trưa · mở Dư đồ`);await sleep(1500);
 await g.click('#tabs [data-tab="go"]').catch(()=>g.evaluate(()=>{tab="go";render()}));await sleep(1500);await clr();
 await cap('Chạm Ngự hoa viên trên Dư đồ');const spot=await g.$('[data-go="vuon"]');if(spot)await spot.click().catch(()=>{});await sleep(1200);await walk("vuon");
 await g.evaluate(()=>{tab="act";render()});await sleep(800);
 const A0=await g.evaluate(()=>({used,place:S.place,lab:(document.querySelector('#k3room .kbl')||{}).textContent}));
 await cap(`Ở Ngự hoa viên: thanh trên «Về phòng · ${A0.lab.split("\n")[0].replace("Về phòng · ","")}» + tên cung mình`);await sleep(4000);
 await g.click('#tabs [data-tab="go"]').catch(()=>g.evaluate(()=>{tab="go";render()}));await sleep(1200);await clr();
 await cap('Dư đồ: cùng nút «Về phòng · N khắc», cung mình ghi «Nhà ta»');await sleep(4000);
 await g.evaluate(()=>{tab="act";render()});await sleep(800);
 await cap('Chạm «Về phòng» trên thanh trên');await sleep(1500);await g.click('#k3room').catch(()=>{});await sleep(1500);await clr();
 const A1=await g.evaluate(()=>({used,place:S.place}));await cap(`Đã về phòng mình · tốn ${A1.used-A0.used} khắc`);await sleep(3500);
 /* next morning: Đức Thọ cung (open at buổi sáng only), khắc spent */
 await g.evaluate(()=>{S.buoi=0;used=0;S.closeSeen=null;S.plWarn=null;S.stayRoll=null;render()});await walk("tn");
 await g.evaluate(()=>{used=BAL.time.khac;render()});await sleep(600);await clr();
 await cap('Sáng hôm sau ở Đức Thọ cung, đã hết khắc: nút «Về phòng · hết khắc» bị khoá');await sleep(4000);
 const turn=async force=>g.evaluate(async force=>{const b0=S.buoi;const R0=Math.random;Math.random=()=>force;const seen=[];try{for(let i=0;i<8&&S.buoi===b0;i++){try{kmBusy=false;KMQ.length=0}catch(e){}nextBuoi();await new Promise(r=>setTimeout(r,300));
   if(S.buoi===b0&&Q.length){seen.push(...Q.map(m=>m.t));Q.length=0;document.getElementById('modal').hidden=true}}}finally{Math.random=R0}
  const i=Q.findIndex(m=>m.t==="Bị bắt"||m.t==="Hết giờ tiếp");if(i>=0){const m=Q.splice(i,1)[0];Q.length=0;Q.unshift(m)}if(Q.length)showModal();return{seen,q:Q.map(m=>m.t),place:S.place,confined:S.confined,cut:S.cutPay||0,buoi:S.buoi}},force);
 await cap('Sang buổi trưa: không có đường về');await sleep(1200);const T1=await turn(0.999);
 await cap(`Không phải lỗi của nàng → tiễn về, không phạt (cấm túc ${T1.confined})`);await sleep(5000);await clr();await g.evaluate(()=>render());await sleep(800);
 /* again, with khắc left: a warned overstay, caught (forced) */
 await g.evaluate(()=>{S.day=(S.day||0);S.buoi=0;used=0;S.closeSeen=null;S.plWarn=null;S.stayRoll=null;render()});await walk("tn");
 await g.evaluate(()=>{used=BAL.time.khac-travel("tn","home");render()});await sleep(600);await clr();
 await cap('Lần khác: còn khắc để về mà vẫn nán lại');await sleep(3500);const T2=await turn(0.999);
 await cap(`Bị bắt: lỗi NHẸ → Danh, khất bổng ${T2.cut} tháng, không cấm túc (${T2.confined})`);await sleep(5500);await clr();await g.evaluate(()=>render());await sleep(1500);
 const vpath=await p.video().path();await ctx.close();await b.close();srv.close();
 const ss=Math.max(0,tStart-0.5).toFixed(2);cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',ss,'-i',vpath,'-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart','-crf','28',OUT]);
 console.log(JSON.stringify({dev:DEV,out:OUT,info,A0,A1,T1,T2,errs:errs.slice(0,3)}))})().catch(e=>{console.error(e);process.exit(1)});
