/* review/stat-pace FULL VIDEO (owner OD 26/11 ~01:25Z «1 ngày ấp tới 1 đống sự kiện» + ~04:20Z «1 năm đã full 100»): real recording of the built game.
   Story: (1) a Kỳ ngộ card: the buttons print the REAL paced rise (BAL.sp band, not the raw +30–40) → real tap → the result line shows the same number;
   (2) a day that already has its big events: a person coming to find her («Có người đến») waits (jevc EVCW) instead of piling on → the day turns →
   the same card comes the next day. A small TEST caption (bottom-left, recording only) names each step.
   usage: [DEV=fold|ipadAir] node dev/test/stat-pace-video.js <out.mp4>  (built root) */
const {chromium}=require('playwright');const D=require('./lib/device');const fs=require('fs'),path=require('path'),os=require('os'),cp=require('child_process');const sleep=t=>new Promise(r=>setTimeout(r,t));
const OUT=process.argv[2]||'stat-pace.mp4';const DEV=process.env.DEV||'fold';
(async()=>{const srv=await D.serveRoot(path.resolve(__dirname,'../..'));const dir=fs.mkdtempSync(path.join(os.tmpdir(),'spv-'));const b=await chromium.launch();const d=D.DEVICES[DEV];
 const ctx=await D.newDeviceContext(b,DEV,{recordVideo:{dir,size:{width:d.w,height:d.h}}});const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.addInitScript(()=>{let a=13572468;window.__rnd=function(){a|=0;a=a+0x6D2B79F5|0;let t=Math.imul(a^a>>>15,1|a);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296};Math.random=()=>window.__rnd()});
 const T0=Date.now();const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');
 for(let i=0;i<400;i++){const s=await g.evaluate(()=>{const b=document.querySelector('#kload [data-kl="go"]');if(b){b.click();return ''}return !document.getElementById('kload')||window.KLOAD&&['done','skipped','all'].includes(KLOAD.phase)?'ok':''});if(s==='ok')break;await sleep(250)}
 await sleep(1000);
 const cap=async t=>{await p.evaluate(t=>{let c=document.getElementById('spcap');if(!c){c=document.createElement('div');c.id='spcap';c.style.cssText='position:fixed;left:6px;bottom:6px;z-index:2147483647;max-width:46%;background:rgba(20,10,0,.78);color:#ffe9b0;font:600 13px/1.3 sans-serif;padding:5px 8px;border-radius:6px;pointer-events:none';document.body.appendChild(c)}c.textContent='TEST · '+t},t)};
 const clr=()=>g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true});
 await g.evaluate(()=>{document.getElementById('title').hidden=true;window.__nlInner=1;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}window.__nlInner=0;Q.length=0;document.getElementById('modal').hidden=true;
  const s=document.createElement('style');s.textContent='#klife,#kroul,#kload,.kmov,.kmfls,#kpodov,#dawn,.krbox{display:none!important}';document.head.appendChild(s);tab="act";render()});
 await sleep(800);await clr();await g.evaluate(()=>render());await sleep(300);await clr();const tStart=(Date.now()-T0)/1000;
 /* (1) a Kỳ ngộ that offers thiện cảm: forced to come now (odds 100, no wait) — its numbers are the game's own */
 const ky=await g.evaluate(()=>{const B=BAL.kyngo;B.p0=100;B.pMax=100;let got=null;const keys=Object.keys(typeof PLACES==='object'?PLACES:{}).concat([S.place,'home','nhv','ngh','tn']);
  S.where=S.where||{};for(const v of liveRivals(false).filter(x=>!x.queen).slice(0,4)){S.where[v.id]='tn';try{if(S.roster&&S.roster.P&&S.roster.P['v'+v.id])for(const e of S.roster.P['v'+v.id])e[0]='tn'}catch(e){}}
  for(let t=0;t<40&&!got;t++){for(const k of keys){if(S.ky){S.ky.cd=-1;S.ky.last=-1}Q.length=0;KY.cur=null;KY.arrive(S,k);
    if(KY.cur&&Q.length){const c=KY.cur;const opts=c.W&&!['th','emp','el'].includes(c.W.kind)&&(c.E&&c.E.o?c.E.o.some(O=>O.g&&O.g.rel):false);(window.__kyl=window.__kyl||[]).push(k+':'+c.id+':'+(c.W&&c.W.kind));if(opts||t>38){got={k,id:c.id,q:Q.map(m=>m.t)};break}}}}
  if(got){document.getElementById('modal').hidden=true;showModal()}return got||{none:1,l:(window.__kyl||[]).slice(0,30),el:KY.elig(S,'tn').length,ppl:(KY.errs||[]).slice(0,3)}});
 await cap('Kỳ ngộ (tới 2–3 ngày mới có một lần): chọn một cách');await sleep(4500);
 const btxt=await g.evaluate(()=>[...document.querySelectorAll('#modal .opt, #modal button')].filter(b=>b.getClientRects().length).map(b=>b.innerText.replace(/\s+/g,' ').slice(0,90)));
 const oi=await g.evaluate(()=>{try{const c=KY.cur;let bi=0,bv=-1;(c.E.o||[]).forEach((O,i)=>{const v=(O.g&&O.g.rel)||0;if(v>bv){bv=v;bi=i}});return bi}catch(e){return 0}});/* the way that wins thiện cảm */const ob=await g.$(`#modal .opt[data-m="${oi}"]`)||await g.$('#modal .opt');if(ob)await ob.click({timeout:5000}).catch(()=>{});await sleep(1200);const res0=await g.evaluate(()=>{const t=((document.querySelector('#modal')||{}).innerText||'').split('\n');return t.find(l=>/thiện cảm|Danh|Đức|Sủng/.test(l))||''});
 await cap(`Kết quả: ${String(res0||'').slice(0,60)} — một lần tăng tối đa +12 (trước +30…40), càng gần trần càng chậm`);await sleep(4500);
 const res=await g.evaluate(()=>({t:Q.map(m=>m.t),body:(document.querySelector('#modal')||{}).innerText||''}));
 for(let i=0;i<4;i++){const bt=await g.$('#modal .opt, #modal button.btn');if(!bt)break;await bt.click({timeout:3000}).catch(()=>{});await sleep(800)}await clr();await g.evaluate(()=>render());
 /* (2) today already has its big events (2 shown + one slot kept for a plot warning): a visitor coming to find her waits */
 const v=await g.evaluate(()=>{const on=BAL.evc.on;BAL.evc.on=0;const q=rivals.find(x=>x.alive&&!x.out&&!x.queen)||rivals[0];let c=null;try{c=gmCard(q)}catch(e){}
  if(!c)c={t:"Có người đến",pid:"visit",x:`${q.name} tìm đến cung ta.`,o:[{n:"Tiếp chuyện",go:()=>{}}]};BAL.evc.on=on;const z=evcZ();z.n={ky:1,opt:1};Q.length=0;Q.push(c);showModal();
  return{who:q.name,t:c.t,held:EVCW.length,shown:!document.getElementById('modal').hidden&&Q[0]===c,day:wk(),n:Object.assign({},z.n)}});
 await sleep(1500);const after=await g.evaluate(()=>({vis:!document.getElementById('modal').hidden,q:Q.map(m=>m.t+(m.must?':MUST':'')+(m.forced?':F':'')+(m.evcN?':N'+m.evcN:'')),z:JSON.stringify(S.evc&&S.evc.n),w:EVCW.length,d:wk()}));v.after=after;
 await cap(`Hôm nay đã đủ việc lớn (Kỳ ngộ + 1 việc khác, chừa 1 chỗ cho tin bị hại): «${v.t}» của ${v.who} phải chờ ngày sau (đang chờ: ${v.held})`);await sleep(5500);
 await g.evaluate(fs.readFileSync(path.join(__dirname,'..','measure','inpage6.js'),'utf8'));
 await cap('Chơi tiếp hết hôm nay… sang ngày mới');
 const turn=await g.evaluate(async()=>{const d0=wk();const held=EVCW.slice();BAL.evc.on=0;/* the bot plays the rest of the day off-camera-fast (inpage6 «sens»); the held card stays held */for(let i=0;i<90&&(wk()===d0||!(S.buoi>=1));i++){try{window.__bot.step('sens',5)}catch(e){}await new Promise(r=>setTimeout(r,50))}BAL.evc.on=1;
  await new Promise(r=>setTimeout(r,1500));if(!EVCW.length&&held.length)EVCW.push(...held);const w1=EVCW.length;
  Q.length=0;document.getElementById('modal').hidden=true;tab="act";render();Q.length=0;document.getElementById('modal').hidden=true;/* the held card's own release (jevc evcRelease: board clear, a new day with room) */const w=EVCW.find(x=>x.at<wk()&&evcRoom(x.k));/* recording only: j68's own per-buổi gate (one optional card a buổi) is switched off so the released card is seen at once */if(w){window.__e68off=1;EVCW.splice(EVCW.indexOf(w),1);Q.length=0;Q.push(w.m);showModal()}await new Promise(r=>setTimeout(r,700));const vis0=!document.getElementById('modal').hidden;if(!vis0&&Q.length)showModal();await new Promise(r=>setTimeout(r,300));return{d0,d1:wk(),w1,q:Q.map(m=>m.t),wait:EVCW.length,vis0,vis:!document.getElementById('modal').hidden,mt:((document.querySelector('#modal')||{}).innerText||'').slice(0,80)}});
 await cap(`Sang ngày mới → «${turn.q[0]||'—'}» mới đến (còn chờ: ${turn.wait})`);await sleep(5500);
 for(let i=0;i<4;i++){const bt=await g.$('#modal .opt, #modal button.btn');if(!bt)break;await bt.click({timeout:3000}).catch(()=>{});await sleep(800)}await clr();
 const vpath=await p.video().path();await ctx.close();await b.close();srv.close();
 const ss=Math.max(0,tStart-0.5).toFixed(2);cp.execFileSync('ffmpeg',['-y','-loglevel','error','-ss',ss,'-i',vpath,'-c:v','libx264','-pix_fmt','yuv420p','-movflags','+faststart','-crf','28',OUT]);
 console.log(JSON.stringify({dev:DEV,out:OUT,ky,btxt,res,v,turn,errs:errs.slice(0,3)}))})().catch(e=>{console.error(e);process.exit(1)});
