/* DAYQ-3 (owner 24/11 ~22:02Z real, item (1), shot v9) — the same rule IN A CO-OP ROOM: no visitor / event card or scene is painted while she is
   inside an activity (mini-game screen, kit scene, her own person view); it shows, unchanged, when she finishes. Gate (c) of jdayq is paint-only
   (j3 showModal / jdfv encounter / kmFree) — no S key, no random draw, no message — so it also runs in a co-op room (gates (a)/(b) stay solo).
   Two Playwright clients in one room (host Fold 755x1000 + guest iPad 1180x820; swap=1: iPad hosts), on EACH seat:
     A2 j5 mini-game (openMG) × S4 a queued card · A2 × S1 a visitor (gmCard, stage scene route) · A3 kit «Nhận» scene × S4 · A4 her own person view × S1 ·
     A1 her «Điểm trang» tap (the card arrives inside the tap's spend) × S1.
   Then one merged week on both seats (the room still turns), 0 page errors.
   usage: python3 dev/build/assemble.py && node dev/test/dayq-hold-coop.js [workerURL] [swap=0] */
const {chromium}=require('playwright');const {serve,BASE}=require('./coop-serve.js');const fs=require('fs'),path=require('path');
const WURL=process.argv[2]||'https://ctm-coop.victoria-tntt.workers.dev';const SWAP=+(process.argv[3]||0);
const res=[];const ok=(c,m,x)=>{res.push([!!c,m]);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x).slice(0,c?300:2500):''))};
const sleep=ms=>new Promise(r=>setTimeout(r,ms));
const REALL=require('./lib/coop-real.js');
async function mk(b,name,vp){const ctx=await b.newContext({viewport:{width:vp[0],height:vp[1]},deviceScaleFactor:1,reducedMotion:'reduce'});await serve(ctx);await REALL.origin(ctx,name==='host'?'a':'b');
  await ctx.addInitScript(u=>{window.COOP_URL=u;window.__co=()=>{const c=window.COOP;if(!c)return{};return{code:c.code,seat:c.seat,world:typeof S!=='undefined'&&!!S&&!!(window.COOPW&&COOPW.on)}}},WURL);
  const p=await ctx.newPage();p.setDefaultTimeout(90000);await p.route(/\.(mp3|ogg|mp4|webm)(\?|$)/,r=>r.abort());const o={name,ctx,p,errs:[]};
  p.on('pageerror',e=>o.errs.push(e.message));return o}
const tapText=async(o,re,ms=8000)=>{const t0=Date.now();while(Date.now()-t0<ms){const r=await o.p.evaluate(src=>{const R=new RegExp(src);
  const b=[...document.querySelectorAll('button')].find(b=>b.offsetParent!==null&&!b.disabled&&R.test(b.textContent.trim()));if(b){b.click();return true}return false},re.source);if(r)return true;await sleep(250)}return false};
const clear=(()=>{const t=fs.readFileSync(path.join(__dirname,'coop-e2e.js'),'utf8');const i=t.indexOf('async function clear(');const j=t.indexOf("return'many'}",i)+13;return eval('('+t.slice(i,j)+')')})();
const until=async(o,fn,arg,ms=40000)=>{try{await o.p.waitForFunction(fn,arg,{timeout:ms});return true}catch(e){return false}};
const press1=o=>o.p.evaluate(()=>{const b=document.getElementById('next');if(!b||b.disabled)return false;b.click();return true});
async function press(o,ms=20000){const t0=Date.now();while(Date.now()-t0<ms){if(await press1(o))return true;await clear(o);await sleep(300)}return false}
async function week(A,B,tag){for(let i=0;i<3;i++){await clear(A);await clear(B)}const w0=await A.p.evaluate(()=>COOP.state.week);
 for(let g=0;g<12;g++){const a=await A.p.evaluate(()=>S.buoi||0),c=await B.p.evaluate(()=>S.buoi||0);await press(A);await press(B);
  const t0=Date.now();while(Date.now()-t0<30000){await clear(A);await clear(B);if(await A.p.evaluate(w=>COOP.state.week>w,w0)&&await B.p.evaluate(w=>COOP.state.week>w,w0))break;if(await A.p.evaluate(x=>(S.buoi||0)!==x,a)&&await B.p.evaluate(x=>(S.buoi||0)!==x,c))break;await sleep(400)}
  if(await A.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0)&&await B.p.evaluate(w=>COOP.state.week>w&&!COOPW.pend,w0))break}
 const okw=await A.p.evaluate(w=>COOP.state.week===w+1,w0)&&await B.p.evaluate(w=>COOP.state.week===w+1,w0);ok(okw,tag+': week merged once');return okw}
