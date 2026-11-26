/* ORDER THIN P3 reach + no-repeat measure (review r1). node dev/test/j72c-reach.js [offersPerKiep=80] [lives=6] [runs=10]  (after dev/site/build_site.sh)
   (1) REACH: in 8 real fresh lives × rank 1..5 × month 1..12, which composed seeds can be made (real requester by nết, need true on the live world,
       grounding gate, places open) — the rest wait for a state a fresh life does not have yet (an ill / pregnant consort, a feud, a child, a festival…);
       the reason of each never-made seed is listed.
   (2) NO-REPEAT: `runs` × `lives` lives, `offers` offers per kiếp drawn exactly as the game draws (q72Cands → q72Choose → q72Offer, which marks
       jnorep), rank climbing 1→5 and the months turning; % of offers in lives 2..n that repeat a template already offered in an earlier life.
       before = BAL.j72c.on false (110 old only); after = 110 old + composed. */
const {chromium}=require('playwright');const D=require('./lib/device');const http=require('http'),fs=require('fs'),path=require('path');const ROOT=process.env.CTM_ROOT||path.resolve(__dirname,'../..');/* CTM_ROOT = another build (e.g. LIVE main) for the before column */
const OFF=+process.argv[2]||80,LIVES=+process.argv[3]||6,RUNS=+process.argv[4]||10;
const srv=http.createServer((q,r)=>{let p=decodeURIComponent(new URL(q.url,'http://x').pathname);if(p==='/')p='/index.html';const f=path.join(ROOT,p);if(!fs.existsSync(f)||fs.statSync(f).isDirectory()){r.statusCode=404;return r.end()}fs.createReadStream(f).pipe(r)});
(async()=>{await new Promise(r=>srv.listen(0,'127.0.0.1',r));const b=await chromium.launch();const ctx=await D.newDeviceContext(b,'fold',{deviceScaleFactor:1,reducedMotion:'reduce'});
 await ctx.route(u=>!/^http:\/\/127\.0\.0\.1[:/]/.test(u.href)&&/^https?:/.test(u.href),r=>r.abort());const p=await ctx.newPage();const errs=[];p.on('pageerror',e=>errs.push(e.message));
 const g=await D.openHost(p,'http://127.0.0.1:'+srv.address().port+'/',{timeout:120000});await g.waitForFunction(()=>window.__ctmBuilt===1&&typeof start==='function',null,{timeout:120000});
 const fresh=`SLOT=3;document.getElementById('title').hidden=true;for(let i=0;i<40;i++){try{store.set(NL_KEY,null)}catch(e){}start();if(!(window.isSrv&&isSrv()))break}
  ['kroul','dawn','kload'].forEach(i=>{const e=document.getElementById(i);if(e)e.remove()});window.__bot=1;window.quiet=1;`;
 /* (1) reach */
 const R=await g.evaluate(fresh=>{const ever=new Set(),per=[];const C=T72.filter(T=>T.cs);if(!C.length)return{total:0,ever:0,perRankMonth1:[0],never:[]};
  for(let l=0;l<8;l++){eval(fresh);for(const rk of [1,2,3,4,5]){S.rank=rk;let n=0;for(let m=1;m<=12;m++){S.month=m;
    for(const T of C){if(ever.has(T.cs)&&m>1)continue;let x=null;for(let t=0;t<6&&!x;t++){try{x=q72Make(T)}catch(e){x=null}}if(x){ever.add(T.cs);if(m===1)n++}}}per.push(n)}}
  const why=(T,sd)=>{try{const A=q72Pick(T.r,[],T.rf);if(!A)return'no requester';let B=null;if(T.b){B=q72Pick(T.b,[q72Key(A)],T.bf?((o,z)=>T.bf(o,z,A)):null);if(!B)return'no B'}
    const x0={u:-1,tid:T.id,rk:A.k==="ksp"?"ksp":A.fam?"fam":A.k,ri:A.id,bk:B?(B.k==="ksp"?"ksp":B.k):null,bi:B?B.id:null,st:0,t0:wk(),dl:wk()+6,p:{},log:[]};if(A.fam){x0.rk="fam";x0.ri=null}
    const X0=q72X(x0);if(!X0)return'q72X';if(!j72cGround(sd,X0))return'ground '+j72cTexts(sd).filter(s=>/\{[BM]\}/.test(s)).map(s=>s.match(/\{[BM]\}/)[0]).join('');if(T.need&&!T.need(X0))return'need';
    for(const s of T.s){const pl=q72StepPl(s,X0);if(pl&&!q72PlOk(pl,X0))return'place '+pl}return'ok now'}catch(e){return'err '+e.message}};
  S.rank=3;S.month=5;
  const never=C.filter(T=>!ever.has(T.cs)).map(T=>{const sd=J72SEEDS.find(s=>s.id===T.cs);const nd=sd.needs||{};
   return sd.id+' ['+[sd.req.kind+(sd.req.need?'/'+sd.req.need:''),sd.other?'B '+sd.other.kind+(sd.other.need?'/'+sd.other.need:''):'',nd.kids_min!=null?'kids≥'+nd.kids_min:'',nd.month?'month '+nd.month:'',nd.rank_min!=null?'rank≥'+nd.rank_min:''].filter(Boolean).join(' · ')+'] at rank 3: '+why(T,sd)});
  return{total:C.length,ever:ever.size,perRankMonth1:per,never}},fresh);
 console.log(`REACH: ${R.ever}/${R.total} composed seeds made in 8 fresh lives × rank 1–5 × month 1–12; ready per (life,rank) at month 1: min ${Math.min(...R.perRankMonth1)} · max ${Math.max(...R.perRankMonth1)}`);
 console.log(`never made in a fresh state (${R.never.length}, wait for that state in play):`);R.never.forEach(s=>console.log('  '+s));
 /* (2) no-repeat */
 const M=await g.evaluate(([fresh,OFF,LIVES,RUNS])=>{const res={};
  for(const mode of ['before','after']){if(BAL.j72c)BAL.j72c.on=mode==='after';const by={all:[0,0]};let made=0,tries=0;
   for(let run=0;run<RUNS;run++){try{localStorage.removeItem('ctm-nr');localStorage.removeItem('ctm-e68h');NR_C=null}catch(e){}
    for(let l=0;l<LIVES;l++){eval(fresh);const q=q72();let k=0;
     for(let i=0;i<OFF;i++){S.rank=1+Math.floor(i*5/OFF);S.month=1+(i%12);q.a=[];Q.length=0;const L=q72Cands();if(l>0)tries++;const x=L.length?q72Choose(L):null;if(!x){continue}
      const T=T72I[x.tid];const hk=T.hk||('j72:'+T.id);const seen=evHistSeen(hk)>0;q72Offer(x,'');Q.length=0;k++;
      if(l>0){made++;const kd=T.kind;by.all[1]++;if(seen)by.all[0]++;by[kd]=by[kd]||[0,0];by[kd][1]++;if(seen)by[kd][0]++}}
    }}
   by.made=[made,tries];res[mode]=by}
  if(BAL.j72c)BAL.j72c.on=true;return res},[fresh,OFF,LIVES,RUNS]);
 const pc=z=>z&&z[1]?Math.round(100*z[0]/z[1])+' %':'-';const kinds=Object.keys(M.after).filter(k=>k!=='all'&&k!=='made').sort();
 console.log(`\nNO-REPEAT (${RUNS} runs × ${LIVES} lives, ${OFF} offers per kiếp; % of offers in lives 2–${LIVES} that repeat a template offered in an earlier life)`);
 console.log('| Pool | before: 110 old | after: 110 old + composed |\n|---|---|---|');console.log(`| all | ${pc(M.before.all)} | ${pc(M.after.all)} |`);
 console.log(`| offers made in lives 2–${LIVES} (of ${OFF} asked per kiếp) | ${M.before.made[0]}/${M.before.made[1]} | ${M.after.made[0]}/${M.after.made[1]} |`);
 for(const k of kinds)console.log(`| ${k} | ${pc(M.before[k])} | ${pc(M.after[k])} |`);
 console.log('page errors',errs.length,errs[0]||'');await b.close();srv.close()})().catch(e=>{console.log('FAIL',e.message);process.exit(1)});
