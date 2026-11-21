/* lost-one-home-scan (E42 jlost × Kỳ ngộ, law 6c REAL OBJECTS, SOLO): every piece that ever went through a jlost «thất lạc» case sits in exactly
   ONE place every tuần over ≥ 2 bot years of real endTurn: a chest / worn slot / pawn of anyone, the ledger box, an open case that still holds
   it (st "lost", nobody holds it), or a dialog still offering it. Count ≥ 2 = DUP, count 0 of a durable piece = VANISH (both FAIL); the game's
   own unrouted-removal counter (S.il.net) must not grow. Every road that moves a lost-case piece is driven through the game's own functions:
   loLose (her + NPCs, real causes), the NPC and her thefts (loSteal keep / plant via plantItem), loWeek (loFind home / holder / Nội vụ phủ,
   holder hands in or wears it, owner asks or raises, hearings, expiry), her tra xét acts (loUI ask / cct / book / askback / giveback / handin /
   sneak), Soát rương (inspect), the robber (ilRob), Kỳ ngộ «Ngọc rơi trên lối» / «Của mình tìm lại» for NPC finders (npcPass) and for her
   (both card roads), a stale Kỳ ngộ card answered after the piece moved on, an owner who dies (census → lostReturn / Nội vụ phủ).
   usage: python3 dev/build/assemble.py && node dev/test/lost-one-home-scan.js [dev/index.html] [tuần=108] [seed]   → exit 1 on FAIL or page error */
