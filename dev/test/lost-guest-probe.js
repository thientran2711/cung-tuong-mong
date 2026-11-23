/* lost-guest-probe (E42r review, law 6c + law 1, R1): the GUEST seat's own lost case (worldOn() false) — every place it can go is real and
   comes back to her: found at home (her chest) or «nvp» (Nội vụ phủ mends it, then back to her chest after BAL fixW weeks); her Kỳ ngộ
   «Của mình tìm lại» both options (return / keep) → exactly one copy; a stale card moves nothing. No NPC copy on the guest ever gets the piece.
   usage: python3 dev/build/assemble.py && node dev/test/lost-guest-probe.js [dev/index.html]   → exit 1 on FAIL */
const path=require('path');const {chromium}=require('playwright');
const HTML=process.argv[2]||'dev/index.html';let fail=0;const ck=(n,c,x)=>{console.log((c?'ok  ':'FAIL')+' '+n+(x!==undefined?' · '+JSON.stringify(x).slice(0,600):''));if(!c)fail++};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(u=>/^https?:/.test(u.href),r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&window.KY,null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(async()=>{let sd=4242;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  for(let i=0;i<12;i++){window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start();for(let j=0;j<300&&!(typeof S!=='undefined'&&S&&S!==window.S0&&S.origin);j++)await new Promise(r=>setTimeout(r,100));if(S.origin.k!=='cnv'&&!isSrv()&&!S.out)break}
  document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove());Q.length=0;used=0;S.suc=90;try{closeModal()}catch(e){}});
 const R=await p.evaluate(()=>{const out={};const ks=Object.keys(IT).filter(k=>{const t=IT[k];return t&&!t.nt&&!t.evi&&(t.pr||0)>=LO.minPr&&ilDur({k})});
  const realWorld=window.worldOn;window.worldOn=()=>false;/* the guest seat */
  const npcHas=iu=>rivals.some(v=>v&&(v.inv||[]).some(e=>e&&e.iu===iu));
  const count=iu=>{let n=0;for(const e of ilSlots(S))if(e.iu===iu)n++;for(const x of ilS().box)if(x.e&&x.e.iu===iu)n++;for(const c of ilCases())if(c.e.iu===iu)n++;return n};
  const mk=()=>{const e={k:ks[(Math.random()*ks.length)|0],from:'emp'};S.inv=S.inv||[];S.inv.push(e);ilUid(e);S.inv.splice(S.inv.indexOf(e),1);/* loLoseE's callers take the piece out first (ilRob: ilOut) */const c=loLoseE(S,e,'srv');return c};
  /* 1 loFind: holder roll forced (home odds 0) → no NPC on the guest → Nội vụ phủ (fix), then home */
  const h0=LO.home.srv;LO.home.srv=0;let nvp=0,npc=0,one=0,back=0,N=12;
  for(let i=0;i<N;i++){const c=mk();if(!c)continue;const iu=c.e.iu;loFind(c);if(c.how==='nvp')nvp++;if(npcHas(iu))npc++;if(count(iu)===1)one++;
   const x=ilS().box.find(x=>x.e&&x.e.iu===iu);if(x){x.rel=wk();try{ilWeek&&ilWeek()}catch(e){}try{if(typeof ilMonth==='function')ilMonth()}catch(e){}}
   if(S.inv.some(e=>e.iu===iu))back++}
  LO.home.srv=h0;out.find={N,nvp,npc,one,back};
  /* 2 her Kỳ ngộ «Của mình tìm lại» (vat_minh): return (oi 0) and keep (oi 1); then a stale card */
  const card=(c,oi)=>KY.SPEC.item({X:{lc:c},F:S,oi},{});
  const c1=mk();const r1=card(c1,0);out.ret={r1,st:c1.st,n:count(c1.e.iu),inChest:S.inv.filter(e=>e.iu===c1.e.iu).length};
  const r1b=card(c1,0);out.retStale={r1b,n:count(c1.e.iu)};
  const c2=mk();const r2=card(c2,1);out.keep={r2,st:c2.st,n:count(c2.e.iu),at:c2.at};
  const r2b=card(c2,1);out.keepStale={r2b,n:count(c2.e.iu)};
  window.worldOn=realWorld;return out});
 console.log(JSON.stringify(R));
 ck('guest loFind: no NPC copy ever gets her piece',R.find.npc===0,R.find);
 ck('guest loFind: every piece in exactly one place',R.find.one===R.find.N,R.find);
 ck('guest loFind: Nội vụ phủ (when not home) and back to her chest once mended',R.find.nvp>0&&R.find.back===R.find.N,R.find);
 ck('guest Kỳ ngộ «Mang trả»: case closed, one copy in her chest',R.ret.st==='done'&&R.ret.n===1&&R.ret.inChest===1,R.ret);
 ck('guest Kỳ ngộ stale «Mang trả»: nothing moves',R.retStale.n===1,R.retStale);
 ck('guest Kỳ ngộ «Giữ lại»: held by her, one copy',R.keep.st==='held'&&R.keep.n===1,R.keep);
 ck('guest Kỳ ngộ stale «Giữ lại»: nothing moves, no text',R.keepStale.n===1&&!R.keepStale.r2b,R.keepStale);
 ck('no page errors',!errs.length,errs);console.log(fail?'FAIL '+fail:'ALL PASS');await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
