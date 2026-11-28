/* E-TIER-B13 batch 3 gate (law 2: a look-alike way with the same story result folds into its sibling): in the built game
   (1) each folded road hồi has one way fewer, an old-way map om3 and no two ways left with the same result;
   (2) a folded way with its own odds (BAL oa) is her best fit: the kept way's odds = the better of the two, and the result line names the folded
       method when that one fit her better (owner 27/11 ~01:00Z / ~01:03Z);
   (3) an old save (S.rcT 1 or none) holding a bạc pledge / a helper refusal on a removed way maps it to the merged sibling (rdcOm), S.rcT → 2.
   usage: node dev/test/tier-b13-b3.js */
const {chromium}=require('playwright');const D=require('./lib/device');const path=require('path');const ROOT=path.resolve(__dirname,'../..');
const F=[['tt_oan_11','c2','011',3],['tt_tranh_9','s1','001',3],['dtq_bien_11','c3','010',3],['nc_tuc_11','x1','010',3],['nc_tuc_11','x2','010',3],['bd_tuc_11','x1','010',3],
 ['nc_vuong_7','s1','010',3],['bd_hoang_7','s1','010',3],['bd_san_11','c1','010',3],['td_song_9','x1','001',3],['ch_benh_10','c3','001',3],['thd_tho_11','x1','001',3]];
let fail=0;const ok=(c,m,x)=>{if(!c)fail++;console.log((c?'ok   ':'FAIL ')+m+(x!==undefined&&!c?' '+JSON.stringify(x).slice(0,600):''))};
(async()=>{const srv=await D.serveRoot(ROOT);const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1});const p=await ctx.newPage();
 const errs=[];p.on('pageerror',e=>errs.push(e.message));await p.route(/\.(webp|png|jpe?g|mp3|ogg|m4a|mp4|webm)(\?|$)/i,r=>r.abort());const g=await D.openHost(p,srv.url,{timeout:120000});await g.waitForFunction(()=>typeof start==='function'&&document.getElementById('title')&&window.__ctmBuilt===1,null,{timeout:120000});
 const R=await g.evaluate(F=>F.map(([id,bk,om,n0])=>{const a=ARC67[id],B=a&&a.B&&a.B[bk];if(!B)return{id,bk,err:'no beat'};
  return{id,bk,n:B.o.length,n0,om:B.om3,want:om,alt:B.o.filter(o=>o.alt).map(o=>o.alt.n),names:B.o.map(o=>typeof o.n==='string'?o.n:'fn')}}),F);
 for(const r of R)ok(!r.err&&r.n===r.n0-1&&r.om===r.want,`${r.id}:${r.bk} ${r.n0} → ${r.n} ways, om3 ${r.om}${r.alt.length?' · folded method kept as best fit: «'+r.alt[0]+'»':''}`,r);
 /* (2) best fit: td_song_9 x1 — «Tên mới» (odds by the paper flag) folds «Họ cha» (odds by own/brave flags + Sủng) */
 const se=await g.evaluate(()=>{try{SLOT=9;document.getElementById('title').hidden=true;try{store.set(NL_KEY,null)}catch(e){}window.__forceOrigin='tt';start();['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});Q.length=0;return typeof S}catch(e){return 'err '+e.message}});ok(se==='object','a life starts ('+se+')');
 const bf=await g.evaluate(()=>{const o=ARC67.td_song_9.B.x1.o[0],A={a:'td_song_9',f:{},sc:0,hist:[],used:[]};const s0=S.sung;
  S.sung=0;const lo=o.o(A),tLo=o.rt(A);A.f.own=1;A.f.brave=1;S.sung=60;const hi=o.o(A),tHi=o.rt(A);const q=BAL.road.fx.td_song_9.x1[0],a=rdOdds(q.o,A),b2=rdOdds(q.oa,A);S.sung=s0;
  return{lo,hi,a,b:b2,tLo,tHi}});
 ok(bf.hi>bf.lo&&bf.hi===Math.max(bf.a,bf.b)&&/^Họ cha, nhờ công trận\. /.test(bf.tHi)&&!/^Họ cha/.test(bf.tLo),`best fit: odds ${bf.lo} → ${bf.hi} when the folded method fits her better; result names it («${String(bf.tHi).slice(0,40)}…»)`,bf);
 /* (3) old save: a pledge on the removed way 2 of tt_oan_11 c2 and a helper refusal on it map to the kept way 1 */
 const os=await g.evaluate(()=>{const A=newThread67('tt_oan_11');if(!A)return{err:'thread'};S.st.M=A;const b=beatDef67(A,'c2');
  S.pl67={a:A.a,b:'c2',t:thKey67(A),pp:{o:[100,100,100]},i:2,sev:1,due:absB67()+9,t0:absB67(),n:'x',h:'x',cost:1,chap:1};A.hpNo={b:'c2',i:[2]};S.rcT=1;rdcOm();
  const r1={pl:S.pl67.i,pp:S.pl67.pp.o.length,hp:A.hpNo.i,rcT:S.rcT,n:opts67(A,b).length};S.pl67.i=2;S.pl67.pp={o:[100,100,100]};A.hpNo={b:'c2',i:[2]};rdcOm();
  return Object.assign(r1,{again:S.pl67.i})});
 ok(!os.err&&os.pl===1&&os.hp.length===1&&os.hp[0]===1&&os.rcT===2&&os.pp<3&&os.again===2,`old save (S.rcT 1): pledge / refusal on the removed way 2 → merged way 1, card odds re-read (${os.pp}), S.rcT → 2, maps only once`,os);
 ok(errs.length===0,errs.length+' page errors '+(errs[0]||''));
 console.log(fail?`TIER-B13-B3: ${fail} FAIL`:'TIER-B13-B3: ALL PASS');await b.close();srv.close();process.exit(fail?1:0)})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
