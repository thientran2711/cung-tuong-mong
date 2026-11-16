/* review/evidence-truth-r1: how often frame-ups (false charges) happen, player and NPC-vs-NPC, with an idle clean player.
   Counts every attempt of the frame-type acts (Vu oan, Cài đồ, Vu con nàng trù ẻo, Giá họa), how many reach framed(), cleared, and
   NPC spying (found / nothing). usage: NODE_PATH=$(npm root -g) node dev/measure/evtruth-frames.js URL [years=10] [seeds=3] ['{"frameW":3}' BAL.truth override] */
const {chromium}=require('playwright');
const [,,URL,YRS,NS,BALJ]=process.argv;const YEARS=+YRS||10,SEEDS=+NS||3;
(async()=>{const b=await chromium.launch({args:['--js-flags=--max-old-space-size=1500']});const all=[];
 const S0=+(process.env.SEED0||1);for(let sd=S0;sd<S0+SEEDS;sd++){const ctx=await b.newContext({viewport:{width:1000,height:755},serviceWorkers:'block',reducedMotion:'reduce'});
  await ctx.addInitScript(([sd])=>{let s=sd*7919+12345;Math.random=()=>{s|=0;s=s+0x6D2B79F5|0;let t=Math.imul(s^s>>>15,1|s);t=t+Math.imul(t^t>>>7,61|t)^t;return((t^t>>>14)>>>0)/4294967296}},[sd]);
  await ctx.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());
  const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,160)));
  await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function',null,{timeout:0});await p.waitForTimeout(1200);
  await p.evaluate(()=>{const kl=document.getElementById('kload');if(kl)kl.remove();try{localStorage.clear()}catch(e){}SLOT=3;document.getElementById('title').hidden=true;start()});
  await p.waitForFunction(()=>typeof S!=='undefined'&&S&&S.name,null,{timeout:120000});
  if(BALJ)await p.evaluate(j=>Object.assign(BAL.truth,JSON.parse(j)),BALJ);
  await p.evaluate(()=>{window.C={att:{},atS:{},hit:{},frames:0,framesMe:0,clear:0,clearMe:0,spyN:0,spyNfound:0,spyMe:0,spyMeFound:0,evNpcNpc:0,real:{},caughtF:0};
   C.def={};const fd=frameDef;frameDef=function(p,a){const D=fd.apply(this,arguments);C.def[D.how.split(' ')[0]+' '+D.how.split(' ')[1]]=(C.def[D.how.split(' ')[0]+' '+D.how.split(' ')[1]]||[0,0]);C.def[D.how.split(' ')[0]+' '+D.how.split(' ')[1]][0]++;window.__lastNd=D.how.split(' ')[0]+' '+D.how.split(' ')[1];return D};
   const fe=frameExpose;frameExpose=function(a,p,how){if(p===S){if(window.__lastDef&&C.defMe[window.__lastDef])C.defMe[window.__lastDef][1]++}else if(window.__lastNd&&C.def[window.__lastNd])C.def[window.__lastNd][1]++;return fe.apply(this,arguments)};
   window.isFr=k=>["frame","plant","kframe","giahoa"].includes(k);
   C.all={};const r0=runAct;runAct=function(a,t,k){if(a&&t&&a!==S){const kk=(t===S?"S:":"N:")+k;C.all[kk]=(C.all[kk]||0)+1}if(isFr(k)&&a&&t){const z=t===S?C.atS:C.att;z[k]=(z[k]||0)+1}const x=r0.apply(this,arguments);if(isFr(k)&&a&&t&&x){C.hit[k]=(C.hit[k]||0)+1}return x};
   const sf=spyFind;spyFind=function(a,t){const x=sf.apply(this,arguments);const f=!/không tìm ra/.test(x);if(t===S){C.spyMe++;if(f)C.spyMeFound++}else if(a!==S){C.spyN++;if(f)C.spyNfound++}return x};
window.__frames=0;window.__framesMe=0;window.__framesClear=0;window.__framesMeClear=0;window.__t0=S.turn});
  for(let m=0;m<12*YEARS;m++){const st=await p.evaluate(()=>{const C=window.C;const t1=S.turn;let g=0;
   while(S.turn<t1+1&&!S.dead&&g<200){g++;
    /* idle clean player: answer every dialog with its safest option (last = refuse / do nothing), PEND.vuoan by the first defence */
    let q=0;while(Q.length&&q<50){q++;const m=Q.shift();if(m&&m.opts&&m.opts.length){const fr=/Chọn cách minh oan/i.test(m.h||"");const o=fr?m.opts[Math.floor(Math.random()*m.opts.length)]:m.opts[m.opts.length-1];if(fr){C.defMe=C.defMe||{};const n=(o.n||"").replace(/ về .*| .* làm chứng/,"");C.defMe[n]=C.defMe[n]||[0,0];C.defMe[n][0]++;window.__lastDef=n}try{o.go&&o.go()}catch(e){}}}
    try{closeModal()}catch(e){}try{S.mg=null;nextBuoi()}catch(e){C.err=(C.err||0)+1;if(C.err<3)console.error(e)}}
   try{if(window.log&&S.log&&S.log.length>200)S.log.length=200}catch(e){}return S.dead?'dead':'ok'});if(st==="dead")break;if(m%12===11)console.error("year",(m+1)/12,await p.evaluate(()=>JSON.stringify(Object.assign({},window.C,{fr:window.__frames,npcTry:window.__npcFrameTry,frMe:window.__framesMe,cl:window.__framesClear,clMe:window.__framesMeClear}))))}
  const r=await p.evaluate(()=>{const C=window.C;const t0=window.__t0;
   const L=liveRivals(true);let held=0,heldMe=0;for(const v of L){heldMe+=evG(v,S);for(const t of L)if(t!==v)held+=evG(v,t)}
   return Object.assign(C,{months:S.turn-t0,dead:!!S.dead,frames:window.__frames,framesMe:window.__framesMe,clear:window.__framesClear,clearMe:window.__framesMeClear,
    npcDeeds:L.reduce((a,v)=>a+(v.wrongs||[]).length,0),npcDw:L.reduce((a,v)=>a+(v.dw||0),0),npcEvHeld:held,evOnMe:heldMe,consorts:L.length,myDeeds:(S.wrongs||[]).length})});
  r.seed=sd;r.errs=errs.slice(0,4);all.push(r);console.log(JSON.stringify(r));await ctx.close()}
 await b.close()})();