const path=require('path');const {chromium}=require('playwright');
const HTML=process.argv[2]||'dev/index.html';const NT=+process.argv[3]||108;const SEED=+process.argv[4]||20261121;let fail=0;const ck=(n,c,x)=>{console.log((c?'ok  ':'FAIL')+' '+n+(x!==undefined?' · '+JSON.stringify(x).slice(0,1500):''));if(!c)fail++};
(async()=>{const b=await chromium.launch();const p=await b.newPage({viewport:{width:755,height:1000}});const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(u=>/^https?:/.test(u.href),r=>r.abort());await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded'});
 await p.waitForFunction(()=>typeof start==='function'&&typeof deser==='function'&&window.KY,null,{timeout:120000});await p.waitForTimeout(1200);
 await p.evaluate(async sd=>{Math.random=()=>{sd=(sd*16807)%2147483647;return (sd-1)/2147483646};try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  for(let i=0;i<12;i++){window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start();for(let j=0;j<300&&!(typeof S!=='undefined'&&S&&S!==window.S0&&S.origin);j++)await new Promise(r=>setTimeout(r,100));if(S.origin.k!=='cnv'&&!isSrv()&&!S.out)break}
  document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove());Q.length=0;used=0;S.suc=90;try{closeModal()}catch(e){}},SEED);
 p.setDefaultTimeout(0);
 const R=await p.evaluate(async NT=>{let rs=777;const rnd=()=>{rs=(rs*48271)%2147483647;return rs/2147483647};const pick=L=>L[Math.floor(rnd()*L.length)];
  BAL.kyngo.p0=100;BAL.kyngo.cd=[0,0,0,0];
  const LAST={};const st={tuan:0,lose:0,steal:0,plant:0,rob:0,ui:0,soat:0,kyMe:0,kyStale:0,death:0};const dup=[],van=[];const prev={};const net0=(S.il&&S.il.net)||0;
  const ks=Object.keys(IT).filter(k=>{const t=IT[k];return t&&!t.nt&&!t.evi&&(t.pr||0)>=LO.minPr&&ilDur({k})});
  const stock=()=>{for(const q of [S].concat(rivals.filter(v=>v&&!v.coop&&v.alive)))if(!(q.inv||[]).some(loOk)){q.inv=q.inv||[];q.inv.push({k:pick(ks),from:'emp'})}};
  const alive=()=>rivals.filter(v=>v&&!v.coop&&v.alive&&!v.out);
  const census=()=>{const ids=new Set();for(const c of S.lost||[])if(c&&c.e&&c.e.iu)ids.add(c.e.iu);for(const l of (S.il&&S.il.log)||[])if(/^lo\d/.test(String(l[3]))||/^lo\d/.test(String(l[4])))ids.add(l[1]);
   const M={};const add=(iu,pt)=>{if(iu&&ids.has(iu))(M[iu]=M[iu]||[]).push(pt)};for(const q of ilPeople())for(const e of ilSlots(q))add(e.iu,ilKey(q));for(const x of ilS().box)if(x.e)add(x.e.iu,'box:'+x.at+':'+x.why);
   for(const c of ilCases())add(c.e.iu,'case'+c.id);for(const m of Q)if(m&&m.pp&&m.pp.e&&typeof m.pp.e==='object')add(m.pp.e.iu,'dlg');return{ids,M}};
  const check=t=>{const {ids,M}=census();for(const id of ids){const L=M[id]||[];const e=(S.lost||[]).map(c=>c.e).find(e=>e&&e.iu===id);const lg=((S.il&&S.il.log)||[]).find(l=>l[1]===id);const dur=ilDur(e||{k:lg&&lg[2]});/* a used-up kind (cloth sewn, tea drunk…) may end at 0 */const bad=L.length>1?'dup':(!L.length&&dur?'van':'');
    if(bad){if(prev[id]===bad){(bad==='dup'?dup:van).push({t,id,at:L,last:LAST[id],log:((S.il&&S.il.log)||[]).filter(l=>l[1]===id).slice(-6),c:(S.lost||[]).filter(c=>c.e&&c.e.iu===id).map(c=>[c.id,c.own,c.st,c.at,c.how,c.keep])})}prev[id]=bad}else delete prev[id];if(L.length)LAST[id]=[t,L.map(x=>{const q=ilP(String(x).split(':')[0]);return x+(q&&q!==S?(q.alive===false?'†':'')+(q.out?'out':''):'')}),(()=>{const q=ilP(String(L[0]));if(!q)return null;const e=ilSlots(q).find(e=>e.iu===id);return e?{lo:e.lo,gh:e.gh,by:e.by,h:e.h,w:e.w,pawn:!!e.pw}:null})()]}return ids.size};
  /* her cards: answer each (both roads); now and then an old Kỳ ngộ card is answered after its piece moved on (stale) */
  let held=null;const answer=()=>{for(let n=0;n<40&&Q.length;n++){const q=Q[0];if(q&&q.ky&&Array.isArray(q.opts)&&q.opts.length&&!held&&rnd()<.15&&q.evId){held=Q.shift();continue}
    if(q&&q.ky&&Array.isArray(q.opts))st.kyMe++;try{if(Array.isArray(q.opts)&&q.opts.length){const o=q.opts[Math.floor(rnd()*q.opts.length)];Q.shift();if(o&&o.go)o.go()}else Q.shift()}catch(x){Q.shift()}}};
  let ids=0;
  for(let t=0;t<NT;t++){S.out=0;S.confined=0;S.dead=false;S.suc=90;used=0;if(t%4===0)stock();
   for(const q of [S].concat(rivals))if(q&&q.ky){if(q.ky.seen){delete q.ky.seen.vat_lac;delete q.ky.seen.vat_minh}q.ky.cd=-1}
   const A=alive();
   /* losses / thefts / robbery */
   for(let i=0;i<2;i++){const q=rnd()<.35?S:pick(A);if(q&&!loL().some(c=>c.own===key(q)&&c.st!=='done')){let cz=null;try{cz=loCause(q)}catch(e){}if(!cz){const th=pick(A.filter(v=>v!==q));cz=th&&rnd()<.5?loCauseOf(q,{who:th,why:'scan'}):{cause:rnd()<.5?'srv':'mis',sv:'cung nữ'}}if(loLose(q,cz))st.lose++}}
   if(rnd()<.35){const a=rnd()<.4?S:pick(A),tt=pick([S].concat(A).filter(x=>x!==a));if(a&&tt&&loStealOk(a,tt)){try{loSteal(a,tt,false);st.steal++}catch(x){}}}
   if(rnd()<.2){const h=[S].concat(A).find(q=>(q.inv||[]).some(e=>e&&e.lo&&e.by===key(q)));if(h){const ix=h.inv.findIndex(e=>e&&e.lo&&e.by===key(h));const tt=pick([S].concat(A).filter(x=>x!==h));try{plantItem(h,tt,ix);st.plant++}catch(x){}}}
   if(rnd()<.15&&typeof ilRob==='function'){const q=pick([S].concat(A)),by=pick(A.filter(v=>v!==q));const i=(q.inv||[]).findIndex(loOk);if(i>=0&&by){const e=q.inv.splice(i,1)[0];try{ilRob(q,e,by);st.rob++}catch(x){q.inv.push(e)}}}
   /* her tra xét acts on her own cases and cases at her */
   for(const c of loMine()){if(rnd()<.5){Q.length=0;used=0;const a=pick(['ask','cct','book','askback','giveback','handin','sneak']);try{loUI(a,c.id);st.ui++}catch(x){}answer()}}
   if(rnd()<.2){Q.length=0;used=0;try{inspect(S);st.soat++}catch(x){}}
   /* Kỳ ngộ: the NPC pass (every buổi), her walk */
   for(let k=0;k<3;k++){try{KY.npcPass()}catch(x){}if(rnd()<.6){try{KY.arrive(S,pick(['vuon','nvp','tn','kn']),'walk')}catch(x){}answer()}}
   if(held&&rnd()<.5){/* the stale card: answered a tuần or more after it was made */const q=held;held=null;if(Array.isArray(q.opts)&&q.opts.length){const o=pick(q.opts);try{o.go();st.kyStale++}catch(x){}}answer()}
   /* an owner dies now and then (census routes her pieces) */
   if(t%27===26){const v=pick(A.filter(v=>(S.lost||[]).some(c=>c.st!=='done'&&(c.own===key(v)||c.at===key(v)))));if(v){v.alive=false;st.death++}}
   try{endTurn()}catch(x){errs.push(String(x).slice(0,200))}answer();Q.length=0;st.tuan++;ids=check(t)}
  const L=S.lost||[];const LOI=new Set();for(const l of (S.il&&S.il.log)||[])if(/^lo\d/.test(String(l[3]))||/^lo\d/.test(String(l[4])))LOI.add(l[1]);for(const c of L)if(c.e&&c.e.iu)LOI.add(c.e.iu);const NETL=((S.il&&S.il.log)||[]).filter(l=>l[5]==='net').map(l=>[l[0],l[1],l[2],l[3],LOI.has(l[1])?'LOST-CASE':'other']);return{NETL,st,dup,van,net:((S.il&&S.il.net)||0)-net0,ids,cases:L.length,how:L.reduce((m,c)=>(m[c.st+':'+(c.how||'')]=(m[c.st+':'+(c.how||'')]||0)+1,m),{}),ky:((S.il&&S.il.log)||[]).filter(l=>/kyngo/.test(String(l[5]))).length}},NT);
 console.log('STATS',JSON.stringify(R.st),'cases',R.cases,JSON.stringify(R.how),'kyngo lines',R.ky,'pieces',R.ids);
 ck(`≥ 2 bot years (${R.st.tuan} tuần) with real endTurn`,R.st.tuan>=72);
 ck(`every road exercised (losses ${R.st.lose}, thefts ${R.st.steal}, plants ${R.st.plant}, robberies ${R.st.rob}, her acts ${R.st.ui}, Soát rương ${R.st.soat}, her Kỳ ngộ cards ${R.st.kyMe}, stale ${R.st.kyStale}, deaths ${R.st.death}, Kỳ ngộ moves ${R.ky})`,R.st.lose>=20&&R.ky>=3&&R.st.kyMe>=2);
 ck(`no lost-case piece in two places (${new Set(R.dup.map(x=>x.id)).size} pieces, ${R.dup.length} piece-tuần)`,!R.dup.length,R.dup.slice(0,3));
 ck(`no durable lost-case piece vanished (${new Set(R.van.map(x=>x.id)).size} pieces, ${R.van.length} piece-tuần)`,!R.van.length,R.van.slice(0,3));
 const netLo=R.NETL.filter(x=>x[4]==='LOST-CASE');console.log('NET lines',JSON.stringify(R.NETL));
 ck(`ledger net: no unrouted removal of a lost-case piece (${netLo.length}; all pieces +${R.net}, the others are outside jlost: reported)`,!netLo.length,netLo);
 ck('no page errors',!errs.length,errs.slice(0,5));
 console.log(fail?`FAIL ${fail}`:'ALL PASS');await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
