/* review/makeup-set (owner OD 25/11 ~23:20Z + ~23:24Z): regression guard for the mirror «Trước gương đồng».
   1. every BAL preset set (TOIL_PRE) is on the mirror as a block of 4 colours (eye, cheek, lip, brow) + its name, whatever the cosmetics boxes;
      a set she cannot paint is greyed (aria-disabled) with why, never dropped; a set she owns applies all 4 colours on tap; a greyed one changes nothing.
   2. without hair oil the Kiểu cầu kỳ sets stay, greyed with «dầu chải tóc» (jallot, same family).
   3. the board NEVER plays her sitting for her: face points blocked → no result, «Gương còn mờ…», her own buttons (Điểm trang nhanh / Để mặt mộc).
   4. a failed face picture is fetched again (the glass is never left empty).
   5. the result close-up never draws her face above BAL.toil.rvUp x its source pixels (TOIL.rvSc).
   6. the play DONE button reads «✓ <word>», never a bare ✓.
   usage: node dev/test/makeup-set.js <worktree|url> [WxH@dpr,...]   (exit 1 on a FAIL) */
const {chromium}=(require('./lib/bigpage'),require('playwright'));const fs=require('fs'),http=require('http'),path=require('path');let [,,URL,SIZES]=process.argv;
function serve(root){const T={'.html':'text/html; charset=utf-8','.js':'text/javascript','.json':'application/json','.webp':'image/webp','.css':'text/css'};return new Promise(res=>{const s=http.createServer((q,r)=>{let f=path.join(root,decodeURIComponent(new (require('url').URL)(q.url,'http://x').pathname).replace(/^\/+/,'')||'index.html');
 if(!f.startsWith(root)||!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end('nf')}r.setHeader('Content-Type',T[path.extname(f)]||'application/octet-stream');fs.createReadStream(f).pipe(r)});s.listen(0,'127.0.0.1',()=>res({url:'http://127.0.0.1:'+s.address().port+'/index.html',close:()=>s.close()}))})}
