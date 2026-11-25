/* review/place-rules FULL VIDEO (owner OD 25/11 ~23:33Z): a real screen recording of the built game, one device per run.
   Story: buổi sáng, the Hoàng hậu is at Đức Thọ cung → she walks there on Dư đồ (real taps) → the entry notice «chỉ được lưu đến hết buổi sáng»
   (chip + «!» box + Tin báo panel) → she opens the Hoàng hậu's card and talks (an AG-MEET of the Hoàng hậu toward her is queued for this khắc:
   no «Có người đến» card, she is already beside her) → the last khắc: «sắp đóng cửa sau khắc này» → she stays on, the buổi turns, the guards
   catch her (roll forced to "caught" for the recording) → «Bị bắt» card over HER ROOM, cấm túc in the top bar, Dư đồ shows her at home.
   A small TEST caption (top-left, outside the game frame, recording only) names each step.
   usage: [DEV=fold|ipadAir] node dev/test/place-rules-video.js <out.mp4>  (built root) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process');const sleep=t=>new Promise(r=>setTimeout(r,t));
const OUT=process.argv[2]||'place-rules.mp4';const DEV=process.env.DEV||'fold';
(async()=>{const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const dir=fs.mkdtempSync(path.join(os.tmpdir(),'prv-'));const b=await chromium.launch();const d=D.DEVICES[DEV];
 const ctx=await D.newDeviceContext(b,DEV,{recordVideo:{dir,size:{width:d.w,height:d.h}}});const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.addInitScript(()=>{let a=24681357;window.__rnd=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Math.random=()=>window.__rnd()});
 const T0=Date.now();const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');
 for(let i=0;i<400;i++){const s=await g.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return !document.getElementById('kload')||window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)?'ok':''});if(s==='ok')break;await sleep(250)}
 await sleep(1000);
 const cap=async t=>{await p.evaluate(t=>{let c=document.getElementById('prcap');if(!c){c=document.createElement('div');c.id='prcap';c.style.cssText='position:fixed;left:6px;bottom:6px;z-index:2147483647;max-width:46%;background:rgba(20,10,0,.78);color:#ffe9b0;font:600 13px/1.3 sans-serif;padding:5px 8px;border-radius:6px;pointer-events:none';document.body.appendChild(c)}c.textContent='TEST · '+t},t)};
 const clr=()=>g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});
 const qn=()=>g.evaluate(()=>Q.map(m=>m.t));
 /* the cards she would see on her own walk (Kỳ ngộ, festival lines…) are not part of this story: closed off-camera */
 const info=await g.evaluate(()=>{window.__forceOrigin='thd';SLOT=3;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;
  const s=document.createElement('style');s.textContent='#klife,#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s);
  try{asFestToday=function(){return null}}catch(e){}try{if(typeof KB==="function"&&KB())KB().on=false}catch(e){}
  S.rank=Math.max(S.rank,2);S.buoi=0;used=0;S.acPass={};S.confined=0;S.closeSeen=null;S.plWarn=null;S.stayRoll=null;
  const q=rivals.find(v=>v.queen&&v.alive&&!v.out);S.where=S.where||{};S.where[q.id]="tn";try{if(S.roster&&S.roster.P&&S.roster.P["v"+q.id])for(const e of S.roster.P["v"+q.id])e[0]="tn"}catch(e){}
  window.__q=q;tab="act";render();Q.length=0;document.getElementById('modal').hidden=true;return{q:q.name}});
 await sleep(800);await clr();await g.evaluate(()=>render());await sleep(300);await clr();const tStart=(Date.now()-T0)/1000;
 await cap('Buổi sáng · Hoàng hậu đang ở Đức Thọ cung · mở Dư đồ');await sleep(1500);
 await g.click('#tabs [data-tab="go"]').catch(()=>g.evaluate(()=>{tab="go";render()}));await sleep(1500);await clr();
 await cap('Chạm Đức Thọ cung trên Dư đồ');
 const spot=await g.$('[data-go="tn"]');if(spot){await spot.click().catch(()=>g.evaluate(()=>goTo("tn")))}else await g.evaluate(()=>goTo("tn"));await sleep(1200);
 const walkLog=[];for(let i=0;i<8;i++){const pl=await g.evaluate(()=>S.place);if(pl==="tn")break;const t=await qn();walkLog.push(t.join('|')||'-');
  if(t[0]==="Chọn người theo hầu"){const btn=await g.$('#modal button:has-text("Đi một mình")');if(btn){await btn.click().catch(()=>{});await sleep(1200);continue}}
  if(t.length){await clr();await sleep(300);continue}await g.evaluate(()=>{try{goTo("tn")}catch(e){}});await sleep(900)}
 /* the Hoàng hậu stands in Đức Thọ cung with her (her day record + the stage, the same entry goTo writes) */
 await g.evaluate(()=>{const q=window.__q;S.where[q.id]="tn";try{if(S.roster&&S.roster.P&&S.roster.P["v"+q.id])for(const e of S.roster.P["v"+q.id])e[0]="tn"}catch(e){}
  /* the stage is rebuilt from the day record (j2 goTo recAt): walk in again from her room, free, without the entourage question */
  const u=used,e0=window.j95sEntNeed;try{j95sEntNeed=function(){return false}}catch(e){}window.__accSilent=1;window.__walkFree=1;
  try{Q.length=0;S.place="home";goTo("tn")}finally{window.__accSilent=0;window.__walkFree=0;try{j95sEntNeed=e0}catch(e){}used=u}
  if(S.visit&&!S.visit.people.some(x=>x.ref===q))S.visit.people.push({...rp(q),kind:"hh",name:`Hoàng hậu ${q.name}`,ini:"Phượng"});Q.length=0});
 /* a meeting scene of the walk (stranger / kỳ ngộ overlay with «Tiếp») is closed off-camera-fast: not part of this story */
 for(let i=0;i<12;i++){await clr();const n=await g.evaluate(()=>{const b=[...document.querySelectorAll('.kfoc-next')].find(x=>x.getClientRects().length);if(b){b.click();return 1}
   /* the stranger scene's own choice: «Mặc kệ» (stay, do nothing) */const m=[...document.querySelectorAll('button,[role=button],.kfoc-opt,.kfoc *')].find(x=>x.getClientRects().length&&/^\s*Mặc kệ\s*$/.test(x.innerText||''));if(m){m.click();return 1}return 0});if(!n&&i>2)break;await sleep(400)}await clr();
 /* the stranger's person view (kit focus) that «Mặc kệ» leaves open: closed by its own ✕ */
 for(let i=0;i<3;i++){const c=await g.evaluate(()=>{const f=[...document.querySelectorAll('[class*="kfoc"]')].find(e=>e.getClientRects().length&&/kfoc(?!-)/.test(e.className));if(!f)return 0;
  const x=[...document.querySelectorAll('button,[role=button],.kx')].find(b=>b.getClientRects().length&&(/^[✕×]$/.test((b.innerText||'').trim())||/Đóng/.test(b.getAttribute('aria-label')||'')));if(x){x.click();return 1}return 0});if(!c)break;await sleep(700)}await clr();
 await clr();await g.evaluate(()=>{tab="act";render()});
 await cap('Vào Đức Thọ cung: Tin báo «chỉ được lưu đến hết buổi sáng»');await sleep(3500);
 const box=await g.$('#kntbox');if(box){await box.click({timeout:3000}).catch(()=>{});await cap('Mở «!» Tin báo: lời cảnh báo đầy đủ + cơ may nếu ở lại');await sleep(3500);await p.keyboard.press('Escape').catch(()=>{});await g.evaluate(()=>{try{const x=document.querySelector('#kntpanel .kx, .knt-panel .kx, #modal .kx');if(x)x.click()}catch(e){}});await sleep(600)}
 await clr();await g.evaluate(()=>render());
 await cap('Nói chuyện với Hoàng hậu (đứng cùng chỗ, cùng khắc)');await sleep(800);
 const toks=await g.$$('#tokens .tok');let hit=false;for(const t of toks){const tx=await t.innerText().catch(()=>'');if(/Hoàng hậu|Phượng/.test(tx)){await t.click({timeout:3000}).catch(()=>{});hit=true;break}}
 if(!hit)await g.evaluate(()=>{const i=curPeople().findIndex(x=>x.ref===window.__q);if(i>=0&&typeof showPop==="function")showPop(i)});
 await sleep(2500);
 /* the AG-MEET of the Hoàng hậu toward her at this very khắc (what the owner saw as «hoàng hậu cũng tới»): queued and watched now */
 const meet=await g.evaluate(()=>{const q=window.__q;const onStage=[...document.querySelectorAll('#tokens .tok')].map(t=>t.innerText.replace(/\s+/g,' ').slice(0,40));const n0=Q.length;let c=null;try{c=gmCard(q)}catch(e){c="err "+e}if(c)Q.push(c);return{onStage,with:plWith(q),cardMade:!!c,newCards:Q.length-n0,stat:PR.stat}});
 await cap(`Hoàng hậu «đến gặp» ngay khắc này → ${meet.cardMade?'CÓ thẻ (LỖI)':'không có thẻ «Có người đến»: nàng đã ở cạnh'}`);await sleep(3500);
 await clr();await g.evaluate(()=>{popIdx=null;render()});await sleep(600);
 await g.evaluate(()=>{used=BAL.time.khac-1;render()});await cap('Khắc cuối buổi sáng: «Đức Thọ cung sắp đóng cửa sau khắc này»');await sleep(4000);
 await cap('Vẫn ở lại quá giờ → sang buổi trưa (thử: lần này bị bắt gặp)');await sleep(1200);
 const turn=await g.evaluate(async()=>{const b0=S.buoi;const R0=Math.random;Math.random=()=>0.999;const seen=[];try{for(let i=0;i<8&&S.buoi===b0;i++){try{kmBusy=false;KMQ.length=0}catch(e){}nextBuoi();await new Promise(r=>setTimeout(r,300));
   if(S.buoi===b0&&Q.length){seen.push(...Q.map(m=>m.t));Q.length=0;document.getElementById('modal').hidden=true}}}finally{Math.random=R0}
  const i=Q.findIndex(m=>m.t==="Bị bắt");if(i>0){const m=Q.splice(i,1)[0];Q.unshift(m)}if(Q.length)showModal();return{seen,q:Q.map(m=>m.t),place:S.place,confined:S.confined,buoi:S.buoi}});
 await cap(`Bị bắt → đưa NGAY về tẩm cung · cấm túc ${turn.confined} tháng`);await sleep(5000);
 for(let i=0;i<6;i++){const t=await qn();if(!t.length)break;const bt=await g.$('#modal .opt, #modal button.btn');if(bt)await bt.click({timeout:3000}).catch(()=>{});else await clr();await sleep(900)}
 await clr();await g.evaluate(()=>render());await cap('Sân khấu = phòng mình; thanh trên: cấm túc');await sleep(3500);
 await g.click('#tabs [data-tab="go"]').catch(()=>g.evaluate(()=>{tab="go";render()}));await cap('Dư đồ: ngươi ở cung mình (đang cấm túc)');await sleep(3500);
 const fin=await g.evaluate(()=>({place:S.place,visit:S.visit&&S.visit.k,confined:S.confined,stat:PR.stat}));
 const vpath=await p.video().path();await ctx.close();await b.close();srv.close();
 const ss=Math.max(0,tStart-0.5).toFixed(2);cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',ss,'-i',vpath,'-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart','-crf','28',OUT]);
 console.log(JSON.stringify({dev:DEV,out:OUT,walkLog,info,meet,turn,fin,errs:errs.slice(0,3)}))})().catch(e=>{console.error(e);process.exit(1)});
