/* tinbao-words SHOTS: a full «Tin báo» built by the REAL producers (closing alert of the place she stays in after closing, her maid's «Nghe ngóng chung»
   errand landing with its «Xem tin» card, a Tai mắt «nghe lén» Sổ note, the maid's report) on Fold 755x1000 and iPad 1180x820 (host mode), + a short video.
   usage: node dev/test/tinbao-words/shots.js <builtRootDir> <outDir> <tag> [video]   → <tag>-fold.jpg, <tag>-ipad.jpg, <tag>-rows.json (+ <tag>-ipad.webm) */
const {chromium}=require('playwright');const fs=require('fs');const D=require('../lib/device');
const [,,ROOT,OUT,TAG,VID]=process.argv;
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch();const res={};
 for(const dev of ['fold','ipadAir']){const vid=VID&&dev==='ipadAir'?{recordVideo:{dir:OUT,size:{width:1180,height:820}}}:{};
  const ctx=await D.newDeviceContext(b,dev,Object.assign({reducedMotion:'reduce'},vid));
  await ctx.addInitScript(()=>{let s=777;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));
  const g=await D.openHost(p,srv.url);
  await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title'),null,{timeout:180000});await p.waitForTimeout(2000);
  await g.evaluate(()=>{try{localStorage.clear()}catch(e){}setInterval(()=>{document.querySelectorAll('#kroul,#kroulw,.kroul,#kload').forEach(r=>r.remove())},200);SLOT=3;document.getElementById('title').hidden=true;for(let j=0;j<30;j++){try{store.set(NL_KEY,null)}catch(e){}try{start()}catch(e){}if(!(typeof isSrv==='function'&&isSrv()))break}});
  await g.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name&&S.maid&&rivals&&rivals.length,null,{timeout:120000});await p.waitForTimeout(2500);
  const info=await g.evaluate(async()=>{const o={};const w=ms=>new Promise(r=>setTimeout(r,ms));Q.length=0;try{document.getElementById('modal').hidden=true}catch(e){}
   NT.list.length=0;S.buoi=1;used=0;try{render()}catch(e){}
   /* 1. her maid «Nghe ngóng chung» → lands → the errand report notice (Xem tin) */
   try{const a=ptListen(S.maid);o.send=a;const z=(S.away||[]).find(x=>x.kind==='listen'&&!x.back);if(z){z.due=ptNow();ptTick()}}catch(e){o.e1=e.message}
   /* 2. Tai mắt nghe lén (jagent agReact «Nghe lén», the real go) on the Hoàng hậu / first rival */
   try{const v=(typeof queenP==='function'&&queenP()&&queenP()!==S?queenP():null)||liveRivals(true)[0];const p0={k:'pmPlay',act:'rủ người cùng chơi',kh:0,/* the real agWhy text */why:(()=>{try{return agWhy(v,{k:'pmPlay'},{})}catch(e){return'muốn có thêm người thân cận'}})()};
    const T0=agTry,K0=agSpendKh,L0=agLand;agTry=()=>true;agSpendKh=()=>true;agLand=()=>{};try{const O=agReact(p0,v,S);const h=O.find(x=>x.n==='Nghe lén');if(h)h.go()}finally{agTry=T0;agSpendKh=K0;agLand=L0}if(typeof kitKnowFlush==='function')kitKnowFlush()}catch(e){o.e2=e.message}
   /* 3. she stays in a place that is closed now → the closing alert */
   try{const P=(typeof places==='function'?places():[]).map(x=>x.k);let k=null;for(const x of P){try{if(x&&x!=='home'&&!(typeof accOwn==='function'&&accOwn(S,x))&&!accessOf(S,x).ok){k=x;break}}catch(e){}}o.close=k;if(k){S.place=k;S.closeSeen=null;render()}}catch(e){o.e3=e.message}
   await w(300);o.n=NT.list.length;kitNoticeOpen();await w(1600);try{kitRankNamePaint(document.getElementById('modal'))}catch(e){}
   o.rows=[...document.querySelectorAll('#modal .kntl li')].map(li=>li.innerText.replace(/\s+/g,' ').trim());
   o.cards=[...document.querySelectorAll('#modal .opts > button')].map(bt=>bt.innerText.replace(/\s+/g,' ').trim());return o});
  await p.evaluate(()=>{const f=()=>document.querySelectorAll('#kroul,#kroulw,.kroul,#kload').forEach(r=>r.remove());f();setInterval(f,200)});/* host page covers too */
  await p.waitForTimeout(3000);await p.screenshot({path:`${OUT}/${TAG}-${dev==='fold'?'fold':'ipad'}.jpg`,type:'jpeg',quality:82});
  /* 2nd owner case (OD ~23:54Z): the «Tin chờ người sai đi» dialog shows the speaker at the left — her name must not be in the body */
  info.tin=await g.evaluate(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));Q.length=0;document.getElementById('modal').hidden=true;
   try{kitStatusIcon.open('tin');showModal()}catch(e){return{e:e.message}}await w(1600);const M=document.getElementById('modal');
   const body=[...M.querySelectorAll('.kft, .kfacts li, .kpsec li, .kpsec p')].map(e=>e.innerText.replace(/\s+/g,' ').trim()).filter(Boolean);
   const nm=S.maid&&S.maid.name;return{title:(M.querySelector('.kptitle')||{}).innerText,maid:nm,body,nameInBody:!!nm&&body.some(t=>t.includes(nm))}});
  await p.waitForTimeout(1500);await p.screenshot({path:`${OUT}/${TAG}-${dev==='fold'?'fold':'ipad'}-tin.jpg`,type:'jpeg',quality:82});
  if(VID&&dev==='ipadAir'){await p.waitForTimeout(2500);await g.evaluate(()=>{const c=[...document.querySelectorAll('#modal .opts > button')].find(b=>/Xem tin/.test(b.innerText));if(c)c.click()});await p.waitForTimeout(3000)}
  info.errs=errs.slice(0,5);res[dev]=info;const v=p.video&&p.video();await ctx.close();if(v){try{fs.renameSync(await v.path(),`${OUT}/${TAG}-ipad.webm`)}catch(e){}}}
 fs.writeFileSync(`${OUT}/${TAG}-rows.json`,JSON.stringify(res,null,1));console.log(JSON.stringify(res,null,1).slice(0,3000));await b.close();srv.close();
 const bad=Object.values(res).filter(r=>r.tin&&r.tin.nameInBody);if(bad.length){console.error('FAIL: the «Tin chờ người sai đi» body names the speaker shown at the left');process.exitCode=1}})().catch(e=>{console.error(e);process.exit(2)});
