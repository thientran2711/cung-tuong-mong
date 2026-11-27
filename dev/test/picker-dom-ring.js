/* picker-dom: RING pass (LIVE jkring-item «Vòng bảo vật» = the face of the jgpick family). usage: node dev/test/picker-dom-ring.js <built root> [--vp 755x1000,1180x820]
   On F's s7 save (1,437 pieces) opens every picker of the family with the ring ON and checks: the ring opens; it lists the chest's pieces from kipList
   (ALL options, doable first — not only the drawn page), capped by the ring's own KIT_RINGI.maxN; the dialog stays hidden (kri-hide) after a redraw;
   an item that is NOT on the drawn page has the same lock reason as when drawn and its act gives exactly one piece; the next dialog in Q survives the ring close. */
const path=require('path');const A=process.argv.slice(2);const ROOT=path.resolve(A[0]);const arg=(k,d)=>{const i=A.indexOf(k);return i>=0?A[i+1]:d};
const VPS=arg('--vp','755x1000,1180x820').split(',').map(s=>s.split('x').map(Number));
const {chromium}=require('playwright');const DOM=[];const {serve,BASE}=require('./coop-serve.js');const cp=require('child_process'),zlib=require('zlib');
const D=JSON.parse(zlib.gunzipSync(cp.execSync('git show origin/claude/cung-tuong-mong-handover-hj0h8w:dev/handover/robot/flight2-s7-stuck/ls-b2928-inv1437.json.gz',{cwd:__dirname,maxBuffer:1<<28})).toString());
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();for(const [vw,vh] of VPS){const ctx=await b.newContext({viewport:{width:vw,height:vh},reducedMotion:'reduce'});await serve(ctx,ROOT);
 await ctx.addInitScript(d=>{if(!sessionStorage.getItem('pdm')){for(const k in d)localStorage.setItem(k,d[k]);sessionStorage.setItem('pdm','1')}},D);
 const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.goto(BASE,{waitUntil:'domcontentloaded',timeout:300000});await p.waitForFunction(()=>typeof deser==='function'&&window.COOPW,null,{timeout:300000});
 await p.evaluate(()=>{const d=loadSlot(1);SLOT=1;quiet=true;d.tab='act';deser(d);quiet=false;document.getElementById('title').hidden=true;while(Q.length)Q.shift();try{deal();render()}catch(e){}});
 const R=await p.evaluate(async()=>{const w=ms=>new Promise(r=>setTimeout(r,ms));const v=liveRivals(true).filter(x=>x.alive!==false&&!x.out)[0];const out=[];
  for(const [n,pid,pp] of [['giftpick','giftpick',{v:v.id}],['giftto','giftto',{t:'emp'}],['plantpick','plantpick',{v:v.id}],['tsgiftpick-it','tsgiftpick',{v:v.id,k:'it'}],['tsgiftpick-wk','tsgiftpick',{v:v.id,k:'wk'}]]){
   while(Q.length)Q.shift();try{kitRingItem.cur&&kitRingItem.close(1)}catch(e){}try{closeModal()}catch(e){}
   const it=mkP(pid,pp);if(!it){out.push({n,none:1});continue}pushDil(it,n);const mm=Q.find(z=>z.pid===pid&&z.h===it.t);{const j=Q.indexOf(mm);if(j>0){Q.splice(j,1);Q.unshift(mm)}}showModal();await w(1500);
   /* the probe empties Q between pickers (a game never does): a late callback of the previous step may find Q empty and hide #modal → open once more, counted (as picker-dom-frames.js) */
   let reopen=0;while(document.getElementById('modal').hidden&&Q[0]===mm&&reopen<3){reopen++;showModal();await w(1200)}
   const M=document.getElementById('modal'),C=kitRingItem.cur;const o={reopen,n,nodes:M.querySelectorAll('*').length,page:document.querySelectorAll('*').length,front:Q[0]===mm,ring:!!C,kriOn:kriOn(),hid:M.hidden,kriDlg:KRI_DLG===Q[0],cur:!!kitRingItem.cur,kon:kipOn(Q[0]),q:Q.map(z=>z.pid||z.t).slice(0,4)};if(!C){out.push(o);continue}
   const it2=Q[0];o.same=it2===it;o.live=typeof kipList!=='function';const L=o.live?it2.opts.map((c,i)=>[c,i]).filter(([c,i])=>c&&c.ik!=null&&S.inv[c.ik]).sort((a,b)=>(kipLocked(a[0])-kipLocked(b[0]))||(a[1]-b[1])):kipList(it2);o.kip=L.length;o.ringN=C.items.length;o.cap=KIT_RINGI.maxN;o.wantN=Math.min(L.length,KIT_RINGI.maxN);
   const drawn=new Set([...M.querySelectorAll('.opts>.opt[data-m]')].map(x=>+x.dataset.m));o.drawn=drawn.size;
   o.ids=C.items.map(x=>x.id).join()===L.slice(0,KIT_RINGI.maxN).map(x=>x[1]).join();
   const und=C.items.filter(x=>!drawn.has(x.i));o.undrawn=und.length;
   /* lock reason of an undrawn item = the reason j3 gives the same card when drawn */
   o.lockAgree=C.items.every(x=>!!x.lock===!(typeof kitTakeable==='function'?kitTakeable(Q[0].opts[x.i],Q[0]):!kipLocked(x.c)));const U=und.find(x=>x.lock)||und[0];if(U){const w0=U.lock||"";const m2=Q[0];const inf=C.o.info(U);o.whyAfterInfo=U.lock||'';const vf=x=>(window.VP&&VP.fix?VP.fix(String(x||'')):String(x||'')).replace(/^✗\s*/,'').trim();o.infoLen=(inf||"").length;await w(300);o.hideAfterRedraw=M.classList.contains('kri-hide');
    const bb=M.querySelector(`.opts>.opt[data-m="${U.i}"]`);o.drawnNow=!!bb;const w1=bb?(bb.disabled?((bb.querySelector('.kwhy')||{}).textContent||"Chưa được"):(kipLocked(U.c)?"Thiếu bạc":"")):null;o.whyRing=w0;o.whyDrawn=w1;o.whyPaneSame=!w1||vf(o.whyAfterInfo)===vf(w1);o.whySame=(m2.opts[U.i].kgwhy?true:w0.replace(/^✗\s*/,'')===(w1||"").replace(/^✗\s*/,'').trim())}
   /* act an OPEN undrawn item: exactly one piece leaves the chest (or she refuses it → it stays) */
   const OK=C.items.filter(x=>!x.lock&&!drawn.has(x.i));o.openUndrawn=OK.length;
   if(OK.length&&pid!=='plantpick'){const X=OK[OK.length-1];const e=S.inv[X.c.ik];const n0=S.inv.length,has0=S.inv.includes(e);const fn=C.o.acts(X)[0];const r=await fn.fn(X,1);await w(800);
    o.actRes=r==null?'null':typeof r==='string'?r:(r.ok?'ok':'bad');o.dInv=n0-S.inv.length;o.gone=has0&&!S.inv.includes(e)}
   /* next dialog survives the ring close */
   const nx={t:'probe',h:'probe',opts:[{n:'Thôi'}]};Q.push(nx);try{kitRingItem.cur&&kitRingItem.close(1)}catch(e){}await w(800);o.nextKept=Q.includes(nx);
   out.push(o)}
  return out});
 for(const o of R)if(!o.none)DOM.push(`${vw}x${vh} ${o.n}: #modal ${o.nodes} · page ${o.page} · ring ${o.ringN}/${o.kip}`);
 for(const o of R){if(o.none){console.log('skip',o.n);continue}const tag=`${vw}x${vh} ${o.n}`;ok(o.ring,tag+' ring opens',o);if(!o.ring)continue;
  ok(o.lockAgree!==false,tag+' ring lock = kit takeable rule');ok(o.ringN===o.wantN&&o.ids,tag+' ring lists kipList (cap maxN)',{kip:o.kip,ring:o.ringN,cap:o.cap,drawn:o.drawn});
  if(o.undrawn!=null&&o.whyRing!=null){ok(o.hideAfterRedraw,tag+' dialog stays hidden after a redraw');ok(!!o.whyRing===!!o.whyDrawn,tag+' undrawn item locked = drawn card locked',{ring:o.whyRing,drawn:o.whyDrawn});ok(o.whyPaneSame,tag+' pane reason = drawn card words',{pane:o.whyAfterInfo,drawn:o.whyDrawn})}
  if(o.actRes!=null)ok(o.dInv===1&&o.gone||o.dInv===0&&o.actRes==='bad',tag+' act on an undrawn item gives one piece',{res:o.actRes,dInv:o.dInv});
  ok(o.nextKept,tag+' next dialog kept after ring close')}
 ok(!errs.length,`${vw}x${vh} no page errors`,errs.slice(0,3));await ctx.close()}
 await b.close();const n=res.filter(Boolean).length;DOM.forEach(x=>console.log('DOM '+x));console.log(`RING ${n}/${res.length} ${n===res.length?'PASS':'FAIL'}`);process.exit(n===res.length?0:1)})();
