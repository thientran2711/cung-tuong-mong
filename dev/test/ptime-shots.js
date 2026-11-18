/* PARALLEL TIME shots (Fold 755x1000@2 HOST + iPad 1180x820@2): sender card · status icon · «Đợi tin» panel · receiver «Đi» frame.
   usage: bash dev/site/build_site.sh && node dev/test/ptime-shots.js <outdir>   (shots stay OUTSIDE the repo) */
const {chromium}=require('playwright');const D=require('./lib/device');const OUT=process.argv[2]||'/tmp/ptime-shots';require('fs').mkdirSync(OUT,{recursive:true});
const sleep=t=>new Promise(r=>setTimeout(r,t));
(async()=>{const srv=await D.serveRoot();const b=await chromium.launch();const errs=[];
 for(const [nm,prof] of [["fold","fold"],["ipad","ipadAir"]]){const ctx=await D.newDeviceContext(b,prof,{deviceScaleFactor:2,viewport:nm==="fold"?{width:755,height:1000}:{width:1180,height:820}});
  const p=await ctx.newPage();p.on('pageerror',e=>errs.push(nm+": "+e.message));const g=await D.openHost(p,srv.url);await g.waitForFunction(()=>window.__ctmBuilt===1,null,{timeout:90000});
  /* the loading veil (jload #kload): shots of play, not of the first download */
  await g.evaluate(()=>{try{KLOAD.paused=true}catch(e){}const k=document.getElementById('kload');if(k)k.remove()});
  await g.evaluate(()=>{localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__bot=1;for(let i=0;i<20;i++){window.__nlInner=1;start();window.__nlInner=0;if(!isSrv()&&S.maid&&!S.out)break}window.__bot=0;
   Q.length=0;document.getElementById('modal').hidden=true;for(let i=0;i<12&&!((S.buoi||0)===0&&used===0);i++){Q.length=0;S.mg=0;try{nextBuoi()}catch(e){}Q.length=0}
   if(!(S.staff||[]).some(s=>s&&s.sid!=null))S.staff=(S.staff||[]).concat([mkServ("eunuch")]);tab="act";deal();render();for(const id of ['kload','klife']){const k=document.getElementById(id);if(k)k.remove()}});await sleep(2500);
  /* 1 sender card */
  await g.evaluate(()=>{const b=[...document.querySelectorAll('button,[role=tab],.tab,nav *')].find(e=>(e.textContent||'').trim()==='Hành sự');if(b)b.click()});await sleep(1500);
  await g.evaluate(()=>{const el=[...document.querySelectorAll('.act,.kact,.kac,button,[data-i]')].find(e=>/Sai cung nữ đi dò la/.test(e.textContent||""));if(el)el.scrollIntoView({block:"center"})});await sleep(600);
  await p.screenshot({path:`${OUT}/${nm}-1-sender-card.png`});
  /* 2 send her maid (dò la) + a servant (nghe ngóng); the dò la lands → icon with the red dot */
  await g.evaluate(()=>{S.payOnPick=1;spyPick(1);const d=Q[Q.length-1];const o=d&&d.opts&&d.opts.find(x=>x.kgt);Q.length=0;document.getElementById('modal').hidden=true;if(o)o.go();window.__ptShot=1;
   const s=(S.staff||[]).find(x=>x&&x.sid!=null&&x.name);spend(1);if(s)ptListen(s);tab="act";render()});await sleep(1200);
  await p.screenshot({path:`${OUT}/${nm}-2-status-icon.png`});
  await g.evaluate(()=>{kitStatusIcon.open("tin")});await sleep(900);await p.screenshot({path:`${OUT}/${nm}-3-tin-panel.png`});
  /* 3 receiver: maid road, the master's order */
  await g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;localStorage.clear();window.__bot=1;for(let i=0;i<30;i++){window.__nlInner=1;start();window.__nlInner=0;if(isSrv())break}window.__bot=0;if(!isSrv()){srvInit()}for(const id of ['kload','klife']){const k=document.getElementById(id);if(k)k.remove()}
   Q.length=0;document.getElementById('modal').hidden=true;try{deal()}catch(e){}render();const m=srvM();if(!m)return;const t=liveRivals(true).find(v=>v!==m&&v.alive&&!v.out);if(!t)return;pushDil(mkP("cnvOrd",{k:"spy",t:t.id}),`Lệnh của ${m.name}`);render()});await sleep(1200);
  await p.screenshot({path:`${OUT}/${nm}-4-receiver-order.png`});
  await g.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;S.srv.err={b:bid(),k:"tyv",n:"Sang Thái y viện lấy thuốc cho chủ"};ptErrFrame();render()});await sleep(1000);
  await p.screenshot({path:`${OUT}/${nm}-5-receiver-errand.png`});
  await ctx.close()}
 console.log(JSON.stringify({errs}));await b.close();srv.close()})();
