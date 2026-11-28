// review/oan-pace unit test (owner OD 26/11 ~18:40Z «điểm oán nó tăng quá nhanh … giảm quá chậm»): joanpace + j28 ocOne alone/deep.
// review/oan-pace-ghen: + H1–H9 GHEN pace (BAL.oanPace.ghen); stat-pace (BAL.stp, own test dev/test/stat-pace.js) is switched off here so joanpace is measured alone.
// usage: node dev/test/oan-pace.js [index.html]   → one line per check, last line ALL PASS n / FAIL n
const {chromium}=require('playwright');const path=require('path');
const PAGE=process.argv[2]||'index.html';
(async()=>{const b=await chromium.launch();const p=await b.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 await p.route(/\.(webp|png|jpg|jpeg|mp3|ogg|mp4|webm)(\?.*)?$/,r=>r.abort());
 await p.goto('file://'+path.resolve(PAGE));await p.waitForTimeout(2500);
 const R=await p.evaluate(()=>{const out=[];const ok=(n,c,x)=>out.push([n,!!c,x===undefined?'':JSON.stringify(x)]);
  document.getElementById('title').hidden=true;for(let i=0;i<60;i++){start();if(!(typeof isSrv==='function'&&isSrv())&&S.ps)break}Q.length=0;if(BAL.stp)BAL.stp.on=0;
  const P=BAL.oanPace,C=BAL.oanCool,L=liveRivals(true);const [a,c,d,e]=[L[0],L[1],L[2],L[3]||L[0]];
  const clr=x=>{x.opz={};x.ocq={};x.occ={}};for(const x of [a,c,d,e,S])clr(x);
  const raw=(x,y)=>oan(x,y);const setO=(x,y,v)=>{if(y===S)x.oan=v;else if(x===S)S.ro[y.id]=v;else x.ro[y.id]=v};
  /* NEWCOMER (e): a new face arrives with no oán toward her */
  const n=newRival(1);ok('E1 a new arrival starts at oán 0 toward her',oan(n,S)===0&&!(n.oan>0),n.oan);
  /* (b) one bounded step per cause */
  setO(a,S,0);S.bqN=(S.bqN||0)+1;BAL.stp.on=1;oanAdd(a,S,40);ok('B1 one cause adds at most stat-pace\'s band BAL.stp.band.oan[2] ('+BAL.stp.band.oan[2]+') — ONE cap per stat',raw(a,S)<=BAL.stp.band.oan[2]&&raw(a,S)>0,raw(a,S));BAL.stp.on=0;
  const o1=raw(a,S);oanAdd(a,S,5);ok('B2 same incident (same buổi): a smaller second cause adds nothing (the biggest counts)',raw(a,S)===o1,[o1,raw(a,S)]);
  S.bqN++;oanAdd(a,S,12);const o2=raw(a,S);S.bqN++;oanAdd(a,S,12);
  ok('B3 one day: the rise of one pair is capped at BAL.oanPace.day ('+P.day+')',raw(a,S)<=P.day+1&&raw(a,S)>=o2,[o1,o2,raw(a,S)]);
  const keep=S.tuan;S.tuan=(S.tuan+1)%3;if(S.tuan===0)S.turn++;S.bqN++;const o3=raw(a,S);oanAdd(a,S,5);
  ok('B4 a new day: a new cause rises again',raw(a,S)>o3,[o3,raw(a,S)]);
  setO(S,c,0);S.bqN++;oanAdd(S,c,40);ok('B5 two-way: HER oán toward a consort follows the same day cap ('+P.day+')',raw(S,c)<=P.day&&raw(S,c)>0,raw(S,c));
  const m0=raw(a,S);oanAdd(a,S,-3);ok('B6 a fall is never capped',raw(a,S)===m0-3,[m0,raw(a,S)]);
  /* (c) daily fade: faster when left alone, slower when deep */
  const fade=(x,v,qd)=>{clr(x);setO(x,S,v);x.ocq={me:wk()-qd};const k=persF(x,'forgive',1);oanCool(1,false);return [v-raw(x,S),k]};
  const [f1,k1]=fade(d,30,C.quiet),[f2,k2]=fade(d,30,C.quiet+C.alone.max);
  ok('C1 per day, a grudge left alone longer fades faster',f2>f1||(f1===0&&f2>0),[f1,f2]);
  const [f3]=fade(d,35,C.quiet+C.alone.max),[f4]=fade(d,60,C.quiet+C.alone.max);
  const w3=ocBandW(35),w4=ocBandW(60);ok('C2 a deep grudge (≥ '+BAL.oanLv[C.deep.lv-1]+') fades slower for its band width (× deep.k '+C.deep.k+')',f4/w4<f3/w3+1e-9,[[f3,w3],[f4,w4]]);
  clr(d);setO(d,S,30);oanAdd(d,S,1);const g0=raw(d,S);oanCool(1,false);ok('C3 fed today → no fade (quiet days restart)',raw(d,S)===g0,[g0,raw(d,S)]);
  /* (d) revenge spends the oán */
  clr(e);setO(e,S,40);e.ghen=0;const v0=raw(e,S);const sp=opVent(e,S);ok('D1 an act against her spends BAL.oanPace.vent.share of the doer\'s oán',sp===Math.max(P.vent.min,Math.round(v0*P.vent.share))&&raw(e,S)===v0-sp,[v0,sp,raw(e,S)]);
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
  clr(e);e.opa={};e.rel=0;S.bqN++;affAdd(e,S,-40);ok('G1 a fall of liking is at most BAL.oanPace.ghet.day a day ('+P.ghet.day+')',aff(e,S)===-P.ghet.day,aff(e,S));
  const a1=aff(e,S);affAdd(e,S,20);ok('G2 a rise of liking is never capped',aff(e,S)===a1+Math.round(20*persF(e,'trust',1)),[a1,aff(e,S)]);
  /* strip plot gate (review/oan-pace-2) */
  {const v=e;const keep=[v.oan,v.ghen,v.rel];v.oan=0;v.ghen=0;v.rel=-100;const A=tyEnemies(S).includes(v);v.oan=0;v.ghen=0;v.rel=-10;const B2=tyEnemies(S).includes(v);[v.oan,v.ghen,v.rel]=keep;
   ok('T1 the strip plot (jty tyEnemies) needs the grudge heat BAL.oanPace.act',!B2,[A,B2])}
  /* GHÉT fade (review/oan-pace-2) */
  {const w=wk();e.rel=-30;e.agw={me:w};e.agc={me:.99};ghetCool();const r1=e.rel;const fa=opGhetF(-30,w,1),fb=opGhetF(-30,w-20,1),fd=opGhetF(-80,w,1)/(P.ghet.fade.base+P.ghet.fade.pct*80);
   ok('G3 a dislike toward her eases each day (ghetCool), faster when left alone, deep slower (BAL.oanPace.ghet.fade)',r1>-30&&r1<=0&&fb>fa&&fd<1,[r1,fa,fb,fd]);
   e.rel=-2;e.agw={};e.agc={me:.9};for(let i=0;i<5;i++)ghetCool();ok('G4 the fade never passes 0',e.rel===0,e.rel);
   S.rl[c.id]=-30;S.agw={};S.agc={};ghetCool();ok('G5 two-way: HER dislike of a consort eases the same way',S.rl[c.id]>-30&&S.rl[c.id]<=0,S.rl[c.id])}
  /* GHEN pace (review/oan-pace-ghen) */
  {const G=P.ghen;const gz=x=>{x.opg={};x.gUc=0;x.ghen=0};const nn=newRival(1);ok('H1 a newcomer starts near 0 jealousy (< BAL.ghenNew '+BAL.ghenNew+')',(nn.ghen||0)<BAL.ghenNew,nn.ghen);
   S.sung=50;a.sung=50;gz(a);S.bqN++;ghenUp(a,30,'t',S);const g1=a.ghen;ok('H2 one cause adds at most the band BAL.stp.band.ghen[2] ('+BAL.stp.band.ghen[2]+')',g1>0&&g1<=BAL.stp.band.ghen[2],g1);
   ghenUp(a,5,'t',S);ok('H3 same incident (same buổi): a smaller second cause adds nothing',a.ghen===g1,[g1,a.ghen]);
   S.bqN++;ghenUp(a,BAL.stp.band.ghen[1],'t',S);S.bqN++;ghenUp(a,BAL.stp.band.ghen[1],'t',S);ok('H4 one day: one consort\'s jealousy rises at most BAL.oanPace.ghen.day ('+G.day+')',a.ghen<=G.day+1,a.ghen);
   gz(c);gz(d);c.sung=S.sung+G.rel.span;d.sung=S.sung-10;S.bqN++;ghenUp(c,BAL.stp.band.ghen[1],'t',S);ghenUp(d,BAL.stp.band.ghen[1],'t',S);
   ok('H5 relative favour: a consort more favoured than her grows far less jealous than one below her',c.ghen<d.ghen&&c.ghen<=Math.ceil(BAL.stp.band.ghen[1]*G.rel.min),[c.ghen,d.ghen]);
   const w=wk();ok('H6 fade: closed gap faster, deep slower, left alone faster',opGfK(30,-G.rel.span,w)>opGfK(30,0,w)&&opGfK(G.deep,0,w)<opGfK(30,0,w)&&opGfK(30,0,w-10)>opGfK(30,0,w),[opGfK(30,-G.rel.span,w),opGfK(30,0,w),opGfK(G.deep,0,w),opGfK(30,0,w-10)]);
   a.ghen=50;opVent(a,S);ok('H7 acting against her spends her jealousy (vent.share '+G.vent.share+')',a.ghen===50-Math.max(G.vent.min,Math.round(50*G.vent.share)),a.ghen);
   c.pg=0;c.pUc=0;S.opg={};S.bqN++;pgUp(c,30,'t');const p1=c.pg;c.pg=40;opVent(S,c);ok('H8 two-way: her jealousy of a consort — one band per cause, spent when she acts',p1>0&&p1<=BAL.stp.band.ghen[2]&&c.pg===40-Math.max(G.vent.min,Math.round(40*G.vent.share)),[p1,c.pg]);
   gz(e);ghenUp(e,10,'t',a);ok('H9 a jealousy caused by another consort still does not raise the score toward her',e.ghen===0,e.ghen)}
  /* rollback */
  P.on=0;setO(a,S,0);S.bqN++;oanAdd(a,S,40);ok('R1 BAL.oanPace.on = 0 → the old raw rise (× the holder\'s nết only)',raw(a,S)===Math.round(40*persF(a,'slight',1)),raw(a,S));P.on=1;S.tuan=keep;
  return out});
 let f=0;for(const [n,c,x] of R){console.log((c?'PASS ':'FAIL ')+n+(c?'':' '+x));if(!c)f++}
 if(errs.length){console.log('FAIL page errors: '+errs.slice(0,3).join(' | '));f++}
 console.log(f?`FAIL ${f} / ${R.length}`:`ALL PASS ${R.length}`);await b.close();process.exit(f?1:0)})().catch(e=>{console.error(e);process.exit(2)});