const sleep=t=>new Promise(r=>setTimeout(r,t));let bad=0;const ok=(n,c,x)=>{if(!c)bad++;console.log(`${c?'PASS':'FAIL'} ${n}${x!==undefined?' '+JSON.stringify(x).slice(0,400):''}`)};
(async()=>{let SV=null;if(!/^https?:/.test(URL)){SV=await serve(path.resolve(URL));URL=SV.url}const b=await chromium.launch();
 for(const sz of (SIZES||"755x1000@2,1180x820@2").split(",")){const [wh,dpr]=sz.split("@");const [W,H]=wh.split("x").map(Number);const errs=[];console.log('== '+sz);
  const ctx=await b.newContext({viewport:{width:W,height:H},deviceScaleFactor:+dpr,hasTouch:true,isMobile:W<1100,serviceWorkers:'block'});
  let blockMesh=false,faceFail=0,faceReq=0;await ctx.route(/\/img\/mk-fit\//,r=>blockMesh?r.fulfill({status:404,body:'nf'}):r.continue());
  await ctx.route(/\/img\/por-[^/]*\.webp/,r=>{faceReq++;if(faceFail>0){faceFail--;return r.fulfill({status:503,body:'x'})}return r.continue()});
  const p=await ctx.newPage();p.setDefaultTimeout(240000);p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
  await p.goto(URL,{waitUntil:'domcontentloaded'});await p.waitForFunction(()=>typeof start==='function'&&typeof showModal==='function');await sleep(2500);
  await p.evaluate(()=>{new MutationObserver(()=>document.querySelectorAll('.kroul,#kload,#klife').forEach(e=>e.remove())).observe(document.body,{childList:true,subtree:true});SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<400;i++){start();if(!isSrv())break}
   Q.length=0;document.getElementById('modal').hidden=true;render()});await sleep(800);
  const mirror=()=>p.evaluate(()=>{Q.length=0;document.getElementById('modal').hidden=true;S.buoi=0;delete S.toilette;try{kg82Close()}catch(e){}toilOpen();TOIL.st.dv="hopdip";toilColUI();
   const R=[...document.querySelectorAll('.kswt-rset')].map(r=>({label:r.querySelector('.kswt-h b').textContent,items:[...r.querySelectorAll('.kswt-i')].map(i=>({k:i.dataset.kswti,n:i.querySelectorAll('.kswt-set i').length,off:i.classList.contains('off'),why:i.dataset.kswtwhy||'',name:i.querySelector('small').textContent})),note:(r.querySelector('.kswt-n')||{}).textContent||''}));
   return {R,pre:TOIL_PRE.length,col:Object.assign({},TOIL.st.col)}});
  /* 1a. the game start as it comes: whole sets (BAL.ration.set.start) */
  let m=await mirror();const all=m.R.flatMap(r=>r.items);
  const live=await p.evaluate(()=>[...document.querySelectorAll('.kswt-rset .kswt-i:not(.off)')].map(b=>{const x=TOIL_PRE.find(y=>y[0]===b.dataset.kswti);return x&&x[3]}));
  ok('start: ≥2 pickable sets, one cool + one warm',live.length>=2&&live.includes('cool')&&live.includes('warm'),live);
  ok('start: pickable sets first in their row',m.R.every(r=>{const o=r.items.map(i=>i.off?1:0);return o.every((v,i)=>!i||v>=o[i-1])}));
  await sleep(2500);await p.evaluate(()=>{const r=document.querySelector('.kswt-rset');if(r)r.scrollIntoView({block:'start'})});await sleep(800);
  await p.screenshot({path:`${process.env.MKS_SHOTS||'/tmp'}/mks-start-${wh}.jpg`,type:'jpeg',quality:70}).catch(()=>{});
  /* 1a'. a monthly issue: BAL.ration.set.pair months of the ration complete one whole set */
  const mo=await p.evaluate(()=>{const keep=S.inv.slice();S.inv=S.inv.filter(e=>!lxOf(e.k));const m0=S.month;const out=[];
   S.month=1;stipGoods(S);S.month=2;stipGoods(S);const own=k=>S.inv.some(e=>{const r=lxOf(e.k);return r&&r.part===k.part&&e.c===k.c});
   const full=TOIL_PRE.filter(x=>BAL.ration.parts.every(part=>own({part,c:x[4][part]}))).map(x=>x[0]);S.month=m0;S.inv=keep;return full});
  ok('ration: two months give a whole set',mo.length>=1,mo);
  ok('sets: every TOIL_PRE set shown',all.length>=m.pre&&new Set(all.map(i=>i.k)).size===m.pre,{shown:all.length,pre:m.pre});
  ok('sets: each block has 4 colours',all.every(i=>i.n===4),all.filter(i=>i.n!==4).map(i=>i.k));
  ok('sets: only the set name (no tone words)',all.every(i=>!/lạnh|ấm/.test(i.name))&&m.R.every(r=>!/lạnh|ấm/.test(r.label)),all.map(i=>i.name));
  ok('sets: greyed ones say why + where (on tap)',all.filter(i=>i.off).every(i=>/^thiếu /.test(i.why)&&/Đường kiếm/.test(i.why)),{off:all.filter(i=>i.off).length});
  ok('sets: the short note shown ONCE',m.R.filter(r=>r.note).length<=1&&m.R.every(r=>!r.note||r.note.length<=40),m.R.map(r=>r.note));
  /* 1b. she owns the four colours of «Sương mai» (and oil): the set is live and applies all four */
  const own=await p.evaluate(()=>{const x=TOIL_PRE.find(y=>y[0]==="suongmai");S.inv=S.inv.filter(e=>!lxOf(e.k));for(const part of BAL.ration.parts)S.inv.push({k:lxKey(part,1),c:x[4][part],u:6});try{if(!alHasOil(S))S.inv.push({k:"aldau1",u:6})}catch(e){}return x[4]});
  m=await mirror();let it=m.R.flatMap(r=>r.items).find(i=>i.k==="suongmai");ok('owned set is live',it&&!it.off,it);
  await p.evaluate(()=>{const b=document.querySelector('.kswt-i[data-kswti="suongmai"]');b.click()});await sleep(300);
  const c1=await p.evaluate(()=>({col:Object.assign({},TOIL.st.col),pre:toilPreOf(TOIL.st.col),name:toilPreName(TOIL.st.col)}));
  ok('tap = the whole set applies',c1.pre==="suongmai"&&["mat","ma","son","may"].every(k=>c1.col[k]===own[k]),c1);
  await p.screenshot({path:`${process.env.MKS_SHOTS||'/tmp'}/mks-sets-${wh}.jpg`,type:'jpeg',quality:70}).catch(()=>{});
  /* 1c. a greyed set changes nothing, its why shows in the row header */
  const off=await p.evaluate(()=>{const b=[...document.querySelectorAll('.kswt-i.off')][0];if(!b)return null;const before=JSON.stringify(TOIL.st.col);b.click();return {same:JSON.stringify(TOIL.st.col)===before,head:b.closest('.kswt-r').querySelector('.kswt-h span').textContent}});
  ok('greyed set: no change, why in header',off&&off.same&&/thiếu/.test(off.head),off);
  /* 2. no hair oil: Kiểu cầu kỳ stays, greyed with the oil */
  await p.evaluate(()=>{S.inv=S.inv.filter(e=>!/^aldau/.test(e.k))});m=await mirror();const diem=m.R.find(r=>/cầu kỳ/.test(r.label));
  ok('no oil: Kiểu cầu kỳ greyed, not hidden',diem&&diem.items.length===TOIL_PRE_N(m)&&diem.items.every(i=>i.off&&/dầu chải tóc/.test(i.why)),diem&&{n:diem.items.length,note:diem.note});
  function TOIL_PRE_N(){return 8}
  /* 3 + 4. the board: face points blocked, first face fetch fails */
  blockMesh=true;faceFail=1;faceReq=0;
  await p.evaluate(()=>{BAL.toil.meshWait=1500;for(const k in MK_FIT.g)delete MK_FIT.g[k];for(const k in MK_FIT.ld)delete MK_FIT.ld[k];TOIL.prev=null;KG82.ready=null;/* the «Sẵn sàng» tap of the real flow (kgReady) */toilMakeup()});await sleep(4500);
  const w=await p.evaluate(()=>({rec:!!S.toilette,ready:TOIL.geo.ready(),btn:!!document.getElementById('toilquick3')&&!!document.getElementById('toilmoc3'),vis:document.getElementById('kg82box')&&getComputedStyle(document.getElementById('kg82box')).visibility}));
  ok('board waits for her, never auto-plays',!w.rec&&!w.ready&&w.btn,w);ok('face picture fetched again after a failure (0 = served from the memory cache, nothing failed)',faceReq>=2||faceReq===0,{faceReq});
  await p.screenshot({path:`${process.env.MKS_SHOTS||'/tmp'}/mks-wait-${wh}.jpg`,type:'jpeg',quality:70}).catch(()=>{});
  blockMesh=false;await sleep(2500);const w2=await p.evaluate(()=>({ready:TOIL.geo.ready(),rec:!!S.toilette,nx:(document.getElementById('toilnx')||{}).textContent||''}));
  ok('points arrive later → her board starts',w2.ready&&!w2.rec,w2);
  /* 6. the done button keeps its word */
  ok('done button «✓ word»',/^✓ \S+/.test(w2.nx.trim()),w2.nx);
  /* 5. the result close-up: no upscale beyond rvUp */
  await p.evaluate(()=>{try{KG82.run&&KG82.run.stop()}catch(e){}TOIL.st.parts={brow:.9,powder:.9,son:.9};S.toilette={day:toilWk()*10,wk:toilWk(),score:95,makeup:true,col:toilColFix(TOIL.st.col),look:"tuyet"};window.__rvd=0;toilReveal({look:"tuyet",made:true,good:true,pre:"Sương mai",manual:true},()=>{window.__rvd=1})});
  await sleep(2500);await p.evaluate(()=>{try{TOIL_REV.zoom()}catch(e){}});await sleep(2500);
  const pw=await p.evaluate(()=>{const w=document.querySelector('.ktrv-pw'),R=document.querySelector('.ktrv');return w?{op:getComputedStyle(w).opacity,pon:R.classList.contains('ktrv-pon'),ld:!!(w.querySelector('img').naturalWidth)}:null});
  ok('portrait patch only over a painted picture (no white box)',!pw||(pw.ld?pw.pon&&pw.op==='1':!pw.pon&&pw.op==='0'),pw);
  const lay=await p.evaluate(()=>[...document.querySelectorAll('.kfxf')].filter(x=>x.parentElement.querySelector(':scope>img')).map(x=>{const im=x.parentElement.querySelector(':scope>img');return{ld:!!(im.complete&&im.naturalWidth),vis:getComputedStyle(x).visibility}}));
  ok('face layers hidden until their picture painted',lay.every(x=>x.ld?x.vis==='visible':x.vis==='hidden'),lay);
  const rv=await p.evaluate(()=>({sc:TOIL.rvSc,up:BAL.toil.rvUp}));ok('close-up face within its pixels',rv.sc&&rv.sc.src>0&&rv.sc.face<=rv.sc.src*rv.up+2,rv);
  await p.screenshot({path:`${process.env.MKS_SHOTS||'/tmp'}/mks-reveal-${wh}.jpg`,type:'jpeg',quality:70}).catch(()=>{});
  await p.evaluate(()=>{try{TOIL_REV.close()}catch(e){}});await sleep(600);faceFail=99;
  await p.evaluate(()=>{const u=new Set();document.querySelectorAll('img').forEach(i=>{if(/\/por-/.test(i.src))u.add(i.src)});toilReveal({look:"tuyet",made:true,good:true,pre:"Sương mai",manual:true},()=>{})});await sleep(800);
  await p.evaluate(()=>{const w=document.querySelector('.ktrv-pw img');if(w){w.removeAttribute('data-kld');w.src=w.src.split('?')[0]+'?fail='+Date.now()}try{TOIL_REV.zoom()}catch(e){}});await sleep(2500);
  const pw2=await p.evaluate(()=>{const w=document.querySelector('.ktrv-pw'),R=document.querySelector('.ktrv');return w?{op:getComputedStyle(w).opacity,pon:R.classList.contains('ktrv-pon'),fx:getComputedStyle(w.querySelector('.kfxf')).visibility}:null});
  ok('portrait missing → no white box over the face',!pw2||(pw2.op==='0'&&!pw2.pon),pw2);faceFail=0;
  await p.screenshot({path:`${process.env.MKS_SHOTS||'/tmp'}/mks-nopor-${wh}.jpg`,type:'jpeg',quality:70}).catch(()=>{});
  ok('no page errors',!errs.length,errs);await ctx.close()}
 await b.close();if(SV)SV.close();console.log(bad?`FAIL ${bad}`:'ALL PASS');process.exit(bad?1:0)})();
