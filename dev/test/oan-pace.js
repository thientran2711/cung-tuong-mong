// review/oan-pace unit test (owner OD 26/11 ~18:40Z «điểm oán nó tăng quá nhanh … giảm quá chậm»): joanpace + j28 ocOne alone/deep.
// usage: node dev/test/oan-pace.js [index.html]   → one line per check, last line ALL PASS n / FAIL n
const {chromium}=require('playwright');const path=require('path');
const PAGE=process.argv[2]||'index.html';
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 await p.goto('file://'+path.resolve(PAGE));await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{const out=[];const ok=(n,c,x)=>out.push([n,!!c,x===undefined?'':JSON.stringify(x)]);
  document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0;
  const P=BAL.oanPace,C=BAL.oanCool,L=liveRivals(true);const [a,c,d,e]=[L[0],L[1],L[2],L[3]||L[0]];
  const clr=x=>{x.opz={};x.ocq={};x.occ={}};for(const x of [a,c,d,e,S])clr(x);
  const raw=(x,y)=>oan(x,y);const setO=(x,y,v)=>{if(y===S)x.oan=v;else if(x===S)S.ro[y.id]=v;else x.ro[y.id]=v};
  /* NEWCOMER (e): a new face arrives with no oán toward her */
  const n=newRival(1);ok('E1 a new arrival starts at oán 0 toward her',oan(n,S)===0&&!(n.oan>0),n.oan);
  /* (b) one bounded step per cause */
  setO(a,S,0);S.bqN=(S.bqN||0)+1;oanAdd(a,S,40);ok('B1 one cause adds at most BAL.oanPace.step ('+P.step+')',raw(a,S)<=P.step&&raw(a,S)>0,raw(a,S));
  const o1=raw(a,S);oanAdd(a,S,5);ok('B2 same incident (same buổi): a smaller second cause adds nothing (the biggest counts)',raw(a,S)===o1,[o1,raw(a,S)]);
  S.bqN++;oanAdd(a,S,P.step);const o2=raw(a,S);S.bqN++;oanAdd(a,S,P.step);
  ok('B3 one day: the rise of one pair is capped at BAL.oanPace.day ('+P.day+')',raw(a,S)<=P.day+1&&raw(a,S)>=o2,[o1,o2,raw(a,S)]);
  const keep=S.tuan;S.tuan=(S.tuan+1)%3;if(S.tuan===0)S.turn++;S.bqN++;const o3=raw(a,S);oanAdd(a,S,5);
  ok('B4 a new day: a new cause rises again',raw(a,S)>o3,[o3,raw(a,S)]);
  setO(S,c,0);S.bqN++;oanAdd(S,c,40);ok('B5 two-way: HER oán toward a consort follows the same step',raw(S,c)<=P.step&&raw(S,c)>0,raw(S,c));
  const m0=raw(a,S);oanAdd(a,S,-3);ok('B6 a fall is never capped',raw(a,S)===m0-3,[m0,raw(a,S)]);
  /* (c) daily fade: faster when left alone, slower when deep */
  const fade=(x,v,qd)=>{clr(x);setO(x,S,v);x.ocq={me:wk()-qd};const k=persF(x,'forgive',1);oanCool(1,false);return [v-raw(x,S),k]};
  const [f1,k1]=fade(d,30,C.quiet),[f2,k2]=fade(d,30,C.quiet+C.alone.max);
  ok('C1 per day, a grudge left alone longer fades faster',f2>f1||(f1===0&&f2>0),[f1,f2]);
  const [f3]=fade(d,35,C.quiet+C.alone.max),[f4]=fade(d,60,C.quiet+C.alone.max);
  const w3=ocBandW(35),w4=ocBandW(60);ok('C2 a deep grudge (≥ '+BAL.oanLv[C.deep.lv-1]+') fades slower for its band width (× deep.k '+C.deep.k+')',f4/w4<f3/w3+1e-9,[[f3,w3],[f4,w4]]);
  clr(d);setO(d,S,30);oanAdd(d,S,1);const g0=raw(d,S);oanCool(1,false);ok('C3 fed today → no fade (quiet days restart)',raw(d,S)===g0,[g0,raw(d,S)]);
  /* (d) revenge spends the oán */
  clr(e);setO(e,S,40);const v0=raw(e,S);const sp=opVent(e,S);ok('D1 an act against her spends BAL.oanPace.vent.share of the doer\'s oán',sp===Math.max(P.vent.min,Math.round(v0*P.vent.share))&&raw(e,S)===v0-sp,[v0,sp,raw(e,S)]);
  setO(S,e,20);const s0=raw(S,e);const sp2=opVent(S,e);ok('D2 two-way: her act spends her oán the same way',raw(S,e)===s0-sp2&&sp2>0,[s0,sp2]);
  /* (f) a hostile choice needs the grudge heat ≥ BAL.oanPace.act */
  clr(c);setO(c,S,0);c.ghen=40;c.rel=0;delete c.j95rum;const gL=motiveOK(c,S,'frame');
  ok('F1 Ghen 40 passes the old motive gate but its heat (× ghenK) is under act → not chosen; why prints the BAL number',!gL.ok&&String(gL.why).includes(String(P.act)),gL);
  setO(c,S,Math.max(30,P.act+5));c.ghen=0;const gH=motiveOK(c,S,'frame');ok('F2 oán ≥ act (and the old motive) → open',gH.ok,gH);
  setO(c,S,0);c.ghen=60;const gG=motiveOK(c,S,'provoke');ok('F3 Ghen counts × net.heat.ghenK (60 × '+BAL.net.heat.ghenK+' ≥ act)',gG.ok===(60*BAL.net.heat.ghenK>=P.act),[gG,60*BAL.net.heat.ghenK]);
  ok('F4 the player is never gated',motiveOK(S,c,'frame').ok);
  setO(c,S,5);c.ghen=0;c.rel=0;c.j95rum={[key(S)]:{txt:'x',src:'y',w:wk()}};const gR=motiveOK(c,S,'rumor');delete c.j95rum;
  ok('F5 a rumour she believes no longer opens the gate by itself (no chain of lies)',!gR.ok,gR);
  /* (b') ghét: a fall of liking is one bounded step per cause, capped per day */
  clr(e);e.opa={};e.rel=0;S.bqN++;affAdd(e,S,-40);ok('G1 a fall of liking is at most BAL.oanPace.ghet.step ('+P.ghet.step+')',aff(e,S)===-P.ghet.step,aff(e,S));
  const a1=aff(e,S);affAdd(e,S,20);ok('G2 a rise of liking is never capped',aff(e,S)===a1+Math.round(20*persF(e,'trust',1)),[a1,aff(e,S)]);
  /* rollback */
  P.on=0;setO(a,S,0);S.bqN++;oanAdd(a,S,40);ok('R1 BAL.oanPace.on = 0 → the old raw rise (× the holder\'s nết only)',raw(a,S)===Math.round(40*persF(a,'slight',1)),raw(a,S));P.on=1;S.tuan=keep;
  return out});
 let f=0;for(const [n,c,x] of R){console.log((c?'PASS ':'FAIL ')+n+(c?'':' '+x));if(!c)f++}
 if(errs.length){console.log('FAIL page errors: '+errs.slice(0,3).join(' | '));f++}
 console.log(f?`FAIL ${f} / ${R.length}`:`ALL PASS ${R.length}`);await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
