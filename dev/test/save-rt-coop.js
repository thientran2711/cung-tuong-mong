/* save-rt-coop (save round-trip family, robot10-coop rows `S.qPool[].name` and `S.suc 100 → 99`; law 11 + identity: numbers neither seat
   changed are never rewritten by a save → load → save):
   1. jnamefix nmFix("load") ran as OWNER on a co-op guest's save (COOPW not on yet at load → nmOwner() true): her own marriage-pool candidate
      sharing a short form with the friend's coop entry was renamed («like»). A co-op life (S.coopRoom) is only ever loaded to go back into
      its room, where the host's nmFix("join") is the one sweep → the load sweep skips it. A SOLO save still sweeps on load.
   2. Sức ceiling: sucCap(p) falls when a year passes (khOf age term), the year step never refit Sức → S.suc 100 over a 99 ceiling until the
      next load cut it (jkh deser khFit). The ONE year step every calendar runs (j17 ageYear: j3 / j42 / jkc / jkc2) now refits S + every
      living rival, the same rule the load applies.
   3. identity: a fresh life played some buổi, and the same life marked co-op with a friend entry, survive save → load → save unchanged.
   4. law 6a (r2): a fact the lazy ledger finds reacts at the next in-play sweep — play on and save → load → sweep give the same Thái hậu.
   5. (r2) the in-room host rebuild still sweeps names; a servant friend's co-op save off-room is not swept (jslots coopOffLoad).
   usage: node dev/test/save-rt-coop.js [dev/index.html]   → exit 1 on FAIL or page error */
