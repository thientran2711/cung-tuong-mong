/* coop-one-world: CI guard for the co-op ONE WORLD rule (owner OD:L96 + one-core OD:L1267; review/coop-one-world).
   Two seats on one page, no server: the SAME base week is run as the host (seat a) and as the guest (seat b) with different RNG seeds,
   through the real co-op code paths (COOPW.on, seat, toCanon, the guest's week-end guestNet), then the REAL server merge3.
   Checks, over several weeks AND month ticks (one forced year end):
     1. guards: what the guest's raw endTurn still rolls in the world (table only, for the report: the safety net must take it back);
     2. safety net: the guest's sent week (guestNet) changes NO world path outside her own rows (rl/ro/gp/ep/evm[902]) and the date;
     3. merge: merge3(base, host, guest) == host on every world path (no double count, no guest roll);
     4. her own act after the week end (a dawn dialog that lowers an NPC's Sủng by 5) still lands: merged = host − 5;
     5. old rooms: thIll / cm / men are world keys; a guest whose room base lacks them never writes them, her own ties (menP) stay personal;
     6. single player: worldOn() is true when co-op is off.
   usage: node dev/test/coop-one-world.js   (env W = warm-up weeks, RUNS = base weeks, SEED, QC_WT = worktree to test; ~15 s)
   Go-live gate: dev/tools/quickcheck.d/50-coop-one-world.sh (2 seeds). */
