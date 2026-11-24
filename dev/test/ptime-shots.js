/* PARALLEL TIME shots (Fold 755x1000@2 HOST + iPad 1180x820@2): sender card · status icon · «Đợi tin» panel ·
   receiver (OD 18/11 ~21:15Z): the order NOTICE (信 badge, no pop-up) · the panel with «Nghe lệnh» · the 4-answer order card · Việc chủ sai (3 answers).
   The loading screens (#kload, #klife) are WAITED FOR the game's own way: their own buttons ([data-klife] «vào luôn», the kload button) are
   tapped when they show; nothing is hidden or removed by the script.
   usage: bash dev/site/build_site.sh && node dev/test/ptime-shots.js <outdir>   (shots stay OUTSIDE the repo) */
const {chromium}=require('playwright');const D=require('./lib/device');const OUT=process.argv[2]||'/tmp/ptime-shots';require('fs').mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
/* wait until neither loading screen is on the page (max 90 s); tap their own buttons when offered */
async function settle(g){const t0=Date.now();let n=0;
 while(Date.now()-t0<90000){const st=await g.evaluate(()=>{const on=id=>{const e=document.getElementById(id);return !!e&&!e.classList.contains('out')};
   const b=document.querySelector('#klife [data-klife]')||[...document.querySelectorAll('#kload button')].find(x=>/Chơi luôn|Vào cung|vào luôn/i.test(x.textContent||''));if(b&&b.offsetParent)b.click();
   return {life:on('klife'),load:on('kload'),gate:typeof LIFE!=="undefined"&&!!LIFE.on}});
  if(!st.life&&!st.load&&!st.gate){if(++n>=3)return true}else n=0;await sleep(400)}
 return false}
/* FAIL 7 item 7: every shot starts clean — random notices (dialog queue Q, the open modal, the kitLine pill) are cleared BEFORE each shot's
   own action, so only that shot's subject shows; keepLine = the shot's subject IS the kitLine notice (shot 4) */
async function clean(g,keepLine){await g.evaluate(k=>{try{Q.length=0;S.mg=0;const md=document.getElementById('modal');if(md)md.hidden=true;if(!k){const l=document.getElementById('kupdline');if(l)l.remove()}render()}catch(e){}},!!keepLine);await sleep(250)}
async function shot(p,g,path,keepLine){await settle(g);/* every picture on screen loaded (faces in fact rows arrive late) */await g.waitForFunction(()=>[...document.images].filter(i=>i.offsetParent).every(i=>i.complete&&i.naturalWidth>0),null,{timeout:10000}).catch(()=>{});await sleep(400);await p.screenshot({path})}
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const errs=[],wait=[];
 for(const [nm,prof] of [["fold","fold"],["ipad","ipadAir"]]){const ctx=await D.newDeviceContext(b,prof,{deviceScaleFactor:2,viewport:nm==="fold"?{width:755,height:1000}:{width:1180,height:820}});
  const p=await ctx.newPage();await require('./lib/veil').guard(p);p.on('pageerror',e=>errs.push(nm+": "+e.message));const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:90000});
  wait.push([nm,"open",await settle(g)]);
  await g.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__bot=1;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv()&&S.maid&&!S.out)break}window.__bot=0;
   Q.length=0;document.getElementById('modal').hidden=true;for(let i=0;i<12&&!((S.buoi||0)===0&&used===0);i++){Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}
   if(!(S.staff||[]).some(s=>s&&s.sid!=null))S.staff=(S.staff||[]).concat([mkServ("eunuch")]);tab="act";deal();render()});
  wait.push([nm,"life",await settle(g)]);await sleep(800);
  /* 1 sender card */
  await g.evaluate(()=>{const b=[...document.querySelectorAll('button,[role=tab],.tab,nav *')].find(e=>(e.textContent||'').trim()==='Hành sự');if(b)b.click()});await sleep(1500);
  await g.evaluate(()=>{const el=[...document.querySelectorAll('.act,.kact,.kac,button,[data-i]')].find(e=>/Sai cung nữ đi dò la/.test(e.textContent||""));if(el)el.scrollIntoView({block:"center"})});await sleep(600);
  await clean(g);await shot(p,g,`${OUT}/${nm}-1-sender-card.png`);
  /* 2 send her maid (dò la) + a servant (nghe ngóng); the dò la lands → icon with the red dot */
  await clean(g);await g.evaluate(()=>{S.payOnPick=1;spyPick(1);const d=Q[Q.length-1];const o=d&&d.opts&&d.opts.find(x=>x.kgt);Q.length=0;document.getElementById('modal').hidden=true;if(o)o.go();window.__ptShot=1;
   const s=(S.staff||[]).find(x=>x&&x.sid!=null&&x.name);spend(1);if(s)ptListen(s);tab="act";render()});await sleep(1200);
  await g.evaluate(()=>{Q.length=0;const md=document.getElementById('modal');if(md)md.hidden=true});await shot(p,g,`${OUT}/${nm}-2-status-icon.png`);
  await clean(g);await g.evaluate(()=>{kitStatusIcon.open("tin")});await sleep(900);await shot(p,g,`${OUT}/${nm}-3-tin-panel-doi-tin.png`);
  /* 3 receiver: maid road; the master's order arrives as a NOTICE */
  await g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;localStorage.clear();window.__bot=1;for(let i=0;i<30;i++){window.__nlInner=1;start();window.__nlInner=0;if(isSrv())break}window.__bot=0;if(!isSrv()){srvInit()}});
  wait.push([nm,"life2",await settle(g)]);
  await clean(g);await g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;S.ordQ=[];try{deal()}catch(e){}render();const m=srvM();if(!m)return;const t=liveRivals(true).find(v=>v!==m&&v.alive&&!v.out);if(!t)return;
   window.__j95boff=1;const d=mkP("cnvOrd",{k:"spy",t:t.id});window.__j95boff=0;pushDil(d,`Lệnh của ${m.name}`);render()});await sleep(700);
  await clean(g,1);await shot(p,g,`${OUT}/${nm}-4-receiver-notice.png`);
  await clean(g);await g.evaluate(()=>{kitStatusIcon.open("tin")});await sleep(900);await shot(p,g,`${OUT}/${nm}-5-receiver-panel.png`);
  await clean(g);await g.evaluate(()=>{const o=(S.ordQ||[])[0];if(o)ptOrdOpen(o)});await sleep(1100);
  await shot(p,g,`${OUT}/${nm}-6-receiver-4-answers.png`);
  await clean(g);await g.evaluate(()=>{S.ordQ=[];S.srv.err={b:bid(),k:"tyv",n:"Sang Thái y viện lấy thuốc cho chủ"};ptErrFrame();const o=S.ordQ.find(x=>x.pid==="err");if(o)ptOrdOpen(o)});await sleep(1100);
  await shot(p,g,`${OUT}/${nm}-7-receiver-errand-3-answers.png`);
  await ctx.close()}
 console.log(JSON.stringify({errs,wait}));await b.close();srv.close()})();