/* page helpers (same as dev/test/dayq-hold.js, no clean of the room's own state) */
const H=`(()=>{const hid=el=>Object.getOwnPropertyDescriptor(HTMLElement.prototype,'hidden').get.call(el);
 window.__T={hid,
  card(){const M=document.getElementById('modal');return !hid(M)||!!(window.DF&&DF.encM&&DF.F)},
  ovOpen(){const ov=document.getElementById('ov');return !!ov&&!hid(ov)},
  here(){const P=curPeople();for(let i=0;i<P.length;i++){const p=P[i];if(p.ref&&rivals.includes(p.ref)&&!p.ref.coop&&dfHasFig(i))return p.ref}return null},
  any(){return rivals.find(v=>v.alive!==false&&!v.out&&!v.coop)},
  src(k){if(k==='S1'){const v=__T.here()||__T.any();const c=gmCard(v);if(!c)return'';delete c.ev;c.must=1;Q.push(c);showModal();return 'gm:'+c.t}
   if(k==='S4'){Q.push({t:'Tin báo',must:1,h:'<p>Có tin từ Nội vụ phủ.</p>'});showModal();return 'card'}},
  answer(){for(let k=0;k<20&&Q.length;k++){const m=Q[0];if(m.opts&&m.opts.length){const i=m.opts.findIndex(o=>!o.off&&!(o.fx&&o.fx.bac&&S.bac+o.fx.bac<0));chooseM(i<0?0:i)}else closeModal()}
   try{if(DF.F){DF.F.destroy();dfClosed(DF.tk)}}catch(e){}}};return 1})()`;
const OPEN={A1:null,A2:`(()=>{openMG('ky',1,()=>{S.mg=null;render()});return 'openMG ky'})()`,
 A3:`(()=>{S.mg=null;wkFinishLesson('vu',{kind:'mua'},60,'tự học');render();return 'kitGain'})()`,
 A4:`(()=>{const P=curPeople();for(let i=0;i<P.length;i++)if(dfHasFig(i)&&!(P[i].ref&&P[i].ref.coop)){dfOpen(i);return 'dfOpen '+P[i].name}return ''})()`};
const isOpen={A1:`__T.ovOpen()`,A2:`__T.ovOpen()`,A3:`!!document.querySelector('.kmov:not(.km-out)')`,A4:`!!(DF.F&&!DF.encM)`};
const CASES=[['A2','S4'],['A2','S1'],['A3','S4'],['A4','S1'],['A1','S1']];
async function runCase(o,A,Sx){const p=o.p;const r={seat:o.name,A,S:Sx,bad:[]};const bad=s=>r.bad.push(s);
 await clear(o);await p.evaluate(()=>{Q.length=0;const m=document.getElementById('modal');m.hidden=true;try{if(DF.F){DF.F.destroy();dfClosed(DF.tk)}}catch(e){}});
 if(A==='A1'){r.src=await p.evaluate(Sx=>{used=0;S.toilette=null;render();const s0=spend;spend=function(){const x=s0.apply(this,arguments);spend=s0;window.__srcT=__T.src(Sx);return x};
   const bt=document.querySelector('[data-k3="toil"],[data-hx="toil"]');if(!bt){spend=s0;return ''}bt.click();return window.__srcT},Sx);if(!r.src){r.skip='no toil button';return r}}
 else{r.act=await p.evaluate(OPEN[A]);if(!r.act){r.skip='activity n/a';return r}await sleep(500);r.src=await p.evaluate(Sx=>__T.src(Sx),Sx);if(!r.src){r.skip='no source';return r}}
 for(const t of [400,1600]){await sleep(t);const st=await p.evaluate(`({open:${isOpen[A]},card:__T.card()})`);if(!st.open){bad('activity not open at '+t);break}if(st.card)bad('card painted inside the activity at '+t+' ms')}
 if(process.env.SHOTS&&A==='A1')await p.screenshot({path:`${process.env.SHOTS}/coop-${o.name}-${A}-held.png`});
 await p.evaluate(A=>{if(A==='A1'||A==='A2'){const ov=document.getElementById('ov');for(let k=0;k<8&&!__T.hid(ov);k++){try{if(A==='A1'&&k===0&&typeof toilFinish==='function'){toilFinish(false);continue}}catch(e){}
   const B=[...ov.querySelectorAll('button')].filter(x=>!x.disabled&&x.getBoundingClientRect().width>0&&!x.closest('[hidden]'));const pick=B.find(x=>/mgskip|mgok|kg82skip|kg82ok|kgr-ok/.test(x.id+' '+x.className))||B[B.length-1];if(!pick)break;pick.click()}}
  if(A==='A3'){const b=document.querySelector('.kmov.kfgain .krevok')||[...document.querySelectorAll('.kmov button')].pop();b&&b.click()}
  if(A==='A4'){const x=document.querySelector('.kfoc .kfoc-x');x&&x.click()}},A);
 for(let k=0;k<14;k++){await sleep(700);const op=await p.evaluate(`${isOpen[A]}||!!document.querySelector('.kmov:not(.km-out),#kmrew')`);if(!op)break;
  await p.evaluate(()=>{const k=document.querySelector('.kmov:not(.km-out),#kmrew');if(k){const b=[...k.querySelectorAll('button')].filter(x=>!x.disabled&&x.getBoundingClientRect().width>0).pop();if(b)b.click()}
   const ov=document.getElementById('ov');const B=[...ov.querySelectorAll('button')].filter(x=>!x.disabled&&x.getBoundingClientRect().width>0);(B.find(x=>/ok|Xong|Đã hiểu/i.test(x.id+x.textContent))||B[B.length-1]||{click(){}}).click()})}
 await sleep(1500);const af=await p.evaluate(`({open:${isOpen[A]},card:__T.card(),Q:Q.map(m=>m.t),st:window.DQ?JSON.stringify(DQ.stat):""})`);r.after=af;
 if(af.open)bad('activity still open after finishing');if(!af.card)bad('held card not shown after the activity (Q '+af.Q.join('|')+')');
 if(process.env.SHOTS&&A==='A1')await p.screenshot({path:`${process.env.SHOTS}/coop-${o.name}-${A}-after.png`});
 await p.evaluate(()=>__T.answer());await sleep(400);return r}