const {chromium}=require('playwright');const path=require('path');
/* env QC_WT (go-live gate): test that worktree's build + server merge; default = this repo */
const ROOT=path.resolve(process.env.QC_WT||path.join(__dirname,'../..'));const {serve,BASE}=require('./coop-serve.js');
(async()=>{const {merge3}=await import(path.join(ROOT,'coop/worker/src/merge.js'));
const b=await chromium.launch();const ctx=await b.newContext({viewport:{width:1180,height:820}});await serve(ctx,ROOT);
await ctx.addInitScript(()=>{window.COOP_URL='http://127.0.0.1:9';});
const p=await ctx.newPage();p.setDefaultTimeout(240000);const errs=[];p.on('pageerror',e=>errs.push(e.message));if(process.env.DBGID){p.on('console',m=>{if(m.text().startsWith('DBG'))console.log(m.text().slice(0,600))});await ctx.addInitScript(([id,k])=>{window.__DBG={id,k}},[process.env.DBGID,process.env.DBGK])}
await p.goto(BASE+'index.html',{waitUntil:'domcontentloaded'});
await p.waitForFunction(()=>typeof start==='function'&&typeof endTurn==='function'&&window.COOPW&&window.COOP_ONE);
const WEEKS=+process.env.W||8,RUNS=+process.env.RUNS||8,SEED=+process.env.SEED||7;
const out=await p.evaluate(([WEEKS,RUNS,SEED])=>{
 let seed=SEED;const rnd=()=>{seed=(seed*1103515245+12345)%2147483648;return seed/2147483648};const nat=Math.random;
 const solo=worldOn();Math.random=rnd;/* one seeded run (env SEED): a failure can be replayed */
 window.__nlInner=1;document.getElementById('title').hidden=true;for(let i=0;i<20&&!(typeof S!=='undefined'&&S&&S.name);i++)start();Q.length=0;
 const drain=()=>{for(let i=0;i<80&&Q.length;i++)Q.shift();S.mg=null};
 for(let w=0;w<WEEKS;w++){drain();S.buoi=B4L;try{endTurn()}catch(e){}drain()}
 const fake=seat=>{COOPW.on=true;COOPW.seat=seat;COOPW.base={P:{},W:{S:{}}};COOPW.sent=-1;COOPW.pend=false;COOPW.p2=false;COOPW.net=null;
  COOP.state.status='open';COOP.state.peerOnline=true;COOP.state.week=0;COOP.state.ended={};COOP.state.you=seat};
 const res=[];
 for(let r=0;r<RUNS;r++){drain();S.buoi=B4L;try{endTurn()}catch(e){}drain();
  if(r%2)S.tuan=2;if(r===RUNS-1){S.month=12;S.tuan=2}
  const base=JSON.stringify(ser());
  const runSeat=(seat,sd)=>{quiet=true;try{deser(JSON.parse(base))}finally{quiet=false}Q.length=0;S.mg=null;fake(seat);
   /* the room base holds the world as the host wrote it (HOST_ONLY keys: thIll/cm/men/menG2) */
   if(seat==='b'){const h=JSON.parse(JSON.stringify(res.length?res[res.length-1].hostBaseW:null));COOPW.base.W={S:h||{}}}
   const c0=COOPW.toCanon();seed=sd;Math.random=rnd;let err=null;
   try{S.buoi=B4L;endTurn()}catch(e){err=String(e&&e.stack||e)}seed=sd+1;drain();
   const c1=COOPW.toCanon();
   /* her own act after the week end (a dawn dialog): an NPC loses 5 Sủng */
   let act=null;if(seat==='b'){const v=rivals.find(x=>!x.coop&&x.alive&&!x.out&&(x.sung||0)>=10);if(v){v.sung-=5;act=v.id}}
   const pre=COOPW.toCanon();const sent=COOPW.guestNet(JSON.parse(JSON.stringify(pre)));if(window.__DBG){const f=c=>{const v=c.W.R.find(x=>x.id==window.__DBG.id);return v?JSON.stringify(v[window.__DBG.k]):'-'};console.log('DBG',seat,'c0',f(c0),'c1',f(c1),'pre',f(pre),'sent',f(sent),'net0',COOPW.net&&f(COOPW.net.c0),'net1',COOPW.net&&f(COOPW.net.c1))}COOPW.on=false;COOPW.pend=false;COOPW.net=null;return {c0,c1,sent,err,act}};
  const H=runSeat('a',1000+r*7);
  res.push({hostBaseW:H.c0.W.S});
  const G=runSeat('b',5000+r*13);
  res[res.length-1]={H,G,month:r%2||r===RUNS-1};
 }
 /* 5: old room → the guest never writes HOST_ONLY keys when the base lacks them; her ties to the men stay in P */
 quiet=true;try{deser(JSON.parse(JSON.stringify(ser())))}finally{quiet=false}fake('b');COOPW.base={P:{},W:{S:{}}};
 if(!S.men&&typeof menInit==='function'){COOPW.on=false;menInit();COOPW.on=true}
 if(S.men&&S.men[0])S.men[0].tinh=33;
 const old=COOPW.toCanon();COOPW.on=false;
 const mig={hasMenW:'men' in old.W.S,hasCmW:'cm' in old.W.S,hasThIllW:'thIll' in old.W.S,menP:old.P.b.S.menP&&old.P.b.S.menP.m0,menInP:'men' in old.P.b.S};
 /* round trip: the host's men (world part, other names) + her own ties → her local S.men */
 let rt=null;try{const C2=JSON.parse(JSON.stringify(old));const hm=JSON.parse(JSON.stringify(S.men||[])).map(m=>{for(const f of ['tinh','letters','trysts','knowsMe','af'])delete m[f];m.name='Host '+m.id;return m});
  C2.W.S.men=hm;C2.W.S.cm={th:{lv:3,why:'x'},hh:{lv:0,why:''}};COOPW.on=true;COOPW.seat='b';COOPW.fromCanon(C2);COOPW.on=false;
  rt={name:S.men&&S.men[0]&&S.men[0].name,tinh:S.men&&S.men[0]&&S.men[0].tinh,cmTh:S.cm&&S.cm.th&&S.cm.th.lv,seen:!!(S.cm&&S.cm.seen)}}catch(e){rt={err:String(e)}}
 mig.rt=rt;
 Math.random=nat;return {res,mig,solo,after:worldOn()}},[WEEKS,RUNS,SEED]);
/* ---- analysis in node ---- */
const OWN=/^\.R\[#\d+\]\.(rl|ro|gp|ep|evm)\./;const DATE=/^\.S\.(year|month|tuan|turn|cnews)\b/;
function flat(o,pre,acc){if(o&&typeof o==='object'){if(Array.isArray(o)&&o.length&&o.every(e=>e&&typeof e==='object'&&e.id!=null)){for(const e of o)flat(e,pre+'[#'+e.id+']',acc);return acc}
 const ks=Object.keys(o);if(!ks.length)acc[pre]=Array.isArray(o)?'[]':'{}';for(const k of ks)flat(o[k],pre+'.'+k,acc);return acc}acc[pre]=JSON.stringify(o);return acc}
const fl=W=>flat({S:W.S,R:W.R},'',{});
/* per-viewer keys: her rows and any "me" key / value mapped to a pid (jcoopworld mapMe) differ by seat in this one-page probe */
const PID=/\.90[12](\.|$)/;
const skip=(k,v)=>OWN.test(k)||DATE.test(k)||PID.test(k);
const top=k=>{let m=k.match(/^\.R\[#\d+\]\.([^.\[]+)/);if(m)return 'R.'+m[1];m=k.match(/^\.S\.([^.\[]+)(\.[^.\[]+)?/);if(m)return 'S.'+m[1]+(m[1]==='emp'||m[1]==='court'?m[2]||'':'');return k.slice(0,30)};
const raw={},netBad={},mergeBad={};let actOk=0,actN=0,errN=0;
for(const r of out.res){if(r.H.err||r.G.err){errN++;console.log('ERR',r.H.err||r.G.err)}
 const b0=fl(r.H.c0.W),h1=fl(r.H.c1.W),g0=fl(r.G.c0.W),g1=fl(r.G.c1.W),gs=fl(r.G.sent.W);
 for(const k of new Set([...Object.keys(g0),...Object.keys(g1)])){if(skip(k))continue;if(g0[k]===g1[k])continue;const t=top(k);const c=h1[k]===g1[k]?'same':(h1[k]!==b0[k]?'DIFF':'G');if(c!=='same')raw[t]=(raw[t]||0)+1}
 for(const k of new Set([...Object.keys(g0),...Object.keys(gs)])){if(skip(k))continue;if(g0[k]===gs[k])continue;
  if(r.G.act!=null&&k==='.R[#'+r.G.act+'].sung')continue;netBad[top(k)]=(netBad[top(k)]||0)+1;if(process.env.DBG)console.log('net',k,'g0',g0[k],'g1',g1[k],'sent',gs[k])}
 const M=merge3(r.H.c0.W,r.H.c1.W,r.G.sent.W),mf=fl(M);
 for(const k of new Set([...Object.keys(h1),...Object.keys(mf)])){if(skip(k)||b0[k]!==g0[k])continue;/* a value naming the viewer (who:"me" → pid) differs by seat already at base */if(r.G.act!=null&&k==='.R[#'+r.G.act+'].sung')continue;if(h1[k]!==mf[k])mergeBad[top(k)]=(mergeBad[top(k)]||0)+1}
 if(r.G.act!=null){const id=r.G.act,hv=r.H.c1.W.R.find(x=>x.id===id),mv=M.R.find(x=>x.id===id),bv=r.H.c0.W.R.find(x=>x.id===id);
  /* merge3 rule 1 (A deep-equals B) takes one value when the host's own change happens to equal hers: not a loss of this branch */
  if(hv&&bv&&hv.sung===bv.sung-5){}else{actN++;if(hv&&mv&&mv.sung===hv.sung-5)actOk++;else console.log('act lost',id,hv&&hv.sung,mv&&mv.sung)}}}
const tbl=o=>Object.entries(o).sort().map(([k,v])=>'  '+k.padEnd(26)+v).join('\n')||'  (none)';
console.log('seed',SEED,'runs',out.res.length,'month runs',out.res.filter(r=>r.month).length);
console.log('1. guest raw endTurn: world paths moved only on the guest / differently (the safety net takes these back):\n'+tbl(raw));
console.log('2. guest sent week, world paths changed vs base:\n'+tbl(netBad));
console.log('3. merged vs host, world paths differing:\n'+tbl(mergeBad));
console.log('4. her act after the week end kept:',actOk+'/'+actN);
console.log('5. old room:',JSON.stringify(out.mig));
console.log('6. worldOn single player:',out.solo,out.after);
const fails=[];
if(errs.length)fails.push('page errors: '+errs.slice(0,3).join(' | '));
if(errN)fails.push('endTurn threw on a seat');
if(Object.keys(netBad).length)fails.push('guest week changes the world');
if(Object.keys(mergeBad).length)fails.push('merge differs from the host');
if(actN&&actOk!==actN)fails.push('guest act lost');
if(!out.mig.rt||out.mig.rt.name!=='Host m0'||out.mig.rt.tinh!==33||out.mig.rt.cmTh!==3)fails.push('men/cm round trip');
if(out.mig.hasMenW||out.mig.hasCmW||out.mig.hasThIllW||out.mig.menInP||(out.mig.menP&&out.mig.menP.tinh!==33))fails.push('old-room migration');
if(!out.solo||!out.after)fails.push('worldOn false in single player');
await b.close();
if(fails.length){console.log('FAIL: '+fails.join('; '));process.exit(1)}console.log('PASS coop-one-world');})();
