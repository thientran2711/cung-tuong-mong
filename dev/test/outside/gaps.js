/* review/outside-gaps (GAP OR01 OR06 OR08 OR14, jkcg.js): node dev/test/outside/gaps.js <site url> <outdir> [WxH@dpr ...]
   Per size: new tt life on the home road -> OR01 scenes (SCIMG kc-*), Dư đồ house + city map with hotspots, gate switches map, Huynh trưởng own figure;
   OR06 a festival opens the real mini-game (#kg82) and its result moves Danh; OR08 entry cap (+BAL.kcg.carry.cap over the home start, before the kcv carry),
   «lời đồn cũ» flag + event (3 options), father's liking moves «Nhờ cha dâng sớ», mother's letter (real item thunha in the bag, mail row), Tư trang › Thư nhà
   pane + its two acts; OR14 «Khuê các» titles (selection, Quý nhân) in S.dh + localStorage ctm-kct, rare title via kcEnd. Shots: map, family, Thư nhà, titles.
   Prints one JSON report; exit 1 on any fail. */
const {chromium}=require('playwright');const fs=require('fs');
const A=process.argv.slice(2);const URL=A[0];const OUT=A[1]||'.';fs.mkdirSync(OUT,{recursive:true});
const sizes=A.slice(2).filter(x=>/^\d+x\d+@/.test(x));if(!sizes.length)sizes.push('755x1000@2');
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
(async()=>{const b=await chromium.launch();const rep=[];let bad=0;
 for(const sz of sizes){const [wh,d]=sz.split('@');const [W,H]=wh.split('x').map(Number);
  const c=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+d,serviceWorkers:'block',hasTouch:W<1100,isMobile:W<1100,reducedMotion:'reduce'});
  await c.addInitScript(()=>{try{localStorage.setItem('ctm-bgpause','1')}catch(e){}setInterval(()=>{document.querySelectorAll('.krskip').forEach(b=>b.click());document.querySelectorAll('[data-km-close]').forEach(b=>{if(b.offsetParent)b.click()})},300)});
  const p=await c.newPage();p.setDefaultTimeout(120000);const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)+' @'+String(e.stack||'').split('\n')[1]));
  const R={size:sz,fail:[]};const F=m=>R.fail.push(m);
  const shot=async n=>{await p.evaluate(()=>{try{PX.app.ticker.stop()}catch(e){}});await sleep(400);await p.screenshot({path:`${OUT}/${wh}-${n}.jpg`,type:'jpeg',quality:70}).catch(()=>{});await p.evaluate(()=>{try{PX.app.ticker.start()}catch(e){}})};
  const meas=()=>p.evaluate(()=>{const root=[document.getElementById('panel'),document.getElementById('modal')].filter(Boolean);const txt=root.map(r=>r.offsetParent||r.id==='panel'?r.innerText:'').join('\n');
   return{ovf:document.documentElement.scrollWidth>innerWidth+1,bad:(()=>{const m=txt.match(/\?\?\?|undefined|NaN|\[object|%/);return m?txt.slice(Math.max(0,m.index-60),m.index+12).replace(/\s+/g,' '):''})()}});
  const skipOverlays=async()=>{for(let i=0;i<6;i++){const n=await p.evaluate(()=>{const k=document.getElementById('kload');if(k){k.remove();return 1}const o=document.getElementById('kroul');
    if(o&&o.isConnected){const b=[...o.querySelectorAll('button')].find(x=>/Bỏ qua/.test(x.textContent));if(b){b.click();return 1}}return 0});if(!n)break;await sleep(700)}};
  const drain=()=>p.evaluate(()=>{for(let i=0;i<20&&Q.length&&!S.dead;i++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}render()});
  await p.goto(URL,{waitUntil:'domcontentloaded'});await sleep(2500);await p.evaluate(()=>{try{localStorage.clear()}catch(e){}});await p.reload({waitUntil:'domcontentloaded'});await sleep(3000);await skipOverlays();
  await p.evaluate(()=>document.querySelector('#slots button[data-new="1"]').click());await sleep(2500);await skipOverlays();
  await p.evaluate(()=>{for(let i=0;i<60&&(S.srv||(typeof isSrv==='function'&&isSrv())||!KC.ok.includes(S.origin.k));i++){try{store.set(NL_KEY,null)}catch(e){}start()}if(S.origin.k!=='tt'&&!S.srv){S.origin=ORIGINS.find(x=>x.k==='tt');nlCard()}});await sleep(600);await skipOverlays();
  await p.evaluate(()=>{const b=document.querySelector('#modal [data-kcp="nha"]');b.click()});await sleep(700);for(let i=0;i<40&&await p.evaluate(()=>!!document.getElementById('kroul'));i++)await sleep(500);
  await p.evaluate(()=>{const b=document.querySelector('#modal button[data-nl="ok"]');b.click()});await sleep(1500);await drain();await sleep(1000);
  /* ---- OR01 ---- */
  R.or01=await p.evaluate(()=>({kc:isKc(),sc:SCIMG.kcKhue,st0:S.kc.st0}));if(!R.or01.kc)F('not on the home road');if(R.or01.sc!=='kc-khue')F('SCIMG kcKhue '+R.or01.sc);if(!R.or01.st0)F('no S.kc.st0');
  await p.evaluate(()=>{window.__mapList=false;KTSUB.kcgo='phu';tab='go';render()});for(let i=0;i<20&&!await p.evaluate(()=>!!document.querySelector('#panel .mapimg'));i++)await sleep(300);
  R.map=await p.evaluate(()=>({img:(document.querySelector('#panel .mapimg')||{}).src||'',spots:document.querySelectorAll('#panel .mspot[data-kcgo]').length,gate:!!document.querySelector('#panel [data-kcmap="kinh"]')}));
  if(!/map-kc-nha/.test(R.map.img)||R.map.spots<8||!R.map.gate)F('house map '+JSON.stringify(R.map));R.mapM=await meas();if(R.mapM.ovf||R.mapM.bad)F('map panel '+JSON.stringify(R.mapM));await shot('or01-map-nha');
  R.gateClick=await p.evaluate(()=>{const b=document.querySelector('#panel [data-kcmap="kinh"]');b.click();return KTSUB.kcgo});for(let i=0;i<20&&!await p.evaluate(()=>/map-kc-kinh/.test((document.querySelector('#panel .mapimg')||{}).src||''));i++)await sleep(300);
  R.map2=await p.evaluate(()=>({img:(document.querySelector('#panel .mapimg')||{}).src||'',spots:document.querySelectorAll('#panel .mspot[data-kcgo]').length,back:!!document.querySelector('#panel [data-kcmap="phu"]')}));
  if(!/map-kc-kinh/.test(R.map2.img)||R.map2.spots<5||!R.map2.back)F('city map '+JSON.stringify(R.map2));await shot('or01-map-kinh');
  /* a tap on a house spot walks there (back to the house map first) */
  R.walk=await p.evaluate(()=>{for(let j=0;j<20&&Q.length;j++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}KTSUB.kcgo='phu';tab='go';render();const b=[...document.querySelectorAll('#panel .mspot[data-kcgo]')].find(x=>!x.disabled&&x.dataset.kcgo!==S.place);if(!b)return'none';const k=b.dataset.kcgo;b.click();return S.place===k?'ok':'stayed '+S.place});if(R.walk!=='ok')F('walk '+R.walk);
  for(let i=0;i<30&&!await p.evaluate(()=>Object.keys((FIGIX||{}).huynh||{}).length>0);i++)await sleep(500);
  R.huynh=await p.evaluate(()=>{const h=kcR('huynh');if(!h)return{none:1};const f=kcPor(h,'fig');return{fid:h.fid,fig:f,por:kcPor(h,'por')}});
  if(!R.huynh.none&&!/^huynh:/.test(R.huynh.fid||''))F('huynh fid '+R.huynh.fid);if(!R.huynh.none&&!/fig-man-huynh-\d-a\d\d/.test(R.huynh.fig||''))F('huynh fig '+R.huynh.fig);
  /* stand where the brother is (stage figure) */
  R.huynhStage=await p.evaluate(()=>{const h=kcR('huynh');if(!h)return'none';let k=S.kc.at[h.id];if(!k){S.kc.at[h.id]='kc_sanh';k='kc_sanh'}S.place=k;S.visit=kcVisit(k);tab='act';render();return k});await sleep(2500);await shot('or01-huynh-stage');
  await p.evaluate(()=>{tab='rv';render()});await sleep(800);R.rvM=await meas();if(R.rvM.ovf||R.rvM.bad)F('family tab '+JSON.stringify(R.rvM));
  /* ---- OR06 ---- */
  R.or06=await p.evaluate(()=>{S.suc=90;const d0=S.danh;for(let j=0;j<20&&Q.length;j++){const m=Q[0];if(m.opts&&m.opts.length)chooseM(Math.max(0,m.opts.findIndex(c=>!c.off)));else closeModal()}pushDil(mkP('kcE',{e:'tho'}),'Hội thơ');const qi=Q.findIndex(m=>m.pid==='kcE');if(qi>0)Q.unshift(Q.splice(qi,1)[0]);showModal();const i=Q[0].opts.findIndex(o=>/làm thơ/.test(o.n));chooseM(i);return{d0,mg:!!document.getElementById('kg82')}});
  await sleep(1500);R.or06.mgOpen=await p.evaluate(()=>{const e=document.getElementById('kg82');return !!(e&&e.isConnected)});if(!R.or06.mgOpen)F('festival did not open the mini-game');
  await shot('or06-mg');
  await p.evaluate(()=>{const s=document.getElementById('kg82skip');if(s)s.click()});await sleep(800);await p.evaluate(()=>{const o=document.getElementById('kg82ok');if(o)o.click()});await sleep(800);
  R.or06.after=await p.evaluate(()=>({danh:S.danh,q:Q.map(m=>m.t)}));if(R.or06.after.danh===R.or06.d0)F('festival result did not move Danh');await drain();
  /* ---- OR08 ---- */
  R.or08=await p.evaluate(()=>{const K=S.kc;const cap0=BAL.kcg.carry.cap;BAL.kcg.carry.cap=15;/* the knob is OFF on live (OD:L1288); the mechanism is tested at 15 */K.st0.sac=50;S.sac=75;S.tai=Math.min(100,K.st0.tai+5);S.kld=55;const cha=kcR('cha'),me=kcR('me')||kcR('to');
   kcEnter(1);BAL.kcg.carry.cap=cap0;const st=BAL.kcv[S.origin.k]?BAL.kcv[S.origin.k].st:BAL.kcv.kc.st;const f=(K.carry&&K.carry.f)||1;
   const o={inPal:K.inPal,sac:S.sac,want:Math.min(100,K.st0.sac+15+Math.round(st*f)),cap:K.cap,ldOld:K.ldOld,dh:Object.keys(S.dh||{}).filter(k=>/^kc_/.test(k)),kct:Object.keys((store.get('ctm-kct')||{t:{}}).t)};
   if(cha){cha.af=100;o.askHi=askO(S);cha.af=0;o.askLo=askO(S);cha.af=60}
   if(me){me.af=90;K.wr=S.turn-1;const n0=S.inv.filter(e=>e.k==='thunha').length;kcgPalMonth();o.letter=S.inv.filter(e=>e.k==='thunha').length-n0;o.mail=(K.mail||[]).length;o.q=Q.map(m=>m.t)}
   return o});
  const o8=R.or08;if(!o8.inPal)F('kcEnter did not enter');if(!(o8.cap&&o8.cap.sac===10))F('cap (75 on a start of 50, cap 15) should cut Sắc by 10: '+JSON.stringify(o8.cap));if(o8.sac>o8.want+3)F(`entry cap: Sắc ${o8.sac} > ${o8.want}`);if(o8.ldOld!==55)F('lời đồn cũ flag '+o8.ldOld);
  if(o8.askHi!=null&&!(o8.askHi>o8.askLo))F(`father's liking does not move Nhờ cha dâng sớ ${o8.askHi}/${o8.askLo}`);if(o8.letter!==1||!o8.mail)F('mother letter '+JSON.stringify(o8));
  if(!o8.dh.includes('kc_tuyen')||!o8.kct.includes('kc_tuyen'))F('title kc_tuyen '+JSON.stringify(o8.dh));await sleep(500);await shot('or08-letter');await drain();
  for(let i=0;i<4;i++){if(!await p.evaluate(()=>document.body.classList.contains('kbk-open')))break;await p.keyboard.press('Escape');await sleep(600)}
  await p.evaluate(()=>{KINV_SUB='nha';tab='inv';render();const P=document.getElementById('panel');if(P)P.scrollTop=0});await sleep(900);
  R.home=await p.evaluate(()=>({tab:!!document.querySelector('[data-kinvsub="nha"]'),pane:!!document.querySelector('[data-kinvpane="nha"]:not([hidden])'),acts:document.querySelectorAll('[data-kinvpane="nha"] [data-kcgh]').length}));
  if(!R.home.tab||!R.home.pane||R.home.acts!==2)F('Thư nhà pane '+JSON.stringify(R.home));R.homeM=await meas();if(R.homeM.ovf||R.homeM.bad)F('Thư nhà '+JSON.stringify(R.homeM));await shot('or08-thunha');
  R.write=await p.evaluate(()=>{const b=document.querySelector('[data-kcgh="wr"]');if(!b||b.disabled)return'disabled';const t0=S.turn;b.click();return S.kc.wr===t0?'ok':'no'});if(R.write!=='ok')F('write home '+R.write);await drain();
  R.ld=await p.evaluate(()=>{const v=liveRivals(true)[0];pushDil(mkP('kcgLd',{f:v.id}),'Lời đồn cũ');const qi=Q.findIndex(m=>m.pid==='kcgLd');if(qi>0)Q.unshift(Q.splice(qi,1)[0]);showModal();const n=Q[0]&&Q[0].opts?Q[0].opts.length:0;return{n,t:Q[0]&&Q[0].t}});
  await sleep(600);await shot('or08-ld');if(R.ld.n<2)F('lời đồn cũ event '+JSON.stringify(R.ld));
  R.ld.done=await p.evaluate(()=>{chooseM(0);return S.kc.ldDone});if(!R.ld.done)F('lời đồn cũ not closed');await drain();
  /* ---- OR14 titles panel ---- */
  await p.evaluate(()=>{if(typeof dhPanel==='function')dhPanel();else window.dhPanel();showModal()});await sleep(900);R.dhM=await meas();R.dhTxt=await p.evaluate(()=>/khuê các/i.test(document.body.innerText||''));if(!R.dhTxt)F('Khuê các group not in the Danh hiệu panel');await shot('or14-titles');
  await drain();R.rare=await p.evaluate(()=>{try{kcEnd('kcR3')}catch(e){return'err '+e.message}return Object.keys((store.get('ctm-kct')||{t:{}}).t)});if(!Array.isArray(R.rare)||!R.rare.includes('kc_R3'))F('rare title '+R.rare);
  R.errs=errs.slice(0,10);if(errs.length)F('page errors');rep.push(R);if(R.fail.length)bad++;await c.close()}
 console.log(JSON.stringify(rep,null,1));await b.close();process.exit(bad?1:0)})().catch(e=>{console.error(e);process.exit(1)});
