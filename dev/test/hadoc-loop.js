/* hadoc-loop (review/fix-hadoc-loop, ROBOT-10 bug B, LIVE 225c5c08): «Bày mưu» → «Ra tay ngay: hạ độc» → road card «Hạ độc» → «Làm như thường»
   came back to «Bày mưu» again, for ever: the act never ran and no khắc was spent (a free infinite scheme loop).
   Root cause: two doAct interceptors (j70 «Bày mưu», jtamco road card) each skip only on a TRANSIENT flag of their own (window.__j70inst for one
   call, ECON_ROADGO for one call): the second card's «do it» re-entered doAct after the first flag was gone. Fix: one test j70Wants(v,k) that also
   reads the road she chose (window.ECON_HER), and jtamco lets j70's card go first.
   WHOLE GROUP: every scheme with BOTH cards (OWN70 key that is jecon-priced, __c0) × every road (Làm như thường / Hao tâm cơ / Thuê người), and the
   direct road card (j70 off for that act): the act must run once (khắc spent, Bày mưu shown at most once, road card at most once), ≤ 6 taps.
   usage: node dev/test/hadoc-loop.js [url]   (exit 0 = all pass) */
const {chromium}=require('playwright');const URL=process.argv[2]||('file://'+require('path').resolve(__dirname,'../../index.html'));
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:755,height:1000},reducedMotion:'reduce',serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));p.setDefaultTimeout(0);
 await p.goto(URL,{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&typeof doAct==='function'&&typeof OWN70==='object',null,{timeout:0});await p.waitForTimeout(2000);
 const r=await p.evaluate(()=>{const out={rows:[],keys:[]};
  const fresh=()=>{for(const id of ['kload','kroul']){const x=document.getElementById(id);if(x)x.remove()}try{localStorage.clear()}catch(e){}SLOT=3;window.__nlInner=1;window.__bot=1;document.getElementById('title').hidden=true;
   for(let i=0;i<60;i++){start();if(!isSrv()&&!(typeof isKc==="function"&&isKc()))break}Q.length=0;used=0;S.buoi=0;S.bac=5000;S.tamco=90;S.suc=100;S.duc=50};
  const keys=Object.keys(OWN70).filter(k=>ACT[k]&&ACT[k].__c0);out.keys=keys;
  for(const k of keys)for(const road of ["Làm như thường","Hao tâm cơ, tự mình sắp đặt","Thuê người làm thay","direct"]){
   let row={k,road,ok:false};
   /* musk / catswap need a pregnancy / a birth: their own gate (ACT.ok) is opened for this test only — the card routing is what is tested */
   const ok0=ACT[k].ok;fresh();if(!liveRivals(false).some(v=>ok0(S,v))){ACT[k].ok=function(){return true};row.gate="opened"}
   try{for(let t=0;t<15&&!row.ok&&!row.done&&!row.skip;t++){fresh();const L=liveRivals(false).filter(v=>v.alive&&!v.out&&!(typeof sameHouse==="function"&&sameHouse(S,v))&&ACT[k].ok(S,v));const v=L[t%Math.max(1,L.length)];if(!v)continue;
    /* review r1: a person she does not know yet is dropped by j61 (no act, no khắc) — the direct rows passed on that for nothing: she knows the target */
    if(typeof k61Named==="function"&&!k61Named(v)&&typeof k61Know==="function")k61Know(v,"",false,3);
    if(road==="direct")window.__j70off=1;
    const i=rivals.indexOf(v),u0=used,lg0=S.logSeq||0,s0=window.PT&&PT.stat?PT.stat.sent:0;const seen=[];let taps=0;
    try{doAct(i,k);
     while(Q.length&&taps<6){const m=Q[0];seen.push(m.pid||m.t);let j=-1;const o=m.opts||[];
      if(m.pid==="j70start")j=o.findIndex(x=>/^Ra tay ngay/.test(x.n));else if(m.pid==="roadpick"){j=o.findIndex(x=>x.n===(road==="direct"?"Làm như thường":road));if(j>=0&&o[j].off){row.skip="road off";break}}
      else break;/* the act's own result cards: the act ran */
      if(j<0)break;taps++;chooseM(j)}}finally{window.__j70off=0}
    const bm=seen.filter(x=>x==="j70start").length,rp=seen.filter(x=>x==="roadpick").length;
    if(row.skip){row.done=1;continue}
    row.last={taps,bm,rp,spent:used-u0,seen:seen.slice(0,8)};/* shown when no person matched (LIVE: the ping-pong, taps 6) */
    if(road!=="direct"&&bm!==1)continue;/* not this person (no plan card): try another */
    const rolls=typeof econRoadRolls==="function"&&econRoadRolls(k,S,v);/* musk / catswap: no odds roll → no road card by design (jtamco F2) */
    if(road!=="direct"&&road!=="Làm như thường"&&!rolls){row={k,road,skip:"no road card for this act (no odds roll)"};break}
    if(rp!==(rolls?1:0))continue;/* no road card for this person (econRoadOk): try another */
    row={k,road,gate:row.gate,ok:bm<=1&&rp<=1&&taps<6&&!Q.some(m=>m.pid==="j70start"||m.pid==="roadpick")&&used>u0/* law 3: the act cost its khắc (run now, or sent as an errand: 1 khắc + PT.stat.sent) */,sent:(window.PT&&PT.stat?PT.stat.sent:0)-s0,taps,bm,rp,spent:used-u0,seen:seen.slice(0,8),who:v.name,log:(S.logs||[]).slice(0,Math.max(0,(S.logSeq||0)-lg0)).join(" ").replace(/<[^>]+>/g,"").slice(0,140)}}}finally{ACT[k].ok=ok0}
   out.rows.push(row)}
  return out});
 let bad=0;console.log("keys "+r.keys.join(","));
 for(const x of r.rows){const pass=x.ok||x.skip;if(!pass)bad++;console.log((pass?(x.skip?"SKIP ":"PASS "):"FAIL ")+x.k+" · "+x.road+(x.skip?" ("+x.skip+")":"")+"  "+JSON.stringify({last:x.ok?undefined:x.last,gate:x.gate,taps:x.taps,bm:x.bm,rp:x.rp,spent:x.spent,seen:x.seen,log:x.log}))}
 if(!r.rows.some(x=>x.ok))bad++;if(errs.length){bad++;console.log("FAIL page errors",errs.slice(0,3))}
 console.log(bad?`FAIL ${bad}`:"ALL PASS");await b.close();process.exit(bad?1:0)})();