(async()=>{const b=await chromium.launch();const FOLD=[755,1000],IPAD=[1180,820];
 const Ho=await mk(b,'host',SWAP?IPAD:FOLD),G=await mk(b,'guest',SWAP?FOLD:IPAD);
 await Ho.p.goto(BASE);await Ho.p.waitForTimeout(3000);await tapText(Ho,/^(Chơi cùng bạn|Cùng hảo hữu)/);await Ho.p.waitForTimeout(500);await tapText(Ho,/^(Mời bạn|Mời hảo hữu)/);
 await until(Ho,()=>window.COOP&&COOP.code&&COOP.seat==='a');const code=await Ho.p.evaluate(()=>COOP.code);console.log('room',code,'swap',SWAP);
 await G.p.goto(BASE+'?room='+code);await G.p.waitForTimeout(3000);await tapText(G,/^(Vào phòng|Tiếp tục)/,4000);
 ok(await until(G,()=>window.COOP&&COOP.seat==='b'&&!COOP.frozen,null,60000),'guest joined seat b');
 {const t0=Date.now();while(Date.now()-t0<150000){await clear(Ho);await clear(G);const a=await Ho.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop)),c=await G.p.evaluate(()=>__co().world&&rivals.some(v=>v.coop));if(a&&c)break;await sleep(500)}}
 for(const o of [Ho,G])await o.p.evaluate(()=>{try{if(BAL.coopTm)BAL.coopTm.buoiMs=600000}catch(e){}if(S.srv)S.srv.risen=1;if(S.kc)S.kc.inPal=1;S.rank=3;S.sung=Math.max(S.sung||0,40);S.kpWarn=1;render()});
 if(!(await until(Ho,()=>!!COOPW.friend(),null,20000)&&await until(G,()=>!!COOPW.friend(),null,20000)))await week(Ho,G,'setup');
 await REALL.realize(Ho,G,()=>week(Ho,G,'setup'),ok);
 for(const o of [Ho,G]){await o.p.evaluate(H);ok(await o.p.evaluate(()=>!!(window.COOPW&&COOPW.on)),o.name+': in the co-op world (COOPW.on)');
  for(const [A,Sx] of CASES){const r=await runCase(o,A,Sx);if(r.skip){console.log('skip '+o.name+' '+A+'×'+Sx+' '+r.skip);continue}
   ok(!r.bad.length,o.name+' '+A+'×'+Sx+': nothing painted inside the activity, shown after',r.bad.length?{bad:r.bad,src:r.src,after:r.after}:{src:r.src})}}
 await week(Ho,G,'after the cases');
 for(const o of [Ho,G])ok(!o.errs.length,o.name+': 0 page errors',o.errs.slice(0,5));
 const f=res.filter(x=>!x[0]).length;console.log(f?`dayq-hold-coop: FAIL ${f}/${res.length}`:`dayq-hold-coop: PASS ${res.length}/${res.length}`);await b.close();process.exit(f?1:0)})();