const {chromium}=require('playwright');const path=require('path');const HTML=process.argv[2]||'dev/index.html';
const res=[];const ok=(c,m,x)=>{res.push(!!c);console.log((c?'ok  ':'FAIL')+' '+m+(x!==undefined?' '+JSON.stringify(x):''))};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(u=>/^https?:/.test(u.href)||/\.(webp|png|jpg|mp3|ogg|mp4|webm)$/.test(u.pathname),r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});await p.waitForTimeout(2500);
 const r=await p.evaluate(()=>{let sd=20261125;Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};localStorage.clear();SLOT=4;document.getElementById('title').hidden=true;window.__nlInner=1;start();window.__nlInner=0;quiet=true;
  for(let i=0;i<10;i++){try{if(typeof closeM==='function')closeM();Q.length=0;const n=document.getElementById('next');if(n&&!n.disabled)n.click()}catch(e){}}
  try{if(typeof closeM==='function')closeM();Q.length=0}catch(e){}
  const J=x=>String(JSON.stringify(x)).slice(0,80);
  const diff=(a,b0)=>{const out=[];const dp=(a,b,p)=>{if(out.length>8||a===b||a===undefined)return;if(typeof a!==typeof b||a===null||b===null||typeof a!=='object'){out.push(p+': '+J(a)+' → '+J(b));return}
   for(const k of new Set(Object.keys(a).concat(Object.keys(b)))){if(/^__/.test(k))continue;if(/\.S$/.test(p)&&k==='visit')continue;dp(a[k],b[k],p+'.'+k)}};dp(a,b0,'save');return out};
  const rt=()=>{const d=ser();delete d.at;const s=JSON.stringify(d);deser(JSON.parse(s));const d2=ser();delete d2.at;return diff(JSON.parse(s),JSON.parse(JSON.stringify(d2)))};
  const out={};
  out.idSolo=rt();
  /* a co-op guest's life: marked, the friend's coop entry in rivals, and one of HER pool candidates sharing the friend's short name */
  if(!Array.isArray(S.qPool)||!S.qPool.length)S.qPool=[{name:'Thượng Quan Mộng Dao',age:18}];
  const fr0=rivals.find(v=>v&&v.alive&&!v.coop);const frId=fr0.id,frName=fr0.name;const FR=()=>rivals.find(v=>v&&v.id===frId);const fr=fr0;fr.coop=1;fr.name='Giang Mộng Dao';
  S.qPool[0].name='Thượng Quan Mộng Dao';S.coopRoom='TEST1';
  const names=()=>nmPeople().map(e=>e.o[e.f]);
  out.pool0=S.qPool[0].name;const n0=names();rt();const n1=names();out.pool1=S.qPool[0].name;out.idCoop=n0.map((v,i)=>v===n1[i]?null:v+' → '+n1[i]).filter(Boolean);
  /* control: the same names in a SOLO save are still swept on load (the rule for her own world is unchanged) */
  delete S.coopRoom;delete FR().coop;FR().name=frName;const o2=rivals.find(v=>v&&v.alive&&v.id!==frId);S.qPool[0].name=o2.name;out.poolSoloWas=o2.name;rt();out.poolSolo=S.qPool[0].name;
  /* Sức ceiling across a year */
  const yr=()=>{S.age++;ageYear()};let L=[];
  for(let i=0;i<40;i++){S.suc=sucCap(S);(rivals||[]).forEach(v=>{if(v&&v.alive&&typeof v.suc==='number')v.suc=sucCap(v)});yr();
   if(S.suc>sucCap(S))L.push('S age '+S.age+' suc '+S.suc+'>'+sucCap(S));(rivals||[]).forEach((v,j)=>{if(v&&v.alive&&typeof v.suc==='number'&&v.suc>sucCap(v))L.push('R'+j+' age '+v.age+' '+v.suc+'>'+sucCap(v))})}
  out.overCap=L.slice(0,6);out.age=S.age;out.cap=sucCap(S);
  const sucs=()=>[S.suc].concat((rivals||[]).map(v=>v&&v.suc));const s0=sucs();rt();const s1=sucs();out.idYear=s0.map((v,i)=>v===s1[i]?null:i+': '+v+' → '+s1[i]).filter(Boolean);
  /* 4. law 6a (savert r2): a wrong the world shows but the lazy ledger has not written yet (a tryst) reaches Thái hậu through her maid the
     SAME way whether she plays on or saves → loads first: the load itself rolls nothing (S.th unchanged right after it), the reaction is
     queued and runs at the next in-play sweep (evTruthSweep = endTurn's sweep). r1 dropped it (B stayed 40). Dice forced to hit. */
  try{S.maid.src='th';S.thDead=false;S.th=40;delete S.deedQ;const m=(S.men||[])[0];out.hasMan=!!m;if(m){m.trysts=1;S.dkeys=(S.dkeys||[]).filter(k=>!/^tr:/.test(k));(S.wrongs||[]).splice(0)}
   const snap=JSON.stringify(ser());const r0=Math.random;Math.random=()=>0;
   try{evTruthSweep();out.thA=S.th;
    deser(JSON.parse(snap));out.thB0=S.th;out.dk=(S.dkeys||[]).includes('tr:1');out.q=(S.deedQ||[]).length;
    const d1=ser();delete d1.at;deser(JSON.parse(JSON.stringify(d1)));out.thB0b=S.th;/* save → load again before the sweep keeps the queue */out.q2=(S.deedQ||[]).length;
    evTruthSweep();out.thB=S.th;out.qAfter=(S.deedQ||[]).length;evTruthSweep();out.thB2=S.th;/* reacts once */
    const th1=S.th;deedAdd(S,'plot');out.thLive=[th1,S.th]}finally{Math.random=r0}}catch(e){out.thErr=e.message}
  /* 5. FAIL 1 of r1: the room's own load sweep stays. (a) the HOST's merged-week rebuild (a deser in the room: COOPW on, seat a) with the friend
     as an in-palace CONSORT (coop entry in rivals) still renames a name that must not be held twice; (b) a SERVANT friend's co-op save
     (coop entry in a mistress's staff) loaded OFF-ROOM is not swept (her own pool candidate keeps her name). */
  try{const W=window.COOPW;const on0=W.on,seat0=W.seat;const fr=rivals.find(v=>v&&v.alive&&!v.coop);const o3=rivals.find(v=>v&&v.alive&&v!==fr);
   fr.coop=1;S.coopRoom='TEST1';S.qPool[0].name=o3.name;out.hostWas=o3.name;W.on=true;W.seat='a';
   try{rt()}finally{W.on=on0;W.seat=seat0}out.hostAfter=S.qPool[0].name;out.hostCoop=!!(rivals.find(v=>v&&v.id===fr.id)||{}).coop;
   const F2=rivals.find(v=>v&&v.id===fr.id);delete F2.coop;delete S.coopRoom;
   const mis=rivals.find(v=>v&&v.alive&&Array.isArray(v.staff)&&v.staff.length);out.hasStaff=!!mis;
   if(mis){const sv=mis.staff[0];const sv0=sv.name;sv.coop=1;sv.name='Giang Mộng Dao';S.qPool[0].name='Thượng Quan Mộng Dao';S.coopRoom='TEST1';out.srvWas=S.qPool[0].name;
    rt();out.srvAfter=S.qPool[0].name;const m2=rivals.find(v=>v&&v.id===mis.id);if(m2&&m2.staff[0]){delete m2.staff[0].coop;m2.staff[0].name=sv0}delete S.coopRoom}}catch(e){out.hlErr=e.message}
  return out});
 ok(!r.idSolo.length,'identity: a fresh solo life (10 buổi) survives save → load → save',r.idSolo);
 ok(!r.idCoop.length&&r.pool1===r.pool0,'co-op guest save: her pool candidate keeps her name on load («'+r.pool0+'» next to the friend «Giang Mộng Dao»), no person renamed',{after:r.pool1,diff:r.idCoop});
 ok(r.poolSolo!==r.poolSoloWas,'control: a SOLO save is still swept on load (a pool candidate holding a living consort\'s full name is renamed)',{was:r.poolSoloWas,after:r.poolSolo});
 ok(!r.overCap.length,'Sức never sits over its ceiling after a year passes (S + every living rival, 40 years up to age '+r.age+', cap now '+r.cap+')',r.overCap);
 ok(!r.idYear.length,'after the years a load has no Sức left to cut (S + every rival: save → load keeps each Sức)',r.idYear);
 ok(r.hasMan&&r.dk&&r.thB0===40&&r.thB0b===40&&r.q>0&&r.q2===r.q,'law 6a: a save → load that writes a shown wrong into the ledger (tryst → dkeys tr:1) rolls nothing at load; the reaction waits in the queue (also across a 2nd save → load)',{thB0:r.thB0,thB0b:r.thB0b,dk:r.dk,q:r.q,q2:r.q2,err:r.thErr});
 ok(r.thA===36&&r.thB===36&&r.thB2===36&&r.qAfter===0,'law 6a: Thái hậu learns the same either way — play on 40→'+r.thA+', save → load → next sweep 40→'+r.thB+' (once: next sweep '+r.thB2+')',{thA:r.thA,thB:r.thB,thB2:r.thB2,qAfter:r.qAfter});
 ok(r.thLive&&r.thLive[1]<r.thLive[0],'control: a NEW wrong she does (deedAdd plot) still reaches Thái hậu through her maid at once',{thLive:r.thLive});
 ok(r.hostCoop&&r.hostAfter!==r.hostWas,'in the room: the HOST\'s merged-week rebuild with the friend as consort still sweeps (a pool candidate holding a living consort\'s full name is renamed)',{was:r.hostWas,after:r.hostAfter,err:r.hlErr});
 ok(r.hasStaff&&r.srvAfter===r.srvWas,'off-room: a SERVANT friend\'s co-op save is not swept on load (her pool candidate «'+r.srvWas+'» keeps her name)',{after:r.srvAfter,err:r.hlErr});
 ok(!errs.length,'no page errors',errs.slice(0,3));await b.close();
 const pass=res.every(Boolean);console.log(pass?'SAVE-RT-COOP PASS':'SAVE-RT-COOP FAIL');process.exit(pass?0:1)})();
