/* ky-keeper-f2 (MAIN 110 W1, law 6c REAL OBJECTS + law 11 whole family): every Kỳ ngộ special that moves a piece (jky SPEC.item: lost case
   «Mang trả» / «Giữ lại», di vật «Xin chuộc» / «Dâng Thái hậu», món quý Nội vụ phủ; SPEC.ev) acts on the LIVE world, never on the dialog-time
   object: a card answered after its piece moved on (case closed / held, box piece bought, rare piece sold) or after the world was rebuilt
   (save round-trip, co-op snapshot: the case object replaced) moves nothing, pays nothing and makes no copy; a live card moves the one piece.
   usage: python3 dev/build/assemble.py && node dev/test/ky-keeper-f2.js [dev/index.html]   → ok/FAIL lines, last line PASS / FAIL n */
const path=require('path');const {chromium}=require('playwright');
const HTML=process.argv[2]||'dev/index.html';
(async()=>{const b=await chromium.launch();const p=await (await b.newContext({viewport:{width:1180,height:820},serviceWorkers:'block'})).newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message.slice(0,200)));
 await p.route(u=>/^https?:/.test(u.href),r=>r.abort());
 await p.goto('file://'+path.resolve(HTML),{waitUntil:'domcontentloaded',timeout:0});await p.waitForFunction(()=>typeof start==='function'&&window.KY&&typeof loLose==='function',null,{timeout:0});
 await p.waitForTimeout(1200);
 await p.evaluate(async()=>{try{localStorage.clear()}catch(e){}document.getElementById('title').hidden=true;
  for(let i=0;i<12;i++){window.S0=typeof S!=='undefined'?S:null;try{store.set(NL_KEY,null)}catch(e){}start();for(let j=0;j<300&&!(typeof S!=='undefined'&&S&&S!==window.S0&&S.origin);j++)await new Promise(r=>setTimeout(r,100));if(S.origin.k!=='cnv'&&!isSrv()&&!S.out)break}
  document.querySelectorAll('.kroul,#kload').forEach(e=>e.remove());Q.length=0;try{closeModal()}catch(e){}});
 const R=await p.evaluate(()=>{const out=[];const ck=(n,ok,i)=>out.push([n,!!ok,i==null?"":JSON.stringify(i).slice(0,400)]);
  const NP=rivals.filter(v=>v&&!v.coop&&v.alive&&!v.out);const own=NP[0],F=NP[1],G=NP[2];
  const kk=Object.keys(IT).find(k=>loOk({k,from:"emp"})&&ilDur({k}));
  /* how many objects carry this id anywhere (chests / worn / pawn of everyone, box, open cases holding it) */
  const cnt=iu=>{let n=0;for(const q of ilPeople())for(const e of ilSlots(q))if(e.iu===iu)n++;for(const x of ilS().box)if(x.e&&x.e.iu===iu)n++;for(const c of ilCases())if(c.e.iu===iu)n++;return n};
  const holds=(q,iu)=>ilSlots(q).filter(e=>e.iu===iu).length;
  const mkCase=()=>{for(const q of [own])q.inv=(q.inv||[]).filter(e=>!loOk(e));own.inv.push({k:kk,from:"emp"});S.lost=(S.lost||[]).filter(c=>c.own!==key(own)||c.st==="done");
   const c=loLose(own,{cause:"mis",sv:"cung nữ"});ilUid(c.e);return c};
  const card=(L,oi,Fin)=>({F:Fin||F,X:{lc:L},oi,E:{o:[{s:"item"},{s:"item"}]},b:0});
  /* A live «Giữ lại»: the finder keeps the one piece, the case is held by her */
  {const c=mkCase(),iu=c.e.iu;const r=KY.SPEC.item(card(c,1),{});ck("A live keep: finder holds the one piece, case held by her",!!r&&holds(F,iu)===1&&c.st==="held"&&c.at===key(F)&&cnt(iu)===1,{r,st:c.st,n:cnt(iu)})}
  /* B live «Mang trả»: the owner gets it back once */
  {const c=mkCase(),iu=c.e.iu;KY.SPEC.item(card(c,0),{});ck("B live return: owner holds it once, case done",holds(own,iu)===1&&c.st==="done"&&cnt(iu)===1,{st:c.st,n:cnt(iu)})}
  /* C stale keep: the case closed by another road first (owner already has it) → nothing moves */
  {const c=mkCase(),iu=c.e.iu;const cd=card(c,1);lostReturn(Object.assign({},c.e,{lo:c.id}),"tra");const nF=holds(F,iu);const r=KY.SPEC.item(cd,{});
   ck("C stale keep after the case closed: no copy, owner keeps it, case stays done",!r&&holds(F,iu)===nF&&holds(own,iu)===1&&c.st==="done"&&cnt(iu)===1,{r,st:c.st,n:cnt(iu)})}
  /* D stale keep: another finder already keeps it (held) → nothing moves */
  {const c=mkCase(),iu=c.e.iu;const cd=card(c,1);loKeepBy(c,G,"test");const r=KY.SPEC.item(cd,{});
   ck("D stale keep after another finder kept it: no 2nd copy, case still held by the first",!r&&holds(F,iu)===0&&holds(G,iu)===1&&c.at===key(G)&&cnt(iu)===1,{r,at:c.at,n:cnt(iu)})}
  /* E world rebuilt (save round-trip / co-op snapshot): the card's case object is a stale twin; the case is still lost → keep acts on the LIVE case */
  {const c=mkCase(),iu=c.e.iu;const L=JSON.parse(JSON.stringify(c));const r=KY.SPEC.item(card(L,1),{});
   ck("E rebuilt world, live case lost: keep moves the live case (held by finder), one piece",!!r&&c.st==="held"&&c.at===key(F)&&holds(F,iu)===1&&cnt(iu)===1,{r,st:c.st,n:cnt(iu)})}
  /* F world rebuilt, live case closed meanwhile (the F2 shape: case done, piece back with its NPC owner) → nothing moves, the owner keeps it */
  {const c=mkCase(),iu=c.e.iu;const L=JSON.parse(JSON.stringify(c));lostReturn(Object.assign({},c.e,{lo:c.id}),"kyngo");const r=KY.SPEC.item(card(L,1),{});
   ck("F rebuilt world, live case closed: no keeper copy, owner keeps the piece, case stays done",!r&&holds(F,iu)===0&&holds(own,iu)===1&&c.st==="done"&&cnt(iu)===1,{r,st:c.st,n:cnt(iu)})}
  /* G stale «Mang trả» after a rebuild with the case closed → nothing */
  {const c=mkCase(),iu=c.e.iu;const L=JSON.parse(JSON.stringify(c));lostReturn(Object.assign({},c.e,{lo:c.id}),"tra");KY.SPEC.item(card(L,0),{});
   ck("G stale return after a rebuild: owner holds it once",holds(own,iu)===1&&cnt(iu)===1,{n:cnt(iu)})}
  /* H SPEC.ev on a stale closed case: a clue only, no piece */
  {const c=mkCase(),iu=c.e.iu;const L=JSON.parse(JSON.stringify(c));lostReturn(Object.assign({},c.e,{lo:c.id}),"tra");KY.SPEC.ev({F,X:{lc:L},oi:0},{});
   ck("H stale ev: no 2nd copy",holds(own,iu)===1&&cnt(iu)===1,{n:cnt(iu)})}
  /* I di vật bought by an NPC meanwhile: «Xin chuộc» pays nothing, moves nothing; «Dâng Thái hậu» by the buyer takes nothing from her */
  {const e={k:kk,from:"emp"};ilUid(e);const x={e,at:"nvp",why:"dead",own:"",w:wk()};ilS().box.push(x);const c0={F,X:{box:x},oi:0,E:{o:[{s:"item"},{s:"item"}]},b:0},c1={F:G,X:{box:x},oi:1,E:{o:[{s:"item"},{s:"item"}]},b:0};
   ilTake(x,G,"mua");F.bac=1e4;const b0=F.bac;const r0=KY.SPEC.item(c0,{});const r1=KY.SPEC.item(c1,{});
   ck("I stale di vật: no pay, no move, buyer keeps it",!r0&&!r1&&F.bac===b0&&holds(G,e.iu)===1&&holds(F,e.iu)===0&&cnt(e.iu)===1,{r0,r1,bac:[b0,F.bac],n:cnt(e.iu)})}
  /* J món quý Nội vụ phủ sold meanwhile: no second piece from nothing, no pay */
  {const r={k:kk,sold:1,w:wk()};const nB=(F.inv||[]).length;F.bac=1e4;const b0=F.bac;const s=KY.SPEC.item({F,X:{rr:r},oi:0,E:{o:[{s:"item"},{s:"item"}]},b:0},{});
   ck("J stale món quý (sold): no new piece, no pay",!s&&(F.inv||[]).length===nB&&F.bac===b0,{s,bac:[b0,F.bac]})}
  /* K (review -r) another seat's case under the same id + kind (seats number cases on their own): a different owner / piece is never that case */
  {const c=mkCase(),iu=c.e.iu;const L=JSON.parse(JSON.stringify(c));L.own=key(G);L.e.iu=iu+777;const r=KY.SPEC.item(card(L,1),{});
   ck("K same id+kind, other owner/piece: nothing moves, live case still lost",!r&&c.st==="lost"&&holds(F,iu)===0&&cnt(iu)===1,{r,st:c.st,n:cnt(iu)})}
  /* L (review -r) her own card, di vật bought meanwhile: the option charged her through fx; the special gives the price back (no cost for nothing) */
  {const e={k:kk,from:"emp"};ilUid(e);const x={e,at:"nvp",why:"dead",own:"",w:wk()};ilS().box.push(x);const cS={F:S,X:{box:x},oi:0,E:{o:[{s:"item"},{s:"item"}]},b:0};
   const pr=KY.buyPr?KY.buyPr(cS):null;ilTake(x,G,"mua");S.bac=1e4;const b0=S.bac;const fxp=pr!=null?pr:0;S.bac-=fxp;const r=KY.SPEC.item(cS,{});
   ck("L her stale di vật: price back, nothing moves",!r&&S.bac===b0&&holds(S,e.iu)===0&&holds(G,e.iu)===1&&cnt(e.iu)===1,{r,pr,bac:[b0,S.bac]})}
  /* M (review -r) rebuilt world: the box entry is a twin of the live one (same piece id) → the live entry moves, one piece */
  {const e={k:kk,from:"emp"};ilUid(e);const x={e,at:"nvp",why:"dead",own:"",w:wk()};ilS().box.push(x);const tw=JSON.parse(JSON.stringify(x));F.bac=1e4;
   const r=KY.SPEC.item({F,X:{box:tw},oi:0,E:{o:[{s:"item"},{s:"item"}]},b:0},{});
   ck("M rebuilt box twin: live entry moves to the buyer, one piece",!!r&&holds(F,e.iu)===1&&!ilS().box.includes(x)&&cnt(e.iu)===1,{r,n:cnt(e.iu)})}
  /* N (review -r) rebuilt world: the rare offer is a twin; the live S.adRare was sold meanwhile → no piece from nothing */
  {const live={k:kk,w:wk(),sold:1};const keep=S.adRare;S.adRare=live;const tw={k:kk,w:wk()};const nB=(F.inv||[]).length;F.bac=1e4;const b0=F.bac;
   const s=KY.SPEC.item({F,X:{rr:tw},oi:0,E:{o:[{s:"item"},{s:"item"}]},b:0},{});S.adRare=keep;
   ck("N stale rare twin, live sold: no new piece, no pay",!s&&(F.inv||[]).length===nB&&F.bac===b0,{s,bac:[b0,F.bac]})}
  return out});
 let fail=0;for(const [n,ok,i] of R){console.log((ok?'ok  ':'FAIL')+' '+n+(i?' · '+i:''));if(!ok)fail++}
 if(errs.length){fail++;console.log('FAIL page errors '+JSON.stringify(errs.slice(0,4)))}else console.log('ok   no page errors');
 console.log(fail?`FAIL ${fail}`:'PASS');await b.close();process.exit(fail?1:0)})().catch(e=>{console.error(e);process.exit(2)});
