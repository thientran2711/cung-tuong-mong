/* review/pace-all FULL VIDEO (owner OD 26/11 ~08:00Z «tiến bộ thì đòi 100 điểm mà mỗi lần học chỉ được có 2 điểm», ~08:05Z «tiến bộ là tiến bộ
   của cái bậc đó», ~08:25Z «làm cách nào để giảm bớt oán»): real recording of the built game, real taps.
   Story: (1) Tài nghệ tab → a Tứ đức course card «Bậc 0/5 · Tiến bộ 0/10» → tap «Tự học» → «Làm» → material → «Bỏ qua» → the result → ✕ → the card now «Tiến bộ 2/10»
   (LIVE: the same lesson is n/5 of a 5-phần first bậc and 1/38 of the last); (2) a consort holds «Oán hận» toward her, nothing new feeds it:
   9 tuần go by (the weekly cool-down rule, fast-forwarded, caption says so) → her row in «Nguy hiểm chung» reads one band lower.
   usage: [DEV=fold|ipadAir] node dev/test/pace-all-video.js <out.mp4>  (built root) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process');const sleep=t=>new Promise(r=>setTimeout(r,t));
const OUT=process.argv[2]||'pace-all.mp4';const DEV=process.env.DEV||'fold';
(async()=>{const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const dir=fs.mkdtempSync(path.join(os.tmpdir(),'pav-'));const b=await chromium.launch();const d=D.DEVICES[DEV];
 const ctx=await D.newDeviceContext(b,DEV,{recordVideo:{dir,size:{width:d.w,height:d.h}}});const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.addInitScript(()=>{let a=11112222;window.__rnd=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Math.random=()=>window.__rnd()});
 const T0=Date.now();const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');
 for(let i=0;i<400;i++){const s=await g.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return !document.getElementById('kload')||window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)?'ok':''});if(s==='ok')break;await sleep(250)}
 await sleep(1000);
 const cap=async t=>{await p.evaluate(t=>{let c=document.getElementById('pacap');if(!c){c=document.createElement('div');c.id='pacap';c.style.cssText='position:fixed;left:6px;bottom:6px;z-index:2147483647;max-width:46%;background:rgba(20,10,0,.78);color:#ffe9b0;font:600 13px/1.3 sans-serif;padding:5px 8px;border-radius:6px;pointer-events:none';document.body.appendChild(c)}c.textContent='TEST · '+t},t).catch(()=>{})};
 const clr=()=>g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});
 await g.evaluate(()=>{document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;
  const s=document.createElement('style');s.textContent='#klife,#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s);
  /* a course at bậc 0 with no progress, Sức and khắc to study (the game's own state otherwise) */const a=VIR.find(x=>x.k!=='cong'&&((S.vir||{})[x.k]||0)===0)||VIR.find(x=>x.k!=='cong');S.vir[a.k]=0;S.virp[a.k]=0;S.suc=Math.max(S.suc,90);S.bac=Math.max(S.bac||0,200);window.__pk=a.k;tab="art";render()});
 await sleep(800);await clr();await g.evaluate(()=>{tab="art";render()});await sleep(500);const tStart=(Date.now()-T0)/1000;
 const card=()=>g.evaluate(()=>{const b=document.querySelector(`[data-vlearn="${window.__pk}"]`);const box=b?b.closest('.kskill')||b.closest('.v85s')||b.parentElement.parentElement:null;if(box)box.scrollIntoView({block:'start'});return box?box.innerText.replace(/\s+/g,' ').slice(0,160):''});
 const c0=await card();await cap(`Tứ đức (cùng một thang với Tài nghệ): một môn ở bậc đầu — thanh «Tiến bộ» chỉ tính trong bậc này (${(c0.match(/Tiến bộ \d+\/\d+/)||[''])[0]})`);await sleep(4500);
 /* the lesson's own steps, each a real tap in the page (page.evaluate click: the #klife / #kroul overlays would catch a pointer click):
    «Tự học» → «Học X: làm gì?» → the first open «Làm …» → «vật liệu gì?» → the first open option → the lesson game «Bỏ qua» (#kg82skip, kitQuickRoll)
    → the result screen → «Đã hiểu» (#kg82ok, tdFinish applies the gain) */
 const steps=[];let qk='',res='',tries=0;const lesson=async()=>{
 await g.evaluate(()=>{const b=document.querySelector(`[data-vlearn="${window.__pk}"][data-mode="self"]`);if(b){b.scrollIntoView({block:'center'});b.click()}});await sleep(1200);
 qk='';res='';const vis=id=>`(()=>{const e=document.getElementById('${id}');return !!(e&&e.getClientRects().length)})()`;
 for(let i=0;i<14&&!res;i++){await sleep(1100);
  if(await g.evaluate(vis('kg82box-res'))){res=await g.evaluate(()=>(document.getElementById('kg82box-res').innerText||'').replace(/\s+/g,' ').slice(0,140));
   /* the result card closes with its ✕ (owner OD:L1352: no «Đã hiểu» word; the ✕ presses the hidden #kg82ok, tdFinish applies the gain) */
   await cap(`Kết quả buổi học: ${res.slice(0,90)}`);await sleep(3500);await cap('Bấm ✕ đóng kết quả');await sleep(900);
   await g.evaluate(()=>{const x=[...document.querySelectorAll('#ov .kit-x')].find(e=>e.getClientRects().length);if(x)x.click()});await sleep(1500);break}
  const r=await g.evaluate(()=>{const k=document.getElementById('kg82skip');if(k&&k.getClientRects().length){const t=k.textContent.trim().replace(/\s+/g,' ').slice(0,40);k.click();return{q:t}}
   const m=document.getElementById('modal');if(m.hidden)return{none:1};const B=[...m.querySelectorAll('button')].filter(b=>!b.disabled&&b.getClientRects().length&&!/✕|Lui|Đóng|Thôi/.test(b.textContent));
   const b=B.find(b=>/^\s*Làm/.test(b.textContent))||B.find(b=>b.classList.contains('opt'))||B[0];if(b){const t=b.textContent.trim().replace(/\s+/g,' ').slice(0,40);b.click();return{s:t}}return{none:2}});
  if(r.q){qk=r.q;await cap(`Trò học nhỏ → bấm «${qk}» (để trời định)`)}else if(r.s){steps.push(r.s);await cap(`Bấm «Tự học» → «${r.s}»`)}}
 for(let i=0;i<4;i++){const n=await g.evaluate(()=>{const m=document.getElementById('modal');if(m.hidden)return 0;const b=m.querySelector('.opt, button.btn');if(!b)return 0;b.click();return 1});if(!n)break;await sleep(700)}await clr();await g.evaluate(()=>{tab="art";render()});await sleep(600);
 };
 while(tries<4){tries++;await lesson();if(await g.evaluate(()=>(S.virp[window.__pk]||0)>0||(S.vir[window.__pk]||0)>0))break;
  await cap(`Lần này «để trời định» hỏng (không tiến bộ) — học lại buổi nữa`);await sleep(2500)}
 const c1=await card();await cap(`Sau một buổi học: ${(c1.match(/Tiến bộ \d+\/\d+/)||['—'])[0]} (bậc đầu cần 10 phần; một buổi học thường = 2 phần)`);await sleep(5000);
 /* (2) oán cool-down, shown where she reads it: the real «Nguy hiểm chung» chip of the top bar → «Người nặng lòng nhất» (oán n).
    The consort is one she already knows (tsDangerOf(S,true).top: the panel lists only people she has read); her grudge is set to Oán hận 85, fed by nothing. */
 const nh=async()=>{await g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;tab='art';render();const B=[...document.querySelectorAll('button[data-hx="tsnh"]')];const b=B.find(b=>b.getClientRects().length)||B[0];if(b)b.click()});await sleep(1200);
  return g.evaluate(()=>{const v=rivals.find(x=>x.id===window.__ov);const h=[...document.querySelectorAll('#modal .kpst')].find(e=>/nặng lòng/i.test(e.textContent));if(h)h.scrollIntoView({block:'center'});
   const row=[...document.querySelectorAll('#modal .kpsec')].map(e=>e.innerText).find(t=>t.includes(v.name))||'';return {o:Math.round(v.oan),w:oanW(v.oan),row:row.replace(/\s+/g,' ').slice(0,160)}})};
 const o=await g.evaluate(()=>{const T=tsDangerOf(S,true).top.map(x=>x.v);const L=T.length?T:liveRivals(true).filter(x=>!x.queen);const v=L.find(x=>Math.abs(persF(x,'forgive',1)-1)<.05)||L[0];
  v.oan=85;v.ocq={};v.occ={};window.__ov=v.id;/* test setup: she has already read this person (dò la), so the panel lists her */S.dKnown=S.dKnown||{};S.dKnown[v.id]=1;try{const K=k61S();if(K)K[kOf61(v)]=Math.max(2,+K[kOf61(v)]||0)}catch(e){}return{n:v.name,o:v.oan,w:oanW(v.oan),f:persF(v,'forgive',1)}});
 Object.assign(o,await nh());await cap(`«Nguy hiểm chung» → ${o.n}: ${o.w} (oán ${o.o}) với ngươi — không ai gây thêm chuyện`);await sleep(5500);
 await g.evaluate(()=>{for(let i=0;i<BAL.oanCool.season;i++)oanCool(1,true)});
 const o2=await nh();await cap(`Tua nhanh ${await g.evaluate(()=>BAL.oanCool.season)} tuần yên ổn (luật nguội mỗi tuần, BAL.oanCool): ${o.w} ${o.o} → ${o2.w} ${o2.o} — một mùa yên xuống một bậc oán`);await sleep(6500);
 const pan=await g.evaluate(()=>({vir:S.vir[window.__pk],virp:S.virp[window.__pk],log:(S.logs||S.log||[]).slice?((S.logs||S.log||[]).slice(-3)):null,q:Q.map(m=>m.t),tds:typeof TDS!=='undefined'?JSON.stringify(TDS.q||null).slice(0,80):''}));
 await clr();
 const vpath=await p.video().path();await ctx.close();await b.close();srv.close();
 const ss=Math.max(0,tStart-0.5).toFixed(2);cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',ss,'-i',vpath,'-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart','-crf','28',OUT]);
 console.log(JSON.stringify({dev:DEV,out:OUT,tries,c0,steps,qk,res,c1,o,o2,pan,errs:errs.slice(0,3)}))})().catch(e=>{console.error(e);process.exit(1)});
